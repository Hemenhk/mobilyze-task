import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { SavedMarkerTypes } from "@/utils/types";

type RemoveMarkerProps = {
  savedMarkers: SavedMarkerTypes[];
  idx: any;
};

export default function TheRemoveSavedLocationButton({
  savedMarkers,
  idx,
}: RemoveMarkerProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: removeMarkerMutation } = useMutation({
    mutationFn: async (idx: number) => {
      return new Promise((resolve, reject) => {
        const updatedMarkers = [...savedMarkers];
        if (idx >= 0 && idx < updatedMarkers.length) {
          updatedMarkers.splice(idx, 1);
          localStorage.setItem(
            "savedCoordinates",
            JSON.stringify(updatedMarkers)
          );
          resolve(updatedMarkers);
        } else {
          reject(new Error("Invalid marker index"));
        }
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["marker"], data);
      queryClient.refetchQueries({ queryKey: ["marker"] });
    },
  });
  return (
    <Button
      className="bg-transparent text-black hover:bg-transparent"
      onClick={() => removeMarkerMutation(idx)}
    >
      <IoTrashOutline />
    </Button>
  );
}
