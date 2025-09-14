// src/types/order.ts

export interface IOrder {
  _id?: string;
  created_at?: string;
  expiresAt?: string;

  price: number;
  deliveryFee: number;

  from: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
    address: string;
  };

  to: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
    address: string;
  };

  user: IUser;
  driver?: IUser | null;

  recipientName: string;
  recipientNumber: string;

  items: any[]; // Consider replacing 'any' with a defined IItem type

  status: "new" | "closed" | "in-progress" | "delivered" | "canceled" | "driver-arrived" | "confirmed";

  rate: number;
  feedback: string;
}

// Shared user type
export interface IUser {
  _id: string;
  name: string;
  email: string;
  type: "user" | "driver" | "admin" | "super-admin";
}


export interface OrderFormInputs {
  from: string;
  to: string
  price: number;
  deliveryFee: number;
  recipientName: string;
  recipientNumber: string;
  recipientAdress: string;
  items: string;
}

export interface CreateOrderPayload {
  price: number;
  deliveryFee: number;
  items?: any[];
  recipientName: String;
  recipientNumber: String;
  from: string;
  to: string
}

export interface UpdateOrderPayload {
  status?: string; // e.g. "accepted", "delivered", "canceled"
  deliveryFee?: number;
  price?: number;
  recipientName?: string;
  recipientNumber?: string;
  rate?: number;
  feedback?: string;
  items?: any[];
}

export interface Coords {
  from: {
    latitude: number;
    longitude: number;
  };
  to: {
    latitude: number;
    longitude: number;
  };
}
