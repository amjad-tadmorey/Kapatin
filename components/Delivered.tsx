import { baseStyles, colors } from "@/utils/baseStyles";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeliveredIcon from "../assets/delivered.svg";
import TypingText from "./TypingText";

interface DeliveredProps {
  setShowFeedback: (value: boolean) => void;
  status: string;
}

const Delivered: React.FC<DeliveredProps> = ({ setShowFeedback, status }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (status === "delivered") {
      timer = setTimeout(() => {
        setShowFeedback(true);
      }, 5000);
    } else {
      setShowFeedback(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status, setShowFeedback]);

  return (
    <View style={styles.section}>
      <DeliveredIcon width={75} height={75} />
      <Text
        style={[
          baseStyles.heading,
          { color: colors.primary, textAlign: "center" },
        ]}
      >
        Package delivered!
      </Text>
      <TypingText
        text="Your customer has received the package successfully."
        style={[
          baseStyles.caption,
          { color: colors.dark, marginTop: 40, textAlign: "center" },
        ]}
        speed={80}
        loop={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 100,
  },
});

export default Delivered;
