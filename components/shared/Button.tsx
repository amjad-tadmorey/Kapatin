import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/baseStyles';

interface ButtonProps {
  onPress: () => void;
  disabled: boolean;
  title: string;
  variant?: string
}

const Button: React.FC<ButtonProps> = ({ onPress, disabled, title, variant = 'primary' }) => {
  const isDark = variant === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isDark ? colors.dark : colors.primary },
      ]}
      disabled={disabled}
    >
      {/* "before" side stripe */}
      <View
        style={[
          styles.before,
          {
            backgroundColor: isDark ? colors.primary : colors.dark,
          },
        ]}
      />
      <Text
        style={[
          styles.buttonText,
          { color: isDark ? colors.primary : colors.dark },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    overflow: 'hidden',
  },
  before: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Button;
