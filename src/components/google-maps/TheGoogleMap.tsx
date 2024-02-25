"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import TheSearchBar from "./search-bar/TheSearchBar";
import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheInfoWindow from "./info-window/TheInfoWindow";
import { useEffect, useState } from "react";
import TheInfoWindowForClicks from "./info-window/TheInfoWindowForClicks";

export default function TheGoogleMap() {
  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markedPosition, setMarkedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const {
    handlePlaceChanged,
    setSearchResult,
    setInfoWindowContent,
    setNewPosition,
    setMap,
    isLoaded,
    markerPosition,
    infoWindowContent,
  } = useGoogleMapsContext();
  useEffect(() => {
    if (clickedPosition && markedPosition) {
      setClickedPosition(null);
    }
  }, [markedPosition]);

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
    autocomplete.addListener("place_changed", () => {
      if (!isLoaded) {
        handlePlaceChanged();
      }
    });
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedLat = event?.latLng.lat();
    const clickedLng = event?.latLng.lng();
    const clickedPosition = { lat: clickedLat, lng: clickedLng };

    // Update the clicked position state
    setClickedPosition(clickedPosition);
    setNewPosition(clickedPosition)
  

    // Perform reverse geocoding to get the address name
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressName = results[0].formatted_address;
        setInfoWindowContent(addressName);
        console.log("Address Name:", addressName);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  return (
    <>
      <TheSearchBar onLoad={onLoad} />
      {isLoaded ? (
        <GoogleMap
          center={markerPosition}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          options={{ mapTypeControl: false }}
          onLoad={(map) => {
            setMap(map);
            map.addListener("click", onMapClick)
            setClickedPosition(null);
          }}
        >
          {clickedPosition ? (
            <TheInfoWindowForClicks clickedPosition={clickedPosition} />
          ) : (
            <TheInfoWindow />
          )}
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
