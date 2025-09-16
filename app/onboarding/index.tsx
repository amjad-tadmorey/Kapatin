// app/onboarding/index.tsx
import { baseStyles, colors } from "@/utils/baseStyles";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Arrow from '../../assets/arrow.svg';
import Button from '../../components/shared/Button';
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const { width } = Dimensions.get("window");

export default function Onboarding() {
    const router = useRouter();

    const [step, setStep] = useState(0);

    const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />];

    // animated value to shift slides horizontally
    const translateX = useRef(new Animated.Value(0)).current;

    const finishOnboarding = async () => {
        router.replace("/role");
    };

    const goNext = () => {
        if (step < slides.length - 1) {
            Animated.timing(translateX, {
                toValue: -(step + 1) * width,
                duration: 400,
                useNativeDriver: true,
            }).start();
            setStep(step + 1);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.dark }}>
            <Animated.View
                style={[
                    styles.slideContainer,
                    { width: width * slides.length, transform: [{ translateX }] },
                ]}
            >
                {slides.map((slide, index) => (
                    <View key={index} style={{ width }}>
                        {slide}
                    </View>
                ))}
            </Animated.View>

            {step < slides.length - 1 ? (
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={finishOnboarding}>
                        <Text className="" style={[baseStyles.secHeader, { color: colors.primary }]}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goNext}>
                        <Arrow width={60} height={60} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ marginBottom: 100 }}>
                    <Button disabled={false} title="Get Started" onPress={finishOnboarding} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        flexDirection: "row",
        flex: 1,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
});
