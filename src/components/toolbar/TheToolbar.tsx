import TheSavedLocations from "./saved-locations/TheSavedLocations";

export default function TheToolbar() {
  return (
    <div className="bg-white h-screen w-20 z-50 absolute left-0 top-0 shadow-md flex flex-col items-center py-24">
      <TheSavedLocations />
    </div>
  );
}
