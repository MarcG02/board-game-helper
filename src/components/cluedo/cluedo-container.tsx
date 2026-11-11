"use client";

import { useTranslations } from "next-intl";
import { charList, locationList, weaponList } from "@/lib/constants";
import { useGamesContext } from "@/lib/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import CheckTable from "./check-table";
import ResetChecksButton from "./reset-check-button";

const tabTriggerClass =
  "h-9 cursor-pointer rounded-full text-body-sm transition-colors " +
  "text-ink-muted dark:text-ink-muted " +
  "hover:bg-honey hover:text-on-honey dark:hover:bg-honey dark:hover:text-on-honey " +
  "data-[state=active]:bg-honey data-[state=active]:text-on-honey data-[state=active]:shadow-md " +
  "dark:data-[state=active]:border-honey dark:data-[state=active]:bg-honey dark:data-[state=active]:text-on-honey " +
  "focus-visible:ring-2 focus-visible:ring-honey/40";

const tabContentClass =
  "flex flex-col gap-4 rounded-xl border border-line-strong/20 bg-panel-low p-4 shadow-md";

export default function CluedoContainer() {
  const tTabs = useTranslations("Cluedo.Tabs");
  const { activeTab, setActiveTab } = useGamesContext();

  return (
    <section className="border-line-strong/20 bg-panel flex w-full flex-col gap-6 rounded-xl border p-4 shadow-lg sm:p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col gap-6"
      >
        <TabsList className="border-line-strong/20 bg-panel-high grid h-auto w-full max-w-md grid-cols-3 gap-1 self-center rounded-full border p-1 sm:self-start">
          <TabsTrigger className={tabTriggerClass} value="characters">
            {tTabs("chars")}
          </TabsTrigger>
          <TabsTrigger className={tabTriggerClass} value="weapon">
            {tTabs("weapons")}
          </TabsTrigger>
          <TabsTrigger className={tabTriggerClass} value="location">
            {tTabs("locations")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="characters" className={tabContentClass}>
          <CheckTable thingsList={charList} category="Characters" />
          <Separator className="bg-line-strong/30" />
          <ResetChecksButton category="Characters" />
        </TabsContent>

        <TabsContent value="weapon" className={tabContentClass}>
          <CheckTable thingsList={weaponList} category="Weapons" />
          <Separator className="bg-line-strong/30" />
          <ResetChecksButton category="Weapons" />
        </TabsContent>

        <TabsContent value="location" className={tabContentClass}>
          <CheckTable thingsList={locationList} category="Locations" />
          <Separator className="bg-line-strong/30" />
          <ResetChecksButton category="Locations" />
        </TabsContent>

        <div className="border-line-strong/30 border-t pt-4">
          <ResetChecksButton category="All" />
        </div>
      </Tabs>
    </section>
  );
}
