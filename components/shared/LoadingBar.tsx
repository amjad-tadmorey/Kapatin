// LoadingBar.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

interface LoadingBarProps {
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    fillColor?: string;
    speed?: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
    width = "100%",
    height = 6,
    backgroundColor = "#eee",
    fillColor = "#3498db",
}) => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            anim.setValue(0);
            Animated.timing(anim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }).start(() => animate());
        };
        animate();
    }, [anim, 2000]);

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["-100%", "100%"],
    });

    return (
        <View style={[styles.container, { width, height, backgroundColor } as ViewStyle]}>
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: fillColor, transform: [{ translateX }] },
                ]}
            />
        </View>
    );
};

export default LoadingBar;

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 3,
    },
    bar: {
        width: "100%", // the visible bar portion
        height: "100%",
    },
});
