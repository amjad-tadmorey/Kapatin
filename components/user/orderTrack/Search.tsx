import { updateOrder } from "@/api/order";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { baseStyles, colors } from "@/utils/baseStyles";
import SearchIcon from '../../../assets/search.svg';
import Button from "../../shared/Button";
import TypingText from "../../shared/TypingText";


const Search: React.FC<{ id: string }> = ({ id }) => {
  const [showTypingText, setShowTypingText] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypingText(true);
    }, 5000); // 60,000 ms = 1 minute

    return () => clearTimeout(timer); // cleanup
  }, []);

  const handleCancelOrder = async () => {
    setLoading(true);
    try {
      await updateOrder(id, { status: 'canceled' });
    } catch (err: any) {
      console.error(err || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return <View style={styles.section}>
    <SearchIcon width={100} height={100} />
    <Text style={[baseStyles.heading, { color: colors.primary, textAlign: 'center' }]}>Finding you a driver ..</Text>
    {showTypingText && (
      <TypingText
        text="it's taking too long."
        style={[
          baseStyles.caption,
          {
            color: colors.dark,
            marginTop: 40,

            textAlign: 'center',
          },
        ]}
        speed={80}
        loop={false}
      />
    )}
    <View style={{ borderTopWidth: 1, width: "100%", borderTopColor: colors.primary, marginTop: 'auto', }}>
      <Button
        onPress={handleCancelOrder}
        disabled={loading}
        title={loading ? "Canceling..." : "Cancel"}
        variant="dark"
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  section: {
    flex: 1, // allows it to fill the screen
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 100
  }
});

export default Search