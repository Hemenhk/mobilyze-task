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
} | null>>
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
  map,
  setSaveCoordinates,
  setInfoWindowContent,
  onLoad,
  setMarkerPosition,
}: SearchBarProps) {
  if (!isLoaded) {
    return <p>Not loaded</p>;
  }

  const handlePlaceChanged = () => {
    const place = destinationRef.current?.value;
    if (place && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          const newPosition = { lat: location.lat(), lng: location.lng() };
          const addressName = results[0].formatted_address; // Extract address name from geocoding results
          setInfoWindowContent(addressName); // Set the content of the InfoWindowF
          setMarkerPosition(newPosition);
          map.panTo(location);
          localStorage.setItem("savedMarkers", JSON.stringify(newPosition))
          setSaveCoordinates(newPosition)
        }
      });
    }
  };

  return (
    <Card className="absolute top-0 p-6 z-[55]">
      <CardContent>
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
          <Input type="text" placeholder="Origin" ref={destinationRef} />
        </Autocomplete>
      </CardContent>
    </Card>
  );
}
