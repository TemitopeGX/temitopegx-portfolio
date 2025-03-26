import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom text reveal animation without SplitText plugin
export const textReveal = (element: string | Element) => {
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return;

  // Create wrapper spans for each word and character
  const text = el.textContent || "";
  const words = text.split(" ");

  el.textContent = "";

  const wordSpans = words.map((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.overflow = "hidden";

    const chars = word.split("");
    const charSpans = chars.map((char) => {
      const charSpan = document.createElement("span");
      charSpan.style.display = "inline-block";
      charSpan.textContent = char;
      return charSpan;
    });

    charSpans.forEach((span) => wordSpan.appendChild(span));
    return wordSpan;
  });

  // Add spaces between words
  wordSpans.forEach((span, i) => {
    el.appendChild(span);
    if (i < wordSpans.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  // Animate the characters
  return gsap.from(el.querySelectorAll("span span"), {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.7,
    ease: "back.out(1.7)",
  });
};

// Fade up animation with scroll trigger
export const fadeUpWithScroll = (element: string | Element) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
    },
  });
};

// Stagger children animation
export const staggerChildren = (parent: string | Element, children: string) => {
  return gsap.from(`${parent} ${children}`, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
  });
};

// Parallax effect
export const parallaxEffect = (
  element: string | Element,
  speed: number = 1
) => {
  return gsap.to(element, {
    y: () => ScrollTrigger.maxScroll(window) * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: "max",
      invalidateOnRefresh: true,
      scrub: true,
    },
  });
};

// Magnetic effect for buttons and links
export const magneticEffect = (element: HTMLElement) => {
  const bound = element.getBoundingClientRect();
  const anchorX = bound.left + bound.width / 2;
  const anchorY = bound.top + bound.height / 2;

  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const diffX = mouseX - anchorX;
    const diffY = mouseY - anchorY;

    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
    const magnetism = 0.5;

    if (distance < 100) {
      gsap.to(element, {
        x: diffX * magnetism,
        y: diffY * magnetism,
        duration: 0.3,
      });
    } else {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
      });
    }
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.3,
    });
  });
};

// Smooth scroll to section
export const smoothScrollTo = (target: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      autoKill: false,
    },
    ease: "power2.inOut",
  });
};

// Text scramble effect
export const textScramble = (element: Element, newText: string) => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const originalText = element.textContent || "";
  let frame = 0;
  let frameRequest = 0;
  let queue: { from: string; to: string; start: number; end: number }[] = [];

  const update = () => {
    let output = "";
    let complete = 0;

    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        output += chars[Math.floor(Math.random() * chars.length)];
      } else {
        output += from;
      }
    }

    element.textContent = output;

    if (complete === queue.length) {
      cancelAnimationFrame(frameRequest);
    } else {
      frameRequest = requestAnimationFrame(update);
    }
    frame++;
  };

  queue = [];
  const length = Math.max(originalText.length, newText.length);

  for (let i = 0; i < length; i++) {
    const from = originalText[i] || "";
    const to = newText[i] || "";
    const start = Math.floor(Math.random() * 40);
    const end = start + Math.floor(Math.random() * 40);
    queue.push({ from, to, start, end });
  }

  cancelAnimationFrame(frameRequest);
  frame = 0;
  update();
};

// Initialize all animations
export const initializeAnimations = () => {
  // Text reveals
  document.querySelectorAll<HTMLElement>(".text-reveal").forEach((element) => {
    textReveal(element);
  });

  // Fade ups
  document.querySelectorAll<HTMLElement>(".fade-up").forEach((element) => {
    fadeUpWithScroll(element);
  });

  // Stagger animations
  document
    .querySelectorAll<HTMLElement>("[data-stagger-parent]")
    .forEach((parent) => {
      const children = parent.getAttribute("data-stagger-children") || "*";
      staggerChildren(parent, children);
    });

  // Parallax effects
  document
    .querySelectorAll<HTMLElement>("[data-parallax]")
    .forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax") || "1");
      parallaxEffect(element, speed);
    });

  // Magnetic effects
  document
    .querySelectorAll<HTMLElement>("[data-magnetic]")
    .forEach((element) => {
      magneticEffect(element);
    });
};
