import React from "react";
import { InfoWindowF, Marker } from "@react-google-maps/api";

import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheSaveLocationButton from "./TheSaveLocationButton";

type InfoWindowProps = {
  clickedPosition: {
    lat: number;
    lng: number;
  } | null;
};

export default function TheInfoWindowForClicks({
  clickedPosition,
}: InfoWindowProps) {
  const { infoWindowContent } = useGoogleMapsContext();

  return (
    <>
      {infoWindowContent ? (
        <>
          <Marker position={clickedPosition} />
          <InfoWindowF
            position={{
              lat: clickedPosition?.lat,
              lng: clickedPosition?.lng,
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
        </>
      ) : (
        <></>
      )}
    </>
  );
}
