import { supabase } from "./supabase";

// Guarda un examen completo + detalle de respuestas + actualiza racha
export async function guardarResultado({ userId, preguntas, respuestas, modo, clase, puntajeObtenido, puntajeMaximo }) {
  const correctas = Object.entries(respuestas).filter(([i, r]) => preguntas[+i]?.correcta === r).length;
  const total = preguntas.length;

  const { data: examen, error: errExamen } = await supabase
    .from("examenes")
    .insert({ user_id: userId, modo, clase, puntaje_obtenido: puntajeObtenido, puntaje_maximo: puntajeMaximo, correctas, incorrectas: total - correctas, total })
    .select().single();
  if (errExamen) throw errExamen;

  const detalle = preguntas.map((p, i) => ({
    examen_id: examen.id,
    user_id: userId,
    pregunta_id: p.id,
    categoria: p.categoria,
    respondida: respuestas[i] ?? null,
    correcta: p.correcta,
    es_correcta: respuestas[i] === p.correcta,
  }));
  const { error: errDetalle } = await supabase.from("respuestas_detalle").insert(detalle);
  if (errDetalle) throw errDetalle;

  await actualizarRacha(userId);
  return examen;
}

async function actualizarRacha(userId) {
  const hoy = new Date().toISOString().split("T")[0];
  const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const { data: racha } = await supabase.from("rachas").select("*").eq("user_id", userId).single();

  if (!racha) {
    await supabase.from("rachas").insert({ user_id: userId, racha_actual: 1, racha_maxima: 1, ultimo_dia: hoy });
    return;
  }
  if (racha.ultimo_dia === hoy) return; // Ya practicó hoy

  const nueva = racha.ultimo_dia === ayer ? racha.racha_actual + 1 : 1;
  await supabase.from("rachas").update({ racha_actual: nueva, racha_maxima: Math.max(nueva, racha.racha_maxima), ultimo_dia: hoy }).eq("user_id", userId);
}

export async function eliminarExamen(examenId) {
  const { error } = await supabase
    .from("examenes")
    .delete()
    .eq("id", examenId);
  if (error) throw error;
}

export async function obtenerDetalleExamen(examenId) {
  const { data, error } = await supabase
    .from("respuestas_detalle")
    .select("pregunta_id, respondida, correcta, es_correcta, categoria")
    .eq("examen_id", examenId);
  if (error) throw error;
  return data || [];
}

export async function obtenerDashboard(userId, clase = null) {
  const examenesQuery = supabase.from("examenes").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
  if (clase) examenesQuery.eq("clase", clase);

  const [{ data: examenes }, { data: racha }, { data: errores }] = await Promise.all([
    examenesQuery,
    supabase.from("rachas").select("*").eq("user_id", userId).single(),
    supabase.from("respuestas_detalle").select("categoria, es_correcta, examen_id").eq("user_id", userId),
  ]);

  // Agrupar por categoría
  const porCat = {};
  (errores || []).forEach(({ categoria, es_correcta }) => {
    if (!porCat[categoria]) porCat[categoria] = { ok: 0, total: 0 };
    porCat[categoria].total++;
    if (es_correcta) porCat[categoria].ok++;
  });
  const statsCategoria = Object.entries(porCat)
    .map(([cat, { ok, total }]) => ({ categoria: cat, pct: Math.round((ok / total) * 100), total }))
    .sort((a, b) => a.pct - b.pct); // peores primero

  return { examenes: examenes || [], racha: racha || { racha_actual: 0, racha_maxima: 0 }, statsCategoria };
}

export async function limpiarStats(userId) {
  const { error } = await supabase
    .from("pregunta_stats")
    .delete()
    .eq("user_id", userId);
  if (error) throw error;
}