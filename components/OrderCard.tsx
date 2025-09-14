import { IOrder } from '@/types/order';
import { baseStyles, colors } from '@/utils/baseStyles';
import { formatOrderDate } from '@/utils/helpers';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Props {
    order: IOrder;
}

const OrderCard: React.FC<Props> = ({ order }) => {
    const router = useRouter();

    const {
        _id,
        status,
        from,
        items,
        created_at,
    } = order;


    const getStatusColor = () => {
        switch (status) {
            case 'delivered': return colors.dark;
            case 'canceled': return '#dc3545';
            default: return '#000';
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={[baseStyles.secHeader, { color: getStatusColor() }]}>{status}</Text>
                <Text style={[baseStyles.body]}>{formatOrderDate(created_at)}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[baseStyles.quote, { marginBottom: 16 }]}>Order ID: #{_id?.slice(-4)}</Text>
                <Text style={[baseStyles.body]}>Item:
                    {items.map((item, index) => (
                        <Text key={index}>• {item}</Text>
                    ))}
                </Text>
                <Text style={[baseStyles.body]}>Drop-off Location: {from.address.slice(0, 20)}...</Text>
            </View>

            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/order/[id]",
                        params: { id: order._id, order: JSON.stringify(order) },
                    })
                }
            >
                {/* your card UI */}
                <Text style={[baseStyles.quote, styles.link]}>View Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primaryLight,
        borderRadius: 15,
        padding: 12,
        paddingBottom: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 4,
    },
    header: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: colors.secondary
    },
    section: {
        marginTop: 10,
        marginBottom: 10
    },
    link: {
        textDecorationLine: 'underline',
        color: colors.primaryDark,
        position: 'absolute',
        right: 0,
    }
});

export default OrderCard;
