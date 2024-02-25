import React from "react";
import { InfoWindowF, Marker } from "@react-google-maps/api";

import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheSaveLocationButton from "./TheSaveLocationButton";

export default function TheInfoWindow() {
  const { infoWindowContent, markerPosition, savedCoordinates } =
    useGoogleMapsContext();

  const isLocationSaved = savedCoordinates.some(
    (saved) =>
      saved.lat === markerPosition.lat && saved.lng === markerPosition.lng
  );
  console.log("info", infoWindowContent);

  return (
    <>
      {infoWindowContent ? (
        <>
          <Marker position={markerPosition} />
          <InfoWindowF
            position={{
              lat: markerPosition?.lat,
              lng: markerPosition?.lng,
            }}
            options={{
              pixelOffset: {
                width: 0,
                height: -40,
              },
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-wide">{infoWindowContent}</p>
              {!isLocationSaved && <TheSaveLocationButton />}
            </div>
          </InfoWindowF>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
