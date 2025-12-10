 // src/components/GhostCursor.jsx
import { useRef, useEffect } from "react";

const TRAIL_COUNT = 8; // more trails = longer ghost tail

export default function GhostCursor() {
  const mainCursorRef = useRef(null);
  const trailRefs = useRef([]);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const trails = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }))
  );

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMove);

    let frameId;
    const animate = () => {
      const baseSpeed = 0.25; // faster ghost follow

      trails.current.forEach((point, index) => {
        const leader = index === 0 ? mouse.current : trails.current[index - 1];

        const speed = baseSpeed - index * 0.035;
        point.x += (leader.x - point.x) * speed;
        point.y += (leader.y - point.y) * speed;

        const el = trailRefs.current[index];
        if (el) {
          el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        }
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* ⭐ BIG MAIN CURSOR */}
      <div
        ref={mainCursorRef}
        style={{
          position: "fixed",
          width: 18,              // ⬆ bigger
          height: 18,             // ⬆ bigger
          borderRadius: "999px",
          border: "3px solid rgba(255,255,255,0.95)",
          background: "rgba(255,255,255,0.18)",
          boxShadow: "0 0 28px rgba(255,255,255,1)", // ⬆ stronger glow
          transform: "translate3d(-50%, -50%, 0)",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />

      {/* ⭐ LARGER & MORE VISIBLE TRAILS */}
      {Array.from({ length: TRAIL_COUNT }).map((_, index) => {
        const progress = index / (TRAIL_COUNT - 1 || 1);

        const size = 45 + progress * 85;        // ⬆ bigger ghost tail
        const opacity = 0.50 - progress * 0.35; // ⬆ more visible
        const blur = 8 + progress * 16;         // ⬆ dreamy blur

        return (
          <div
            key={index}
            ref={(el) => (trailRefs.current[index] = el)}
            style={{
              position: "fixed",
              width: size,
              height: size,
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
              filter: `blur(${blur}px)`,
              opacity,
              transform: "translate3d(-50%, -50%, 0)",
              pointerEvents: "none",
              mixBlendMode: "screen",
              zIndex: 9998 - index,
            }}
          />
        );
      })}

      {/* HIDE REAL CURSOR */}
      <style>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
}
