import { Button } from "@/components/ui/button";
import React from "react";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { SavedMarkerTypes } from "@/utils/types";

type ViewLocationProps = {
  saved: SavedMarkerTypes;
};

export default function TheViewLocationButton({ saved }: ViewLocationProps) {
  const { setMarkerPosition, setInfoWindowContent } = useGoogleMapsContext();

  const handleViewLocation = (saved: SavedMarkerTypes) => {
    setMarkerPosition(saved);
    setInfoWindowContent(saved.infoWindowContent);
  };
  return (
    <Button onClick={() => handleViewLocation(saved)}>View Location</Button>
  );
}
