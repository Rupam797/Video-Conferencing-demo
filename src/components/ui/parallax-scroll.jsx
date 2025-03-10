import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxScroll = ({ children, offset = 50, className = "" }) => {
  const ref = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const onResize = () => {
      if (element) {
        setElementTop(
          element.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset,
        );
        setClientHeight(window.innerHeight);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + offset],
    [0, -offset],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default ParallaxScroll;
