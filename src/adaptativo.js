import { supabase } from "./supabase";
import { PREGUNTAS } from "./preguntas";
import { PREGUNTAS_MOTO } from "./preguntas_moto";

// ─── CONSTANTES DEL ALGORITMO ────────────────────────────────────────────────
const EASE_MIN = 1.3;
const EASE_MAX = 4.0;
const INTERVALO_INICIAL_OK  = 1;
const INTERVALO_INICIAL_MAL = 0;
const PREGUNTAS_POR_SESION  = 35;

// FIX 5: Normalizar categorías duplicadas a una sola clave
const NORMALIZAR_CATEGORIA = {
  "Señales":             "Señales de Tránsito",
  "Señalización":        "Señales de Tránsito",
  "Velocidades":         "Velocidad",
  "Mecánica":            "Mecánica Básica",
};
const normalizarCat = (cat) => NORMALIZAR_CATEGORIA[cat] || cat;

// Pesos de categoría en el examen real CONASET
const PESO_CATEGORIA = {
  "Señales de Tránsito": 0.20,
  "Normas de Tránsito":  0.18,
  "Conducta Vial":       0.12,
  "Conducción segura":   0.08,
  "Prioridad de paso":   0.07,
  "Velocidad":           0.05,
  "Alcohol y Drogas":    0.05,
  "Semáforos":           0.04,
  "Demarcación":         0.04,
  "Convivencia Vial":    0.04,
  "Conocimientos Legales": 0.04,
  "Mecánica Básica":     0.03,
  "Condiciones climáticas": 0.02,
};

// ─── FIX 1: CALIDAD SM-2 CON TIEMPO DE RESPUESTA ────────────────────────────
function calcularCalidad(esCorrecta, segundos = null) {
  if (esCorrecta) {
    if (segundos === null || segundos > 30) return 3;
    if (segundos <= 10) return 5;
    return 4;
  } else {
    if (segundos !== null && segundos < 5) return 2;
    return 1;
  }
}

// ─── ACTUALIZAR STATS TRAS RESPONDER ────────────────────────────────────────
export async function actualizarPreguntaStats(userId, preguntaId, clase, esCorrecta, segundos = null) {
const { data: existing } = await supabase
  .from("pregunta_stats")
  .select("*")
  .eq("user_id", userId)
  .eq("pregunta_id", preguntaId)
  .maybeSingle();

  const ahora = new Date();
  const calidad = calcularCalidad(esCorrecta, segundos);

  if (!existing) {
    const intervalo = esCorrecta ? INTERVALO_INICIAL_OK : INTERVALO_INICIAL_MAL;
    const proxima = new Date(ahora.getTime() + intervalo * 24 * 60 * 60 * 1000);
await supabase.from("pregunta_stats").upsert({
  user_id: userId,
  pregunta_id: preguntaId,
  clase,
  veces_vista: 1,
  veces_correcta: esCorrecta ? 1 : 0,
  intervalo_dias: intervalo,
  factor_ease: 2.5,
  proxima_vez: proxima.toISOString(),
  ultima_vez: ahora.toISOString(),
}, { onConflict: "user_id,pregunta_id" });
    return;
  }

  let nuevoEase = existing.factor_ease + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02));
  nuevoEase = Math.max(EASE_MIN, Math.min(EASE_MAX, nuevoEase));

  let nuevoIntervalo;
  if (!esCorrecta) {
    nuevoIntervalo = 0;
  } else if (existing.intervalo_dias === 0) {
    nuevoIntervalo = 1;
  } else if (existing.intervalo_dias === 1) {
    nuevoIntervalo = 3;
  } else {
    nuevoIntervalo = Math.round(existing.intervalo_dias * nuevoEase);
  }

  const proxima = new Date(ahora.getTime() + nuevoIntervalo * 24 * 60 * 60 * 1000);

  await supabase.from("pregunta_stats").update({
    veces_vista:    existing.veces_vista + 1,
    veces_correcta: existing.veces_correcta + (esCorrecta ? 1 : 0),
    intervalo_dias: nuevoIntervalo,
    factor_ease:    nuevoEase,
    proxima_vez:    proxima.toISOString(),
    ultima_vez:     ahora.toISOString(),
  }).eq("id", existing.id);
}

// ─── GUARDAR STATS DE TODA UNA SESIÓN ────────────────────────────────────────
// FIX 1: ahora acepta tiempos de respuesta por pregunta { índice: segundos }
export async function guardarSesionAdaptativa(userId, preguntas, respuestas, clase, tiempos = {}) {
  const updates = Object.entries(respuestas).map(([idx, respuesta]) => {
    const p = preguntas[+idx];
    if (!p) return null;
    const esCorrecta = respuesta === p.correcta;
    const segundos = tiempos[+idx] ?? null;
    return actualizarPreguntaStats(userId, p.id, clase, esCorrecta, segundos);
  }).filter(Boolean);

  await Promise.allSettled(updates);
}

