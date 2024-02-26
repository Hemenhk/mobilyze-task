"use client";

import { Button } from "../../ui/button";
import { GoBookmarkFill  } from "react-icons/go";

import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToolTipProvider from "@/components/ToolTipProvider";

export default function TheSaveLocationButton() {
  const queryClient = useQueryClient();
  const { handleSavePosition, newPosition } = useGoogleMapsContext();

  const { mutateAsync: savePositionMutation } = useMutation({
    mutationFn: async () => handleSavePosition(newPosition),
    onSuccess: (data) => {
      queryClient.setQueryData(["marker"], data);
      queryClient.refetchQueries({ queryKey: ["marker"] });
    },
  });

  return (
    <Button onClick={savePositionMutation} className="bg-transparent text-black hover:bg-transparent">
      <ToolTipProvider icon={<GoBookmarkFill size={17}/>} text={"Save Location"}/>
      
    </Button>
  );
}
