"use client"

import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  // const renderedGoogleMaps = console.log(process.env.GOOGLE_MAPS_API_KEY);
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      {isLoaded ? (
        <GoogleMap
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
        ></GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </main>
  );
}
