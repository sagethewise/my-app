import AuthHeader from "@/components/layout/AuthHeader";
import Footer from "@/components/layout/Footer";
import { SearchProvider } from "@/context/SearchProvider";

import { headers } from "next/headers"; // ✅ Server Component içinde güvenle kullanabiliriz
import "@/styles/global.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("next-url") || ""; // ✅ Mevcut URL yolunu alıyoruz
  const isAuthPage = pathname === "/login" || pathname === "/register"; // ✅ Giriş sayfası mı?

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SearchProvider>
          {/* Eğer giriş veya kayıt sayfasındaysak, AuthHeader göster */}
          {isAuthPage && <AuthHeader />}

          <main className="flex-1">{children}</main>

          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
