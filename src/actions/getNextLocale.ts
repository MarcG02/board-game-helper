"use server";

import { cookies } from "next/headers";

export async function getNextLocale() {
  const coockieStore = await cookies();
  const nextLocale = coockieStore.get("NEXT_LOCALE")?.value ?? "es";

  return nextLocale;
}
