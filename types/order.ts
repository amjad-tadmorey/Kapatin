// src/types/order.ts

// Shared user type (frontend representation)
export interface IUser {
  _id: string;
  name: string;
  email: string;
  type: "user" | "driver" | "admin" | "super-admin";
}

// Point inside "points" array
export interface IPoint {
  point: number;
  lat: number;
  lng: number;
  address?: string;
}

// "from" field structure
export interface IFrom {
  lat: number;
  lng: number;
  address?: string;
}

// Full Order type (aligned with backend schema)
export interface IOrder {
  _id?: string;

  created_at: string;
  expiresAt: string;

  price: number;
  deliveryFee: number;

  user: IUser;
  driver?: IUser | null;

  recipientName: string;
  recipientNumber: string;

  items: any[]; // can replace with IItem[] later

  from: IFrom;
  points?: IPoint[];

  status:
  | "new"
  | "closed"
  | "in-progress"
  | "delivered"
  | "canceled"
  | "driver-arrived"
  | "confirmed";

  rate?: number;
  feedback?: string;
}

// ---------- Derived types ----------

// Form inputs (before creating order, user enters strings for addresses)
export type OrderFormInputs = Pick<
  IOrder,
  "price" | "deliveryFee" | "recipientName" | "recipientNumber" | "items"
> & {
  from: string; // typed address (converted later to lat/lng)
  points?: { lat: number; lng: number; address?: string }[];
};

// Payload to create order (frontend → backend)
export type CreateOrderPayload = Pick<
  IOrder,
  | "price"
  | "deliveryFee"
  | "recipientName"
  | "recipientNumber"
  | "items"
  | "from"
  | "points"
>;

// Payload to update order (partial fields)
export type UpdateOrderPayload = Partial<
  Pick<
    IOrder,
    | "status"
    | "deliveryFee"
    | "price"
    | "recipientName"
    | "recipientNumber"
    | "rate"
    | "feedback"
    | "items"
    | "points"
  >
>;
