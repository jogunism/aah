'use client';

import dynamic from 'next/dynamic';
const UnivercitiesParallax = dynamic(() => import('./client'), { ssr: false });

export default function UnivercitiesWrapper() {
  return <UnivercitiesParallax />;
}
