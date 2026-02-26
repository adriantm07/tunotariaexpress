"use client";

import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const REASONS = [
  {
    title: "Entrenado con documentos reales",
    desc: "Nuestros modelos fueron entrenados con miles de documentos del contexto legal y notarial, no con datos genéricos.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    stat: "10k+",
    statLabel: "docs de entrenamiento",
  },
  {
    title: "Privacidad y seguridad empresarial",
    desc: "Tus documentos nunca se usan para entrenar modelos. Encriptación en tránsito y en reposo. Cumplimiento con regulaciones de protección de datos.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    stat: "AES-256",
    statLabel: "encriptación",
  },
  {
    title: "Equipo con experiencia en lo legal",
    desc: "Detrás de nominds hay un equipo con experiencia real en tecnología aplicada al sector legal y notarial.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    stat: "Legal-first",
    statLabel: "diseño del producto",
  },
  {
    title: "Soporte y evolución continua",
    desc: "El producto evoluciona contigo. Escuchamos a cada despacho para mejorar los modelos y agregar los tipos de documentos que necesitas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    stat: "Siempre",
    statLabel: "actualizando",
  },
] as const;

export default function WhyNominds() {
  const isMobile = useIsMobile();

  return (
    <section id="porque" style={{ ...S.section, padding: isMobile ? "32px 24px" : "48px 28px", background: "white" }}>
      <div style={S.container}>

        {/* ── Header row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 12 : 48,
            alignItems: "end",
            marginBottom: 40,
          }}
        >
          <div>
            <span style={S.eyebrow}>Por qué nominds</span>
            <h2
              style={{
                ...S.sectionTitle,
                fontSize: "clamp(28px, 3vw, 42px)",
                maxWidth: 440,
                marginBottom: 0,
              }}
            >
              IA construida para el mundo legal
            </h2>
          </div>
          <div>
            <p style={{ ...S.sectionSub, fontSize: 15, maxWidth: 420 }}>
              No adaptamos una herramienta genérica. Construimos nominds desde cero
              para los documentos, formatos y flujos del sistema notarial.
            </p>
          </div>
        </div>

        {/* ── 4 cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {REASONS.map((r, i) => (
            <div
              key={i}
              style={{
                background: i === 1 ? C.green : C.offWhite,
                border: `1px solid ${i === 1 ? "transparent" : C.border}`,
                borderRadius: 16,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* icon */}
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: 11,
                  background: i === 1 ? "rgba(255,255,255,0.1)" : "white",
                  border: `1px solid ${i === 1 ? "rgba(255,255,255,0.15)" : C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: i === 1 ? "white" : C.green,
                  marginBottom: 20,
                }}
              >
                {r.icon}
              </div>

              {/* stat */}
              <div
                style={{
                  fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                  fontSize: 22, fontWeight: 500,
                  letterSpacing: "-0.5px",
                  color: i === 1 ? C.scan : C.green,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {r.stat}
              </div>
              <div
                style={{
                  fontSize: 10.5, fontWeight: 600,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.8px",
                  color: i === 1 ? "rgba(255,255,255,0.65)" : C.dark2,
                  marginBottom: 18,
                }}
              >
                {r.statLabel}
              </div>

              {/* divider */}
              <div
                style={{
                  height: 1,
                  background: i === 1 ? "rgba(255,255,255,0.12)" : C.border,
                  marginBottom: 18,
                }}
              />

              {/* title */}
              <div
                style={{
                  fontSize: 13.5, fontWeight: 600,
                  color: i === 1 ? "white" : C.dark,
                  marginBottom: 8, lineHeight: 1.3,
                }}
              >
                {r.title}
              </div>

              {/* desc */}
              <div
                style={{
                  fontSize: 12.5, fontWeight: 300,
                  color: i === 1 ? "rgba(255,255,255,0.82)" : C.dark2,
                  lineHeight: 1.65,
                }}
              >
                {r.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}