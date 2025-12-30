import Legal from "@/components/Legal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Datenschutz | Maxim Klapf",
    description: "Datenschutzerklärung für Maxim Klapf Webdesign.",
    robots: "noindex",
};

export default function PrivacyPage() {
    return <Legal page="privacy" />;
}
