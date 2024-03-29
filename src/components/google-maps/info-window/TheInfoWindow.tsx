"use client";
import { InfoWindowF, Marker } from "@react-google-maps/api";

import { useGoogleMapsContext } from "@/app/context/googleMaps";
import TheSaveLocationButton from "./TheSaveLocationButton";

export default function TheInfoWindow() {
  const { infoWindowContent, markerPosition, savedCoordinates } =
    useGoogleMapsContext();

  const isLocationSaved = savedCoordinates.some(
    (saved) =>
      saved?.lat === markerPosition?.lat && saved?.lng === markerPosition?.lng
  );

  console.log("marker1", markerPosition);
  console.log("info1", infoWindowContent);
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
            options={{ pixelOffset: new window.google.maps.Size(0, -40) } 
            }
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-wide">{infoWindowContent}</p>
              <div className="flex justify-between items-center mr-2">
                <p className="text-xs tracking-wide">
                  <span className="font-semibold">lat:</span>{" "}
                  {markerPosition.lat}
                  <br /> <span className="font-semibold">lng:</span>{" "}
                  {markerPosition.lng}
                </p>
                <div>{!isLocationSaved && <TheSaveLocationButton />}</div>
              </div>
            </div>
          </InfoWindowF>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
