import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";

// Props: from and to with coordinates
type Props = {
  from: {
    address: string;
    coordinates: [number, number]; // [lng, lat]
  };
  to: {
    address: string;
    coordinates: [number, number]; // [lng, lat]
  };
};

export default function TrackMap({ from, to }: Props) {
  const mapRef = useRef<MapView>(null);

  // Convert [lng, lat] to { latitude, longitude }
  const fromCoord: LatLng = {
    latitude: from?.coordinates[1],
    longitude: from?.coordinates[0],
  };

  const toCoord: LatLng = {
    latitude: to?.coordinates[1],
    longitude: to?.coordinates[0],
  };

  // Fit map to show both markers
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([fromCoord, toCoord], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  }, [fromCoord, toCoord]);


  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation={true}
    >
      {/* From Marker - Green */}
      <Marker
        coordinate={fromCoord}
        title="From"
        description={from?.address}
        pinColor="green"
      />

      {/* To Marker - Red */}
      <Marker
        coordinate={toCoord}
        title="To"
        description={to?.address}
        pinColor="red"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
