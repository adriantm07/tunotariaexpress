"use client";

import { useState } from "react";
import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const LIST_FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
    title: "Extracción inteligente de datos",
    desc: "Lee y estructura automáticamente la información de INEs, pasaportes, actas, contratos y escrituras con precisión superior al 95%.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Validación en tiempo real",
    desc: "Verifica CURPs, fechas de vigencia, consistencia de datos y señales de alteración. Alertas cuando algo requiere revisión.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Confianza por campo",
    desc: "Cada dato extraído incluye un porcentaje de confianza. Tu equipo revisa solo lo que importa.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Expediente digital",
    desc: "Centraliza todos los documentos y datos extraídos por cliente, trámite o expediente. Búsqueda instantánea.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="3" y1="22" x2="21" y2="22"/>
        <path d="M6 22V10l6-8 6 8v12"/><line x1="12" y1="22" x2="12" y2="16"/>
        <rect x="9" y="10" width="6" height="6"/>
      </svg>
    ),
    title: "Diseñado para lo legal",
    desc: "No es un OCR genérico. nominds fue entrenado con documentos del contexto legal y notarial de habla hispana.",
  },
] as const;

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "18px 0",
        borderBottom: `1px solid ${C.border}`,
        cursor: "default",
        transition: "opacity 0.2s",
        opacity: hovered ? 1 : 0.82,
      }}
    >
      <div style={{
        width: 32, height: 32,
        background: hovered ? C.greenPale : C.offWhite,
        borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.green,
        flexShrink: 0,
        transition: "background 0.2s",
        marginTop: 1,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: C.dark,
          marginBottom: 4,
          lineHeight: 1.2,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 13,
          color: C.dark2,
          lineHeight: 1.6,
          fontWeight: 300,
        }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const isMobile = useIsMobile();

  return (
    <section id="producto-features" style={{ ...S.section, padding: isMobile ? "32px 24px" : "48px 28px" }}>
      <div style={S.container}>

        {/* Header */}
        <div style={{ marginBottom: 40, maxWidth: 620 }}>
          <span style={S.eyebrow}>Lo que hace nominds</span>
          <h2 style={{
            ...S.sectionTitle,
            fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
            fontSize: "clamp(28px, 3.8vw, 48px)",
            fontWeight: 500,
            letterSpacing: "-0.8px",
            lineHeight: 1.07,
            marginBottom: 14,
          }}>
            Todo lo que necesitas para dejar de capturar a mano
          </h2>
          <p style={{ ...S.sectionSub, fontSize: 15, color: C.warmGray }}>
            Una plataforma diseñada para los flujos de trabajo de notarías, despachos jurídicos y departamentos legales.
          </p>
        </div>

        {/* 2-col layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
          gap: isMobile ? 24 : 32,
          alignItems: "stretch",
        }}>

          {/* Left: feature list */}
          <div>
            {LIST_FEATURES.map((f, i) => (
              <FeatureRow key={i} {...f} />
            ))}
          </div>

          {/* Right: trust card */}
          <div style={{
            background: C.green,
            borderRadius: 16,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            {/* Top */}
            <div>
              <div style={{
                fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                fontSize: "clamp(22px, 2.2vw, 30px)",
                fontWeight: 700,
                color: "#FAFAF8",
                lineHeight: 1.15,
                marginBottom: 20,
                letterSpacing: "-0.4px",
              }}>
                Construido mano a mano con notarías reales
              </div>

              <p style={{
                fontSize: 15,
                color: "rgba(250,250,248,0.8)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}>
                nominds no se diseñó en una sala de juntas. Lo construimos junto a notarías activas, entendiendo sus flujos, sus documentos y los errores que cuestan más.
              </p>
            </div>

            {/* Bottom: quote */}
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}>
              <p style={{
                fontSize: 14.5,
                color: "rgba(250,250,248,0.75)",
                fontStyle: "italic",
                lineHeight: 1.65,
                marginBottom: 16,
              }}>
                "Antes tardábamos 45 minutos por expediente. Ahora son menos de 2 minutos."
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                }} />
                <div style={{ fontSize: 12, color: "rgba(250,250,248,0.7)", fontWeight: 400 }}>
                  Notaría 29 · Monterrey
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
