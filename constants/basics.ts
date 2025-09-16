export const getDynamicDeliveryFee = (distance: number): number | null => {
    let fee: number | null = null;

    if (distance <= 5) {
        fee = 2;
    } else if (distance > 5 && distance <= 10) {
        fee = 3;
    } else if (distance > 10 && distance <= 15) {
        fee = 4;
    } else if (distance > 15 && distance <= 20) {
        fee = 5;
    } else if (distance > 20 && distance <= 25) {
        fee = 7;
    } else if (distance > 25 && distance <= 35) {
        fee = 10;
    } else {
        fee = null;
    }
    return fee
};
