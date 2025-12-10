  import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import leftLogo from "../assets/leftLogo.png";
import rightLogo from "../assets/rightlogo.png";
import resumePdf from "../assets/karan-resume.pdf";

// 👉 YOUR DETAILS
const CONTACT_EMAIL = "shekhawatk271@gmail.com";
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/karan-shekhawat-93b91723a/",
  github: "https://github.com/k0-123",
  x: "https://x.com/karandebugg",
};

const NAV_ITEMS = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "work", label: "Work", path: "/work" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "resume", label: "Resume", file: resumePdf }, // used only in search
  { key: "book", label: "Book a Call" }, // NO ROUTING
];

const PADDING = 5;
const GLOW_WIDTH = 40;
const GLOW_HEIGHT = 5;

export default function PillNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const bookBubbleRef = useRef(null);
  const activeBubbleRef = useRef(null);
  const glowRef = useRef(null);
  const buttonRefs = useRef({});

  const currentPage = () => {
    if (location.pathname === "/") return "home";
    return location.pathname.replace("/", "");
  };

  const [activeKey, setActiveKey] = useState(currentPage());

  // bottom sheet state
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // sheet tabs: "quick" | "form"
  const [sheetTab, setSheetTab] = useState("quick");

  // form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  // Search overlay state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const setButtonRef = (key) => (el) => {
    if (el) {
      buttonRefs.current[key] = el;
    }
  };

  // permanent bubble under Book a Call
  const positionBookBubble = () => {
    const nav = navRef.current;
    const bookBtn = buttonRefs.current["book"];
    const bookBubble = bookBubbleRef.current;
    if (!nav || !bookBtn || !bookBubble) return;

    const navRect = nav.getBoundingClientRect();
    const r = bookBtn.getBoundingClientRect();

    const width = r.width + PADDING * 2;
    const height = r.height + PADDING * 2;
    const left = r.left - navRect.left - PADDING;
    const top = r.top - navRect.top - PADDING;

    bookBubble.style.width = `${width}px`;
    bookBubble.style.height = `${height}px`;
    bookBubble.style.left = `${left}px`;
    bookBubble.style.top = `${top}px`;
  };

  // moving bubble and top glow
  const moveActiveBubbleAndGlow = () => {
    const key = activeKey;
    const nav = navRef.current;
    const activeBubble = activeBubbleRef.current;
    const glow = glowRef.current;
    const btn = buttonRefs.current[key];
    if (!nav || !activeBubble || !glow || !btn) return;

    const navRect = nav.getBoundingClientRect();
    const r = btn.getBoundingClientRect();

    if (key === "book") {
      activeBubble.style.opacity = "0";
      glow.style.opacity = "0";
      return;
    }

    const width = r.width + PADDING * 2;
    const height = r.height + PADDING * 2;
    const left = r.left - navRect.left - PADDING;
    const top = r.top - navRect.top - PADDING;

    activeBubble.style.opacity = "1";
    activeBubble.style.width = `${width}px`;
    activeBubble.style.height = `${height}px`;
    activeBubble.style.left = `${left}px`;
    activeBubble.style.top = `${top}px`;

    const centerX = r.left - navRect.left + r.width / 2;
    const glowLeft = centerX - GLOW_WIDTH / 2;
    const glowTop = -1;

    glow.style.opacity = "1";
    glow.style.width = `${GLOW_WIDTH}px`;
    glow.style.height = `${GLOW_HEIGHT}px`;
    glow.style.left = `${glowLeft}px`;
    glow.style.top = `${glowTop}px`;
  };

  useEffect(() => {
    const updateLayout = () => {
      positionBookBubble();
      moveActiveBubbleAndGlow();
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  useEffect(() => {
    setActiveKey(currentPage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // close search on ESC
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSearchOpen]);

  // filter nav items for search
  const filteredNav = NAV_ITEMS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      (item.key && item.key.toLowerCase().includes(q))
    );
  });

  // ====== handlers ======
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submit:", { formName, formEmail, formMessage });
    alert("Message sent! (demo only)");
    setFormName("");
    setFormEmail("");
    setFormMessage("");
  };

  return (
    <>
      {/* ====== STYLES ====== */}
      <style>{`
  .page-wrap{
    position: fixed;
    top: 20px;
    left: 0;
    width: 100%;
    display:flex;
    justify-content:center;
    background:transparent;
    z-index: 999;
    pointer-events:none;
  }
  .page-wrap > * {
    pointer-events:auto;
  }

  .pill-navbar{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:6px;

  /* ↓ NEW HEIGHT SETTINGS ↓ */
  min-height:48px;
  padding:8px 14px;

  width:100%;
  max-width:480px;
  border-radius:999px;
  background:
    radial-gradient(circle at 35% -20%, rgba(255,255,255,0.10), rgba(255,255,255,0.02)),
    rgba(20,20,24,0.72);
  border:1px solid rgba(255,255,255,0.08);
  box-shadow:0 12px 40px rgba(0,0,0,0.75);
  backdrop-filter:blur(16px) saturate(160%);
  overflow:hidden;
}


  .pill-btn{
    width:60px;
    height:30px;
    border-radius:999px;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.03);
    color:#ccc;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    text-decoration:none;
    transition: color .18s ease, transform .18s ease, background .18s ease;
    font-size:14px;
    white-space:nowrap;
  }

  .pill-btn:hover{
    color:#fff;
    transform:translateY(-1px);
    background:rgba(255,255,255,0.10);
  }

  .pill-btn.active{
    color:white;
  }

  .pill-btn.long{
    min-width:120px;
    font-weight:500;
    color:white;
  }

  .bubble{
    position:absolute;
    border-radius:999px;
    background:
      radial-gradient(circle at 20% 0%, rgba(255,255,255,0.18), transparent 55%),
      linear-gradient(180deg, rgba(155,140,255,0.22), rgba(99,102,241,0.14));
    box-shadow:
      0 12px 34px rgba(99,102,241,0.32),
      0 0 0 1px rgba(255,255,255,0.16) inset;
    z-index:0;
    transition: all .26s cubic-bezier(.22,.9,.25,1);
    pointer-events:none;
  }

  .top-glow{
    position:absolute;
    height:5px;
    width:40px;
    border-radius:999px;
    background:white;
    box-shadow:0 0 12px rgba(255,255,255,0.85);
    z-index:3;
    transition: all .26s cubic-bezier(.22,.9,.25,1);
    opacity:1;
    pointer-events:none;
  }

  .outer-logo-left{
    position:absolute;
    left:40px;
    top:50%;
    transform:translateY(-50%);
    height:24px;
    width:24px;
    object-fit:contain;
    cursor:pointer;
  }

  .outer-logo-right{
    position:absolute;
    right:40px;
    top:50%;
    transform:translateY(-50%);
    height:24px;
    width:24px;
    object-fit:contain;
    cursor:pointer;
    filter:drop-shadow(0 0 4px rgba(255,255,255,0.15));
  }

  /* ====== SEARCH OVERLAY ====== */
  .search-overlay{
    position:fixed;
    inset:0;
    z-index:60;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    padding-top:96px;
    padding-inline:16px;
  }

  .search-backdrop{
    position:absolute;
    inset:0;
    background:rgba(0,0,0,0.65);
    backdrop-filter:blur(6px);
  }

  .search-panel{
    position:relative;
    width:100%;
    max-width:720px;
    border-radius:28px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,0.09);
    background:
      radial-gradient(circle at 30% -20%, rgba(255,255,255,0.16), rgba(255,255,255,0.03)),
      rgba(15,15,20,0.96);
    box-shadow:0 24px 80px rgba(0,0,0,0.85);
    color:white;
  }

  .search-input-wrap{
    padding:14px 18px 10px 18px;
    border-bottom:1px solid rgba(255,255,255,0.08);
  }

  .search-input-inner{
    display:flex;
    align-items:center;
    gap:10px;
    padding:8px 12px;
    border-radius:999px;
    background:rgba(0,0,0,0.4);
    border:1px solid rgba(255,255,255,0.10);
  }

  .search-input-inner-glow{
    position:relative;
  }

  .search-input-inner-glow::after{
    content:"";
    position:absolute;
    inset:-14px;
    border-radius:999px;
    background:radial-gradient(circle at center,
        rgba(150,130,255,0.45),
        rgba(0,0,0,0)
    );
    filter:blur(28px);
    z-index:-1;
  }

  .search-input{
    flex:1;
    background:transparent;
    border:none;
    outline:none;
    color:white;
    font-size:15px;
  }

  .search-input::placeholder{
    color:rgba(200,200,200,0.6);
  }

  .search-key-hint{
    font-size:11px;
    padding:4px 6px;
    border-radius:5px;
    border:1px solid rgba(255,255,255,0.18);
    color:rgba(220,220,220,0.8);
  }

  .search-nav-title{
    padding:8px 20px 4px 20px;
    font-size:11px;
    text-transform:uppercase;
    letter-spacing:0.18em;
    color:rgba(200,200,210,0.7);
  }

  .search-list{
    max-height:260px;
    overflow-y:auto;
    padding:4px 8px 10px 8px;
  }

  .search-item{
    display:flex;
    align-items:flex-start;
    gap:10px;
    width:100%;
    padding:8px 12px;
    border-radius:16px;
    cursor:pointer;
    background:transparent;
    border:none;
    outline:none;
    text-align:left;
    color:white;
    transition:background 0.16s ease, transform 0.12s ease;
  }

  .search-item:hover{
    background:rgba(255,255,255,0.06);
    transform:translateY(-1px);
  }

  .search-item-label{
    font-size:14px;
    font-weight:500;
  }

  .search-item-desc{
    font-size:12px;
    color:rgba(210,210,220,0.75);
  }

  .search-item-pill{
    height:28px;
    width:28px;
    border-radius:999px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(255,255,255,0.08);
    font-size:14px;
  }

  .search-footer{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:8px 18px;
    border-top:1px solid rgba(255,255,255,0.08);
    font-size:11px;
    color:rgba(210,210,220,0.8);
  }

  .search-footer span{
    margin-right:10px;
  }

  /* ====== BOOK A CALL BOTTOM SHEET ====== */
  .sheet-overlay{
    position:fixed;
    inset:0;
    z-index:2000;
    display:flex;
    align-items:flex-end;
    justify-content:center;
  }

  .sheet-backdrop{
    position:absolute;
    inset:0;
    background:rgba(0,0,0,0.72);
    backdrop-filter:blur(18px);
    opacity:0;
    animation: sheetFadeIn 0.35s ease forwards;
  }

  .sheet-panel{
    position:relative;
    width:100%;
    max-width:760px;
    margin-bottom:0;
    border-radius:28px 28px 0 0;
    background:rgba(12,12,18,0.98);
    border:1px solid rgba(255,255,255,0.06);
    box-shadow:0 -6px 80px rgba(0,0,0,0.85);
    padding:28px 32px 32px 32px;
    transform:translateY(100%);
    animation: sheetSlideUp 0.35s cubic-bezier(.22,.9,.25,1) forwards;
    color:white;
  }

  .sheet-handle{
    width:82px;
    height:6px;
    border-radius:999px;
    background:rgba(255,255,255,0.22);
    margin:0 auto 22px auto;
  }

  .sheet-socials{
    display:flex;
    justify-content:center;
    gap:24px;
    align-items:center;
    font-size:18px;
    margin-bottom:26px;
    color:white;
  }

  .sheet-social-icon{
    width:34px;
    height:34px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,0.16);
    background:rgba(255,255,255,0.04);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    font-size:16px;
    transition:background 0.18s ease, transform 0.12s ease, border 0.18s ease, box-shadow 0.18s ease;
  }

  .sheet-social-icon:hover{
    background:rgba(255,255,255,0.12);
    border-color:rgba(255,255,255,0.4);
    transform:translateY(-1px);
    box-shadow:0 10px 26px rgba(0,0,0,0.7);
  }

  .sheet-tabs{
    display:flex;
    width:100%;
    margin-bottom:22px;
    background:rgba(255,255,255,0.05);
    border-radius:999px;
    padding:3px;
  }

  .sheet-tab{
    flex:1;
    text-align:center;
    padding:10px 0;
    font-size:14px;
    cursor:pointer;
    border-radius:999px;
    color:rgba(230,230,240,0.8);
    transition:background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
  }

  .sheet-tab.active{
    background:rgba(255,255,255,0.18);
    color:white;
    box-shadow:0 0 0 1px rgba(255,255,255,0.4) inset;
  }

  .sheet-row{
    display:flex;
    justify-content:space-between;
    gap:18px;
    margin-top:10px;
  }

  .sheet-card{
    flex:1;
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.08);
    padding:18px 20px;
    background:radial-gradient(circle at 0 0, rgba(255,255,255,0.08), rgba(0,0,0,0.3));
    font-size:14px;
    cursor:pointer;
    transition:background 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
  }

  .sheet-card:hover{
    background:radial-gradient(circle at 0 0, rgba(255,255,255,0.12), rgba(0,0,0,0.4));
    transform:translateY(-2px);
    box-shadow:0 18px 40px rgba(0,0,0,0.6);
  }

  .sheet-card-title{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:16px;
    font-weight:600;
    margin-bottom:4px;
  }

  .sheet-card-label{
    font-size:13px;
    opacity:0.85;
    margin-bottom:4px;
  }

  .sheet-card-desc{
    font-size:12px;
    opacity:0.75;
  }

  .sheet-footer-status{
    margin-top:26px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:8px;
    padding:9px 16px;
    border-radius:999px;
    background:rgba(0,255,120,0.12);
    border:1px solid rgba(0,255,120,0.3);
    font-size:12px;
    color:#b4ffd8;
  }

  .sheet-footer-dot{
    width:9px;
    height:9px;
    border-radius:50%;
    background:#32ff9d;
  }

  /* ---- FORM STYLES ---- */
  .sheet-form{
    margin-top:10px;
    display:flex;
    flex-direction:column;
    gap:16px;
  }

  .sheet-form-row{
    display:flex;
    gap:16px;
    flex-wrap:wrap;
  }

  .sheet-form-field{
    flex:1;
    min-width:200px;
    display:flex;
    flex-direction:column;
    gap:6px;
  }

  .sheet-field-label{
    font-size:13px;
    font-weight:500;
  }

  .sheet-input,
  .sheet-textarea{
    width:100%;
    border-radius:12px;
    border:1px solid rgba(255,255,255,0.18);
    background:rgba(0,0,0,0.45);
    padding:10px 12px;
    color:white;
    font-size:14px;
    outline:none;
    transition:border 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
  }

  .sheet-input::placeholder,
  .sheet-textarea::placeholder{
    color:rgba(200,200,210,0.6);
  }

  .sheet-input:focus,
  .sheet-textarea:focus{
    border-color:rgba(129,140,248,0.9);
    box-shadow:0 0 0 1px rgba(129,140,248,0.8);
    background:rgba(10,10,20,0.85);
  }

  .sheet-textarea{
    min-height:150px;
    resize:none;
  }

  .sheet-textarea-wrap{
    position:relative;
  }

  .sheet-char-count{
    position:absolute;
    bottom:10px;
    right:12px;
    font-size:11px;
    color:rgba(200,200,210,0.75);
  }

  .sheet-submit-btn{
    margin-top:8px;
    width:100%;
    border:none;
    outline:none;
    border-radius:16px;
    padding:12px 0;
    font-size:14px;
    font-weight:500;
    cursor:pointer;
    background:linear-gradient(90deg, #2563eb, #7c3aed);
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    box-shadow:0 16px 40px rgba(37,99,235,0.45);
    transition:transform 0.12s ease, box-shadow 0.16s ease, filter 0.16s ease;
  }

  .sheet-submit-btn:hover{
    transform:translateY(-1px);
    filter:brightness(1.05);
    box-shadow:0 20px 52px rgba(37,99,235,0.6);
  }

  .sheet-submit-btn-icon{
    font-size:15px;
  }

  @keyframes sheetSlideUp{
    from { transform:translateY(100%); }
    to   { transform:translateY(0); }
  }

  @keyframes sheetFadeIn{
    from { opacity:0; }
    to   { opacity:1; }
  }

  /* ====== RESPONSIVE ====== */
  @media (max-width: 768px) {
    .page-wrap{
      top:12px;
    }

    .pill-navbar{
      height:auto;
      padding:10px 12px;
    }

    .pill-btn{
      flex:1;
      min-width:0;
      width:auto;
      font-size:12px;
      height:32px;
      padding:0 10px;
    }

    .pill-btn.long{
      min-width:0;
      font-size:12px;
    }

    .outer-logo-left,
    .outer-logo-right{
      display:none;
    }

    .search-overlay{
      padding-top:72px;
      padding-inline:12px;
    }

    .search-panel{
      border-radius:20px;
    }

    .sheet-panel{
      border-radius:20px 20px 0 0;
      padding:20px 18px 22px 18px;
    }

    .sheet-row{
      flex-direction:column;
    }

    .sheet-form-field{
      min-width:140px;
    }
  }

      `}</style>

      {/* ====== NAVBAR ====== */}
      <div className="page-wrap">
        {/* LEFT LOGO OUTSIDE NAVBAR */}
        <img src={leftLogo} className="outer-logo-left" alt="Left Logo" />

        <div className="pill-navbar" ref={navRef}>
          <div className="bubble" ref={bookBubbleRef} />
          <div className="bubble" ref={activeBubbleRef} />
          <div className="top-glow" ref={glowRef} />

          {NAV_ITEMS.map((item) => {
            if (item.key === "book") {
              return (
                <button
                  key={item.key}
                  ref={setButtonRef(item.key)}
                  className={
                    "pill-btn long" + (activeKey === item.key ? " active" : "")
                  }
                  onClick={() => {
                    setActiveKey("book");
                    setSheetTab("quick"); // open on quick tab by default
                    setIsSheetOpen(true);
                  }}
                >
                  {item.label}
                </button>
              );
            }

            // ❗ Skip resume in navbar, only show in search
            if (item.key === "resume") return null;

            // normal route links
            return (
              <Link
                key={item.key}
                ref={setButtonRef(item.key)}
                className={
                  "pill-btn" + (activeKey === item.key ? " active" : "")
                }
                to={item.path}
                onClick={() => setActiveKey(item.key)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT LOGO -> OPEN SEARCH */}
        <img
          src={rightLogo}
          className="outer-logo-right"
          alt="Right Logo"
          onClick={() => {
            setIsSearchOpen(true);
            setSearchQuery("");
          }}
        />
      </div>

      {/* ====== SEARCH OVERLAY ====== */}
      {isSearchOpen && (
        <div
          className="search-overlay"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div className="search-backdrop" />

          <div
            className="search-panel"
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            {/* top search input */}
            <div className="search-input-wrap">
              <div className="search-input-inner search-input-inner-glow">
                <span role="img" aria-label="Search">
                  🔍
                </span>
                <input
                  className="search-input"
                  placeholder="Search navigation…"
                  value={searchQuery}
                  autoFocus
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="search-key-hint">esc</span>
              </div>
            </div>

            {/* navigation list */}
            <div className="search-nav-title">Navigation</div>
            <div className="search-list">
              {filteredNav.length === 0 && (
                <div
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "rgba(215,215,225,0.9)",
                  }}
                >
                  No results. Try “Home”, “Work” or “Blog”.
                </div>
              )}

              {filteredNav.map((item) => {
                if (item.key === "book") {
                  return (
                    <button
                      key={item.key}
                      className="search-item"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveKey("book");
                        setSheetTab("quick");
                        setIsSheetOpen(true);
                      }}
                    >
                      <div className="search-item-pill">📅</div>
                      <div>
                        <div className="search-item-label">{item.label}</div>
                        <div className="search-item-desc">
                          Schedule a call with me.
                        </div>
                      </div>
                    </button>
                  );
                }

                // ⭐ Resume: download in search
                if (item.key === "resume") {
                  return (
                    <a
                      key={item.key}
                      href={item.file}
                      download
                      className="search-item"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveKey(item.key);
                      }}
                    >
                      <div className="search-item-pill">📄</div>
                      <div>
                        <div className="search-item-label">{item.label}</div>
                        <div className="search-item-desc">
                          Download my latest resume.
                        </div>
                      </div>
                    </a>
                  );
                }

                // normal navigation items
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    className="search-item"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveKey(item.key);
                    }}
                  >
                    <div className="search-item-pill">
                      {item.key === "home"
                        ? "🏠"
                        : item.key === "about"
                        ? "👤"
                        : item.key === "work"
                        ? "💼"
                        : item.key === "blog"
                        ? "📝"
                        : "✨"}
                    </div>
                    <div>
                      <div className="search-item-label">{item.label}</div>
                      <div className="search-item-desc">
                        Go to {item.label.toLowerCase()} section.
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* footer hints */}
            <div className="search-footer">
              <div>
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== BOOK A CALL BOTTOM SHEET ====== */}
      {isSheetOpen && (
        <div
          className="sheet-overlay"
          onClick={() => setIsSheetOpen(false)}
        >
          <div className="sheet-backdrop" />

          <div
            className="sheet-panel"
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            <div className="sheet-handle" />

            {/* socials row with real links */}
            <div className="sheet-socials">
              <button
                className="sheet-social-icon"
                onClick={() => openInNewTab(SOCIAL_LINKS.linkedin)}
                aria-label="LinkedIn"
              >
                in
              </button>
              <button
                className="sheet-social-icon"
                onClick={() => openInNewTab(SOCIAL_LINKS.github)}
                aria-label="GitHub"
              >
                🐱
              </button>
              <button
                className="sheet-social-icon"
                onClick={() => openInNewTab(SOCIAL_LINKS.x)}
                aria-label="X"
              >
                𝕏
              </button>
            </div>

            {/* tabs */}
            <div className="sheet-tabs">
              <div
                className={
                  "sheet-tab" + (sheetTab === "quick" ? " active" : "")
                }
                onClick={() => setSheetTab("quick")}
              >
                Quick connect
              </div>
              <div
                className={
                  "sheet-tab" + (sheetTab === "form" ? " active" : "")
                }
                onClick={() => setSheetTab("form")}
              >
                Fill a form
              </div>
            </div>

            {/* TAB CONTENT */}
            {sheetTab === "quick" ? (
              <>
                {/* two cards */}
                <div className="sheet-row">
                  {/* Email card -> opens mail */}
                  <div className="sheet-card" onClick={handleEmailClick}>
                    <div className="sheet-card-title">
                      <span>📧</span>
                      <span>Email</span>
                    </div>
                    <div className="sheet-card-label">{CONTACT_EMAIL}</div>
                    <div className="sheet-card-desc">
                      Send me an email directly.
                    </div>
                  </div>

                  {/* Book a Call card -> go to /contact */}
                  <div
                    className="sheet-card"
                    onClick={() => {
                      setIsSheetOpen(false);
                      navigate("/contact");
                    }}
                  >
                    <div className="sheet-card-title">
                      <span>📅</span>
                      <span>Book a Call</span>
                    </div>
                    <div className="sheet-card-label">Schedule a time slot</div>
                    <div className="sheet-card-desc">
                      Go to the contact page to share more details.
                    </div>
                  </div>
                </div>

                {/* footer status */}
                <div className="sheet-footer-status">
                  <span className="sheet-footer-dot" />
                  <span>Currently available for new opportunities</span>
                </div>
              </>
            ) : (
              <>
                {/* FORM TAB */}
                <form className="sheet-form" onSubmit={handleFormSubmit}>
                  <div className="sheet-form-row">
                    <div className="sheet-form-field">
                      <span className="sheet-field-label">Name</span>
                      <input
                        className="sheet-input"
                        placeholder="Your name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="sheet-form-field">
                      <span className="sheet-field-label">Email</span>
                      <input
                        className="sheet-input"
                        placeholder="your.email@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sheet-form-field">
                    <span className="sheet-field-label">Message</span>
                    <div className="sheet-textarea-wrap">
                      <textarea
                        className="sheet-textarea"
                        placeholder="What would you like to discuss?"
                        maxLength={1000}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      />
                      <span className="sheet-char-count">
                        {formMessage.length}/1000
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="sheet-submit-btn">
                    <span className="sheet-submit-btn-icon">📨</span>
                    <span>Send message</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
