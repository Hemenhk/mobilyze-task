"use client";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

export default function TheGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          options={{mapTypeControl: false,}}
        ></GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </>
  );
}
