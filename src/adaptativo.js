import { supabase } from "./supabase";
import { PREGUNTAS } from "./preguntas";
import { PREGUNTAS_MOTO } from "./preguntas_moto";

// ─── CONSTANTES DEL ALGORITMO ────────────────────────────────────────────────
const EASE_MIN = 1.3;
const EASE_MAX = 4.0;
const INTERVALO_INICIAL_OK  = 1;   // días si responde bien primera vez
const INTERVALO_INICIAL_MAL = 0;   // vuelve a aparecer hoy si falla
const PREGUNTAS_POR_SESION  = 35;

// Pesos de categoría en el examen real CONASET (estimado)
// Categorías con más preguntas en el banco = más peso
const PESO_CATEGORIA = {
  "Señales de Tránsito": 0.20,
  "Señales":             0.20,
  "Señalización":        0.20,
  "Normas de Tránsito":  0.18,
  "Conducta Vial":       0.12,
  "Conducción segura":   0.08,
  "Prioridad de paso":   0.07,
  "Velocidad":           0.05,
  "Velocidades":         0.05,
  "Alcohol y Drogas":    0.05,
  "Semáforos":           0.04,
  "Demarcación":         0.04,
  "Convivencia Vial":    0.04,
  "Conocimientos Legales": 0.04,
  "Mecánica Básica":     0.03,
  "Mecánica":            0.03,
  "Condiciones climáticas": 0.02,
};

