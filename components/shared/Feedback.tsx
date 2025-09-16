import { updateOrder } from '@/api/order';
import { baseStyles, colors } from '@/utils/baseStyles';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Button from './Button';


interface FeedbackProps {
  id: string;
  setCloseOrder: (value: boolean) => void;
  setShowFeedback: (value: boolean) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ id, setCloseOrder, setShowFeedback }) => {
  const [rate, setRate] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false)

  const handleStarPress = (value: number) => {
    setRate(value);
  };

  const handleClose = () => {
    setShowFeedback(false)
    setCloseOrder(true)
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateOrder(id, { rate, feedback });
    } catch (err: any) {
      console.error(err || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
    setCloseOrder(true)
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text onPress={handleClose} style={{ position: "absolute", right: 20, top: 15, color: colors.secondary, fontSize: 20 }}>X</Text>
          <Text style={[baseStyles.heading, { color: colors.secondary, textAlign: 'center' }]}>
            How do you feel?
          </Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Text style={[styles.star, { color: star <= rate ? colors.secondary : colors.secondary }]}>
                  {star <= rate ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[baseStyles.caption, { textAlign: 'center', color: colors.secondary }]}>
            Any Extras ?
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder=""
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />
          <Button
            onPress={handleSubmit}
            disabled={loading}
            title={loading ? "Submiting..." : "Submit"}
            variant="dark"
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: colors.primary,
    borderRadius: 20

  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    fontSize: 60,
    marginHorizontal: 5,
  },
  textArea: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
    color: colors.secondary,
    backgroundColor: 'transparent',
  },
});
