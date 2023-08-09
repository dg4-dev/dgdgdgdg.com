import { useRef, useEffect } from "react";

interface ParallaxProps {
  factor: number; // パララックス効果の係数
  children: React.ReactNode;
}

const Parallax: React.FC<ParallaxProps> = ({ factor, children }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = parallaxRef.current;
      if (element) {
        const position = window.pageYOffset;
        const targetPosition = Math.abs(factor) * position;
        element.style.transform = `translate3d(0, ${factor > 0 ? targetPosition : -targetPosition}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [factor]); // factorを依存配列に追加

  return <div ref={parallaxRef}>{children}</div>;
};

export default Parallax;
