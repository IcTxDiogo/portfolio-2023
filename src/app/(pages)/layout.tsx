import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/themeProvider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Portfolio by IcTxDiogo",
    description: "IcTxDiogo's portfolio to show his projects and skills",
    icons: [{ rel: "icon", url: "/favicon.png" }],
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <TRPCReactProvider headers={headers()}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
