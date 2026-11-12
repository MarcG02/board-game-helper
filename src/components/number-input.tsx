"use client";
import { useState } from "react";
import { Input } from "./ui/input";

type NumberInputProps = {
  value?: number;
  inputName: string;
  onChange?: (name: string, value: number) => void;
};

export default function NumberInput({
  inputName,
  value = 0,
  onChange,
}: NumberInputProps) {
  const [num, setNum] = useState<number>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);

    if (val === "" || (val >= 0 && val <= 15)) {
      setNum(val as number);
      onChange?.(inputName, val as number);
    }
  };

  return (
    <Input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min={0}
      max={15}
      value={num}
      onChange={handleChange}
      name={inputName}
      className="border-field bg-panel-low text-ink h-10 w-full rounded-md text-center text-body-lg focus-visible:ring-focus"
    />
  );
}
