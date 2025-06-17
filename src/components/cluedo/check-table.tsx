"use client";

import { useTranslations } from "next-intl";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CheckQuestion } from "./check-question";

type CheckTableProps = {
  thingsList: string[];
  category: "Characters" | "Weapons" | "Locations";
};

export default function CheckTable({ thingsList, category }: CheckTableProps) {
  const tChars = useTranslations("Characters");
  const tWeapons = useTranslations("Weapons");
  const tLocations = useTranslations("Locations");

  const translate = (key: string) => {
    if (category === "Characters") return tChars(key);
    if (category === "Weapons") return tWeapons(key);
    if (category === "Locations") return tLocations(key);
    return key;
  };

  // Estado para cada fila, array con valores 0,1,2
  const [steps, setSteps] = React.useState<number[]>(
    Array(thingsList.length).fill(0),
  );

  const handleStepChange = (index: number, newStep: number) => {
    setSteps((prev) => {
      const copy = [...prev];
      copy[index] = newStep;
      return copy;
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {thingsList.map((thing, index) => (
          <TableRow
            key={index}
            className={
              steps[index] === 1 ? "bg-yellow-100 dark:bg-yellow-900/40" : ""
            }
          >
            <TableCell className="w-[70%] font-medium">
              {translate(thing)}
            </TableCell>
            <TableCell>
              <CheckQuestion
                className="h-6 w-6"
                step={steps[index]}
                onStepChange={(newStep) => handleStepChange(index, newStep)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
