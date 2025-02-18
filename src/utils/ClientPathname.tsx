"use client"; // Bileşeni Client Component olarak belirtiyoruz

import { usePathname } from "next/navigation";
import { JSX } from "react";

export default function ClientPathname({ children }: { children: (pathname: string) => JSX.Element }) {
  const pathname = usePathname();
  return <>{children(pathname)}</>; // ✅ JSX içinde döndürülmeli
}
