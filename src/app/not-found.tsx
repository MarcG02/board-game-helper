import { getNextLocale } from "@/actions/getNextLocale";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const locale = await getNextLocale();
  redirect(`/${locale}`);
}
