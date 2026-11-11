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
        "bg-panel-high text-ink-faint border-line-strong dark:bg-panel-high rounded-sm",
        step === 1 &&
          "border-honey/50 bg-honey/15 text-honey dark:bg-honey/15 border",
        step === 2 &&
          "border-baize/50 bg-baize/15 text-baize dark:bg-baize/15 border",
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
