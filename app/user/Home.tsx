import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";

import { createOrder } from "@/api/order";
import ActiveOrder from "@/components/ActiveOrder";
import Button from '@/components/Button';
import Input from "@/components/Input";
import LocationInput from "@/components/LocationInput";
import Map from "@/components/Map";
import MultipleInputs from "@/components/MultipleInputs";
import SwipeablePanelLayout from "@/components/SwipeablePanelLayout";
import useUserLocation from "@/hooks/useUserLocation";
import { CreateOrderPayload, OrderFormInputs } from "@/types/order";
import { baseStyles, colors } from "@/utils/baseStyles";
import { getAddressFromCoords } from "@/utils/location";
import { FormProvider, useForm } from "react-hook-form";
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LatLng } from "react-native-maps";

// ✅ type for suggestion items
type LocationSuggestion = {
    lat: number;
    lon: number;
    displayName: string;
};

const Home: React.FC = () => {
    const methods = useForm<OrderFormInputs>();
    const { control, setValue, handleSubmit, formState: { errors } } = methods;
    const { loading: loadingUserLocation } = useUserLocation();

    const [loading, setLoading] = useState(false);

    const [fromMarkerPos, setFromMarkerPos] = useState<LatLng>({ latitude: 1, longitude: 1 });
    const [toMarkerPos, setToMarkerPos] = useState<LatLng>({ latitude: 1, longitude: 1 });

    const [fromLocation, setFromLocation] = useState<string>("");
    const [toLocation, setToLocation] = useState<string>("");

    const [activeLocation, setActiveLocation] = useState<"from" | "to">("from");
    const [showLocationScreen, setShowLocationScreen] = useState(false);

    const [locationsSuggestions, setLocationsSuggestions] = useState<LocationSuggestion[]>([]);

    const handleCreateOrder = async (data: CreateOrderPayload) => {
        const coords = { from: fromMarkerPos, to: toMarkerPos };

        setLoading(true);
        try {
            await createOrder(data, coords);
            methods.reset();
        } catch (err) {
            console.error(err || "Failed to create order");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkerPress = async (location: LocationSuggestion) => {
        const position: LatLng = { latitude: location.lat, longitude: location.lon };

        if (activeLocation === "from") {
            setFromMarkerPos(position);
            const address = await getAddressFromCoords(location.lat, location.lon);
            setFromLocation(address);
        } else {
            setToMarkerPos(position);
            const address = await getAddressFromCoords(location.lat, location.lon);
            setToLocation(address);
        }
    };

    if (loadingUserLocation) return <Text>loading....</Text>;

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
                        <TouchableOpacity onPress={() => setShowLocationScreen(true)} activeOpacity={0.8}>
                            <Input
                                control={control}
                                errors={errors}
                                name="to"
                                placeholder="Where to?"
                                rules={{ required: "required" }}
                                editable={false}
                                onPress={() => setShowLocationScreen(true)}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>

                        <View style={styles.box}>
                            <Text style={[baseStyles.secHeader, styles.title]}>
                                List Your Products:
                            </Text>
                            <MultipleInputs
                                control={control}
                                errors={errors}
                                namePrefix="items"
                                placeholder="Enter item"
                                plusTitle="Add Item"
                            />
                        </View>

                        {/* Delivery info */}
                        <View style={styles.box}>
                            <Text style={[baseStyles.secHeader, styles.title]}>
                                Delivery Information:
                            </Text>
                            <Input
                                control={control}
                                errors={errors}
                                name="recipientName"
                                placeholder="Full Name"
                                rules={{ required: "Recipient name is required" }}
                                label="Receiver's Full Name:"
                            />
                            <Input
                                control={control}
                                errors={errors}
                                name="recipientNumber"
                                placeholder="Phone Number"
                                rules={{ required: "Recipient number is required" }}
                                label="Receiver's Phone Number:"
                                keyboardType="phone-pad"
                            />
                            <Input
                                control={control}
                                errors={errors}
                                name="price"
                                placeholder="Price"
                                rules={{ required: "Price is required" }}
                                label="Products Price:"
                                keyboardType="numeric"
                            />
                            <Input
                                control={control}
                                errors={errors}
                                name="deliveryFee"
                                placeholder="Delivery Fee"
                                rules={{ required: "Delivery fee is required" }}
                                label="Delivery Fees:"
                                keyboardType="numeric"
                            />
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
                <SwipeablePanelLayout
                    expandedHeight={0.8 * 800}
                    collapsedHeight={0.45 * 800}
                    topPanel={
                        <View style={{ flex: 1, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
                            <Map
                                fromMarkerPos={fromMarkerPos}
                                toMarkerPos={toMarkerPos}
                                setFromMarkerPos={setFromMarkerPos}
                                setToMarkerPos={setToMarkerPos}
                                setFromLocation={setFromLocation}
                                setToLocation={setToLocation}
                                activeLocation={activeLocation}
                            />
                        </View>
                    }
                    bottomPanel={
                        <View style={{ display: 'flex', height: '100%' }}>
                            <LocationInput
                                location={fromLocation}
                                control={control}
                                setValue={setValue}
                                setMarkerPos={setFromMarkerPos}
                                errors={errors}
                                name="from"
                                label="From"
                                placeholder="From"
                                rules={{ required: " required" }}
                                onFocus={() => setActiveLocation('from')}
                                setLocationsSuggestions={setLocationsSuggestions}
                            />

                            <LocationInput
                                location={toLocation}
                                control={control}
                                setValue={setValue}
                                // ✅ fixed wrong setter
                                setMarkerPos={setToMarkerPos}
                                errors={errors}
                                name="to"
                                label="To"
                                placeholder="To"
                                rules={{ required: " required" }}
                                onFocus={() => setActiveLocation('to')}
                                setLocationsSuggestions={setLocationsSuggestions}
                            />

                            <View style={{ flex: 1 }}>
                                {locationsSuggestions.map((location, index) => {
                                    const [line1, ...rest] = location.displayName.split(', ');
                                    const line2 = rest.join(', ');

                                    return (
                                        <View key={index}>
                                            <TouchableOpacity
                                                style={styles.item}
                                                onPress={() => handleMarkerPress(location)}
                                            >
                                                <MaterialIcons name="location-on" size={24} color="#666" style={styles.icon} />
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.line1}>{line1}</Text>
                                                    <Text style={styles.line2}>{line2}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {index !== locationsSuggestions.length - 1 && <View style={styles.separator} />}
                                        </View>
                                    );
                                })}
                            </View>

                            <View style={{ marginBottom: 60 }}>
                                <Button disabled={false} title="Done" onPress={() => setShowLocationScreen(false)} />
                            </View>
                        </View>
                    }
                />
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
