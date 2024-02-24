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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type SavedMarkerTypes = {
  lat: number;
  lng: number;
  infoWindowContent: string;
};

export default function TheSavedLocations() {
  const queryClient = useQueryClient();

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
  console.log("saved markers", savedMarkers);

  const { mutateAsync: removeMarkerMutation } = useMutation({
    mutationFn: async (idx: number) => {
      return new Promise((resolve, reject) => {
        const updatedMarkers = [...savedMarkers]; 
        if (idx >= 0 && idx < updatedMarkers.length) {
          updatedMarkers.splice(idx, 1);
          localStorage.setItem(
            "savedCoordinates",
            JSON.stringify(updatedMarkers)
          );
          resolve(updatedMarkers);
        } else {
          reject(new Error("Invalid marker index"));
        }
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["marker"], data);
      queryClient.refetchQueries({ queryKey: ["marker"] });
    },
  });

  const mappedSavedOnes = data?.map((saved: SavedMarkerTypes, idx: any) => (
    <li key={idx}>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-2 border-red-600">
          <p>{saved.infoWindowContent}</p>
          <Button
            className="bg-transparent text-black hover:bg-transparent"
            onClick={() => removeMarkerMutation(idx)}
          >
            <IoTrashOutline />
          </Button>
        </CardContent>
      </Card>
    </li>
  ));
  return (
    <Sheet>
      <SheetTrigger className="flex flex-col items-center gap-3">
        <CiBookmark size={25}/>
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
