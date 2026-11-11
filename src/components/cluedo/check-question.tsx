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
        "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center align-middle",
        "rounded-sm border border-transparent bg-panel-high text-ink-faint dark:bg-panel-high",
        step === 1 && "border-honey/50 bg-honey/15 text-honey dark:bg-honey/15",
        step === 2 && "border-baize/50 bg-baize/15 text-baize dark:bg-baize/15",
        className,
      )}
      {...props}
    >
      {step === 1 ? (
        <IoIosHelp className="size-full" />
      ) : step === 2 ? (
        <CheckIcon className="size-full" />
      ) : null}
    </button>
  );
}