// ─── GENERAR EXAMEN ADAPTATIVO ───────────────────────────────────────────────
export async function generarExamenAdaptativo(userId, clase = "B") {
  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;

  const { data: stats } = await supabase
    .from("pregunta_stats")
    .select("pregunta_id, veces_vista, veces_correcta, proxima_vez, factor_ease, ultima_vez, intervalo_dias")
    .eq("user_id", userId)
    .eq("clase", clase);

  const statsMap = {};
  (stats || []).forEach(s => { statsMap[s.pregunta_id] = s; });

  const ahora = new Date();

  const conScore = banco.map(p => {
    const s = statsMap[p.id];

    if (!s) {
      // FIX 2: nunca vistas → score 0.5~0.65, DEBAJO de las falladas
      return { pregunta: p, score: 0.5 + Math.random() * 0.15 };
    }

    const tasaAcierto = s.veces_vista > 0 ? s.veces_correcta / s.veces_vista : 0;
    const msDesdeProxima = ahora - new Date(s.proxima_vez);
    const diasVencida = msDesdeProxima / (1000 * 60 * 60 * 24);

    const factorTiempo = diasVencida > 0
      ? Math.min(1, 0.3 + diasVencida * 0.1)
      : Math.max(0, 0.3 - Math.abs(diasVencida) * 0.05);

    const scoreDebilidad = 1 - tasaAcierto;

    // FIX 2: bonus para preguntas falladas recientemente (intervalo=0)
    const bonusFallada = s.intervalo_dias === 0 ? 0.35 : 0;

    // FIX 3: ruido mínimo solo para desempatar
    const score = scoreDebilidad * 0.6 + factorTiempo * 0.4 + bonusFallada + Math.random() * 0.01;

    return { pregunta: p, score };
  });

  conScore.sort((a, b) => b.score - a.score);

  const dobles = conScore.filter(x => x.pregunta.puntaje === 2);
  const simples = conScore.filter(x => x.pregunta.puntaje !== 2);

  const selDobles = dobles.slice(0, Math.min(3, dobles.length)).map(x => x.pregunta);
  const selSimples = simples.slice(0, PREGUNTAS_POR_SESION - selDobles.length).map(x => x.pregunta);

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  return shuffle([...selDobles, ...selSimples]);
}

// ─── CALCULAR PROBABILIDAD DE APROBAR ────────────────────────────────────────
export async function calcularProbabilidadAprobar(userId, clase = "B") {
  const { data: examenes } = await supabase
    .from("examenes")
    .select("puntaje_obtenido, created_at")
    .eq("user_id", userId)
    .eq("modo", "examen")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!examenes || examenes.length === 0) return null;

  // Contar racha actual de aprobados (desde el más reciente)
  let rachaAprobados = 0;
  for (const ex of examenes) {
    if (ex.puntaje_obtenido >= 33) rachaAprobados++;
    else break;
  }

  // 3 aprobados seguidos = 100%
  if (rachaAprobados >= 3) return 100;

  // Promedio ponderado — peso suave para que un mal examen
  // no destruya todo el historial bueno anterior
  let sumaPesos = 0;
  let sumaPonderada = 0;

  examenes.forEach((ex, i) => {
    const peso = 1 / Math.pow(i + 1, 0.6);
    const rendimiento = Math.min(ex.puntaje_obtenido / 33, 1);
    sumaPonderada += rendimiento * peso;
    sumaPesos += peso;
  });

  const tasaReal = sumaPonderada / sumaPesos;
  const bonusRacha = rachaAprobados * 8; // +8% por aprobado reciente
  const prob = Math.round(tasaReal * 82 + bonusRacha);

  return Math.min(prob, 99); // nunca 100% sin 3 seguidas
}

// ─── OBTENER RESUMEN ADAPTATIVO PARA DASHBOARD ───────────────────────────────
export async function obtenerResumenAdaptativo(userId, clase = "B") {
  const { data: stats } = await supabase
    .from("pregunta_stats")
    .select("pregunta_id, veces_vista, veces_correcta, proxima_vez, ultima_vez")
    .eq("user_id", userId)
    .eq("clase", clase);

  if (!stats || stats.length === 0) return null;

  const ahora = new Date();
  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;

  const vencidas = stats.filter(s => new Date(s.proxima_vez) <= ahora).length;
  const dominadas = stats.filter(s =>
    s.veces_vista >= 3 && (s.veces_correcta / s.veces_vista) >= 0.9
  ).length;

  const debiles = stats.filter(s =>
    s.veces_vista >= 2 && (s.veces_correcta / s.veces_vista) < 0.5
  ).map(s => {
    const p = banco.find(p => p.id === s.pregunta_id);
    return p ? { ...s, categoria: normalizarCat(p.categoria) } : s; // FIX 5
  });

  const categoriaDebil = {};
  debiles.forEach(s => {
    const cat = s.categoria || "Otras";
    categoriaDebil[cat] = (categoriaDebil[cat] || 0) + 1;
  });
  const topDebiles = Object.entries(categoriaDebil)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat, n]) => ({ categoria: cat, cantidad: n }));

  const totalVistas = stats.length;
  const totalBanco = banco.length;
  const cobertura = Math.round((totalVistas / totalBanco) * 100);

  return { vencidas, dominadas, debiles: debiles.length, topDebiles, cobertura, totalVistas, totalBanco };
}

export async function obtenerPreguntasDebiles(userId, clase = "B") {
  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;

  const { data: stats } = await supabase
    .from("pregunta_stats")
    .select("pregunta_id, veces_vista, veces_correcta")
    .eq("user_id", userId)
    .eq("clase", clase);

  if (!stats || stats.length === 0) return [];

  // Filtrar las falladas (tasa < 50%, al menos 1 vista)
  const debilesIds = stats
    .filter(s => s.veces_vista >= 1 && (s.veces_correcta / s.veces_vista) < 0.5)
    .sort((a, b) => (a.veces_correcta / a.veces_vista) - (b.veces_correcta / b.veces_vista)); // peores primero

  return debilesIds
    .map(s => banco.find(p => p.id === s.pregunta_id))
    .filter(Boolean);
}