"use client";

import Image from "next/image";

interface CoverPhotoProps {
  src: string | null;
}

export const CoverPhoto = ({ src }: CoverPhotoProps) => {

  return (
    <div className="relative h-52 w-full">
      {src ? (
        <Image src={src} alt="Cover photo" fill className="object-cover" />
      ) : (
        <span className="block size-full bg-accent" />
      )}
    </div>
  );
};
