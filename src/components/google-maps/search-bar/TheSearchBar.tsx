import React, { Dispatch, SetStateAction, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@react-google-maps/api";

type SearchBarProps = {
  isLoaded: boolean;
  map: google.maps.Map | null;
  destinationRef: React.RefObject<HTMLInputElement>;
  onPlaceChanged: () => void;
  onLoad: (autocomplete: any) => void;
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
  onPlaceChanged,
  onLoad,
  setMarkerPosition,
}: SearchBarProps) {
  if (!isLoaded) {
    return <p>Not loaded</p>;
  }

  const handlePlaceChanged = () => {
    console.log("handlePlaceChanged called");
    console.log("isLoaded:", isLoaded);
    const place = destinationRef.current?.value;
    if (place && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          const newPosition = { lat: location.lat(), lng: location.lng() };
          console.log("New marker position:", newPosition);
          setMarkerPosition(newPosition);
          map.panTo({ lat: location.lat(), lng: location.lng(), animate: true }); // Smoothly move map to the new marker position
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
