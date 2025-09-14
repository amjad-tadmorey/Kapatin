function normalizeArabic(query: string): string {
    return query
        .replace(/[إأآا]/g, "ا") // unify different forms of alif
        .replace(/ى/g, "ي")      // map ى to ي
        .replace(/ة/g, "ه")      // map ة to ه
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/\s+/g, " ")    // collapse extra spaces
        .trim();
}


export const getAddressFromCoords = async (
    latitude: number,
    longitude: number
): Promise<string> => {
    console.log(latitude, longitude);

    try {
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
        return address
    } catch (error) {
        console.error("Error fetching address:", error);
        return "Error fetching address";
    }

};

export const getCoordsFromAddress = async (
    query: string
): Promise<{ lat: number; lon: number; displayName: string }[]> => {
    try {
        const normalized = normalizeArabic(query);

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                normalized
            )}&addressdetails=1&limit=5&accept-language=en`
        );

        const data = await res.json();

        return data.map((item: any) => ({
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            displayName: item.display_name,
        }));
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return [];
    }
};




