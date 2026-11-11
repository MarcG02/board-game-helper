"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { IoIosHelp } from "react-icons/io";

import { cn } from "@/lib/utils";

export function CheckQuestion({
  className,
  step,
  onStepChange,
  ...props
}: {
  className?: string;
  step: number; // 0, 1, 2
  onStepChange: (newStep: number) => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const handleClick = () => {
    onStepChange((step + 1) % 3);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "bg-surface-container-high text-outline border-outline-variant dark:bg-surface-container-high",
        step === 1 &&
          "border-primary/50 bg-primary/15 text-primary dark:bg-primary/15",
        step === 2 &&
          "border-secondary bg-secondary text-on-secondary dark:bg-secondary",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {step === 1 ? (
        <IoIosHelp className="h-full w-full" />
      ) : step === 2 ? (
        <CheckIcon className="h-full w-full" />
      ) : null}
    </button>
  );
}
