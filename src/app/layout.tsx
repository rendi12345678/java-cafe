import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import AppProvider from "@/providers/AppProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-32 overflow-x-hidden">
      <body className={inter.className}>
        <Navbar />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
