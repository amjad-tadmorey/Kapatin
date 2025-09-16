import React, { useState } from "react";

import Button from '@/components/shared/Button';
import { CreateOrderPayload, IFrom, IPoint, OrderFormInputs } from "@/types/order";
import { baseStyles, colors } from "@/utils/baseStyles";
import { FormProvider, useForm } from "react-hook-form";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveOrder from '../../components/user/orderTrack/ActiveOrder';

import { createOrder } from "@/api/order";
import DeliveryInfo from "@/components/user/createOrder/DeliveryInfo";
import Packages from "@/components/user/createOrder/Packages";
import Points from "@/components/user/createOrder/Points";
import { getDynamicDeliveryFee } from "@/constants/basics";
import usePushNotifications from "@/hooks/usePushNotifications";
import { calculateRouteDistance } from "@/utils/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Home: React.FC = () => {
    const methods = useForm<OrderFormInputs>();
    const { control, handleSubmit, formState: { errors } } = methods;
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState<IFrom>({ lat: 0, lng: 0, address: "" });
    const [points, setPoints] = useState<IPoint[]>([]);

    const [showLocationScreen, setShowLocationScreen] = useState(false);
    const expoPushToken = usePushNotifications();

    const distance = calculateRouteDistance(from, points);
    const dynamicDeliveryFee = getDynamicDeliveryFee(distance)

    const handleCreateOrder = async (data: CreateOrderPayload) => {
        const payload = {
            ...data,
            from,
            points,
            expoPushToken
        }
        console.log(JSON.stringify(payload, null, 2));

        setLoading(true);
        try {
            await createOrder(payload);
            methods.reset();
        } catch (err) {
            console.error(err || "Failed to create order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                {!showLocationScreen && (
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                        enableOnAndroid
                        extraScrollHeight={Platform.OS === "ios" ? 40 : 20}
                    >
                        <Text style={[baseStyles.heading, { color: colors.primary, marginBottom: 10 }]}>Kapatin</Text>
                        <FormProvider {...methods}>

                            <TouchableWithoutFeedback onPress={() => setShowLocationScreen(true)}>
                                <Text style={styles.locations} >Set Locations</Text>
                            </TouchableWithoutFeedback>
                            <View>
                                <Packages control={control} errors={errors} />
                            </View>

                            {/* Delivery info */}
                            <View style={styles.box}>
                                <DeliveryInfo control={control} errors={errors} dynamicDeliveryFee={dynamicDeliveryFee} />
                            </View>

                            {/* Submit */}
                            <View style={{ marginBottom: 50 }}>
                                <Button
                                    onPress={handleSubmit(handleCreateOrder)}
                                    disabled={loading}
                                    title={loading ? "Creating..." : "Find A Driver"}
                                />
                            </View>
                        </FormProvider>
                    </KeyboardAwareScrollView>
                )}

                {!showLocationScreen && <ActiveOrder />}
            </SafeAreaView>

            {/* Wrap Points in a full screen View so SwipeablePanelLayout works */}
            {showLocationScreen && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Points
                        setShowLocationScreen={setShowLocationScreen}
                        from={from} setFrom={setFrom}
                        points={points} setPoints={setPoints}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    container: {
        padding: 20,
        flexGrow: 1,
    },
    locations: {
        padding: 20,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: colors.dark,
        marginBottom: 15
    },
    box: {
        padding: 10,
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 20,
        marginBottom: 10,
    },
});

export default Home;
