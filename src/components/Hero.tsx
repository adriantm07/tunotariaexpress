"use client";

import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import ScanAnimation from "./ScanAnimation";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id="producto"
      style={{
        ...S.section,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: isMobile ? 102 : 110,
        paddingBottom: isMobile ? 32 : 48,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        overflow: "hidden",
        background: C.white,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute", top: -180, right: -280,
          width: 720, height: 720,
          background: "radial-gradient(circle, rgba(47,79,62,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          ...S.container,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 56,
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Copy ── */}
        <div>
          <h1
            style={{
              fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
              fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : "clamp(36px, 4.2vw, 58px)",
              lineHeight: 1.07,
              letterSpacing: "-1.5px",
              color: C.dark,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            De documentos
            <br />en papel a datos
            <br />
            <span style={{ color: C.green }}>estructurados</span>
            <br />al instante
          </h1>

          <p
            style={{
              fontSize: 15.5, lineHeight: 1.65,
              color: C.warmGray, maxWidth: isMobile ? "100%" : 480,
              marginBottom: 28, fontWeight: 300,
            }}
          >
            nominds lee, extrae y valida la información de documentos legales y de
            identidad con inteligencia artificial, eliminando el trabajo manual en
            tus procesos.
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#contacto"
              style={S.btnPrimary}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.greenDeep;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.green;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Agendar demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#casos"
              style={S.btnOutline}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = C.offWhite}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              Ver casos de uso
            </a>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 32 }}>
            <div style={{ display: "flex" }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: C.sand,
                    border: "2px solid white",
                    marginLeft: i === 0 ? 0 : -7,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12.5, color: C.muted }}>
              Usado por notarías, despachos jurídicos y departamentos legales
            </span>
          </div>
        </div>

        {/* ── RIGHT: Animation ── */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ScanAnimation autoPlay />
        </div>
      </div>
    </section>
  );
}
