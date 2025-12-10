  // src/pages/Above.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import krn1 from "../assets/krn1.png";
import krn2 from "../assets/krn2.png";
import krn3 from "../assets/krn3.png";
import karan from "../assets/karan.png";
import Footer from "./Footer"; // ✅ added

// ================== EXPERIENCE DATA ==================
const experiences = [
  {
    id: 1,
    period: "Aug 2024 – Oct 2024",
    company: "Precise Automation & Robotics",
    title: "SDE Intern",
    description:
      "Worked as a front-end engineering intern, focusing on UI performance, reusability and animation-heavy interfaces.",
    highlights: [
      "Worked on front-end modules and contributed to optimizing UI performance, component reusability, and animation logic.",
      "Built responsive layouts in React and TailwindCSS with reusable components that were easy to plug into different product screens.",
      "Implemented motion-driven experiences using GSAP for smooth scroll-triggered animations, micro-interactions, and transitions.",
      "Improved real-time UI responsiveness through query caching, memoization, and strategic code-splitting to reduce bundle size.",
    ],
    tech: ["React", "Tailwind CSS", "GSAP", "TypeScript", "Vite"],
  },
  {
    id: 2,
    period: "Present",
    company: "Personal Projects & Freelance",
    title: "Frontend Developer",
    description:
      "Developing portfolio-ready web animations and agency-grade UI clones.",
    highlights: [
      "Cloned high-end agency websites to understand real-world layouts, typography systems, and scroll experiences.",
      "Experimented with modern tooling like TypeScript, React Router, and component libraries to create scalable front-end architecture.",
      "Focused on writing clean, maintainable code and reusable UI patterns that can be adapted across different projects.",
    ],
    tech: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Shadcn/UI"],
  },
];

