import { Button } from "@/components/ui/button";
import React from "react";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { SavedMarkerTypes } from "@/utils/types";
import { IoEyeOutline } from "react-icons/io5";
import ToolTipProvider from "@/components/ToolTipProvider";

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
    <Button
      onClick={() => handleViewLocation(saved)}
      className="bg-transparent text-black hover:bg-transparent"
    >
      <ToolTipProvider
        icon={<IoEyeOutline size={17} />}
        text={"View Location"}
      />
    </Button>
  );
}
