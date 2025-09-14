import { setLocation } from "@/redux/slices/locationSlice";
import { RootState } from "@/redux/store";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useUserLocation() {
    const dispatch = useDispatch();
    const location = useSelector((state: RootState) => state.location);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // ✅ If location is already in Redux, do nothing
        if (location.latitude !== null && location.longitude !== null) return;

        const getLocation = async () => {
            try {
                setLoading(true)
                // 1️⃣ Request permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to access location was denied");
                    return;
                }

                // 2️⃣ Get current position
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                const { latitude, longitude } = coords;

                // 3️⃣ Optionally: reverse geocode to get address
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                    {
                        headers: {
                            'User-Agent': 'MyReactNativeApp/1.0 (myemail@example.com)', // Use your own info here
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

                setLoading(false)
            } catch (err) {
                console.log("Error getting location:", err);
            }
        };

        getLocation();
    }, [location.latitude, location.longitude, location.address]);

    return { loading }
}
