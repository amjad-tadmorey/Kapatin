import { OrderFormInputs } from "@/types/order";
import { colors } from "@/utils/baseStyles";
import React, { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "./Input";

type MultipleInputsProps = {
  control: Control<OrderFormInputs>;
  errors: FieldErrors<OrderFormInputs>;
  namePrefix: keyof OrderFormInputs;
  placeholder: string;
  plusTitle: string;
};

const MultipleInputs: React.FC<MultipleInputsProps> = ({
  control,
  errors,
  namePrefix,
  placeholder,
  plusTitle,
}) => {
  const [fields, setFields] = useState<number[]>([0]);

  const addField = () => {
    setFields((prev) => [...prev, prev.length]);
  };

  const removeField = (indexToRemove: number) => {
    setFields((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <View>
      {fields.map((index, idx) => (
        <View key={index} style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <Input
              control={control}
              errors={errors}
              name={`${namePrefix}.${index}` as keyof OrderFormInputs}
              placeholder={`${placeholder} ${idx + 1}`}
              label={""}
            />
          </View>

          {fields.length > 1 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeField(idx)}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addField}>
        <Text style={styles.addText}>+ {plusTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MultipleInputs;
