"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pokerNamesList } from "@/lib/constants";

export default function PokerTable() {
  const tNames = useTranslations("Poker.Names");
  const tDescriptions = useTranslations("Poker.Descriptions");
  const tTitles = useTranslations("Poker.Titles");

  return (
    <Table className="rounded-md bg-white p-2">
      <TableHeader className="rounded-md bg-gray-900">
        <TableRow>
          <TableHead className="font-bold text-white">
            {tTitles("plays")}
          </TableHead>
          <TableHead className="font-bold text-white">
            {tTitles("desc")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokerNamesList.map((key) => (
          <TableRow key={key} className="border-t border-gray-200">
            <TableCell className="border-r border-gray-200 font-bold">
              {tNames(key)}
            </TableCell>
            <TableCell>{tDescriptions(key)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
