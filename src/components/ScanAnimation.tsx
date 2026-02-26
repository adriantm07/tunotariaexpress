"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { C, SCAN_FIELDS, LASER_MS } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

type FieldId = (typeof SCAN_FIELDS)[number]["id"];
type Phase = "idle" | "scanning" | "done";

// ─── Animation cycle ───────────────────────────────────────────
function useAnimationCycle() {
  const [phase, setPhase]         = useState<Phase>("idle");
  const [litFields, setLitFields] = useState<FieldId[]>([]);
  const [outFields, setOutFields] = useState<FieldId[]>([]);
  const running = useRef(false);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timers.current.forEach(clearTimeout);

  const run = useCallback(() => {
    if (running.current) return;
    running.current = true;
    clear();
    setPhase("idle");
    setLitFields([]);
    setOutFields([]);

    const t0 = setTimeout(() => {
      setPhase("scanning");
      SCAN_FIELDS.forEach(({ id, t }) => {
        const ta = setTimeout(() => setLitFields((p) => [...p, id]), t);
        const tb = setTimeout(() => setOutFields((p) => [...p, id]), t + 200);
        timers.current.push(ta, tb);
      });
      const tf = setTimeout(() => {
        setPhase("done");
        running.current = false;
      }, LASER_MS + 700);
      timers.current.push(tf);
    }, 80);
    timers.current.push(t0);
  }, []);

  useEffect(() => () => clear(), []);
  return { phase, litFields, outFields, run };
}

// ─── Laser sweeps top→bottom ───────────────────────────────────
function Laser({ phase, cardHeight }: { phase: Phase; cardHeight: number }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const glow = glowRef.current;
    if (!line || !glow) return;
    if (phase === "scanning") {
      line.getBoundingClientRect();
      line.style.transition = `transform ${LASER_MS}ms linear`;
      glow.style.transition = `transform ${LASER_MS}ms linear`;
      line.style.transform  = `translateY(${cardHeight + 4}px)`;
      glow.style.transform  = `translateY(${cardHeight - 10}px)`;
    } else {
      line.style.transition = "none";
      glow.style.transition = "none";
      line.style.transform  = "translateY(-4px)";
      glow.style.transform  = "translateY(-20px)";
    }
  }, [phase, cardHeight]);

  if (phase === "idle") return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20, overflow: "hidden", borderRadius: 14 }}>
      <div
        ref={glowRef}
        style={{
          position: "absolute", left: 0, right: 0, height: 40,
          background: "linear-gradient(to bottom,transparent,rgba(76,175,122,0.12),transparent)",
          transform: "translateY(-20px)", willChange: "transform",
        }}
      />
      <div
        ref={lineRef}
        style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(to right,transparent 0%,rgba(76,175,122,0.15) 8%,rgba(76,175,122,0.98) 50%,rgba(76,175,122,0.15) 92%,transparent 100%)",
          filter: "blur(0.3px)",
          boxShadow: "0 0 12px 3px rgba(76,175,122,0.45), 0 0 4px 1px rgba(76,175,122,0.7)",
          transform: "translateY(-4px)", willChange: "transform",
        }}
      />
    </div>
  );
}

