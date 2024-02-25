import { useQuery } from "@tanstack/react-query";

import { CiBookmark } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";

import TheRemoveSavedLocationButton from "./TheRemoveSavedLocationButton";
import TheViewLocationButton from "./TheViewLocationButton";
import { SavedMarkerTypes } from "@/utils/types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TheSavedLocations() {
  const { data } = useQuery({
    queryKey: ["marker"],
    queryFn: () => {
      const savedCoordinates = localStorage.getItem("savedCoordinates");
      if (savedCoordinates) {
        return JSON.parse(savedCoordinates);
      }
    },
  });

  const savedMarkers: SavedMarkerTypes[] = data || "[]";

  const mappedSavedOnes = data?.map((saved: SavedMarkerTypes, idx: any) => (
    <li key={idx}>
      <Card>
        <CardContent className="flex flex-col justify-between gap-4 py-4 border-red-600">
          <p>{saved.infoWindowContent}</p>
          <div className="mr-2">

          <TheRemoveSavedLocationButton savedMarkers={savedMarkers} idx={idx} />
          <TheViewLocationButton saved={saved} />
          </div>
        </CardContent>
      </Card>
    </li>
  ));
  return (
    <>
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <SheetTrigger>
                <CiBookmark size={25} />
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent className="ml-4 mt-2 text-xs">
              <p>Saved Locations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Saved Locations</SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-2 pt-5">{mappedSavedOnes}</ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
