import { createApplication } from "@/api/application";
import Button from "@/components/Button";
import { useOnboarding } from "@/context/OnboardingContext";
import { baseStyles, colors } from "@/utils/baseStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


const Register: React.FC = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { markOnboardingSeen } = useOnboarding();

    const onSubmit = async () => {

        setLoading(true);
        setError(null);
        const payload = {
            name,
            phoneNumber,
            email,
        }
        console.log(payload);

        try {
            await createApplication(payload);
            router.replace("/")
            markOnboardingSeen()
        } catch (err: any) {
            setError(err.message || "Failed to create Application");
            alert(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // 👈 shifts UI up on iOS, resizes on Android
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: colors.dark }}
                keyboardShouldPersistTaps="handled" // 👈 allows tapping buttons/links while keyboard is open
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                        style={[
                            baseStyles.title,
                            { color: colors.primary, textAlign: "center", marginBottom: 50 },
                        ]}
                    >
                        Drop an Application
                    </Text>

                    {/* Full Name */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[baseStyles.quote, { marginBottom: 6, color: colors.primary }]}>
                            Full Name :
                        </Text>
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor={colors.primaryLight}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                fontSize: 16,
                                color: colors.primaryLight,
                            }}
                            value={name}
                            onChangeText={setName}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[baseStyles.quote, { marginBottom: 6, color: colors.primary }]}>
                            Phone Number :
                        </Text>
                        <TextInput
                            placeholder="Enter your Phone number"
                            placeholderTextColor={colors.primaryLight}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                fontSize: 16,
                                color: colors.primaryLight,
                            }}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Email */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[baseStyles.quote, { marginBottom: 6, color: colors.primary }]}>
                            Email :
                        </Text>
                        <TextInput
                            placeholder="Enter your Email"
                            placeholderTextColor={colors.primaryLight}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                fontSize: 16,
                                color: colors.primaryLight,
                            }}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <Button
                        title={loading ? "Submiting ..." : "Submit"}
                        onPress={onSubmit}
                        disabled={loading}
                    />

                    <TouchableOpacity onPress={() => router.replace("/login")}>
                        <Text style={{ color: colors.primary, textDecorationLine: "underline", marginTop: 20, textAlign: 'center' }}>
                            Already have an account ? Log in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Register

