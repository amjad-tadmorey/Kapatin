import { axiosInstance } from "./constants";
import { Coords, CreateOrderPayload, IOrder, UpdateOrderPayload } from "../types/order";
import { store } from "../redux/store";
import * as Location from "expo-location";

export const createOrder = async (payload: CreateOrderPayload, coords: Coords): Promise<IOrder> => {
  try {

    // 4️⃣ Get auth token from redux store
    const state = store.getState();
    const token = state.auth.token;

    const from = {
      type: "Point",
      coordinates: [coords.from.longitude, coords.from.latitude],  // [lng, lat]
      address: payload.from,
    };

    const to = {
      type: "Point",
      coordinates: [coords.to.longitude, coords.to.latitude],  // [lng, lat]
      address: payload.to,
    };

    // 6️⃣ Update the payload with the correct structure for 'from' and 'to'
    const order = {
      ...payload,
      from,
      to,
    };

    // 7️⃣ Send POST request
    const res = await axiosInstance.post<IOrder>("/orders", order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    throw new Error(err.message || "Failed to create order");
  }
};

export const updateOrder = async (
  orderId: string,
  payload: UpdateOrderPayload
): Promise<IOrder> => {
  try {
    const state = store.getState();
    const token = state.auth.token;

    const res = await axiosInstance.patch<IOrder>(`/orders/${orderId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    throw new Error(err.message || "Failed to update order");
  }
};

export const getNearbyOrders = async (): Promise<IOrder[]> => {
  try {
    // 🔹 Ask for permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    // 🔹 Get current position
    let { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;

    const state = store.getState();
    const token = state.auth.token;

    const res = await axiosInstance.get<IOrder[]>("/orders/nearby", {
      params: { lat: latitude, lng: longitude },
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getOrders = async (filters?: Record<string, any>): Promise<IOrder[]> => {
  try {
    const state = store.getState();
    const token = state.auth.token;

    const res = await axiosInstance.get<{
      success: boolean;
      results: number;
      data: IOrder[];
    }>("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters, // ← pass filters as query params
    });

    return res.data.data; // ✅ return only the array
  } catch (err) {
    throw err;
  }
};


