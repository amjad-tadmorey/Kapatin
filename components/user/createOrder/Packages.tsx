import MultipleInputs from "@/components/shared/MultipleInputs";
import { baseStyles, colors } from "@/utils/baseStyles";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { JSX } from "react";
import { Controller } from "react-hook-form";
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const options = {
    packageType: ["small", "medium", "large"],
    vehicleType: ["car", "van", "truck"],
};

// Map icons for each type
const packageIcons: Record<string, JSX.Element> = {
    small: <MaterialCommunityIcons name="cube-outline" size={40} color={colors.primary} />,
    medium: <MaterialCommunityIcons name="cube-outline" size={50} color={colors.primary} />,
    large: <MaterialCommunityIcons name="cube-outline" size={60} color={colors.primary} />,
};

const vehicleIcons: Record<string, JSX.Element> = {
    car: <FontAwesome5 name="car" size={60} color={colors.primary} />,
    van: <MaterialCommunityIcons name="van-passenger" size={60} color={colors.primary} />,
    truck: <FontAwesome5 name="truck" size={60} color={colors.primary} />,
};

const SelectOption = ({
    name,
    control,
    values,
}: {
    name: string;
    control: any;
    values: string[];
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <View style={styles.row}>
                    {values.map((val) => {
                        const scale = new Animated.Value(1);

                        const handlePress = () => {
                            Animated.sequence([
                                Animated.timing(scale, {
                                    toValue: 1.1,
                                    duration: 100,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(scale, {
                                    toValue: 1,
                                    duration: 100,
                                    useNativeDriver: true,
                                }),
                            ]).start();
                            onChange(val);
                        };

                        const isSelected = value === val;

                        const icon =
                            name === "packageType"
                                ? packageIcons[val]
                                : vehicleIcons[val];

                        return (
                            <Pressable key={val} onPress={handlePress}>
                                <Animated.View
                                    style={[
                                        { transform: [{ scale }] },
                                        styles.option,
                                        isSelected && styles.selected,
                                    ]}
                                >
                                    {icon}
                                    <Text style={styles.optionLabel}>{val}</Text>
                                </Animated.View>
                            </Pressable>
                        );
                    })}
                </View>
            )}
        />
    );
};

const Packages: React.FC<{ control: any; errors: any }> = ({
    control,
    errors,
}) => {
    return (
        <>
            {/* Section 1: Package Type */}
            <View style={styles.box}>
                <Text style={[baseStyles.secHeader, styles.title]}>
                    Select Package Type:
                </Text>
                <SelectOption
                    name="packageType"
                    control={control}
                    values={options.packageType}
                />
            </View>

            {/* Section 2: Vehicle Type */}
            <View style={styles.box}>
                <Text style={[baseStyles.secHeader, styles.title]}>
                    Select Vehicle Type:
                </Text>
                <SelectOption
                    name="vehicleType"
                    control={control}
                    values={options.vehicleType}
                />
            </View>

            {/* Section 3: List Products */}
            <View style={styles.box}>
                <Text style={[baseStyles.secHeader, styles.title]}>
                    List Your Products:
                </Text>
                <MultipleInputs
                    control={control}
                    errors={errors}
                    namePrefix="items"
                    placeholder="Enter item"
                    plusTitle="Add Item"
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 10,
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 20,
        marginBottom: 10,
    },
    title: {
        color: colors.primaryDark,
        marginBottom: 15,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    option: {
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.primaryDark,
        borderRadius: 10,
        alignItems: "center",
        width: 100,
        height: 100,
    },
    selected: {
        backgroundColor: colors.primaryLight,
    },
    optionLabel: {
        marginTop: 'auto',
        color: colors.primaryDark,
        fontSize: 12,
        textTransform: "capitalize",
    },
});

export default Packages;
