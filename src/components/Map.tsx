"use client"

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, LatLngExpression } from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<LeafletMap | null>(null);
  const center: LatLngExpression = [52.507932, 13.338414];  // lat, lng order
  const [zoom] = useState<number>(12);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new L.Map(mapContainer.current, {
        center: center,
        zoom: zoom,
      });

      // Create a MapTiler Layer inside Leaflet
      new MaptilerLayer({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
      }).addTo(map.current);
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.off();  // Remove all event listeners
        map.current.remove();  // Remove the map instance
        map.current = null;
      }
    };
  }, [center, zoom]);

  return (
    <div className="mapWrap z-0">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
