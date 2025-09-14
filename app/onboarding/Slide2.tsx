// components/Slide1.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Sender from "../../assets/sender.svg";
import { baseStyles, colors } from "../../utils/baseStyles";


export default function Slide2() {
    return (
        <View style={[styles.slide, { display: 'flex', gap: 100 }]}>
            <View>
                <Text
                    style={[baseStyles.title, { color: colors.primary }]}
                >
                    Sell & deliver
                </Text>
                <Text
                    style={[baseStyles.title,
                    { color: colors.primary },
                    { textAlign: 'center' }
                    ]}
                >
                    with ease
                </Text>
            </View>
            <View style={styles.flex}>
                <Sender width={150} height={150} />
                <Text
                    style={[baseStyles.subHeading, { color: colors.primaryLight }]}
                >
                    Post your orders, and tell drivers handle the delivery
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    slide: { flex: 1, paddingTop: 150, alignItems: "center", padding: 20, backgroundColor: colors.dark },
    flex: {
        flexDirection: "column",       // row layout
        // alignItems: "center",       // vertical alignment
        // justifyContent: "space-between", // push text left, image right
        padding: 10,
        alignSelf: 'flex-start',
        gap: 20,
        width: '70%'
    },
    text: {
        fontSize: 18,
        color: "#333",
    },
});
