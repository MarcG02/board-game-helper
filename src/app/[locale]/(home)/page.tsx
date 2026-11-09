import HomeHero from "@/components/home/home-hero";
import GameLibrary from "@/components/home/game-library";
import CompanionPanel from "@/components/home/companion-panel";
import SiteFooter from "@/components/home/site-footer";

export default function page() {
  return (
    <main className="relative min-h-screen w-full bg-surface">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-48 right-10 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
          <HomeHero />
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <GameLibrary />
            </div>
            <div className="lg:col-span-4">
              <CompanionPanel />
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
