import MultipleInputs from "@/components/shared/MultipleInputs";
import { baseStyles, colors } from "@/utils/baseStyles";
import React from "react";
import { StyleSheet, Text } from "react-native";

const Packages: React.FC<{ control: any, errors: any }> = ({ control, errors }) => {
    return <>
        <Text style={[baseStyles.secHeader, styles.title]}>
            List Your Products:
        </Text>
        <MultipleInputs
            control={control}
            errors={errors}
            namePrefix="items"
            placeholder="Enter item"
            plusTitle="Add Item"
        />
    </>
}


const styles = StyleSheet.create({
    title: {
        color: colors.primaryDark,
        marginBottom: 20,
        textAlign: "center",
    },
});


export default Packages