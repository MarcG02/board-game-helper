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
    <section className="border-line-strong/20 bg-panel flex w-full flex-col gap-4 overflow-hidden rounded-xl border p-4 shadow-lg sm:p-6">
      <Table>
        <TableHeader className="[&_th]:bg-panel-high [&_th:first-child]:rounded-l-md [&_th:last-child]:rounded-r-md">
          <TableRow className="border-line-strong/20 hover:bg-transparent">
            <TableHead className="text-ink-muted text-label-md font-semibold tracking-wider uppercase">
              {tTitles("plays")}
            </TableHead>
            <TableHead className="text-ink-muted text-label-md font-semibold tracking-wider uppercase">
              {tTitles("desc")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokerNamesList.map((key) => (
            <TableRow
              key={key}
              className="border-line-strong/20 hover:bg-panel-high/60"
            >
              <TableCell className="text-ink w-[30%] font-semibold whitespace-normal">
                {tNames(key)}
              </TableCell>
              <TableCell className="text-ink-muted whitespace-normal">
                {tDescriptions(key)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
