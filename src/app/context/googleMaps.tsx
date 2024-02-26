"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { GoogleMapsContextType } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast, dismiss } = useToast();
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
  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

      const newPosition: {
        lat: number;
        lng: number;
        infoWindowContent: string;
      } = {
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
    lat: number;
    lng: number;
    infoWindowContent: string;
  }) => {
    console.log("Updating position", newPosition);
    console.log("marker2", markerPosition)
    console.log("info", infoWindowContent)
    setInfoWindowContent(newPosition.infoWindowContent);
    setMarkerPosition(newPosition);
    setClickedPosition(newPosition);
    map?.panTo(newPosition);
  };

  const handleSavePosition = (newPosition: {
    lat: number;
    lng: number;
    infoWindowContent: string;
  }) => {
    if (!newPosition) return;

    const savedCoordinates = JSON.parse(
      localStorage.getItem("savedCoordinates") || "[]"
    );
    const newCoordinates = [...savedCoordinates, newPosition];
    localStorage.setItem("savedCoordinates", JSON.stringify(newCoordinates));
    setSavedCoordinates(newCoordinates);
    toast({
      title: "Location saved!",
      description: `${newPosition.infoWindowContent} has been saved on your device.`,
    });
    setTimeout(() => {
      dismiss();
    }, 2000);
  };

  return (
    <GoogleMapsContext.Provider
      value={{
        map,
        isLoaded,
        markerPosition,
        clickedPosition,
        destinationRef,
        infoWindowContent,
        newPosition,
        savedCoordinates,
        setMap,
        setSearchResult,
        setInfoWindowContent,
        setNewPosition,
        setMarkerPosition,
        setClickedPosition,
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
