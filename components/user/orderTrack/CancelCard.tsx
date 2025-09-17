import { updateOrder } from "@/api/order";
import Button from "@/components/shared/Button";
import { baseStyles, colors } from "@/utils/baseStyles";
import { getCancelOrderText } from "@/utils/helpers";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackIcon from '../../../assets/order-detail-back.svg';


const { height } = Dimensions.get("window");

interface CancelCardProps {
    id: string;
    statusUpdatedAt: Date;
    status: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelCard: React.FC<CancelCardProps> = ({ id, statusUpdatedAt, status, show, setShow }) => {
    const [loading, setLoading] = useState(false)
    console.log(statusUpdatedAt);
    console.log(status);

    const translateY = useRef(new Animated.Value(height)).current; // start off-screen
    useEffect(() => {
        if (show) {
            Animated.timing(translateY, {
                toValue: height * 0.60, // quarter from top
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: height, // back off-screen
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [show]);

    const handleCancelOrder = async () => {
        setLoading(true);
        try {
            await updateOrder(id, { status: 'canceled' });
        } catch (err: any) {
            console.error(err || "Failed to cancel order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    transform: [{ translateY }],
                },
            ]}
        >

            <TouchableOpacity style={styles.backButton} onPress={() => setShow(false)}>
                <BackIcon width={30} height={30} />
                <Text style={[baseStyles.secHeader, { color: colors.primary, marginLeft: 8 }]}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
                {getCancelOrderText(
                    status,
                    statusUpdatedAt,
                )}
            </Text>

            <Button title={loading ? "Caneling" : "Cancel"} variant="dark" onPress={handleCancelOrder} disabled={loading} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        left: 0,
        right: 0,
        height: height * 0.40, // quarter of screen
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 4,
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 3
    },
    text: {
        textAlign: 'center'
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 20,
    },
});

export default CancelCard;
