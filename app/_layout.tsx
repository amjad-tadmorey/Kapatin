// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import AuthWrapper from "../components/AuthWrapper";

import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";

import { OnboardingProvider } from "@/context/OnboardingContext";
import { store } from "@/redux/store";

export default function RootLayout() {



  // useEffect(() => {
  //   const resetOnboardingFlag = async () => {
  //     try {
  //       await AsyncStorage.setItem("hasSeenOnboarding", "false");
  //       console.log("Onboarding flag reset to false.");
  //     } catch (error) {
  //       console.error("Error resetting onboarding flag:", error);
  //     }
  //   };

  //   resetOnboardingFlag();
  // }, []);


  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Lato_400Regular,
    Montserrat_700Bold,
    Nunito_400Regular,
    OpenSans_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <OnboardingProvider>
        <AuthWrapper>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthWrapper>
      </OnboardingProvider>
    </Provider>

  );
}
