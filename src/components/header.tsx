"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-lg">
      <Link href={"/home"}>
        <div className="mx-auto flex max-w-7xl items-center justify-start space-x-4 p-4">
          <div className="relative h-10 w-10">
            <Image
              src="/logoNoText.png"
              alt="Logo de la aplicación"
              fill
              className="rounded-2xl object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-wide text-gray-100">
            Board Games Helper
          </h1>
        </div>
      </Link>
    </header>
  );
}
