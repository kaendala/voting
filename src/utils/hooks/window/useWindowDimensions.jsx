import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let device = "none";
  if (width < 768) device = "mobile";
  else if (width >= 768 && width < 1024) device = "tablet";
  else if (width >= 1024 && width < 2000) device = "browser";
  else if (width > 2000) device = "4k";

  return {
    width,
    height,
    device,
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(() => getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [windowDimensions];
};

export default useWindowDimensions;
