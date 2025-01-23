import { useEffect } from "react";
import { useModalStore } from "./use-modal-store";
import { useQueryParams } from "./use-query-params";

export const usePreventGoBack = (onClick?: () => void) => {
  const { onClose } = useModalStore();
  const push = useQueryParams();
  useEffect(() => {
    const handleGoBack = () => {
      onClose();
      window.history.pushState(null, "", window.location.href);
      push({ query: {} });
      if (onClick) {
        onClick();
      }
    };

    // window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handleGoBack);

    return () => window.removeEventListener("popstate", handleGoBack);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push]);
};
