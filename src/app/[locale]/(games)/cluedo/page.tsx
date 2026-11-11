import CluedoContainer from "@/components/cluedo/cluedo-container";

export default function Page() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <CluedoContainer />
      </div>
    </div>
  );
}
