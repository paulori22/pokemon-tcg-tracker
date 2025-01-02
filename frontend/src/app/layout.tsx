import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon TCG Pocket Tracker",
  description: "Application to track your cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)]">
              <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                {children}
              </main>
              <Toaster position="top-center" richColors closeButton />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
