import Input from "@/components/shared/Input";
import { baseStyles, colors } from "@/utils/baseStyles";
import React from "react";
import { StyleSheet, Text } from "react-native";

const DeliveryInfo: React.FC<{ control: any, errors: any, dynamicDeliveryFee: number | null }> = ({ control, errors, dynamicDeliveryFee }) => {

    console.log(dynamicDeliveryFee);

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
            label={<Text>Delivery Fees: <Text style={{ color: colors.primaryDark }}>(dynamic below 35 km)</Text> </Text>}
            keyboardType="numeric"
            value={dynamicDeliveryFee ?? undefined}  // <-- pass dynamic fee here
            editable={dynamicDeliveryFee === null}
        />
        {dynamicDeliveryFee === null && <Text style={[baseStyles.quote, { backgroundColor: colors.primaryLight, padding: 10, borderRadius: 15, color: colors.dark }]}>Your delivery distance exceeds 35 km. Please contact the driver directly to arrange the delivery fee</Text>}
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