export default function Above() {
  // ===== ABOUT SECTION – IMAGES CAROUSEL =====
  const images = [krn1, krn2, krn3];
  const captions = ["I code", "I ride", "I travel"];

  const [activeIndex, setActiveIndex] = useState(0);

  // 🔁 Auto-rotate images: back ones come to front
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(id);
  }, [images.length]);

  // Order: center (front), then right, then left
  const orderedIndices = [
    activeIndex,
    (activeIndex + 1) % images.length,
    (activeIndex + 2) % images.length,
  ];

  const positionConfigs = [
    {
      // FRONT (center)
      translateX: "0%",
      rotate: 0,
      scale: 1,
      zIndex: 30,
      opacity: 1,
    },
    {
      // RIGHT (behind)
      translateX: "24%",
      rotate: 10,
      scale: 0.92,
      zIndex: 20,
      opacity: 0.85,
    },
    {
      // LEFT (behind)
      translateX: "-24%",
      rotate: -10,
      scale: 0.92,
      zIndex: 10,
      opacity: 0.85,
    },
  ];

  // ===== WORK SECTION – SCROLL PROGRESS LOGIC =====
  const secondPageRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → top, 1 → bottom

  // Scroll Detector – Karan moves with scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!secondPageRef.current) return;

      const section = secondPageRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      let t = 0;

      // before section
      if (scrollY <= sectionTop) {
        t = 0;
      }
      // after section end
      else if (scrollY >= sectionTop + sectionHeight) {
        t = 1;
      }
      // inside section
      else {
        const distanceInto = scrollY - sectionTop;
        t = distanceInto / sectionHeight;
      }

      // clamp 0..1
      if (t < 0) t = 0;
      if (t > 1) t = 1;

      setProgress(t);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Make line + avatar a bit ahead so they never feel behind your scroll
  const fillHeight = Math.min(100, progress * 115); // 15% ahead
  const avatarTop = Math.min(100, progress * 125); // 25% ahead

  return (
    <>
      {/* ================== ABOUT SECTION ================== */}
      <section className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT SIDE – TEXT + STRIPED GLOW BAR */}
          <div className="w-full lg:w-1/2 relative pl-10 sm:pl-14">
            {/* STRIPED GLOW BAR */}
            <div className="pointer-events-none absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 h-[300%] flex items-center z-[30]">
              <div className="relative w-[48px] sm:w-[40px] h-full rounded-xl overflow-hidden bg-[#070707] shadow-[0_0_120px_60px_rgba(0,0,0,0.95)] ">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.16)_0%,transparent_70%)] opacity-70 blur-[6px]" />
                <div className="absolute inset-0 opacity-80 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_1px,transparent_1px,transparent_5px)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
              </div>
            </div>

            <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-5">
              More about me
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              I'm <span className="font-semibold">Karan,</span> a{" "}
              <span
                className="
                  font-extrabold whitespace-nowrap
                  bg-clip-text text-transparent
                  bg-[linear-gradient(90deg,#ec4899,#f97316,#ec4899)]
                  bg-[length:300%_300%]
                  animate-[flowingGradient_6s_ease-in-out_infinite]
                "
              >
                creative engineer
              </span>
            </h1>

            {/* ABOUT PARAGRAPHS */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              <p>
                I'm Karan Shekhawat, a frontend developer focused on crafting
                smooth, modern web experiences. I love building interfaces that
                feel fast, intentional, and just a little bit unexpected.
              </p>
              <p>
                From layouts and animations to clean, reusable components, I
                enjoy solving problems with thoughtful design and efficient
                code. I'm constantly learning new tools and patterns to level up
                my work.
              </p>
              <p>
                When I'm not coding, I'm exploring new ideas, improving my
                craft, and working on becoming the best version of myself—both
                in tech and in life.
              </p>
              <p>
                I believe in waking up each day hungry to build something
                better.
              </p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-8 flex items-center gap-4 text-neutral-300">
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-700 hover:border-pink-500 hover:text-pink-400 transition"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-700 hover:border-pink-500 hover:text-pink-400 transition"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-700 hover:border-pink-500 hover:text-pink-400 transition"
              >
                <FaTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE – ANIMATED STACKED IMAGES + CAPTION */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
            <div className="relative w-[260px] sm:w-[280px] h-[360px] sm:h-[380px] select-none group">
              {/* Soft BG glows */}
              <div className="absolute -right-5 top-6 w-[68%] h-[82%] rounded-3xl bg-[radial-gradient(circle_at_top,_#222,_#050505)] opacity-60 blur-[1px]" />
              <div className="absolute -left-6 bottom-4 w-[68%] h-[82%] rounded-3xl bg-[radial-gradient(circle_at_top,_#333,_#050505)] opacity-80 grayscale" />

              {/* STACKED CARDS – animated positions */}
              {positionConfigs.map((cfg, positionIndex) => {
                const imageIndex = orderedIndices[positionIndex];
                const src = images[imageIndex];

                return (
                  <div
                    key={imageIndex}
                    className="
                      absolute inset-x-7 top-0 bottom-4
                      rounded-3xl overflow-hidden
                      border border-neutral-700 bg-neutral-900
                      shadow-[0_22px_60px_rgba(0,0,0,0.85)]
                      transition-all duration-700 ease-out
                    "
                    style={{
                      transform: `translateX(${cfg.translateX}) rotate(${cfg.rotate}deg) scale(${cfg.scale})`,
                      zIndex: cfg.zIndex,
                      opacity: cfg.opacity,
                    }}
                  >
                    <img
                      src={src}
                      alt="Karan portrait"
                      className="w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                );
              })}

              {/* FOCUS L-LINES ON HOVER (original style) */}
              <div className="pointer-events-none absolute inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                {/* Top-left L */}
                <div className="absolute left-0 top-0 w-6 h-6 border-l border-t border-pink-500/80 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 -translate-x-2 -translate-y-2" />
                {/* Top-right reverse L */}
                <div className="absolute right-0 top-0 w-6 h-6 border-r border-t border-orange-400/80 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 translate-x-2 -translate-y-2" />
                {/* Bottom-left downward L */}
                <div className="absolute left-0 bottom-0 w-6 h-6 border-l border-b border-pink-500/80 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 -translate-x-2 translate-y-2" />
                {/* Bottom-right reverse downward L */}
                <div className="absolute right-0 bottom-0 w-6 h-6 border-r border-b border-orange-400/80 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 translate-x-2 translate-y-2" />
              </div>
            </div>

            {/* DYNAMIC CAPTION UNDER IMAGES */}
            <p
              key={activeIndex}
              className="
                text-sm sm:text-base tracking-[0.2em] uppercase
                text-neutral-300
                flex items-center gap-2
                transition-opacity duration-300 ease-out
                animate-fadeInCaption
              "
            >
              <span className="inline-block h-[1px] w-6 bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500" />
              {captions[activeIndex]}
            </p>
          </div>
        </div>
      </section>

      {/* ================== WORK / EXPERIENCE SECTION ================== */}
      <section className="w-full bg-black text-white overflow-hidden">
        {/* ❌ PAGE 1 – BIG HEY REMOVED */}

        {/* PAGE 2 – WORK SECTION */}
        <div
          ref={secondPageRef}
          className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-28"
        >
          {/* TITLE */}
          <h2 className="text-4xl lg:text-5xl font-semibold text-center">
            <span className="block">Experience That Brings</span>
            <span
              className="
                block mt-2
                text-transparent bg-clip-text
                bg-[linear-gradient(90deg,#f37316,#ec4899)]
              "
            >
              Ideas to Life
            </span>
          </h2>

          {/* TIMELINE LAYOUT */}
          <div className="mt-20 grid grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.4fr)] gap-10 lg:gap-14">
            {/* LEFT COLUMN – period + company */}
            <div className="space-y-83">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-1">
                    {exp.period}
                  </p>
                  <h3 className="text-lg font-medium">{exp.company}</h3>
                </div>
              ))}
            </div>

            {/* CENTER COLUMN – vertical line + avatar */}
            <div className="relative flex justify-center">
              <div className="relative h-full min-h-[700px] w-[4px]">
                {/* base line */}
                <div className="absolute inset-0 bg-neutral-800 rounded-full" />

                {/* gradient fill */}
                <div
                  className="absolute left-0 top-0 w-full rounded-full bg-[linear-gradient(to_bottom,#3b82f6,#ec4899,#f97316)]"
                  style={{ height: `${fillHeight}%` }}
                />

                {/* avatar */}
                <div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: `${avatarTop}%` }}
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[2px] border-white/90 shadow-[0_0_22px_rgba(255,255,255,0.95)]" />
                    <div className="relative w-11 h-11 rounded-full overflow-hidden">
                      <img
                        src={karan}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – title + description + tech */}
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  {/* invisible period just to align with left side */}
                  <p className="text-[11px] uppercase tracking-[0.22em] text-transparent mb-1">
                    {exp.period}
                  </p>

                  <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>

                  {/* ✅ SAME FONT STYLE AS ABOUT PARAGRAPHS */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-neutral-300 leading-relaxed mb-3">
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  {/* ⭐ ANIMATED TECH BADGES */}
                  <div className="flex flex-wrap gap-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="
                          px-4 py-[6px] text-[11px]
                          rounded-full border border-neutral-700
                          bg-black/50 text-neutral-200
                          transition-all duration-200 cursor-pointer
                          hover:border-pink-500 hover:text-white
                          hover:scale-[1.08]
                          hover:shadow-[0_0_15px_rgba(236,72,153,0.8)]
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================== FOOTER ================== */}
      <Footer />
    </>
  );
}
