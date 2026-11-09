"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations("LanguageSelector");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(nextLocale: string) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange}
      disabled={isPending}
    >
      <SelectTrigger aria-label={t("label")} className="w-32 cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((item) => (
            <SelectItem className="cursor-pointer" key={item} value={item}>
              <span className="flex items-center gap-2">
                <Image
                  src={`/lang/${item}.png`}
                  alt=""
                  width={26}
                  height={20}
                  className="h-5 w-auto rounded-sm"
                />
                {t(item)}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
