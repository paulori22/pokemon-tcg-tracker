import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
          <div
            className="
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center 
        min-h-screen
        p-4
        gap-4
        font-[family-name:var(--font-geist-sans)]"
          >
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
