import { getOrders } from "@/api/order";
import OrderCard from "@/components/shared/OrderCard";
import useOrderEvents from "@/hooks/useOrderEvents";
import { RootState } from "@/redux/store";
import { IOrder } from "@/types/order";
import { baseStyles, colors } from "@/utils/baseStyles";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Activity: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { orders, loading } = useOrderEvents(getOrders, true, { user: user?._id });

    if (loading) return null;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[baseStyles.heading, { color: colors.primary, marginBottom: 10 }]}>Kapatin</Text>
            {orders
                .filter(o => o.status === 'delivered' || o.status === 'canceled')
                .length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>No orders found</Text>
                </View>
            ) : (
                <FlatList
                    data={orders
                        .filter(o => o.status === 'delivered' || o.status === 'canceled')
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    }
                    keyExtractor={(item: IOrder) => item._id ?? Math.random().toString()}
                    renderItem={({ item }) => <OrderCard order={item} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            {/* <ActiveOrder /> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.secondary,
    },
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "#aaa",
        fontSize: 16,
    },
});

export default Activity;
