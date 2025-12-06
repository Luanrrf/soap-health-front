import type { ReactNode } from "react";
import "./globals.css";
import Header from "./components/common/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pizza">

        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
