import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { getOrders } from "@/api/order";
import useOrderEvents from "@/hooks/useOrderEvents";
import { colors } from "@/utils/baseStyles";
import AnimatedView from "../../shared/AnimatedView";
import Feedback from "../../shared/Feedback";
import LoadingBar from "../../shared/LoadingBar";
import Delivered from "./Delivered";
import DriverArrived from "./DriverArrived";
import DriverToYou from "./DriverToYou";
import InProgress from "./InProgress";
import Search from "./Search";

import Button from "@/components/shared/Button";
import Dots from "../../../assets/dots-primary-bottom.svg";
import CancelCard from "./CancelCard";

const ActiveOrder: React.FC = () => {
    const [closeOrder, setCloseOrder] = useState(false);
    const { orders, loading: loadingOrder } = useOrderEvents(getOrders, true, { status: "new" });
    const { height: SCREEN_HEIGHT } = Dimensions.get("window");
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [showFeedback, setShowFeedback] = useState(false);
    const [showCancelCard, setShowCancelCard] = useState(false);


    useEffect(() => {
        if (showFeedback) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [showFeedback]);

    if (loadingOrder || !orders.length) return null;
    const order = orders[0];
    const { status, _id, from, points, statusUpdatedAt } = order;

    if (status === "canceled" || status === "closed" || closeOrder) return null;

    return (
        <AnimatedView>
            <View style={styles.container}>
                {/* Map Section */}
                {from && (
                    <View style={styles.mapContainer}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: from.lat,
                                longitude: from.lng,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            {/* From Marker */}
                            <Marker
                                coordinate={{ latitude: from.lat, longitude: from.lng }}
                                title="Pickup"
                                description={from.address}
                                pinColor="green"
                            />

                            {/* Points Markers */}
                            {points && points.length > 0 &&
                                points.map((p: any, idx: number) => (
                                    <Marker
                                        key={idx}
                                        coordinate={{ latitude: p.lat, longitude: p.lng }}
                                        title={`Point ${idx + 1}`}
                                        description={p.address}
                                        pinColor="blue"
                                    />
                                ))}
                        </MapView>
                    </View>
                )}

                {/* Progress Bar */}
                <LoadingBar
                    width="100%"
                    height={5}
                    fillColor={colors.primary}
                    backgroundColor="#ddd"
                    speed={600}
                />

                {/* Order Status Section */}
                <View style={styles.bottomContainer}>
                    {status === "new" && <Search />}
                    {status === "confirmed" && <DriverToYou />}
                    {status === "driver-arrived" && <DriverArrived />}
                    {status === "in-progress" && <InProgress />}
                    {status === "delivered" && (
                        <Delivered setShowFeedback={setShowFeedback} status={status} />
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => setShowCancelCard(true)}
                        disabled={false}
                        title={"Cancel"}
                        variant="dark"
                    />
                </View>

                <CancelCard id={_id} statusUpdatedAt={statusUpdatedAt} status={status} show={showCancelCard} setShow={setShowCancelCard} />


                <Dots
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        bottom: -100,
                        left: -30,
                        opacity: 0.7,
                    }}
                    width={350}
                />

                <Animated.View
                    style={[
                        styles.fullScreenOverlay,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Feedback
                        id={_id}
                        setCloseOrder={setCloseOrder}
                        setShowFeedback={setShowFeedback}
                    />
                </Animated.View>
            </View>
        </AnimatedView>
    );
};

export default ActiveOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    mapContainer: {
        height: "40%",
        width: "100%",
    },
    bottomContainer: {
        flex: 1,
        padding: 20,
        zIndex: 2,
    },
    fullScreenOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    buttonContainer: {
        borderTopWidth: 1,
        width: "100%",
        borderTopColor: colors.primary,
        marginBottom: 140,
        zIndex: 2
    }
});
