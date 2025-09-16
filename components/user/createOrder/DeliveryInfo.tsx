import Input from "@/components/shared/Input";
import { baseStyles, colors } from "@/utils/baseStyles";
import React from "react";
import { StyleSheet, Text } from "react-native";

const DeliveryInfo: React.FC<{ control: any, errors: any }> = ({ control, errors }) => {
    return <>
        <Text style={[baseStyles.secHeader, styles.title]}>
            Delivery Information:
        </Text>
        <Input
            control={control}
            errors={errors}
            name="recipientName"
            placeholder="Full Name"
            rules={{ required: "Recipient name is required" }}
            label="Receiver's Full Name:"
        />
        <Input
            control={control}
            errors={errors}
            name="recipientNumber"
            placeholder="Phone Number"
            rules={{ required: "Recipient number is required" }}
            label="Receiver's Phone Number:"
            keyboardType="phone-pad"
        />
        <Input
            control={control}
            errors={errors}
            name="price"
            placeholder="Price"
            rules={{ required: "Price is required" }}
            label="Products Price:"
            keyboardType="numeric"
        />
        <Input
            control={control}
            errors={errors}
            name="deliveryFee"
            placeholder="Delivery Fee"
            rules={{ required: "Delivery fee is required" }}
            label="Delivery Fees:"
            keyboardType="numeric"
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

export default DeliveryInfo