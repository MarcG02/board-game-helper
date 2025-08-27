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

export default function ScoreTable() {
  const { username } = useGamesContext();
  return (
    <div className="flex h-full w-full flex-col content-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">{username}</h1>
      <div className="overflow-hidden rounded-2xl border-2">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-bold">Faces</TableHead>
              <TableHead className="text-center text-lg font-bold" colSpan={2}>
                Nº matching faces
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {["A", "K", "Q", "J", "R", "N"].map((face) => (
              <TableRow key={face}>
                <TableCell className="font-bold">{face}</TableCell>
                <TableCell className="w-32 border-b">
                  <NumberInput />
                </TableCell>
                <TableCell className="w-32 border-b">
                  <NumberInput />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
