'use client';

import Image from 'next/image';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

interface ParallaxImageProps {
  section: string;
  imagePath: string;
  alt?: string;
}

export default function ParallaxImage({
  section,
  imagePath, //
  alt,
}: ParallaxImageProps) {
  return (
    <ParallaxProvider>
      <div className="relative w-screen h-[500px] overflow-hidden">
        <div className="relative w-screen h-[500px] overflow-hidden">
          <Parallax translateY={[-80, 0]} className="absolute inset-0 z-0">
            <div className="relative w-full h-[160%]">
              <Image src={imagePath} alt={alt ?? section} fill className="object-cover" priority />
            </div>
          </Parallax>
        </div>
      </div>
    </ParallaxProvider>
  );
}
