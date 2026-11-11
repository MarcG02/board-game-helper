import { ReactNode } from "react";

type SimpleCardProps = {
  children: ReactNode;
};

export default function SimpleCard({ children }: SimpleCardProps) {
  return (
    <div className="border-line-strong/20 bg-panel-high text-ink flex h-full w-full items-center justify-center rounded-lg border px-3 py-2 text-headline-sm">
      {children}
    </div>
  );
}
