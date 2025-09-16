// app/_layout.tsx
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import AuthWrapper from "../components/shared/AuthWrapper";

import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";

import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import usePushNotifications from "@/hooks/usePushNotifications";
import { store } from "@/redux/store";

// ✅ prevent splash from hiding automatically
SplashScreen.preventAutoHideAsync();

function LayoutWithOnboarding() {
  const { loading } = useOnboarding();
  const expoPushToken = usePushNotifications();
  console.log(expoPushToken);


  useEffect(() => {
    if (!loading) {
      // ✅ hide splash once onboarding state is ready
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    // returning null keeps the splash screen visible
    return null;
  }

  return (
    <AuthWrapper>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthWrapper>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Lato_400Regular,
    Montserrat_700Bold,
    Nunito_400Regular,
    OpenSans_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // ✅ hide splash once fonts are ready
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // keep splash visible
  }

  return (
    <Provider store={store}>
      <OnboardingProvider>
        <LayoutWithOnboarding />
      </OnboardingProvider>
    </Provider>
  );
}
