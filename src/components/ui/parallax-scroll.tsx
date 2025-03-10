import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

const ParallaxScroll = ({
  children,
  offset = 50,
  className = "",
}: ParallaxScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
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
