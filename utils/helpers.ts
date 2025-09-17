

export const formatOrderDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const time = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    if (isToday) {
        return `Today at ${time}`;
    }

    const monthDay = date.toLocaleDateString([], {
        month: 'long',
        day: 'numeric',
    });

    return `${monthDay} • ${time}`;
};

// utils/distance.ts
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in km
}

export function calculateRouteDistance(
    from: { lat: number; lng: number },
    points: { lat: number; lng: number }[]
): number {
    if (!from || !points || points.length === 0) return 0;

    // Build full path [from, ...points]
    const path = [from, ...points];

    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
        total += haversineDistance(
            path[i].lat,
            path[i].lng,
            path[i + 1].lat,
            path[i + 1].lng
        );
    }
    return total;
}


const FIVE_MINUTES = 3000; // 5 minutes in milliseconds

export function getCancelOrderText(status: string, statusUpdatedAt: Date) {
    const now = new Date();
    const updatedAt = statusUpdatedAt ? new Date(statusUpdatedAt) : new Date(0);
    const diff = now.getTime() - updatedAt.getTime();

    let title
    let text

    switch (status) {
        case "new":
            title = "Are you sure you want to cancel the order";
        case "confirmed":
            if (diff > FIVE_MINUTES) {
                title = "Are you sure you want to cancel the order, the driver is almost there";
            } else {
                title = "Are you sure you want to cancel the order, the driver is on the way to you";
            }

        case "in-progress":
            if (diff > FIVE_MINUTES) {
                title = "Are you sure you want to cancel the order, the driver is almost there to your customer";
            } else {
                title = "Are you sure you want to cancel the order, the driver is on the way to your customer";
            }

        default:
            title = "Are you sure you want to cancel the order"; // fallback text
    }
}


