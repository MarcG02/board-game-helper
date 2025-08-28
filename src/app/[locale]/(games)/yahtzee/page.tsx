import ScoreTable from "@/components/yahtzee/score-table";
import UsernameDialog from "@/components/yahtzee/username-dialog";

export default function page() {
  return (
    <div className="flex h-full w-full content-center justify-center p-6">
      <UsernameDialog />
      <ScoreTable />
    </div>
  );
}
