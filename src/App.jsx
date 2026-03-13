import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import { generarExamen, PREGUNTAS } from "./preguntas.js";
import { generarExamenMoto, PREGUNTAS_MOTO } from "./preguntas_moto.js";
import { useAuth } from "./useAuth.js";
import { guardarResultado } from "./db.js";
import { guardarSesionAdaptativa, generarExamenAdaptativo } from "./adaptativo.js";
import { AuthModal } from "./AuthModal.jsx";
import { Dashboard } from "./Dashboard.jsx";

// ─── STORE ────────────────────────────────────────────────────────────────────
const useStore = create((set, get) => ({
  pantalla: "inicio",
  modo: "examen",
  clase: "B",
  preguntaActual: 0,
  respuestas: {},
  tiempoRestante: 45 * 60,
  preguntas: [],

  iniciar: (modo, clase = "B", preguntasAdaptativas = null) => {
    const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;
    const generarFn = clase === "C" ? generarExamenMoto : generarExamen;
    const preguntas = preguntasAdaptativas
      ? preguntasAdaptativas
      : modo === "libre"
        ? [...banco].sort(() => Math.random() - 0.5)
        : generarFn(35);
    set({
      pantalla: "examen",
      modo,
      clase,
      preguntaActual: 0,
      respuestas: {},
      tiempoRestante: modo === "libre" ? Infinity : 45 * 60,
      preguntas,
    });
  },

  reiniciar: () => set({ pantalla: "inicio", clase: "B", preguntaActual: 0, respuestas: {}, tiempoRestante: 45 * 60, preguntas: [] }),

  responder: (i) => {
    const { preguntaActual, respuestas, modo, preguntas } = get();
    if (respuestas[preguntaActual] !== undefined) return;
    const nuevas = { ...respuestas, [preguntaActual]: i };
    set({ respuestas: nuevas });
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
    if (modo === "libre") return;
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
    <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800 flex-shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={() => useStore.getState().reiniciar()} className="flex items-center gap-2 bg-transparent border-0 p-0 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-black text-white text-base">Maneja<span className="text-blue-400">CL</span></span>
        </button>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${modo === "examen" ? "bg-blue-500/20 text-blue-400" : modo === "libre" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
          {modo === "examen" ? "Examen" : modo === "libre" ? "Libre" : "Estudio"}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>
          {clase === "C" ? "C" : "B"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {modo !== "libre" && (
        <motion.span animate={{ color: urgente ? "#f87171" : "#e2e8f0" }} className="font-mono font-black text-sm">
          {fmt(tiempoRestante)}
        </motion.span>
        )}
        <button onClick={onMenuToggle} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 bg-transparent border-0 outline-none">
          {showMenu
            ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            : <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
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
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${modo === "examen" ? "bg-blue-500/20 text-blue-400" : modo === "libre" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
          {modo === "examen" ? "Examen" : modo === "libre" ? "Libre" : "Estudio"}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>
          {clase === "C" ? "C" : "B"}
        </span>
      </div>

      {modo !== "libre" && (
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
            className={`h-full rounded-full ${modo === "examen" ? "bg-blue-500" : modo === "libre" ? "bg-emerald-500" : "bg-amber-500"}`}
            animate={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {(modo === "estudio" || modo === "libre") && (
          <div className="flex justify-between text-xs">
            <span className="text-emerald-400 font-semibold">{correctasHasta} correctas</span>
            <span className="text-red-400 font-semibold">{Object.keys(respuestas).length - correctasHasta} incorrectas</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Preguntas</p>
        <div className={`grid gap-1 ${modo === "libre" ? "grid-cols-10" : "grid-cols-7 gap-1.5"}`}>
          {preguntas.map((_, i) => {
            const resp = respuestas[i];
            const esActual = i === preguntaActual;
            const respondida = resp !== undefined;
            const correcta = (modo === "estudio" || modo === "libre") && resp === preguntas[i]?.correcta;
            const incorrecta = (modo === "estudio" || modo === "libre") && respondida && resp !== preguntas[i]?.correcta;
            return (
              <button key={i}
                onClick={() => { if (modo === "estudio" || modo === "libre") { useStore.setState({ preguntaActual: i }); if (onClose) onClose(); } }}
                className={`${modo === "libre" ? "w-5 h-5 rounded text-[9px]" : "w-7 h-7 rounded-lg text-xs"} font-bold transition-all flex items-center justify-center ${
                  esActual ? (modo === "examen" ? "bg-blue-500 text-white scale-110" : modo === "libre" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white scale-110") :
                  correcta ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                  incorrecta ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                  respondida ? "bg-slate-600/40 text-slate-400 border border-slate-600/40" :
                  "bg-slate-800 text-slate-500 border border-slate-700"
                } ${modo === "examen" ? "cursor-default" : "hover:border-slate-500"}`}>
                {modo === "libre" ? "" : i + 1}
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

      {/* Botón login */}
      <div className="flex justify-end px-8 pt-4 pb-0 flex-shrink-0">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={onLoginClick}
          className="text-sm text-slate-400 hover:text-white font-semibold px-4 py-2 rounded-xl border border-slate-700/80 hover:border-slate-500 transition-all"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          Iniciar sesión
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="flex-1 flex flex-col items-center justify-center w-full mx-auto px-6 md:px-16 py-4 md:py-0" style={{ marginTop: "-40px", maxWidth: "1100px" }}>

        {/* Logo */}
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-4 md:mb-4">
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Título */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2">
          Maneja<span className="text-blue-400">CL</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-slate-400 text-center text-sm md:text-base mb-4 md:mb-5 max-w-md leading-relaxed">
          Practica el examen teórico CONASET completamente gratis. Preguntas oficiales, sin límites.
        </motion.p>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-3 sm:gap-8 md:gap-12 mb-4 md:mb-5 w-full max-w-lg">
          {[["B + C", "Clases"], ["100%", "Gratis"], ["45 min", "Examen"], ["2026", "Actualizado"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-xl md:text-3xl font-black text-white mb-0.5 whitespace-nowrap">{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

          <button onClick={() => onIniciar("examen")}
            className="text-left p-5 md:p-6 rounded-2xl border-2 border-blue-500/40 hover:border-blue-500 transition-all hover:-translate-y-1 active:scale-95 bg-transparent outline-none"
            style={{ background: "rgba(59,130,246,0.08)" }}>
            <div className="text-3xl mb-3">📋</div>
            <p className="text-white font-black text-base md:text-lg mb-1">Modo Examen</p>
            <p className="text-slate-400 text-sm leading-snug mb-3">Sin retroalimentación. Idéntico al examen real del CONASET.</p>
            <span className="text-blue-400 text-sm font-semibold">Iniciar →</span>
          </button>

          <button onClick={() => onIniciar("estudio")}
            className="text-left p-5 md:p-6 rounded-2xl border-2 border-amber-500/40 hover:border-amber-500 transition-all hover:-translate-y-1 active:scale-95 outline-none"
            style={{ background: "rgba(245,158,11,0.08)" }}>
            <div className="text-3xl mb-3">💡</div>
            <p className="text-white font-black text-base md:text-lg mb-1">Modo Estudio</p>
            <p className="text-slate-400 text-sm leading-snug mb-3">Feedback inmediato y explicaciones detalladas en cada pregunta.</p>
            <span className="text-amber-400 text-sm font-semibold">Estudiar →</span>
          </button>

          <button onClick={() => onIniciar("libre")}
            className="text-left p-5 md:p-6 rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-500 transition-all hover:-translate-y-1 active:scale-95 outline-none"
            style={{ background: "rgba(34,197,94,0.08)" }}>
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-white font-black text-base md:text-lg mb-1">Modo Libre</p>
            <p className="text-slate-400 text-sm leading-snug mb-3">Todas las preguntas, sin límite de tiempo. Para practicar a fondo.</p>
            <span className="text-emerald-400 text-sm font-semibold">Explorar →</span>
          </button>

          <button onClick={onLoginClick}
            className="text-left p-5 md:p-6 rounded-2xl border-2 border-slate-700/50 hover:border-slate-500 transition-all hover:-translate-y-1 active:scale-95 outline-none"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="text-3xl mb-3">📚</div>
            <p className="text-white font-black text-base md:text-lg mb-1">Banco de Preguntas</p>
            <p className="text-slate-400 text-sm leading-snug mb-3">Revisa las preguntas con respuestas y explicaciones. Clase B y C.</p>
            <span className="text-slate-500 text-sm font-semibold">🔒 Requiere cuenta</span>
          </button>

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
function BancoPreguntas({ onVolver }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [expandida, setExpandida] = useState(null);
  const scrollRef = useRef(null);

  const categorias = ["Todas", ...Array.from(new Set(PREGUNTAS.map(p => p.categoria))).sort()];

  const filtradas = busqueda.trim() === "" && categoriaFiltro === "Todas"
    ? PREGUNTAS
    : PREGUNTAS.filter(p => {
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
                    {PREGUNTAS.filter(p => p.categoria === cat).length}
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

// ─── RESULTADO ────────────────────────────────────────────────────────────────
function Resultado({ user, onAuthSuccess }) {
  const { respuestas, reiniciar, modo, clase, iniciar, preguntas } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const correctas = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;
  const total = preguntas.length;
  const puntajeObtenido = Object.entries(respuestas).reduce((acc, [i, r]) => {
    const p = preguntas[+i]; if (!p) return acc;
    return acc + (p.correcta === r ? (p.puntaje ?? 1) : 0);
  }, 0);
  const puntajeMaximo = preguntas.reduce((acc, p) => acc + (p.puntaje ?? 1), 0);
  const aprobado = puntajeObtenido >= 33;

  // Si ya tiene sesión: guardar automáticamente
  useEffect(() => {
    if (user && !guardado) {
      setGuardando(true);
      console.log("Guardando examen — modo:", modo, "clase:", clase);
      Promise.all([
        guardarResultado({ userId: user.id, preguntas, respuestas, modo, clase, puntajeObtenido, puntajeMaximo }),
        guardarSesionAdaptativa(user.id, preguntas, respuestas, clase),
      ])
        .then(() => setGuardado(true))
        .catch(console.error)
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

        {/* Score panel */}
        <div className="md:w-80 lg:w-96 xl:w-[420px] flex-shrink-0 md:border-r border-slate-800 flex flex-col items-center justify-center p-6 md:p-10 border-b md:border-b-0">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, delay: 0.1 }} className="text-5xl md:text-7xl mb-4 md:mb-6">
            {aprobado ? "🎉" : "📚"}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`text-3xl md:text-4xl font-black mb-2 ${aprobado ? "text-emerald-400" : "text-red-400"}`}>
            {aprobado ? "¡Aprobaste!" : "No aprobaste"}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-500 text-center text-sm mb-5 md:mb-8 leading-relaxed">
            {aprobado ? "Excelente. Estás listo para el examen real." : "Sigue practicando, ya casi lo logras."}
          </motion.p>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 flex flex-col items-center justify-center mb-5 md:mb-8 ${aprobado ? "border-emerald-500 shadow-emerald-500/20" : "border-red-500 shadow-red-500/20"} shadow-2xl`}>
            <span className="text-4xl md:text-5xl font-black text-white">{puntajeObtenido}</span>
            <span className="text-xs md:text-sm text-slate-500 mt-1">de {puntajeMaximo} pts</span>
          </motion.div>
          <div className="flex gap-4 md:gap-6 mb-5 md:mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400">{correctas}</div>
              <div className="text-xs text-slate-500 mt-1">Correctas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-red-400">{total - correctas}</div>
              <div className="text-xs text-slate-500 mt-1">Incorrectas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-blue-400">33</div>
              <div className="text-xs text-slate-500 mt-1">Mínimo</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs md:max-w-none">
            <button onClick={() => iniciar(modo)} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/20">
              Intentar de nuevo
            </button>
            <button onClick={reiniciar} className="w-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 font-semibold py-3.5 rounded-2xl transition-all bg-transparent outline-none">
              Cambiar modo
            </button>
          </div>
        </div>

        {/* Revisión */}
        <div className="flex-1 overflow-y-auto flex justify-center px-4 md:px-16 py-6 md:py-10">
          <div className="w-full max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-5 md:mb-8">Revisión de respuestas</h3>

            {/* Banner guardar progreso */}
            <AnimatePresence>
              {!user && !guardado && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mb-6 rounded-2xl border border-blue-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  style={{ background: "rgba(59,130,246,0.06)" }}>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm mb-1">¿Quieres guardar tu progreso?</p>
                    <p className="text-slate-400 text-xs leading-relaxed">Crea una cuenta gratis para llevar historial, racha de días y ver tus errores por categoría.</p>
                  </div>
                  <button onClick={() => setShowAuthModal(true)}
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
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
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
                          <img src={p.imagen} alt="Imagen de la pregunta" className="max-h-48 w-auto object-contain p-3" />
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
                            <span className={`w-7 h-7 md:w-8 md:h-8 rounded-xl border-2 border-current flex items-center justify-center flex-shrink-0 font-black text-xs ${esCorrecta ? "bg-emerald-500/20" : esIncorrecta ? "bg-red-500/20" : ""}`}>
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
      </motion.div>
    </>
  );
}

// ─── SELECTOR DE CLASE ────────────────────────────────────────────────────────
function SelectorClase({ modo, onSeleccionar, onCancelar, user }) {
  const [inteligente, setInteligente] = useState(!!user); // activado por defecto si tiene cuenta
  const nombreModo = modo === "examen" ? "Modo Examen" : modo === "estudio" ? "Modo Estudio" : "Modo Libre";
  const colorModo = modo === "examen" ? "blue" : modo === "estudio" ? "amber" : "emerald";
  const colors = {
    blue:    { badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",    glow: "rgba(59,130,246,0.08)" },
    amber:   { badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",  glow: "rgba(245,158,11,0.08)" },
    emerald: { badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glow: "rgba(34,197,94,0.08)" },
  };
  const c = colors[colorModo];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onCancelar}>
      <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="w-full max-w-md rounded-3xl border border-slate-700/60 p-8"
        style={{ background: "#0d1626" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge} uppercase tracking-widest`}>{nombreModo}</span>
            <h2 className="text-2xl font-black text-white mt-3">¿Qué licencia quieres practicar?</h2>
          </div>
          <button onClick={onCancelar} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-0 outline-none transition-colors flex-shrink-0 ml-4">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Toggle selección inteligente */}
        {user && (
          <motion.button
            onClick={() => setInteligente(v => !v)}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl border mb-4 transition-all outline-none text-left"
            style={{
              borderColor: inteligente ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.07)",
              background: inteligente ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.02)",
            }}>
            <div className="text-xl flex-shrink-0">🧠</div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold ${inteligente ? "text-purple-300" : "text-slate-400"}`}>Selección inteligente</p>
              <p className="text-slate-600 text-xs mt-0.5">
                {inteligente ? "Priorizará tus preguntas débiles automáticamente" : "Selección aleatoria estándar"}
              </p>
            </div>
            {/* Toggle switch */}
            <div className={`w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${inteligente ? "bg-purple-500" : "bg-slate-700"}`}>
              <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
                animate={{ left: inteligente ? "calc(100% - 22px)" : "2px" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </motion.button>
        )}

        {/* Cards de clase */}
        <div className="flex flex-col gap-3">
          {/* Clase B */}
          <button onClick={() => onSeleccionar(modo, "B", inteligente)}
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

          {/* Clase C */}
          <button onClick={() => onSeleccionar(modo, "C", inteligente)}
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
  const [legalTipo, setLegalTipo] = useState(null);
  const [selectorClase, setSelectorClase] = useState(null); // null | "examen" | "estudio" | "libre"

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center" style={{ background: "#0a0f1a" }}>
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const handleIniciar = (modo) => { setSelectorClase(modo); };
  const handleIniciarConClase = async (modo, clase, usarInteligente = false) => {
    setSelectorClase(null);
    setPantallaExtra(null);
    if (usarInteligente && user) {
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
    <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background: "#0a0f1a" }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 15% 50%, #0f2040 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, #0d1f3c 0%, transparent 50%)",
      }} />
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
          {/* Banco de preguntas — requiere login */}
          {pantallaExtra === "banco" && user && (
            <motion.div key="banco" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BancoPreguntas onVolver={() => setPantallaExtra(null)} />
            </motion.div>
          )}
          {/* Libro del conductor */}
          {pantallaExtra === "libro" && user && (
            <motion.div key="libro" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LibroConductor onVolver={() => setPantallaExtra(null)} />
            </motion.div>
          )}
          {/* Dashboard */}
          {mostrarDashboard && !pantallaExtra && (
            <motion.div key="dashboard" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard user={user} onIniciar={handleIniciar} onLogout={handleLogout}
                onBanco={() => setPantallaExtra("banco")}
                onLibro={() => setPantallaExtra("libro")}
                onLegal={handleLegal} />
            </motion.div>
          )}
          {/* Inicio sin sesión */}
          {!mostrarDashboard && pantalla === "inicio" && !pantallaExtra && (
            <Inicio key="inicio" onIniciar={handleIniciar} onLoginClick={handleLoginClick} onLegalClick={handleLegal} />
          )}
          {/* Examen */}
          {pantalla === "examen" && !pantallaExtra && (
            <motion.div key="examen" className="flex w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {modo === "examen" ? <ModoExamen /> : <ModoEstudio />}
            </motion.div>
          )}
          {/* Resultado */}
          {pantalla === "resultado" && !pantallaExtra && (
            <Resultado key="resultado" user={user} onAuthSuccess={handleAuthSuccess} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}