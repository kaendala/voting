import "./CarouselComponent.style.scss";
import React, { useEffect, useRef, useState } from "react";
import useDimensions from "../../../utils/hooks/window/useWindowDimensions";
import { useSwipeable } from "react-swipeable";

const CarouselComponent = ({ children }) => {
  const carousel = useRef();
  const [dimension] = useDimensions();
  const [position, setPosition] = useState(0);
  const [widthCarousel, setWidthCarousel] = useState(0);

  useEffect(() => {
    if (children && children.length > 0) {
      setWidthCarousel(carousel.current.offsetWidth);
    }
  }, [children, dimension]);
  useEffect(() => {
    const all = children ? widthCarousel / (children && children.length) : 0;
    carousel.current.style.left = "-" + position * all + "px";
  }, [position, children, widthCarousel, dimension]);

  const next = () => {
    let actualPosition = position;
    if (actualPosition < children.length - 1) {
      actualPosition = actualPosition + 1;
      setPosition(actualPosition);
    }
  };
  const prev = () => {
    let actualPosition = position;
    if (actualPosition > 0) {
      actualPosition = actualPosition - 1;
      setPosition(actualPosition);
    }
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="containerCarousel">
      <div className="contentList" {...handlers}>
        <div className="carousels" ref={carousel}>
          {children &&
            children.length > 0 &&
            children.map((item, index) => (
              <div key={index} className="element">
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
