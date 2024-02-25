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
    <Button onClick={savePositionMutation} className="flex items-center gap-2">
      <CiBookmark strokeWidth={1}/>
      <p className="tracking-wider text-xs">Save</p>
    </Button>
  );
}
