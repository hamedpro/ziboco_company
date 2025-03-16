"use client";

import { NewHeader } from "./NewHeader";
import { usePathname } from "next/navigation";

export function NewLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <>
      {!isAuthRoute && <NewHeader />}
      {children}
    </>
  );
}
