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