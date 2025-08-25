"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTranslations } from "next-intl";

type GameButtonProps = {
  imageSrc: string;
  altText: string;
  gameName: string;
  description: string;
};

export default function SectionDialog({
  gameName,
  description,
}: GameButtonProps) {
  const t = useTranslations("7Wonders");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex h-56 w-40 flex-col overflow-hidden bg-gray-800 p-0 text-white shadow-md transition-shadow duration-300 hover:shadow-xl"
          aria-label={"objetivos"}
        >
          <div className="flex items-center justify-center py-2 text-center">
            <span className="truncate text-lg font-semibold">{gameName}</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{gameName}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
