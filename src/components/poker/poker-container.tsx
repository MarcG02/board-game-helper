import React from "react";
import BackButton from "../back-button";
import PokerTable from "./poker-table";

export default function PokerContainer() {
  return (
    <div className="h-full w-full">
      <BackButton />
      <div className="h-full w-full rounded-md">
        <PokerTable />
      </div>
    </div>
  );
}
