import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { obtenerDashboard, obtenerDetalleExamen, eliminarExamen } from "./db";
import { calcularProbabilidadAprobar, obtenerResumenAdaptativo } from "./adaptativo";
import { PREGUNTAS } from "./preguntas";
import { PREGUNTAS_MOTO } from "./preguntas_moto";

const TODAS_PREGUNTAS = [...PREGUNTAS, ...PREGUNTAS_MOTO];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const IconHome = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" className={className}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconHistory = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconChart = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" className={className}>
    <path d="M3 20h18M7 20V10M12 20V4M17 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPlay = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
  </svg>
);
const IconMenu = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconX = ({ size = 18 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconTrash = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconLogout = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Skeleton = ({ h = "h-16" }) => (
  <div className={`${h} rounded-2xl animate-pulse`} style={{ background: "rgba(255,255,255,0.04)" }} />
);

// ── Detalle examen ─────────────────────────────────────────────────────────────
function DetalleExamen({ examen, respuestas, onVolver }) {
  const ok = examen.puntaje_obtenido >= 33;
  const pct = Math.round((examen.correctas / examen.total) * 100);
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }} className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-slate-800 flex-shrink-0"
        style={{ background: "rgba(10,15,26,0.95)", backdropFilter: "blur(12px)" }}>
        <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }} onClick={onVolver}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold bg-transparent border-0 outline-none p-0">
          ← Volver
        </motion.button>
        <div className="w-px h-4 bg-slate-800" />
        <span className={`text-sm font-black ${ok ? "text-emerald-400" : "text-red-400"}`}>
          {ok ? "🎉 Aprobado" : "📚 Reprobado"}
        </span>
        <span className="text-slate-600 text-xs hidden sm:block ml-1">
          {examen.puntaje_obtenido}/{examen.puntaje_maximo} pts · {new Date(examen.created_at).toLocaleDateString("es-CL", { day: "numeric", month: "long" })}
        </span>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-base font-black text-emerald-400">{examen.correctas}</div>
              <div className="text-xs text-slate-600">correctas</div>
            </div>
            <div className="text-center">
              <div className="text-base font-black text-red-400">{examen.incorrectas}</div>
              <div className="text-xs text-slate-600">incorrectas</div>
            </div>
          </div>
          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-black text-xs flex-shrink-0 ${ok ? "border-emerald-500 text-emerald-400" : "border-red-500 text-red-400"}`}>
            {pct}%
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 md:px-10 py-6 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {respuestas.map((r, i) => {
            const pregunta = TODAS_PREGUNTAS.find(p => p.id === r.pregunta_id);
            if (!pregunta) return null;
            return (
              <motion.div key={r.pregunta_id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025, duration: 0.3 }}
                className={`rounded-2xl border overflow-hidden ${r.es_correcta ? "border-emerald-500/25" : "border-red-500/25"}`}
                style={{ background: r.es_correcta ? "rgba(16,185,129,0.03)" : "rgba(239,68,68,0.03)" }}>
                <div className="px-4 md:px-5 pt-4 pb-3">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.es_correcta ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                      {r.es_correcta ? "✓ Correcta" : "✗ Incorrecta"}
                    </span>
                    <span className="text-xs text-slate-500">{pregunta.icono} {pregunta.categoria}</span>
                    <span className="ml-auto text-xs text-slate-600">#{i + 1}</span>
                  </div>
                  <p className="text-white font-semibold text-sm md:text-base leading-snug">{pregunta.pregunta}</p>
                  {pregunta.imagen && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/40 flex items-center justify-center">
                      <img src={pregunta.imagen} alt="" className="max-h-36 object-contain p-3" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 px-4 md:px-5 pb-3">
                  {pregunta.opciones.map((op, j) => {
                    const esCorrecta = j === pregunta.correcta;
                    const esRespondida = j === r.respondida;
                    const esIncorrecta = esRespondida && !esCorrecta;
                    return (
                      <div key={j} className={`flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-xl border text-sm ${esCorrecta ? "border-emerald-500/50 text-emerald-300" : esIncorrecta ? "border-red-500/40 text-red-300" : "border-slate-700/30 text-slate-600"}`}
                        style={{ background: esCorrecta ? "rgba(16,185,129,0.06)" : esIncorrecta ? "rgba(239,68,68,0.06)" : "transparent" }}>
                        <span className={`w-6 h-6 rounded-lg border-2 border-current flex items-center justify-center flex-shrink-0 text-xs font-black ${esCorrecta ? "bg-emerald-500/20" : esIncorrecta ? "bg-red-500/20" : ""}`}>
                          {esCorrecta ? "✓" : esIncorrecta ? "✗" : String.fromCharCode(65 + j)}
                        </span>
                        <span className="flex-1">{op}</span>
                        {esRespondida && !esCorrecta && <span className="text-xs text-red-400/80 flex-shrink-0 font-medium">tu resp.</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="mx-4 md:mx-5 mb-4 md:mb-5 px-4 py-3 rounded-xl border border-slate-700/30" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1.5">💡 Explicación</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{pregunta.explicacion}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Sección Inicio ─────────────────────────────────────────────────────────────
function SeccionInicio({ user, datos, loading, onIniciar, onBanco, onAbrirDetalle, loadingDetalle, onEliminar, adaptativo, probabilidad }) {
  const [confirmando, setConfirmando] = useState(null);
  const [eliminando, setEliminando] = useState(null); // id animándose al salir

  const handleEliminar = async (e, id) => {
    e.stopPropagation();
    if (confirmando === id) {
      setEliminando(id);
      setConfirmando(null);
      // Esperamos que termine la animación antes de actualizar el estado padre
      setTimeout(() => onEliminar(id), 380);
    } else {
      setConfirmando(id);
    }
  };

  const cancelarConfirm = (e) => {
    e.stopPropagation();
    setConfirmando(null);
  };
  return (
    <div className="flex flex-col gap-5 p-5 md:p-8 pb-32 md:pb-8">
      <motion.div {...fadeUp(0.05)}>
        <p className="text-slate-500 text-sm">Bienvenido de vuelta</p>
        <h2 className="text-white font-black text-2xl mt-0.5 truncate">{user.email.split("@")[0]}</h2>
      </motion.div>
      {loading ? (
        <div className="grid grid-cols-3 gap-3">{[...Array(3)].map((_, i) => <Skeleton key={i} h="h-20" />)}</div>
      ) : (
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-3 gap-3">
          {[
            { valor: datos.examenes.length, label: "Exámenes", icon: "📋", color: "text-white" },
            { valor: datos.racha.racha_actual, label: "Racha", icon: "🔥", color: "text-amber-400" },
            { valor: datos.racha.racha_maxima, label: "Máxima", icon: "⚡", color: "text-blue-400" },
          ].map(({ valor, label, icon, color }, idx) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + idx * 0.07 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-700/40 py-4 gap-1"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-xl">{icon}</span>
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.07, type: "spring", stiffness: 220 }}
                className={`text-2xl font-black leading-none ${color}`}>{valor}
              </motion.span>
              <span className="text-slate-500 text-xs">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
      <motion.div {...fadeUp(0.2)}>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Practicar ahora</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "📋 Modo Examen", sub: "Sin retroalimentación", modo: "examen", cls: "border-blue-500/40 hover:border-blue-500", bg: "rgba(59,130,246,0.08)", action: () => onIniciar("examen") },
            { label: "💡 Modo Estudio", sub: "Explicaciones en vivo", modo: "estudio", cls: "border-amber-500/40 hover:border-amber-500", bg: "rgba(245,158,11,0.08)", action: () => onIniciar("estudio") },
            { label: "🎯 Modo Libre", sub: "Sin límite de tiempo", modo: "libre", cls: "border-emerald-500/40 hover:border-emerald-500", bg: "rgba(34,197,94,0.07)", action: () => onIniciar("libre") },
            { label: "📚 Banco", sub: "Todas las preguntas", modo: "banco", cls: "border-slate-700/50 hover:border-slate-500", bg: "rgba(255,255,255,0.02)", action: onBanco },
          ].map(({ label, sub, modo, cls, bg, action }) => (
            <motion.button key={modo} whileTap={{ scale: 0.97 }} onClick={action}
              className={`text-left p-4 rounded-2xl border-2 transition-all outline-none ${cls}`}
              style={{ background: bg }}>
              <div className="text-2xl mb-2">{label.split(" ")[0]}</div>
              <p className="text-white font-black text-sm">{label.split(" ").slice(1).join(" ")}</p>
              <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
            </motion.button>
          ))}
        </div>

        {/* Banner selección inteligente — aparece cuando hay datos adaptativos */}
        {adaptativo && adaptativo.debiles > 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-3 flex items-center gap-3 px-3.5 py-3 rounded-2xl border border-purple-500/25"
            style={{ background: "rgba(168,85,247,0.06)" }}>
            <span className="text-lg flex-shrink-0">🧠</span>
            <p className="text-xs text-slate-400 flex-1">
              Tienes <span className="text-purple-400 font-bold">{adaptativo.debiles} preguntas débiles</span>
              {adaptativo.topDebiles[0] ? ` en ${adaptativo.topDebiles[0].categoria}` : ""}. Activa <span className="text-purple-400 font-semibold">Selección inteligente</span> al iniciar para priorizarlas.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Probabilidad de aprobar */}
      {probabilidad !== null && (
        <motion.div {...fadeUp(0.28)}>
          <div className="rounded-2xl border p-4 flex items-center gap-4"
            style={{
              borderColor: probabilidad >= 75 ? "rgba(16,185,129,0.3)" : probabilidad >= 50 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)",
              background: probabilidad >= 75 ? "rgba(16,185,129,0.04)" : probabilidad >= 50 ? "rgba(245,158,11,0.04)" : "rgba(239,68,68,0.04)",
            }}>
            {/* Gauge circular */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                <motion.circle cx="32" cy="32" r="26" fill="none"
                  stroke={probabilidad >= 75 ? "#10b981" : probabilidad >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - probabilidad / 100) }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-sm font-black text-white">{probabilidad}%</motion.span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Probabilidad de aprobar</p>
              <p className={`text-base font-black ${probabilidad >= 75 ? "text-emerald-400" : probabilidad >= 50 ? "text-amber-400" : "text-red-400"}`}>
                {probabilidad >= 75 ? "¡Listo para el examen!" : probabilidad >= 50 ? "Casi listo, sigue practicando" : "Necesitas más práctica"}
              </p>
              <p className="text-slate-600 text-xs mt-0.5">Basado en {adaptativo?.totalVistas || 0} respuestas registradas</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Último resultado + historial completo */}
      {loading ? (
        <div className="flex flex-col gap-3">{[...Array(4)].map((_, i) => <Skeleton key={i} />)}</div>
      ) : datos?.examenes.length === 0 ? (
        <motion.div {...fadeUp(0.35)} className="flex flex-col items-center justify-center py-12 text-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-5xl mb-4">🎯</motion.div>
          <p className="text-white font-bold text-lg mb-1">¡Empieza a practicar!</p>
          <p className="text-slate-500 text-sm">Tu historial aparecerá aquí después de tu primer examen.</p>
        </motion.div>
      ) : (
        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Historial</p>
          <div className="rounded-2xl border border-slate-800/60 overflow-hidden">
            {datos.examenes.map((ex, i) => {
              const ok = ex.puntaje_obtenido >= 33;
              const pct = Math.round((ex.correctas / ex.total) * 100);
              const estaConfirmando = confirmando === ex.id;
              const estaEliminando = eliminando === ex.id;
              return (
                <motion.div key={ex.id}
                  animate={estaEliminando ? { x: "100%", opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 } : { x: 0, opacity: 1 }}
                  transition={estaEliminando ? { duration: 0.35, ease: [0.4, 0, 0.2, 1] } : {}}
                  className="relative border-b border-slate-800/40 last:border-0 overflow-hidden">

                  <AnimatePresence>
                    {estaConfirmando && (
                      <motion.div key="confirm"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 z-10 flex items-center justify-center gap-2 px-4"
                        style={{ background: "rgba(10,15,26,0.97)" }}>
                        <span className="text-slate-400 text-xs font-medium">¿Eliminar?</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleEliminar(e, ex.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-bold transition-colors border-0 outline-none">
                          Sí, eliminar
                        </motion.button>
                        <button onClick={cancelarConfirm}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-xs font-semibold transition-colors bg-transparent outline-none">
                          Cancelar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`flex items-center transition-opacity duration-150 ${estaConfirmando ? "opacity-25 pointer-events-none" : ""}`}>
                    <button onClick={() => onAbrirDetalle(ex)} disabled={loadingDetalle}
                      className="bg-transparent flex items-center gap-3 px-4 py-4 flex-1 min-w-0 text-left transition-colors hover:bg-white/5 outline-none">
                      <div className={`w-1 h-10 rounded-full flex-shrink-0 ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="text-slate-300 text-sm font-semibold">
                            {new Date(ex.created_at).toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
                          </span>
                          {ex.clase && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${ex.clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>{ex.clase}</span>
                          )}
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${ex.modo === "estudio" ? "bg-amber-500/20 text-amber-400" : ex.modo === "libre" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>
                            {ex.modo === "estudio" ? "Estudio" : ex.modo === "libre" ? "Libre" : "Examen"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                            <motion.div className={`h-full rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
                              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ delay: 0.05 + i * 0.03, duration: 0.5 }} />
                          </div>
                          <span className="text-xs text-slate-500 flex-shrink-0">{ex.correctas}/{ex.total}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                        <span className={`text-base font-black ${ok ? "text-emerald-400" : "text-red-400"}`}>
                          {ex.puntaje_obtenido}<span className="text-xs font-normal text-slate-600"> pts</span>
                        </span>
                        <span className={`text-xs font-semibold ${ok ? "text-emerald-500/70" : "text-red-500/70"}`}>
                          {ok ? "Aprobado" : "Reprobado"}
                        </span>
                      </div>
                    </button>

                    {/* Botón basura */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleEliminar(e, ex.id)}
                      className="flex-shrink-0 w-10 h-10 mr-2 rounded-xl flex items-center justify-center transition-colors bg-transparent border-0 outline-none"
                      style={{ color: "#64748b" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                      onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                      title="Eliminar examen">
                      🗑︎
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── Sección Historial ──────────────────────────────────────────────────────────
function SeccionHistorial({ datos, loading, onAbrirDetalle, loadingDetalle }) {
  return (
    <div className="flex flex-col gap-5 p-5 md:p-8 pb-28 md:pb-8">
      <motion.div {...fadeUp(0.05)}>
        <h2 className="text-white font-black text-xl">Historial</h2>
        <p className="text-slate-500 text-sm mt-0.5">Todos tus exámenes completados</p>
      </motion.div>
      {loading ? (
        <div className="flex flex-col gap-3">{[...Array(6)].map((_, i) => <Skeleton key={i} />)}</div>
      ) : datos?.examenes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-5xl mb-4">🎯</motion.div>
          <p className="text-white font-bold text-lg mb-1">Sin exámenes aún</p>
          <p className="text-slate-500 text-sm">Completa tu primer examen para ver el historial aquí.</p>
        </div>
      ) : (
        <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-slate-800/60 overflow-hidden">
          {datos.examenes.map((ex, i) => {
            const ok = ex.puntaje_obtenido >= 33;
            const pct = Math.round((ex.correctas / ex.total) * 100);
            return (
              <button key={ex.id} onClick={() => onAbrirDetalle(ex)} disabled={loadingDetalle}
                className="bg-transparent flex items-center gap-3 px-4 py-4 w-full text-left transition-colors border-b border-slate-800/40 last:border-0 hover:bg-white/5 outline-none">
                <div className={`w-1 h-10 rounded-full flex-shrink-0 ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-slate-300 text-sm font-semibold">
                      {new Date(ex.created_at).toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
                    </span>
                    {ex.clase && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${ex.clase === "C" ? "bg-orange-500/20 text-orange-400" : "bg-slate-700/60 text-slate-400"}`}>{ex.clase}</span>
                    )}
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${ex.modo === "estudio" ? "bg-amber-500/20 text-amber-400" : ex.modo === "libre" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {ex.modo === "estudio" ? "Estudio" : ex.modo === "libre" ? "Libre" : "Examen"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                      <motion.div className={`h-full rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.05 + i * 0.03, duration: 0.5 }} />
                    </div>
                    <span className="text-xs text-slate-500 flex-shrink-0">{ex.correctas}/{ex.total}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  <span className={`text-base font-black ${ok ? "text-emerald-400" : "text-red-400"}`}>
                    {ex.puntaje_obtenido}<span className="text-xs font-normal text-slate-600"> pts</span>
                  </span>
                  <span className={`text-xs font-semibold ${ok ? "text-emerald-500/70" : "text-red-500/70"}`}>
                    {ok ? "Aprobado" : "Reprobado"}
                  </span>
                </div>
                <span className="text-slate-700 flex-shrink-0"><IconArrow size={13} /></span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

// ── Sección Estadísticas ───────────────────────────────────────────────────────
function SeccionEstadisticas({ datos, loading }) {
  return (
    <div className="flex flex-col gap-5 p-5 md:p-8 pb-28 md:pb-8">
      <motion.div {...fadeUp(0.05)}>
        <h2 className="text-white font-black text-xl">Estadísticas</h2>
        <p className="text-slate-500 text-sm mt-0.5">Rendimiento por categoría</p>
      </motion.div>
      {loading ? (
        <div className="flex flex-col gap-3">{[...Array(8)].map((_, i) => <Skeleton key={i} h="h-14" />)}</div>
      ) : datos?.statsCategoria.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-white font-bold text-lg mb-1">Sin datos aún</p>
          <p className="text-slate-500 text-sm">Completa exámenes para ver tus estadísticas por categoría.</p>
        </div>
      ) : (
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
          {datos && datos.statsCategoria.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Mejor categoría", val: [...datos.statsCategoria].sort((a,b) => b.pct - a.pct)[0], color: "text-emerald-400", bg: "rgba(16,185,129,0.06)", border: "border-emerald-500/25" },
                { label: "A mejorar", val: datos.statsCategoria[0], color: "text-red-400", bg: "rgba(239,68,68,0.06)", border: "border-red-500/25" },
              ].map(({ label, val, color, bg, border }) => val && (
                <div key={label} className={`rounded-2xl border ${border} p-4`} style={{ background: bg }}>
                  <p className="text-xs text-slate-500 mb-2">{label}</p>
                  <p className={`text-2xl font-black ${color}`}>{val.pct}%</p>
                  <p className="text-slate-400 text-xs mt-0.5 truncate">{val.categoria}</p>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-2xl border border-slate-800/60 overflow-hidden">
            {datos.statsCategoria.map(({ categoria, pct, total }, i) => (
              <motion.div key={categoria}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="px-4 py-3.5 border-b border-slate-800/40 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-sm font-medium truncate pr-3 max-w-[60%]">{categoria}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-slate-600 text-xs">{total} resp.</span>
                    <span className={`text-sm font-black ${pct >= 70 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-red-400"}`}>{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${pct >= 70 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.04, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── Menu Drawer (hamburguesa) ──────────────────────────────────────────────────
function MenuDrawer({ user, onLogout, onLibro, onLegal, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 35 }}
        className="relative ml-auto w-72 h-full flex flex-col border-l border-slate-800"
        style={{ background: "#0d1626" }}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <div>
            <p className="text-white font-black text-base">Maneja<span className="text-blue-400">CL</span></p>
            <p className="text-slate-500 text-xs mt-0.5 truncate max-w-48">{user.email}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-0 outline-none transition-colors">
            <IconX />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4 flex-1">
          <p className="text-xs text-slate-600 uppercase tracking-widest px-2 mb-2">Recursos</p>
          <button onClick={() => { onLibro(); onClose(); }}
            className="w-full text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium bg-transparent border-0 outline-none flex items-center justify-between">
            <span>📖 Manual del Conductor</span>
            <IconArrow />
          </button>
          {onLegal && (
            <>
              <div className="h-px bg-slate-800 my-3" />
              <p className="text-xs text-slate-600 uppercase tracking-widest px-2 mb-2">Legal</p>
              {["privacidad", "terminos", "contacto"].map(tipo => (
                <button key={tipo} onClick={() => { onLegal(tipo); onClose(); }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors text-sm capitalize bg-transparent border-0 outline-none">
                  {tipo}
                </button>
              ))}
            </>
          )}
        </div>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => { onLogout(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700/60 hover:border-slate-600 text-slate-400 hover:text-white transition-all text-sm font-semibold bg-transparent outline-none">
            <IconLogout /> Cerrar sesión
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Desktop Sidebar ────────────────────────────────────────────────────────────
function DesktopSidebar({ user, datos, loading, activeSection, onSection, onIniciar, onBanco, onLibro, onLogout, onLegal }) {
  return (
    <div className="hidden md:flex w-72 lg:w-80 flex-shrink-0 border-r border-slate-800 flex-col h-full overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="font-black text-white text-lg leading-none">Maneja<span className="text-blue-400">CL</span></h1>
            <p className="text-slate-500 text-xs mt-0.5 truncate max-w-40">{user.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-shrink-0">
        {[
          { id: "inicio", icon: IconHome, label: "Inicio" },
          { id: "historial", icon: IconHistory, label: "Historial" },
          { id: "estadisticas", icon: IconChart, label: "Estadísticas" },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => onSection(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-transparent border-0 outline-none text-left ${activeSection === id ? "text-white" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"}`}
            style={activeSection === id ? { background: "rgba(255,255,255,0.08)" } : {}}>
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <div className="h-px bg-slate-800/60 mx-4 flex-shrink-0" />
      <div className="p-4 flex-shrink-0">
        {loading || !datos ? (
          <div className="flex flex-col gap-2">{[...Array(3)].map((_, i) => <Skeleton key={i} h="h-11" />)}</div>
        ) : (
          <div className="flex flex-col gap-2">
            {[
              { valor: datos.examenes.length, label: "Exámenes", icon: "📋", color: "text-white" },
              { valor: datos.racha.racha_actual, label: "Días seguidos", icon: "🔥", color: "text-amber-400" },
              { valor: datos.racha.racha_maxima, label: "Racha máxima", icon: "⚡", color: "text-blue-400" },
            ].map(({ valor, label, icon, color }) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-slate-700/40 px-3.5 py-2.5"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="text-slate-400 text-xs">{label}</span>
                </div>
                <span className={`text-base font-black ${color}`}>{valor}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-px bg-slate-800/60 mx-4 flex-shrink-0" />
      <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
        {[
          { label: "📋 Modo Examen", onClick: () => onIniciar("examen"), cls: "bg-blue-500 hover:bg-blue-400 text-white border-transparent" },
          { label: "💡 Modo Estudio", onClick: () => onIniciar("estudio"), cls: "border-amber-500/40 hover:border-amber-500/70 text-amber-300", bg: "rgba(245,158,11,0.08)" },
          { label: "🎯 Modo Libre", onClick: () => onIniciar("libre"), cls: "border-emerald-500/40 hover:border-emerald-500/60 text-emerald-300", bg: "rgba(34,197,94,0.07)" },
          { label: "📚 Banco de Preguntas", onClick: onBanco, cls: "border-slate-700/60 hover:border-slate-600 text-slate-400", bg: "rgba(255,255,255,0.02)" },
          { label: "📖 Manual del Conductor", onClick: onLibro, cls: "border-slate-700/60 hover:border-slate-600 text-slate-400", bg: "rgba(255,255,255,0.02)" },
        ].map(({ label, onClick, cls, bg }) => (
          <motion.button key={label} whileTap={{ scale: 0.97 }} onClick={onClick}
            className={`w-full border font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-between outline-none ${cls}`}
            style={bg ? { background: bg } : {}}>
            <span>{label}</span>
            <IconArrow />
          </motion.button>
        ))}
      </div>
      <div className="p-4 border-t border-slate-800 flex-shrink-0">
        <button onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-400 hover:bg-white/5 transition-all text-xs font-semibold bg-transparent border-0 outline-none">
          <IconLogout /> Cerrar sesión
        </button>
        {onLegal && (
          <div className="flex items-center justify-center gap-3 mt-2">
            {["privacidad", "terminos", "contacto"].map((tipo, i) => (
              <span key={tipo} className="flex items-center gap-3">
                <button onClick={() => onLegal(tipo)} className="text-xs text-slate-700 hover:text-slate-500 transition-colors bg-transparent border-0 outline-none p-0 capitalize">{tipo}</button>
                {i < 2 && <span className="text-slate-800 text-xs">·</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Bottom Nav (móvil) ─────────────────────────────────────────────────────────
function BottomNav({ activeSection, onSection, onMenuOpen }) {
  const tabs = [
    { id: "inicio", icon: IconHome, label: "Inicio" },
    { id: "estadisticas", icon: IconChart, label: "Stats" },
    { id: "practicar", icon: IconPlay, label: "Practicar" },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800/80"
      style={{ background: "rgba(10,15,26,0.97)", backdropFilter: "blur(20px)" }}>
      <div className="flex items-center px-2 py-2">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <button key={id} onClick={() => onSection(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all bg-transparent border-0 outline-none relative">
              {isActive && (
                <motion.div layoutId="bnav-bg" className="absolute inset-1 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <Icon size={22} className={`relative z-10 transition-colors ${isActive ? "text-blue-400" : "text-slate-500"}`} />
              <span className={`relative z-10 text-[11px] font-semibold transition-colors leading-none ${isActive ? "text-blue-400" : "text-slate-600"}`}>{label}</span>
            </button>
          );
        })}
        {/* Hamburguesa con protagonismo */}
        <button onClick={onMenuOpen}
          className="flex flex-col items-center justify-center gap-1.5 py-3 px-4 rounded-xl transition-all bg-transparent border-0 outline-none group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-active:scale-95"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <IconMenu size={18} className="text-slate-300 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Mobile Top Bar ─────────────────────────────────────────────────────────────
function MobileTopBar({ activeSection }) {
  const titles = { inicio: "Inicio", estadisticas: "Estadísticas", practicar: "Practicar" };
  return (
    <div className="md:hidden flex items-center px-4 py-3.5 border-b border-slate-800 flex-shrink-0"
      style={{ background: "rgba(10,15,26,0.95)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-black text-white text-sm">Maneja<span className="text-blue-400">CL</span></span>
      </div>
      <div className="w-px h-3.5 bg-slate-700 mx-3" />
      <AnimatePresence mode="wait">
        <motion.span key={activeSection}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-slate-300 font-semibold text-sm">
          {titles[activeSection]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ── Modal Practicar ────────────────────────────────────────────────────────────
function ModalPracticar({ onIniciar, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 35 }}
        className="relative w-full rounded-t-3xl border-t border-slate-700/60 p-5 pb-10"
        style={{ background: "#0d1626" }}>
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-5" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-black text-lg">Elegir modo</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border-0 outline-none"><IconX size={13} />X</button>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { label: "📋 Modo Examen", sub: "Sin retroalimentación · Idéntico al real", modo: "examen", cls: "border-blue-500/40", bg: "rgba(59,130,246,0.08)" },
            { label: "💡 Modo Estudio", sub: "Explicaciones inmediatas en cada pregunta", modo: "estudio", cls: "border-amber-500/40", bg: "rgba(245,158,11,0.08)" },
            { label: "🎯 Modo Libre", sub: "Todas las preguntas, sin límite de tiempo", modo: "libre", cls: "border-emerald-500/40", bg: "rgba(34,197,94,0.07)" },
            { label: "🧠 Modo Inteligente", sub: "Prioriza tus debilidades automáticamente", modo: "inteligente", cls: "border-purple-500/40", bg: "rgba(168,85,247,0.07)" },
          ].map(({ label, sub, modo, cls, bg }) => (
            <motion.button key={modo} whileTap={{ scale: 0.98 }} onClick={() => { onIniciar(modo); onClose(); }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all outline-none flex items-center justify-between ${cls}`}
              style={{ background: bg }}>
              <div>
                <p className="text-white font-bold text-sm">{label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
              </div>
              <IconArrow />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Dashboard Principal ────────────────────────────────────────────────────────
export function Dashboard({ user, onIniciar, onLogout, onBanco, onLibro, onLegal }) {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examenDetalle, setExamenDetalle] = useState(null);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [practicarOpen, setPracticarOpen] = useState(false);
  const [adaptativo, setAdaptativo] = useState(null);
  const [probabilidad, setProbabilidad] = useState(null);

  useEffect(() => {
    obtenerDashboard(user.id).then(setDatos).finally(() => setLoading(false));
    // Cargar datos adaptativos en paralelo (no bloqueante)
    obtenerResumenAdaptativo(user.id, "B").then(setAdaptativo).catch(() => {});
    calcularProbabilidadAprobar(user.id, "B").then(setProbabilidad).catch(() => {});
  }, [user.id]);

  const abrirDetalle = async (examen) => {
    setLoadingDetalle(true);
    try {
      const respuestas = await obtenerDetalleExamen(examen.id);
      setExamenDetalle({ examen, respuestas });
    } finally {
      setLoadingDetalle(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarExamen(id);
      setDatos(prev => ({
        ...prev,
        examenes: prev.examenes.filter(e => e.id !== id),
      }));
    } catch (err) {
      console.error("Error eliminando examen:", err);
    }
  };

  const handleSection = (id) => {
    if (id === "practicar") { setPracticarOpen(true); return; }
    setActiveSection(id);
  };

  if (examenDetalle) {
    return <DetalleExamen examen={examenDetalle.examen} respuestas={examenDetalle.respuestas} onVolver={() => setExamenDetalle(null)} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full overflow-hidden flex">
      <DesktopSidebar
        user={user} datos={datos} loading={loading}
        activeSection={activeSection} onSection={setActiveSection}
        onIniciar={onIniciar} onBanco={onBanco} onLibro={onLibro}
        onLogout={onLogout} onLegal={onLegal}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MobileTopBar activeSection={activeSection} />
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 overflow-y-auto">
              {activeSection === "inicio" && (
                <SeccionInicio user={user} datos={datos} loading={loading} onIniciar={onIniciar} onBanco={onBanco} onAbrirDetalle={abrirDetalle} loadingDetalle={loadingDetalle} onEliminar={handleEliminar} adaptativo={adaptativo} probabilidad={probabilidad} />
              )}
              {activeSection === "historial" && (
                <SeccionHistorial datos={datos} loading={loading} onAbrirDetalle={abrirDetalle} loadingDetalle={loadingDetalle} />
              )}
              {activeSection === "estadisticas" && (
                <SeccionEstadisticas datos={datos} loading={loading} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <BottomNav activeSection={activeSection} onSection={handleSection} onMenuOpen={() => setMenuOpen(true)} />
      <AnimatePresence>
        {menuOpen && (
          <MenuDrawer user={user} onLogout={onLogout} onLibro={onLibro} onLegal={onLegal} onClose={() => setMenuOpen(false)} />
        )}
        {practicarOpen && (
          <ModalPracticar onIniciar={onIniciar} onClose={() => setPracticarOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}