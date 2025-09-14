// components/Slide1.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Welcome from '../../assets/welcome.svg';
import { baseStyles, colors } from "../../utils/baseStyles";


const Slide1: React.FC = () => {
    return (
        <View style={[styles.slide, { display: 'flex', gap: 150 }]}>
            <View>
                <Text
                    style={[baseStyles.title, { color: colors.secondary }]}
                >
                    Welcome to
                </Text>
                <Text
                    style={[baseStyles.title,
                    { color: colors.primary },
                    { textAlign: 'center' }
                    ]}
                >
                    Kapatin
                </Text>
            </View>
            <View style={styles.flex}>
                <Text
                    style={[baseStyles.subHeading, { color: colors.primaryLight, flex: 1, textAlign: 'center' }]}
                >
                    Connecting sellers with drivers in one simple app
                </Text>
                <Welcome width={175} height={175} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    slide: { flex: 1, paddingTop: 150, alignItems: "center", padding: 20, backgroundColor: colors.dark },
    flex: {
        flexDirection: "row",       // row layout
        alignItems: "center",       // vertical alignment
        justifyContent: "space-between", // push text left, image right
        padding: 10,
        gap: 20,
    },
});

export default Slide1
