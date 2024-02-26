import { useGoogleMapsContext } from "@/app/context/googleMaps";

import ToolTipProvider from "@/components/ToolTipProvider";

import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";

import { SavedLocationTypes } from "@/utils/types";

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
