"use client";

import { useState } from "react";
import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const BEFORE = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    label: "Documento físico en papel",
    sub: "Llega a la ventanilla sin estructura",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    label: "Captura campo por campo",
    sub: "Una persona, mucho tiempo",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    label: "Error de captura",
    sub: "Reproceso inevitable, tiempo perdido",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: "45 – 90 min por expediente",
    sub: "Costo real que nadie mide",
  },
];

const AFTER = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    label: "Foto o escaneo del documento",
    sub: "Un disparo, proceso iniciado",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    label: "IA lee y extrae todo",
    sub: "Todos los campos, sin esfuerzo",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="20 6 9 17 4 12"/></svg>,
    label: "Validado con confianza por campo",
    sub: "Alertas solo cuando importa",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: "Menos de 90 segundos",
    sub: "Por documento, siempre",
  },
];

// ─── Arrow divider SVG ────────────────────────────────────────
function ArrowDivider() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, height: "100%" }}>
      <div style={{ width: 1, flex: 1, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))", minHeight: 40 }} />
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.2)",
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
      <div style={{ width: 1, flex: 1, background: "linear-gradient(to top, transparent, rgba(255,255,255,0.08))", minHeight: 40 }} />
    </div>
  );
}

// ─── Column with hover state ──────────────────────────────────
function Column({ side, steps }: { side: "before" | "after"; steps: typeof BEFORE }) {
  const [hovered, setHovered] = useState(false);
  const isBefore = side === "before";

  const redColor   = "#E05252";
  const greenColor = C.scan; // #4CAF7A

  const accentActive   = isBefore ? redColor   : greenColor;
  const accentInactive = "rgba(255,255,255,0.06)";

  const headerBg     = isBefore ? "rgba(224,82,82,0.08)"   : "rgba(76,175,122,0.08)";
  const headerBorder = isBefore
    ? hovered ? "rgba(224,82,82,0.5)"  : "rgba(224,82,82,0.25)"
    : hovered ? "rgba(76,175,122,0.5)" : "rgba(76,175,122,0.25)";
  const headerColor  = isBefore ? redColor : greenColor;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", gap: 0, cursor: "default" }}
    >
      {/* ── Column header ── */}
      <div style={{
        padding: "18px 20px 16px",
        minHeight: 76,
        background: headerBg,
        border: `1px solid ${headerBorder}`,
        borderRadius: "12px 12px 0 0",
        borderBottom: "none",
        transition: "background 0.3s, border-color 0.3s",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        {isBefore ? (
          <div style={{
            fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
            fontSize: "clamp(22px, 2.2vw, 30px)",
            fontWeight: 700,
            color: "#E05252",
            lineHeight: 1.1,
          }}>
            Captura manual
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/Brand guidelines/Logo/Logo Files/png/White logo - no background.png"
            alt="nominds"
            style={{ height: 40, width: "auto" }}
          />
        )}

        {/* Status indicator */}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: accentActive,
            boxShadow: `0 0 10px 3px ${accentActive}`,
          }} />
        </div>
      </div>

      {/* ── Steps ── */}
      <div style={{
        border: `1px solid ${headerBorder}`,
        borderTop: "none",
        borderRadius: "0 0 12px 12px",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}>
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          const stepBg  = isBefore ? "rgba(224,82,82,0.04)"  : "rgba(76,175,122,0.04)";
          const iconCol = isBefore ? "rgba(224,82,82,0.65)" : greenColor;
          const labelCol = isBefore ? "rgba(244,123,123,0.85)" : "rgba(125,216,170,0.85)";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 20px",
                background: stepBg,
                borderTop: i > 0 ? `1px solid ${isBefore ? "rgba(224,82,82,0.1)" : "rgba(76,175,122,0.1)"}` : "none",
                transition: "background 0.3s, border-color 0.3s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: iconCol,
                background: isBefore ? "rgba(224,82,82,0.08)" : "rgba(76,175,122,0.08)",
                transition: "color 0.3s, background 0.3s",
              }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  color: labelCol,
                  marginBottom: 2,
                  transition: "color 0.3s",
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontSize: 11.5,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {s.sub}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function Problem() {
  const isMobile = useIsMobile();

  return (
    <section style={{ ...S.section, padding: isMobile ? "32px 24px" : "48px 28px", background: C.dark, position: "relative", overflow: "hidden" }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(47,79,62,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={S.container}>

        {/* Header */}
        <div style={{ marginBottom: 24, maxWidth: 640 }}>
          <span style={S.eyebrow}>El problema actual</span>
          <h2 style={{
            ...S.sectionTitle,
            color: C.white,
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1.05,
            maxWidth: 600,
            marginBottom: 16,
          }}>
            Tu equipo dedica horas a lo que la IA hace en segundos
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(250,250,248,0.65)", fontWeight: 300, lineHeight: 1.7 }}>
            Cada expediente procesado a mano es tiempo, dinero y riesgo de error. nominds lo cambia todo.
          </p>
        </div>

        {/* Two columns + divider */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Column side="before" steps={BEFORE} />
            <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.2)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/>
                </svg>
              </div>
            </div>
            <Column side="after" steps={AFTER} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 0, alignItems: "stretch" }}>
            <Column side="before" steps={BEFORE} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowDivider />
            </div>
            <Column side="after" steps={AFTER} />
          </div>
        )}

        {/* Stat bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: 12,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}>
          {[
            { n: "95%", label: "Precisión" },
            { n: "10×", label: "Más rápido" },
            { n: "0",   label: "Sin errores" },
          ].map(({ n, label }, i) => (
            <div key={i} style={{
              padding: isMobile ? "14px 10px" : "18px 24px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{
                fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(30px, 3.5vw, 46px)",
                fontWeight: 500,
                color: C.white,
                lineHeight: 1,
                marginBottom: 6,
              }}>
                {n}
              </div>
              <div style={{ fontSize: isMobile ? 11 : 12.5, color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
