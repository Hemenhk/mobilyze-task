import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { SavedLocationTypes } from "@/utils/types";
import ToolTipProvider from "@/components/ToolTipProvider";
import { useToast } from "@/components/ui/use-toast";

type RemoveLocationProps = {
  savedLocation: SavedLocationTypes[];
  idx: any;
};

export default function TheRemoveSavedLocationButton({
  savedLocation,
  idx,
}: RemoveLocationProps) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const { mutateAsync: removeLocationMutation } = useMutation({
    mutationFn: async (idx: number) => {
      return new Promise((resolve, reject) => {
        const updatedLocation = [...savedLocation];
        if (idx >= 0 && idx < updatedLocation.length) {
          updatedLocation.splice(idx, 1);
          localStorage.setItem(
            "savedCoordinates",
            JSON.stringify(updatedLocation)
          );
          toast({
            title: "Location deleted!",
            description: "Successfully deleted location.",
            variant: "destructive",
          });
          setTimeout(() => {
            dismiss();
          }, 2000);
          resolve(updatedLocation);
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
      onClick={() => removeLocationMutation(idx)}
    >
      <ToolTipProvider
        icon={<IoTrashOutline size={17} />}
        text={"Delete Location"}
      />
    </Button>
  );
}
