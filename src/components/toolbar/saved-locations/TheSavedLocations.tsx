import { CiBookmark } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Card, CardContent } from "@/components/ui/card";

const savedOnes = [
  { name: "France" },
  { name: "Germany" },
  { name: "Sweden" },
  { name: "UK" },
];

export default function TheSavedLocations() {
  const mappedSavedOnes = savedOnes.map((saved) => (
    <li key={saved.name}>
      <Card >
        <CardContent className="flex py-2 border-red-600">
          <p>{saved.name}</p>
        </CardContent>
      </Card>
    </li>
  ));
  return (
    <Sheet>
      <SheetTrigger className="flex flex-col items-center gap-3">
        <CiBookmark size={25} />
        <p className="text-xs font-medium">Saved</p>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Saved Locations</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2">{mappedSavedOnes}</ul>
      </SheetContent>
    </Sheet>
  );
}
