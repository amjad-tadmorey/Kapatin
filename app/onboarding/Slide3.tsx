import { baseStyles, colors } from '@/utils/baseStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Driver from "../../assets/driver.svg";
const Slide3: React.FC = () => {
    return (
        <View style={[styles.slide, { display: 'flex', gap: 100 }]}>
            <View>
                <Text
                    style={[baseStyles.heading, { color: colors.primary }]}
                >
                    Drive, Deliver, Earn 💸
                </Text>
            </View>
            <View style={styles.flex}>
                <Text
                    style={[baseStyles.subHeading, { color: colors.primaryLight, textAlign: 'right' }]}
                >
                    Get matched with sellers, pick up orders, and deliver fast
                </Text>
                <Driver width={150} height={150} style={{ marginLeft: 'auto' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slide: { flex: 1, paddingTop: 250, alignItems: "center", padding: 20, backgroundColor: colors.dark },
    flex: {
        flexDirection: "column",       // row layout
        // alignItems: "center",       // vertical alignment
        // justifyContent: "space-between", // push text left, image right
        padding: 10,
        alignSelf: 'flex-end',
        gap: 20,
        width: '80%',
        marginLeft: 'auto'
    },
});


export default Slide3