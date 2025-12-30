import Legal from "@/components/Legal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impressum | Maxim Klapf",
    description: "Rechtliche Angaben und Impressum für Maxim Klapf Webdesign.",
    robots: "noindex",
};

export default function ImprintPage() {
    return <Legal page="imprint" />;
}
