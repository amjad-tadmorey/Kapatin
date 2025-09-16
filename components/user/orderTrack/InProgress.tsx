import { baseStyles, colors } from "@/utils/baseStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CallIcon from '../../../assets/call.svg';
import InProgressIcon from '../../../assets/truck.svg';
import TypingText from "../../shared/TypingText";

const InProgress: React.FC = () => {
    return <View style={styles.section}>
        <InProgressIcon width={150} height={150} />
        <Text style={[baseStyles.heading, { color: colors.primary, textAlign: 'center' }]}>
            Almost there ! 15 minutes left
        </Text>
        <TypingText
            text="Driver on the way to the customer."
            style={[baseStyles.caption, { color: colors.dark, marginTop: 40, textAlign: 'center' }]}
            speed={80}
            loop={false}
        />
        <View style={{ flex: 1, marginLeft: 'auto' }}>
            <CallIcon width={50} height={50} />
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

export default InProgress