import { CiBookmark } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoTrashOutline } from "react-icons/io5";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SavedMarkerTypes = {
  lat: number;
  lng: number;
  infoWindowContent: string;
};

export default function TheSavedLocations() {
  let savedMarkers: any[] = [];
  const savedCoordinates = localStorage.getItem("savedCoordinates");
  if (savedCoordinates) {
    savedMarkers = JSON.parse(savedCoordinates);
  }

  const removeMarker = (idx: number) => {
    const updatedMarkers = [...savedMarkers];
    updatedMarkers.splice(idx, 1);
    localStorage.setItem("savedCoordinates", JSON.stringify(updatedMarkers));
    savedMarkers = updatedMarkers;
  };
  const mappedSavedOnes = savedMarkers.map(
    (saved: SavedMarkerTypes, idx: any) => (
      <li key={idx}>
        <Card>
          <CardContent className="flex items-center justify-between gap-4 py-2 border-red-600">
            <p>{saved.infoWindowContent}</p>
            <Button
              className="bg-transparent text-black hover:bg-transparent"
              onClick={() => removeMarker(idx)}
            >
              <IoTrashOutline />
            </Button>
          </CardContent>
        </Card>
      </li>
    )
  );
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
