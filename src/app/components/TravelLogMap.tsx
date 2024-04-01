'use client';

import React, { useMemo, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef, Marker, NavigationControl, Popup } from 'react-map-gl';

import type { TravelLogWithId } from '@/lib/logs/TravelLogModel';
import Pin from './Pin';

interface TravelLogMapProps {
  logs: TravelLogWithId[];
}

function TravelLogMap({ logs }: TravelLogMapProps) {
  const [popupInfo, setPopupInfo] = useState<TravelLogWithId | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const pins = useMemo(
    () =>
      logs.map((log) => (
        <Marker
          key={log._id.toString()}
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
            e.originalEvent.stopPropagation();
            setPopupInfo(log);
          }}
        >
          <Pin />
        </Marker>
      )),
    [logs]
  );
  return (
    <Map
      initialViewState={{
        latitude: 0,
        longitude: 0,
        zoom: 2.5,
      }}
      minZoom={2.5}
      projection={{ name: 'globe' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100vw', height: '100vh' }}
      attributionControl={false}
      ref={mapRef}
    >
      {pins}
      {popupInfo && (
        <Popup
          anchor="bottom"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          closeButton={false}
          className="size-auto"
          maxWidth="15%"
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <h1 className="text-lg">{popupInfo.title}</h1>
            <p className="line-clamp-2 text-sm">{popupInfo.description}</p>
            <img width="100%" src={popupInfo.image} />
          </div>
        </Popup>
      )}
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
