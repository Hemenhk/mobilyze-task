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
        <CardContent className="flex items-center justify-between gap-4 py-2 border-red-600">
          <p>{saved.infoWindowContent}</p>
          <TheRemoveSavedLocationButton savedMarkers={savedMarkers} idx={idx} />
          <TheViewLocationButton
            saved={saved}
          />
        </CardContent>
      </Card>
    </li>
  ));
  return (
    <Sheet>
      <SheetTrigger className="flex flex-col items-center gap-3">
        <CiBookmark size={25} />
        <p className="text-xs font-medium">Saved</p>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Saved Locations</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2 pt-5">{mappedSavedOnes}</ul>
      </SheetContent>
    </Sheet>
  );
}
