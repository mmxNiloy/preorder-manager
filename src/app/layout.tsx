import type { Metadata } from "next";
import "./globals.css";
import { Geist, Rubik } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/layout/providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        rubik.variable,
        rubik.className,
      )}
    >
      <body className="antialiased">
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
