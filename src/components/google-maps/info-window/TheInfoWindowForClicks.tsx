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
  const { infoWindowContent, savedCoordinates } = useGoogleMapsContext();

  const isLocationSaved = savedCoordinates.some(
    (saved) =>
      saved.lat === clickedPosition.lat && saved.lng === clickedPosition.lng
  );

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
              <p className="font-medium tracking-wide border-b pb-2">{infoWindowContent}</p>
              <div className="flex justify-between items-center mr-2">
                <p className="text-xs tracking-wide">
                  {clickedPosition.lat}
                  <br />
                  {clickedPosition.lng}
                </p>
                {!isLocationSaved && <TheSaveLocationButton />}
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
