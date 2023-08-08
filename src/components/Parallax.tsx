import { useRef, useEffect } from "react";

interface ParallaxProps {
  factor: number; // パララックス効果の係数
  children: React.ReactNode;
}

const Parallax: React.FC<ParallaxProps> = ({ factor, children }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const element = parallaxRef.current;
    if (element) {
      const position = window.pageYOffset;
      const targetPosition = position * factor;
      element.style.transform = `translate3d(0, ${targetPosition}px, 0)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={parallaxRef}>{children}</div>;
};

export default Parallax;
