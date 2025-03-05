import React, { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mql = globalThis.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );
    const onChange = () => {
      setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
};

export default useIsMobile;
