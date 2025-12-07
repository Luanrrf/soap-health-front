import type { ReactNode } from "react";
import "./globals.css";
import Header from "./components/common/Header";
import { PageProvider } from "./components/context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pizza">

        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="p-6">
            <PageProvider>
              {children}
            </PageProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
