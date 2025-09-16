import { OrderFormInputs } from "@/types/order";
import { baseStyles } from "@/utils/baseStyles";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputProps = {
  control: any;
  errors: Record<string, any>;
  name: keyof OrderFormInputs;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "phone-pad";
  rules?: object;
  multiline?: boolean;
  numberOfLines?: number;
  label: string;
  editable?: boolean;
  value?: string | number;
  onPress?: () => void
};

const Input: React.FC<InputProps> = ({
  control,
  errors,
  name,
  placeholder,
  keyboardType = "default",
  rules,
  multiline = false,
  numberOfLines = 1,
  label = "",
  editable = true,
  value,
  onPress = () => { }
}) => {
  const { setValue } = useFormContext();

  // 💡 Set the value inside RHF on mount
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setValue(name, value);
    }
  }, [value, name, setValue]);

  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={baseStyles.quote}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value: fieldValue } }) => (
          <>
            <TextInput
              onPress={onPress}
              placeholder={placeholder}
              value={fieldValue != null ? String(fieldValue) : ""}
              editable={editable}
              onChangeText={(val) =>
                name === "price" || name === "deliveryFee"
                  ? onChange(Number(val))
                  : onChange(val)
              }
              keyboardType={keyboardType}
              placeholderTextColor="#aaa"
              multiline={multiline}
              numberOfLines={numberOfLines}
              style={[
                styles.input,
                errors[name] ? { borderColor: "#f87171" } : {},
                multiline ? { height: 100, textAlignVertical: "top" } : {},
              ]}
            />
            {errors[name] && (
              <Text style={styles.errorText}>
                {(errors[name]?.message as string) ||
                  "This field is required"}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorText: {
    color: "#f87171",
    fontSize: 13,
    marginTop: 4,
  },
});

export default Input;
