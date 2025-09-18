import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IOrder } from "@/types/order";
import { baseStyles, colors } from "@/utils/baseStyles";
import { formatOrderDate } from "@/utils/helpers";
import { useLocalSearchParams } from "expo-router";
import BackIcon from '../../assets/order-detail-back.svg';
import DriverIcon from '../../assets/order-detail-driver.svg';
import LocationIcon from '../../assets/order-detail-location.svg';
import ProfileIcon from '../../assets/order-detail-profile.svg';

// Define navigation route types
type RootStackParamList = {
    OrderDetails: { order: IOrder };
};

const OrderDetails: React.FC = () => {
    const navigation = useNavigation();
    const { order } = useLocalSearchParams<{ order: string }>();
    const parsedOrder = order ? JSON.parse(order) : null;


    const {
        _id,
        status,
        price,
        deliveryFee,
        from,
        points,
        recipientName,
        recipientNumber,
        created_at,
        items,
    } = parsedOrder;

    return (
        <SafeAreaView style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <BackIcon width={30} height={30} />
                <Text style={[baseStyles.secHeader, { color: colors.primary, marginLeft: 8 }]}>Order Details</Text>
            </TouchableOpacity>


            <View style={styles.header}>
                <Image source={require('../../assets/logo.jpeg')} style={{ width: 100, height: 100, borderRadius: 12 }} />
                <View>
                    <Text style={[baseStyles.secHeader, { marginBottom: 12 }]}>Order Status</Text>
                    <Text>{status}</Text>
                    <Text>{formatOrderDate(created_at)}</Text>
                    <Text>Order ID: {_id?.slice(-4)}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={{
                    borderBottomWidth: 1, borderColor: colors.primaryDark,
                    display: 'flex', flexDirection: "row"
                }}>
                    <View style={{
                        width: '50%', borderRightWidth: 1, borderColor: colors.primaryDark, paddingVertical: 30, paddingLeft: 45
                    }}>
                        <LocationIcon width={30} height={30} style={{ position: 'absolute', top: 5, left: 15 }} />
                        <Text style={[baseStyles.quote, { color: colors.primaryDark, marginBottom: 20 }]}>Pick Up Location</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>{from.address}</Text>
                    </View>
                    <View style={{
                        width: '50%', borderRightWidth: 1, borderColor: colors.primaryDark, paddingVertical: 30, paddingLeft: 45
                    }}>
                        <LocationIcon width={30} height={30} style={{ position: 'absolute', top: 5, left: 15 }} />
                        <Text style={[baseStyles.quote, { color: colors.primaryDark, marginBottom: 20 }]}>Drop off Points</Text>

                        <View>
                            {
                                points.map((point: any) => <Text key={point.point} style={[baseStyles.body, { color: colors.dark }]}>{point.address}</Text>)
                            }
                        </View>
                    </View>

                </View>
                <View style={{ display: 'flex', flexDirection: "row" }}>
                    <View style={{
                        width: '50%', borderRightWidth: 1, borderColor: colors.primaryDark, paddingVertical: 30, paddingLeft: 45
                    }}>
                        <DriverIcon width={30} height={30} style={{ position: 'absolute', top: 5, left: 15 }} />
                        <Text style={[baseStyles.quote, { color: colors.primaryDark, marginBottom: 20 }]}>Driver</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>Mohamad Attowa</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>Phone number: 0123456789</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>Vehicle: Tesla 2025 / 3465</Text>
                    </View>
                    <View style={{
                        width: '50%', borderRightWidth: 1, borderColor: colors.primaryDark, paddingVertical: 30, paddingLeft: 45
                    }}>
                        <ProfileIcon width={30} height={30} style={{ position: 'absolute', top: 5, left: 15 }} />
                        <Text style={[baseStyles.quote, { color: colors.primaryDark, marginBottom: 20 }]}>Customer</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>Name: {recipientName}</Text>
                        <Text style={[baseStyles.body, { color: colors.dark }]}>Phone number: {recipientNumber}</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 20, flex: 1 }}>
                <Text style={[baseStyles.quote, { color: colors.dark, marginBottom: 40 }]}>Products: {items.map((i: any) => <Text>{i}, </Text>)}</Text>
                <Text style={[baseStyles.quote, { color: colors.dark }]}>Delivery Fee: {deliveryFee} JOD</Text>
                <Text style={[baseStyles.quote, { color: colors.dark }]}>Products Price: {price} JOD</Text>
                <Text style={{ color: colors.dark, marginTop: 40, fontWeight: '200', fontSize: 16 }}>Delivered At: {"X"}</Text>
            </View>

            <TouchableOpacity>
                <Text
                    style={styles.rateButton}
                >
                    Rate !
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: Dimensions.get('window').height
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    header: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    content: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 40,
        borderColor: colors.primaryDark,
    },
    rateButton: {
        marginHorizontal: 'auto',
        backgroundColor: colors.primary,
        color: colors.dark,
        borderRadius: 999,
        paddingHorizontal: 40,
        paddingVertical: 5,
        fontSize: 25
    }
});

export default OrderDetails;
