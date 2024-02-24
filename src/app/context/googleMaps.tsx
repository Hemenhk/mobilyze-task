"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { GoogleMapsContextType } from "@/utils/types";

export const GoogleMapsContext = createContext<GoogleMapsContextType | null>(
  null
);

type GoogleMapsProviderProps = {
  children: React.ReactNode;
};

export default function GoogleMapsContextProvider({
  children,
}: GoogleMapsProviderProps) {

  const center = { lat: 48.8584, lng: 2.2945 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const destinationRef = useRef<HTMLInputElement>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const [infoWindowContent, setInfoWindowContent] = useState<string>("");
  const [newPosition, setNewPosition] = useState<any>(null);

  const [searchResult, setSearchResult] = useState("");
  const [savedCoordinates, setSavedCoordinates] = useState<
    { lat: number; lng: number; infoWindowContent: string }[]
  >(JSON.parse(localStorage.getItem("savedCoordinates") || "[]"));


  const geocodePlace = (place: any, geocoder: any) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: place }, (results: any, status: any) => {
        if (status !== "OK" || !results || results.length === 0) {
          reject(new Error("Geocode request failed"));
          return;
        }
        resolve(results[0]);
      });
    });
  };

  const handlePlaceChanged = async () => {
    const place = destinationRef.current?.value;

    if (!place || !isLoaded) {
      throw new Error("Invalid place or map not loaded");
    }

    const geocoder = new window.google.maps.Geocoder();

    try {
      const result = await geocodePlace(place, geocoder);

      const { geometry, formatted_address } = result;

      const location = geometry.location;
      const addressName = formatted_address;

      const newPosition = {
        lat: location.lat(),
        lng: location.lng(),
        infoWindowContent: addressName,
      };

      updatePosition(newPosition);
      setNewPosition(newPosition);

      return newPosition;
    } catch (error) {
      throw error;
    }
  };

  const updatePosition = (newPosition: {
    lat: any;
    lng: any;
    infoWindowContent: any;
  }) => {
    setInfoWindowContent(newPosition.infoWindowContent);
    setMarkerPosition(newPosition);
    map?.panTo(newPosition);
  };

  const handleSavePosition = (newPosition: {
    lat: any;
    lng: any;
    infoWindowContent: any;
  }) => {
    if (!newPosition) return;

    const savedCoordinates = JSON.parse(
      localStorage.getItem("savedCoordinates") || "[]"
    );
    const newCoordinates = [...savedCoordinates, newPosition];
    localStorage.setItem("savedCoordinates", JSON.stringify(newCoordinates));
    setSavedCoordinates(newCoordinates);
  };

  return (
    <GoogleMapsContext.Provider
      value={{
        center,
        isLoaded,
        markerPosition,
        destinationRef,
        infoWindowContent,
        newPosition,
        setMap,
        setSearchResult,
        handlePlaceChanged,
        handleSavePosition,
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}

export const useGoogleMapsContext = () => {
  const context = useContext(GoogleMapsContext);
  if (!context)
    throw new Error(
      "useGoogleMapsContext must be used within a GoogleMapsContextProvider"
    );

  return context;
};
