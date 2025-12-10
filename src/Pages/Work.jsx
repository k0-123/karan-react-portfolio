 // src/pages/Work.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import k1 from "../assets/k721.png";
import k2 from "../assets/k722.png";
import Footer from "../Pages/Footer.jsx";

// ⭐ video assets
import k72v1 from "../assets/k72v1.mp4";
import k72v2 from "../assets/k72v2.mp4";

export default function Work() {
  const [showVideo, setShowVideo] = useState(false);
  const [showVideo2, setShowVideo2] = useState(false);

  const [activeCase, setActiveCase] = useState("next");

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const loadingRef = useRef(null);

  const openGitHub = () => {
    window.open("https://github.com/k0-123", "_blank");
  };

  // Magnetic "Loading more..." handlers
  const handleMagnetMove = (e) => {
    const el = loadingRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 10;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 10;

    el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  };

  const handleMagnetLeave = () => {
    const el = loadingRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px) scale(1)";
  };

  useEffect(() => {
    const options = { root: null, threshold: 0.5 };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === card1Ref.current) {
          setActiveCase("next");
        }

        if (entry.target === card2Ref.current) {
          setActiveCase("obys");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);

    return () => {
      if (card1Ref.current) observer.unobserve(card1Ref.current);
      if (card2Ref.current) observer.unobserve(card2Ref.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top heading */}
          <div className="mb-12">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-300/70">
              Featured case studies
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold">
              Curated <span className="text-cyan-300">work</span>
            </h2>
          </div>

          {/* MAIN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* LEFT COLUMN */}
            <div className="w-full lg:w-[60%] space-y-20">
              {/* CARD 1 */}
              <div ref={card1Ref}>
                <div
                  className="
                    relative rounded-[34px] overflow-hidden
                    bg-[#00C6FF]
                    shadow-[0_0_80px_rgba(0,198,255,0.45)]
                    border border-cyan-300/25
                    group min-h-[360px]
                  "
                >
                  {!showVideo && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="
                        absolute top-4 right-4 z-30
                        w-9 h-9 flex items-center justify-center
                        rounded-full
                        bg-black/80 border border-white/30
                        hover:bg-black hover:border-white/60
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    >
                      <FaPlay className="text-[10px]" />
                    </button>
                  )}
                  {showVideo && (
                    <button
                      onClick={() => setShowVideo(false)}
                      className="
                        absolute top-4 right-4 z-30
                        w-8 h-8 flex items-center justify-center
                        rounded-full
                        bg-white/10 border border-white/40
                        hover:bg-white/20 hover:border-white/70
                      "
                    >
                      ✕
                    </button>
                  )}

                  {/* IMAGE MODE */}
                  {!showVideo && (
                    <div className="relative px-8 md:px-10 pt-12 pb-7">
                      {/* IMAGE CLICK => GITHUB */}
                      <div
                        onClick={openGitHub}
                        className="
                          cursor-pointer mt-10 relative
                          h-[280px] md:h-[340px]
                          rounded-3xl overflow-hidden
                          bg-black/20 border-[1px]
                          border-white/20 backdrop-blur-sm
                          shadow-[inset_0_0_12px_rgba(255,255,255,0.08)]
                        "
                      >
                        <img
                          src={k1}
                          className="
                            absolute inset-0 w-full h-full object-cover
                            transition-all duration-500 ease-out
                            group-hover:scale-[1.03] group-hover:-rotate-1 group-hover:opacity-80
                          "
                          alt="Next Ventures mockup 1"
                        />
                        <img
                          src={k2}
                          className="
                            absolute inset-0 w-full h-full object-cover
                            opacity-0 translate-y-6 translate-x-4
                            transition-all duration-600 ease-out
                            group-hover:opacity-100 group-hover:translate-y-0
                            group-hover:translate-x-0 group-hover:rotate-1
                          "
                          alt="Next Ventures mockup 2"
                        />
                      </div>
                    </div>
                  )}

                  {/* VIDEO MODE – CARD 1 */}
                  {showVideo && (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={k72v1}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                </div>
              </div>

              {/* CARD 2 */}
              <div ref={card2Ref}>
                <div
                  className="
                    relative rounded-[34px] overflow-hidden
                    bg-gradient-to-br from-[#FF4BA3] via-[#FF6FD8] to-[#FFC1F3]
                    shadow-[0_0_90px_rgba(255,111,216,0.55)]
                    border border-pink-300/40
                    group min-h-[360px]
                  "
                >
                  {!showVideo2 && (
                    <button
                      onClick={() => setShowVideo2(true)}
                      className="
                        absolute top-4 right-4 z-30
                        w-9 h-9 flex items-center justify-center
                        rounded-full
                        bg-black/80 border border-white/30
                        hover:bg-black hover:border-white/60
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    >
                      <FaPlay className="text-[10px]" />
                    </button>
                  )}
                  {showVideo2 && (
                    <button
                      onClick={() => setShowVideo2(false)}
                      className="
                        absolute top-4 right-4 z-30
                        w-8 h-8 flex items-center justify-center
                        rounded-full
                        bg-white/10 border border-white/40
                        hover:bg-white/20 hover:border-white/70
                      "
                    >
                      ✕
                    </button>
                  )}

                  {/* IMAGE MODE */}
                  {!showVideo2 && (
                    <div className="relative px-8 md:px-10 pt-12 pb-7">
                      {/* IMAGE CLICK => GITHUB */}
                      <div
                        onClick={openGitHub}
                        className="
                          cursor-pointer mt-10 relative
                          h-[280px] md:h-[340px]
                          rounded-3xl overflow-hidden
                          bg-black/10 border-[1px]
                          border-white/25 backdrop-blur-sm
                          shadow-[inset_0_0_18px_rgba(255,255,255,0.18)]
                        "
                      >
                        <img
                          src={k1}
                          className="
                            absolute inset-0 w-full h-full object-cover
                            transition-all duration-500 ease-out
                            group-hover:scale-[1.04] group-hover:-rotate-1 group-hover:opacity-85
                          "
                          alt="Obys mockup 1"
                        />
                        <img
                          src={k2}
                          className="
                            absolute inset-0 w-full h-full object-cover
                            opacity-0 translate-y-7 translate-x-5
                            transition-all duration-600 ease-out
                            group-hover:opacity-100 group-hover:translate-y-0
                            group-hover:translate-x-0 group-hover:rotate-1
                          "
                          alt="Obys mockup 2"
                        />
                      </div>
                    </div>
                  )}

                  {/* VIDEO MODE – CARD 2 */}
                  {showVideo2 && (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={k72v2}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                </div>
              </div>
            </div>

            {/* =================== RIGHT STICKY TEXT =================== */}
            <div className="w-full lg:w-[40%] lg:sticky lg:top-28 space-y-8">
              {activeCase === "next" && (
                <>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Next Ventures
                  </h3>

                  <p className="text-white/80 leading-[1.8] text-[15px] md:text-[16px]">
                    Next Ventures helps early–stage founders validate ideas before
                    scaling. Designed with clarity, fast reading hierarchy, scroll
                    storytelling, and zero visual clutter so ideas feel serious but still
                    approachable.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-3">
                    {[
                      "Next.js",
                      "React",
                      "Sanity CMS",
                      "TypeScript",
                      "Better Auth",
                      "GROQ",
                      "Markdown",
                      "Tailwind CSS",
                      "Motion.dev",
                    ].map((item, i) => (
                      <span
                        key={i}
                        className="
                          px-4 py-2 rounded-xl bg-white/5 border border-white/10
                          text-xs md:text-sm text-cyan-300/80
                          tracking-wide transition-transform duration-300 ease-out
                          hover:-translate-y-1 hover:scale-[1.03]
                          hover:border-cyan-300/70 hover:bg-cyan-300/10
                          hover:shadow-[0_0_18px_rgba(34,211,238,0.55)]
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {activeCase === "obys" && (
                <>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
                      Obys Agency
                    </span>
                  </h3>

                  <p className="text-white/80 leading-[1.8] text-[15px] md:text-[16px]">
                    A concept inspired by cinematic motion, layered grids, strong
                    editorial typography, and immersive scroll-based narration to make
                    the portfolio feel like a sequence of crafted scenes.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-3">
                    {[
                      "Next.js",
                      "React",
                      "GSAP",
                      "Lenis Scroll",
                      "Framer Motion",
                      "Three.js",
                      "Tailwind CSS",
                      "Design Systems",
                    ].map((item, i) => (
                      <span
                        key={i}
                        className="
                          px-4 py-2 rounded-xl bg-white/5 border border-white/10
                          text-xs md:text-sm text-pink-300/85
                          tracking-wide transition-transform duration-300 ease-out
                          hover:-translate-y-1 hover:scale-[1.03]
                          hover:border-pink-300/80 hover:bg-pink-300/10
                          hover:shadow-[0_0_20px_rgba(244,114,182,0.55)]
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========= MAGNETIC LOADING TEXT ========= */}
      <div
        className="w-full bg-black pb-20 flex justify-center"
        onMouseMove={handleMagnetMove}
        onMouseLeave={handleMagnetLeave}
      >
        <div
          ref={loadingRef}
          className="
            text-4xl md:text-6xl lg:text-7xl
            uppercase tracking-[0.20em]
            text-white
            transition-transform duration-300 ease-out
            animate-pulse
          "
          style={{
            textShadow:
              "0 0 12px rgba(255,255,255,0.90), 0 0 30px rgba(255,255,255,0.60)",
            fontWeight: 700,
          }}
        >
          Loading more...
        </div>
      </div>

      {/* ================== FOOTER ================== */}
      <Footer />
    </>
  );
}
