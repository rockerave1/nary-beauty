import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Column 1 — moves up-left with rotation
  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -8]);

  // Column 2 — moves up slowly (gives depth contrast)
  const translateYSecond = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Column 3 — moves up-right with rotation
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
