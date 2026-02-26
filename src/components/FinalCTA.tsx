"use client";

import { useState } from "react";
import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

export default function FinalCTA() {
  const [form, setForm] = useState({ nombre: "", contacto: "", empresa: "", comentario: "" });
  const [submitted, setSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 13px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    fontSize: 13.5,
    color: C.white,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s, background 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11.5,
    fontWeight: 600,
    color: "rgba(250,250,248,0.45)",
    marginBottom: 5,
    display: "block",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  };

  return (
    <section
      id="contacto"
      style={{
        background: C.dark,
        padding: isMobile ? "32px 24px" : "48px 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 500,
          background: "radial-gradient(ellipse, rgba(47,79,62,0.35) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 120, height: 2,
          background: `linear-gradient(90deg, transparent, ${C.scan}, transparent)`,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, ...S.container }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "start" }}>

          {/* ── Left: copy ── */}
          <div>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(200,146,42,0.1)",
                border: "1px solid rgba(200,146,42,0.25)",
                borderRadius: 20, padding: "5px 14px",
                marginBottom: 16,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.amber, boxShadow: `0 0 6px ${C.amber}` }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.amber, letterSpacing: "0.5px" }}>Empieza hoy</span>
            </div>

            <h2
              style={{
                fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                fontSize: "clamp(32px, 3.5vw, 50px)",
                lineHeight: 1.08, letterSpacing: "-1.5px",
                color: C.white, fontWeight: 500, margin: "0 0 16px",
              }}
            >
              Procesa documentos legales de forma inteligente
            </h2>

            <p style={{ fontSize: 15.5, color: "rgba(250,250,248,0.72)", fontWeight: 300, lineHeight: 1.6, margin: "0 0 28px", maxWidth: 400 }}>
              Déjanos tus datos y te mostramos nominds funcionando con tus documentos reales, sin compromiso.
            </p>

            {/* Trust points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Sin tarjeta de crédito",
                "Demo con tus documentos reales",
                "Respuesta en menos de 24 horas",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    background: "rgba(76,175,122,0.12)", border: "1px solid rgba(76,175,122,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: C.scan, fontWeight: 700,
                  }}>✓</div>
                  <span style={{ fontSize: 13.5, color: "rgba(250,250,248,0.78)", fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: form card ── */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "36px 32px",
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <p style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 500, color: C.white, letterSpacing: "-0.3px" }}>
                    Agenda tu demo gratuita
                  </p>
                </div>

                {/* Nombre */}
                <div>
                  <label style={labelStyle}>Nombre completo *</label>
                  <input
                    required
                    type="text"
                    placeholder="Lic. Juan Hernández"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(76,175,122,0.5)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                {/* Email o WhatsApp */}
                <div>
                  <label style={labelStyle}>Email o WhatsApp *</label>
                  <input
                    required
                    type="text"
                    placeholder="correo@despacho.mx  o  55 1234 5678"
                    value={form.contacto}
                    onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(76,175,122,0.5)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label style={labelStyle}>Despacho o empresa <span style={{ textTransform: "none", fontWeight: 300, color: "rgba(250,250,248,0.3)" }}>(opcional)</span></label>
                  <input
                    type="text"
                    placeholder="Notaría No. 42 / Despacho XYZ"
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(76,175,122,0.5)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                {/* Comentario */}
                <div>
                  <label style={labelStyle}>¿Algo que quieras decirnos? <span style={{ textTransform: "none", fontWeight: 300, color: "rgba(250,250,248,0.3)" }}>(opcional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Tipo de documentos, volumen, dudas…"
                    value={form.comentario}
                    onChange={(e) => setForm({ ...form, comentario: e.target.value })}
                    style={{ ...inputStyle, resize: "none", lineHeight: 1.55 }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(76,175,122,0.5)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    background: C.green, color: "white",
                    border: "none", borderRadius: 10,
                    padding: "13px 24px", fontSize: 14.5, fontWeight: 600,
                    cursor: "pointer", marginTop: 4,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = C.greenDeep;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = C.green;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Enviar solicitud
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            ) : (
              /* Confirmación */
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(76,175,122,0.15)",
                  border: "1px solid rgba(76,175,122,0.3)",
                  margin: "0 auto 20px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, color: C.scan,
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
                  fontSize: 20, fontWeight: 500, color: C.white,
                  letterSpacing: "-0.4px", margin: "0 0 10px",
                }}>
                  ¡Listo{form.nombre ? `, ${form.nombre.split(" ")[0]}` : ""}!
                </h3>
                <p style={{ fontSize: 14, color: "rgba(250,250,248,0.72)", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                  Recibimos tu solicitud. Te contactamos en menos de 24 horas para agendar la demo.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
