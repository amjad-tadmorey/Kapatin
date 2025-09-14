import { baseStyles, colors } from "@/utils/baseStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoleDriver from '../../assets/role-driver.svg';
import RoleSender from '../../assets/role-sender.svg';

const RoleSelection: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={[baseStyles.title, { color: colors.primary, marginBottom: 100 }]}>Pick your role</Text>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onPress={
                        () =>
                            router.push("/signup")
                    }
                >
                    <RoleSender width={150} height={150} style={styles.button} />
                    <Text style={[baseStyles.heading, { color: colors.primary }]}>Sender</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() =>
                        router.push("/register")
                    }
                >
                    <RoleDriver width={150} height={150} style={styles.button} />
                    <Text style={[baseStyles.heading, { color: colors.primary }]}>Driver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", display: 'flex', gap: 20, backgroundColor: colors.dark },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
    button: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 25,
        marginVertical: 10,
        alignItems: "center",
    },
    btnText: { color: "#fff", fontSize: 18 },
});

export default RoleSelection
