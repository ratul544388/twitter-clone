import { placeholderAvatar } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  alt?: string | null | undefined;
  className?: string;
}

export default function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative size-9 overflow-hidden rounded-full bg-accent",
        className,
      )}
    >
      <Image
        fill
        src={src || placeholderAvatar}
        alt={alt || "Avatar"}
        className="object-cover"
      />
    </div>
  );
}
