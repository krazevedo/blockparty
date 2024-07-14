"use client";
import { Inter } from "next/font/google";
import { ApolloClientsProvider } from "@/contexts/ApolloClientsContext";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ApolloClientsProvider>{children}</ApolloClientsProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
