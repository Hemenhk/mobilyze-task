"use client";

import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMapsContext } from "@/app/context/googleMaps";

import TheInfoWindow from "./info-window/TheInfoWindow";
import TheInfoWindowForClicks from "./info-window/TheInfoWindowForClicks";
import TheSearchBar from "./search-bar/TheSearchBar";

export default function TheGoogleMap() {
  const {
    isLoaded,
    markerPosition,
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
    const clickedLat = event?.latLng.lat();
    const clickedLng = event?.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      const addressName = results[0].formatted_address;
      setInfoWindowContent(addressName);
      console.log("Address Name:", addressName);
      const clickedPosition = {
        lat: clickedLat,
        lng: clickedLng,
        infoWindowContent: addressName,
      };
      setClickedPosition(clickedPosition);
      setNewPosition(clickedPosition);
    });
  };

  const renderInfoWindowMarker = clickedPosition ? (
    <TheInfoWindowForClicks clickedPosition={clickedPosition} />
  ) : (
    <TheInfoWindow />
  );

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
