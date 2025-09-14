import { axiosInstance } from "./constants";
import { IApplication } from "types/application";


export const createApplication = async (payload: IApplication) => {
    try {
        const res = await axiosInstance.post<IApplication>("/applications", payload);

        return res.data;
    } catch (err: any) {
        throw new Error(err.message || "Failed to create order");
    }
};

