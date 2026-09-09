import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Bhavya Foundation | Building for Generations", description: "Bhavya Foundation connects nature, knowledge, heritage and communities through long-term institutional work." };
export default function RootLayout({children}:{readonly children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
