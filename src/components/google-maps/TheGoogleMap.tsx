"use client";

import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMapsContext } from "@/app/context/googleMaps";

import TheInfoWindow from "./info-window/TheInfoWindow";
import TheInfoWindowForClicks from "./info-window/TheInfoWindowForClicks";
import TheToolbar from "../toolbar/TheToolbar";

export default function TheGoogleMap() {
  const {
    isLoaded,
    markerPosition,
    center,
    clickedPosition,
    setSearchResult,
    setInfoWindowContent,
    setNewPosition,
    setClickedPosition,
    setMap,
    handlePlaceChanged,
  } = useGoogleMapsContext();

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
    autocomplete.addListener("place_changed", () => {
      if (!isLoaded) {
        handlePlaceChanged();
      }
    });
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedLat = event?.latLng?.lat();
    const clickedLng = event?.latLng?.lng();
  
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === "OK" && results) {
        const addressName = results[0].formatted_address;
        setInfoWindowContent(addressName);
        console.log("Address Name:", addressName);
        const clickedPosition = {
          lat: clickedLat || 0,
          lng: clickedLng || 0,
          infoWindowContent: addressName,
        };
        setClickedPosition(clickedPosition);
        setNewPosition(clickedPosition);
      } else {
        console.error("Geocoder failed due to: ", status);
      }
    });
  };

  const renderInfoWindowMarker = clickedPosition ? (
    <TheInfoWindowForClicks clickedPosition={clickedPosition} />
  ) : markerPosition ? (
    <TheInfoWindow />
  ) : (
    <></>
  );

  return (
    <>
      <TheToolbar onLoad={onLoad} />
      {isLoaded ? (
        <GoogleMap
          center={markerPosition}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          options={{ mapTypeControl: false, streetViewControl: false }}
          onLoad={(map) => {
            setMap(map);
            map.addListener("click", onMapClick);
            setClickedPosition(null);
          }}
        >
          {renderInfoWindowMarker}
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
