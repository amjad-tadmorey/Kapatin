import { loginUser } from "@/api/auth";
import Button from "@/components/Button";
import { useOnboarding } from "@/context/OnboardingContext";
import { setCredentials } from "@/redux/slices/authSlice";
import { baseStyles, colors } from "@/utils/baseStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";



const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const { markOnboardingSeen } = useOnboarding();

    const handleLogin = async () => {
        if (!email || !pin) return alert("Please fill all fields");
        try {
            setLoading(true);
            const data = await loginUser(email, pin);

            // Set user in Redux
            dispatch(setCredentials({ token: data.token, user: data.data.user }));
            markOnboardingSeen()
            router.replace('/')
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.dark, // screen-specific color
            }}
            edges={["top", "bottom"]} // control which edges are safe
        >
            <StatusBar barStyle="light-content" backgroundColor="#ff0000" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} // 👈 shifts UI up on iOS, resizes on Android
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: colors.dark }}
                    keyboardShouldPersistTaps="handled" // 👈 allows tapping buttons/links while keyboard is open
                >
                    <View style={{ flex: 1, justifyContent: "center", marginTop: 200 }}>
                        <Text
                            style={[
                                baseStyles.title,
                                { color: colors.primary, textAlign: "center", marginBottom: 50 },
                            ]}
                        >
                            Log in
                        </Text>
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
                            title={loading ? "Loging in..." : "Log in"}
                            onPress={handleLogin}
                            disabled={loading}
                        />

                        <View style={{ marginTop: "auto", paddingBottom: 20 }}>


                            <TouchableOpacity onPress={() => router.push("/signup")} >
                                <Text style={{ color: colors.primary, textDecorationLine: "underline", textAlign: "center", marginTop: 20 }}>
                                    Don't have an account? Sign up now
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push("/register")} >
                                <Text style={{ color: colors.primary, textDecorationLine: "underline", textAlign: "center", marginTop: 20 }}>
                                    Or you can send your application as driver
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};


export default Login;

