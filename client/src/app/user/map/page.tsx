"use client";

import { Box, Button, Center } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const MapPage = () => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_API;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [Sosbool, setsosbool] = useState(false);

  async function SosTriggered(latitude: number, longitude: number) {
    console.log("Triggered SOS:", latitude, longitude);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL!}/user/sendsos`,
        { Latitude: latitude, Longitude: longitude },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("SOS request failed:", error);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current || !key)
      return;

    let watchId: number | null = null;

    async function initializeMap(latitude: number, longitude: number) {
      if (!mapInstanceRef.current) {
        const { OlaMaps } = await import("olamaps-web-sdk");
        const olaMaps = new OlaMaps({ apiKey: key! });

        mapInstanceRef.current = olaMaps.init({
          style:
            "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          container: mapContainerRef.current,
          center: [longitude, latitude],
          zoom: 16,
        });

        // Add marker
        const marker = olaMaps
          .addMarker({
            offset: [0, -20],
            anchor: "bottom",
          })
          .setLngLat([longitude, latitude])
          .addTo(mapInstanceRef.current);

        setIsMapLoaded(true);
      } else {
        mapInstanceRef.current.setCenter([longitude, latitude]);
      }
    }

    function handlePosition(pos: GeolocationPosition) {
      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });

      initializeMap(latitude, longitude); // Ensures map updates dynamically

      if (Sosbool) {
        SosTriggered(latitude, longitude);
      }
    }

    function handleError(error: GeolocationPositionError) {
      console.error("Geolocation error:", error);
    }

    watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [key, Sosbool]); // `Sosbool` ensures SOS API triggers when toggled

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={["flex"]}
      flexDirection={["column"]}
      justifyContent={["center"]}
      alignItems={["center"]}
    >
      <Box width={["90%","60%"]} height={["60%","80%"]} position="relative" zIndex={0}>
        {!isMapLoaded && <p>Loading Map...</p>}
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "100%", position: "relative" }}
        ></div>
      </Box>
      <Box
        height="10%"
        width="100%"
        position={["absolute"]}
        zIndex={1}
        bottom={0}
        left={0}
        display={["flex"]}
        justifyContent={["center"]}
        alignItems={["center"]}
      >
        <Button
          onClick={() => {
            setsosbool(true);
          }}
        >
          SOS{coords?.latitude}{coords?.longitude}
        </Button>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(MapPage), { ssr: false });
