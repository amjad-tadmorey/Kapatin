import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { baseStyles, colors } from "@/utils/baseStyles"
import DriverArrivedIcon from '../../../assets/driver-arrived.svg'
import TypingText from "../../shared/TypingText"

const DriverArrived: React.FC = () => {

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