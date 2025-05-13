import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => window.removeEventListener("resize", onChange);
  }, []);

  return !!isMobile;
}