// ─── ACTUALIZAR STATS TRAS RESPONDER ────────────────────────────────────────
// Algoritmo SM-2 simplificado (base de Anki)
export async function actualizarPreguntaStats(userId, preguntaId, clase, esCorrecta) {
  // Buscar stat existente
  const { data: existing } = await supabase
    .from("pregunta_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("pregunta_id", preguntaId)
    .single();

  const ahora = new Date();

  if (!existing) {
    // Primera vez que ve esta pregunta
    const intervalo = esCorrecta ? INTERVALO_INICIAL_OK : INTERVALO_INICIAL_MAL;
    const proxima = new Date(ahora.getTime() + intervalo * 24 * 60 * 60 * 1000);
    await supabase.from("pregunta_stats").insert({
      user_id: userId,
      pregunta_id: preguntaId,
      clase,
      veces_vista: 1,
      veces_correcta: esCorrecta ? 1 : 0,
      intervalo_dias: intervalo,
      factor_ease: 2.5,
      proxima_vez: proxima.toISOString(),
      ultima_vez: ahora.toISOString(),
    });
    return;
  }

  // Actualizar stat existente con SM-2
  const calidad = esCorrecta ? 4 : 1; // 0-5, usamos 4 (bien) o 1 (mal)
  let nuevoEase = existing.factor_ease + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02));
  nuevoEase = Math.max(EASE_MIN, Math.min(EASE_MAX, nuevoEase));

  let nuevoIntervalo;
  if (!esCorrecta) {
    nuevoIntervalo = 0; // Ver de nuevo hoy
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
export async function guardarSesionAdaptativa(userId, preguntas, respuestas, clase) {
  // Batch — actualizar stats de cada pregunta respondida en paralelo
  const updates = Object.entries(respuestas).map(([idx, respuesta]) => {
    const p = preguntas[+idx];
    if (!p) return null;
    const esCorrecta = respuesta === p.correcta;
    return actualizarPreguntaStats(userId, p.id, clase, esCorrecta);
  }).filter(Boolean);

  await Promise.allSettled(updates); // allSettled = no falla si una falla
}

// ─── GENERAR EXAMEN ADAPTATIVO ───────────────────────────────────────────────
export async function generarExamenAdaptativo(userId, clase = "B") {
  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;

  // Traer stats del usuario para este banco
  const { data: stats } = await supabase
    .from("pregunta_stats")
    .select("pregunta_id, veces_vista, veces_correcta, proxima_vez, factor_ease")
    .eq("user_id", userId)
    .eq("clase", clase);

  const statsMap = {};
  (stats || []).forEach(s => { statsMap[s.pregunta_id] = s; });

  const ahora = new Date();

  // Calcular score adaptativo para cada pregunta
  // Score alto = prioridad alta para aparecer
  const conScore = banco.map(p => {
    const s = statsMap[p.id];

    if (!s) {
      // Nunca vista → score 0.7 (alta prioridad, pero no máxima)
      return { pregunta: p, score: 0.7 + Math.random() * 0.3 };
    }

    const tasaAcierto = s.veces_vista > 0 ? s.veces_correcta / s.veces_vista : 0;

    // Factor tiempo: cuánto pasó desde que debía aparecer
    // Si ya era hora de verla → factor alto
    const msDesdeProxima = ahora - new Date(s.proxima_vez);
    const diasVencida = msDesdeProxima / (1000 * 60 * 60 * 24);
    const factorTiempo = diasVencida > 0
      ? Math.min(1, 0.3 + diasVencida * 0.1) // vencida → sube
      : Math.max(0, 0.3 - Math.abs(diasVencida) * 0.05); // no es hora → baja

    // Score final: débil en contenido + tiempo de repaso
    const scoreDebilidad = 1 - tasaAcierto;
    const score = scoreDebilidad * 0.6 + factorTiempo * 0.4 + Math.random() * 0.05;

    return { pregunta: p, score };
  });

  // Ordenar por score descendente
  conScore.sort((a, b) => b.score - a.score);

  // Seleccionar top N, respetando la distribución del examen real
  // (3 doble puntaje obligatorias + 32 simples)
  const dobles = conScore.filter(x => x.pregunta.puntaje === 2);
  const simples = conScore.filter(x => x.pregunta.puntaje !== 2);

  const selDobles = dobles.slice(0, Math.min(3, dobles.length)).map(x => x.pregunta);
  const selSimples = simples.slice(0, PREGUNTAS_POR_SESION - selDobles.length).map(x => x.pregunta);

  // Shuffle final para que no siempre empiecen igual
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  return shuffle([...selDobles, ...selSimples]);
}

// ─── CALCULAR PROBABILIDAD DE APROBAR ────────────────────────────────────────
export async function calcularProbabilidadAprobar(userId, clase = "B") {
  const { data: stats } = await supabase
    .from("pregunta_stats")
    .select("pregunta_id, veces_vista, veces_correcta")
    .eq("user_id", userId)
    .eq("clase", clase);

  if (!stats || stats.length < 10) return null; // Muy pocos datos

  const banco = clase === "C" ? PREGUNTAS_MOTO : PREGUNTAS;
  const statsMap = {};
  stats.forEach(s => { statsMap[s.pregunta_id] = s; });

  // Calcular tasa de acierto ponderada por categoría y dificultad
  const porCategoria = {};
  banco.forEach(p => {
    const s = statsMap[p.id];
    if (!s || s.veces_vista === 0) return;

    const tasa = s.veces_correcta / s.veces_vista;
    const cat = p.categoria;
    if (!porCategoria[cat]) porCategoria[cat] = { tasas: [], dificultades: [] };
    porCategoria[cat].tasas.push(tasa);
    porCategoria[cat].dificultades.push(p.dificultad || 3);
  });

  // Promedio ponderado por categoría
  let puntuacionTotal = 0;
  let pesoTotal = 0;

  Object.entries(porCategoria).forEach(([cat, { tasas, dificultades }]) => {
    if (tasas.length === 0) return;
    const pesoCat = PESO_CATEGORIA[cat] || 0.05;
    // Promedio ponderado por dificultad inversa (más fáciles cuentan más)
    const tasaPromedio = tasas.reduce((sum, t, i) => {
      const pesoD = 1 / (dificultades[i] || 3);
      return sum + t * pesoD;
    }, 0) / tasas.reduce((sum, _, i) => sum + 1 / (dificultades[i] || 3), 0);

    puntuacionTotal += tasaPromedio * pesoCat;
    pesoTotal += pesoCat;
  });

  if (pesoTotal === 0) return null;

  const tasaGlobal = puntuacionTotal / pesoTotal;

  // El examen aprueba con 33/38 pts ≈ 86.8% de acierto ponderado
  // Usamos una curva logística centrada en ese punto
  const umbral = 0.868;
  const k = 12; // pendiente de la curva
  const prob = 1 / (1 + Math.exp(-k * (tasaGlobal - umbral)));

  // Redondear a entero entre 0-100
  return Math.round(prob * 100);
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

  // Preguntas vencidas (listas para repasar)
  const vencidas = stats.filter(s => new Date(s.proxima_vez) <= ahora).length;

  // Preguntas dominadas (>= 3 vistas con tasa >= 90%)
  const dominadas = stats.filter(s =>
    s.veces_vista >= 3 && (s.veces_correcta / s.veces_vista) >= 0.9
  ).length;

  // Preguntas débiles (tasa < 50%, al menos 2 vistas)
  const debiles = stats.filter(s =>
    s.veces_vista >= 2 && (s.veces_correcta / s.veces_vista) < 0.5
  ).map(s => {
    const p = banco.find(p => p.id === s.pregunta_id);
    return p ? { ...s, categoria: p.categoria } : s;
  });

  // Agrupar débiles por categoría
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
