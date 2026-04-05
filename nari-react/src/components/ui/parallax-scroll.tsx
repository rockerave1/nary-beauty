import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const MobileGallery = ({ images }: { images: string[] }) => {
  const half = Math.ceil(images.length / 2);
  const leftImages = images.slice(0, half);
  const rightImages = images.slice(half);

  // Triple for seamless loop — ensures no gap at the seam
  const leftTripled = [...leftImages, ...leftImages, ...leftImages];
  const rightTripled = [...rightImages, ...rightImages, ...rightImages];

  return (
    <div
      className="flex gap-3 h-[70vh] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/* Left column — scrolls down */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex flex-col gap-3"
          style={{
            animation: "gallery-scroll-down 30s linear infinite",
            willChange: "transform",
          }}
        >
          {leftTripled.map((el, idx) => (
            <img
              key={`left-${idx}`}
              src={el}
              className="w-full h-52 object-cover rounded-lg flex-shrink-0"
              alt="Gallery"
            />
          ))}
        </div>
      </div>

      {/* Right column — scrolls up */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex flex-col gap-3"
          style={{
            animation: "gallery-scroll-up 30s linear infinite",
            willChange: "transform",
          }}
        >
          {rightTripled.map((el, idx) => (
            <img
              key={`right-${idx}`}
              src={el}
              className="w-full h-52 object-cover rounded-lg flex-shrink-0"
              alt="Gallery"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -8]);

  const translateYSecond = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotateThird = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  if (isMobile) {
    return <MobileGallery images={images} />;
  }

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
