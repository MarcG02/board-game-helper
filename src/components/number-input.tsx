"use client";
import { useState } from "react";

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function NumberInput({ value = 0, onChange }: NumberInputProps) {
  const [num, setNum] = useState<number>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);

    // Bloquear valores fuera de rango
    if (val === "" || (val >= 0 && val <= 15)) {
      setNum(val as number);
      onChange?.(val as number);
    }
  };

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min={0}
      max={15}
      value={num}
      onChange={handleChange}
      className="w-full rounded-lg border px-3 py-2 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
}
