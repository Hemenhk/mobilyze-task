export type GoogleMapsContextType = {
  isLoaded: boolean;
  center: {
    lat: number;
    lng: number;
};
  map: google.maps.Map | null
  newPosition: NewPositionType
  clickedPosition: {
    lat: number;
    lng: number;
  } | null;
  markerPosition: {
    lat: number;
    lng: number;
  };
  infoWindowContent: string;
  savedCoordinates: {
    lat: number;
    lng: number;
    infoWindowContent: string;
  }[];
  destinationRef: React.RefObject<HTMLInputElement>;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;

  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  setInfoWindowContent: React.Dispatch<React.SetStateAction<string>>;
  handlePlaceChanged: () => Promise<unknown>;
  handleSavePosition: (newPosition: any) => void;
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setNewPosition: React.Dispatch<any>;
  setClickedPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
};

export type SavedLocationTypes = {
  lat: number;
  lng: number;
  infoWindowContent: string;
};

export type OnLoadProps = {
  onLoad: (autocomplete: any) => void;
};

export type NewPositionType = {
  lat: number;
  lng: number;
  infoWindowContent: string;
}