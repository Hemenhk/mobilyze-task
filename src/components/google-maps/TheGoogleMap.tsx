"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import TheSearchBar from "./search-bar/TheSearchBar";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheInfoWindow from "./info-window/TheInfoWindow";

export default function TheGoogleMap() {
  const {
    handlePlaceChanged,
    setSearchResult,
    setMap,
    isLoaded,
    markerPosition,
    infoWindowContent
  } = useGoogleMapsContext();

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
    autocomplete.addListener("place_changed", () => {
      if (!isLoaded) {
        handlePlaceChanged();
      }
    });
  };

  const renderMarkerIfValidAddress = infoWindowContent ? (
    <Marker position={markerPosition} />
  ) : <></>

  return (
    <>
      <TheSearchBar onLoad={onLoad} />
      {isLoaded ? (
        <GoogleMap
          center={markerPosition}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          options={{ mapTypeControl: false }}
          onLoad={(map) => setMap(map)}
        >
          {renderMarkerIfValidAddress}
          <TheInfoWindow />
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
