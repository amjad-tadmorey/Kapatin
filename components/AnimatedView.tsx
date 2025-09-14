import { colors } from "@/utils/baseStyles";
import React, { ReactNode, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

interface AnimatedViewProps {
    children: ReactNode;
    level?: number;
    size?: number;
    color?: string
}

const AnimatedView: React.FC<AnimatedViewProps> = ({ children, level = 3, size = 70, color = "#444" }) => {
    const animWidth = useRef(new Animated.Value(width)).current;
    const animHeight = useRef(new Animated.Value(height)).current;
    const animX = useRef(new Animated.Value(0)).current;
    const animY = useRef(new Animated.Value(0)).current;
    const borderRadius = useRef(new Animated.Value(0)).current;

    const [minimized, setMinimized] = useState(false);
    const [animating, setAnimating] = useState(false);

    const circleSize = 70;
    const circleLeft = (width - circleSize) / 2;
    const circleTop = height - circleSize - 120;

    const minimize = () => {
        if (animating) return;
        setAnimating(true);

        const circleSize = 70;
        const circleLeft = 20; // 👈 distance from left edge
        const circleTop = height - circleSize - 120; // 👈 distance from bottom

        Animated.parallel([
            Animated.timing(animWidth, {
                toValue: circleSize,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animHeight, {
                toValue: circleSize,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animX, {
                toValue: circleLeft,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animY, {
                toValue: circleTop,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(borderRadius, {
                toValue: circleSize / 2,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setMinimized(true);
            setAnimating(false);
        });
    };

    const expand = () => {
        if (animating) return;
        setAnimating(true);
        Animated.parallel([
            Animated.timing(animWidth, {
                toValue: width,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animHeight, {
                toValue: height,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animX, { toValue: 0, duration: 300, useNativeDriver: false }),
            Animated.timing(animY, { toValue: 0, duration: 300, useNativeDriver: false }),
            Animated.timing(borderRadius, { toValue: 0, duration: 300, useNativeDriver: false }),
        ]).start(() => {
            setMinimized(false);
            setAnimating(false);
        });
    };

    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Each level = 25%
    const progress = Math.min(level, 4) / 4;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        // Top-level wrapper — keep absolute full-screen so overlay can sit above
        <View style={styles.wrapper} pointerEvents="box-none">
            {/* Animated panel (content). This animates, but does NOT contain the pressable when minimized */}
            <Animated.View
                style={[
                    styles.container,
                    {
                        width: animWidth,
                        height: animHeight,
                        left: animX,
                        top: animY,
                        borderRadius,
                    },
                ]}
            >
                {!minimized && (
                    <>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={minimize}
                            disabled={animating}
                        >
                            <Text style={{ color: "white", fontSize: 16 }}>←</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>{children}</View>
                    </>
                )}
            </Animated.View>

            {/* Overlay circle: rendered as a sibling, not a child of the animated view */}
            {minimized && (
                <TouchableOpacity
                    style={styles.circleTouchable}
                    onPress={expand}
                    disabled={animating}
                >
                    <View
                        style={{
                            width: size,
                            height: size,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Svg width={size} height={size}>
                            {/* background border */}
                            <Circle
                                stroke="#ddd"
                                fill="none"
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                strokeWidth={strokeWidth}
                            />
                            {/* progress border */}
                            <Circle
                                stroke={color}
                                fill="none"
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${size / 2}, ${size / 2}`}
                            />
                        </Svg>

                        <View style={{ position: "absolute" }}>
                            <Icon name="inventory-2" size={40} color="#444" />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
    },
    container: {
        position: "absolute",
        backgroundColor: "#222",
        overflow: "hidden",
        zIndex: 0,
    },
    backButton: {
        position: "absolute",
        top: 50,
        height: 30,
        width: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: 20,
        zIndex: 10,
        backgroundColor: "#00000088",
        borderRadius: 20,
    },
    circleTouchable: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        zIndex: 10000,
        position: "absolute",
        bottom: 120,
        left: 20
    },
    content: {
        width,
        height,
    },
});

export default AnimatedView;
