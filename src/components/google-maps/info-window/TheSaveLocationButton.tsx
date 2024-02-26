"use client";

import { Button } from "../../ui/button";
import { CiBookmark } from "react-icons/ci";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      <CiBookmark size={17}/>
    </Button>
  );
}
