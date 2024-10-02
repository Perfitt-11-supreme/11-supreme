import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// bridgePageUtils.js
export const useBridgePage = (showBridgePage:boolean, selectedProductLink:string) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showBridgePage && selectedProductLink) {
      timer = setTimeout(() => {
        navigate(selectedProductLink);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showBridgePage, selectedProductLink, navigate]);
};