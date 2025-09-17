import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { baseStyles, colors } from "@/utils/baseStyles"
import DriverToYouIcon from '../../../assets/driver-to-you.svg'
import TypingText from "../../shared/TypingText"
import Confirmed from "./Confirmed"

const DriverToYou: React.FC = () => {
    const [showConfirmed, setShowConfirmed] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfirmed(false);
        }, 5000); // 5 seconds
        return () => clearTimeout(timer);
    }, []);

    if (showConfirmed) {
        return <Confirmed />;
    }

    return <View style={styles.section}>
        <DriverToYouIcon width={75} height={75} />
        <Text style={[baseStyles.heading, { color: colors.primary, textAlign: 'center' }]}>Arriving within 15 minutes</Text>
        <TypingText
            text="On the way to you."
            style={[baseStyles.caption, { color: colors.dark, marginTop: 20, textAlign: 'center' }]}
            speed={80}
            loop={false}
        />
        <View style={{ backgroundColor: colors.dark, padding: 20, borderRadius: 20, marginTop: 'auto' }}>
            <Text style={[baseStyles.quote, { color: colors.primary, marginBottom: 5 }]}>Your delivery guy for today is: </Text>
            <Text style={[baseStyles.quote, { color: colors.secondary, marginBottom: 5 }]}>Mohammad Attowa</Text>
            <Text style={[baseStyles.quote, { color: colors.primary, marginBottom: 5 }]}>Phone: <Text style={{ color: colors.secondary }}>123456789</Text></Text>
            <Text style={[baseStyles.quote, { color: colors.primary, marginBottom: 5 }]}>Vehicle: <Text style={{ color: colors.secondary }}>gms 2025 / grey/ MBD675</Text></Text>
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

export default DriverToYou