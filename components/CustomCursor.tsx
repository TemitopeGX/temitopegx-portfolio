import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // More comprehensive mobile detection
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      const isMobileWidth = window.matchMedia("(max-width: 768px)").matches;

      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      return (
        isTouchDevice || isMobileDevice || isMobileWidth || hasCoarsePointer
      );
    };

    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      if (mobile) {
        document.documentElement.classList.remove("cursor-none");
      } else {
        document.documentElement.classList.add("cursor-none");
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Only add mouse events if not mobile
    if (!checkMobile()) {
      const handleMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        });
      };

      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => setCursorVariant("hover"));
        element.addEventListener("mouseleave", () =>
          setCursorVariant("default")
        );
      });

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseenter", () =>
            setCursorVariant("hover")
          );
          element.removeEventListener("mouseleave", () =>
            setCursorVariant("default")
          );
        });
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return null for mobile devices
  if (isMobile) {
    return null;
  }

  // Desktop version
  return (
    <div className="desktop-only-cursor fixed inset-0 pointer-events-none z-[9999]">
      {/* Diamond Cursor */}
      <div
        className="fixed pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${
            mousePosition.y
          }px, 0) translate(-50%, -50%) rotate(45deg) scale(${
            cursorVariant === "hover" ? 1.5 : 1
          })`,
          transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="w-4 h-4 bg-black" />
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed pointer-events-none z-[99] will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
          transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className={`w-[200px] h-[200px] rounded-full bg-gradient-to-r from-black/20 to-black/20 blur-2xl transition-transform duration-200 ease-out ${
            cursorVariant === "hover" ? "scale-125" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
}
