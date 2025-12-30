import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Maxim Klapf | Webdesign Altomünster - Handwerk & Gastro",
    description: "Ihr Partner für professionelle Webseiten in Altomünster & Dachau. Speziell für Handwerk, Gastronomie & Kleinunternehmen.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" className="scroll-smooth">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-50 min-h-screen flex flex-col`}>
                <LanguageProvider>
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                    <Suspense fallback={null}>
                        <CookieBanner />
                    </Suspense>
                </LanguageProvider>
            </body>
        </html>
    );
}
