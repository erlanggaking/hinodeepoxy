import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-heading", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "HINODE EPOXY - Jasa Epoxy Lantai Profesional Jabodetabek", template: "%s | HINODE EPOXY" },
  description: "Penyedia jasa aplikator lantai epoxy profesional untuk wilayah Jabodetabek, Jawa Barat, dan Banten. Coating, Self-Leveling, dan Heavy Duty. Gratis survei & estimasi!",
  keywords: ["jasa epoxy lantai", "kontraktor epoxy jakarta", "harga epoxy per meter", "epoxy coating", "self-leveling epoxy", "HINODE EPOXY"],
  openGraph: { type: "website", locale: "id_ID", siteName: "HINODE EPOXY" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} h-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LocalBusiness", name: "HINODE EPOXY",
          description: "Penyedia jasa aplikator lantai epoxy profesional untuk wilayah Jabodetabek.",
          telephone: "+6281287370601",
          address: { "@type": "PostalAddress", streetAddress: "Kalideres", addressLocality: "Jakarta Barat", addressRegion: "DKI Jakarta", addressCountry: "ID" },
          areaServed: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi", "Bandung", "Banten"],
          priceRange: "Rp 120.000 - Rp 650.000 per m²",
        })}} />
      </head>
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-body)] bg-h-bg text-h-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
