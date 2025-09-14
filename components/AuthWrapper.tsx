import { useOnboarding } from "@/context/OnboardingContext";
import { RootState } from "@/redux/store";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthWrapper: React.FC = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const { hasSeenOnboarding } = useOnboarding();
    console.log(hasSeenOnboarding);
    
    useEffect(() => {
        if (!hasSeenOnboarding) {
            router.replace("/onboarding");
        } else if (!token) {
            router.replace("/login");
        } else if (user.type === "user") {
            router.replace("/user");
        } else if (user.type === "driver") {
            router.replace("/driver");
        }
    }, [token, user, hasSeenOnboarding]);

    return <Slot />;
};

export default AuthWrapper;
