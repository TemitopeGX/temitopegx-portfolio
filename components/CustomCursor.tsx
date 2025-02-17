import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isMobileWidth = window.matchMedia("(max-width: 768px)").matches;

      return isTouchDevice || isMobileDevice || isMobileWidth;
    };

    setIsMobile(checkMobile());

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="cursor-none">
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          transition: "transform 0.05s linear",
        }}
      >
        <div
          className={`w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
            cursorVariant === "hover" ? "scale-125" : "scale-100"
          }`}
          style={{
            clipPath:
              "polygon(0 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 0 100%, 0 75%, 25% 75%, 25% 25%, 0 25%)",
            backgroundColor: "#39FF14", // Website's neon green
            boxShadow: "0 0 10px rgba(57, 255, 20, 0.5)",
          }}
        />
      </div>

      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-[99]"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          transition: "transform 0.08s linear",
        }}
      >
        <div
          className={`w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            cursorVariant === "hover"
              ? "scale-150 opacity-30"
              : "scale-100 opacity-50"
          }`}
          style={{
            clipPath:
              "polygon(0 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 0 100%, 0 75%, 25% 75%, 25% 25%, 0 25%)",
            backgroundColor: "#39FF14",
            filter: "blur(8px)",
          }}
        />
      </div>
    </div>
  );
}
