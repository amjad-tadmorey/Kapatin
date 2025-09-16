// Points.tsx
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";

import Button from "@/components/shared/Button";
import SwipeablePanelLayout from "@/components/shared/SwipeablePanelLayout";
import { IFrom, IPoint } from "@/types/order";
import { colors } from "@/utils/baseStyles";

type Props = {
  setShowLocationScreen: React.Dispatch<React.SetStateAction<boolean>>;
  from: IFrom;
  setFrom: React.Dispatch<React.SetStateAction<IFrom>>;
  points: IPoint[];
  setPoints: React.Dispatch<React.SetStateAction<IPoint[]>>;
};

const Points: React.FC<Props> = ({ setShowLocationScreen, setFrom, setPoints, from, points }) => {
  const [activeField, setActiveField] = useState<"from" | number | null>("from");
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView | null>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Initialize with user location and focus map
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission denied");
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        const address = place
          ? `${place.name || ""} ${place.street || ""}, ${place.city || ""}, ${place.country || ""}`
          : `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;

        setFrom({ lat: latitude, lng: longitude, address });
        const r = { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
        setRegion(r);

        // Wait a bit for the map ref to mount, then animate
        setTimeout(() => mapRef.current?.animateToRegion(r, 400), 250);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setFrom]);

  // When activeField changes, center map on that field if coordinates exist
  useEffect(() => {
    if (!mapRef.current) return;
    if (activeField === "from") {
      if (from?.lat && from?.lng) {
        mapRef.current.animateToRegion(
          { latitude: from.lat, longitude: from.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
          300
        );
      }
    } else if (typeof activeField === "number") {
      const p = points[activeField];
      if (p && p.lat && p.lng) {
        mapRef.current.animateToRegion(
          { latitude: p.lat, longitude: p.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
          300
        );
      }
    }
  }, [activeField, from, points]);

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
      return place
        ? `${place.name || ""} ${place.street || ""}, ${place.city || ""}, ${place.country || ""}`.trim()
        : `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    } catch {
      return `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    }
  };

  const handleMapPress = async (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const address = await reverseGeocode(latitude, longitude);

    if (activeField === "from") {
      setFrom({ lat: latitude, lng: longitude, address });
    } else if (typeof activeField === "number") {
      const updated = [...points];
      updated[activeField] = {
        point: activeField,
        lat: latitude,
        lng: longitude,
        address,
      };
      // reindex to be safe
      setPoints(updated.map((p, i) => ({ ...p, point: i })));
    }

    // center map on pressed coordinate
    mapRef.current?.animateToRegion(
      { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      250
    );
  };

  const addPoint = () => {
    const updated = [...points, { point: points.length, lat: 0, lng: 0, address: "" }];
    setPoints(updated);
    setActiveField(updated.length - 1); // focus new point
    // small delay then center on current region (no coords yet)
    setTimeout(() => mapRef.current?.animateToRegion(region, 200), 150);
  };

  const deletePoint = (index: number) => {
    Alert.alert("Delete point", "Are you sure you want to delete this point?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = points.filter((_, i) => i !== index).map((p, i) => ({ ...p, point: i }));
          setPoints(updated);
          // adjust activeField if necessary
          setActiveField((prev) => {
            if (typeof prev === "number") {
              if (prev === index) return "from";
              if (prev > index) return prev - 1;
              return prev;
            }
            return prev;
          });
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SwipeablePanelLayout
      expandedHeight={0.8 * 800}
      collapsedHeight={0.45 * 800}
      topPanel={
        <View style={{ flex: 1 }}>
          <MapView
            ref={(r) => (mapRef.current = r)}
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={(r) => setRegion(r)}
            onPress={handleMapPress}
          >
            {/* From marker (distinct color) */}
            {from?.lat ? (
              <Marker
                coordinate={{ latitude: from.lat, longitude: from.lng }}
                pinColor={activeField === "from" ? "green" : "red"}
              />
            ) : null}

            {/* Points markers */}
            {points.map((p, idx) =>
              p?.lat ? (
                <Marker
                  key={idx}
                  coordinate={{ latitude: p.lat, longitude: p.lng }}
                  pinColor={activeField === idx ? "green" : "blue"}
                />
              ) : null
            )}
          </MapView>
        </View>
      }
      bottomPanel={
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: colors.secondary }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView
            style={{ flex: 1, padding: 16 }}
            contentContainerStyle={{ paddingBottom: 140 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* From input */}
            <Text style={{ fontWeight: "600", marginBottom: 8, fontSize: 16 }}>From</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                marginBottom: 16,
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
              value={from.address}
              placeholder="Tap map or type pickup address"
              onFocus={() => setActiveField("from")}
              onChangeText={(txt) => setFrom({ ...from, address: txt })}
            />

            {/* Points */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", marginBottom: 8, fontSize: 16 }}>Points</Text>
              <Text style={{ color: "#666", fontSize: 13 }}>{points.length} stops</Text>
            </View>

            {points.map((p, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: activeField === idx ? colors.primary : "#ddd",
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                  value={p.address}
                  placeholder={`Point ${idx + 1} (tap map or type)`}
                  onFocus={() => setActiveField(idx)}
                  onChangeText={(txt) => {
                    const updated = [...points];
                    updated[idx] = { ...updated[idx], address: txt };
                    setPoints(updated);
                  }}
                />

                <TouchableOpacity onPress={() => deletePoint(idx)} style={{ marginLeft: 10 }}>
                  <Ionicons name="trash" size={22} color="#e53935" />
                </TouchableOpacity>
              </View>
            ))}

            {/* Add Point button (custom) */}
            <TouchableOpacity style={styles.addButton} onPress={addPoint}>
              <Text style={styles.addText}>+ add Point</Text>
            </TouchableOpacity>

            {/* Done button */}
            <View style={{ marginTop: 24 }}>
              <Button
                title="Done"
                onPress={() => {
                  setShowLocationScreen(false);
                }}
                disabled={false}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      }
    />
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Points;
