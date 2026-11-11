"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CheckQuestion } from "./check-question";
import { cn } from "@/lib/utils";
import { useGamesContext } from "@/lib/hooks";

type CheckTableProps = {
  thingsList: string[];
  category: "Characters" | "Weapons" | "Locations";
};

export default function CheckTable({ thingsList, category }: CheckTableProps) {
  const tChars = useTranslations("Characters");
  const tWeapons = useTranslations("Weapons");
  const tLocations = useTranslations("Locations");

  const { charSteps, weaponSteps, locationSteps, updateStep } =
    useGamesContext();

  const steps =
    category === "Characters"
      ? charSteps
      : category === "Weapons"
        ? weaponSteps
        : locationSteps;

  const translate = (key: string) => {
    if (category === "Characters") return tChars(key);
    if (category === "Weapons") return tWeapons(key);
    if (category === "Locations") return tLocations(key);
    return key;
  };

  return (
    <Table>
      <TableHeader></TableHeader>
      <TableBody>
        {thingsList.map((thing, index) => (
          <TableRow
            key={index}
            className={cn(
              "border-line-strong/20 text-ink hover:bg-panel-high/60",
              steps[index] === 1 && "bg-honey/15",
              steps[index] === 2 && "bg-baize/20",
            )}
          >
            <TableCell className="w-[70%] font-medium">
              {translate(thing)}
            </TableCell>
            <TableCell>
              <CheckQuestion
                className="h-6 w-6"
                step={steps[index]}
                onStepChange={(newStep) => updateStep(category, index, newStep)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
