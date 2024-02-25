import { OnLoadProps } from "@/utils/types";
import TheSearchBar from "../google-maps/search-bar/TheSearchBar";
import TheSavedLocations from "./saved-locations/TheSavedLocations";

export default function TheToolbar({ onLoad }: OnLoadProps) {
  return (
    <div className="absolute top-2.5 left-2 md:left-5 flex gap-4 h-10 z-50">
      <div className="bg-white rounded-3xl flex justify-center items-center pt-1 w-10">
        <TheSavedLocations />
      </div>
      <div>
        <TheSearchBar onLoad={onLoad} />
      </div>
    </div>
  );
}
