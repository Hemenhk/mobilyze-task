"use client";
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
      if (marker) {
        // Check if marker is not null or undefined
        pdf.text((10).toString(), yPos,index + 1);
        pdf.text((20).toString(), yPos + 10, marker.lat);
        pdf.text((20).toString(), yPos + 20, marker.lng);
        yPos += 40;
      }
    });
    pdf.save("saved_locations.pdf");
  };

  return (
    <Button
      onClick={handleExportToPdf}
      className="bg-transparent text-black hover:bg-transparent pb-3"
    >
      <ToolTipProvider
        icon={<PiExport size={17} />}
        text={"Export saved location as pdf"}
      />
    </Button>
  );
}
