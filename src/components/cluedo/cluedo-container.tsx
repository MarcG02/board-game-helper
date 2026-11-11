"use client";

import { useTranslations } from "next-intl";
import { charList, locationList, weaponList } from "@/lib/constants";
import { useGamesContext } from "@/lib/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import CheckTable from "./check-table";
import ResetChecksButton from "./reset-check-button";

const tabTriggerClass =
  "h-9 rounded-full text-body-sm text-on-surface-variant dark:text-on-surface-variant " +
  "data-[state=active]:bg-primary data-[state=active]:text-on-primary data-[state=active]:shadow-md " +
  "dark:data-[state=active]:border-primary dark:data-[state=active]:bg-primary dark:data-[state=active]:text-on-primary " +
  "focus-visible:ring-2 focus-visible:ring-primary/40";

const tabContentClass =
  "flex flex-col gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low p-4 shadow-md";

export default function CluedoContainer() {
  const tTabs = useTranslations("Cluedo.Tabs");
  const { activeTab, setActiveTab } = useGamesContext();

  return (
    <section className="border-outline-variant/20 bg-surface-container flex w-full flex-col gap-6 rounded-xl border p-4 shadow-lg sm:p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col gap-6"
      >
        <TabsList
          aria-label={tTabs("label")}
          className="border-outline-variant/20 bg-surface-container-high grid h-auto w-full max-w-md grid-cols-3 gap-1 self-center rounded-full border p-1 sm:self-start"
        >
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
          <Separator className="bg-outline-variant/30" />
          <ResetChecksButton category="Characters" />
        </TabsContent>

        <TabsContent value="weapon" className={tabContentClass}>
          <CheckTable thingsList={weaponList} category="Weapons" />
          <Separator className="bg-outline-variant/30" />
          <ResetChecksButton category="Weapons" />
        </TabsContent>

        <TabsContent value="location" className={tabContentClass}>
          <CheckTable thingsList={locationList} category="Locations" />
          <Separator className="bg-outline-variant/30" />
          <ResetChecksButton category="Locations" />
        </TabsContent>

        <div className="border-outline-variant/30 border-t pt-4">
          <ResetChecksButton category="All" />
        </div>
      </Tabs>
    </section>
  );
}
