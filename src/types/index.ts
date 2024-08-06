import { ICart, ICartProduct } from "@/models/Cart";
import React, { Dispatch, SetStateAction } from "react";

interface ChartData {
  product: string;
  name: string;
  totalSales: number;
  fill: string;
  color: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  imgUrl: string;
}

interface formattedDataType {
  month: string;
  value: number;
}

interface NavbarLink {
  href: string;
  label: string;
}

interface TotalSalesData {
  value: number;
  date: Date;
}

interface AppContextType {
  cart: ICart;
  setCart: Dispatch<SetStateAction<ICart>>;
  optimisticCart: ICart;
  defaultCart: ICart;
  setOptimisticCart: (action: ICart | ((pendingState: ICart) => ICart)) => void;
  user: User;
  handleLogout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: (value: User | ((val: User) => User)) => void;
  moveRoute: (route: string) => void;
  formatToRupiah: (value: number) => string;
  formatNumber: (value: number) => string;
  formatDate: (date: Date) => string;
  getTotalSalesData: (data: TotalSalesData[]) => formattedDataType[];
}

interface CartProduct extends Omit<Product, "description" | "category"> {
  qty: number;
}

type Operation = "increment" | "decrement";

interface Product {
  title: string;
  stock: number;
  price: number;
  imgUrl: string;
  category: string;
  description: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

interface WorkingHour {
  days: string;
  timesOpen: string;
}

interface Contact {
  title: string;
  value: string;
}

interface ShippingContextType {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  incrementStep: () => void;
}

export type {
  Product,
  ShippingContextType,
  AppContextType,
  Contact,
  WorkingHour,
  NavbarLink,
  Blog,
  TotalSalesData,
  formattedDataType,
  ChartData,
  CartProduct,
  Operation,
  User,
};
