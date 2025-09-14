import { axiosInstance } from "./constants";
// aaa
export const loginUser = async (email: string, pin: string) => {
  console.log(email, pin);
  try {
    const response = await axiosInstance.post("/auth/login", { email, pin });

    return response.data; // expected to include JWT and user info
  } catch (err) {
    console.log(err);
  }
};

export const signupUser = async ( name: string, email: string, phoneNumber: string, pin: string) => {

  try {
    const response = await axiosInstance.post("/auth/users", { name, email, phoneNumber, pin });
    return response.data; // expected to include JWT and user info
  } catch (err) {
    console.log(err);
  }
};
