import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "TheSungwon's Blog",
  description: "😎 back-end developer",
  icons: {
    icon: "/computer.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
