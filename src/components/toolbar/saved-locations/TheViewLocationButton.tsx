import { Button } from "@/components/ui/button";
import React from "react";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { SavedLocationTypes } from "@/utils/types";
import { IoEyeOutline } from "react-icons/io5";
import ToolTipProvider from "@/components/ToolTipProvider";

type ViewLocationProps = {
  saved: SavedLocationTypes;
};

export default function TheViewLocationButton({ saved }: ViewLocationProps) {
  const { setMarkerPosition, setInfoWindowContent, setNewPosition, setClickedPosition } = useGoogleMapsContext();

  const handleViewLocation = (saved: SavedLocationTypes) => {
    setMarkerPosition(saved);
    setInfoWindowContent(saved.infoWindowContent);
    setClickedPosition(saved)
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
