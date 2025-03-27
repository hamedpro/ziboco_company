"use client";

import { NewHeader } from "./NewHeader";

export function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NewHeader />
      {children}
    </>
  );
}
