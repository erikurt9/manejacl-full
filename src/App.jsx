import { useEffect, useRef, useState } from "react";
import { guardarSesionAdaptativa, generarExamenAdaptativo, obtenerPreguntasDebiles } from "./adaptativo.js";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import { generarExamen, PREGUNTAS } from "./preguntas.js";
import { generarExamenMoto, PREGUNTAS_MOTO } from "./preguntas_moto.js";
import { useAuth } from "./useAuth.js";
import { guardarResultado } from "./db.js";

import { AuthModal } from "./AuthModal.jsx";
import { Dashboard } from "./Dashboard.jsx";

// ─── STORE ────────────────────────────────────────────────────────────────────
const useStore = create((set, get) => ({
  pantalla: "inicio",
  modo: "examen",
  clase: "B",
  preguntaActual: 0,
  respuestas: {},
  tiemposRespuesta: {},
  tiempoInicioPregunta: Date.now(),
  tiempoRestante: 45 * 60,
  preguntas: [],

  iniciar: (modo, clase = "B", preguntasAdaptativas = null) => {
    const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;
    const generarFn = clase === "C" ? generarExamenMoto : generarExamen;
    const preguntas = preguntasAdaptativas
      ? preguntasAdaptativas
      : modo === "inteligente"
        ? [...banco].sort(() => Math.random() - 0.5)
        : generarFn(35);
set({
      pantalla: "examen",
      modo,
      clase,
      preguntaActual: 0,
      respuestas: {},
      tiemposRespuesta: {},
      tiempoInicioPregunta: Date.now(),
      tiempoRestante: modo === "inteligente" ? Infinity : 45 * 60,
      preguntas,
    });
  },

  reiniciar: () => set({ pantalla: "inicio", clase: "B", preguntaActual: 0, respuestas: {}, tiemposRespuesta: {}, tiempoInicioPregunta: Date.now(), tiempoRestante: 45 * 60, preguntas: [] }),

responder: (i) => {
    const { preguntaActual, respuestas, tiemposRespuesta, tiempoInicioPregunta, modo, preguntas } = get();
    if (respuestas[preguntaActual] !== undefined) return;
    const segundos = Math.round((Date.now() - tiempoInicioPregunta) / 1000);
    const nuevas = { ...respuestas, [preguntaActual]: i };
    const nuevosTiempos = { ...tiemposRespuesta, [preguntaActual]: segundos };
    set({ respuestas: nuevas, tiemposRespuesta: nuevosTiempos, tiempoInicioPregunta: Date.now() });
    if (modo === "examen") {
      setTimeout(() => {
        const { preguntaActual: pa } = get();
        if (pa < preguntas.length - 1) set({ preguntaActual: pa + 1 });
        else set({ pantalla: "resultado" });
      }, 500);
    }
  },

  siguiente: () => {
    const { preguntaActual, preguntas } = get();
    if (preguntaActual < preguntas.length - 1) set({ preguntaActual: preguntaActual + 1 });
    else set({ pantalla: "resultado" });
  },

  tick: () => {
    const { tiempoRestante, modo } = get();
    if (modo === "inteligente") return;
    if (tiempoRestante <= 1) set({ pantalla: "resultado" });
    else set({ tiempoRestante: tiempoRestante - 1 });
  },
}));

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ─── TOP BAR MÓVIL ────────────────────────────────────────────────────────────
function TopBar({ onMenuToggle, showMenu }) {
  const { tiempoRestante, modo, clase } = useStore();
  const urgente = tiempoRestante < 120;
  return (
    <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <button onClick={() => useStore.getState().reiniciar()} className="flex items-center gap-2.5 bg-transparent border-0 p-0 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-black text-white text-lg">Maneja<span className="text-blue-400">CL</span></span>
        </button>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${modo === "examen" ? "bg-blue-500/20 text-blue-400" : modo === "inteligente" ? "bg-pink-500/20 text-pink-400" : "bg-amber-500/20 text-amber-400"}`}>
          {modo === "examen" ? "Examen" : modo === "inteligente" ? "🧠" : "Estudio"}
        </span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>
          {clase === "C" ? "C" : "B"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {modo !== "inteligente" && (
        <motion.span animate={{ color: urgente ? "#f87171" : "#e2e8f0" }} className="font-mono font-black text-sm">
          {fmt(tiempoRestante)}
        </motion.span>
        )}
        <button onClick={onMenuToggle} className="w-9 h-9 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 bg-transparent outline-none hover:border-slate-500 hover:text-slate-200 transition-all">
          {showMenu
            ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            : <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          }
        </button>
      </div>
    </div>
  );
}

// ─── SIDEBAR CONTENT ──────────────────────────────────────────────────────────
function SidebarContent({ onClose }) {
  const { preguntaActual, respuestas, tiempoRestante, modo, clase, preguntas } = useStore();
  const urgente = tiempoRestante < 120;
  const correctasHasta = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;

  return (
    <div className="flex flex-col p-5 gap-4 h-full overflow-y-auto">
      <div className="hidden md:flex items-center gap-2 mb-1">
        <button onClick={() => useStore.getState().reiniciar()} className="flex items-center gap-2 bg-transparent border-0 p-0 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-black text-white text-lg">Maneja<span className="text-blue-400">CL</span></span>
        </button>
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${modo === "examen" ? "bg-blue-500/20 text-blue-400" : modo === "inteligente" ? "bg-pink-500/20 text-pink-400" : "bg-amber-500/20 text-amber-400"}`}>
          {modo === "examen" ? "Examen" : modo === "inteligente" ? "🧠" : "Estudio"}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>
          {clase === "C" ? "C" : "B"}
        </span>
      </div>

      {modo !== "inteligente" && (
      <div className={`hidden md:block rounded-2xl border p-4 text-center ${urgente ? "border-red-500/40 bg-red-500/5" : "border-slate-700/60 bg-slate-800/40"}`}>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Tiempo restante</p>
        <motion.p animate={{ color: urgente ? "#f87171" : "#ffffff" }} className="text-3xl font-black font-mono">
          {fmt(tiempoRestante)}
        </motion.p>
        {urgente && <p className="text-xs text-red-400 mt-1 font-medium">¡Apúrate!</p>}
      </div>
      )}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Progreso</span>
          <span>{preguntaActual + 1} / {preguntas.length}</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className={`h-full rounded-full ${modo === "examen" ? "bg-blue-500" : modo === "inteligente" ? "bg-pink-500" : "bg-amber-500"}`}
            animate={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {(modo === "estudio" || modo === "inteligente") && (
          <div className="flex justify-between text-xs">
            <span className="text-emerald-400 font-semibold">{correctasHasta} correctas</span>
            <span className="text-red-400 font-semibold">{Object.keys(respuestas).length - correctasHasta} incorrectas</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Preguntas</p>
        <div className={`grid gap-1 ${modo === "inteligente" ? "grid-cols-10" : "grid-cols-7 gap-1.5"}`}>
          {preguntas.map((_, i) => {
            const resp = respuestas[i];
            const esActual = i === preguntaActual;
            const respondida = resp !== undefined;
            const correcta = (modo === "estudio" || modo === "inteligente") && resp === preguntas[i]?.correcta;
            const incorrecta = (modo === "estudio" || modo === "inteligente") && respondida && resp !== preguntas[i]?.correcta;
            return (
              <button key={i}
                onClick={() => { if (modo === "estudio" || modo === "inteligente") { useStore.setState({ preguntaActual: i }); if (onClose) onClose(); } }}
                className={`${modo === "inteligente" ? "w-5 h-5 rounded text-[9px]" : "w-7 h-7 rounded-lg text-xs"} font-bold transition-all flex items-center justify-center ${
                  esActual ? (modo === "examen" ? "bg-blue-500 text-white scale-110" : modo === "inteligente" ? "bg-pink-500 text-white" : "bg-amber-500 text-white scale-110") :
                  correcta ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                  incorrecta ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                  respondida ? "bg-slate-600/40 text-slate-400 border border-slate-600/40" :
                  "bg-slate-800 text-slate-500 border border-slate-700"
                } ${modo === "examen" ? "cursor-default" : "hover:border-slate-500"}`}>
                {modo === "inteligente" ? "" : i + 1}
              </button>
            );
          })}
        </div>
        {modo === "examen" && <p className="text-xs text-slate-600 mt-3">No puedes navegar entre preguntas en modo examen.</p>}
      </div>

      <button onClick={() => useStore.getState().reiniciar()}
        className="md:hidden mt-4 border border-slate-700 hover:border-slate-500 text-slate-500 hover:text-slate-300 text-sm font-semibold py-2.5 rounded-xl transition-all bg-transparent outline-none">
        ← Salir al inicio
      </button>
    </div>
  );
}

// ─── INFO PANEL ───────────────────────────────────────────────────────────────
function InfoPanel({ pregunta, respuestaGuardada, yaRespondida, correctasHasta, preguntas, respuestas }) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div key={`cat-${pregunta.pregunta}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Categoría</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg flex-shrink-0">{pregunta.icono}</div>
            <div>
              <p className="text-white font-bold text-sm">{pregunta.categoria}</p>
              <div className="flex gap-1 mt-1.5">
                {[1,2,3,4,5].map((n) => <div key={n} className={`h-1.5 w-4 rounded-full ${n <= pregunta.dificultad ? "bg-amber-400" : "bg-slate-700"}`} />)}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {yaRespondida ? (
          <motion.div key="feedback" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`rounded-2xl border p-4 ${respuestaGuardada === pregunta.correcta ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${respuestaGuardada === pregunta.correcta ? "text-emerald-400" : "text-red-400"}`}>
              {respuestaGuardada === pregunta.correcta ? "✓ Correcto" : "✗ Incorrecto"}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{pregunta.explicacion}</p>
          </motion.div>
        ) : (
          <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-2xl border border-slate-700/40 bg-slate-800/20 p-5 flex flex-col items-center justify-center text-center gap-3 min-h-36">
            <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-600 text-xl">?</div>
            <p className="text-slate-600 text-sm">Responde para ver la explicación</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Rendimiento</p>
        <div className="space-y-3">
          {[
            { label: "Respondidas", valor: Object.keys(respuestas).length, color: "bg-blue-500" },
            { label: "Correctas", valor: correctasHasta, color: "bg-emerald-500" },
            { label: "Incorrectas", valor: Object.keys(respuestas).length - correctasHasta, color: "bg-red-500" },
          ].map(({ label, valor, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300 font-semibold">{valor}/{preguntas.length}</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div className={`h-full ${color} rounded-full`} animate={{ width: `${(valor / preguntas.length) * 100}%` }} transition={{ duration: 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── IMAGEN PREGUNTA ──────────────────────────────────────────────────────────
function ImagenPregunta({ src }) {
  if (!src) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      className="mb-6 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/40 flex items-center justify-center">
      <img src={src} alt="Imagen de la pregunta" className="max-h-56 w-auto object-contain p-4" />
    </motion.div>
  );
}

// ─── MODO EXAMEN ──────────────────────────────────────────────────────────────
function ModoExamen() {
  const { preguntaActual, respuestas, tick, preguntas } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { const t = setInterval(tick, 1000); return () => clearInterval(t); }, [tick]);

  const pregunta = preguntas[preguntaActual];
  if (!pregunta) return null;
  const respuestaGuardada = respuestas[preguntaActual];
  const yaRespondida = respuestaGuardada !== undefined;

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Sidebar desktop */}
      <div className="hidden md:flex w-72 flex-shrink-0 border-r border-slate-800 flex-col"><SidebarContent /></div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopBar solo móvil */}
        <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} showMenu={menuOpen} />
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 overflow-hidden bg-slate-900/95 flex-shrink-0" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <SidebarContent onClose={() => setMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 md:px-12 flex flex-col justify-start pt-8 md:pt-12 max-w-3xl mx-auto w-full pb-10">
            <AnimatePresence mode="wait">
              <motion.div key={preguntaActual} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-4 block">
                  Pregunta {preguntaActual + 1} de {preguntas.length}
                </span>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-8">
                  <motion.div className="h-full bg-blue-400" initial={false} animate={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
                </div>
                <ImagenPregunta src={pregunta.imagen} />
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-2xl mb-8 tracking-tight">{pregunta.pregunta}</h2>
                <div className="flex flex-col gap-3">
                  {pregunta.opciones.map((op, i) => (
                    <motion.button key={i}
                      onClick={() => !yaRespondida && useStore.getState().responder(i)}
                      disabled={yaRespondida}
                      whileTap={!yaRespondida ? { scale: 0.98 } : {}}
                      whileHover={!yaRespondida ? { scale: 1.01 } : {}}
                      className={`text-left px-5 md:px-7 py-4 rounded-2xl border-2 transition-all duration-150 text-base font-medium ${
                        yaRespondida && i === respuestaGuardada ? "border-blue-500 bg-blue-500/10 text-blue-200" :
                        yaRespondida ? "border-slate-700/30 bg-slate-800/20 text-slate-500 cursor-default" :
                        "border-slate-700/60 bg-slate-800/40 text-slate-200 hover:border-blue-400 hover:bg-slate-700/60 hover:shadow-lg hover:shadow-blue-500/10"
                      }`}>
                      <span className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-xl border-2 border-current flex items-center justify-center flex-shrink-0 font-black text-sm ${yaRespondida && i === respuestaGuardada ? "bg-blue-500/20" : ""}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{op}</span>
                      </span>
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {yaRespondida && (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-slate-500 text-sm flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Respuesta registrada · Pasando a la siguiente pregunta...
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MODO ESTUDIO ─────────────────────────────────────────────────────────────
function ModoEstudio() {
  const { preguntaActual, respuestas, tick, siguiente, preguntas } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { const t = setInterval(tick, 1000); return () => clearInterval(t); }, [tick]);

  const pregunta = preguntas[preguntaActual];
  if (!pregunta) return null;
  const respuestaGuardada = respuestas[preguntaActual];
  const yaRespondida = respuestaGuardada !== undefined;
  const correctasHasta = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;

  const estadoOpcion = (i) => {
    if (!yaRespondida) return "neutro";
    if (i === pregunta.correcta) return "correcta";
    if (i === respuestaGuardada) return "incorrecta";
    return "neutro";
  };

  const estilos = {
    neutro: "border-slate-700/60 bg-slate-800/40 text-slate-200 hover:border-amber-400 hover:bg-slate-700/60 cursor-pointer",
    correcta: "border-emerald-500 bg-emerald-500/10 text-emerald-300 cursor-default",
    incorrecta: "border-red-500 bg-red-500/10 text-red-300 cursor-default",
    deshabilitado: "border-slate-700/30 bg-slate-800/20 text-slate-500 cursor-default",
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Sidebar desktop */}
      <div className="hidden md:flex w-72 flex-shrink-0 border-r border-slate-800 flex-col"><SidebarContent /></div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} showMenu={menuOpen} />
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 overflow-hidden bg-slate-900/95 flex-shrink-0" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <SidebarContent onClose={() => setMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Columna principal pregunta */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 md:px-12 flex flex-col pt-8 max-w-3xl mx-auto w-full pb-4">
                <AnimatePresence mode="wait">
                  <motion.div key={preguntaActual} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
                    <span className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4 block">
                      Pregunta {preguntaActual + 1} de {preguntas.length}
                    </span>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-8">
                      <motion.div className="h-full bg-amber-400" animate={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }} transition={{ duration: 0.35, ease: "easeOut" }} initial={false} />
                    </div>
                    <ImagenPregunta src={pregunta.imagen} />
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-2xl mb-8 tracking-tight">{pregunta.pregunta}</h2>
                    <div className="flex flex-col gap-3">
                      {pregunta.opciones.map((op, i) => {
                        const estado = estadoOpcion(i);
                        return (
                          <motion.button whileTap={{ scale: 0.98 }} key={i}
                            onClick={() => !yaRespondida && useStore.getState().responder(i)}
                            disabled={yaRespondida}
                            className={`text-left px-5 md:px-7 py-4 rounded-2xl border-2 transition-all duration-200 text-base font-medium ${yaRespondida && estado === "neutro" ? estilos.deshabilitado : estilos[estado]}`}
                            animate={estado === "correcta" ? { scale: [1, 1.015, 1] } : estado === "incorrecta" ? { x: [0, -8, 8, -5, 5, 0] } : {}}
                            whileHover={!yaRespondida ? { scale: 1.01 } : {}}
                            transition={{ duration: 0.35 }}>
                            <span className="flex items-center gap-4">
                              <span className={`w-8 h-8 rounded-xl border-2 border-current flex items-center justify-center flex-shrink-0 font-black text-sm ${estado === "correcta" ? "bg-emerald-500/20" : estado === "incorrecta" ? "bg-red-500/20" : ""}`}>
                                {estado === "correcta" ? "✓" : estado === "incorrecta" ? "✗" : String.fromCharCode(65 + i)}
                              </span>
                              <span className="flex-1">{op}</span>
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                    {/* Info panel solo en móvil/tablet */}
                    <div className="lg:hidden mt-6 mb-4">
                      <InfoPanel pregunta={pregunta} respuestaGuardada={respuestaGuardada} yaRespondida={yaRespondida} correctasHasta={correctasHasta} preguntas={preguntas} respuestas={respuestas} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 md:px-12 py-4 border-t border-slate-800 flex-shrink-0">
              <button onClick={() => useStore.setState({ preguntaActual: Math.max(0, preguntaActual - 1) })} disabled={preguntaActual === 0}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold text-sm bg-transparent outline-none">
                ← Anterior
              </button>
              <AnimatePresence>
                {yaRespondida && (
                  <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} onClick={siguiente}
                    className="px-8 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm">
                    {preguntaActual < preguntas.length - 1 ? "Siguiente →" : "Ver resultado"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Panel info solo en desktop grande */}
          <div className="hidden lg:flex w-80 flex-shrink-0 flex-col gap-4 p-6 overflow-y-auto border-l border-slate-800/60">
            <InfoPanel pregunta={pregunta} respuestaGuardada={respuestaGuardada} yaRespondida={yaRespondida} correctasHasta={correctasHasta} preguntas={preguntas} respuestas={respuestas} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INICIO ───────────────────────────────────────────────────────────────────
function Inicio({ onIniciar, onLoginClick, onLegalClick }) {
  return (
    <div className="w-full h-full overflow-y-auto md:overflow-hidden flex flex-col">

      {/* NAV TOP */}
      <div className="w-full flex justify-end px-6 md:px-16 pt-5 flex-shrink-0">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={onLoginClick}
          className="text-sm text-slate-400 hover:text-white font-semibold px-4 py-2 rounded-xl border border-slate-700/80 hover:border-slate-500 transition-all"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          Iniciar sesión
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="flex-1 flex flex-col items-center justify-center w-full mx-auto px-6 md:px-16 py-6 md:py-0" style={{ maxWidth: "1100px" }}>

{/* Logo */}
<motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
  className="mb-4">
  <svg width="80" height="80" viewBox="0 0 200 200" fill="none">
    {/* Aro exterior */}
    <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="14"/>

 

  

    {/* Rayos */}
    <path d="M 95 95 C 85 85, 58 76, 38 84" stroke="white" strokeWidth="9" strokeLinecap="round"/>
    <path d="M 105 95 C 115 85, 142 76, 162 84" stroke="white" strokeWidth="9" strokeLinecap="round"/>
    <path d="M 100 115 L 100 175" stroke="white" strokeWidth="9" strokeLinecap="round"/>

    {/* Buje */}
    <circle cx="100" cy="100" r="18" fill="white"/>
    <circle cx="100" cy="100" r="12" fill="#0a0f1a"/>
    <circle cx="100" cy="100" r="6" fill="white"/>
  </svg>
</motion.div>

        {/* Título */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
          Manej<span className="text-blue-400">app</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-slate-400 text-center text-sm md:text-base mb-4 md:mb-5 max-w-md leading-relaxed">
          Aprueba el CONASET más rápido. Te decimos qué te falta.
        </motion.p>

        {/* Stats — solo 3, centrados */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-4 md:mb-5 w-full">
          {[["✅", "Preguntas oficiales"], ["🧠", "Análisis inteligente"], ["⚡", "Simulación real"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-xl md:text-3xl font-black text-white mb-0.5">{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          ))}
        </motion.div>

{/* Cards */}
<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

{/* MODO EXAMEN — carta principal con pulse glow */}
{/* MODO EXAMEN — carta principal */}
<motion.button
  onClick={() => onIniciar("examen")}
  whileHover={{ scale: 1.04, y: -4 }}
  whileTap={{ scale: 0.97 }}
  className="text-left p-5 md:p-6 rounded-2xl border-2 border-emerald-500/60 hover:border-emerald-400 transition-colors outline-none relative overflow-hidden"
  style={{ background: "rgba(16,185,129,0.10)" }}>

  {/* Pulse glow — capa separada, no interfiere con whileHover */}
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{
      boxShadow: [
        "inset 0 0 0px rgba(16,185,129,0), 0 0 18px rgba(16,185,129,0.10)",
        "inset 0 0 20px rgba(16,185,129,0.08), 0 0 40px rgba(16,185,129,0.28)",
        "inset 0 0 0px rgba(16,185,129,0), 0 0 18px rgba(16,185,129,0.10)",
      ],
    }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
    ⭐ Empieza aquí
  </div>
  <div className="text-3xl mb-3">📋</div>
  <p className="text-white font-black text-base md:text-lg mb-1">Modo Examen</p>
  <p className="text-slate-400 text-sm leading-snug mb-3">Simula el examen real de CONASET.</p>
  <span className="text-emerald-400 text-sm font-semibold">Iniciar →</span>
</motion.button>

{/* MODO ESTUDIO */}
<motion.button onClick={() => onIniciar("estudio")}
  whileHover={{ scale: 1.04, y: -4 }}
  whileTap={{ scale: 0.97 }}
  className="text-left p-5 md:p-6 rounded-2xl border-2 border-amber-500/40 hover:border-amber-500 transition-colors outline-none"
  style={{ background: "rgba(245,158,11,0.08)" }}>
  <div className="text-3xl mb-3">💡</div>
  <p className="text-white font-black text-base md:text-lg mb-1">Modo Estudio</p>
  <p className="text-slate-400 text-sm leading-snug mb-3">Feedback inmediato y explicaciones detalladas.</p>
  <span className="text-amber-400 text-sm font-semibold">Estudiar →</span>
</motion.button>

{/* MODO INTELIGENTE */}
<motion.button onClick={() => onIniciar("inteligente")}
  whileHover={{ scale: 1.04, y: -4 }}
  whileTap={{ scale: 0.97 }}
  className="text-left p-5 md:p-6 rounded-2xl border-2 border-pink-500/40 hover:border-pink-400 transition-colors outline-none relative overflow-hidden"
  style={{ background: "rgba(236,72,153,0.08)" }}>
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{ boxShadow: ["0 0 0px rgba(236,72,153,0)", "0 0 20px rgba(236,72,153,0.2)", "0 0 0px rgba(236,72,153,0)"] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  />
  <div className="text-3xl mb-3">🧠</div>
  <p className="text-white font-black text-base md:text-lg mb-1">Modo Inteligente</p>
  <p className="text-slate-400 text-sm leading-snug mb-3">Repasa solo tus preguntas débiles con explicaciones.</p>
  <span className="text-pink-400 text-sm font-semibold">Repasar →</span>
</motion.button>

{/* BANCO */}
<motion.button onClick={onLoginClick}
  whileHover={{ scale: 1.04, y: -4 }}
  whileTap={{ scale: 0.97 }}
  className="text-left p-5 md:p-6 rounded-2xl border-2 border-slate-700/50 hover:border-slate-500 transition-colors outline-none"
  style={{ background: "rgba(255,255,255,0.02)" }}>
  <div className="text-3xl mb-3">📚</div>
  <p className="text-white font-black text-base md:text-lg mb-1">Banco de Preguntas</p>
  <p className="text-slate-400 text-sm leading-snug mb-3">Revisa las preguntas con respuestas y explicaciones.</p>
  <span className="text-slate-500 text-sm font-semibold">Regístrate gratis</span>
</motion.button>

</motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-xs text-slate-600 mt-4 text-center">
          Preguntas oficiales del Cuestionario Base CONASET · Chile
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 mt-1.5 pb-6 md:pb-0">
          <span onClick={() => onLegalClick?.("privacidad")} className="text-xs text-slate-700 hover:text-slate-500 transition-colors cursor-pointer">Privacidad</span>
          <span className="text-slate-800 text-xs">·</span>
          <span onClick={() => onLegalClick?.("terminos")} className="text-xs text-slate-700 hover:text-slate-500 transition-colors cursor-pointer">Términos</span>
          <span className="text-slate-800 text-xs">·</span>
          <span onClick={() => onLegalClick?.("contacto")} className="text-xs text-slate-700 hover:text-slate-500 transition-colors cursor-pointer">Contacto</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── BANCO DE PREGUNTAS ───────────────────────────────────────────────────────
function BancoPreguntas({ onVolver, clase = "B" }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [expandida, setExpandida] = useState(null);
  const scrollRef = useRef(null);

  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;

  const categorias = ["Todas", ...Array.from(new Set(banco.map(p => p.categoria))).sort()];

  const filtradas = busqueda.trim() === "" && categoriaFiltro === "Todas"
    ? banco
    : banco.filter(p => {
        const matchCat = categoriaFiltro === "Todas" || p.categoria === categoriaFiltro;
        const matchBusq = busqueda.trim() === "" || p.pregunta.toLowerCase().includes(busqueda.toLowerCase()) || p.opciones.some(o => o.toLowerCase().includes(busqueda.toLowerCase()));
        return matchCat && matchBusq;
      });

  const handleBusqueda = (val) => {
    setBusqueda(val);
    setExpandida(null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleCategoria = (cat) => {
    setCategoriaFiltro(cat);
    setExpandida(null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Sidebar filtros desktop */}
      <div className="hidden md:flex w-60 flex-shrink-0 border-r border-slate-800 flex-col overflow-hidden">
        {/* Header sidebar */}
        <div className="p-5 pb-3 flex-shrink-0">
          <button onClick={onVolver}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-semibold mb-5 bg-transparent border-0 outline-none p-0">
            ← Volver
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-black text-white text-sm">Maneja<span className="text-blue-400">CL</span></span>
          </div>
        </div>

        {/* Categorías con scroll propio */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <p className="text-xs text-slate-500 uppercase tracking-widest px-2 mb-2">Categorías</p>
          <div className="flex flex-col gap-0.5">
            {categorias.map(cat => (
              <button key={cat} onClick={() => handleCategoria(cat)}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between border-0 outline-none ${categoriaFiltro === cat ? "bg-blue-500/20 text-blue-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 bg-transparent"}`}>
                <span className="truncate">{cat}</span>
                {cat !== "Todas" && (
                  <span className="text-xs text-slate-600 flex-shrink-0 ml-2">
                    {banco.filter(p => p.categoria === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="p-3 border-t border-slate-800 flex-shrink-0 text-center">
          <span className="text-lg font-black text-white">{filtradas.length}</span>
          <span className="text-xs text-slate-500 ml-1.5">preguntas</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 flex-shrink-0">
          <button onClick={onVolver} className="md:hidden text-slate-300 hover:text-white transition-colors font-semibold text-sm bg-transparent border-0 outline-none p-0">← Volver</button>
          <h2 className="text-white font-black text-base flex-1">📚 Banco de Preguntas</h2>
          <input value={busqueda} onChange={e => handleBusqueda(e.target.value)}
            placeholder="Buscar pregunta..."
            className="hidden md:block w-64 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 border border-slate-700/60 focus:outline-none focus:border-blue-500 transition-colors"
            style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>

        {/* Búsqueda móvil */}
        <div className="md:hidden px-4 py-3 border-b border-slate-800 flex-shrink-0">
          <input value={busqueda} onChange={e => handleBusqueda(e.target.value)}
            placeholder="Buscar pregunta..."
            className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 border border-slate-700/60 focus:outline-none focus:border-blue-500 transition-colors"
            style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>

        {/* Filtro categoría móvil */}
        <div className="md:hidden flex gap-2 px-4 py-3 overflow-x-auto flex-shrink-0 border-b border-slate-800">
          {categorias.map(cat => (
            <button key={cat} onClick={() => handleCategoria(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all border outline-none ${categoriaFiltro === cat ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "text-slate-500 border-slate-700/60 bg-transparent"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Lista preguntas */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-5">
          <div className="max-w-3xl mx-auto flex flex-col gap-2.5">
            {filtradas.length === 0 ? (
              <div className="text-center py-20 text-slate-600">No se encontraron preguntas.</div>
            ) : filtradas.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-700/50 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <button className="w-full text-left px-5 py-4 flex items-start gap-4 bg-transparent border-0 outline-none"
                  onClick={() => setExpandida(expandida === p.id ? null : p.id)}>
                  <span className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs font-black text-slate-500 flex-shrink-0 mt-0.5">{p.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500">{p.icono} {p.categoria}</span>
                      <span className="flex gap-0.5">{[1,2,3,4,5].map(n => <span key={n} className={`w-1.5 h-1.5 rounded-full ${n <= p.dificultad ? "bg-amber-400/70" : "bg-slate-700"}`}/>)}</span>
                    </div>
                    <p className="text-slate-200 text-sm font-medium leading-snug">{p.pregunta}</p>
                  </div>
                  <span className={`text-slate-500 transition-transform flex-shrink-0 mt-1 ${expandida === p.id ? "rotate-180" : ""}`}>▾</span>
                </button>
                <AnimatePresence>
                  {expandida === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-slate-700/40 pt-4">
                        {p.imagen && (
                          <div className="mb-4 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800/40 flex items-center justify-center">
                            <img src={p.imagen} alt="" className="max-h-40 object-contain p-3" />
                          </div>
                        )}
                        <div className="flex flex-col gap-2 mb-4">
                          {p.opciones.map((op, j) => (
                            <div key={j} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium ${j === p.correcta ? "border-emerald-500/50 text-emerald-300" : "border-slate-700/40 text-slate-500"}`}
                              style={{ background: j === p.correcta ? "rgba(16,185,129,0.06)" : "transparent" }}>
                              <span className={`w-6 h-6 rounded-lg border-2 border-current flex items-center justify-center flex-shrink-0 text-xs font-black ${j === p.correcta ? "bg-emerald-500/20" : ""}`}>
                                {j === p.correcta ? "✓" : String.fromCharCode(65 + j)}
                              </span>
                              <span className="flex-1">{op}</span>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-xl border border-slate-700/40 px-4 py-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">💡 Explicación</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{p.explicacion}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LIBRO DEL CONDUCTOR ──────────────────────────────────────────────────────
function LibroConductor({ onVolver }) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-800 flex-shrink-0">
        <button onClick={onVolver} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-semibold">
          ← Volver
        </button>
        <div className="w-px h-4 bg-slate-700" />
        <h2 className="text-white font-black text-lg">📖 Manual del Conductor</h2>
        <a href="https://mejoresconductores.conaset.cl/assets/data/pdf/B-ESP/Libro_para_la_conduccion_en_Chile_Clase%20B_actualizacion_6_de_agosto_2024.pdf"
          target="_blank" rel="noopener noreferrer"
          className="ml-auto text-xs text-blue-400 hover:text-blue-300 font-semibold px-3 py-1.5 rounded-xl border border-blue-500/30 hover:border-blue-500/60 transition-all">
          Abrir en nueva pestaña ↗
        </a>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src="https://mejoresconductores.conaset.cl/assets/data/pdf/B-ESP/Libro_para_la_conduccion_en_Chile_Clase%20B_actualizacion_6_de_agosto_2024.pdf"
          className="w-full h-full border-0"
          title="Manual del Conductor CONASET"
        />
      </div>
    </div>
  );
}

// ─── REVISION CONTENT ────────────────────────────────────────────────────────
function RevisionContent({ preguntas, respuestas, user, guardado, guardando, onShowAuth }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-0 py-5 md:py-0">
      <div className="w-full max-w-4xl md:mx-auto">
        <AnimatePresence>
          {!user && !guardado && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl border border-blue-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ background: "rgba(59,130,246,0.06)" }}>
              <div className="flex-1">
                <p className="text-white font-bold text-sm mb-1">¿Quieres guardar tu progreso?</p>
                <p className="text-slate-400 text-xs leading-relaxed">Crea una cuenta gratis para llevar historial, racha de días y ver tus errores por categoría.</p>
              </div>
              <button onClick={onShowAuth}
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm outline-none border-0">
                Registrarse gratis →
              </button>
            </motion.div>
          )}
          {guardando && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl border border-slate-700/40 bg-slate-800/40 p-4 text-slate-500 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> Guardando resultado...
            </motion.div>
          )}
          {guardado && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-emerald-400 text-sm flex items-center gap-2">
              ✓ Resultado guardado en tu perfil
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-y-4 md:space-y-6">
          {preguntas.map((p, i) => {
            const ok = respuestas[i] === p.correcta;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className={`rounded-2xl border ${ok ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                <div className="px-4 md:px-8 pt-5 md:pt-8 pb-4 md:pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm font-bold uppercase tracking-widest ${ok ? "text-emerald-400" : "text-red-400"}`}>
                      {ok ? "✓ Correcta" : "✗ Incorrecta"} · Pregunta {i + 1}
                    </span>
                    {p.puntaje === 2 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">⭐ 2 pts</span>
                    )}
                  </div>
                  <p className="text-white font-black text-lg md:text-2xl leading-snug mb-4">{p.pregunta}</p>
                  {p.imagen && (
                    <div className="mb-4 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/40 flex items-center justify-center">
                      <img src={p.imagen} alt="" className="max-h-48 w-auto object-contain p-3" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 md:gap-3 px-4 md:px-8 pb-4 md:pb-6">
                  {p.opciones.map((op, j) => {
                    const esCorrecta = j === p.correcta;
                    const esRespuesta = j === respuestas[i];
                    const esIncorrecta = esRespuesta && !esCorrecta;
                    return (
                      <div key={j} className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl border-2 text-sm md:text-base font-medium ${
                        esCorrecta ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" :
                        esIncorrecta ? "border-red-500 bg-red-500/10 text-red-300" :
                        "border-slate-700/40 bg-slate-800/20 text-slate-500"
                      }`}>
                        <span className={`w-7 h-7 md:w-8 md:h-8 rounded-xl border-2 border-current flex items-center justify-center flex-shrink-0 font-black text-xs ${
                          esCorrecta ? "bg-emerald-500/20" : esIncorrecta ? "bg-red-500/20" : ""
                        }`}>
                          {esCorrecta ? "✓" : esIncorrecta ? "✗" : String.fromCharCode(65 + j)}
                        </span>
                        <span className="flex-1">{op}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mx-4 md:mx-8 mb-5 md:mb-8 px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">💡 Explicación</p>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">{p.explicacion}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ─── RESULTADO INTELIGENTE ────────────────────────────────────────────────────
function ResultadoInteligente({ onReintentar, onVolver }) {
  const { respuestas, preguntas } = useStore();

  const correctas = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;
  const total = preguntas.length;
  const pct = Math.round((correctas / total) * 100);

  // Categorías que siguen fallando en esta sesión
  const categoriasFalladas = {};
  Object.entries(respuestas).forEach(([i, r]) => {
    const p = preguntas[+i];
    if (!p || r === p.correcta) return;
    categoriasFalladas[p.categoria] = (categoriasFalladas[p.categoria] || 0) + 1;
  });
  const topFalladas = Object.entries(categoriasFalladas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const mensajeCerebro = () => {
    if (pct === 100) return "¡Perfecto! Dominaste todas tus preguntas débiles. Estás listo para el examen real.";
    if (pct >= 70) return `Buen progreso. Sigue reforzando ${topFalladas[0]?.[0] ?? "las categorías débiles"} y estarás listo.`;
    if (pct >= 40) return `Aún te cuesta ${topFalladas.map(([c]) => c).join(", ")}. Repasa esas categorías en el banco de preguntas.`;
    return `Necesitas repasar con más calma. Enfócate en ${topFalladas[0]?.[0] ?? "las bases"} antes de intentar el examen.`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center w-full h-full px-6 py-10"
      style={{ background: "#0a0f1a" }}>

      {/* Glow de fondo */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.10) 0%, transparent 70%)" }} />

      {/* Cerebro flotante */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl mb-6 relative z-10">
        🧠
      </motion.div>

      {/* Puntaje */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="relative z-10 w-32 h-32 rounded-full border-4 border-purple-500 flex flex-col items-center justify-center mb-6"
        style={{ boxShadow: "0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(168,85,247,0.15)" }}>
        <span className="text-4xl font-black text-white">{pct}%</span>
        <span className="text-xs text-slate-500 mt-1">{correctas}/{total}</span>
      </motion.div>

      {/* Hint del cerebro */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 max-w-sm text-center mb-4 px-5 py-4 rounded-2xl border border-purple-500/30"
        style={{ background: "rgba(168,85,247,0.08)" }}>
        <p className="text-purple-300 text-sm font-semibold leading-relaxed">{mensajeCerebro()}</p>
      </motion.div>

      {/* Top categorías falladas */}
      {topFalladas.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="relative z-10 flex flex-wrap gap-2 justify-center mb-8">
          {topFalladas.map(([cat, n]) => (
            <span key={cat} className="text-xs px-2.5 py-1 rounded-full border border-red-500/30 text-red-300"
              style={{ background: "rgba(239,68,68,0.08)" }}>
              {cat} · {n} fallas
            </span>
          ))}
        </motion.div>
      )}

      {/* Botones */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 flex flex-col gap-2.5 w-full max-w-xs">
        <button onClick={onReintentar}
          className="w-full py-3.5 rounded-2xl font-bold text-white border-0 outline-none"
          style={{ background: "rgba(168,85,247,0.7)" }}>
          🔄 Repasar de nuevo
        </button>
        <button onClick={onVolver}
          className="w-full py-3.5 rounded-2xl font-semibold text-slate-400 border border-slate-700 bg-transparent outline-none">
          Volver al inicio
        </button>
      </motion.div>
    </motion.div>
  );
}


















// ─── RESULTADO ────────────────────────────────────────────────────────────────
function Resultado({ user, onAuthSuccess }) {
  const { respuestas, tiemposRespuesta, reiniciar, modo, clase, iniciar, preguntas } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [vistaMovil, setVistaMovil] = useState("score");

  const correctas = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;
  const total = preguntas.length;
  const pct = Math.round((correctas / total) * 100);
  const puntajeObtenido = Object.entries(respuestas).reduce((acc, [i, r]) => {
    const p = preguntas[+i]; if (!p) return acc;
    return acc + (p.correcta === r ? (p.puntaje ?? 1) : 0);
  }, 0);
  const puntajeMaximo = preguntas.reduce((acc, p) => acc + (p.puntaje ?? 1), 0);
  const aprobado = puntajeObtenido >= 33;

  useEffect(() => {
    if (user && !guardado) {
      setGuardando(true);
Promise.allSettled([
  guardarResultado({ userId: user.id, preguntas, respuestas, modo, clase, puntajeObtenido, puntajeMaximo }),
  guardarSesionAdaptativa(user.id, preguntas, respuestas, clase, tiemposRespuesta ?? {}),
])
  .then(() => setGuardado(true))
  .finally(() => setGuardando(false));
    }
  }, [user]);

  const handleAuthSuccess = async (modoAuth, email, password) => {
    const u = await onAuthSuccess(modoAuth, email, password);
    setShowAuthModal(false);
    setGuardando(true);
    await guardarResultado({ userId: u.id, preguntas, respuestas, modo, clase, puntajeObtenido, puntajeMaximo });
    setGuardando(false);
    setGuardado(true);
    return u;
  };

  return (
    <>
      <AnimatePresence>
        {showAuthModal && <AuthModal onSuccess={handleAuthSuccess} onClose={() => setShowAuthModal(false)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="flex w-full h-full overflow-hidden flex-col md:flex-row">

        {/* Wrapper móvil con AnimatePresence para slide entre vistas */}
        <div className="md:contents">
          <div className="md:hidden absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <AnimatePresence mode="wait" initial={false}>
              {vistaMovil === "score" ? (
                <motion.div key="score-mobile"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 overflow-hidden"
                  style={{ background: "#0a0f1a" }}>

                  {/* Fondo glow */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: aprobado
                      ? "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.12) 0%, transparent 70%)"
                      : "radial-gradient(ellipse at 50% 30%, rgba(239,68,68,0.10) 0%, transparent 70%)" }} />

                  <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                    className="text-6xl mb-4 relative z-10">{aprobado ? "🎉" : "📚"}</motion.div>

                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
                    className={`text-3xl font-black mb-1.5 relative z-10 ${aprobado ? "text-emerald-400" : "text-red-400"}`}>
                    {aprobado ? "¡Aprobaste!" : "No aprobaste"}
                  </motion.h2>

                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-slate-500 text-center text-sm mb-6 leading-relaxed relative z-10">
                    {aprobado ? "Excelente. Estás listo para el examen real." : "Sigue practicando, ya casi lo logras."}
                  </motion.p>

                  <div className="relative mb-6 z-10">
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 140, damping: 12 }}
                      className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center ${aprobado ? "border-emerald-500" : "border-red-500"}`}
                      style={{ boxShadow: aprobado ? "0 0 40px rgba(16,185,129,0.25), 0 0 80px rgba(16,185,129,0.1)" : "0 0 40px rgba(239,68,68,0.2), 0 0 80px rgba(239,68,68,0.08)" }}>
                      <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
                        className="text-5xl font-black text-white leading-none">{pct}%</motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                        className="text-xs text-slate-500 mt-1">{correctas} / {total}</motion.span>
                    </motion.div>
                    <motion.div initial={{ scale: 0.8, opacity: 0.6 }} animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                      className={`absolute inset-0 rounded-full border-4 ${aprobado ? "border-emerald-500" : "border-red-500"}`} />
                  </div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="flex gap-8 mb-6 relative z-10">
                    {[
                      { val: correctas, label: "Correctas", color: "text-emerald-400", delay: 0.55 },
                      { val: total - correctas, label: "Incorrectas", color: "text-red-400", delay: 0.65 },
                      { val: 33, label: "Mínimo", color: "text-blue-400", delay: 0.75 },
                    ].map(({ val, label, color, delay }) => (
                      <div key={label} className="text-center">
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay, type: "spring", stiffness: 220, damping: 12 }}
                          className={`text-2xl font-black ${color}`}>{val}</motion.div>
                        <div className="text-xs text-slate-500 mt-1">{label}</div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, type: "spring", stiffness: 180 }}
                    className="flex flex-col gap-2.5 w-full relative z-10">
                    <motion.button whileTap={{ scale: 0.96 }} onClick={() => setVistaMovil("revision")}
                      className="w-full border-2 border-blue-500/50 text-blue-400 font-bold py-3.5 rounded-2xl bg-transparent outline-none">
                      📋 Revisar respuestas
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }} onClick={() => iniciar(modo)}
                      className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/20">
                      Intentar de nuevo
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.96 }} onClick={reiniciar}
                      className="w-full border border-slate-700 text-slate-400 font-semibold py-3.5 rounded-2xl bg-transparent outline-none">
                      Volver a inicio
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="revision-mobile"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex flex-col overflow-hidden"
                  style={{ background: "#0a0f1a" }}>
                  {/* Header fijo */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 flex-shrink-0"
                    style={{ background: "rgba(10,15,26,0.97)", backdropFilter: "blur(12px)" }}>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setVistaMovil("score")}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 border-0 outline-none flex-shrink-0">
                      ←
                    </motion.button>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black text-sm leading-none">Revisión de respuestas</p>
                      <p className="text-slate-500 text-xs mt-0.5">{correctas} correctas · {total - correctas} incorrectas</p>
                    </div>
                  </div>
                  {/* Contenido real de revisión */}
                  <RevisionContent
                    preguntas={preguntas} respuestas={respuestas}
                    user={user} guardado={guardado} guardando={guardando}
                    onShowAuth={() => setShowAuthModal(true)}
                    mobile={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Score panel — SOLO DESKTOP */}
        <div className={`md:w-96 flex-shrink-0 md:border-r border-slate-800 flex-col items-center justify-center px-6 py-8 md:p-10 hidden md:flex relative overflow-hidden`}>

          {/* Fondo glow aprobado/reprobado */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: aprobado
              ? "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 30%, rgba(239,68,68,0.10) 0%, transparent 70%)"
            }}
          />

          {/* Emoji con bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
            className="text-6xl md:text-8xl mb-4 md:mb-5 relative z-10">
            {aprobado ? "🎉" : "📚"}
          </motion.div>

          {/* Título con slide */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
            className={`text-3xl md:text-4xl font-black mb-1.5 relative z-10 ${aprobado ? "text-emerald-400" : "text-red-400"}`}>
            {aprobado ? "¡Aprobaste!" : "No aprobaste"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-slate-500 text-center text-sm mb-6 md:mb-8 leading-relaxed relative z-10">
            {aprobado ? "Excelente. Estás listo para el examen real." : "Sigue practicando, ya casi lo logras."}
          </motion.p>

          {/* Círculo puntaje con ring animado */}
          <div className="relative mb-6 md:mb-8 z-10">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 140, damping: 12 }}
              className={`w-36 h-36 md:w-44 md:h-44 rounded-full border-4 flex flex-col items-center justify-center ${aprobado ? "border-emerald-500" : "border-red-500"} shadow-2xl`}
              style={{ boxShadow: aprobado ? "0 0 40px rgba(16,185,129,0.25), 0 0 80px rgba(16,185,129,0.1)" : "0 0 40px rgba(239,68,68,0.2), 0 0 80px rgba(239,68,68,0.08)" }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
                className="text-5xl md:text-6xl font-black text-white leading-none">
                {pct}%
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="text-xs md:text-sm text-slate-500 mt-1">
                {correctas} / {total}
              </motion.span>
            </motion.div>
            {/* Ring pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className={`absolute inset-0 rounded-full border-4 ${aprobado ? "border-emerald-500" : "border-red-500"}`}
            />
          </div>

          {/* Stats con stagger */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 md:gap-10 mb-6 md:mb-8 relative z-10">
            {[
              { val: correctas, label: "Correctas", color: "text-emerald-400", delay: 0.55 },
              { val: total - correctas, label: "Incorrectas", color: "text-red-400", delay: 0.65 },
              { val: 33, label: "Mínimo", color: "text-blue-400", delay: 0.75 },
            ].map(({ val, label, color, delay }) => (
              <div key={label} className="text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay, type: "spring", stiffness: 220, damping: 12 }}
                  className={`text-2xl md:text-3xl font-black ${color}`}>
                  {val}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, type: "spring", stiffness: 180 }}
            className="flex flex-col gap-2.5 w-full max-w-xs md:max-w-none relative z-10">
            <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
              onClick={() => setVistaMovil("revision")}
              className="md:hidden w-full border-2 border-blue-500/50 text-blue-400 font-bold py-3.5 rounded-2xl transition-all bg-transparent outline-none">
              📋 Revisar respuestas
            </motion.button>
            <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
              onClick={() => iniciar(modo)}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/20">
              Intentar de nuevo
            </motion.button>
            <motion.button whileTap={{ scale: 0.96 }}
              onClick={reiniciar}
              className="w-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 font-semibold py-3.5 rounded-2xl transition-all bg-transparent outline-none">
              Volver a inicio
            </motion.button>
          </motion.div>
        </div>

        {/* Revisión — SOLO DESKTOP */}
        <div className="flex-1 hidden md:flex flex-col overflow-y-auto">
          <div className="px-16 pt-10 pb-2">
            <h3 className="text-3xl font-black text-white mb-8">Revisión de respuestas</h3>
          </div>
          <RevisionContent
            preguntas={preguntas} respuestas={respuestas}
            user={user} guardado={guardado} guardando={guardando}
            onShowAuth={() => setShowAuthModal(true)}
          />
        </div>
      </motion.div>
    </>
  );
}
// ─── SELECTOR DE CLASE
function SelectorClase({ modo, onSeleccionar, onCancelar, user }) {
  const [inteligente] = useState(true);
  const nombreModo = modo === "examen" ? "Modo Examen" : modo === "estudio" ? "Modo Estudio" : "Modo Inteligente";
  const colorModo = modo === "examen" ? "blue" : modo === "estudio" ? "amber" : "emerald";
  const colors = {
    blue:    { badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",    glow: "rgba(59,130,246,0.08)" },
    amber:   { badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",  glow: "rgba(245,158,11,0.08)" },
    emerald: { badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glow: "rgba(34,197,94,0.08)" },
  };
  const c = colors[colorModo];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:px-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onCancelar}>

      {/* Mobile: bottom sheet con drag to close */}
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 35 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => { if (info.offset.y > 80) onCancelar(); }}
        className="md:hidden relative w-full rounded-t-3xl border-t border-slate-700/60 px-5 pt-4 pb-10 overflow-y-auto"
        style={{ background: "#0d1626", maxHeight: "92vh" }}
        onClick={e => e.stopPropagation()}>

        {/* Handle */}
        <div className="w-12 h-1.5 rounded-full bg-slate-600 mx-auto mb-5" />

        <div className="flex items-center justify-between mb-5">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge} uppercase tracking-widest`}>{nombreModo}</span>
            <h2 className="text-xl font-black text-white mt-2">¿Qué licencia quieres practicar?</h2>
          </div>
          <button onClick={onCancelar} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-0 outline-none transition-colors flex-shrink-0 ml-3">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

       

        <div className="flex flex-col gap-3">
          <button onClick={() => onSeleccionar(modo, "B")}
            className="text-left p-4 rounded-2xl border-2 transition-all active:scale-98 outline-none border-blue-500/30 hover:border-blue-500"
            style={{ background: "rgba(59,130,246,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-2xl flex-shrink-0">🚗</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-black">Clase B</span>
                  <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Automóvil</span>
                </div>
                <p className="text-slate-400 text-xs leading-snug">El examen clásico del CONASET. 216 preguntas →</p>
              </div>
            </div>
          </button>
          <button onClick={() => onSeleccionar(modo, "C")}
            className="text-left p-4 rounded-2xl border-2 transition-all active:scale-98 outline-none border-orange-500/30 hover:border-orange-500"
            style={{ background: "rgba(249,115,22,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-2xl flex-shrink-0">🏍️</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-black">Clase C</span>
                  <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Motocicleta</span>
                </div>
                <p className="text-slate-400 text-xs leading-snug">Motocicletas y motonetas. {PREGUNTAS_MOTO.length} preguntas →</p>
              </div>
            </div>
          </button>
        </div>
        <p className="text-xs text-slate-600 text-center mt-4">Preguntas oficiales del Cuestionario Base CONASET · Chile</p>
      </motion.div>

      {/* Desktop: modal centrado (igual que antes) */}
      <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="hidden md:block w-full max-w-md rounded-3xl border border-slate-700/60 p-8"
        style={{ background: "#0d1626" }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge} uppercase tracking-widest`}>{nombreModo}</span>
            <h2 className="text-2xl font-black text-white mt-3">¿Qué licencia quieres practicar?</h2>
          </div>
          <button onClick={onCancelar} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-0 outline-none transition-colors flex-shrink-0 ml-4">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

       

        <div className="flex flex-col gap-3">
          <button onClick={() => onSeleccionar(modo, "B")}
            className="text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 active:scale-98 outline-none group border-blue-500/30 hover:border-blue-500"
            style={{ background: "rgba(59,130,246,0.06)" }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-3xl flex-shrink-0">🚗</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-black text-lg">Clase B</span>
                  <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Automóvil</span>
                </div>
                <p className="text-slate-400 text-sm leading-snug">Vehículos de hasta 9 pasajeros y 3.500 kg. El examen clásico del CONASET.</p>
                <p className="text-blue-400 text-sm font-semibold mt-2">216 preguntas disponibles →</p>
              </div>
            </div>
          </button>

          <button onClick={() => onSeleccionar(modo, "C")}
            className="text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 active:scale-98 outline-none group border-orange-500/30 hover:border-orange-500"
            style={{ background: "rgba(249,115,22,0.06)" }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-3xl flex-shrink-0">🏍️</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-black text-lg">Clase C</span>
                  <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Motocicleta</span>
                </div>
                <p className="text-slate-400 text-sm leading-snug">Motocicletas y motonetas de 2 o 3 ruedas. Preguntas específicas de moto.</p>
                <p className="text-orange-400 text-sm font-semibold mt-2">{PREGUNTAS_MOTO.length} preguntas disponibles →</p>
              </div>
            </div>
          </button>
        </div>

        <p className="text-xs text-slate-600 text-center mt-5">Preguntas oficiales del Cuestionario Base CONASET · Chile</p>
      </motion.div>
    </motion.div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { pantalla, modo } = useStore();
  const { user, loading, registrar, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalModo, setAuthModalModo] = useState("login");
  const [pantallaExtra, setPantallaExtra] = useState(null);
  const [claseExtra, setClaseExtra] = useState("B");
  const [claseGlobal, setClaseGlobal] = useState("B");
  const [claseSeleccionada, setClaseSeleccionada] = useState("B");
  const handleClaseChange = (c) => { setClaseGlobal(c); setClaseSeleccionada(c); };
  const [legalTipo, setLegalTipo] = useState(null);
  const [selectorClase, setSelectorClase] = useState(null);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center" style={{ background: "#0a0f1a" }}>
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const handleIniciar = (modo, clase) => {
    if (user && clase) {
      // Viene del Dashboard con clase ya seleccionada — saltar SelectorClase
      handleIniciarConClase(modo, clase);
    } else {
      setSelectorClase(modo);
    }
  };
const handleIniciarConClase = async (modo, clase) => {
  setSelectorClase(null);
  setPantallaExtra(null);
  if (user && modo === "inteligente") {
    try {
      const debiles = await obtenerPreguntasDebiles(user.id, clase);
      if (debiles.length > 0) {
        useStore.getState().iniciar(modo, clase, debiles);
      } else {
        useStore.getState().iniciar(modo, clase);
      }
    } catch {
      useStore.getState().iniciar(modo, clase);
    }
  } else if (user && modo !== "inteligente") {
    try {
      const preguntasAdaptativas = await generarExamenAdaptativo(user.id, clase);
      useStore.getState().iniciar(modo, clase, preguntasAdaptativas);
    } catch {
      useStore.getState().iniciar(modo, clase);
    }
  } else {
    useStore.getState().iniciar(modo, clase);
  }
};
  const handleCancelarSelector = () => { setSelectorClase(null); };

  const handleAuthSuccess = async (modoAuth, email, password) => {
    if (modoAuth === "registro") return await registrar(email, password);
    return await login(email, password);
  };

  const handleLogout = async () => {
    await logout();
    setPantallaExtra(null);
    useStore.getState().reiniciar();
  };

  const handleLoginClick = () => { setAuthModalModo("login"); setShowAuthModal(true); };
  const handleLegal = (tipo) => setLegalTipo(tipo);
  const mostrarDashboard = user && pantalla === "inicio" && !pantallaExtra;

  return (
    <motion.div
      animate={{ background: claseGlobal === "C" ? "#0f0b08" : "#0a0f1a" }}
      transition={{ duration: 0.6 }}
      className="w-screen h-screen overflow-hidden flex flex-col">
      <motion.div
        animate={{
          background: claseGlobal === "C"
            ? "radial-gradient(ellipse at 0% 100%, rgba(100,45,0,0.12) 0%, transparent 35%)"
            : "radial-gradient(ellipse at 15% 50%, #0f2040 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, #0d1f3c 0%, transparent 50%)"
        }}
        transition={{ duration: 0.6 }}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal modoInicial={authModalModo} onSuccess={async (m, e, p) => { const u = await handleAuthSuccess(m, e, p); setShowAuthModal(false); return u; }} onClose={() => setShowAuthModal(false)} />
        )}
        {selectorClase && (
          <SelectorClase modo={selectorClase} onSeleccionar={handleIniciarConClase} onCancelar={handleCancelarSelector} user={user} />
        )}
        {legalTipo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            onClick={() => setLegalTipo(null)}>
            <motion.div initial={{ scale: 0.94, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-slate-700/60 p-8"
              style={{ background: "#0d1626" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-white capitalize">{legalTipo}</h2>
                <button onClick={() => setLegalTipo(null)} className="w-6 h-6 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-colors ml-4 flex-shrink-0 bg-slate-700 hover:bg-slate-600 border-0 outline-none text-sm">
                  X
                </button>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {legalTipo === "privacidad" && "ManejaCL no recopila ni vende datos personales. Tu email se usa únicamente para identificar tu cuenta y guardar tu progreso. No enviamos spam."}
                {legalTipo === "terminos" && "ManejaCL es una herramienta de estudio sin fines de lucro. Las preguntas provienen del Cuestionario Base CONASET de dominio público. No garantizamos resultados en el examen real."}
                {legalTipo === "contacto" && "¿Tienes dudas, errores o sugerencias? Escríbenos a contacto@maneja.cl y te respondemos a la brevedad."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {pantallaExtra === "banco" && user && (
            <motion.div key="banco" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BancoPreguntas onVolver={() => setPantallaExtra(null)} clase={claseExtra} />
            </motion.div>
          )}
          {pantallaExtra === "libro" && user && (
            <motion.div key="libro" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LibroConductor onVolver={() => setPantallaExtra(null)} />
            </motion.div>
          )}
          {mostrarDashboard && !pantallaExtra && (
            <motion.div key="dashboard" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard user={user} onIniciar={handleIniciar} onLogout={handleLogout}
                onBanco={(c) => { setClaseExtra(c || "B"); setPantallaExtra("banco"); }}
                onLibro={() => setPantallaExtra("libro")}
                onLegal={handleLegal}
                initialClase={claseSeleccionada}
                onClaseChange={handleClaseChange} />
            </motion.div>
          )}
          {!mostrarDashboard && pantalla === "inicio" && !pantallaExtra && (
            <Inicio key="inicio" onIniciar={handleIniciar} onLoginClick={handleLoginClick} onLegalClick={handleLegal} />
          )}
          {pantalla === "examen" && !pantallaExtra && (
            <motion.div key="examen" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {modo === "examen" ? <ModoExamen /> : <ModoEstudio />}
            </motion.div>
          )}
{pantalla === "resultado" && !pantallaExtra && (
  modo === "inteligente"
    ? <ResultadoInteligente key="resultado-int" onReintentar={() => handleIniciarConClase("inteligente", useStore.getState().clase)} onVolver={() => useStore.getState().reiniciar()} />
    : <Resultado key="resultado" user={user} onAuthSuccess={handleAuthSuccess} />
)}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}