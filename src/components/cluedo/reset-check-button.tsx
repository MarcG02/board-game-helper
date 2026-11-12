"use client";

import { Button } from "@/components/ui/button";
import { charList, locationList, weaponList } from "@/lib/constants";
import { useGamesContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { FaTrashAlt } from "react-icons/fa";

type Category = "Characters" | "Weapons" | "Locations" | "All";

type Props = {
  category: Category;
};

export default function ResetChecksButton({ category }: Props) {
  const { updateStep, resetAll } = useGamesContext();
  const t = useTranslations("Cluedo.Table");

  const handleReset = () => {
    if (category === "All") {
      resetAll();
      return;
    }

    const listLength =
      category === "Characters"
        ? charList.length
        : category === "Weapons"
          ? weaponList.length
          : locationList.length;

    for (let i = 0; i < listLength; i++) {
      updateStep(category, i, 0);
    }
  };

  return (
    <Button
      variant={category === "All" ? "destructive" : "outline"}
      size="sm"
      className={cn(
        "ml-auto cursor-pointer",
        category === "All"
          ? "dark:bg-danger dark:hover:bg-danger/90"
          : "border-line-strong/40 bg-panel-high text-ink hover:bg-panel-highest dark:bg-panel-high dark:hover:bg-panel-highest",
      )}
      onClick={handleReset}
    >
      <FaTrashAlt />
      {category === "All" ? t("resetAll") : t("reset")}
    </Button>
  );
}
