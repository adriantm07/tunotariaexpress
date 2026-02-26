"use client";

import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const BEFORE = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    label: "Documento llega en papel",
    sub: "Sin estructura, sin formato",
    time: "0 min",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="23" y1="11" x2="17" y2="11"/>
      </svg>
    ),
    label: "Captura manual campo por campo",
    sub: "Una persona, concentración total",
    time: "20 – 40 min",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: "Error de captura detectado",
    sub: "Reproceso, corrección, retraso",
    time: "+ 15 – 30 min",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    label: "Expediente listo (si no hay más errores)",
    sub: "Costo real que nadie mide",
    time: "~90 min total",
  },
];

const AFTER = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    label: "Foto o escaneo del documento",
    sub: "Un disparo desde cualquier dispositivo",
    time: "5 seg",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: "IA extrae todos los campos",
    sub: "Nombre, CURP, fechas, datos clave",
    time: "30 – 60 seg",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: "Validación automática con confianza",
    sub: "Alertas solo cuando algo importa",
    time: "instantáneo",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    label: "Expediente digital listo",
    sub: "Datos estructurados, sin esfuerzo",
    time: "< 90 seg total",
  },
];

function TimelineCol({
  side,
  steps,
}: {
  side: "before" | "after";
  steps: typeof BEFORE;
}) {
  const isBefore = side === "before";
  const accent = isBefore ? "#E05252" : C.scan;
  const accentBg = isBefore ? "rgba(224,82,82,0.08)" : "rgba(76,175,122,0.08)";
  const accentBorder = isBefore ? "rgba(224,82,82,0.2)" : "rgba(76,175,122,0.2)";
  const timeBg = isBefore ? "rgba(224,82,82,0.12)" : "rgba(76,175,122,0.12)";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: 24,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: accent,
          boxShadow: `0 0 10px 3px ${accent}`,
          flexShrink: 0,
        }} />
        {isBefore ? (
          <span style={{
            fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
            fontSize: 18, fontWeight: 700,
            color: accent, letterSpacing: "-0.3px",
          }}>
            Captura manual
          </span>
        ) : (
          <img
            src="/Brand guidelines/Logo/Logo Files/png/White logo - no background.png"
            alt="nominds"
            style={{ height: 26, width: "auto" }}
          />
        )}
      </div>

      {/* Steps */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute",
          left: 27, top: 28, bottom: 28,
          width: 1,
          background: `linear-gradient(to bottom, ${accentBorder}, ${accentBorder} 80%, transparent)`,
          zIndex: 0,
        }} />

        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={i} style={{
              display: "flex", gap: 16,
              paddingBottom: isLast ? 0 : 20,
              position: "relative", zIndex: 1,
            }}>
              {/* Icon circle */}
              <div style={{
                width: 54, height: 54, borderRadius: "50%", flexShrink: 0,
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: accent,
              }}>
                {s.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 14, fontWeight: 600,
                    color: "rgba(250,250,248,0.9)",
                    lineHeight: 1.3,
                  }}>
                    {s.label}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: accent,
                    background: timeBg,
                    border: `1px solid ${accentBorder}`,
                    borderRadius: 20, padding: "2px 8px",
                    letterSpacing: "0.3px",
                    whiteSpace: "nowrap",
                  }}>
                    {s.time}
                  </span>
                </div>
                <div style={{
                  fontSize: 12, color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5, fontWeight: 300,
                }}>
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}

        {/* Final badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 16,
          background: isBefore ? "rgba(224,82,82,0.1)" : "rgba(76,175,122,0.1)",
          border: `1px solid ${accentBorder}`,
          borderRadius: 12, padding: "10px 16px",
        }}>
          <div style={{
            fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
            fontSize: 22, fontWeight: 700,
            color: accent, letterSpacing: "-0.5px",
          }}>
            {isBefore ? "~90 min" : "< 90 seg"}
          </div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
            {isBefore ? "por expediente\npromedio real" : "por documento\nsiempre"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const isMobile = useIsMobile();

  return (
    <section style={{ ...S.section, padding: isMobile ? "32px 24px" : "48px 28px", background: C.dark, position: "relative", overflow: "hidden" }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 800, height: 600,
        background: "radial-gradient(ellipse, rgba(47,79,62,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={S.container}>

        {/* Header */}
        <div style={{ marginBottom: 32, maxWidth: 640 }}>
          <span style={S.eyebrow}>El problema actual</span>
          <h2 style={{
            ...S.sectionTitle,
            color: C.white,
            fontSize: "clamp(26px, 3.8vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1.05,
            maxWidth: 600,
            marginBottom: 12,
          }}>
            Tu equipo dedica horas a lo que la IA hace en segundos
          </h2>
          <p style={{ fontSize: 15, color: "rgba(250,250,248,0.55)", fontWeight: 300, lineHeight: 1.7 }}>
            Cada expediente procesado a mano es tiempo, dinero y riesgo de error. nominds lo cambia todo.
          </p>
        </div>

        {/* Two timelines */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 48,
          position: "relative",
        }}>
          {/* Desktop divider */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "50%", top: 0, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }} />
          )}

          <TimelineCol side="before" steps={BEFORE} />

          {/* Mobile separator */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "-12px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.25)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/>
                </svg>
              </div>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>
          )}

          <TimelineCol side="after" steps={AFTER} />
        </div>

        {/* Stat bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: 32,
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