// ─── Gold chip ─────────────────────────────────────────────────
function Chip() {
  return (
    <svg width="34" height="27" viewBox="0 0 38 30" fill="none">
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2C56A" />
          <stop offset="40%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#A07830" />
        </linearGradient>
        <linearGradient id="chipShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="36" height="28" rx="5" fill="url(#chipGrad)" stroke="#9A7230" strokeWidth="0.7" />
      <rect x="1" y="1" width="36" height="14" rx="5" fill="url(#chipShine)" />
      {/* internal lines */}
      <line x1="13" y1="1" x2="13" y2="29" stroke="#9A7230" strokeWidth="0.6" opacity="0.7" />
      <line x1="25" y1="1" x2="25" y2="29" stroke="#9A7230" strokeWidth="0.6" opacity="0.7" />
      <line x1="1" y1="10" x2="37" y2="10" stroke="#9A7230" strokeWidth="0.6" opacity="0.7" />
      <line x1="1" y1="20" x2="37" y2="20" stroke="#9A7230" strokeWidth="0.6" opacity="0.7" />
      {/* center contact pad */}
      <rect x="14" y="11" width="10" height="8" rx="1" fill="#B89040" opacity="0.8" />
    </svg>
  );
}

// ─── Crest ─────────────────────────────────────────────────────
function Crest() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
      <rect x="0.5" y="0.5" width="25" height="29" rx="2" fill="#f8f8f6" stroke="#c8c8c4" strokeWidth="0.6" />
      <rect x="2" y="2"  width="10" height="12" rx="1" fill="#8B1A1A" opacity="0.55" />
      <rect x="14" y="2" width="10" height="12" rx="1" fill="#2F4F3E" opacity="0.55" />
      <rect x="2" y="16" width="10" height="12" rx="1" fill="#2F4F3E" opacity="0.55" />
      <rect x="14" y="16" width="10" height="12" rx="1" fill="#C9A84C" opacity="0.7" />
      <circle cx="13" cy="14" r="4.5" fill="white" opacity="0.85" stroke="#ccc" strokeWidth="0.4" />
      <circle cx="13" cy="14" r="2.5" fill="#8B1A1A" opacity="0.5" />
    </svg>
  );
}

