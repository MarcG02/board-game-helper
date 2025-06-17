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
        "focus-visible:ring-ring/50 focus-visible:border-ring flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        "bg-background text-foreground border-input dark:bg-input/30",
        step === 2 &&
          "bg-primary text-primary-foreground border-primary dark:bg-primary",
        step === 1 && "border-gray-900 bg-gray-900 text-white",
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
