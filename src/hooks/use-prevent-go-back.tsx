import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePreventGoBack = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleGoBack = () => {
      window.history.pushState(null, "", window.location.href);
      router.push(pathname);
    };

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handleGoBack);

    return () => window.removeEventListener("popstate", handleGoBack);
  }, [pathname, router]);
};
