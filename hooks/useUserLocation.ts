import { setLocation } from "@/redux/slices/locationSlice";
import { RootState } from "@/redux/store";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useUserLocation() {
    const dispatch = useDispatch();
    const location = useSelector((state: RootState) => state.location);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocation = async () => {
            try {
                setLoading(true);

                // 1️⃣ Request permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to access location was denied");
                    setLoading(false);
                    return;
                }

                // 2️⃣ Get current position
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                const { latitude, longitude } = coords;

                // 3️⃣ Reverse geocode to get address
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                    {
                        headers: {
                            // ✅ Use your real email or domain here
                            "User-Agent": "MyApp/1.0 (me@mydomain.com)",
                        },
                    }
                );

                const geoData = await geoRes.json();
                const address = geoData.display_name || "Unknown location";
                console.log(latitude, longitude, address);

                // 4️⃣ Save to Redux
                dispatch(
                    setLocation({
                        latitude,
                        longitude,
                        address,
                    })
                );
            } catch (err) {
                console.log("Error getting location:", err);
            } finally {
                setLoading(false);
            }
        };

        // ✅ Run only if location isn’t already stored
        if (!location.latitude || !location.longitude) {
            getLocation();
        } else {
            setLoading(false);
        }
    }, []);

    return { loading, location };
}
