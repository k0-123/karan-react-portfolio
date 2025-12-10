 // src/pages/Footer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Link } from "react-router-dom";

const CIRCLE_TEXT = "OPEN TO WORK • OPEN TO WORK • OPEN TO WORK • ";

export default function Footer() {
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  const threeMountRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // ==== SCROLL REVEAL ====
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ==== THREE.JS BACKGROUND ====
  useEffect(() => {
    const mount = threeMountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2, 40, Math.PI / 6, 0.5);
    spotLight.position.set(6, 10, 10);
    scene.add(spotLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.25,
      emissive: new THREE.Color(0x111111),
      flatShading: true,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x666666,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const group = new THREE.Group();
    scene.add(group);

    // CORE SHAPE
    const coreGeo = new THREE.IcosahedronGeometry(3, 1);
    const coreMesh = new THREE.Mesh(coreGeo, material);
    group.add(coreMesh);

    // SHELL WIREFRAME
    const shellGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const shellMesh = new THREE.Mesh(shellGeo, wireMaterial);
    group.add(shellMesh);

    // FLOATING SHARDS
    const shardGeo = new THREE.TetrahedronGeometry(0.4);
    const shards = [];
    for (let i = 0; i < 40; i++) {
      const shard = new THREE.Mesh(
        shardGeo,
        new THREE.MeshStandardMaterial({
          color: 0xeeeeee,
          metalness: 0.8,
          roughness: 0.3,
        })
      );
      const radius = 6 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4;
      shard.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      group.add(shard);
      shards.push(shard);
    }

    // GSAP ANIMS
    gsap.to(coreMesh.scale, {
      x: 1.06,
      y: 1.06,
      z: 1.06,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(wireMaterial, {
      opacity: 0.25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(group.position, {
      y: 0.6,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(group.rotation, {
        y: mouse.x * 0.7,
        x: mouse.y * 0.4,
        duration: 1.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Magnet button effect
  const handleMouseMove = (e) => {
    if (!btnRef.current || window.innerWidth < 768) return;

    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const strength = 0.25;

    btnRef.current.style.transform = `
      translate(${x * strength}px, ${y * strength}px)
      scale(1.06)
    `;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0px,0px) scale(1)";
  };

  const containerState = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  const line1State = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-10";

  const line2State = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-10";

  const badgeState = visible
    ? "opacity-100 scale-100"
    : "opacity-0 scale-90";

  return (
    <footer
      ref={containerRef}
      className="footer-root relative w-full bg-black text-white overflow-hidden"
    >
      {/* THREE.JS BG */}
      <div ref={threeMountRef} className="absolute inset-0" />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/20 to-black/95 pointer-events-none" />

      {/* HERO / CTA PART */}
      <div
        className={`
          relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20
          flex flex-col items-center justify-center
          min-h-[60vh] sm:min-h-[70vh]
          transition-all duration-700 ease-out
          ${containerState}
        `}
      >
        <div className="flex flex-col items-center text-center gap-2">
          {/* LINE 1 */}
          <h2
            className={`
              text-2xl sm:text-4xl md:text-5xl lg:text-6xl
              font-semibold tracking-wide
              transition-all duration-700 ease-out transform
              ${line1State}
            `}
          >
            FROM CONCEPT TO{" "}
            <span
              className="
                font-extrabold
                bg-gradient-to-r from-white via-gray-200 to-gray-500
                bg-clip-text text-transparent
                [text-shadow:_0_0_25px_rgba(255,255,255,0.55)]
              "
            >
              CREATION
            </span>
          </h2>

          {/* LINE 2 + BADGE */}
          <div className="relative flex flex-col md:flex-row items-center justify-center -mt-1 gap-4 md:gap-0">
            <h2
              className={`
                text-2xl sm:text-4xl md:text-5xl lg:text-6xl
                font-semibold tracking-wide
                transition-all duration-700 ease-out transform
                ${line2State}
              `}
              style={{ transitionDelay: visible ? "180ms" : "0ms" }}
            >
              LET’S MAKE IT{" "}
              <span
                className="
                  font-extrabold
                  bg-gradient-to-r from-white via-gray-200 to-gray-500
                  bg-clip-text text-transparent
                  [text-shadow:_0_0_30px_rgba(255,255,255,0.75)]
                "
              >
                HAPPEN!
              </span>
            </h2>

            <div
              className={`
                badge-wrapper
                transition-all duration-700 ease-out
                ${badgeState}
              `}
              style={{
                transitionDelay: visible ? "350ms" : "0ms",
              }}
            >
              <RotatingBadge />
            </div>
          </div>

          {/* CTA BUTTON */}
<div
  className="inline-flex mt-10 sm:mt-16"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  <Link to="/contact">
    <button
      ref={btnRef}
      className="
        group
        relative inline-flex items-center gap-3
        rounded-full px-7 sm:px-8 py-2.5 sm:py-3
        border border-white/20
        bg-white/5 backdrop-blur
        text-sm md:text-base font-semibold tracking-wide
        text-white
        transition-[box-shadow,background-color,color] duration-200
        shadow-[0_0_18px_rgba(0,0,0,0.8)]
        hover:bg-white
        hover:text-black
        hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]
      "
    >
      <span>Get In Touch</span>
      <span
        className="
          flex h-7 w-7 items-center justify-center
          rounded-full
          bg-white text-black text-xs
          transition-colors duration-200
          group-hover:bg-black group-hover:text-white
        "
      >
        →
      </span>
    </button>
  </Link>
</div>

         
          {/* SUBTEXT */}
          <div className="space-y-3 max-w-xl mt-4 px-4 sm:px-0">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
              I’m available for full-time roles & freelance projects.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300">
              I build modern web applications with clean UI and seamless user
              experiences.
            </p>
          </div>
        </div>
      </div>

      {/* =======================  BOTTOM SECTION  ======================= */}
      <div className="relative z-10 bg-black border-t border-white/10">
        {/* MAIN ROW: LEFT BLOCK + COLUMNS */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 flex flex-col md:flex-row md:justify-between gap-10 sm:gap-12">
          {/* LEFT BLOCK – KS + TEXT */}
          <div className="max-w-sm md:ml-[-20px] space-y-3 text-center md:text-left mx-auto md:mx-0">
            {/* Styled KS badge */}
            <div className="inline-flex items-center gap-3">
              <div
                className="
                  w-10 h-10 sm:w-11 sm:h-11 rounded-full
                  border border-white/30
                  bg-white/5
                  flex items-center justify-center
                  text-xs sm:text-sm font-semibold tracking-tight
                  shadow-[0_0_18px_rgba(255,255,255,0.18)]
                "
              >
                KS
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-400">
                Portfolio
              </span>
            </div>

            <p className="font-semibold text-gray-100 leading-relaxed text-[14px] sm:text-[15px]">
              I&apos;m Karan — a frontend developer,
              <br className="hidden sm:block" />
              freelancer &amp; problem solver.
              <br className="hidden sm:block" />
              Thanks for checking out my site!
            </p>
          </div>

          {/* RIGHT SIDE — COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-14 text-xs sm:text-sm text-center md:text-left mx-auto md:mx-0">
            {/* GENERAL */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                General
              </h4>
              <div className="space-y-1 text-gray-200">
                <Link to="/" className="block">
                  <span className="footer-anim">Home</span>
                </Link>
                <Link to="/about" className="block">
                  <span className="footer-anim">About</span>
                </Link>
                <Link to="/work" className="block">
                  <span className="footer-anim">Projects</span>
                </Link>
                <Link to="/blog" className="block">
                  <span className="footer-anim">Blog</span>
                </Link>
              </div>
            </div>

            {/* SPECIFICS */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Specifics
              </h4>
              <div className="space-y-1 text-gray-200">
                <a href="#bucket" className="block">
                  <span className="footer-anim">Bucket List</span>
                </a>
                <a href="#uses" className="block">
                  <span className="footer-anim">Uses</span>
                </a>
                <a href="#attribution" className="block">
                  <span className="footer-anim">Attribution</span>
                </a>
              </div>
            </div>

            {/* MORE */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                More
              </h4>
              <div className="space-y-1 text-gray-200">
                <a href="#links" className="block">
                  <span className="footer-anim">Links</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LAST ROW: COPYRIGHT + POLICIES + ICONS */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-gray-400">
            <p className="text-center md:text-left leading-relaxed">
              © 2025 Karan Shekhawat. All rights reserved.
              <span className="block md:inline md:ml-8 mt-1 md:mt-0 whitespace-nowrap">
                <a href="#privacy" className="footer-anim">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="#terms" className="footer-anim">
                  Terms &amp; Conditions
                </a>
              </span>
            </p>

            <div className="flex items-center gap-2 sm:gap-3 text-sm text-white">
              <a
                href="#linkedin"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/25 flex items-center justify-center text-[11px] sm:text-xs hover:bg-white hover:text-black transition"
              >
                in
              </a>
              <a
                href="#github"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/25 flex items-center justify-center text-[11px] sm:text-xs hover:bg-white hover:text-black transition"
              >
                {"</>"}
              </a>
              <a
                href="#x"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/25 flex items-center justify-center text-[11px] sm:text-xs hover:bg-white hover:text-black transition"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* rotation + hover speed + center circle hover + link underline anim */}
      <style>{`
        /* Top fade to visually merge with previous section */
        .footer-root {
          position: relative;
        }

        .footer-root::before {
          content: "";
          position: absolute;
          top: -40px;
          left: 0;
          right: 0;
          height: 40px;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0,0,0,1),
            rgba(0,0,0,0)
          );
        }

        @keyframes spinText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .badge-spin-wrapper .spin-text {
          animation: spinText 12s linear infinite;
        }

        .badge-spin-wrapper:hover .spin-text {
          animation: spinText 3s linear infinite;
        }

        .badge-spin-wrapper:hover .center-dot {
          background-color: #22c55e;
          color: white;
          border-color: rgba(255,255,255,0.6);
          box-shadow: 0 0 10px rgba(34,197,94,0.55);
        }

        /* Rotating badge positioning: mobile stacked, desktop absolute */
        .badge-wrapper {
          position: static;
          margin-left: 0;
          margin-top: 0.5rem;
        }

        @media (min-width: 768px) {
          .badge-wrapper {
            position: absolute;
            right: -65px;
            top: 28px;
            margin-top: 0;
          }
        }

        .footer-anim {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color .25s ease;
        }

        .footer-anim:hover {
          color: #ffffff;
        }

        /* Underline (only under word) */
        .footer-anim::before {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          height: 1px;
          width: 0%;
          background: white;
          box-shadow: 0 0 4px rgba(255,255,255,0.65);
          transition: width .35s ease;
        }

        .footer-anim:hover::before {
          width: 100%;
        }

        /* Tiny arrow on hover */
        .footer-anim::after {
          content: "↗";
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity .25s ease, transform .25s ease;
          font-size: 0.7rem;
        }

        .footer-anim:hover::after {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </footer>
  );
}

/* ROTATING BADGE COMPONENT */
function RotatingBadge() {
  const chars = Array.from(CIRCLE_TEXT);
  const radius = 55;

  return (
    <div className="badge-spin-wrapper relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer">
      <div className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
      <div className="spin-text absolute inset-0 flex items-center justify-center">
        {chars.map((char, i) => {
          const angle = (360 / chars.length) * i;
          return (
            <span
              key={i}
              className="absolute text-[7px] sm:text-[8px] tracking-[0.2em] uppercase"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(${-angle}deg)
                `,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      <div
        className="
          center-dot
          relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black
          flex items-center justify-center
          border border-white/30
          text-[7px] sm:text-[8px] tracking-[0.15em]
          transition-all duration-300
        "
      >
        OPEN
      </div>
    </div>
  );
}
