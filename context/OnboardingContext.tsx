import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Define the context shape
type OnboardingContextType = {
    hasSeenOnboarding: boolean | null; // null = still loading
    markOnboardingSeen: () => Promise<void>;
};

// 2. Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// 3. Create the provider
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(false);

    useEffect(() => {
        const loadFlag = async () => {
            const stored = await AsyncStorage.getItem("hasSeenOnboarding");
            setHasSeenOnboarding(JSON.parse(stored ?? "false"));
        };

        loadFlag();
    }, []);

    const markOnboardingSeen = async () => {
        await AsyncStorage.setItem("hasSeenOnboarding", JSON.stringify(true));
        setHasSeenOnboarding(true);
    };

    return (
        <OnboardingContext.Provider value={{ hasSeenOnboarding, markOnboardingSeen }}>
            {children}
        </OnboardingContext.Provider>
    );
};

// 4. Create a hook for easy access
export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within OnboardingProvider");
    }
    return context;
};
