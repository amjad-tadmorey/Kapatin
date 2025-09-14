import { StyleSheet } from "react-native";

export const colors = {
  primary: "#b7db63",
  secondary: "#f2f2f2",
  dark: "#333333",
  primaryDark: "#8ea844",
  primaryLight: "#d9e4c7",
};

// match the exact keys you load in _layout.tsx with useFonts()
export const baseStyles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold", // matches useFonts key
  },
  subTitle: {
    fontSize: 36,
    fontFamily: "Lato_400Regular",
  },
  heading: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
  },
  subHeading: {
    fontSize: 28,
    fontFamily: "Nunito_400Regular",
  },
  secHeader: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },
  body: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  quote: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  caption: {
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
  },
});
