import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("relative size-9", className)}>
      <Image src="/logo.png" alt="Logo" fill className="object-cover" />
    </Link>
  );
};
