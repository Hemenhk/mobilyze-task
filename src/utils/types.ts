export type GoogleMapsContextType = {
  center: {
    lat: number;
    lng: number;
  };
  isLoaded: boolean;
  newPosition: {
    lat: any;
    lng: any;
    infoWindowContent: any;
  };
  clickedPosition: {
    lat: number;
    lng: number;
  } | null;
  markerPosition: {
    lat: number;
    lng: number;
  };
  infoWindowContent: string;

  destinationRef: React.RefObject<HTMLInputElement>;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;

  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  setInfoWindowContent: React.Dispatch<React.SetStateAction<string>>;
  handlePlaceChanged: () => Promise<unknown>;
  handleSavePosition: (newPosition: any) => void;
  setNewPosition: React.Dispatch<any>;
  setClickedPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
};
