import { useEffect, useMemo, useState } from "react";

/* ======================= BRAND ======================= */
const BRAND = {
  name: "Original Show de Erika Vázquez",
  city: "Tampico, Madero y zona conurbada",
  phoneDisplay: "(833) 140 79 59",
  phoneE164: "528331407959", // 52 + 10 dígitos
  socials: {
    fb: "https://www.facebook.com/animacionparatuseventossociales",
    ig: "https://www.instagram.com/animacion_erikavazquez?igsh=YXdvZnhnNjkzdWEy",
    album: "https://www.facebook.com/animacionparatuseventossociales/photos",
  },
  colors: {
    purple: "#8B3A9C",
    yellow: "#FFD700",
    blue: "#1E90FF",
    orange: "#FF6B35",
    fucsia: "#FF1493",
    white: "#FFFFFF",
    black: "#000000",
  },
};

/* ======================= DATA ======================= */
const SERVICES = [
  {
    key: "baby",
    iconImg: "/icons/baby.png",
    iconFallback: "👶",
    title: "Animación para Baby Shower",
    tagline: "Momentos emotivos y dinámicas divertidas para todos",
    bullets: [
      "Dos animadoras, sonido, juegos y letreros modernos.",
      "Duración total: 3 hrs. Show de 1:30 a 2:00 hrs.",
      "Botarga opcional por costo extra (bebé niño o niña).",
      "Solo necesitas globos del #9 y regalitos.",
      "📍 Precios para Tampico y Madero. Altamira tiene costo adicional.",
      "🖨️ También realizamos invitaciones personalizadas con precio adicional. 🎫",
    ],
    img: "/fotos/baby1.jpg",
  },
  {
    key: "despedida",
    iconImg: "/icons/bride.png",
    iconFallback: "👰",
    title: "Despedida de Soltera",
    tagline: "Risas, retos y un ambiente único para tu despedida",
    bullets: [
      "Dos animadoras, sonido y juegos súper divertidos.",
      "Duración: 3 hrs. Show de 1:30 a 2:00 hrs.",
      "Striper cómico opcional: $800 extra.",
      "Solo necesitas globos del #9 y regalitos.",
      "📍 Precios para Tampico y Madero.",
      "🖨️ También realizamos invitaciones personalizadas con precio adicional. 🎫",
    ],
    img: "/fotos/despedida1.jpg",
  },
  {
    key: "cumple",
    iconImg: "/icons/cake.png",
    iconFallback: "🎂",
    title: "Cumpleaños Infantil",
    tagline: "Diversión garantizada para peques y familias",
    bullets: [
      "Dos muñequitas animadoras, sonido y dinámicas.",
      "Coordinamos mañanitas, pastel, bolsitas y diversión garantizada.",
      "Botarga a elección disponible (consulta personajes y precios). 🎭",
      "Duración: 3 hrs.",
      "📍 Precios para Tampico y Madero.",
      "🖨️ También realizamos invitaciones personalizadas con precio adicional. 🎫",
    ],
    img: "/fotos/cumple-kids.jpg",
  },
  {
    key: "eventos",
    iconImg: "/icons/tent.png",
    iconFallback: "🎪",
    title: "Eventos Especiales",
    tagline: "Para reuniones familiares, escolares o empresariales",
    bullets: [
      "Paquetes a medida con animación, juegos y conducción del evento.",
      "Opcionales: sonido profesional, iluminación, botargas y hora loca.",
      "Duración y equipo según necesidad del evento.",
      "Cotiza por WhatsApp y arma tu paquete ideal.",
      "📍 Cobertura: Tampico, Madero y Altamira (puede aplicar costo de traslado).",
    ],
    img: "/fotos/grinch.jpg",
  },
];

// Flags por si algún día quieres reactivar “Paquetes”
const SHOW_PACKS = false;
const PACKS = [];

const GALLERY = [
  "/fotos/cumple-kids.jpg",
  "/fotos/grinch.jpg",
  "/fotos/despedida1.jpg",
  "/fotos/baby1.jpg",
  "/fotos/baby2.jpg",
  "/fotos/despedida2.jpg",
];

const REVIEWS = [
  { n: "María • Tampico", txt: "¡Se la rifaron! La fiesta de mi hijo fue inolvidable.", stars: 5 },
  { n: "Ceci • Madero", txt: "Puntuales, dinámicas y súper divertidas. 10/10.", stars: 5 },
  { n: "Rafa • Altamira", txt: "La hora loca prendió a todos. Recomendadas.", stars: 5 },
];

