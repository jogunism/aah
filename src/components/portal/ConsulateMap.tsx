'use client';
/// <reference types="google.maps" />
// 공관 지도(Google Maps): 공관·비자센터에 번호 핀을 모두 찍고 핀 ↔ 주소 카드 강조, 학생 주소(집) 표시와 주소 → 좌표 변환

import { useEffect, useRef, useState } from 'react';

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  label: string; // number shown on the pin and on its address card
}

export interface LatLng {
  lat: number;
  lng: number;
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// Advanced markers need a map ID; Google's DEMO_MAP_ID works until we create our own
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

let loading: Promise<void> | null = null;

/** Load the Maps JavaScript API once per page */
const loadMaps = (lang: string) => {
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const w = window as unknown as Record<string, unknown>;
      w.__aahMapsReady = () => resolve();
      // Wrong or restricted key: Google calls this; the page then shows the addresses without a map
      w.gm_authFailure = () => window.dispatchEvent(new Event('aah-maps-auth-failure'));
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly&loading=async&language=${lang}&callback=__aahMapsReady`;
      s.async = true;
      s.onerror = () => {
        loading = null;
        reject(new Error('Google Maps failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
};

/** Gray numbered pin; the selected one is red and larger */
const pinElement = (on: boolean, label: string) =>
  new google.maps.marker.PinElement({
    background: on ? '#C73E43' : '#86868B',
    borderColor: '#FFFFFF',
    glyphText: label,
    glyphColor: '#FFFFFF',
    scale: on ? 1.3 : 1,
  });

/** Small blue dot for the student's own address */
const homeElement = () => {
  const dot = document.createElement('div');
  dot.style.cssText = 'width:14px;height:14px;border-radius:50%;background:#2C6BED;border:3px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25)';
  return dot;
};

const distanceKm = (a: LatLng, b: LatLng) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

/** The point closest to `from` */
export const nearest = <T extends LatLng>(from: LatLng, points: T[]): T | null =>
  points.reduce<T | null>((best, p) => (!best || distanceKm(from, p) < distanceKm(from, best) ? p : best), null);

/**
 * Address → coordinates with Google's geocoder (needs the Geocoding API on the key).
 * Cached in the browser so each student's address is looked up once; null when not available.
 */
export const geocodeAddress = async (address: string, region: string, lang: string): Promise<LatLng | null> => {
  if (!KEY) return null;
  const cacheKey = `aah-geo:${region}:${address}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {}
  try {
    await loadMaps(lang);
    const { Geocoder } = (await google.maps.importLibrary('geocoding')) as google.maps.GeocodingLibrary;
    const { results } = await new Geocoder().geocode({ address, region });
    const loc = results[0]?.geometry.location;
    if (!loc) return null;
    const point = { lat: loc.lat(), lng: loc.lng() };
    try {
      localStorage.setItem(cacheKey, JSON.stringify(point));
    } catch {}
    return point;
  } catch {
    return null;
  }
};

export default function ConsulateMap({
  points,
  activeId,
  onSelect,
  lang,
  label,
  home,
  homeTitle,
}: {
  home: LatLng | null; // the student's address, shown as a blue dot
  homeTitle: string;
  points: MapPoint[];
  activeId: string | null;
  onSelect: (id: string) => void;
  lang: string;
  label: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef(new Map<string, { marker: google.maps.marker.AdvancedMarkerElement }>());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const select = useRef(onSelect);
  select.current = onSelect;

  useEffect(() => {
    let cancelled = false;
    const onAuthFailure = () => setFailed(true);
    window.addEventListener('aah-maps-auth-failure', onAuthFailure);
    loadMaps(lang)
      .then(async () => {
        if (cancelled || !el.current) return;
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        await google.maps.importLibrary('marker');
        map.current = new Map(el.current, {
          mapId: MAP_ID,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
        });
        setReady(true);
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      window.removeEventListener('aah-maps-auth-failure', onAuthFailure);
    };
  }, [lang]);

  // A map problem must never break the step: on any error, hide the map and keep the address cards
  const safely = (fn: () => void) => {
    try {
      fn();
    } catch (error) {
      console.error('Consulate map:', error);
      setFailed(true);
    }
  };

  // Pins for the current country; fit them all in view
  useEffect(() => {
    if (!ready || failed || !map.current) return;
    safely(() => {
      markers.current.forEach(({ marker }) => (marker.map = null));
      markers.current.clear();
      const bounds = new google.maps.LatLngBounds();
      points.forEach(p => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: map.current,
          position: { lat: p.lat, lng: p.lng },
          title: p.title,
          content: pinElement(false, p.label).element,
          gmpClickable: true,
        });
        marker.addListener('click', () => select.current(p.id));
        markers.current.set(p.id, { marker });
        bounds.extend({ lat: p.lat, lng: p.lng });
      });
      if (home) {
        const marker = new google.maps.marker.AdvancedMarkerElement({ map: map.current, position: home, title: homeTitle, content: homeElement() });
        markers.current.set('home', { marker });
        bounds.extend(home);
      }
      if (points.length === 1 && !home) {
        map.current!.setCenter({ lat: points[0].lat, lng: points[0].lng });
        map.current!.setZoom(14);
      } else if (points.length > 0) {
        map.current!.fitBounds(bounds, 48);
      }
    });
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, failed, points, home]);

  // Selected pin: red and on top; the map pans to it
  useEffect(() => {
    if (!ready || failed) return;
    safely(() =>
      markers.current.forEach(({ marker }, id) => {
        if (id === 'home') return;
        const on = id === activeId;
        const point = points.find((p) => p.id === id);
        // A fresh pin instead of changing scale on the old one (that setter throws in the current Maps version)
        marker.content = pinElement(on, point?.label ?? '').element;
        marker.zIndex = on ? 10 : 1;
        if (on && marker.position) map.current?.panTo(marker.position);
      }),
    );
     
  }, [ready, failed, activeId, points]);

  if (!KEY || failed) return null;
  return (
    <div
      ref={el}
      role="region"
      aria-label={label}
      className="h-[320px] w-full overflow-hidden rounded-[14px] border border-line bg-soft md:h-[380px]"
    />
  );
}
