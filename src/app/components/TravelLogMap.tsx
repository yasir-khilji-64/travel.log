'use client';

import React, { useMemo, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef, Marker, NavigationControl, Popup } from 'react-map-gl';

import type { TravelLogWithId } from '@/lib/logs/TravelLogModel';
import Pin from './Pin';

interface TravelLogMapProps {
  logs: TravelLogWithId[];
}

function TravelLogMap({ logs }: TravelLogMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const pins = useMemo(
    () =>
      logs.map((log, index) => (
        <>
          <Marker
            key={index}
            longitude={log.longitude}
            latitude={log.latitude}
            anchor="top"
            onClick={(e) => {
              mapRef.current?.flyTo({
                animate: true,
                center: e.target.getLngLat(),
                zoom: 10.5,
                speed: 1,
              });
            }}
          >
            <Pin />
          </Marker>
        </>
      )),
    [logs]
  );
  return (
    <Map
      initialViewState={{
        latitude: 48.893,
        longitude: -90.543,
        zoom: 3.5,
      }}
      projection={{ name: 'mercator' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100vw', height: '100vh' }}
      attributionControl={false}
      ref={mapRef}
    >
      {pins}

      <Popup
        anchor="top"
        longitude={-90.545}
        latitude={48.893}
        closeButton={false}
        className="size-auto"
        maxWidth="10%"
      >
        <div>
          <a
            target="_new"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=pakistan`}
          >
            Wikipedia
          </a>
          <img
            width="100%"
            src="https://avatars.githubusercontent.com/u/36379648?s=400&u=ce710b45428f50fac66c6e439da7b5ad287d1f06&v=4"
          />
        </div>
      </Popup>
      <NavigationControl
        position="top-right"
        showCompass={true}
        showZoom={true}
        visualizePitch={true}
      />
    </Map>
  );
}

export default TravelLogMap;
