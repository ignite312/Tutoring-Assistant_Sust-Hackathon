import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoginNav from "./components/LoginNav";

const glob =10;

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
    <html lang="en">
      <body className={inter.className}>
        <LoginNav></LoginNav>
        {children}
      </body>
    </html>
  );
}
