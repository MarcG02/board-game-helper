"use client";

import { Button } from "@/components/ui/button";
import { charList, locationList, weaponList } from "@/lib/constants";
import { useGamesContext } from "@/lib/hooks";
import { useTranslations } from "next-intl";

type Props = {
  category: "Characters" | "Weapons" | "Locations";
};

export default function ResetChecksButton({ category }: Props) {
  const { updateStep } = useGamesContext();
  const t = useTranslations("Cluedo.Buttons");

  const getListLength = () => {
    if (category === "Characters") return charList.length;
    if (category === "Weapons") return weaponList.length;
    if (category === "Locations") return locationList.length;
    return 0;
  };

  const handleReset = () => {
    const length = getListLength();
    for (let i = 0; i < length; i++) {
      updateStep(category, i, 0); // reset each step
    }
  };

  return (
    <Button
      variant="outline"
      className="ml-auto block items-center bg-gray-900 text-center text-white"
      onClick={handleReset}
    >
      {t("reset")}
    </Button>
  );
}
