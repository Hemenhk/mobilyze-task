"use client";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import TheSearchBar from "./search-bar/TheSearchBar";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };

export default function TheGoogleMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const onPlaceChanged = () => {
    if (destinationRef.current && map) {
      const place = destinationRef.current.value;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
          map.setCenter(location);
        }
      });
    }
  };

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
    autocomplete.addListener("place_changed", onPlaceChanged);
  };

  
  return (
    <>
      <TheSearchBar
      map={map}
        isLoaded={isLoaded}
        destinationRef={destinationRef}
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
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
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
