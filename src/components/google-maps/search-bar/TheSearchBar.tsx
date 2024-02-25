import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OnLoadProps } from "@/utils/types";

export default function TheSearchBar({ onLoad }: OnLoadProps) {
  const { isLoaded, destinationRef, handlePlaceChanged } =
    useGoogleMapsContext();

  const queryClient = useQueryClient();

  const { mutateAsync: changePlaceMutation } = useMutation({
    mutationFn: handlePlaceChanged,
    onSuccess: (data) => {
      queryClient.setQueryData(["marker"], data);
      queryClient.refetchQueries({ queryKey: ["marker"] });
    },
  });

  if (!isLoaded) {
    return <p>Not loaded</p>;
  }

  return (
    <Card className="rounded-3xl shadow-xl">
      <Autocomplete onLoad={onLoad} onPlaceChanged={changePlaceMutation}>
        <Input
          type="text"
          placeholder="Search for an address"
          ref={destinationRef}
          className="border-none rounded-3xl w-64 md:w-80"
        />
      </Autocomplete>
    </Card>
  );
}
