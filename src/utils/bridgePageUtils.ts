import { useEffect } from "react";

// bridgePageUtils.js
export const useBridgePage = (showBridgePage:boolean, selectedProductLink:string) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showBridgePage && selectedProductLink) {
      timer = setTimeout(() => {
        window.location.href = selectedProductLink;
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showBridgePage, selectedProductLink]);
};