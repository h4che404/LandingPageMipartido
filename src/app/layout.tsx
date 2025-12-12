import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit as requested for Primary
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mi Partido - Tu partido, tu ritmo",
  description: "La app para organizar partidos de fútbol, pádel y tenis. Social o Competitivo, vos elegís.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" style={{ colorScheme: 'dark' }}>
      {/* 
        Force dark mode mainly for the landing vibe (Hero is dark).
        We will handle light sections by overriding bg colors in those specific sections 
        or using a ThemeProvider if full switching was needed.
        For this Landing, 'Cancha Nocturna' base implies Dark mode default relative to the hero. 
      */}
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
