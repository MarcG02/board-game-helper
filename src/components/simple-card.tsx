import { ReactNode } from "react";

type SimpleCardProps = {
  children: ReactNode;
};

export default function SimpleCard({ children }: SimpleCardProps) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 text-xl font-bold">
      {children}
    </div>
  );
}
