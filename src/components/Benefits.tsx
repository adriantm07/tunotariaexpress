"use client";

import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const BENEFITS = [
  {
    num: "01",
    title: "Reducción de tiempo",
    stat: "−95%",
    desc: "Lo que tomaba 45 min ahora toma menos de 2.",
  },
  {
    num: "02",
    title: "Precisión superior",
    stat: "96%",
    desc: "Extracción con alertas cuando la confianza es baja.",
  },
  {
    num: "03",
    title: "Sin fricción",
    stat: "0",
    desc: "Integración con tus sistemas. Sin migración de datos.",
  },
  {
    num: "04",
    title: "Cumplimiento total",
    stat: "100%",
    desc: "Auditoría de cada extracción para cumplimiento regulatorio.",
  },
] as const;

export default function Benefits() {
  const isMobile = useIsMobile();

  return (
    <section id="beneficios" style={{ ...S.section, padding: isMobile ? "72px 24px" : "88px 28px", background: C.offWhite }}>
      <div style={S.container}>

        {/* ── Eyebrow + title ── */}
        <div style={{ marginBottom: 40 }}>
          <span style={S.eyebrow}>Beneficios</span>
          <h2 style={{ ...S.sectionTitle, fontSize: "clamp(28px, 3vw, 40px)", maxWidth: 480 }}>
            Por qué las notarías eligen nominds
          </h2>
        </div>

        {/* ── Top: 3 big metrics ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
            background: "white",
          }}
        >
          {[
            { value: "96", unit: "%", label: "Precisión en extracción", sub: "promedio documentos legales" },
            { value: "<90", unit: "s", label: "Por documento completo", sub: "desde carga hasta datos listos" },
            { value: "10", unit: "×", label: "Más rápido", sub: "vs. captura manual tradicional" },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? "20px 12px" : "36px 32px",
                borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                  fontSize: isMobile ? "clamp(28px, 7vw, 44px)" : "clamp(48px, 5vw, 68px)",
                  fontWeight: 500,
                  letterSpacing: isMobile ? "-1.5px" : "-3px",
                  lineHeight: 1,
                  color: C.dark,
                  marginBottom: isMobile ? 8 : 16,
                }}
              >
                {m.value}<span style={{ color: C.green }}>{m.unit}</span>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? 11 : 13.5, fontWeight: 600, color: C.dark2, marginBottom: 2 }}>{m.label}</div>
                {!isMobile && <div style={{ fontSize: 12, color: C.muted, fontWeight: 300 }}>{m.sub}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom: 4 benefits grid + testimonial ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>

          {/* Left: 2×2 benefit blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                style={{
                  background: i === 2 ? C.green : "white",
                  border: `1px solid ${i === 2 ? "transparent" : C.border}`,
                  borderRadius: 16,
                  padding: "24px 22px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  minHeight: 160,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 700,
                      color: i === 2 ? "rgba(255,255,255,0.5)" : C.muted,
                      letterSpacing: "1px",
                    }}
                  >
                    {b.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                      fontSize: "clamp(26px, 2.5vw, 34px)",
                      fontWeight: 500,
                      letterSpacing: "-1.5px",
                      color: i === 2 ? C.scan : C.green,
                      lineHeight: 1,
                    }}
                  >
                    {b.stat}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13, fontWeight: 600,
                      color: i === 2 ? "white" : C.dark,
                      marginBottom: 5,
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12, fontWeight: 300, lineHeight: 1.55,
                      color: i === 2 ? "rgba(255,255,255,0.65)" : C.warmGray,
                    }}
                  >
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: testimonial block */}
          <div
            style={{
              background: C.dark,
              borderRadius: 16,
              padding: "20px 22px 18px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
          >
            {/* top: badge + quote */}
            <div>
              {/* badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(76,175,122,0.12)",
                border: `1px solid rgba(76,175,122,0.2)`,
                borderRadius: 20, padding: "3px 10px",
                marginBottom: 12,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.scan }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: C.scan, letterSpacing: "0.5px" }}>
                  Caso real · Notaría 29
                </span>
              </div>

              {/* quote */}
              <p style={{
                fontSize: 13.5,
                color: "rgba(250,250,248,0.75)",
                lineHeight: 1.6,
                fontWeight: 300,
                margin: 0,
                fontStyle: "italic",
              }}>
                "Antes perdíamos horas capturando datos de expedientes. Con nominds,
                procesamos el triple de trámites con el mismo equipo."
              </p>
            </div>

            {/* bottom attribution */}
            <div style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(250,250,248,0.85)", marginBottom: 2 }}>
                  Notaría 29
                </div>
                <div style={{ fontSize: 11, color: "rgba(250,250,248,0.35)", fontWeight: 300 }}>
                  Monterrey, Nuevo León
                </div>
              </div>
              <div style={{
                fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                fontSize: 26, fontWeight: 500,
                letterSpacing: "-1px",
                color: C.scan,
                lineHeight: 1,
              }}>
                3×
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}