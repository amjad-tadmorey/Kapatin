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

import DeliveryInfo from "@/components/user/createOrder/DeliveryInfo";
import Packages from "@/components/user/createOrder/Packages";
import Points from "@/components/user/createOrder/Points";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Home: React.FC = () => {
    const methods = useForm<OrderFormInputs>();
    const { control, handleSubmit, formState: { errors } } = methods;
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState<IFrom>({ lat: 0, lng: 0, address: "" });
    const [points, setPoints] = useState<IPoint[]>([]);

    const [showLocationScreen, setShowLocationScreen] = useState(false);


    const handleCreateOrder = async (data: CreateOrderPayload) => {
        console.log("Order Payload:", JSON.stringify(data, null, 2));
        console.log("From:", JSON.stringify(from, null, 2));
        console.log("Points:", JSON.stringify(points, null, 2));
        // const coords = { from: fromMarkerPos, to: toMarkerPos };

        // setLoading(true);
        // try {
        //     await createOrder(data, coords);
        //     methods.reset();
        // } catch (err) {
        //     console.error(err || "Failed to create order");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
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
                            <DeliveryInfo control={control} errors={errors} />
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

            {showLocationScreen && (
                <Points setShowLocationScreen={setShowLocationScreen} from={from} setFrom={setFrom} points={points} setPoints={setPoints} />
            )}

            {!showLocationScreen && <ActiveOrder />}
        </SafeAreaView>
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
    title: {
        color: colors.primaryDark,
        marginBottom: 20,
        textAlign: "center",
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    icon: {
        marginRight: 12,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    line1: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    line2: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 8,
    },
});

export default Home;
