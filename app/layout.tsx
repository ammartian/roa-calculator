import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { BusinessTypeProvider } from "@/lib/i18n/business-type-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ROA Calculator",
    description: "Calculate Return on Assets (ROA) easily and quickly.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LanguageProvider>
                    <BusinessTypeProvider>
                        <TooltipProvider>
                            <SidebarProvider>
                                {children}
                            </SidebarProvider>
                        </TooltipProvider>
                    </BusinessTypeProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
