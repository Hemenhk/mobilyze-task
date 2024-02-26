"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CiBookmark } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import TheRemoveSavedLocationButton from "./TheRemoveSavedLocationButton";
import TheViewLocationButton from "./TheViewLocationButton";
import { SavedLocationTypes } from "@/utils/types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import TheExportToPDF from "./TheExportToPDF";

export default function TheSavedLocations() {
  const componentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const savedLocationsPerPage = 4;

  const { data } = useQuery({
    queryKey: ["marker"],
    queryFn: () => {
      const savedCoordinates = localStorage.getItem("savedCoordinates");
      if (savedCoordinates) {
        return JSON.parse(savedCoordinates);
      }
    },
  });

  const savedLocation: SavedLocationTypes[] = data || "[]";
  const indexOfLastMarker = currentPage * savedLocationsPerPage;
  const indexOfFirstMarker = indexOfLastMarker - savedLocationsPerPage;
  const currentMarkers = data?.slice(
    indexOfFirstMarker,
    indexOfLastMarker
  );

  const mappedSavedOnes = Array.isArray(currentMarkers)
    ? currentMarkers?.map((saved: SavedLocationTypes, idx: any) => (
        <li key={idx}>
          <Card>
            <CardContent className="flex flex-col justify-between gap-4 py-4 border-red-600">
              <p className="tracking-wide text-sm border-b pb-2">
                {saved.infoWindowContent}
              </p>
              <div className="flex justify-between items-center mr-2">
                <p className="text-xs tracking-wide">
                  <span className="font-semibold">lat:</span> {saved.lat}
                  <br /> <span className="font-semibold">lng:</span> {saved.lng}
                </p>
                <div className="flex flex-col md:flex-row">
                  <TheViewLocationButton saved={saved} />
                  <TheRemoveSavedLocationButton
                    savedLocation={savedLocation}
                    saved={saved}
                    idx={idx}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </li>
      ))
    : null;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div ref={componentRef}>
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
            <SheetHeader className="flex flex-row justify-between items-center pt-5">
              <SheetTitle>Saved Locations</SheetTitle>
              <TheExportToPDF currentMarkers={currentMarkers} />
            </SheetHeader>
            <ul className="flex flex-col gap-2 pt-5">{mappedSavedOnes}</ul>
            <div className="flex justify-center mt-4">
              {currentPage > 1 && (
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  className="mr-2"
                >
                  Previous
                </Button>
              )}
              {currentPage * savedLocationsPerPage < savedLocation.length && (
                <Button onClick={() => paginate(currentPage + 1)}>Next</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
