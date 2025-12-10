  import React, { useState, useEffect } from "react";
  import Footer from "../Pages/Footer"

const CONTACT_EMAIL = "shekhawatk271@gmail.com";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/karan-shekhawat-93b91723a/",
  github: "https://github.com/k0-123",
  x: "https://x.com/karandebugg",
};

// minutes from midnight
const TIME_SLOTS = [16 * 60 + 30, 17 * 60, 17 * 60 + 30]; // 4:30, 5:00, 5:30

function formatTime(minutes, mode = "12h") {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (mode === "24h") {
    const h = h24.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    return `${h}:${mm}`;
  }

  const suffix = h24 >= 12 ? "pm" : "am";
  let h = h24 % 12;
  if (h === 0) h = 12;
  const mm = m.toString().padStart(2, "0");
  return `${h}:${mm}${suffix}`;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthMatrix(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export default function Contact() {
  const today = startOfDay(new Date());

  const [activeTab, setActiveTab] = useState("call"); // "call" | "form"
  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeFormat, setTimeFormat] = useState("12h");
  const [copied, setCopied] = useState(false);

  const [isConfirmStep, setIsConfirmStep] = useState(false); // booking -> confirm

  // confirm step form state
  const [confirmName, setConfirmName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmNote, setConfirmNote] = useState("");

  const monthMatrix = buildMonthMatrix(viewMonth);
  const monthLabel = viewMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  const isConfirmDisabled = selectedTime == null || !selectedDate;

  const handleConfirmBookingClick = () => {
    if (isConfirmDisabled) return;
    setIsConfirmStep(true);
  };

  const handleSendRequest = () => {
    if (!selectedDate || selectedTime == null) return;

    const dateStr = selectedDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = formatTime(selectedTime, timeFormat);

    const subject = encodeURIComponent(
      `30-min meeting request on ${dateStr} at ${timeStr} (IST)`
    );
    const body = encodeURIComponent(
      `Hi Karan,\n\nI'd like to book a 30-minute call.\n\n` +
        `Name: ${confirmName || "(not provided)"}\n` +
        `Email: ${confirmEmail || "(not provided)"}\n` +
        `Requested time: ${dateStr} at ${timeStr} (Asia/Rajasthan, IND)\n\n` +
        `Notes:\n${confirmNote || "-"}\n\n` +
        `Looking forward to hearing from you.\n`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <style>{`
      :root {
        color-scheme: dark;
      }

      /* === BACKGROUND: BLACK / GREY / WHITE FAST GRADIENT === */
      .contact-page-root {
        min-height: 100vh;
        padding-top: 140px;
        padding-bottom: 80px;
        padding-inline: 24px;

        background:
          radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), rgba(0,0,0,1) 85%),
          radial-gradient(circle at 80% 90%, rgba(255,255,255,0.06), rgba(0,0,0,1) 90%),
          linear-gradient(120deg, #000000, #151515, #262626, #000000);

        background-size: 260% 260%;
        animation: monoFlow 6s ease-in-out infinite;

        color: #f5f5f5;
        display: flex;
        justify-content: center;
      }

      @keyframes monoFlow {
        0% {
          background-position: 0% 10%;
        }
        50% {
          background-position: 80% 90%;
        }
        100% {
          background-position: 0% 10%;
        }
      }

      .contact-max {
        width: 100%;
        max-width: 1100px;
        text-align: center;
      }

      /* === HERO === */
      .contact-hero {
        margin-bottom: 40px;
        animation: contactFadeDown 0.6s ease-out forwards;
      }

      .contact-eyebrow {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: rgba(209,213,219,0.7);
        margin-bottom: 8px;
      }

      .contact-heading {
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 10px;
        letter-spacing: 0.04em;
      }

      .contact-heading span {
        font-family: "Playfair Display", system-ui, serif;
      }

      .contact-email-row {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-size: 15px;
        cursor: pointer;
        padding: 4px 12px;
        border-radius: 999px;
        background: rgba(10,10,10,0.9);
        border: 1px solid rgba(255,255,255,0.18);
        box-shadow: 0 14px 40px rgba(0,0,0,0.85);
        transition: background .18s ease, border .18s ease, transform .12s ease, box-shadow .16s ease;
      }

      .contact-email-row:hover {
        background: rgba(20,20,20,1);
        border-color: rgba(255,255,255,0.55);
        box-shadow: 0 20px 60px rgba(0,0,0,0.95);
        transform: translateY(-1px);
      }

      .contact-email-text {
        opacity: 0.92;
      }

      .contact-copy-badge {
        font-size: 11px;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.18);
        color: #e5e5e5;
      }

      .contact-social-row {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 6px;
        font-size: 18px;
      }

      .contact-social-icon {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,255,255,0.22);
        background: radial-gradient(circle at top, rgba(255,255,255,0.08), rgba(15,15,15,0.98));
        cursor: pointer;
        transition: transform .12s ease, box-shadow .18s ease, border .16s ease, background .16s ease;
      }

      .contact-social-icon:hover {
        transform: translateY(-1px);
        border-color: rgba(255,255,255,0.75);
        background: radial-gradient(circle at top, rgba(255,255,255,0.18), rgba(20,20,20,1));
        box-shadow: 0 16px 48px rgba(0,0,0,0.95);
      }

      /* === TABS === */
      .contact-tabs-wrap {
        display: flex;
        justify-content: center;
        margin-bottom: 26px;
        margin-top: 10px;
      }

      .contact-tabs {
        display: inline-flex;
        padding: 4px;
        border-radius: 999px;
        background: rgba(8,8,8,0.95);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 18px 50px rgba(0,0,0,0.9);
      }

      .contact-tab {
        min-width: 150px;
        padding: 9px 22px;
        border-radius: 999px;
        font-size: 14px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        color: rgba(229,229,229,0.8);
        transition: background .18s ease, color .18s ease, box-shadow .18s ease;
      }

      .contact-tab-active {
        background: rgba(255,255,255,0.06);
        color: #ffffff;
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.24) inset,
          0 12px 30px rgba(0,0,0,0.8);
      }

      /* === MAIN PANEL === */
      .contact-panel {
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.12);
        background:
          radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 55%),
          radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 55%),
          rgba(5,5,5,0.95);
        box-shadow:
          0 30px 80px rgba(0,0,0,0.95),
          0 0 0 1px rgba(15,15,15,1) inset;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        animation: contactFadeUp 0.55s ease-out forwards;
      }

      .contact-panel-inner {
        display: grid;
        grid-template-columns: minmax(0, 260px) minmax(0, 1.4fr) minmax(0, 260px);
        min-height: 320px;
      }

      .contact-panel-inner-confirm {
        display: grid;
        grid-template-columns: minmax(0, 260px) minmax(0, 1.6fr);
        min-height: 320px;
      }

      /* === LEFT MEETING COLUMN === */
      .contact-meeting-col {
        background: rgba(10,10,10,0.98);
        padding: 22px 22px 20px 22px;
        border-right: 1px solid rgba(255,255,255,0.06);
        text-align: left;
      }

      .contact-meeting-name {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        opacity: 0.92;
      }

      .contact-meeting-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .contact-meeting-badge {
        font-size: 12px;
        margin-bottom: 10px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(20,20,20,0.9);
        border: 1px solid rgba(255,255,255,0.12);
      }

      .contact-meeting-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        margin-bottom: 8px;
        opacity: 0.9;
      }

      .contact-meeting-meta span:first-child {
        font-size: 14px;
      }

      .contact-meeting-note {
        font-size: 12px;
        opacity: 0.75;
        margin-top: 10px;
      }

      /* === CALENDAR COLUMN === */
      .contact-calendar-col {
        padding: 18px 18px 20px 18px;
        background: rgba(8,8,8,0.98);
        border-right: 1px solid rgba(255,255,255,0.06);
        text-align: left;
        animation: contactSlideLeft 0.45s ease-out forwards;
      }

      .contact-cal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .contact-cal-title {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        opacity: 0.75;
      }

      .contact-cal-month {
        font-size: 15px;
        font-weight: 500;
      }

      .contact-cal-nav {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .contact-cal-nav-btn {
        width: 26px;
        height: 26px;
        border-radius: 999px;
        border: 1px solid rgba(120,120,120,0.9);
        background: rgba(15,15,15,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        transition: background .16s ease, border .16s ease, box-shadow .16s ease;
      }

      .contact-cal-nav-btn:hover {
        background: rgba(40,40,40,1);
        border-color: rgba(230,230,230,0.95);
        box-shadow: 0 10px 24px rgba(0,0,0,0.85);
      }

      .contact-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        opacity: 0.6;
        margin-bottom: 6px;
      }

      .contact-weekday-cell {
        text-align: center;
        padding-block: 4px;
      }

      .contact-days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        font-size: 13px;
      }

      .contact-day-cell {
        height: 34px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid rgba(60,60,60,0.9);
        background: radial-gradient(circle at top, rgba(18,18,18,1), rgba(8,8,8,0.98));
        transition: background .14s ease, border .14s ease, color .14s ease, box-shadow .14s ease;
      }

      .contact-day-empty {
        cursor: default;
        background: transparent;
        border-color: transparent;
      }

      .contact-day-cell:not(.contact-day-empty):hover {
        background: rgba(40,40,40,1);
        border-color: rgba(230,230,230,0.95);
        box-shadow: 0 8px 22px rgba(0,0,0,0.9);
      }

      .contact-day-selected {
        background: #f5f5f5;
        color: #050505;
        border-color: #e5e5e5;
        box-shadow: 0 0 0 1px rgba(10,10,10,1) inset, 0 12px 32px rgba(0,0,0,0.9);
      }

      .contact-day-disabled {
        opacity: 0.25;
        cursor: not-allowed;
        box-shadow: none;
      }

      /* === TIME COLUMN === */
      .contact-time-col {
        padding: 18px 18px 20px 18px;
        background: rgba(10,10,10,0.98);
        text-align: left;
        animation: contactSlideRight 0.45s ease-out forwards;
      }

      .contact-time-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .contact-time-title {
        font-size: 13px;
        opacity: 0.85;
      }

      .contact-time-format-toggle {
        display: inline-flex;
        border-radius: 999px;
        border: 1px solid rgba(120,120,120,0.9);
        padding: 2px;
        background: rgba(15,15,15,0.95);
      }

      .contact-time-format-btn {
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 999px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        color: rgba(180,180,180,0.9);
        transition: background .16s ease, color .16s ease;
      }

      .contact-time-format-btn-active {
        background: #f5f5f5;
        color: #050505;
      }

      .contact-time-slots {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 6px;
        margin-bottom: 12px;
      }

      .contact-time-slot {
        padding: 8px 10px;
        border-radius: 999px;
        border: 1px solid rgba(100,100,100,0.95);
        background: radial-gradient(circle at top, rgba(20,20,20,1), rgba(10,10,10,0.98));
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        transition: background .14s ease, border .14s ease, color .14s ease, box-shadow .14s ease;
      }

      .contact-time-slot:hover {
        background: rgba(40,40,40,1);
        border-color: rgba(230,230,230,0.95);
        box-shadow: 0 10px 26px rgba(0,0,0,0.9);
      }

      .contact-time-slot-selected {
        background: #f5f5f5;
        color: #050505;
        border-color: #e5e5e5;
        box-shadow: 0 12px 34px rgba(0,0,0,0.95);
      }

      .contact-time-footer {
        font-size: 11px;
        opacity: 0.78;
        margin-bottom: 10px;
      }

      /* === GREEN BUTTON BASE STYLE + COOL ANIMATION === */
      .button-green {
        position: relative;
        border-radius: 14px;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 500;
        background: #0ac15a;
        color: #ffffff;
        overflow: hidden;
        /* breathing glow */
        animation: neonGlow 3.2s ease-in-out infinite;
      }

      .button-green::before {
        content: "";
        position: absolute;
        top: 0;
        left: -140%;
        width: 140%;
        height: 100%;
        background: linear-gradient(
          110deg,
          transparent,
          rgba(255,255,255,0.5),
          transparent
        );
        opacity: 0.65;
        animation: shineSweep 2.2s linear infinite;
      }

      @keyframes shineSweep {
        0% {
          left: -140%;
        }
        100% {
          left: 140%;
        }
      }

      @keyframes neonGlow {
        0% {
          box-shadow: 0 0 10px rgba(10,193,90,0.25);
        }
        50% {
          box-shadow: 0 0 32px rgba(10,193,90,0.6);
        }
        100% {
          box-shadow: 0 0 10px rgba(10,193,90,0.25);
        }
      }

      .button-green-disabled {
        background: #222222;
        color: #aaaaaa;
        cursor: not-allowed;
        box-shadow: none;
        animation: none;
      }

      .button-green-disabled::before {
        display: none;
      }

      /* === CONFIRM BUTTON === */
      .contact-confirm-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .contact-confirm-icon {
        font-size: 15px;
      }

      /* === CONFIRM STEP COLUMN === */
      .contact-confirm-col {
        padding: 20px 22px 22px 22px;
        background: rgba(8,8,8,0.98);
        text-align: left;
        animation: contactSlideUp 0.45s ease-out forwards;
      }

      .contact-confirm-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .contact-confirm-subtitle {
        font-size: 13px;
        opacity: 0.8;
        margin-bottom: 14px;
      }

      .contact-confirm-summary {
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.16);
        background: radial-gradient(circle at 0 0, rgba(255,255,255,0.12), rgba(10,10,10,0.98));
        padding: 10px 12px;
        font-size: 13px;
        margin-bottom: 14px;
      }

      .contact-confirm-summary-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .contact-confirm-summary-label {
        opacity: 0.7;
      }

      .contact-confirm-form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 10px;
      }

      .contact-confirm-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .contact-label {
        font-size: 13px;
        font-weight: 500;
      }

      .contact-input,
      .contact-textarea {
        border-radius: 12px;
        border: 1px solid rgba(120,120,120,0.9);
        background: rgba(15,15,15,0.95);
        padding: 9px 11px;
        color: #f5f5f5;
        font-size: 14px;
        outline: none;
        transition: border .16s ease, box-shadow .16s ease, background .16s ease;
      }

      .contact-input::placeholder,
      .contact-textarea::placeholder {
        color: rgba(180,180,180,0.85);
      }

      .contact-input:focus,
      .contact-textarea:focus {
        border-color: #ffffff;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.8);
        background: rgba(18,18,18,1);
      }

      .contact-textarea {
        min-height: 110px;
        resize: none;
      }

      .contact-confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 10px;
      }

      .contact-back-btn {
        border-radius: 999px;
        border: 1px solid rgba(120,120,120,0.95);
        background: rgba(15,15,15,0.9);
        color: rgba(230,230,230,0.9);
        font-size: 13px;
        padding: 8px 16px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: background .16s ease, border .16s ease, box-shadow .16s ease;
      }

      .contact-back-btn:hover {
        background: rgba(35,35,35,1);
        border-color: rgba(230,230,230,0.9);
        box-shadow: 0 10px 28px rgba(0,0,0,0.85);
      }

      /* === FILL A FORM TAB === */
      .contact-form-wrap {
        padding: 22px 26px 26px 26px;
        background: rgba(10,10,10,0.98);
        text-align: left;
      }

      .contact-form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 14px;
      }

      .contact-form-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .contact-form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        font-size: 11px;
        opacity: 0.78;
      }

      .contact-form-submit {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .contact-submit-icon {
        font-size: 15px;
      }

      /* === RESPONSIVE === */
      @media (max-width: 960px) {
        .contact-panel-inner,
        .contact-panel-inner-confirm {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.5fr);
        }
        .contact-meeting-col {
          grid-column: 1 / -1;
          border-right: none;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
      }

      @media (max-width: 720px) {
        .contact-panel-inner {
          grid-template-columns: minmax(0, 1fr);
        }
        .contact-panel-inner-confirm {
          grid-template-columns: minmax(0, 1fr);
        }
        .contact-calendar-col {
          border-right: none;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
      }

      @media (max-width: 640px) {
        .contact-page-root {
          padding-inline: 16px;
          padding-top: 120px;
        }
        .contact-heading {
          font-size: 32px;
        }
        .contact-tabs {
          width: 100%;
        }
        .contact-tab {
          min-width: 0;
          flex: 1;
        }
        .contact-form-wrap {
          padding-inline: 18px;
        }
        .contact-form-grid,
        .contact-confirm-form-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      @keyframes contactFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes contactFadeDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes contactSlideLeft {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes contactSlideRight {
        from { opacity: 0; transform: translateX(10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes contactSlideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      `}</style>

      <div className="contact-page-root">
        <div className="contact-max">
          {/* HERO */}
          <div className="contact-hero">
            <div className="contact-eyebrow">Contact</div>
            <h1 className="contact-heading">
              <span>Get in touch</span>
            </h1>

            <div
              className="contact-email-row"
              onClick={handleCopyEmail}
              title="Click to copy email"
            >
              <span>📧</span>
              <span className="contact-email-text">{CONTACT_EMAIL}</span>
              {copied && <span className="contact-copy-badge">Copied</span>}
            </div>

            <div className="contact-social-row">
              <button
                className="contact-social-icon"
                onClick={() =>
                  window.open(
                    SOCIAL_LINKS.linkedin,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="LinkedIn"
              >
                in
              </button>
              <button
                className="contact-social-icon"
                onClick={() =>
                  window.open(
                    SOCIAL_LINKS.github,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="GitHub"
              >
                🐱
              </button>
              <button
                className="contact-social-icon"
                onClick={() =>
                  window.open(SOCIAL_LINKS.x, "_blank", "noopener,noreferrer")
                }
                aria-label="X"
              >
                𝕏
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="contact-tabs-wrap">
            <div className="contact-tabs">
              <button
                className={
                  "contact-tab" +
                  (activeTab === "call" ? " contact-tab-active" : "")
                }
                onClick={() => setActiveTab("call")}
              >
                Book a call
              </button>
              <button
                className={
                  "contact-tab" +
                  (activeTab === "form" ? " contact-tab-active" : "")
                }
                onClick={() => setActiveTab("form")}
              >
                Fill a form
              </button>
            </div>
          </div>

          {/* MAIN PANEL */}
          <div className="contact-panel">
            {activeTab === "call" ? (
              !isConfirmStep ? (
                /* STEP 1: CALENDAR + TIME */
                <div className="contact-panel-inner">
                  {/* LEFT INFO */}
                  <div className="contact-meeting-col">
                    <div className="contact-meeting-name">Karan Shekhawat</div>
                    <div className="contact-meeting-title">30 Min Meeting</div>
                    <div className="contact-meeting-badge">
                      <span>☑</span>
                      <span>Requires confirmation</span>
                    </div>

                    <div className="contact-meeting-meta">
                      <span>⏱</span>
                      <span>30 min</span>
                    </div>
                    <div className="contact-meeting-meta">
                      <span>🎥</span>
                      <span>Google Meet</span>
                    </div>
                    <div className="contact-meeting-meta">
                      <span>🌍</span>
                      <span>Asia/Rajasthan (IND)</span>
                    </div>

                    <p className="contact-meeting-note">
                      Choose a date and time that works for you. You&apos;ll get a
                      confirmation email with a calendar invite once I review
                      your request.
                    </p>
                  </div>

                  {/* CALENDAR */}
                  <div className="contact-calendar-col">
                    <div className="contact-cal-header">
                      <div>
                        <div className="contact-cal-title">Select a date</div>
                        <div className="contact-cal-month">{monthLabel}</div>
                      </div>
                      <div className="contact-cal-nav">
                        <button
                          className="contact-cal-nav-btn"
                          onClick={() =>
                            setViewMonth(
                              new Date(
                                viewMonth.getFullYear(),
                                viewMonth.getMonth() - 1,
                                1
                              )
                            )
                          }
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <button
                          className="contact-cal-nav-btn"
                          onClick={() =>
                            setViewMonth(
                              new Date(
                                viewMonth.getFullYear(),
                                viewMonth.getMonth() + 1,
                                1
                              )
                            )
                          }
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    <div className="contact-weekdays">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (day) => (
                          <div key={day} className="contact-weekday-cell">
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="contact-days-grid">
                      {monthMatrix.flat().map((date, idx) => {
                        if (!date) {
                          return (
                            <div
                              key={idx}
                              className="contact-day-cell contact-day-empty"
                            />
                          );
                        }

                        const isPast = startOfDay(date) < today;
                        const isSelected = isSameDay(date, selectedDate);

                        let cls = "contact-day-cell";
                        if (isSelected) cls += " contact-day-selected";
                        if (isPast) cls += " contact-day-disabled";

                        return (
                          <button
                            key={idx}
                            type="button"
                            className={cls}
                            onClick={() => {
                              if (isPast) return;
                              setSelectedDate(date);
                            }}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* TIME SLOTS */}
                  <div className="contact-time-col">
                    <div className="contact-time-header">
                      <div className="contact-time-title">
                        {selectedDate
                          ? selectedDate.toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })
                          : "Select a date"}
                      </div>
                      <div className="contact-time-format-toggle">
                        <button
                          className={
                            "contact-time-format-btn" +
                            (timeFormat === "12h"
                              ? " contact-time-format-btn-active"
                              : "")
                          }
                          onClick={() => setTimeFormat("12h")}
                        >
                          12h
                        </button>
                        <button
                          className={
                            "contact-time-format-btn" +
                            (timeFormat === "24h"
                              ? " contact-time-format-btn-active"
                              : "")
                          }
                          onClick={() => setTimeFormat("24h")}
                        >
                          24h
                        </button>
                      </div>
                    </div>

                    <div className="contact-time-slots">
                      {TIME_SLOTS.map((slot) => {
                        const label = formatTime(slot, timeFormat);
                        const isActive = selectedTime === slot;

                        let cls = "contact-time-slot";
                        if (isActive) cls += " contact-time-slot-selected";

                        return (
                          <button
                            key={slot}
                            type="button"
                            className={cls}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="contact-time-footer">
                      Times are shown in your browser&apos;s timezone. The
                      invite will include a Google Meet link.
                    </div>

                    <button
                      type="button"
                      className={
                        "contact-confirm-btn button-green" +
                        (isConfirmDisabled ? " button-green-disabled" : "")
                      }
                      disabled={isConfirmDisabled}
                      onClick={handleConfirmBookingClick}
                    >
                      <span className="contact-confirm-icon">✔</span>
                      <span>Confirm &amp; send request</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: CONFIRM FORM */
                <div className="contact-panel-inner-confirm">
                  {/* LEFT INFO */}
                  <div className="contact-meeting-col">
                    <div className="contact-meeting-name">Karan Shekhawat</div>
                    <div className="contact-meeting-title">30 Min Meeting</div>
                    <div className="contact-meeting-badge">
                      <span>☑</span>
                      <span>Requires confirmation</span>
                    </div>

                    <div className="contact-meeting-meta">
                      <span>⏱</span>
                      <span>30 min</span>
                    </div>
                    <div className="contact-meeting-meta">
                      <span>🎥</span>
                      <span>Google Meet</span>
                    </div>
                    <div className="contact-meeting-meta">
                      <span>🌍</span>
                      <span>Asia/Rajasthan (IND)</span>
                    </div>

                    <p className="contact-meeting-note">
                      I&apos;ll review your request and send a calendar invite or
                      propose alternate times if needed.
                    </p>
                  </div>

                  {/* RIGHT CONFIRM FORM */}
                  <div className="contact-confirm-col">
                    <div className="contact-confirm-title">
                      Review &amp; send request
                    </div>
                    <div className="contact-confirm-subtitle">
                      Confirm your details and I&apos;ll email you a calendar
                      invite.
                    </div>

                    <div className="contact-confirm-summary">
                      <div className="contact-confirm-summary-row">
                        <span className="contact-confirm-summary-label">
                          Date
                        </span>
                        <span>
                          {selectedDate
                            ? selectedDate.toLocaleDateString("en-IN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "-"}
                        </span>
                      </div>
                      <div className="contact-confirm-summary-row">
                        <span className="contact-confirm-summary-label">
                          Time
                        </span>
                        <span>
                          {selectedTime != null
                            ? formatTime(selectedTime, timeFormat) +
                              " (Asia/Rajasthan, IND)"
                            : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="contact-confirm-form-grid">
                      <div className="contact-confirm-field">
                        <label className="contact-label">Name</label>
                        <input
                          className="contact-input"
                          placeholder="Your full name"
                          value={confirmName}
                          onChange={(e) => setConfirmName(e.target.value)}
                        />
                      </div>
                      <div className="contact-confirm-field">
                        <label className="contact-label">Email</label>
                        <input
                          className="contact-input"
                          placeholder="you@example.com"
                          type="email"
                          value={confirmEmail}
                          onChange={(e) => setConfirmEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="contact-confirm-field">
                      <label className="contact-label">
                        Anything specific you&apos;d like to cover?
                      </label>
                      <textarea
                        className="contact-textarea"
                        placeholder="Share context, links, or goals so we can make the most of the call."
                        value={confirmNote}
                        onChange={(e) => setConfirmNote(e.target.value)}
                      />
                    </div>

                    <div className="contact-confirm-actions">
                      <button
                        type="button"
                        className="contact-back-btn"
                        onClick={() => setIsConfirmStep(false)}
                      >
                        <span>←</span>
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        className="button-green contact-form-submit"
                        onClick={handleSendRequest}
                      >
                        <span className="contact-submit-icon">📨</span>
                        <span>Send request</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* FILL A FORM TAB */
              <div className="contact-form-wrap">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const name = form.name.value.trim();
                    const email = form.email.value.trim();
                    const project = form.project.value.trim();
                    const message = form.message.value.trim();

                    const subject = encodeURIComponent(
                      `Project inquiry from ${name || "Portfolio"}`
                    );
                    const body = encodeURIComponent(
                      `Hi Karan,\n\nName: ${name}\nEmail: ${email}\nProject type: ${project}\n\nMessage:\n${message}\n\nLooking forward to hearing from you.\n`
                    );

                    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
                  }}
                >
                  <div className="contact-form-grid">
                    <div className="contact-form-field">
                      <label className="contact-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="contact-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="contact-form-field">
                      <label className="contact-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className="contact-input"
                        placeholder="you@example.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-field" style={{ marginTop: 10 }}>
                    <label className="contact-label" htmlFor="project">
                      What are you working on?
                    </label>
                    <input
                      id="project"
                      name="project"
                      className="contact-input"
                      placeholder="Portfolio site, SaaS dashboard, landing page…"
                    />
                  </div>

                  <div className="contact-form-field" style={{ marginTop: 10 }}>
                    <label className="contact-label" htmlFor="message">
                      Additional details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="contact-textarea"
                      placeholder="Share context, timelines, links, or anything else that will help."
                    />
                  </div>

                  <div className="contact-form-footer">
                    <span>
                      Prefer email? Write directly to <b>{CONTACT_EMAIL}</b>
                    </span>
                    <button
                      type="submit"
                      className="button-green contact-form-submit"
                    >
                      <span className="contact-submit-icon">📨</span>
                      <span>Send message</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
        {/* ANIMATED FOOTER */}
            <Footer />
    </>
  );
}
