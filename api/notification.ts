export async function sendNotificationToUser(expoPushToken: string, title: string, body: string) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title,
        body,
    };

    try {
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });

        const data = await response.json();
        console.log("Notification response:", data);
    } catch (error) {
        console.error("Error sending notification:", error);
    }
}
