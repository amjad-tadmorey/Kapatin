// hooks/usePushNotifications.ts
import { API_URL } from "@/api/constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export default function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    useEffect(() => {
        async function register() {
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== "granted") {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== "granted") {
                    alert("Failed to get push token!");
                    return;
                }

                const token = (await Notifications.getExpoPushTokenAsync()).data;
                setExpoPushToken(token);

                // 🔥 send token to your backend
                await fetch(`${API_URL}save-token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });
            } else {
                alert("Must use physical device for Push Notifications");
            }
        }

        register();
    }, []);

    return expoPushToken;
}
