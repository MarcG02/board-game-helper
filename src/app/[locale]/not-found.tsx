import { getTranslations } from "next-intl/server";
import React from "react";

export default async function NotFoundPage() {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{t("NotFound")}</h1>
    </div>
  );
}
