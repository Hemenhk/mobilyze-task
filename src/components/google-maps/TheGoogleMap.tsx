"use client";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import TheSearchBar from "./search-bar/TheSearchBar";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };

export default function TheGoogleMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [savedCoordinates, setSavedCoordinates] = useState<
    { lat: number; lng: number; infoWindowContent: string }[]
  >(JSON.parse(localStorage.getItem("savedCoordinates") || "[]"));
  const destinationRef = useRef<HTMLInputElement>(null);
  const [infoWindowContent, setInfoWindowContent] = useState<string>("");
  const [searchResult, setSearchResult] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const handlePlaceChanged = () => {
    const place = destinationRef.current?.value;
    if (place && isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          const addressName = results[0].formatted_address; // Extract address name from geocoding results
          setInfoWindowContent(addressName); // Set the content of the InfoWindowF
          const newPosition = { lat: location.lat(), lng: location.lng(), infoWindowContent: addressName };
          setMarkerPosition(newPosition);
          map.panTo(location);
          const newCoordinates = [...savedCoordinates, newPosition];
          localStorage.setItem(
            "savedCoordinates",
            JSON.stringify(newCoordinates)
          );
          setSavedCoordinates(newCoordinates);
        }
      });
    }
  };

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
    autocomplete.addListener("place_changed", handlePlaceChanged);
  };

  return (
    <>
      <TheSearchBar
        map={map}
        isLoaded={isLoaded}
        destinationRef={destinationRef}
        onPlaceChanged={handlePlaceChanged}
        setSaveCoordinates={setSavedCoordinates}
        onLoad={onLoad}
        setInfoWindowContent={setInfoWindowContent}
        setMarkerPosition={setMarkerPosition}
      />
      {isLoaded ? (
        <GoogleMap
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          options={{ mapTypeControl: false }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={markerPosition} />
          <InfoWindowF
            position={{
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }}
            options={{
              pixelOffset: {
                width: 0,
                height: -40,
              },
            }}
          >
            <p>{infoWindowContent}</p>
          </InfoWindowF>
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
