import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-7",
    lg: "h-9",
  };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center select-none group",
        className
      )}
      aria-label="Teklin — Home"
    >
      {/* Light / Dark wordmark */}
      <img
        src="/images/logo_brown.png"
        alt=""
        className={cn(
          "block dark:hidden w-auto transition-transform duration-300 group-hover:scale-[1.02]",
          sizeClasses[size]
        )}
        loading="eager"
        decoding="async"
      />
      <img
        src="/images/logo_white.png"
        alt=""
        className={cn(
          "hidden dark:block w-auto transition-transform duration-300 group-hover:scale-[1.02]",
          sizeClasses[size]
        )}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
