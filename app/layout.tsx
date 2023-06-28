import { Providers } from "./providers";
// import "./globals.css";
import { Roboto } from "next/font/google";
import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

// export const metadata = {
//   title: "Ultimate Moviegoers Guide!",
//   description: "Find and learn about your next favorite movie",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
