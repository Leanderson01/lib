import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BookShelf",
  description: "Sistema de Gerenciamento de Biblioteca",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.className}>
        <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
