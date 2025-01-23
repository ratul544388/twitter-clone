"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface CoverPhotoInputProps {
  src: string;
}

export const CoverPhotoInput = ({ src }: CoverPhotoInputProps) => {
  return (
    <div className="relative flex h-44 items-center justify-center bg-accent">
      <Button
        variant="ghost"
        size="icon"
        className="bg-background hover:bg-background/80"
      >
        <ImagePlus className="size-4" />
      </Button>
      {src && (
        <Button
          className="absolute right-1 top-1 bg-background hover:bg-background/80"
          size="icon"
          variant="ghost"
        >
          <Trash className="size-4" />
        </Button>
      )}
    </div>
  );
};
