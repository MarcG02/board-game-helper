"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

export default function GameButton({
  imageSrc,
  altText,
  gameName,
  description,
}: GameButtonProps) {
  const gameSlug = gameName.toLowerCase().replace(/\s+/g, "-");
  const t = useTranslations("GameButtons");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex h-56 w-40 flex-col overflow-hidden bg-gray-800 p-0 text-white shadow-md transition-shadow duration-300 hover:shadow-xl"
          aria-label={`Abrir detalles de ${gameName}`}
        >
          <div className="relative h-full w-full">
            <Image src={imageSrc} alt={altText} fill className="object-cover" />
          </div>
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

        <div className="relative aspect-video w-full overflow-hidden rounded-lg px-2 py-4">
          <Image src={imageSrc} alt={altText} fill className="object-contain" />
        </div>

        <DialogFooter>
          <Link href={`/${gameSlug}`} passHref>
            <Button className="w-full">{t("StartHelper")}</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
