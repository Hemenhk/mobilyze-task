import React from "react";
import { InfoWindowF } from "@react-google-maps/api";

import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheSaveLocationButton from "./TheSaveLocationButton";

export default function TheInfoWindow() {
  const { infoWindowContent, markerPosition } = useGoogleMapsContext();

  return (
    <>
      {infoWindowContent ? (
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
          <div className="flex flex-col gap-2">
            <p className="font-medium tracking-wide">{infoWindowContent}</p>
            <TheSaveLocationButton />
          </div>
        </InfoWindowF>
      ) : (
        <></>
      )}
    </>
  );
}