// ─── Single field inside the card ─────────────────────────────
function LicField({
  label, value, lit, mono, style: ext,
}: {
  label: string; value: string; lit: boolean; mono?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        paddingLeft: 4,
        borderLeft: `2px solid ${lit ? C.scan : "transparent"}`,
        background: lit ? "rgba(76,175,122,0.07)" : "transparent",
        borderRadius: 2,
        transition: "background 0.35s, border-color 0.35s",
        ...ext,
      }}
    >
      <div style={{ fontSize: 6, fontWeight: 700, color: "#999", letterSpacing: "0.6px", textTransform: "uppercase", lineHeight: 1.2 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: mono ? 7 : 8,
          fontWeight: 700,
          color: lit ? "#111" : "#3a3a3a",
          fontFamily: mono ? "monospace" : "Arial, Helvetica, sans-serif",
          letterSpacing: mono ? "0.9px" : "0.1px",
          lineHeight: 1.35,
          transition: "color 0.3s",
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ─── The plastic ID card ───────────────────────────────────────
function LicenciaCard({ litFields }: { litFields: FieldId[] }) {
  const lit = (id: FieldId) => litFields.includes(id);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
        // Deep plastic shadow
        boxShadow:
          "0 2px 0px rgba(255,255,255,0.9) inset," +
          "0 -1px 0 rgba(0,0,0,0.12) inset," +
          "0 20px 48px rgba(26,29,25,0.22)," +
          "0 4px 12px rgba(26,29,25,0.12)",
        position: "relative",
        // Card plastic background
        background: "linear-gradient(160deg,#f9f9f7 0%,#efefeb 55%,#e8e8e3 100%)",
      }}
    >
      {/* Subtle plastic sheen overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
          background:
            "linear-gradient(135deg," +
            "rgba(255,255,255,0.55) 0%," +
            "rgba(255,255,255,0.0) 40%," +
            "rgba(255,255,255,0.0) 70%," +
            "rgba(255,255,255,0.18) 100%)",
          borderRadius: 14,
        }}
      />

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #d8d8d4", position: "relative", zIndex: 2 }}>
        {/* issuer */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 10px", flex: 1, background: "rgba(255,255,255,0.5)" }}>
          <Crest />
          <div>
            <div style={{ fontSize: 8, fontWeight: 900, color: "#1a1a1a", letterSpacing: "0.5px", lineHeight: 1.25 }}>ESTADO</div>
            <div style={{ fontSize: 8, fontWeight: 900, color: "#1a1a1a", letterSpacing: "0.5px", lineHeight: 1.25 }}>DE MÉXICO</div>
          </div>
        </div>
        {/* red title strip */}
        <div
          style={{
            background: "linear-gradient(90deg,#7A1515,#8B1A1A)",
            padding: "0 13px",
            display: "flex", alignItems: "center",
            boxShadow: "-2px 0 6px rgba(0,0,0,0.12)",
          }}
        >
          <span style={{ color: "white", fontSize: 7.5, fontWeight: 900, letterSpacing: "0.9px", whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            LICENCIA PARA CONDUCIR
          </span>
        </div>
      </div>

      {/* ── Subtype ── */}
      <div
        style={{
          borderBottom: "1px solid #d4d4d0",
          textAlign: "center", padding: "2.5px 0",
          background: "rgba(255,255,255,0.35)",
          position: "relative", zIndex: 2,
        }}
      >
        <span style={{ fontSize: 8, fontWeight: 800, color: "#2a2a2a", letterSpacing: "2px" }}>AUTOMOVILISTA</span>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", gap: 9, padding: "9px 10px 7px", position: "relative", zIndex: 2 }}>

        {/* Photo — realistic plastic look */}
        <div
          style={{
            width: 50, height: 64,
            flexShrink: 0,
            borderRadius: 4,
            background: "linear-gradient(160deg,#c8c8c4,#b8b8b2)",
            border: "1px solid #a8a8a4",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* photo sheen */}
          <div
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "45%",
              background: "linear-gradient(to bottom,rgba(255,255,255,0.22),transparent)",
              borderRadius: "3px 3px 0 0",
            }}
          />
          <svg width="20" height="24" viewBox="0 0 24 27" fill="#888" style={{ position: "relative", zIndex: 1 }}>
            <ellipse cx="12" cy="8" rx="6" ry="7" />
            <path d="M2 26c0-5.5 4.5-10 10-10s10 4.5 10 10" />
          </svg>
        </div>

        {/* Fields */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4.5 }}>
          <LicField label="APELLIDOS Y NOMBRE" value="PÉREZ GARCÍA JOHN ALEJANDRO" lit={lit("name")} />
          <LicField label="LICENCIA" value="123456789012" lit={lit("lic")} />
          <LicField label="CURP" value="PEGA850912HDFSRN03" lit={lit("curp")} mono />
          <div style={{ display: "flex", gap: 8 }}>
            <LicField label="FECHA NAC." value="12/09/1985" lit={lit("dob")} style={{ flex: 1 }} />
            <LicField label="EXPEDICIÓN" value="15/04/2022" lit={lit("exp")} style={{ flex: 1 }} />
          </div>
        </div>

        {/* Chip */}
        <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 2 }}>
          <Chip />
        </div>
      </div>

      {/* Address */}
      <div style={{ padding: "0 10px 7px", position: "relative", zIndex: 2 }}>
        <LicField
          label="DOMICILIO"
          value="AV. PRINCIPAL 456, COL. CENTRO, TLALNEPANTLA DE BAZ, EDOMEX"
          lit={lit("addr")}
        />
      </div>

      {/* MRZ */}
      <div
        style={{
          borderTop: "1px solid #d0d0cc",
          padding: "4px 10px",
          fontFamily: "'Courier New', monospace",
          fontSize: 5.5, letterSpacing: "1.5px",
          color: "#b0b0a8", lineHeight: 1.8,
          background: "rgba(0,0,0,0.03)",
          position: "relative", zIndex: 2,
        }}
      >
        IDMEX123456789012&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
        8509122F2601010MEX&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;6<br />
        PEREZGARCIAJOHNALEJANDRO&lt;&lt;&lt;&lt;&lt;
      </div>
    </div>
  );
}

