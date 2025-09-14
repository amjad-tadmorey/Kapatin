import { updateOrder } from "@/api/order"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { baseStyles, colors } from "@/utils/baseStyles"
import DriverArrivedIcon from '../assets/driver-arrived.svg'
import Button from "./Button"
import TypingText from "./TypingText"

const DriverArrived: React.FC<{ id: string }> = ({ id }) => {
    const [loading, setLoading] = useState(false)
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

    return <View style={styles.section}>
        <DriverArrivedIcon width={75} height={75} />
        <Text style={[baseStyles.title, { color: colors.primary, textAlign: 'center' }]}>
            Driver Arrived!
        </Text>
        <TypingText
            text="Please hand over the package."
            style={[baseStyles.caption, { color: colors.dark, marginTop: 40, textAlign: 'center' }]}
            speed={80}  // optional, default 100ms
            loop={false} // optional, default false
        />
        <View style={{ borderTopWidth: 1, width: "100%", borderTopColor: colors.primary, marginTop: 'auto', }}>
            <Button
                onPress={handleCancelOrder}
                disabled={loading}
                title={loading ? "Canceling..." : "Cancel"}
                variant="dark"
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 100
    }
});

export default DriverArrived