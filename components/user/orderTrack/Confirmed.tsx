import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { baseStyles, colors } from "@/utils/baseStyles"
import CheckIcon from '../../../assets/check.svg'
import TypingText from "../../shared/TypingText"


const Confirmed: React.FC = () => {

    return <View style={styles.section}>
        <CheckIcon width={75} height={75} />
        <Text style={[baseStyles.title, { color: colors.primary, textAlign: 'center' }]}>Confirmed!</Text>
        <TypingText
            text="The driver is heading to you to pick up the package."
            style={[baseStyles.caption, { color: colors.dark, marginTop: 20, textAlign: 'center' }]}
            speed={80}  // optional, default 100ms
            loop={false} // optional, default false
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
        flex: 1, // allows it to fill the screen
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 100
    }
});

export default Confirmed