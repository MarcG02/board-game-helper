"use client";

import { Button } from "@/components/ui/button";
import { charList, locationList, weaponList } from "@/lib/constants";
import { useGamesContext } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import { FaTrashAlt } from "react-icons/fa";

type Category = "Characters" | "Weapons" | "Locations" | "All";

type Props = {
  category: Category;
};

export default function ResetChecksButton({ category }: Props) {
  const { updateStep, resetAll } = useGamesContext();
  const t = useTranslations("Cluedo.Buttons");

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
      className={`ml-auto block flex items-center ${
        category === "All" ? "bg-red-700 text-white" : "bg-gray-900 text-white"
      }`}
      onClick={handleReset}
    >
      <FaTrashAlt />
      {category === "All" ? t("resetAll") : t("reset")}
    </Button>
  );
}
