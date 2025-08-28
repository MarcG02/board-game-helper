"use client";

import { useGamesContext } from "@/lib/hooks";
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
import { Button } from "../ui/button";
import { FaTrashAlt } from "react-icons/fa";

const faces = ["A", "K", "Q", "J", "R", "N"];

export default function ScoreTable() {
  const { username } = useGamesContext();
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

  const resetScores = () => {
    setScores1({});
    setScores2({});
  };

  const allFilled =
    faces.every((f) => scores1[f] !== undefined && scores1[f] > 0) &&
    faces.every((f) => scores2[f] !== undefined && scores2[f] > 0);

  return (
    <div className="flex h-full w-full flex-col content-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">{username}</h1>
      <div className="overflow-hidden rounded-2xl border-2">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg font-bold">
                Faces
              </TableHead>
              <TableHead className="text-center text-lg font-bold" colSpan={2}>
                Nº matching faces
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faces.map((face) => (
              <TableRow key={face}>
                <TableCell className="font-bold">{face}</TableCell>
                <TableCell className="w-32 border-b">
                  <NumberInput
                    inputName={face + "1"}
                    onChange={handleScoreChange}
                  />
                </TableCell>
                <TableCell className="w-32 border-b">
                  <NumberInput
                    inputName={face + "2"}
                    onChange={handleScoreChange}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Round total</TableCell>
              <TableCell className="font-bold">
                <SimpleCard>{totalScore1}</SimpleCard>
              </TableCell>
              <TableCell className="font-bold">
                <SimpleCard>{totalScore2}</SimpleCard>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold" colSpan={2}>
                <SimpleCard>
                  {allFilled ? totalScore1 + totalScore2 : "-"}
                </SimpleCard>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button
        variant="destructive"
        onClick={resetScores}
        className="absolute right-6 bottom-1 w-fit"
      >
        {<FaTrashAlt />} Clear fields
      </Button>
    </div>
  );
}
