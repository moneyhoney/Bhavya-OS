import type { Metadata } from "next";
import "./globals.css";
import "./learning-enhancements.css";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1);
const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";
export const metadata: Metadata = { title: "Bhavya Foundation | Building for Generations", description: "Bhavya Foundation connects nature, knowledge, heritage and communities through long-term institutional work.", icons: { icon: `${basePath}/logo.png` } };
export default function RootLayout({children}:{readonly children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
