"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import NumberInput from "../number-input";
import SimpleCard from "../simple-card";
import { useState } from "react";
import { yahtzeeCalculation } from "@/lib/utils";
// import { Button } from "../ui/button";
// import { FaTrashAlt } from "react-icons/fa";

const faces = ["A", "K", "Q", "J", "R", "N"];

export default function ScoreTable() {
  const [scores1, setScores1] = useState<Record<string, number>>({});
  const [scores2, setScores2] = useState<Record<string, number>>({});

  const totalScore1 = Object.values(scores1).reduce((a, b) => a + b, 0);
  const totalScore2 = Object.values(scores2).reduce((a, b) => a + b, 0);

  const handleScoreChange = (name: string, value: number) => {
    const face = name.charAt(0);
    const player = name.slice(-1);
    const calculated = yahtzeeCalculation(face, value);

    if (player === "1") {
      setScores1((prev) => ({ ...prev, [face]: calculated }));
    } else if (player === "2") {
      setScores2((prev) => ({ ...prev, [face]: calculated }));
    }
  };

  // const resetScores = () => {
  //   setScores1({});
  //   setScores2({});
  // };

  return (
    <div className="border-line-strong/20 bg-panel-low w-full overflow-hidden rounded-xl border p-4">
      <Table className="w-full">
        <TableHeader className="[&_th]:bg-panel-high [&_th:first-child]:rounded-l-md [&_th:last-child]:rounded-r-md">
          <TableRow className="border-line-strong/20 rounded-sm hover:bg-transparent">
            <TableHead className="text-ink-muted text-label-md font-semibold tracking-wider uppercase">
              Faces
            </TableHead>
            <TableHead
              className="text-ink-muted text-label-md font-semibold tracking-wider uppercase"
              colSpan={2}
            >
              Nº matching faces
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faces.map((face) => (
            <TableRow
              key={face}
              className="border-line-strong/20 hover:bg-panel-high/60"
            >
              <TableCell className="text-ink font-semibold">{face}</TableCell>
              <TableCell className="w-32">
                <NumberInput
                  inputName={face + "1"}
                  onChange={handleScoreChange}
                />
              </TableCell>
              <TableCell className="w-32">
                <NumberInput
                  inputName={face + "2"}
                  onChange={handleScoreChange}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="text-ink font-semibold">
              Round total
            </TableCell>
            <TableCell className="font-bold">
              <SimpleCard>{totalScore1}</SimpleCard>
            </TableCell>
            <TableCell className="font-bold">
              <SimpleCard>{totalScore2}</SimpleCard>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-ink font-semibold">Total</TableCell>
            <TableCell className="font-bold" colSpan={2}>
              <SimpleCard>{totalScore1 + totalScore2 || "-"}</SimpleCard>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Button
        variant="destructive"
        onClick={resetScores}
        className="absolute right-6 bottom-1 w-fit"
      >
        {<FaTrashAlt />} Clear fields
      </Button> */}
    </div>
  );
}
