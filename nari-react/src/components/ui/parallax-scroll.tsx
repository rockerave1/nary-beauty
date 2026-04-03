import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const ParallaxScrollSecond = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduce parallax intensity on mobile to prevent overflow
  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -80 : -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -60]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -8]);

  const translateYSecond = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -120]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotateThird = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      ref={ref}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-4 md:gap-6">
        <div className="grid gap-4 md:gap-6">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateFirst,
              }}
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-64 md:h-80 w-full object-cover rounded-lg"
                alt="Gallery"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4 md:gap-6">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateYSecond }}
              key={"grid-2" + idx}
            >
              <img
                src={el}
                className="h-64 md:h-80 w-full object-cover rounded-lg"
                alt="Gallery"
              />
            </motion.div>
          ))}
        </div>
        <div className="hidden lg:grid gap-4 md:gap-6">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateThird,
              }}
              key={"grid-3" + idx}
            >
              <img
                src={el}
                className="h-64 md:h-80 w-full object-cover rounded-lg"
                alt="Gallery"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
