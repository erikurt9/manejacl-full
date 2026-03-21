import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AuthModal({ onSuccess, onClose, modoInicial = "registro" }) {
  const [modo, setModo] = useState(modoInicial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSuccess(modo, email, password);
    } catch (err) {
      setError(
        err.message?.includes("already registered") ? "Ya existe una cuenta con ese email." :
        err.message?.includes("Invalid login") ? "Email o contraseña incorrectos." :
        err.message || "Ocurrió un error. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-md rounded-3xl border border-slate-700/60 p-8"
        style={{ background: "#0d1626" }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white">
              {modo === "registro" ? "Crear cuenta" : "Iniciar sesión"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {modo === "registro" ? "Guarda tu progreso y estadísticas." : "Bienvenido de vuelta."}
            </p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors ml-4 flex-shrink-0 bg-slate-700 hover:bg-slate-600 border-0 outline-none font-bold text-base leading-none">
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com"
              className="w-full rounded-2xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors border border-slate-700/60"
              style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Mínimo 6 caracteres"
              className="w-full rounded-2xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors border border-slate-700/60"
              style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all mt-1">
            {loading ? "Cargando..." : modo === "registro" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-slate-600 text-sm mt-5">
          {modo === "registro" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <span onClick={() => { setModo(modo === "registro" ? "login" : "registro"); setError(""); }}
            className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
            {modo === "registro" ? "Iniciar sesión" : "Registrarse"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}