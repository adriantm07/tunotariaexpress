"use client";

import { C, S } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";
import MiniScanAnimation, { MiniField } from "./MiniScanAnimation";

const CASES: {
  tag: string;
  title: string;
  desc: string;
  src: string;
  fields: MiniField[];
  variant?: "fields" | "document";
}[] = [
  {
    tag: "Identidad",
    title: "Validación de identidad en comparecencias",
    desc: "Procesa documentos de identificación oficial y extrae automáticamente la información del titular con validación de integridad en tiempo real.",
    src: "/licencia/podras-tramitar-licencia-conducir-digital-2_31_46_1138_708.jpg",
    fields: [
      { label: "Nombre",    value: "PÉREZ GARCÍA JOHN",    t: 420 },
      { label: "CURP",      value: "PEGA850912HDFSRN03",   t: 780 },
      { label: "Vigencia",  value: "15/04/2026",            t: 1100 },
      { label: "No. Lic.",  value: "123456789012",          t: 1380 },
    ],
  },
  {
    tag: "Estado civil",
    title: "Procesamiento de actas de nacimiento",
    desc: "Digitaliza y estructura la información contenida en actas de nacimiento con extracción automática de datos y vinculación directa al expediente.",
    src: "/Acta de nacimiento/Screenshot 2026-02-23 092433.png",
    fields: [
      { label: "Nombre",    value: "MARTÍNEZ LÓPEZ ANA",   t: 400 },
      { label: "Reg. Civil","value": "NL/2024/00341",       t: 720 },
      { label: "Fecha nac.","value": "03/07/1991",          t: 1050 },
      { label: "Tipo",      value: "Acta nacimiento",       t: 1320 },
    ],
  },
  {
    tag: "Inmuebles",
    title: "Extracción en escrituras de compraventa",
    desc: "Identifica inmueble, precio, partes, folio real y folios notariales en escrituras complejas de varias páginas. Listo para firma electrónica.",
    src: "/Escrituras/Russildi-escritura-1008-c.jpg",
    variant: "document",
    fields: [
      { label: "Inmueble",   value: "Av. Lázaro Cárdenas 2400, Col. Del Valle, San Pedro Garza García, N.L.", t: 380 },
      { label: "Vendedor",   value: "RAMÍREZ OCHOA FERNANDO JOSÉ",  t: 700 },
      { label: "Comprador",  value: "GÓMEZ REYES CARLOS ALBERTO",   t: 1020 },
      { label: "Monto",      value: "$4,250,000.00 M.N.",            t: 1340 },
    ],
  },
  {
    tag: "Registro Civil",
    title: "Validación de actas del Registro Civil",
    desc: "Procesa y estructura la información de actas del Registro Civil con extracción automática de datos y vinculación directa al expediente.",
    src: "/Registro civil/images.jpg",
    fields: [
      { label: "Nombre",     value: "RUIZ SANTOS ELENA",    t: 400 },
      { label: "No. Acta",   value: "NL/RC/2024/0892",       t: 730 },
      { label: "Fecha",      value: "14/03/2024",            t: 1060 },
      { label: "Oficial",    value: "Of. 29, Monterrey",      t: 1360 },
    ],
  },
];

function UseCaseCard({ tag, title, desc, src, fields, variant }: (typeof CASES)[number]) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        background: "white",
        transition: "border-color 0.2s, box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = C.sand;
        el.style.boxShadow = "0 8px 32px rgba(26,25,22,0.07)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = C.border;
        el.style.boxShadow = "none";
      }}
    >
      {/* Animation area */}
      <div style={{
        padding: "14px 14px 10px",
        background: C.offWhite,
        borderBottom: `1px solid ${C.border}`,
        height: 190,
        display: "flex",
        alignItems: "stretch",
      }}>
        <MiniScanAnimation src={src} fields={fields} variant={variant} />
      </div>

      {/* Content */}
      <div style={{ padding: "14px 18px 16px", flex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: C.sandL, color: C.dark2,
          fontSize: 10, fontWeight: 500,
          padding: "2px 8px", borderRadius: 20, marginBottom: 6,
        }}>
          {tag}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginBottom: 4, lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ fontSize: 12.5, color: C.dark2, lineHeight: 1.55, fontWeight: 300 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function UseCases() {
  const isMobile = useIsMobile();

  return (
    <section id="casos" style={{ ...S.section, padding: isMobile ? "32px 24px" : "48px 28px" }}>
      <div style={S.container}>
        <span style={S.eyebrow}>Casos de uso</span>
        <h2 style={{
          ...S.sectionTitle,
          fontFamily: "'NeueHaas', 'Helvetica Neue', sans-serif",
          fontSize: "clamp(28px, 3.8vw, 48px)",
          fontWeight: 500,
          letterSpacing: "-0.8px",
          lineHeight: 1.07,
          marginBottom: 10,
        }}>Para cada tipo de trámite</h2>
        <p style={{ ...S.sectionSub, fontSize: 15, marginBottom: 0, lineHeight: 1.6 }}>
          nominds se adapta a los documentos y flujos más frecuentes en despachos legales y notarías.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 16, marginTop: 32,
        }}>
          {CASES.map((c, i) => (
            <UseCaseCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