const FAQ = [
  { q: "¿Con cuánto tiempo de anticipación reservo?", a: "Lo ideal es desde que tienes tu fecha y lugar del evento confirmado." },
  { q: "¿Llevan sonido?", a: "Sí. Podemos cotizar extras si lo necesitas." },
  { q: "¿Cobertura?", a: "Tampico y Madero. Fuera de zona puede aplicar costo de traslado." },
];

/* ======================= UTILS ======================= */
const wa = (text) => `https://wa.me/${BRAND.phoneE164}?text=${encodeURIComponent(text)}`;
const tel = () => `tel:+${BRAND.phoneE164}`;
const gradientHero = (c1, c2) =>
  `radial-gradient(60% 60% at 10% 10%, ${c1}22 0%, transparent 60%),
   radial-gradient(60% 60% at 90% 10%, ${c2}22 0%, transparent 60%),
   linear-gradient(135deg, ${c1}, ${c2})`;

/* ======================= ANALYTICS HELPERS ======================= */
function track(eventName, params = {}) {
  // Google Analytics 4
  window.gtag?.("event", eventName, params);
  // (Opcional) Meta Pixel: si activaste Pixel en index.html
  if (eventName === "click_whatsapp" || eventName === "click_call" || eventName === "lead") {
    window.fbq?.("track", "Contact");
  }
}

