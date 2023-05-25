import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Providers from "./utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ONVITA GUEST LIST",
  description: "Generated by love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
