"use client";

import { charList, locationList, weaponList } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CheckTable from "./check-table";
import { useTranslations } from "next-intl";
import ResetChecksButton from "./reset-check-button";
import { Separator } from "../ui/separator";
import { useGamesContext } from "@/lib/hooks";
import BackButton from "../back-button";

export default function CluedoContainer() {
  const tTabs = useTranslations("Cluedo.Tabs");

  const { activeTab, setActiveTab } = useGamesContext();

  return (
    <div className="h-full w-full">
      <BackButton />
      <div className="h-full w-full rounded-md bg-gray-200 p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full w-full space-y-4"
        >
          <div className="flex justify-center">
            <TabsList className="flex justify-center gap-2 rounded-md bg-white shadow-md">
              <TabsTrigger
                className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value="characters"
              >
                {tTabs("chars")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value="weapon"
              >
                {tTabs("weapons")}
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                value="location"
              >
                {tTabs("locations")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="characters"
            className="rounded-md bg-white p-2 shadow"
          >
            <CheckTable thingsList={charList} category="Characters" />
            <Separator className="mb-4" />
            <ResetChecksButton category="Characters" />
          </TabsContent>

          <TabsContent
            value="weapon"
            className="rounded-md bg-white p-2 shadow-md"
          >
            <CheckTable thingsList={weaponList} category="Weapons" />
            <Separator className="mb-4" />
            <ResetChecksButton category="Weapons" />
          </TabsContent>

          <TabsContent
            value="location"
            className="rounded-md bg-white p-2 shadow-md"
          >
            <CheckTable thingsList={locationList} category="Locations" />
            <Separator className="mb-4" />
            <ResetChecksButton category="Locations" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
