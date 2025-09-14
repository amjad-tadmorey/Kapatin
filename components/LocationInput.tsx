import { OrderFormInputs } from "@/types/order";
import { baseStyles } from "@/utils/baseStyles";
import { getCoordsFromAddress } from "@/utils/location";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface LocationInputProps {
    control: any;
    setValue: any
    errors: Record<string, any>;
    location?: string;
    name: keyof OrderFormInputs;
    placeholder: string;
    keyboardType?: "default" | "numeric" | "phone-pad";
    rules?: object;
    multiline?: boolean;
    numberOfLines?: number;
    label: string;
    setLocationsSuggestions: (suggestions: any[]) => void;
    onFocus: () => void
}

const LocationInput: React.FC<LocationInputProps> = ({
    location,
    control,
    setValue,
    errors,
    name,
    label,
    placeholder,
    keyboardType = "default",
    rules,
    multiline = false,
    numberOfLines = 1,
    setLocationsSuggestions,
    onFocus,
}) => {
    // 🟢 Set the initial value when location changes
    useEffect(() => {
        if (location) {
            setValue(name, location, { shouldValidate: true });
        }
    }, [location, name, setValue]);

    return (
        <View style={styles.inputOverlay}>
            <Text style={baseStyles.quote}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <View style={{ marginBottom: 18 }}>
                        <TextInput
                            onFocus={onFocus}
                            placeholder={placeholder}
                            value={value ? String(value) : ""}
                            onChangeText={async (val) => {
                                onChange(val);
                                const suggestions = await getCoordsFromAddress(val);
                                setLocationsSuggestions(suggestions)
                            }
                            }
                            keyboardType={keyboardType}
                            placeholderTextColor="#aaa"
                            multiline={multiline}
                            numberOfLines={numberOfLines}
                            style={[
                                styles.input,
                                errors[name] ? { borderColor: "#f87171" } : {},
                                multiline ? { height: 100, textAlignVertical: "top" } : {},
                            ]}
                        />
                        {errors[name] && (
                            <Text style={styles.errorText}>
                                {(errors[name]?.message as string) || "This field is required"}
                            </Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputOverlay: {
        // position: "absolute",
        // top: 40, // adjust as needed
        // left: 20,
        // right: 20,
        // zIndex: 10,
    },
    input: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    errorText: {
        color: "#f87171",
        fontSize: 13,
        marginTop: 4,
    },
});

export default LocationInput;
