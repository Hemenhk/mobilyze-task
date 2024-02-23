import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@react-google-maps/api";

type SearchBarProps = {
  isLoaded: boolean;
  map: google.maps.Map | null;
  destinationRef: React.RefObject<HTMLInputElement>;
  onPlaceChanged: () => void;
  onLoad: (autocomplete: any) => void;
  setInfoWindowContent: Dispatch<SetStateAction<string>>
  setSaveCoordinates:Dispatch<SetStateAction<{
    lat: number;
    lng: number;
    infoWindowContent: string;
}[]>>
  setMarkerPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

export default function TheSearchBar({
  isLoaded,
  destinationRef,
  onPlaceChanged,
  onLoad,
}: SearchBarProps) {
  if (!isLoaded) {
    return <p>Not loaded</p>;
  }

  return (
    <Card className="absolute top-4 p-6 z-[55]">
      <CardContent>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Input type="text" placeholder="Origin" ref={destinationRef} />
        </Autocomplete>
      </CardContent>
    </Card>
  );
}
