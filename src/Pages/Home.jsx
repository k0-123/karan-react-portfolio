 import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; // ⭐ REQUIRED
import PillNavbar from "../components/PillNavbar";
import LaserFlow from "../animations/LaserFlow";
import k from "../assets/karan.png";

export default function Home() {
  // 🔁 Greetings logic
  const greetings = ["Hello", "Bonjour", "Hola", "Ciao", "你好", "こんにち", "नमस्ते"];
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          // change greeting word
          setIndex((prev) => (prev + 1) % greetings.length);

          gsap.to(textRef.current, {
            opacity: 1,
            duration: 0.2,
          });
        },
      });
    }, 2000); // every 2s

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050010] text-white">
      {/* LASER BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[380px] sm:h-[440px] md:h-[520px] lg:h-[580px]">
          <LaserFlow
            className="w-full h-full"
            color="#9B8CFF"
            horizontalBeamOffset={0.12}
            verticalBeamOffset={-0.05}
            wispDensity={1}
            fogIntensity={0.4}
            flowStrength={0.32}
            verticalSizing={3.0}
            horizontalSizing={0.6}
            mouseSmoothTime={0.18}
            flowSpeed={0.35}
          />
        </div>

        {/* Navbar visibility gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black via-black/80 to-transparent" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-40">
        <PillNavbar />
      </div>

      {/* MAIN PANEL OVER LASER */}
      <main className="relative z-30 flex justify-center pt-40 sm:pt-48 md:pt-64 lg:pt-72 pb-10">
        <div className="w-[94%] sm:w-[90%] md:w-[86%] max-w-6xl">
          <div
            className="
              relative
              rounded-2xl sm:rounded-3xl md:rounded-[30px]
              border border-[#C08BFF]
              bg-[#070015]
              overflow-hidden
            "
          >
            {/* DOT GRID BACKGROUND */}
            <div
              className="
                w-full
                h-[420px]
                sm:h-[480px]
                md:h-[520px]
                lg:h-[560px]
              "
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(240,240,255,0.28) 1.4px, transparent 0)",
                backgroundSize: "18px 18px",
                opacity: 0.85,
              }}
            />

            {/* ⭐ CONTENT OVER GRID ⭐ */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 text-center z-10">
              <div className="max-w-4xl mx-auto space-y-7 sm:space-y-8 md:space-y-10 lg:space-y-11">
                {/* MAIN HEADING (2 LINES ONLY) */}
                <h1
                  className="
                    font-hero 
                    text-[1.9rem] sm:text-4xl md:text-5xl lg:text-6xl
                    leading-tight sm:leading-tight md:leading-[1.15]
                    font-extrabold
                    text-white tracking-tight
                    inline-block
                    whitespace-pre-line
                  "
                >
                  {`I help founders turn ideas into\nseamless digital experiences`}
                </h1>

                {/* NAME + IMAGE + ROLE */}
                <div
                  className="
                    font-bold flex items-center justify-center gap-3 sm:gap-4
                    flex-wrap text-gray-200
                    text-sm sm:text-lg md:text-2xl
                  "
                >
                  {/* 🔁 Animated HELLO */}
                  <div className="flex items-center gap-1">
                    <span
                      ref={textRef}
                      className="
                        text-purple-500 mr-1 sm:mr-2 inline-block
                        w-[90px] sm:w-[110px] md:w-[120px]
                        text-right
                        [text-shadow:_0_0_10px_rgba(168,85,247,0.8)]
                        hover:[text-shadow:_0_0_20px_rgba(168,85,247,1)]
                        transition-all duration-300
                      "
                      style={{ opacity: 1 }}
                    >
                      {greetings[index]},
                    </span>
                    <span>I&apos;m Karan Shekhawat</span>
                  </div>

                  {/* PROFILE IMAGE (YOUR ORIGINAL SIZE) */}
                  <div className="relative group inline-block">
                    <img
                      src={k}
                      alt="profile"
                      className="w-30 h-15 rounded-full object-cover border border-white/20"
                    />

                    {/* 👋 EMOJI */}
                    <span
                      className="
                        absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2
                        opacity-0 group-hover:opacity-100
                        group-hover:translate-x-2
                        transition-all duration-300
                        text-2xl sm:text-3xl
                      "
                    >
                      👋
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm md:text-base">
                    a Frontend Developer
                  </span>
                </div>

                {/* CTA + EMAIL */}
                <div
                  className="
                    flex flex-col md:flex-row
                    items-center justify-center
                    gap-4 sm:gap-5 md:gap-6
                    pt-2 sm:pt-3 md:pt-4
                  "
                >
                  {/* ⭐ CONNECT BUTTON → CONTACT PAGE ⭐ */}
                  <Link to="/contact">
                    <button
                      className="
                        px-7 sm:px-8 py-2.5 sm:py-3 rounded-full 
                        bg-white text-black font-medium text-sm sm:text-base
                        hover:bg-purple-600 hover:text-white
                        hover:scale-110 active:scale-95
                        hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]
                        transition-all duration-300
                      "
                    >
                      Let’s Connect
                    </button>
                  </Link>

                  {/* EMAIL */}
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base flex-wrap justify-center">
                    <span>📩</span>
                    <span className="break-all">
                      hello@karanshekhawat.in
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BORDER TOP GLOW ONLY */}
            <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-[60%] -translate-x-1/2">
              <div
                style={{
                  background:
                    "radial-gradient(circle at 50% 100%, rgba(192,139,255,0.6), rgba(192,139,255,0) 70%)",
                  filter: "blur(8px)",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
