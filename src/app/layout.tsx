import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mipartidoapp.com'),
  title: {
    default: "Mi Partido - Organizá partidos fácil",
    template: "%s | Mi Partido"
  },
  description: "La app para organizar partidos de fútbol, pádel y tenis en Mendoza. Armá tu equipo, reservá cancha y jugá sin complicaciones.",
  keywords: ["partidos de fútbol", "organizar partido", "fútbol 5", "pádel Mendoza", "reservar cancha", "fútbol amateur"],
  authors: [{ name: "Mi Partido" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://mipartidoapp.com",
    siteName: "Mi Partido",
    title: "Mi Partido - Organizá partidos fácil",
    description: "La app para organizar partidos de fútbol, pádel y tenis en Mendoza.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Partido - Organizá partidos fácil",
    description: "La app para organizar partidos de fútbol, pádel y tenis en Mendoza.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20`}>
        <ThemeProvider defaultMode="amistoso" defaultColorScheme="system">
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
