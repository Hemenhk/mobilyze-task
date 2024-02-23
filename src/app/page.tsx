"use client";

import TheToolbar from "@/components/toolbar/TheToolbar";
import TheGoogleMap from "@/components/google-maps/TheGoogleMap";
import { Input } from "@/components/ui/input";
import { MutableRefObject, useRef } from "react";
export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <TheToolbar />
      <TheGoogleMap />
    </main>
  );
}
