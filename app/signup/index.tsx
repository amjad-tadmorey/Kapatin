import { signupUser } from "@/api/auth";
import Button from "@/components/Button";
import { useOnboarding } from "@/context/OnboardingContext";
import { setCredentials } from "@/redux/slices/authSlice";
import { baseStyles, colors } from "@/utils/baseStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const Signup: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    const { markOnboardingSeen } = useOnboarding();


    const handleSignup = async () => {
        if (!email || !pin || !phoneNumber || !name) return alert("Please fill all fields");
        try {
            setLoading(true);
            const data = await signupUser(name, email, phoneNumber, pin);
            // Set user in Redux
            dispatch(setCredentials({ token: data.token, user: data.data.user }));
            markOnboardingSeen()
            router.replace("/")
        } catch (err: any) {
            alert(err.response?.data?.message || "Signup failed");
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
                        Sign Up
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

                    {/* Password */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[baseStyles.quote, { marginBottom: 6, color: colors.primary }]}>
                            Password :
                        </Text>
                        <TextInput
                            placeholder="Enter a Password"
                            placeholderTextColor={colors.primaryLight}
                            secureTextEntry // 👈 hides input for password
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                fontSize: 16,
                                color: colors.primaryLight,
                            }}
                            value={pin}
                            onChangeText={setPin}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                    </View>

                    <Button
                        title={loading ? "Signing up..." : "Sign up"}
                        onPress={handleSignup}
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

export default Signup
