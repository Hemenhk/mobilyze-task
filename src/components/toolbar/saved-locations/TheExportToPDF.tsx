import { Button } from "@/components/ui/button";
import { SavedLocationTypes } from "@/utils/types";
import { PiExport } from "react-icons/pi";

import jsPDF from "jspdf";
import ToolTipProvider from "@/components/ToolTipProvider";

type ExportPDFProps = {
  currentMarkers: SavedLocationTypes[];
};

export default function TheExportToPDF({ currentMarkers }: ExportPDFProps) {
  const handleExportToPdf = () => {
    const pdf = new jsPDF();
    let yPos = 10;
    currentMarkers.forEach((marker, index) => {
      pdf.text(10, yPos, `Location ${index + 1}:`);
      pdf.text(20, yPos + 10, `Latitude: ${marker.lat}`);
      pdf.text(20, yPos + 20, `Longitude: ${marker.lng}`);
      pdf.text(20, yPos + 30, `Info: ${marker.infoWindowContent}`);
      yPos += 40;
    });
    pdf.save("saved_locations.pdf");
  };
  return (
    <Button
      onClick={handleExportToPdf}
      className="bg-transparent text-black hover:bg-transparent"
    >
      <ToolTipProvider
        icon={<PiExport size={17} />}
        text={"Export saved location as pdf"}
      />
    </Button>
  );
}
