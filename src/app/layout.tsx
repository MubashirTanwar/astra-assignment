import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const quicksand = localFont({
  src: "./fonts/Quicksand.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});

const starwars = localFont({
  src: "./fonts/Starjedi.ttf",
  variable: "--font-starwars",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Star Wars Dashboard",
  description: "Star Wars Fleet Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${starwars.variable} antialiased`}
      >
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
