import { BASE_URL } from "@/api/constants";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type FetchOrdersFn = (filters?: Record<string, any>) => Promise<any[]>;

/**
 * Hook for fetching and syncing orders with socket events
 * @param fetchFn - async function that fetches orders (must accept filters)
 * @param enabled - whether socket connection should be active
 * @param filters - optional filters applied to fetch & socket events
 */
export default function useOrderEvents(
    fetchFn?: FetchOrdersFn,
    enabled = true,
    filters: Record<string, any> = {}
) {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // helper: check if an order matches filters
    const matchesFilters = (order: any, filters: Record<string, any>) => {
        return Object.entries(filters).every(([key, value]) => order[key] === value);
    };

    useEffect(() => {
        let socket: any;
        setLoading(true)

        // Step 1️⃣: Fetch initial data with filters
        const fetchInitial = async () => {
            if (fetchFn) {
                try {
                    const data = await fetchFn(filters);
                    setOrders(Array.isArray(data) ? data : []);
                } catch (err) {
                    console.error("Failed to fetch initial orders:", err);
                    setOrders([]);
                }
            }
        };

        fetchInitial();

        // Step 2️⃣: Setup socket if enabled
        if (enabled) {
            socket = io(BASE_URL);

            socket.on("connect", () => console.log("Connected to socket server"));

            socket.on("Order_event", (event: any) => {
                setOrders((prev) => {
                    const safePrev = Array.isArray(prev) ? prev : [];

                    switch (event.type) {
                        case "created":
                            // only add if matches current filters
                            if (matchesFilters(event.data, filters)) {
                                return [event.data, ...safePrev];
                            }
                            return safePrev;

                        case "updated":
                            return safePrev.map((o) =>
                                o._id === event.data._id ? event.data : o
                            );

                        case "deleted":
                            return safePrev.filter((o) => o._id !== event.data._id);

                        default:
                            return safePrev;
                    }
                });
            });
        }

        setLoading(false)
        return () => {
            if (socket) socket.disconnect();
        };
    }, [fetchFn, enabled, JSON.stringify(filters)]); // 👈 re-run if filters change

    return { orders, loading };
}