// ─── Compact 2-column output card ─────────────────────────────
function OutCard({ field, visible }: { field: typeof SCAN_FIELDS[number]; visible: boolean }) {
  const isHigh = field.tier === "high";
  return (
    <div
      style={{
        padding: "8px 10px",
        background: "white",
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
        <span style={{ fontSize: 11 }}>{field.icon}</span>
        <span style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", color: C.muted, lineHeight: 1 }}>
          {field.label}
        </span>
        <span
          style={{
            marginLeft: "auto", flexShrink: 0,
            fontSize: 9, fontWeight: 700,
            padding: "1px 5px", borderRadius: 8,
            background: isHigh ? "#D6E8DF" : C.amberPale,
            color:      isHigh ? "#1E4032" : C.amber,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s 0.2s",
          }}
        >
          {field.conf}%
        </span>
      </div>
      <div
        style={{
          fontSize: 11, fontWeight: 600, color: C.dark,
          fontFamily: "monospace",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}
      >
        {field.value}
      </div>
      {/* confidence bar */}
      <div style={{ width: "100%", height: 2, background: C.border, borderRadius: 2, marginTop: 5, overflow: "hidden" }}>
        <div
          style={{
            height: "100%", borderRadius: 2,
            background: isHigh ? C.green : C.amber,
            width: visible ? `${field.conf}%` : "0%",
            transition: visible ? "width 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s" : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────
export default function ScanAnimation({ autoPlay = true }: { autoPlay?: boolean }) {
  const { phase, litFields, outFields, run } = useAnimationCycle();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(220);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (cardRef.current) setCardH(cardRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(run, 800);
      return () => clearTimeout(t);
    }
  }, [autoPlay, run]);

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(run, 3500);
      return () => clearTimeout(t);
    }
  }, [phase, run]);

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", gap: isMobile ? 20 : 24, width: "100%" }}>

      {/* ── CARD SIDE ── */}
      <div style={{ flexShrink: 0, position: "relative", width: isMobile ? "100%" : 286 }}>
        {/* status badge */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 8,
            opacity: phase !== "idle" ? 1 : 0, transition: "opacity 0.4s",
          }}
        >
          <div
            style={{
              width: 7, height: 7, borderRadius: "50%",
              background: phase === "done" ? C.green : C.scan,
              animation: phase === "scanning" ? "pulseDot 1.5s ease-in-out infinite" : "none",
            }}
          />
          <style>{`@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(0.65)}}`}</style>
          <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.8px", color: C.muted, textTransform: "uppercase" }}>
            {phase === "done" ? "Escaneo completo" : "Escaneando…"}
          </span>
        </div>

        {/* card + laser */}
        <div ref={cardRef} style={{ position: "relative" }}>
          <LicenciaCard litFields={litFields} />
          <Laser phase={phase} cardHeight={cardH} />
        </div>

        <button
          onClick={run}
          style={{
            display: "block", marginTop: 9,
            background: "transparent",
            border: `1px solid ${C.border}`,
            borderRadius: 7, padding: "4px 13px",
            fontSize: 11, fontFamily: "DM Sans, sans-serif",
            color: C.muted, cursor: "pointer",
            opacity: phase === "done" ? 1 : 0,
            transition: "opacity 0.4s, color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.dark; (e.currentTarget as HTMLElement).style.borderColor = C.dark; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
        >
          ↺ Replay
        </button>
      </div>

      {/* ── OUTPUT SIDE ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.1px", color: C.muted }}>
            Datos extraídos
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 9, fontFamily: "monospace", color: C.green,
              background: C.greenPale, padding: "2px 8px",
              borderRadius: 10, border: "1px solid rgba(47,79,62,0.15)",
              opacity: phase !== "idle" ? 1 : 0, transition: "opacity 0.4s",
            }}
          >
            {phase === "done" ? "Completado ✓" : "Procesando…"}
          </span>
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
          }}
        >
          {SCAN_FIELDS.map((f) => (
            <OutCard key={f.id} field={f} visible={outFields.includes(f.id)} />
          ))}
        </div>

        {/* Summary */}
        <div
          style={{
            marginTop: 10, padding: "10px 12px",
            background: "rgba(47,79,62,0.07)",
            border: "1px solid rgba(47,79,62,0.15)",
            borderRadius: 9,
            display: "flex", alignItems: "center", gap: 10,
            opacity: phase === "done" ? 1 : 0,
            transform: phase === "done" ? "translateY(0)" : "translateY(7px)",
            transition: "opacity 0.5s, transform 0.5s",
          }}
        >
          <div
            style={{
              width: 26, height: 26, background: C.green,
              borderRadius: 7, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: 12, flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: C.dark }}>Documento validado</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>6 campos · Licencia EDOMEX · Sin alertas</div>
          </div>
          <div style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 17, fontWeight: 700, color: C.green }}>
            97%
          </div>
        </div>
      </div>
    </div>
  );
}
