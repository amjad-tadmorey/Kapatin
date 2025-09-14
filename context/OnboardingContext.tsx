import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Define the context shape
type OnboardingContextType = {
    hasSeenOnboarding: boolean;
    loading: boolean;
    markOnboardingSeen: () => Promise<void>;
};

// 2. Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// 3. Create the provider
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFlag = async () => {
            try {
                const stored = await AsyncStorage.getItem("hasSeenOnboarding");
                if (stored !== null) {
                    setHasSeenOnboarding(JSON.parse(stored));
                }
            } catch (e) {
                console.error("Failed to load onboarding flag:", e);
            } finally {
                setLoading(false);
            }
        };

        loadFlag();
    }, []);

    const markOnboardingSeen = async () => {
        await AsyncStorage.setItem("hasSeenOnboarding", JSON.stringify(true));
        setHasSeenOnboarding(true);
    };

    return (
        <OnboardingContext.Provider value={{ hasSeenOnboarding, loading, markOnboardingSeen }}>
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
