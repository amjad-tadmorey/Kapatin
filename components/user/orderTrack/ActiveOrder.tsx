import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { cancelRequest, getOrders } from "@/api/order";
import Button from "@/components/shared/Button";
import useOrderEvents from "@/hooks/useOrderEvents";
import { colors } from "@/utils/baseStyles";
import Dots from "../../../assets/dots-primary-bottom.svg";
import AnimatedView from "../../shared/AnimatedView";
import Feedback from "../../shared/Feedback";
import LoadingBar from "../../shared/LoadingBar";
import CancelCard from "./CancelCard";
import Delivered from "./Delivered";
import DriverArrived from "./DriverArrived";
import DriverToYou from "./DriverToYou";
import InProgress from "./InProgress";
import Search from "./Search";

const ActiveOrder: React.FC = () => {
    const [closeOrder, setCloseOrder] = useState(false);
    const { orders, loading: loadingOrder } = useOrderEvents(getOrders, true, { isActive: true });
    const { height: SCREEN_HEIGHT } = Dimensions.get("window");
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [showFeedback, setShowFeedback] = useState(false);
    const [showCancelCard, setShowCancelCard] = useState(false);

    const [loadingCancelRequest, setLoadingCancelRequest] = useState(false);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [feeCharge, setFeeCharge] = useState<number | null>(null);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showFeedback ? 0 : SCREEN_HEIGHT,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [showFeedback]);

    if (loadingOrder) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!orders.length) return null

    const order = orders[0];
    const { status, _id, from, points } = order;

    const handleCancelRequest = async (orderId: string) => {
        try {
            setLoadingCancelRequest(true);
            setWarningMessage(null);
            setFeeCharge(null);
            const res = await cancelRequest(orderId);
            setWarningMessage(res.warningMessage);
            setFeeCharge(res.feeCharge);
        } catch (err: any) {
            console.error("Cancel request failed:", err);
        } finally {
            setLoadingCancelRequest(false);
            setShowCancelCard(true);
        }
    };

    if (order.isActive !== true) return null

    return (
        <AnimatedView>
            <View style={styles.container}>
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
                            <Marker
                                coordinate={{ latitude: from.lat, longitude: from.lng }}
                                title="Pickup"
                                description={from.address}
                                pinColor="green"
                            />
                            {points?.map((p: any, idx: number) => (
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

                <LoadingBar
                    width="100%"
                    height={5}
                    fillColor={colors.primary}
                    backgroundColor="#ddd"
                    speed={600}
                />

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
                        onPress={() => handleCancelRequest(_id)}
                        disabled={loadingCancelRequest}
                        title={loadingCancelRequest ? "Loading" : "Cancel"}
                        variant="dark"
                    />
                </View>

                <CancelCard
                    id={_id}
                    show={showCancelCard}
                    setShow={setShowCancelCard}
                    warningMessage={warningMessage}
                    feeCharge={feeCharge}
                />

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
                    <Feedback id={_id} setCloseOrder={setCloseOrder} setShowFeedback={setShowFeedback} />
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
        zIndex: 2,
    },
});
