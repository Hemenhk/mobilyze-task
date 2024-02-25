"use client";

import TheToolbar from "@/components/toolbar/TheToolbar";
import TheGoogleMap from "@/components/google-maps/TheGoogleMap";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      {/* <TheToolbar /> */}
      <TheGoogleMap />
    </main>
  );
}
