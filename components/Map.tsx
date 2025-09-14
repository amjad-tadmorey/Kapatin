import { RootState } from "@/redux/store";
import { getAddressFromCoords } from "@/utils/location";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";

type MapProps = {
  fromMarkerPos: LatLng;
  toMarkerPos: LatLng;
  setFromMarkerPos: (pos: LatLng) => void;
  setToMarkerPos: (pos: LatLng) => void;
  setFromLocation: (address: string) => void;
  setToLocation: (address: string) => void;
  activeLocation: "from" | "to";
};

const Map: React.FC<MapProps> = ({
  fromMarkerPos,
  toMarkerPos,
  setFromMarkerPos,
  setToMarkerPos,
  setFromLocation,
  setToLocation,
  activeLocation,
}) => {


  const location = useSelector((state: RootState) => state.location);
  const mapRef = useRef<MapView>(null);

  // Pick the current marker based on the active location
  const activeMarker = activeLocation === "from" ? fromMarkerPos : toMarkerPos;


  useEffect(() => {
    if (
      location.latitude !== null &&
      location.longitude !== null &&
      activeLocation === "from"
      // (!fromMarkerPos.latitude || !fromMarkerPos.longitude)
    ) {

      const userLocation = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      setFromMarkerPos(userLocation);
      setToMarkerPos(userLocation);
      getAddressFromCoords(location.latitude, location.longitude).then(setFromLocation);
    }
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const lat = activeMarker?.latitude || location.latitude;
    const lon = activeMarker?.longitude || location.longitude;

    if (lat && lon && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [
    location.latitude,
    location.longitude,
    fromMarkerPos?.latitude,
    fromMarkerPos?.longitude,
    toMarkerPos?.latitude,
    toMarkerPos?.longitude,
    activeLocation,
  ]);

  const handleMarkerPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const position = { latitude, longitude };

    if (activeLocation === "from") {
      setFromMarkerPos(position);
      const address = await getAddressFromCoords(latitude, longitude);
      setFromLocation(address);
    } else {
      setToMarkerPos(position);
      const address = await getAddressFromCoords(latitude, longitude);
      setToLocation(address);
    }
  };
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      // customMapStyle={darkStyle}
      showsUserLocation={true}
      onPress={handleMarkerPress}
    >
      {/* From Marker */}
      <Marker
        coordinate={fromMarkerPos}
        draggable
        title="From"
        pinColor="green"
      />

      {/* To Marker */}
      <Marker
        coordinate={toMarkerPos}
        draggable
        title="To"
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


export default Map