/* ======================= COMPONENTES PEQUEÑOS ======================= */
function StarRow({ n = 5, color = "#FFD700" }) {
  return (
    <div className="flex gap-1" style={{ color }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function SocialIcon({ type }) {
  const common = "w-5 h-5 fill-current";
  if (type === "fb")
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12z" />
      </svg>
    );
  if (type === "ig")
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    );
  return null;
}

function FloatingWA() {
  return (
    <a
      href={wa("¡Hola Erika! Quiero cotizar mi evento 🎉")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full p-3 shadow-lg"
      style={{ background: BRAND.colors.orange }}
      aria-label="WhatsApp"
      title="Chatea por WhatsApp"
      onClick={() => track("click_whatsapp", { location: "floating_button" })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M19.11 17.2c-.27-.14-1.6-.78-1.85-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.35-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.33-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.33s-.96.94-.96 2.3 1 2.66 1.14 2.85c.14.18 1.96 3 4.75 4.12.66.28 1.18.45 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.6-.66 1.83-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32zM16.02 3C9.93 3 5 7.93 5 14.02c0 2.42.78 4.66 2.1 6.49L5 29l8.7-2.83c1.77 1 3.82 1.58 6.02 1.58 6.1 0 11.02-4.92 11.02-11.02C30.74 7.93 26.12 3 20.02 3h-3.99z" />
      </svg>
    </a>
  );
}

/* ======================= HERO CAROUSEL ======================= */
function HeroCarousel({ images, interval = 3500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!images?.length) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images?.length, interval]);

  const go = (dir) => setI((p) => (p + dir + images.length) % images.length);

  return (
    <div className="relative">
      <img
        src={images[i]}
        alt={`Foto ${i + 1}`}
        className="rounded-3xl shadow-2xl ring-4 ring-white/30 w-full h-[360px] md:h-[420px] object-cover"
      />
      <button
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow"
      >
        ‹
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow"
      >
        ›
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <span key={idx} className={`h-2 w-2 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}

/* ======================= PAGE ======================= */
export default function App() {
  const [lightbox, setLightbox] = useState({ open: false, src: "" });
  const [form, setForm] = useState({ nombre: "", fecha: "", tipo: "", mensaje: "" });
  const [tab, setTab] = useState("cumple");

  // Anclas de servicios (#cumple #baby #despedida #eventos)
  useEffect(() => {
    const key = window.location.hash.replace("#", "");
    if (SERVICES.some((s) => s.key === key)) setTab(key);
    const onHash = () => {
      const k = window.location.hash.replace("#", "");
      if (SERVICES.some((s) => s.key === k)) setTab(k);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const selected = useMemo(() => SERVICES.find((s) => s.key === tab) ?? SERVICES[0], [tab]);
  const heroBg = useMemo(() => gradientHero(BRAND.colors.purple, BRAND.colors.fucsia), []);

  const submitForm = (e) => {
    e.preventDefault();
    const { nombre, fecha, tipo, mensaje } = form;

    // Analytics
    track("submit_form", {
      name: nombre || undefined,
      date: fecha || undefined,
      type: tipo || undefined,
    });

    // WhatsApp
    const txt = `Hola Erika 👋, soy ${nombre}. Me interesa cotizar:
• Tipo: ${tipo || "—"}
• Fecha: ${fecha || "Por definir"}
• Detalles: ${mensaje || "—"}
Gracias.`;
    window.open(wa(txt), "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full ring-2 ring-white object-cover" />
            <span className="font-extrabold">{BRAND.name}</span>
          </div>

          {/* MENÚ – SIN “Paquetes” */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#servicios" className="hover:opacity-70">
              Servicios
            </a>
            <a href="#galeria" className="hover:opacity-70">
              Galería
            </a>
            <a href="#faq" className="hover:opacity-70">
              FAQ
            </a>
            <a href="#contacto" className="hover:opacity-70">
              Contacto
            </a>
          </div>

          {/* REDES – SOLO FB e IG */}
          <div className="hidden md:flex items-center gap-3">
            <a href={BRAND.socials.fb} target="_blank" rel="noreferrer" className="text-[#1877F2]" title="Facebook">
              <SocialIcon type="fb" />
            </a>
            <a href={BRAND.socials.ig} target="_blank" rel="noreferrer" className="text-pink-500" title="Instagram">
              <SocialIcon type="ig" />
            </a>
            <a
              href={tel()}
              onClick={() => track("click_call", { location: "nav" })}
              className="ml-2 px-4 py-2 rounded-lg font-semibold text-white"
              style={{ background: BRAND.colors.orange }}
            >
              Llamar {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative text-white overflow-hidden" style={{ background: heroBg }}>
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">¡Convertimos tu evento en una experiencia inolvidable!</h1>
            <p className="mt-5 text-lg text-white/90">
              Animación profesional para cumpleaños, baby showers, despedidas y más en {BRAND.city}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={wa("¡Hola! Quiero cotizar mi evento 🎉")}
                onClick={() => track("click_whatsapp", { location: "hero" })}
                className="px-6 py-3 rounded-xl font-bold"
                style={{ background: BRAND.colors.orange, color: BRAND.colors.white }}
              >
                ¡Cotiza tu evento ahora!
              </a>
              <a
                href="#servicios"
                className="px-6 py-3 rounded-xl font-semibold border border-white/70 text-white hover:bg-white hover:text-black transition"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Carrusel con 6 fotos */}
          <div className="relative">
            <HeroCarousel images={GALLERY} />
            <span className="absolute -top-3 -left-3 text-4xl">✨</span>
            <span className="absolute -bottom-3 -right-3 text-4xl">🎈</span>
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section id="servicios" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: BRAND.colors.purple }}>
            Servicios principales
          </h2>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                onClick={() => {
                  setTab(s.key);
                  track("change_service_tab", { tab: s.key });
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 transition ${
                  tab === s.key ? "text-white" : "bg-white"
                }`}
                style={{
                  background: tab === s.key ? BRAND.colors.purple : "#fff",
                  borderColor: tab === s.key ? "transparent" : "#eee",
                }}
              >
                <img
                  src={s.iconImg}
                  alt=""
                  className="w-5 h-5"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="select-none">{s.iconFallback}</span>
                <span>{s.title}</span>
              </a>
            ))}
          </div>

          {/* Panel */}
          <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-extrabold">{selected.title}</h3>
              <p className="text-gray-600 mt-1">{selected.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {selected.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3">
                <a
                  href={wa(`Hola, quiero cotizar ${selected.title}`)}
                  onClick={() => track("click_whatsapp", { location: "services_panel", service: selected.key })}
                  className="px-5 py-3 rounded-xl font-bold text-white"
                  style={{ background: BRAND.colors.orange }}
                >
                  Cotizar por WhatsApp
                </a>
                <a href="#galeria" className="px-5 py-3 rounded-xl font-semibold border">
                  Ver eventos
                </a>
              </div>
            </div>
            <img src={selected.img} alt={selected.title} className="rounded-2xl shadow-lg object-cover w-full h-64" />
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: BRAND.colors.purple }}>
            ¿Por qué elegirnos?
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-14">
          <div className="flex flex-wrap gap-3">
            {[
              "Más de 14 años de experiencia",
              "Animación personalizada",
              "Atención por WhatsApp",
              "Música, juegos y actividades",
              "Diversion Garantizada",
            ].map((b) => (
              <span key={b} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "#fff", border: "1px solid #eee" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: BRAND.colors.purple }}>
              Galería
            </h2>
            <a
              href={BRAND.socials.album}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_external", { target: "facebook_album" })}
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ background: BRAND.colors.blue }}
            >
              Ver fotos en Facebook
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {GALLERY.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Animación de eventos ${i + 1} en Tampico`}
                className="rounded-2xl object-cover w-full h-44 cursor-pointer hover:opacity-90"
                onClick={() => {
                  setLightbox({ open: true, src });
                  track("open_lightbox", { location: "gallery", src });
                }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {lightbox.open && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox({ open: false, src: "" })}
        >
          <img src={lightbox.src} alt="Foto" className="max-h-[85vh] rounded-xl" />
        </div>
      )}

      {/* TESTIMONIOS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8" style={{ color: BRAND.colors.purple }}>
            Lo que dicen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.n} className="p-6 rounded-2xl border bg-white">
                <StarRow n={r.stars} color={BRAND.colors.yellow} />
                <p className="mt-3 italic text-gray-700">“{r.txt}”</p>
                <p className="mt-2 font-semibold">{r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: BRAND.colors.purple }}>
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="group border rounded-xl bg-gray-50 p-4">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">{f.q}</span>
                  <span className="ml-2 text-xl group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL + FORM */}
      <section id="contacto" className="text-white" style={{ background: gradientHero(BRAND.colors.purple, BRAND.colors.fucsia) }}>
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">¿Listo para hacer tu evento inolvidable?</h3>
            <p className="mt-2 text-white/90">Cotización gratuita • Respuesta inmediata</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={tel()}
                onClick={() => track("click_call", { location: "footer_cta" })}
                className="px-6 py-3 rounded-xl font-bold text-white"
                style={{ background: BRAND.colors.orange }}
              >
                ¡Llama ahora! {BRAND.phoneDisplay}
              </a>
              <a
                href={wa("Hola, quiero reservar mi fecha 🎊")}
                onClick={() => track("click_whatsapp", { location: "footer_cta" })}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-black"
                style={{ background: BRAND.colors.yellow }}
              >
                Enviar WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={submitForm} className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg space-y-3">
            <h4 className="text-lg font-bold" style={{ color: BRAND.colors.purple }}>
              Solicita tu cotización
            </h4>
            <input
              required
              placeholder="Tu nombre"
              className="w-full border rounded-lg px-3 py-2"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="w-full border rounded-lg px-3 py-2" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
              <select className="w-full border rounded-lg px-3 py-2" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option value="">Tipo de evento</option>
                <option>Cumpleaños infantil</option>
                <option>Cumpleaños adulto</option>
                <option>Baby Shower</option>
                <option>Despedida</option>
                <option>Evento especial</option>
              </select>
            </div>
            <textarea
              rows={3}
              placeholder="Detalles (invitados, lugar, temática...)"
              className="w-full border rounded-lg px-3 py-2"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            />
            <button type="submit" className="w-full font-semibold rounded-lg px-4 py-3 text-white" style={{ background: BRAND.colors.blue }}>
              ¡Cotiza sin compromiso!
            </button>
            <p className="text-xs text-gray-500">Abriremos WhatsApp con tus datos listos para enviar.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-extrabold">{BRAND.name}</p>
            <p className="text-sm mt-2">Animación de eventos en {BRAND.city}.</p>
          </div>
          <div>
            <p className="font-semibold">Contacto</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a
                  href={tel()}
                  onClick={() => track("click_call", { location: "footer_links" })}
                  className="underline"
                >
                  Tel: {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={wa("Hola Erika, vengo de la web")}
                  onClick={() => track("click_whatsapp", { location: "footer_links" })}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a href={BRAND.socials.fb} target="_blank" rel="noreferrer" className="underline flex items-center gap-1">
                  <SocialIcon type="fb" /> Facebook
                </a>
                <a href={BRAND.socials.ig} target="_blank" rel="noreferrer" className="underline flex items-center gap-1">
                  <SocialIcon type="ig" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Horario</p>
            <p className="text-sm mt-2">Lun–Dom: 9:00–20:00</p>
            <p className="text-sm">Cobertura: {BRAND.city}</p>
          </div>
        </div>
        <div className="text-center text-xs text-white/70 py-3">© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</div>
      </footer>

      <FloatingWA />
    </div>
  );
}
