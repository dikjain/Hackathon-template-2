
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./utils/Context";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "ProjectX", 
  description: "never setup db, auth , etc ever again in hackathon",
};

export default function RootLayout({ children }) {
  return (

    <ThemeProvider>
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
    </ThemeProvider>
  );
}
