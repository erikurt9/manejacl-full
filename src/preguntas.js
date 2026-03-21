// ─────────────────────────────────────────────────────────────────────────────
// BANCO DE PREGUNTAS OFICIALES CONASET
// Fuente: Cuestionario Base Examen Teórico Clases A1*, A2*, D, E
// Publicado por CONASET (Comisión Nacional de Seguridad de Tránsito)
// Disponible en: mejoresconductores.conaset.cl
// ─────────────────────────────────────────────────────────────────────────────

export const PREGUNTAS = [

  // ── CONDUCTA VIAL ──────────────────────────────────────────────────────────

  {
    id: 1,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 1,
    pregunta: "¿Qué parte de la vía se debe utilizar exclusivamente al conducir un vehículo?",
    opciones: ["La berma.", "La calzada.", "La acera."],
    correcta: 1,
    explicacion: "La calzada es la parte de la vía destinada exclusivamente a la circulación de vehículos. La berma y la acera tienen otros usos específicos.",
  },
  {
    id: 2,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 1,
    pregunta: "¿En qué casos puedes circular por la berma con tu vehículo?",
    opciones: [
      "Cuando por averías tengas que circular lentamente.",
      "Al estar las pistas ocupadas por otros vehículos.",
      "En ninguno de los casos anteriores.",
    ],
    correcta: 2,
    explicacion: "No se puede circular por la berma en ningún caso. La berma está reservada para emergencias y peatones, no para circulación vehicular.",
  },
  {
    id: 3,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 1,
    pregunta: "¿Por dónde debes circular con tu vehículo por norma general?",
    opciones: [
      "Por el centro de la calzada.",
      "Por la izquierda de la calzada.",
      "Por la derecha de la calzada.",
    ],
    correcta: 2,
    explicacion: "La norma general en Chile establece que los vehículos deben circular por la mitad derecha de la calzada.",
  },
  {
    id: 4,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "¿Qué obligación especial te corresponde cuando circulas en tu vehículo en una vía de doble sentido de tránsito, al enfrentar a otro vehículo que transita en sentido contrario?",
    opciones: [
      "Circular por la derecha alejándose del eje de la calzada.",
      "Encender el intermitente.",
      "Reducir la velocidad.",
    ],
    correcta: 0,
    explicacion: "Al enfrentar un vehículo en sentido contrario en vía de doble tránsito, debes circular por la derecha alejándote del eje central para dar espacio seguro.",
  },
  {
    id: 5,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 1,
    pregunta: "¿Qué debes hacer cuando te adelanta otro vehículo?",
    opciones: [
      "Encender las luces bajas.",
      "Frenar bruscamente.",
      "Mantener tu velocidad o disminuirla para permitir el adelantamiento.",
    ],
    correcta: 2,
    explicacion: "Cuando otro vehículo te adelanta, debes mantener o reducir tu velocidad para facilitar la maniobra de adelantamiento de forma segura.",
  },
  {
    id: 6,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 1,
    pregunta: "Al estar las pistas de la calzada demarcadas, ¿por dónde debes circular con tu vehículo?",
    opciones: [
      "Por el centro de la calzada.",
      "Por la derecha de la calzada, sin considerar las pistas.",
      "Dentro de la franja demarcada para la pista.",
    ],
    correcta: 2,
    explicacion: "Cuando la calzada tiene pistas demarcadas, debes circular dentro de la franja correspondiente a tu pista.",
  },
  {
    id: 7,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "Al circular por una calzada con varias pistas demarcadas en un sentido de tránsito, para virar a la derecha, ¿qué maniobra se debe efectuar?",
    opciones: [
      "Acercarse al eje central de la calzada.",
      "Ubicarse en la pista de la derecha de la calzada tan cerca como sea posible de la cuneta o del borde de la misma.",
      "Ubicarse en la pista de la izquierda de la calzada tan cerca como sea posible de la cuneta o del borde de la misma.",
    ],
    correcta: 1,
    explicacion: "Para virar a la derecha debes anticiparte ubicándote en la pista más a la derecha, lo más cerca posible de la cuneta o borde de la calzada.",
  },
  {
    id: 8,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "¿Dónde es posible realizar la maniobra viraje en 'U'?",
    opciones: [
      "Pasos peatonales.",
      "A mitad de cuadra, si no está prohibido.",
      "En la intersección.",
    ],
    correcta: 1,
    explicacion: "El viraje en U puede realizarse a mitad de cuadra cuando no esté expresamente prohibido y las condiciones lo permitan de forma segura.",
  },
  {
    id: 9,
    categoria: "Conducta Vial",
    icono: "🌧️",
    dificultad: 2,
    pregunta: "Al encontrarse la calzada húmeda, con hielo o con pavimento resbaladizo por la lluvia, ¿qué debe hacer la persona que conduce?",
    opciones: [
      "Conducir lenta y suavemente, sin hacer movimientos bruscos con el volante ni con los pedales.",
      "Aumentar la velocidad sin hacer movimientos bruscos con el volante.",
      "Estar atenta a frenar.",
    ],
    correcta: 0,
    explicacion: "En pavimento resbaladizo se debe conducir lenta y suavemente, evitando todo movimiento brusco del volante o pedales para no perder el control del vehículo.",
  },
  {
    id: 10,
    categoria: "Conducta Vial",
    icono: "⚠️",
    dificultad: 2,
    pregunta: "Al aproximarse a una curva con visibilidad reducida, ¿qué debe hacer la persona que conduce?",
    opciones: [
      "Adaptar la velocidad y ceñirse al borde derecho de la calzada.",
      "Circular por el centro de la calzada.",
      "Disminuir la velocidad hasta detenerse.",
    ],
    correcta: 0,
    explicacion: "Ante una curva con visibilidad reducida debes adaptar tu velocidad y ceñirte al borde derecho para mantener el mayor margen de seguridad posible.",
  },
  {
    id: 11,
    categoria: "Conducta Vial",
    icono: "💡",
    dificultad: 1,
    pregunta: "Si observas que en la parte trasera de un vehículo se encienden las luces blancas, ¿qué indica?",
    opciones: [
      "Que el vehículo va a adelantar a otro vehículo.",
      "Que está retrocediendo.",
      "Que está virando a la derecha.",
    ],
    correcta: 1,
    explicacion: "Las luces blancas traseras (luces de retroceso) se encienden cuando el vehículo está usando la marcha atrás.",
  },
  {
    id: 12,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "¿Qué distancia tiene permitida recorrer un vehículo en marcha atrás por la calzada?",
    opciones: ["100 metros.", "150 metros.", "Ninguna de las anteriores."],
    correcta: 2,
    explicacion: "La ley solo permite el retroceso para mantener la libre circulación, incorporarse a ella o estacionar. No hay una distancia permitida de retroceso general.",
  },
  {
    id: 13,
    categoria: "Conducta Vial",
    icono: "🚗",
    dificultad: 1,
    pregunta: "Para adelantar, ¿qué norma general debes considerar?",
    opciones: [
      "Adelantar por la derecha.",
      "Adelantar por la izquierda.",
      "En zonas rurales adelantar por la berma, al estar el vehículo que antecede detenido.",
    ],
    correcta: 1,
    explicacion: "La norma general indica que se debe adelantar siempre por la izquierda del vehículo al que se sobrepasa.",
  },
  {
    id: 14,
    categoria: "Conducta Vial",
    icono: "↰",
    dificultad: 2,
    pregunta: "¿Qué maniobra debe realizar una persona conductora, al circular por una vía de dos sentidos, si va a girar hacia la izquierda?",
    opciones: [
      "Situarse al costado derecho de la calzada.",
      "Situarse progresivamente al costado derecho del eje o línea central de la vía por donde transita.",
      "Situarse al costado izquierdo de la calzada.",
    ],
    correcta: 1,
    explicacion: "Para girar a la izquierda en vía de doble tránsito, debes situarte progresivamente al costado derecho del eje central, señalizar y esperar el momento oportuno.",
  },
  {
    id: 15,
    categoria: "Conducta Vial",
    icono: "🅿️",
    dificultad: 1,
    pregunta: "Por regla general, ¿cómo debes estacionar tu vehículo?",
    opciones: [
      "Con dos ruedas sobre la acera.",
      "Sobre la acera.",
      "Al lado derecho en el sentido del tránsito, sobre la calzada.",
    ],
    correcta: 2,
    explicacion: "Por regla general, los vehículos deben estacionarse al lado derecho en el sentido de la circulación, sobre la calzada y paralelos a ella.",
  },
  {
    id: 16,
    categoria: "Conducta Vial",
    icono: "🅿️",
    dificultad: 2,
    pregunta: "Por regla general, ¿cómo debes estacionar tu vehículo en las vías rurales?",
    opciones: [
      "Con toda la estructura del vehículo sobre la berma.",
      "Sobre la calzada en el sentido contrario del tránsito.",
      "Longitudinalmente con la mitad del vehículo sobre la berma.",
    ],
    correcta: 2,
    explicacion: "En vías rurales se debe estacionar longitudinalmente con la mitad del vehículo sobre la berma para no obstruir la calzada.",
  },
  {
    id: 17,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    pregunta: "¿Puedes conducir sin licencia?",
    opciones: [
      "Sí, en caminos públicos rurales durante el día.",
      "Sí, en lugares de poco tránsito en las vías públicas de la ciudad.",
      "En ninguno de los casos anteriores.",
    ],
    correcta: 2,
    explicacion: "La ley chilena exige licencia de conducir para circular en cualquier vía pública, sin excepciones por zona horaria o tipo de camino.",
  },
  {
    id: 18,
    categoria: "Señalización",
    icono: "🚦",
    dificultad: 1,
    pregunta: "Al transitar con tu vehículo podrás pasar con luz roja del semáforo:",
    opciones: [
      "Si no hay vehículos que pasen con verde.",
      "Si tu vehículo es destinado a transporte de pasajeros.",
      "En ningún caso.",
    ],
    correcta: 2,
    explicacion: "Está absolutamente prohibido pasar con luz roja del semáforo en cualquier circunstancia. Solo vehículos de emergencia con señales activas tienen excepciones.",
  },
  {
    id: 19,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    pregunta: "¿En qué caso puedes conducir, por la vía pública, un tipo de vehículo distinto a la Clase Licencia que posees?",
    opciones: [
      "Para efectuar viajes cortos.",
      "En zonas no controladas.",
      "En ninguno de los casos anteriores.",
    ],
    correcta: 2,
    explicacion: "La licencia habilita para conducir únicamente los vehículos de la clase correspondiente. No existe excepción por distancia ni por zona.",
  },
  {
    id: 20,
    categoria: "Conducta Vial",
    icono: "⛰️",
    dificultad: 2,
    pregunta: "¿De qué forma debes estacionar el vehículo en bajada?",
    opciones: [
      "Solo con freno de mano.",
      "Enganchado en primera marcha.",
      "Con freno de mano y las ruedas delanteras giradas hacia la cuneta.",
    ],
    correcta: 2,
    explicacion: "En bajada debes usar el freno de mano Y girar las ruedas delanteras hacia la cuneta, de modo que si el vehículo se mueve, la cuneta lo detenga.",
  },
  {
    id: 21,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    pregunta: "Puedes conducir tu vehículo en las vías públicas:",
    opciones: [
      "Sin sistemas de frenos.",
      "Con el mecanismo de la dirección en mal estado.",
      "En ninguno de los casos anteriores.",
    ],
    correcta: 2,
    explicacion: "Está prohibido circular con vehículos que tengan fallas en sistemas de seguridad esenciales como frenos o dirección.",
  },
  {
    id: 22,
    categoria: "Conducta Vial",
    icono: "🌙",
    dificultad: 1,
    pregunta: "Al transitar con tu vehículo en vías rurales, como norma de carácter general, durante la noche debes hacerlo con:",
    opciones: ["Luces altas.", "Luces bajas.", "Luces de estacionamiento."],
    correcta: 0,
    explicacion: "En vías rurales nocturnas se deben usar luces altas para una mejor visibilidad, cambiando a luces bajas solo cuando haya vehículos en sentido contrario.",
  },
  {
    id: 23,
    categoria: "Conducta Vial",
    icono: "🌙",
    dificultad: 1,
    pregunta: "Al conducir tu vehículo durante la noche, por regla general, en las zonas urbanas debes hacerlo con:",
    opciones: [
      "Luces de estacionamiento solamente.",
      "Luces altas.",
      "Luces bajas.",
    ],
    correcta: 2,
    explicacion: "En zonas urbanas nocturnas se deben usar luces bajas para no deslumbrar a otros conductores y peatones.",
  },
  {
    id: 24,
    categoria: "Conducta Vial",
    icono: "📣",
    dificultad: 1,
    pregunta: "Al conducir tu vehículo podrás usar la bocina para:",
    opciones: [
      "Apurar al vehículo que te antecede.",
      "Anunciar que estacionarás.",
      "Prevenir un siniestro, si ello es estrictamente necesario.",
    ],
    correcta: 2,
    explicacion: "El uso de la bocina está reservado exclusivamente para prevenir siniestros cuando sea estrictamente necesario. Su uso innecesario está prohibido.",
  },
  {
    id: 25,
    categoria: "Conducta Vial",
    icono: "⚠️",
    dificultad: 3,
    pregunta: "Si la parte trasera de tu vehículo patina hacia un costado debes:",
    opciones: [
      "Frenar bruscamente.",
      "Girar las ruedas delanteras en el mismo sentido que se desplaza la parte trasera del vehículo.",
      "Girar las ruedas delanteras en sentido contrario al que se desplaza la parte trasera del vehículo.",
    ],
    correcta: 1,
    explicacion: "Ante un derrape trasero debes girar las ruedas delanteras en el mismo sentido que se mueve la parte trasera para recuperar el control del vehículo.",
  },
  {
    id: 26,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Al transitar con tu vehículo podrás no tener espejo retrovisor interior, en los siguientes casos:",
    opciones: [
      "Cuando transites a baja velocidad.",
      "Cuando tu vehículo es de transporte de carga.",
      "En ninguno de los casos anteriores.",
    ],
    correcta: 2,
    explicacion: "Todo vehículo debe contar con espejo retrovisor interior obligatoriamente. No existe excepción por velocidad ni por tipo de vehículo.",
  },
  {
    id: 27,
    categoria: "Convivencia Vial",
    icono: "🚲",
    dificultad: 2,
    pregunta: "¿Cuánto es el espacio lateral que debes dejar al adelantar a una persona ciclista?",
    opciones: ["2 metros.", "1 metro.", "1,5 metros."],
    correcta: 2,
    explicacion: "La ley exige dejar al menos 1,5 metros de espacio lateral al adelantar a una persona ciclista para garantizar su seguridad.",
  },
  {
    id: 28,
    categoria: "Señalización",
    icono: "🚲",
    dificultad: 1,
    pregunta: "¿Puedes estacionar en ciclovías?",
    opciones: ["Sí.", "No.", "Solo por 30 minutos."],
    correcta: 1,
    explicacion: "Está totalmente prohibido estacionar en ciclovías. Estas vías son exclusivas para la circulación de bicicletas y vehículos de movilidad personal.",
  },

  // ── MECÁNICA BÁSICA ────────────────────────────────────────────────────────

  {
    id: 29,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "El nombre que recibe el marcador de revoluciones del motor es:",
    opciones: ["Manómetro.", "Tacómetro.", "Pluviómetro."],
    correcta: 1,
    explicacion: "El tacómetro es el instrumento que mide y muestra las revoluciones por minuto (RPM) del motor del vehículo.",
  },
  {
    id: 30,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "El nivel correcto del electrolito en una batería es:",
    opciones: [
      "1 cm. bajo nivel de las placas.",
      "Al nivel de las placas.",
      "Sobre 1 cm. del nivel de las placas.",
    ],
    correcta: 2,
    explicacion: "El electrolito debe estar sobre 1 cm. por encima del nivel de las placas para garantizar el correcto funcionamiento de la batería.",
  },
  {
    id: 31,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Si el alternador de corriente del vehículo no carga, ¿qué pasa?",
    opciones: [
      "El motor deja de funcionar.",
      "Se descarga la batería.",
      "Se produce un desgaste rápido en los electrodos de las bujías.",
    ],
    correcta: 1,
    explicacion: "El alternador recarga la batería mientras el motor funciona. Si falla, la batería se descargará progresivamente hasta dejar el vehículo sin energía eléctrica.",
  },
  {
    id: 32,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Cuando la rueda del vehículo se calienta, indica que:",
    opciones: [
      "El pedal de freno llega a fondo.",
      "Roza la balata (pastillas) por estar muy ajustadas.",
      "Falta de líquido de frenos.",
    ],
    correcta: 1,
    explicacion: "El calentamiento de una rueda generalmente indica que las balatas o pastillas de freno están rozando el disco o tambor por estar mal ajustadas.",
  },
  {
    id: 33,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Si se corta la correa del ventilador:",
    opciones: [
      "El motor no funciona.",
      "El motor se calienta.",
      "El motor funciona solo en baja velocidad.",
    ],
    correcta: 1,
    explicacion: "La correa del ventilador acciona el sistema de refrigeración. Si se corta, el motor perderá refrigeración y comenzará a sobrecalentarse.",
  },
  {
    id: 34,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "La función del embrague es:",
    opciones: [
      "Frenar el motor del vehículo.",
      "Darle fuerza al motor del vehículo.",
      "Conectar y desconectar 'la fuerza' del motor a la caja de velocidades.",
    ],
    correcta: 2,
    explicacion: "El embrague permite conectar y desconectar la transmisión de potencia del motor hacia la caja de cambios, facilitando los cambios de marcha.",
  },
  {
    id: 35,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Una de las causas de que el motor de arranque no funcione es:",
    opciones: [
      "Cables de las bujías desconectados.",
      "Bobina en mal estado.",
      "Bornes de la batería sulfatados.",
    ],
    correcta: 2,
    explicacion: "Los bornes sulfatados impiden el paso de corriente eléctrica hacia el motor de arranque. La sulfatación crea resistencia eléctrica que bloquea el sistema.",
  },
  {
    id: 36,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "El exceso de inflado en un neumático produce:",
    opciones: [
      "Desgaste en los bordes de la banda de rodamiento.",
      "Desgaste en el centro de la banda de rodamiento del neumático.",
      "Deterioro de la válvula de inflado.",
    ],
    correcta: 1,
    explicacion: "Con exceso de presión el neumático se deforma hacia afuera y solo apoya en el centro, desgastando esa zona de forma irregular y acelerada.",
  },
  {
    id: 37,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "El desgaste disparejo de los neumáticos delanteros se debe a:",
    opciones: [
      "Exceso de velocidad en zona de curvas.",
      "Exceso de peso en el vehículo.",
      "Deficiente alineación del tren delantero y/o desgaste de amortiguadores.",
    ],
    correcta: 2,
    explicacion: "La mala alineación del tren delantero o los amortiguadores desgastados hacen que los neumáticos no apoyen de forma pareja en el pavimento.",
  },
  {
    id: 38,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "El conducir sin retirar totalmente el pie del pedal de embrague produce:",
    opciones: [
      "Desgaste en el motor del vehículo.",
      "Menor fuerza en el motor.",
      "Desgaste prematuro en balata de embrague.",
    ],
    correcta: 2,
    explicacion: "Mantener el pie sobre el embrague ('pie de plato') causa fricción constante en la balata del embrague, acelerando su desgaste.",
  },
  {
    id: 39,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "La excesiva temperatura en la batería puede deberse a:",
    opciones: [
      "Deficiente funcionamiento del regulador de voltaje.",
      "Poca chispa en las bujías.",
      "Demasiada agua destilada.",
    ],
    correcta: 0,
    explicacion: "Un regulador de voltaje defectuoso puede sobrecargar la batería con exceso de corriente, generando calor excesivo y dañando sus placas internas.",
  },
  {
    id: 40,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Si con el motor funcionando se enciende la luz roja indicadora de presión de aceite, se debe:",
    opciones: [
      "Continuar la marcha.",
      "Detener inmediatamente el vehículo y el motor.",
      "Continuar muy lentamente.",
    ],
    correcta: 1,
    explicacion: "La luz de presión de aceite encendida indica falta de lubricación en el motor. Continuar puede causar daños irreparables. Se debe detener de inmediato.",
  },
  {
    id: 41,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Circulando con el vehículo se detecta que el motor se sobrecalienta; ello se puede deber a:",
    opciones: [
      "Circuito de refrigeración obstruido.",
      "Insuficiente paso de agua caliente al radiador de la calefacción.",
      "Batería con baja carga.",
    ],
    correcta: 0,
    explicacion: "Una obstrucción en el circuito de refrigeración impide que el líquido refrigerante circule correctamente, provocando el sobrecalentamiento del motor.",
  },
  {
    id: 42,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Indica el modo más simple de limpiar los bornes sulfatados de la batería:",
    opciones: ["Ácido sulfúrico.", "Agua con bicarbonato.", "Agua destilada."],
    correcta: 1,
    explicacion: "El bicarbonato neutraliza el ácido sulfúrico de la sulfatación. Se aplica como pasta o solución sobre los bornes para limpiarlos de forma segura y eficaz.",
  },
  {
    id: 43,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Si te encuentras bajando por una pendiente pronunciada, debes:",
    opciones: [
      "Utilizar permanentemente el freno de pie.",
      "Enganchar en el cambio de velocidad correspondiente.",
      "Presionar el pedal de embrague.",
    ],
    correcta: 1,
    explicacion: "En pendientes pronunciadas se debe usar el freno motor enganchando la marcha correspondiente, evitando sobrecalentar los frenos por uso excesivo.",
  },
  {
    id: 44,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Cuando un neumático delantero tiene baja presión:",
    opciones: [
      "La dirección del vehículo tiende hacia un lado.",
      "El motor pierde potencia.",
      "Se sobrecalienta el motor.",
    ],
    correcta: 0,
    explicacion: "Un neumático delantero desinflado crea mayor resistencia de rodamiento en ese lado, haciendo que el vehículo tire hacia el lado del neumático con baja presión.",
  },
  {
    id: 45,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Para que las bandas de los neumáticos se desgasten en forma pareja se debe efectuar:",
    opciones: [
      "Un recauchado cada 10.000 kilómetros.",
      "Una rotación periódica.",
      "Un redibujado cada 15.000 kilómetros.",
    ],
    correcta: 1,
    explicacion: "La rotación periódica de neumáticos distribuye el desgaste de forma uniforme entre los cuatro, prolongando su vida útil y manteniendo el agarre parejo.",
  },
  {
    id: 46,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 1,
    pregunta: "Antes de poner un vehículo en marcha, quien conduce debe verificar:",
    opciones: [
      "El funcionamiento del tubo de escape.",
      "El funcionamiento del freno, embrague e instrumentos del tablero.",
      "El estado de la carrocería.",
    ],
    correcta: 1,
    explicacion: "Antes de conducir es obligatorio verificar que funcionen correctamente el freno, el embrague y los instrumentos del tablero para garantizar una conducción segura.",
  },
  {
    id: 47,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "La falta de presión de aire en los neumáticos produce:",
    opciones: [
      "Desgaste en el centro de la banda de rodamiento.",
      "Desgaste en los costados de la banda de rodamiento.",
      "Ninguna de las anteriores.",
    ],
    correcta: 1,
    explicacion: "Con presión insuficiente el neumático se aplana y apoya en los costados de la banda de rodamiento, desgastando esas zonas de forma irregular.",
  },

  // ── CONOCIMIENTOS LEGALES Y REGLAMENTARIOS ──────────────────────────────────

  {
    id: 48,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    pregunta: "¿Cuándo las personas que conducen deben mantenerse atentas a las condiciones del tránsito del momento?",
    opciones: ["Siempre.", "Solo en días de lluvia y niebla.", "Solo en la noche."],
    correcta: 0,
    explicacion: "La atención plena al tránsito es una obligación permanente del conductor en todo momento y bajo cualquier condición.",
  },
  {
    id: 49,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 1,
    puntaje: 2,
    pregunta: "Una persona puede manejar un vehículo bajo la influencia del alcohol.",
    opciones: ["Nunca.", "Solo de día.", "Sin estar ebrio."],
    correcta: 0,
    explicacion: "La ley chilena prohíbe conducir bajo la influencia del alcohol en cualquier circunstancia. Incluso bajos niveles de alcohol afectan los reflejos y la conducción.",
  },
  {
    id: 50,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "En condiciones normales un vehículo podrá ser conducido marcha atrás solo:",
    opciones: [
      "50 metros.",
      "30 metros.",
      "Para mantener la libre circulación o para incorporarse a ella o estacionar un vehículo.",
    ],
    correcta: 2,
    explicacion: "La ley no establece una distancia fija. El retroceso está permitido solo para mantener la circulación, incorporarse a ella o estacionar.",
  },
  {
    id: 51,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Los vehículos deberán circular por la mitad derecha de la calzada, salvo en el siguiente caso, entre otros:",
    opciones: [
      "En circulación rural, cuando la velocidad sea menor a 45 km/h.",
      "En circulación urbana, cuando la velocidad sea menor a 45 km/h.",
      "En la circulación urbana, cuando la calzada está exclusivamente señalizada para el tránsito en un solo sentido.",
    ],
    correcta: 2,
    explicacion: "En calzadas de sentido único la norma de circular por la derecha puede no aplicarse, ya que toda la vía va en el mismo sentido.",
  },
  {
    id: 52,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "En vías de doble tránsito, los vehículos que circulen en sentido opuesto, al cruzarse:",
    opciones: [
      "Deberán encender las luces bajas.",
      "Deberán señalizar con los brazos.",
      "No pasarán sobre el eje de la calzada, demarcado o imaginario.",
    ],
    correcta: 2,
    explicacion: "En vías de doble tránsito, al cruzarse con vehículos en sentido contrario, ninguno debe invadir el eje de la calzada para evitar colisiones frontales.",
  },
  {
    id: 53,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Quien conduce un vehículo puede sobrepasar a otro por la derecha, cuando:",
    opciones: [
      "El vehículo de adelante va a virar a la derecha.",
      "El vehículo de adelante va a virar a la izquierda.",
      "Nunca.",
    ],
    correcta: 1,
    explicacion: "La única excepción para adelantar por la derecha es cuando el vehículo de adelante está girando a la izquierda, dejando libre el carril derecho.",
  },
  {
    id: 54,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "No se podrá adelantar en el siguiente caso:",
    opciones: [
      "Al aproximarse a un camión.",
      "Cuando existe eje discontinuo.",
      "Al aproximarse a la cima de una cuesta.",
    ],
    correcta: 2,
    explicacion: "Está prohibido adelantar al aproximarse a la cima de una cuesta porque la visibilidad es reducida y no es posible ver si viene tráfico en sentido contrario.",
  },
  {
    id: 55,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "¿Cuál es la distancia que debe mantener quien conduce respecto al vehículo de adelante?",
    opciones: ["30 mts.", "100 mts.", "Una distancia razonable y prudente."],
    correcta: 2,
    explicacion: "La ley establece mantener una distancia razonable y prudente, que depende de la velocidad, condiciones del camino y del clima, no una distancia fija.",
  },
  {
    id: 56,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Cuando los vehículos circulan en caravana o convoy, la distancia entre los vehículos será:",
    opciones: [
      "Entre 1 a 4 metros.",
      "La suficiente para que cualquier vehículo que los adelante pueda ocupar la vía sin peligro.",
      "Ninguna, no se puede circular en caravana o convoy.",
    ],
    correcta: 1,
    explicacion: "En caravana la distancia debe ser suficiente para que los vehículos que adelantan puedan reincorporarse con seguridad entre los vehículos del convoy.",
  },
  {
    id: 57,
    categoria: "Conocimientos Legales",
    icono: "↰",
    dificultad: 1,
    pregunta: "¿Qué deberá hacer una persona conductora al iniciar un viraje a la derecha?",
    opciones: [
      "Acercarse lo más a la izquierda posible.",
      "Hacerlo desde la pista central.",
      "Acercarse lo más a la derecha posible.",
    ],
    correcta: 2,
    explicacion: "Para girar a la derecha debes anticiparte acercándote al borde derecho de la calzada, señalizando con suficiente anticipación.",
  },
  {
    id: 58,
    categoria: "Conocimientos Legales",
    icono: "↰",
    dificultad: 2,
    pregunta: "¿Qué deberá hacer una persona conductora al iniciar un viraje a la izquierda desde una vía de doble tránsito?",
    opciones: [
      "Aproximarse al costado derecho del eje o de la línea central de la vía por donde transita.",
      "Ubicarse al lado izquierdo del eje de la calzada.",
      "Acercarse lo más a la derecha posible.",
    ],
    correcta: 0,
    explicacion: "Para girar a la izquierda en vía de doble tránsito debes posicionarte progresivamente al costado derecho del eje central antes de ejecutar el viraje.",
  },
  {
    id: 59,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Se prohíbe efectuar viraje en 'U' en el siguiente caso:",
    opciones: [
      "A mitad de cuadra.",
      "A 300 mts. de una curva.",
      "En los pasos peatonales.",
    ],
    correcta: 2,
    explicacion: "Está prohibido hacer viraje en U en pasos peatonales porque pone en riesgo a los peatones que cruzan. También se prohíbe en curvas y lugares sin visibilidad.",
  },
  {
    id: 60,
    categoria: "Señalización",
    icono: "🤚",
    dificultad: 2,
    pregunta: "Para señalizar con el brazo el viraje a la izquierda, se debe colocar:",
    opciones: [
      "Extendido horizontalmente.",
      "En ángulo recto hacia arriba.",
      "Hacia abajo.",
    ],
    correcta: 0,
    explicacion: "Para señalizar viraje a la izquierda con el brazo, este debe extenderse horizontalmente hacia afuera del vehículo por la ventana del conductor.",
  },
  {
    id: 61,
    categoria: "Señalización",
    icono: "🤚",
    dificultad: 2,
    pregunta: "Para señalizar con el brazo la disminución de la velocidad o detención del vehículo, se debe poner:",
    opciones: [
      "El brazo extendido horizontalmente.",
      "El brazo en ángulo recto hacia arriba.",
      "El brazo extendido hacia abajo.",
    ],
    correcta: 2,
    explicacion: "Para indicar reducción de velocidad o detención con señas de brazo, se debe extender el brazo hacia abajo con la palma hacia atrás.",
  },
  {
    id: 62,
    categoria: "Conocimientos Legales",
    icono: "📦",
    dificultad: 1,
    pregunta: "¿Cuándo la carga podrá exceder los pesos máximos que las características técnicas del vehículo permitan?",
    opciones: ["Siempre.", "Cuando se pone carga líquida.", "Nunca."],
    correcta: 2,
    explicacion: "Nunca se puede exceder el peso máximo técnico del vehículo. Hacerlo compromete la seguridad estructural, los frenos y la estabilidad del vehículo.",
  },
  {
    id: 63,
    categoria: "Conocimientos Legales",
    icono: "📦",
    dificultad: 1,
    pregunta: "La carga deberá ser estibada y asegurada de manera que:",
    opciones: [
      "Evite todo riesgo de caída desde el vehículo.",
      "No se produzcan robos.",
      "No se deteriore por el sol.",
    ],
    correcta: 0,
    explicacion: "La carga debe asegurarse para evitar su caída, lo que representa un peligro grave para otros usuarios de la vía.",
  },
  {
    id: 64,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    pregunta: "¿Cuándo se puede transportar pasajeros en vehículos de carga?",
    opciones: [
      "Nunca.",
      "Siempre.",
      "Solo en casos justificados y adoptando medidas de seguridad adecuadas.",
    ],
    correcta: 2,
    explicacion: "El transporte de personas en vehículos de carga solo es permitido en casos justificados y con las medidas de seguridad pertinentes.",
  },
  {
    id: 65,
    categoria: "Señalización",
    icono: "💡",
    dificultad: 1,
    pregunta: "El color de las luces que proyecten hacia delante los vehículos deben ser:",
    opciones: ["Rojas y blancas.", "Blancas o amarillas.", "Rojas o blancas."],
    correcta: 1,
    explicacion: "Las luces delanteras de los vehículos deben ser blancas o amarillas. Las luces rojas están reservadas para la parte trasera del vehículo.",
  },
  {
    id: 66,
    categoria: "Señalización",
    icono: "💡",
    dificultad: 1,
    pregunta: "¿De qué color deben ser las luces de viraje traseras?",
    opciones: ["Blancas.", "Rojas o amarillas.", "Verdes."],
    correcta: 1,
    explicacion: "Las luces de viraje traseras deben ser rojas o amarillas (naranjas). Este color es estándar para señalizar cambios de dirección en la parte trasera.",
  },
  {
    id: 67,
    categoria: "Señalización",
    icono: "💡",
    dificultad: 2,
    pregunta: "¿Qué focos o luces se prohíben?",
    opciones: [
      "Los neblineros.",
      "Los busca-caminos.",
      "Todos los que induzcan a error en la conducción.",
    ],
    correcta: 2,
    explicacion: "Están prohibidas todas las luces que puedan inducir a error a otros conductores, como luces que imiten señales de emergencia o que deslumbren indebidamente.",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CUESTIONARIO OFICIAL CLASE B — Municipalidad / CONASET
  // Fuente: cuestionario clase b.pdf (dominio público municipal)
  // ══════════════════════════════════════════════════════════════════════════

  // ── MECÁNICA Y VEHÍCULO ───────────────────────────────────────────────────

  {
    id: 68,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Su vehículo se desvía hacia un lado cuando frena. ¿Qué debería hacer?",
    opciones: [
      "Cambiar los neumáticos de un lado hacia el otro.",
      "Bombear el pedal al frenar.",
      "Consultar con su mecánico lo antes posible.",
    ],
    correcta: 2,
    explicacion: "Un vehículo que tira hacia un lado al frenar indica frenos mal ajustados, problemas en neumáticos o fallas en el sistema hidráulico. Debe revisarlo un mecánico antes de continuar conduciendo.",
  },
  {
    id: 69,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Mientras conduce siente un fuerte olor a gasolina. ¿Qué debe hacer?",
    opciones: [
      "No preocuparse, son solo los gases de escape.",
      "Continuar a velocidad reducida.",
      "Detenerse e investigar el problema.",
    ],
    correcta: 2,
    explicacion: "Un olor fuerte a gasolina puede indicar una fuga de combustible, lo que representa un riesgo de incendio. Debe detenerse de inmediato en un lugar seguro e investigar antes de continuar.",
  },
  {
    id: 70,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 1,
    pregunta: "¿Cómo puede prevenir el riesgo de incendio de su vehículo?",
    opciones: [
      "Manteniendo los niveles de agua sobre el máximo.",
      "Evitando conducir con el estanque lleno de combustible.",
      "Revisando el vehículo ante cualquier olor a gasolina extraño.",
    ],
    correcta: 2,
    explicacion: "La mejor prevención es inspeccionar el vehículo ante cualquier olor inusual a gasolina, ya que las fugas son la principal causa de incendios vehiculares.",
  },
  {
    id: 71,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 1,
    pregunta: "¿Por qué es importante usar zapatos apropiados al conducir?",
    opciones: [
      "Para tener un adecuado control de los pedales.",
      "Para evitar el desgaste acelerado de las gomas de los pedales.",
      "Para poder efectuar los cambios de marcha más rápidamente.",
    ],
    correcta: 0,
    explicacion: "El uso de zapatos apropiados garantiza un control preciso de los pedales (acelerador, freno y embrague), lo que es fundamental para la seguridad al conducir.",
  },
  {
    id: 72,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Cuál elemento reduce el riesgo de lesiones de cuello en una colisión?",
    opciones: [
      "Un asiento dotado de airbag.",
      "Los frenos ABS.",
      "Un asiento con apoya-cabeza ajustado correctamente.",
    ],
    correcta: 2,
    explicacion: "El apoya-cabeza correctamente ajustado es el elemento diseñado específicamente para reducir el latigazo cervical en colisiones traseras. Debe quedar a la altura de la parte superior de la cabeza.",
  },
  {
    id: 73,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "La presión de los neumáticos debe revisarse:",
    opciones: [
      "Cuando los neumáticos están calientes, después de un viaje.",
      "Cuando los neumáticos están fríos.",
      "Da igual si están fríos o calientes.",
    ],
    correcta: 1,
    explicacion: "La presión debe medirse con los neumáticos fríos, ya que la temperatura aumenta la presión interna. Si se mide caliente, la lectura será más alta que la real y dará una medición incorrecta.",
  },
  {
    id: 74,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Cuál de estos líquidos, si está en nivel bajo, podría causar un accidente?",
    opciones: [
      "El líquido de freno.",
      "El anticongelante.",
      "El agua de la batería.",
    ],
    correcta: 0,
    explicacion: "El líquido de frenos bajo reduce directamente la eficacia del sistema de frenado, lo que puede causar accidentes graves. Es el único de los mencionados con impacto directo e inmediato en la seguridad activa.",
  },
  {
    id: 75,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Cuándo usaría las luces intermitentes de advertencia de peligro?",
    opciones: [
      "Cuando se estacione en doble fila.",
      "Cuando estacione junto a una cuneta con línea amarilla.",
      "Cuando esté en pana obstaculizando el tránsito.",
    ],
    correcta: 2,
    explicacion: "Las luces de emergencia deben usarse cuando el vehículo está detenido por avería obstruyendo el tránsito, para advertir a otros conductores del peligro. No justifican estacionamientos prohibidos.",
  },
  {
    id: 76,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Al notar que su vehículo rebota u oscila al cargarlo en un extremo, ¿qué indica esto?",
    opciones: [
      "Neumáticos gastados.",
      "Neumáticos poco inflados.",
      "Amortiguadores gastados.",
    ],
    correcta: 2,
    explicacion: "El rebote excesivo del vehículo al presionar uno de sus extremos es la prueba clásica para detectar amortiguadores desgastados. Los amortiguadores en buen estado absorben el rebote rápidamente.",
  },
  {
    id: 77,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿A qué se debe principalmente un alto consumo de combustible?",
    opciones: [
      "Fallas en el sistema de dirección.",
      "Frecuentes frenadas y aceleraciones.",
      "Conducción en marchas altas.",
    ],
    correcta: 1,
    explicacion: "Las frenadas y aceleraciones frecuentes son la principal causa de alto consumo, ya que cada aceleración requiere quemar combustible para recuperar velocidad perdida al frenar.",
  },
  {
    id: 78,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "La profundidad de los surcos de los neumáticos no debería ser inferior a:",
    opciones: ["5.0 mm", "4.0 mm", "1.6 mm"],
    correcta: 2,
    explicacion: "La profundidad mínima legal de los surcos es 1.6 mm. Por debajo de este valor la adherencia al pavimento mojado se reduce drásticamente, aumentando el riesgo de aquaplaning.",
  },
  {
    id: 79,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "Se le revienta un neumático trasero mientras conduce. ¿Qué debe hacer?",
    opciones: [
      "Frenar al máximo para detenerse cuanto antes.",
      "Señalizar y disminuir velocidad, luego detenerse lentamente al costado.",
      "Girar el volante hacia el lado contrario del desvío.",
    ],
    correcta: 1,
    explicacion: "Ante un reventón trasero no debe frenar bruscamente. Lo correcto es señalizar, reducir la velocidad gradualmente y detenerse con calma en el costado de la vía para evitar perder el control.",
  },
  {
    id: 80,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "Se le revienta un neumático delantero. ¿Qué debe hacer?",
    opciones: [
      "Frenar rápida y firmemente.",
      "Cambiarse de pista y frenar a fondo.",
      "Sostener firmemente el volante y frenar suavemente hasta detenerse.",
    ],
    correcta: 2,
    explicacion: "Con un reventón delantero el vehículo tira fuertemente hacia el lado afectado. Debe sujetar el volante con firmeza para mantener la trayectoria y frenar suavemente, nunca a fondo.",
  },
  {
    id: 81,
    categoria: "Mecánica Básica",
    icono: "⛽",
    dificultad: 1,
    pregunta: "¿Qué nunca debe hacer en una bomba de bencina?",
    opciones: ["Circular por ella.", "Fumar.", "Lavar los parabrisas."],
    correcta: 1,
    explicacion: "Fumar en una bomba de bencina está terminantemente prohibido por el riesgo de ignición de vapores de combustible, lo que podría provocar un incendio o explosión.",
  },
  {
    id: 82,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Por qué no es bueno desengancharse del motor al ir circulando?",
    opciones: [
      "Porque el vehículo resbala más.",
      "Porque no hay frenado del motor.",
      "Porque el motor se detendrá.",
    ],
    correcta: 1,
    explicacion: "Circular con el embrague pisado o en punto muerto elimina el freno motor, reduciendo el control del vehículo, especialmente en pendientes o al necesitar desacelerar rápidamente.",
  },
  {
    id: 83,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "Para bajar una pendiente muy pronunciada, ¿qué debe hacer?",
    opciones: [
      "Seleccionar un cambio alto y usar los frenos cuidadosamente.",
      "Seleccionar un cambio bajo y usar los frenos cuidadosamente.",
      "Seleccionar neutro para ahorrar combustible.",
    ],
    correcta: 1,
    explicacion: "En pendientes pronunciadas se debe seleccionar un cambio bajo para aprovechar el freno motor y usar los frenos de forma suave y controlada. Nunca bajar en neutro.",
  },
  {
    id: 84,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Para qué sirven los seguros de niños de los vehículos?",
    opciones: [
      "Aseguran las hebillas de los cinturones de seguridad.",
      "Impiden que las puertas puedan abrirse desde el interior.",
      "Bloquean las ventanas traseras manteniéndolas cerradas.",
    ],
    correcta: 1,
    explicacion: "Los seguros de niños bloquean la apertura de las puertas traseras desde el interior, evitando que niños puedan abrir la puerta accidentalmente mientras el vehículo está en movimiento.",
  },
  {
    id: 85,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "En pavimento mojado, ¿influye el estado de los neumáticos en la distancia de frenado?",
    opciones: [
      "No, la distancia de frenado depende solo de la velocidad.",
      "No, la distancia es siempre la misma para cada vehículo.",
      "Sí, el mayor desgaste determina una distancia de frenado mayor o menor.",
    ],
    correcta: 2,
    explicacion: "El estado de los neumáticos influye directamente en la distancia de frenado. Neumáticos desgastados tienen menos surcos para evacuar agua, lo que aumenta la distancia necesaria para detenerse.",
  },
  {
    id: 86,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "¿Cuál es la distancia aproximada de detención total a 90 km/h en asfalto seco?",
    opciones: ["Unos 30 metros.", "Unos 70 metros.", "Unos 120 metros."],
    correcta: 1,
    explicacion: "A 90 km/h en asfalto seco, la distancia de detención total (reacción + frenado) es aproximadamente 70 metros. Esto incluye unos 25 m de reacción y 45 m de frenado.",
  },
  {
    id: 87,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "¿Cuál es la distancia aproximada de detención total a 70 km/h en asfalto seco?",
    opciones: ["Unos 15 metros.", "Unos 45 metros.", "Unos 80 metros."],
    correcta: 1,
    explicacion: "A 70 km/h en asfalto seco, la distancia de detención total es aproximadamente 45 metros, considerando el tiempo de reacción promedio de 1 segundo y el frenado normal.",
  },
  {
    id: 88,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "¿Cuál es el tiempo de reacción promedio de un conductor ante un imprevisto?",
    opciones: ["0.1 segundos.", "1 segundo.", "2 segundos."],
    correcta: 1,
    explicacion: "El tiempo de reacción promedio de un conductor es de 1 segundo. Durante ese segundo, a 90 km/h el vehículo recorre aproximadamente 25 metros antes de que el conductor pise el freno.",
  },
  {
    id: 89,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "Si duplica su velocidad, ¿qué le ocurre a la energía cinética de su vehículo?",
    opciones: [
      "Se duplica.",
      "Se cuadruplica.",
      "Se triplica.",
    ],
    correcta: 1,
    explicacion: "La energía cinética es proporcional al cuadrado de la velocidad. Al duplicar la velocidad, la energía cinética se cuadruplica, lo que explica por qué los accidentes a alta velocidad son mucho más graves.",
  },
  {
    id: 90,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Qué es lo más importante para evitar chocar al vehículo que va adelante?",
    opciones: [
      "Asegurarse de que sus frenos sean eficientes.",
      "Conducir a una velocidad constante.",
      "Mantener una adecuada distancia de separación entre vehículos.",
    ],
    correcta: 2,
    explicacion: "La distancia de seguridad es el factor más importante. Con ella, ningún otro elemento —frenos, neumáticos, velocidad— importa tanto, pues da tiempo real para reaccionar y frenar.",
  },
  {
    id: 91,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Cuál afirmación sobre gases de escape es verdadera?",
    opciones: [
      "Los gases de escape no son peligrosos para la salud.",
      "Los gases de escape contienen monóxido de carbono, inodoro e incoloro.",
      "Los vapores de la gasolina son inocuos.",
    ],
    correcta: 1,
    explicacion: "Los gases de escape contienen monóxido de carbono (CO), un gas tóxico sin olor ni color. Un sistema de escape en mal estado puede hacer que penetre al interior del vehículo, con riesgo de intoxicación.",
  },
  {
    id: 92,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuál afirmación sobre el cinturón de seguridad es verdadera?",
    opciones: [
      "Los airbags reemplazan ventajosamente al cinturón.",
      "Para quienes van atrás, el cinturón no es útil.",
      "El cinturón disminuye las posibilidades de sufrir lesiones en un accidente.",
    ],
    correcta: 2,
    explicacion: "El cinturón de seguridad es el elemento de mayor eficacia probada en la reducción de lesiones. Los airbags son complementarios, no sustitutos, y el cinturón es obligatorio en todos los asientos.",
  },
  {
    id: 93,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Qué elementos de su vehículo debe mantener siempre limpios?",
    opciones: [
      "Solo los neumáticos y el motor.",
      "Las luces, espejos y vidrios.",
      "Solo el parabrisas delantero.",
    ],
    correcta: 1,
    explicacion: "Las luces, espejos y vidrios son elementos de seguridad visual fundamentales. Las luces sucias reducen la visibilidad nocturna; los espejos y vidrios sucios limitan el campo de visión del conductor.",
  },

  // ── VELOCIDADES Y DISTANCIAS ───────────────────────────────────────────────

  {
    id: 94,
    categoria: "Velocidades",
    icono: "🏎️",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuál es la velocidad máxima en autopistas urbanas en Chile?",
    opciones: ["80 km/h", "100 km/h", "120 km/h"],
    correcta: 1,
    explicacion: "La velocidad máxima en autopistas urbanas es 100 km/h, salvo señalización que indique lo contrario. En autopistas interurbanas puede llegar a 120 km/h.",
  },
  {
    id: 95,
    categoria: "Velocidades",
    icono: "🏎️",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuál es la velocidad máxima en carreteras interurbanas para vehículos livianos?",
    opciones: ["90 km/h", "100 km/h", "120 km/h"],
    correcta: 2,
    explicacion: "En carreteras interurbanas la velocidad máxima para vehículos livianos es 120 km/h, salvo señalización que indique otra velocidad.",
  },
  {
    id: 96,
    categoria: "Velocidades",
    icono: "🏎️",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuál es la velocidad máxima frente a un establecimiento educacional en horario de clases?",
    opciones: ["30 km/h", "40 km/h", "50 km/h"],
    correcta: 0,
    explicacion: "Frente a establecimientos educacionales en horario de clases la velocidad máxima se reduce a 30 km/h, debido al alto riesgo que representan los niños cruzando.",
  },
  {
    id: 97,
    categoria: "Velocidades",
    icono: "🏎️",
    dificultad: 3,
    puntaje: 2,
    pregunta: "A 50 km/h con buenas condiciones, ¿cuánto tarda aproximadamente en detenerse su vehículo?",
    opciones: ["Unos 10 metros.", "Unos 30 metros.", "Unos 50 metros."],
    correcta: 1,
    explicacion: "A 50 km/h la distancia de detención total (reacción + frenado) es aproximadamente 28-30 metros en condiciones normales. Muchos conductores subestiman esta distancia.",
  },
  {
    id: 98,
    categoria: "Velocidades",
    icono: "🏎️",
    dificultad: 3,
    puntaje: 2,
    pregunta: "A 70 km/h, ¿qué distancia recorre su vehículo desde que percibe un peligro hasta que comienza a frenar?",
    opciones: ["Unos 5 metros.", "Unos 20 metros.", "Unos 40 metros."],
    correcta: 1,
    explicacion: "A 70 km/h con tiempo de reacción de 1 segundo, el vehículo recorre aproximadamente 20 metros antes de que el conductor pise el freno. Esto es solo la distancia de reacción, sin contar la de frenado.",
  },

  // ── ALCOHOL, DROGAS Y CANSANCIO ────────────────────────────────────────────

  {
    id: 99,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuánto mayor es el riesgo de accidente con una alcoholemia entre 0,3 y 0,5 g/l?",
    opciones: [
      "El doble que sin alcohol.",
      "No hay mayor riesgo en esa cantidad.",
      "Cinco veces más que sin alcohol.",
    ],
    correcta: 0,
    explicacion: "Con una alcoholemia de 0,3 a 0,5 g/l, el riesgo de sufrir un accidente ya se duplica respecto a conducir sin alcohol. Incluso cantidades pequeñas afectan los reflejos y el juicio.",
  },
  {
    id: 100,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 2,
    puntaje: 2,
    pregunta: "Si ha consumido alcohol, ¿cuál es el mejor consejo para volver a casa?",
    opciones: [
      "Tomar un café cargado y luego conducir.",
      "Esperar un rato y conducir lentamente.",
      "Volver a casa en taxi o con un conductor sobrio.",
    ],
    correcta: 2,
    explicacion: "El café, el agua fría y el tiempo de espera breve no reducen el alcohol en sangre. La única solución segura es no conducir y usar un medio de transporte alternativo.",
  },
  {
    id: 101,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuáles son los efectos probables del consumo de alcohol en la conducción?",
    opciones: [
      "Mejora la coordinación y los reflejos.",
      "Reduce la concentración y empeora el juicio.",
      "No afecta si se consume con el estómago lleno.",
    ],
    correcta: 1,
    explicacion: "El alcohol reduce la concentración, empeora el juicio, aumenta la autoconfianza de manera irreal y deteriora la coordinación. Comer reduce la velocidad de absorción, pero no elimina los efectos.",
  },
  {
    id: 102,
    categoria: "Alcohol y Drogas",
    icono: "💊",
    dificultad: 2,
    puntaje: 2,
    pregunta: "Está tomando remedios que pueden afectar su conducción. ¿Qué debe hacer?",
    opciones: [
      "Conducir solo distancias cortas.",
      "Conducir solo acompañado por alguien con licencia.",
      "Solicitar consejo médico antes de conducir.",
    ],
    correcta: 2,
    explicacion: "Ante cualquier duda sobre si un medicamento afecta la capacidad de conducir, debe consultarse al médico. Algunos fármacos como antihistamínicos o relajantes musculares afectan gravemente los reflejos.",
  },
  {
    id: 103,
    categoria: "Alcohol y Drogas",
    icono: "💊",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Por qué debe consultar al médico si le han recetado un tratamiento?",
    opciones: [
      "Porque las drogas hacen más rápidas sus reacciones.",
      "Porque algunas medicinas pueden hacer que sus reacciones sean más lentas.",
      "Porque en caso de accidente no estaría cubierto por el seguro obligatorio.",
    ],
    correcta: 1,
    explicacion: "Muchos medicamentos comunes (antihistamínicos, tranquilizantes, algunos antibióticos) pueden enlentecerse los reflejos, provocar somnolencia o afectar la visión, comprometiendo la seguridad al conducir.",
  },
  {
    id: 104,
    categoria: "Alcohol y Drogas",
    icono: "😴",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Cuáles son los primeros síntomas de cansancio al conducir?",
    opciones: [
      "Se comienza a sentir calor y agresividad.",
      "Se comienza a sentir falta de interés y aparecen los bostezos.",
      "Se comienza a sentir los párpados muy pesados.",
    ],
    correcta: 1,
    explicacion: "Los primeros síntomas del cansancio son la falta de interés, la indolencia intelectual y los bostezos. En etapas más avanzadas aparecen los párpados pesados y la dificultad para mantener la dirección.",
  },
  {
    id: 105,
    categoria: "Alcohol y Drogas",
    icono: "😴",
    dificultad: 2,
    puntaje: 2,
    pregunta: "Si siente cansancio mientras conduce y no puede detenerse aún, ¿qué debe hacer?",
    opciones: [
      "Aumentar la velocidad para llegar más rápido.",
      "Golpear suavemente el manubrio para mantenerse despierto.",
      "Asegurarse de que entre aire fresco al vehículo.",
    ],
    correcta: 2,
    explicacion: "El aire fresco ayuda transitoriamente a combatir la somnolencia. Sin embargo, lo correcto es detenerse en el primer lugar seguro disponible, ya que el cansancio no puede combatirse completamente mientras se conduce.",
  },
  {
    id: 106,
    categoria: "Alcohol y Drogas",
    icono: "😴",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Qué efecto tiene la calefacción del vehículo en el nivel de somnolencia?",
    opciones: [
      "Mantiene al conductor alerta y activo.",
      "No tiene ningún efecto.",
      "Favorece la somnolencia, aumentando el riesgo de accidentes.",
    ],
    correcta: 2,
    explicacion: "La calefacción eleva la temperatura del habitáculo, lo que provoca somnolencia. Especialmente en viajes largos, es recomendable ventilar periódicamente el vehículo.",
  },

  // ── CONDUCCIÓN SEGURA ─────────────────────────────────────────────────────

  {
    id: 107,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuál es el factor que con mayor frecuencia se presenta en los accidentes de tránsito?",
    opciones: [
      "Las condiciones climáticas.",
      "Las fallas mecánicas.",
      "Los errores de los conductores.",
    ],
    correcta: 2,
    explicacion: "El factor humano es el principal causante de accidentes de tránsito. Los errores de los conductores como distracción, exceso de velocidad y alcohol están presentes en la gran mayoría de los siniestros.",
  },
  {
    id: 108,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "En cuanto al estrés al conducir, ¿cuál afirmación es falsa?",
    opciones: [
      "Un estrés moderado puede mejorar el rendimiento.",
      "Un conductor muy estresado puede tener reacciones de pánico.",
      "El estrés no influye en absoluto en los actos de un conductor.",
    ],
    correcta: 2,
    explicacion: "El estrés sí afecta la conducción. Un estrés excesivo reduce el campo de atención y puede provocar reacciones de pánico. Solo un estrés moderado puede ser positivo al mantener cierta alerta.",
  },
  {
    id: 109,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Qué puede esperarse de un conductor impulsivo?",
    opciones: [
      "Que reaccione adecuadamente ante cualquier imprevisto.",
      "Que efectúe maniobras sorpresivas y actúe sin pensar en las consecuencias.",
      "Que conduzca con excesiva precaución.",
    ],
    correcta: 1,
    explicacion: "Un conductor impulsivo tiende a actuar sin evaluar las consecuencias, realizando maniobras inesperadas que sorprenden a otros usuarios y generan situaciones de riesgo.",
  },
  {
    id: 110,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuál es el mejor consejo para una conducción segura?",
    opciones: [
      "Respetar los límites de velocidad siempre.",
      "Evitar conducir durante la noche.",
      "Contar siempre con tiempo de sobra al conducir.",
    ],
    correcta: 2,
    explicacion: "Contar con tiempo suficiente es el mejor consejo, ya que elimina la presión de llegar rápido, que es una de las principales causas de conducción arriesgada, exceso de velocidad y toma de riesgos innecesarios.",
  },
  {
    id: 111,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Qué efecto tiene conducir a unos 100 km/h sobre la visión?",
    opciones: [
      "La visión se adapta automáticamente sin cambios.",
      "El campo visual se reduce y es más difícil percibir movimientos laterales.",
      "La mayoría de los conductores se cansa la vista en media hora.",
    ],
    correcta: 1,
    explicacion: "A alta velocidad la visión se enfoca naturalmente hacia el frente y el campo visual periférico se estrecha. Esto hace más difícil detectar peatones o vehículos que aparecen desde los lados.",
  },
  {
    id: 112,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "Un conductor que va con mucha prisa tiende a:",
    opciones: [
      "Subestimar la velocidad y los riesgos.",
      "Sobrestimar la velocidad y los riesgos.",
      "Evaluar mejor los peligros al estar más alerta.",
    ],
    correcta: 0,
    explicacion: "Quien conduce con apuro tiende a subestimar los riesgos y la velocidad real, ya que la presión temporal distorsiona la percepción. Esto lo lleva a tomar decisiones arriesgadas creyendo que son seguras.",
  },
  {
    id: 113,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuáles son los 2 factores más frecuentes en accidentes de carretera con un solo vehículo?",
    opciones: [
      "No poseer licencia y conducir sin cinturón.",
      "Cansancio o alcohol, y sobrestimar capacidades conduciendo a exceso de velocidad.",
      "Fallas mecánicas y condiciones climáticas.",
    ],
    correcta: 1,
    explicacion: "En accidentes de carretera con un solo vehículo, los factores más frecuentes son el cansancio/alcohol y el exceso de confianza combinado con velocidad excesiva, no las fallas mecánicas.",
  },
  {
    id: 114,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "Si conduce y alguien le molesta con su conducción, ¿qué debe hacer?",
    opciones: [
      "Encender y apagar las luces delanteras repetidamente.",
      "Tocar la bocina para advertirle.",
      "Tratar de no reaccionar.",
    ],
    correcta: 2,
    explicacion: "Lo correcto es no reaccionar ante conductas molestas de otros conductores. Responder agresivamente puede escalar el conflicto y derivar en situaciones de riesgo conocidas como 'road rage'.",
  },
  {
    id: 115,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "Si está enfermo antes de conducir, ¿qué debe hacer?",
    opciones: [
      "Tomar una medicina antes de conducir.",
      "Acortar el viaje si es posible.",
      "No manejar.",
    ],
    correcta: 2,
    explicacion: "Si se siente enfermo, lo correcto es no conducir. Conducir enfermo reduce la concentración, los reflejos y la capacidad de reacción, aumentando significativamente el riesgo de accidente.",
  },

  // ── CONVIVENCIA VIAL ──────────────────────────────────────────────────────

  {
    id: 116,
    categoria: "Convivencia Vial",
    icono: "🚶",
    dificultad: 1,
    pregunta: "Se aproxima a un paso de peatones y un peatón está cruzando. ¿Qué debe hacer?",
    opciones: [
      "Continuar si el peatón aún está lejos.",
      "Tocar la bocina para advertirle.",
      "Respetar la prioridad del peatón y esperar a que termine de cruzar.",
    ],
    correcta: 2,
    explicacion: "El peatón siempre tiene preferencia de paso en los pasos de peatones. El conductor debe detenerse y esperar a que el peatón cruce completamente antes de continuar.",
  },
  {
    id: 117,
    categoria: "Convivencia Vial",
    icono: "🚶",
    dificultad: 2,
    pregunta: "Al girar en una intersección, hay peatones y ciclistas cruzando. ¿Qué debe hacer?",
    opciones: [
      "Virar rápidamente antes de que terminen de cruzar.",
      "Tocar la bocina para que se apresuren.",
      "Cederles el paso, permitiéndoles cruzar primero.",
    ],
    correcta: 2,
    explicacion: "Al virar en una intersección, peatones y ciclistas que cruzan tienen preferencia de paso. Debe detenerse y esperar que crucen antes de completar el viraje.",
  },
  {
    id: 118,
    categoria: "Convivencia Vial",
    icono: "🚲",
    dificultad: 2,
    pregunta: "Va detrás de un ciclista que se aproxima a una intersección. ¿Qué debe hacer?",
    opciones: [
      "Adelantarlo rápidamente antes de la intersección.",
      "Tocar la bocina para advertir su presencia.",
      "Mantenerse detrás hasta que el ciclista haya pasado la intersección.",
    ],
    correcta: 2,
    explicacion: "Ante un ciclista en una intersección, lo seguro es mantenerse detrás. Los ciclistas pueden tomar decisiones inesperadas y no siempre señalizan sus virajes. Adelantar en esa zona es peligroso.",
  },
  {
    id: 119,
    categoria: "Convivencia Vial",
    icono: "🚶",
    dificultad: 2,
    pregunta: "Ve una pelota rodar hacia la calzada cerca de niños. ¿Qué debe hacer?",
    opciones: [
      "Señalizar con la mano para que los niños no crucen.",
      "Disminuir la velocidad y estar preparado para detenerse si aparece un niño.",
      "Tocar la bocina y continuar.",
    ],
    correcta: 1,
    explicacion: "Una pelota en la calzada es una señal de que puede aparecer un niño corriendo de forma inesperada. Debe reducir la velocidad drásticamente y estar preparado para detenerse.",
  },
  {
    id: 120,
    categoria: "Convivencia Vial",
    icono: "🚗",
    dificultad: 2,
    pregunta: "Circula por una calle con vehículos estacionados al costado. ¿Por qué debe reducir velocidad?",
    opciones: [
      "Porque puede activar las alarmas de los vehículos estacionados.",
      "Porque pueden salir vehículos, alguien puede abrir una puerta o aparecer un niño entre los autos.",
      "Para poder ser visto con mayor claridad por el tránsito que viene en contra.",
    ],
    correcta: 1,
    explicacion: "La zona de vehículos estacionados presenta múltiples riesgos: vehículos que salen sin advertencia, puertas que se abren inesperadamente y peatones que emergen entre los autos.",
  },
  {
    id: 121,
    categoria: "Convivencia Vial",
    icono: "🏍️",
    dificultad: 2,
    pregunta: "¿Por qué debe tener especial cuidado con las motocicletas en el tránsito?",
    opciones: [
      "Porque las motocicletas tienen derecho preferente de paso.",
      "Porque las motocicletas son pequeñas y difíciles de ver.",
      "Porque generalmente las motocicletas circulan más rápido que los autos.",
    ],
    correcta: 1,
    explicacion: "Las motocicletas son pequeñas y tienen menor visibilidad en el tránsito, especialmente en los ángulos ciegos de los espejos. Los conductores deben buscarlas activamente antes de cambiar de pista o girar.",
  },
  {
    id: 122,
    categoria: "Convivencia Vial",
    icono: "🚌",
    dificultad: 2,
    pregunta: "¿Qué debe hacer cuando un vehículo desea incorporarse a su pista desde un costado?",
    opciones: [
      "Acelerar para no perder su posición.",
      "Cambiar de pista inmediatamente.",
      "Aligerar la presión sobre el acelerador y dejar pasar al vehículo.",
    ],
    correcta: 2,
    explicacion: "La conducción cooperativa implica facilitar la incorporación de otros vehículos cuando es seguro hacerlo. Levantar el pie del acelerador crea el espacio necesario sin necesidad de frenar bruscamente.",
  },

  // ── SEÑALIZACIÓN ──────────────────────────────────────────────────────────

  {
    id: 123,
    categoria: "Señalización",
    icono: "🚦",
    dificultad: 2,
    pregunta: "¿Qué debe hacer al ver la luz amarilla del semáforo?",
    opciones: [
      "Acelerar para pasar antes de la roja.",
      "Continuar sin reducir, el amarillo no obliga a detenerse.",
      "Frenar y detenerse si es seguro, pues anuncia que vendrá la roja.",
    ],
    correcta: 2,
    explicacion: "La luz amarilla advierte que el semáforo cambiará a rojo. Debe frenar si puede hacerlo con seguridad. Solo si ya está muy cerca y detenerse sería peligroso, puede continuar con precaución.",
  },
  {
    id: 124,
    categoria: "Señalización",
    icono: "🚦",
    dificultad: 2,
    pregunta: "¿Cuál es la finalidad de las señales reglamentarias?",
    opciones: [
      "Advertir sobre peligros en la vía.",
      "Notificar prioridades, prohibiciones, restricciones y obligaciones.",
      "Informar sobre servicios y lugares de interés.",
    ],
    correcta: 1,
    explicacion: "Las señales reglamentarias (generalmente circulares) indican las normas que deben cumplirse obligatoriamente. Su transgresión constituye una infracción a las normas del tránsito.",
  },
  {
    id: 125,
    categoria: "Señalización",
    icono: "⚠️",
    dificultad: 2,
    pregunta: "¿Cuál es la finalidad de las señales de advertencia de peligro?",
    opciones: [
      "Prohibir o limitar el tránsito de ciertos vehículos.",
      "Advertir a los usuarios sobre riesgos presentes en la vía o su entorno.",
      "Regular la preferencia o prioridad de paso.",
    ],
    correcta: 1,
    explicacion: "Las señales de advertencia o preventivas (triangulares) alertan sobre condiciones peligrosas permanentes o temporales en la vía, para que el conductor tome precauciones.",
  },
  {
    id: 126,
    categoria: "Señalización",
    icono: "🚧",
    dificultad: 2,
    pregunta: "Al llegar a una señal de CEDA EL PASO, ¿qué debe hacer?",
    opciones: [
      "Detenerse siempre, aunque no haya tránsito.",
      "Avanzar sin detenerse si tiene prioridad.",
      "Reducir la velocidad y ceder el paso a quienes circulan por la vía preferente.",
    ],
    correcta: 2,
    explicacion: "La señal CEDA EL PASO indica que debe reducir la velocidad y dar preferencia a los vehículos de la vía principal. Solo se detiene completamente si es necesario para no interferir con el tránsito preferente.",
  },
  {
    id: 127,
    categoria: "Señalización",
    icono: "🚧",
    dificultad: 1,
    pregunta: "¿Qué diferencia existe entre una señal de PARE y una de CEDA EL PASO?",
    opciones: [
      "Ninguna, ambas obligan a detenerse completamente.",
      "PARE obliga a detenerse completamente; CEDA EL PASO solo a reducir velocidad si no hay tránsito.",
      "CEDA EL PASO obliga a detenerse; PARE solo a reducir velocidad.",
    ],
    correcta: 1,
    explicacion: "PARE obliga a detenerse completamente antes de la línea de detención, siempre. CEDA EL PASO obliga a dar preferencia, pero no necesariamente a detenerse si no hay tránsito en la vía preferente.",
  },
  {
    id: 128,
    categoria: "Señalización",
    icono: "🔄",
    dificultad: 2,
    pregunta: "En una rotonda, ¿quién tiene preferencia de paso?",
    opciones: [
      "Quienes ingresan a la rotonda.",
      "Los vehículos que ya circulan dentro de la rotonda.",
      "El vehículo de mayor tamaño.",
    ],
    correcta: 1,
    explicacion: "En las rotondas, los vehículos que ya circulan dentro tienen preferencia de paso. Quienes desean ingresar deben ceder el paso hasta encontrar un espacio seguro.",
  },
  {
    id: 129,
    categoria: "Señalización",
    icono: "🚦",
    dificultad: 2,
    pregunta: "¿En qué tipo de vías aplica una velocidad máxima de 50 km/h?",
    opciones: [
      "Vías interurbanas o no urbanas.",
      "Vías urbanas.",
      "Autopistas.",
    ],
    correcta: 1,
    explicacion: "La velocidad máxima de 50 km/h aplica en vías urbanas (dentro de ciudades y pueblos). Las vías interurbanas tienen límites distintos, generalmente más altos.",
  },

  // ── PRIORIDAD DE PASO ─────────────────────────────────────────────────────

  {
    id: 130,
    categoria: "Prioridad de paso",
    icono: "↰",
    dificultad: 2,
    pregunta: "En una intersección sin señalización, ¿a quién debe dar preferencia?",
    opciones: [
      "Al vehículo que va más rápido.",
      "Al vehículo que viene por la derecha.",
      "Al vehículo de mayor tamaño.",
    ],
    correcta: 1,
    explicacion: "En intersecciones sin señalización, la regla general es dar preferencia al vehículo que viene por la derecha. Esta regla aplica cuando ambos llegan aproximadamente al mismo tiempo.",
  },
  {
    id: 131,
    categoria: "Prioridad de paso",
    icono: "↰",
    dificultad: 2,
    pregunta: "Al virar a la derecha con semáforo en verde, hay peatones cruzando. ¿Qué hace?",
    opciones: [
      "Tiene preferencia sobre los peatones por tener luz verde.",
      "Toca la bocina para que los peatones se apresuren.",
      "Debe ceder el paso a los peatones y vehículos en el cruce.",
    ],
    correcta: 2,
    explicacion: "Incluso con semáforo en verde, al virar debe ceder el paso a peatones y ciclistas que cruzan legalmente. El verde autoriza circular, pero no elimina la obligación de respetar a peatones.",
  },
  {
    id: 132,
    categoria: "Prioridad de paso",
    icono: "🚑",
    dificultad: 1,
    pregunta: "¿Qué debe hacer cuando se aproxima un vehículo de emergencia con sirena y luces?",
    opciones: [
      "Acelerar para despejar el camino lo antes posible.",
      "Detenerse o acercarse al costado derecho para ceder el paso.",
      "Mantener la velocidad para no alterar el tránsito.",
    ],
    correcta: 1,
    explicacion: "Ante la presencia de vehículos de emergencia (ambulancia, bomberos, carabineros) con señales activas, debe ceder el paso acercándose al costado derecho de la vía o deteniéndose.",
  },
  {
    id: 133,
    categoria: "Prioridad de paso",
    icono: "↰",
    dificultad: 2,
    pregunta: "Dos vehículos llegan simultáneamente a una intersección no señalizada. ¿Cuál tiene preferencia?",
    opciones: [
      "El que viene de frente.",
      "El que viene por la izquierda.",
      "El que viene por la derecha.",
    ],
    correcta: 2,
    explicacion: "En intersecciones no señalizadas, la regla de la derecha otorga preferencia al vehículo que se aproxima por la derecha del conductor. Es la regla básica de prioridad en Chile.",
  },

  // ── CONDUCCIÓN EN DISTINTAS CONDICIONES ───────────────────────────────────

  {
    id: 134,
    categoria: "Condiciones climáticas",
    icono: "🌧️",
    dificultad: 2,
    pregunta: "¿Por qué cuando hay nieve es conveniente conducir con la marcha más alta posible?",
    opciones: [
      "Para ahorrar combustible en condiciones difíciles.",
      "Para que el patinaje de las ruedas no haga funcionar el motor demasiado rápido.",
      "Para mantener mayor velocidad y cruzar las zonas resbaladizas rápido.",
    ],
    correcta: 1,
    explicacion: "Con nieve, una marcha alta reduce el par motor transmitido a las ruedas, minimizando el riesgo de patinaje. Más par en ruedas sobre nieve equivale a mayor probabilidad de perder tracción.",
  },
  {
    id: 135,
    categoria: "Condiciones climáticas",
    icono: "🌧️",
    dificultad: 2,
    pregunta: "Las condiciones climáticas adversas como lluvia, nieve o hielo, ¿qué efecto tienen?",
    opciones: [
      "Solo afectan si se conduce a más de 80 km/h.",
      "Aumentan el riesgo de deslizamiento por menor adherencia al pavimento.",
      "No afectan si los neumáticos están en buen estado.",
    ],
    correcta: 1,
    explicacion: "La lluvia, nieve o hielo reducen significativamente la adherencia entre los neumáticos y el pavimento, aumentando las distancias de frenado y el riesgo de perder el control del vehículo.",
  },
  {
    id: 136,
    categoria: "Condiciones climáticas",
    icono: "🌙",
    dificultad: 2,
    pregunta: "Al conducir de noche por una zona urbana con alumbrado público, ¿qué luces debe usar?",
    opciones: [
      "Luces altas para mejor visibilidad.",
      "Luces bajas.",
      "Luces de estacionamiento son suficientes.",
    ],
    correcta: 1,
    explicacion: "En zona urbana nocturna con alumbrado público se usan luces bajas. Las luces altas deslumbran a otros conductores y peatones, y están reservadas para zonas sin iluminación.",
  },
  {
    id: 137,
    categoria: "Conducción segura",
    icono: "⛽",
    dificultad: 2,
    pregunta: "¿Por qué los vehículos consumen más combustible en horas de congestión?",
    opciones: [
      "Porque generalmente deben conducir en una marcha lenta.",
      "Por los recurrentes cambios de pista.",
      "Porque se ven obligados a frenar y acelerar repetidamente.",
    ],
    correcta: 2,
    explicacion: "Los frenados y aceleraciones repetitivos son muy costosos en combustible. Cada frenada desperdicia la energía cinética acumulada, que luego debe recuperarse quemando más combustible al acelerar.",
  },
  {
    id: 138,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Reducir la velocidad manteniendo una marcha puesta reduce el consumo de combustible?",
    opciones: [
      "No, es mejor poner el punto muerto al desacelerar.",
      "Sí, porque el freno motor reduce el consumo al cortar la inyección.",
      "Da igual, el consumo depende solo de la aceleración.",
    ],
    correcta: 1,
    explicacion: "Al desacelerar con una marcha puesta y el pie fuera del acelerador, los motores modernos cortan la inyección de combustible. Es más eficiente que poner punto muerto, donde el ralentí sigue consumiendo.",
  },
  {
    id: 139,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuál afirmación sobre conductores jóvenes inexpertos es verdadera?",
    opciones: [
      "Reaccionan siempre más rápido que los experimentados.",
      "En situaciones complejas, los experimentados reaccionan en tiempo más corto.",
      "No hay diferencias entre conductores jóvenes y experimentados.",
    ],
    correcta: 1,
    explicacion: "Los conductores experimentados anticipan mejor las situaciones peligrosas y reaccionan más eficientemente ante maniobras complejas, aunque los jóvenes puedan tener reflejos físicos más rápidos.",
  },
  {
    id: 140,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuándo es alto el riesgo de interpretar erróneamente la realidad al conducir?",
    opciones: [
      "Cuando circula por carretera con buenas condiciones de visibilidad.",
      "Cuando está muy cansado, especialmente de noche.",
      "Cuando conduce un vehículo desconocido.",
    ],
    correcta: 1,
    explicacion: "El cansancio afecta gravemente la percepción de la realidad. De noche con cansancio, el cerebro puede generar alucinaciones, ver cosas que no existen o no percibir peligros reales.",
  },
  {
    id: 141,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "No encuentra sus anteojos para conducir. ¿Qué debe hacer?",
    opciones: [
      "Conducir lentamente por calles tranquilas.",
      "Encontrar una forma de llegar sin manejar.",
      "Conducir de noche para que las luces le ayuden.",
    ],
    correcta: 1,
    explicacion: "Si necesita anteojos para conducir y no los tiene, no debe conducir bajo ninguna circunstancia. La visión deficiente es tan peligrosa como conducir bajo los efectos del alcohol.",
  },

  // ── CONOCIMIENTOS LEGALES CLASE B ─────────────────────────────────────────

  {
    id: 142,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "¿Qué debe hacer antes de adelantar a otro vehículo?",
    opciones: [
      "Adelantar sin mirar hacia atrás si cree que es seguro.",
      "Mirar hacia adelante y atrás, señalizar y asegurarse de que no hay obstáculos.",
      "Desplazarse a la pista izquierda sin señalizar si hay espacio.",
    ],
    correcta: 1,
    explicacion: "Antes de adelantar debe: verificar por los espejos que no viene nadie, señalizar, verificar que el vehículo a adelantar no tiene obstáculos adelante, y que hay espacio de sobra para la maniobra.",
  },
  {
    id: 143,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "¿En qué caso puede sobrepasar a otro vehículo por la derecha?",
    opciones: [
      "Cuando el vehículo de adelante va a virar a la izquierda.",
      "Cuando hay vías con tres o más pistas en el mismo sentido.",
      "Ambas anteriores son correctas.",
    ],
    correcta: 2,
    explicacion: "Se puede adelantar por la derecha cuando el vehículo de adelante va a virar a la izquierda, o en vías con tres o más pistas en el mismo sentido donde el flujo lo permite.",
  },
  {
    id: 144,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "¿Con qué puntaje mínimo se aprueba el examen teórico clase B?",
    opciones: ["28 puntos de 35.", "30 puntos de 35.", "33 puntos de 35."],
    correcta: 2,
    explicacion: "El examen teórico clase B consta de 35 preguntas y se aprueba con un mínimo de 33 puntos correctos, lo que equivale a no más de 2 respuestas incorrectas.",
  },
  {
    id: 145,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 1,
    puntaje: 2,
    pregunta: "¿Es necesario usar cinturón de seguridad aunque el vehículo tenga airbag?",
    opciones: [
      "No, el airbag reemplaza al cinturón.",
      "Solo en carreteras rurales.",
      "Sí, el airbag y el cinturón están diseñados para funcionar de forma complementaria.",
    ],
    correcta: 2,
    explicacion: "El airbag está diseñado para funcionar junto al cinturón, no en su reemplazo. Sin cinturón, el airbag puede incluso causar más daño. Ambos sistemas son complementarios e igualmente obligatorios.",
  },
  {
    id: 146,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "¿Qué debe verificar antes de poner el vehículo en marcha?",
    opciones: [
      "Solo el nivel de combustible.",
      "Tomar el volante con brazos flexionados, colocarse el cinturón y verificar que los acompañantes también lo usen.",
      "Únicamente el estado de los neumáticos.",
    ],
    correcta: 1,
    explicacion: "Antes de partir, el conductor debe ajustar el asiento, colocarse el cinturón y asegurarse de que todos los ocupantes también lleven el cinturón puesto. Es una obligación legal y de seguridad.",
  },
  {
    id: 147,
    categoria: "Conocimientos Legales",
    icono: "📋",
    dificultad: 2,
    pregunta: "Debe colaborar con un inspector fiscal que supervigila la Ley de Tránsito. ¿Qué debe hacer?",
    opciones: [
      "Negarse, pues solo Carabineros tiene esa facultad.",
      "Colaborar, ya que los inspectores fiscales pueden supervigilar el cumplimiento de la Ley de Tránsito.",
      "Pedir identificación y luego decidir.",
    ],
    correcta: 1,
    explicacion: "Los inspectores fiscales están facultados por ley para supervigilar el cumplimiento de la Ley de Tránsito. El conductor debe colaborar con ellos al igual que con Carabineros.",
  },

// ── EXTRA: BASADAS EN LIBRO OFICIAL CONASET + SITUACIONES FRECUENTES ──────

  {
    id: 148,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "Al incorporarse desde una vía secundaria a una principal, ¿qué debe hacer?",
    opciones: [
      "Ingresar rápidamente para no obstaculizar el tránsito.",
      "Ceder el paso a todos los vehículos que circulan por la vía principal.",
      "Ingresar si los vehículos que vienen están a más de 100 metros.",
    ],
    correcta: 1,
    explicacion: "Al incorporarse a una vía principal desde una secundaria, siempre debe ceder el paso a los vehículos que ya circulan por ella, independientemente de la distancia a la que estén.",
  },
  {
    id: 149,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "¿En qué casos se puede hacer uso de la bocina en zona urbana?",
    opciones: [
      "Para saludar a conocidos en la vía.",
      "Para advertir a otros conductores de su adelantamiento.",
      "Solo para prevenir un siniestro cuando sea estrictamente necesario.",
    ],
    correcta: 2,
    explicacion: "En zona urbana el uso de la bocina está restringido a situaciones donde sea estrictamente necesario para prevenir un accidente. El uso innecesario o reiterado de la bocina constituye una infracción.",
  },
  {
    id: 150,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "¿Qué debe hacer si al adelantar se da cuenta de que no tendrá suficiente espacio para completar la maniobra?",
    opciones: [
      "Acelerar al máximo para completar el adelantamiento.",
      "Tocar la bocina para que el vehículo de frente reduzca la velocidad.",
      "Abortar la maniobra, frenar y reincorporarse detrás del vehículo adelantado.",
    ],
    correcta: 2,
    explicacion: "Si durante un adelantamiento el espacio resulta insuficiente, debe abortar la maniobra inmediatamente: reducir la velocidad y volver a su pista detrás del vehículo que estaba adelantando.",
  },
  {
    id: 151,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuál afirmación sobre la falta de atención al conducir es correcta?",
    opciones: [
      "Escuchar música a bajo volumen no afecta la conducción.",
      "La falta de atención a las condiciones de tránsito es una de las principales causas de accidentes.",
      "Discutir con alguien no afecta si se mantiene la vista en la vía.",
    ],
    correcta: 1,
    explicacion: "La falta de atención al tránsito es uno de los principales factores de riesgo en la conducción. Cualquier distracción — radio, conversación, teléfono — aumenta el riesgo de pasar por alto situaciones críticas.",
  },
  {
    id: 152,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Por qué los conductores que sobrestiman sus habilidades son más peligrosos?",
    opciones: [
      "Porque conducen demasiado lento e interrumpen el tránsito.",
      "Porque conducen con frecuencia demasiado rápido y crean situaciones de riesgo.",
      "Porque no revisan el vehículo antes de conducir.",
    ],
    correcta: 1,
    explicacion: "Sobrestimar las propias habilidades lleva a asumir riesgos innecesarios, conducir a velocidades excesivas y subestimar los peligros. Los jóvenes conductores son especialmente propensos a este error.",
  },
  {
    id: 153,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 3,
    pregunta: "¿Qué ocurre si duplica la velocidad de 30 a 60 km/h respecto a la distancia de reacción?",
    opciones: [
      "Se mantiene igual.",
      "Se duplica.",
      "Se cuadruplica.",
    ],
    correcta: 1,
    explicacion: "La distancia de reacción es directamente proporcional a la velocidad (relación lineal). Al duplicar la velocidad, la distancia de reacción también se duplica. En cambio, la distancia de frenado sí se cuadruplica.",
  },
  {
    id: 154,
    categoria: "Conducta Vial",
    icono: "🅿️",
    dificultad: 2,
    pregunta: "¿En qué situaciones debe usar las luces de advertencia de peligro (hazard)?",
    opciones: [
      "Al estacionar en doble fila o con línea amarilla.",
      "Al estar siendo remolcado o circulando muy lentamente por avería.",
      "Para agradecer a otro conductor que le cedió el paso.",
    ],
    correcta: 1,
    explicacion: "Las luces de advertencia de peligro deben usarse cuando el vehículo está siendo remolcado o circula lentamente por avería, para alertar a otros conductores de la situación inusual.",
  },
  {
    id: 155,
    categoria: "Convivencia Vial",
    icono: "🚶",
    dificultad: 1,
    pregunta: "¿Quiénes son los usuarios más vulnerables de la vía y requieren mayor precaución?",
    opciones: [
      "Los conductores de camiones.",
      "Los niños, jóvenes y personas mayores.",
      "Los conductores nocturnos.",
    ],
    correcta: 1,
    explicacion: "Los niños, jóvenes y adultos mayores son los usuarios más vulnerables porque tienen menor capacidad de reacción, pueden tener conductas imprevisibles (niños) o dificultades sensoriales (adultos mayores).",
  },
  {
    id: 156,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Consumir alcohol con el estómago vacío qué efecto produce?",
    opciones: [
      "Reduce el efecto del alcohol.",
      "Aumenta la velocidad de absorción del alcohol en el organismo.",
      "No cambia nada respecto a consumirlo con el estómago lleno.",
    ],
    correcta: 1,
    explicacion: "Consumir alcohol con el estómago vacío acelera significativamente su absorción en el organismo, haciendo que los efectos sean más rápidos e intensos que si se consume con alimentos.",
  },
  {
    id: 157,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "Al adelantar a un vehículo que adelanta a su vez, ¿cuándo puede comenzar?",
    opciones: [
      "En cuanto el vehículo de adelante señaliza su adelantamiento.",
      "Solo cuando el vehículo que adelanta ha terminado su maniobra y vuelto a su pista.",
      "Cuando el otro vehículo que adelanta comienza a señalizar.",
    ],
    correcta: 1,
    explicacion: "Solo puede iniciar su adelantamiento cuando el vehículo que adelantaba ha completado su maniobra y regresado a su pista. Intentarlo antes crearía una situación de múltiples vehículos en pista contraria.",
  },
  {
    id: 158,
    categoria: "Conducta Vial",
    icono: "🌙",
    dificultad: 2,
    pregunta: "Al ser adelantado de noche, ¿qué debe hacer con sus luces?",
    opciones: [
      "Mantener las luces altas tanto como sea posible.",
      "Apagar las luces para no encandilarlo.",
      "Mantener las luces bajas durante todo el adelantamiento.",
    ],
    correcta: 2,
    explicacion: "Al ser adelantado de noche, debe mantener las luces bajas para no deslumbrar al conductor que le adelanta. Las luces altas en esa situación pueden cegar al otro conductor a través de sus espejos.",
  },

// ── SITUACIONES DE MANEJO ESPECÍFICAS ─────────────────────────────────────

  {
    id: 159,
    categoria: "Conducta Vial",
    icono: "⛰️",
    dificultad: 2,
    pregunta: "Al subir una cuesta en un cambio de velocidad no adecuado, ¿qué ocurre?",
    opciones: [
      "Falla en el sistema de frenos.",
      "Exceso de consumo de combustible.",
      "Falla en la caja de cambios.",
    ],
    correcta: 1,
    explicacion: "Subir una cuesta en una marcha demasiado alta hace que el motor trabaje con dificultad, lo que aumenta el consumo de combustible y genera mayor desgaste del motor.",
  },
  {
    id: 160,
    categoria: "Conducta Vial",
    icono: "🛣️",
    dificultad: 2,
    pregunta: "Al conducir por una vía rural con un empalme lateral a la izquierda, ¿qué debe hacer?",
    opciones: [
      "Aumentar la velocidad para pasar antes de que salga algún vehículo.",
      "Conducir con cuidado y estar atento a vehículos que puedan salir por el empalme.",
      "Circular por el centro de la calzada para ver mejor.",
    ],
    correcta: 1,
    explicacion: "Los empalmes laterales son zonas de alto riesgo porque los vehículos pueden aparecer inesperadamente. Debe reducir la velocidad y estar atento, especialmente si la visibilidad es limitada.",
  },

  // ── NUEVAS PREGUNTAS EXTRAÍDAS Y ADAPTADAS (161 - 185) ──────────────────────

  {
    id: 161,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "Frente a una situación normal, ¿cuál es la forma más segura de frenar?",
    opciones: [
      "Frenando fuerte y poniendo neutro de inmediato.",
      "Frenando suavemente, presionando el embrague y tirando el freno de mano.",
      "Frenando suavemente, luego un poco más fuerte y aflojando antes de detenerse."
    ],
    correcta: 2,
    explicacion: "Para un frenado seguro, se debe aplicar presión creciente y luego disminuirla levemente justo antes de la detención total para evitar tirones y mantener el control.",
  },
  {
    id: 162,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Cuáles son las 2 principales razones por las que no se debe desenganchar el motor al ir cuesta abajo?",
    opciones: [
      "Porque se gasta más combustible y se dañan los neumáticos.",
      "Porque tendrá menor control del frenado/dirección y el vehículo agarrará velocidad.",
      "Porque el motor se detendrá y se dañará la caja de cambios."
    ],
    correcta: 1,
    explicacion: "Al circular en neutro o con el embrague presionado, se pierde el efecto del freno motor, lo que hace que los frenos convencionales se sobrecalienten y el conductor pierda capacidad de reacción.",
  },
  {
    id: 163,
    categoria: "Convivencia Vial",
    icono: "👪",
    dificultad: 1,
    pregunta: "¿Para qué sirven los seguros de niños en las puertas traseras de los vehículos?",
    opciones: [
      "Para bloquear las ventanas traseras.",
      "Para impedir que las puertas se abran desde el interior.",
      "Para asegurar las hebillas de los cinturones."
    ],
    correcta: 1,
    explicacion: "El seguro de niños anula la manilla interior, permitiendo la apertura únicamente desde el exterior para evitar que menores abran la puerta en movimiento.",
  },
  {
    id: 164,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "Si su distancia de reacción es de 10m y la de frenado es 8m a una velocidad X, ¿cuál será su distancia de detención si duplica la velocidad?",
    opciones: [
      "36 metros.",
      "52 metros.",
      "64 metros."
    ],
    correcta: 1,
    explicacion: "Al duplicar la velocidad, la reacción se duplica (20m) y la distancia de frenado se cuadruplica (32m). 20 + 32 = 52 metros.",
  },
  {
    id: 165,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Qué distancia de detención aproximada tiene un tren que circula a 100 km/h?",
    opciones: [
      "Aproximadamente 200 metros.",
      "Entre 800 y 1000 metros.",
      "Más de 2000 metros."
    ],
    correcta: 1,
    explicacion: "Debido a su gran masa e inercia, un tren requiere una distancia mucho mayor que un automóvil; a 100 km/h esta distancia bordea el kilómetro.",
  },
  {
    id: 166,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Usted está descendiendo una pendiente muy larga. ¿Qué debería hacer para controlar la velocidad?",
    opciones: [
      "Seleccionar una marcha baja para usar el freno motor.",
      "Poner el vehículo en neutro.",
      "Presionar el pedal de embrague constantemente."
    ],
    correcta: 0,
    explicacion: "En pendientes prolongadas se debe utilizar el freno motor bajando una marcha, evitando que los frenos de servicio se sobrecalienten y fallen.",
  },
  {
    id: 167,
    categoria: "Normas de Tránsito",
    icono: "⚖️",
    dificultad: 3,
    pregunta: "Según la 'Ley No Chat', ¿qué acción está prohibida incluso con el vehículo detenido en un semáforo rojo?",
    opciones: [
      "Mirar un mapa en el tablero del auto.",
      "Manipular un dispositivo digital con la mano.",
      "Escuchar música por altavoces."
    ],
    correcta: 1,
    explicacion: "La Ley 21.377 prohíbe la manipulación de dispositivos móviles o digitales mientras se conduce, lo que incluye los tiempos de espera en señales de tránsito.",
  },
  {
    id: 168,
    categoria: "Convivencia Vial",
    icono: "👪",
    dificultad: 2,
    pregunta: "¿Cuál es la distancia lateral mínima que debe dejar al adelantar a un ciclista?",
    opciones: [
      "0.5 metros.",
      "1.0 metro.",
      "1.5 metros."
    ],
    correcta: 2,
    explicacion: "La Ley de Convivencia Vial establece un mínimo de 1.5 metros de separación lateral para resguardar la seguridad del ciclo.",
  },
  {
    id: 169,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Qué es el efecto 'túnel' y cómo se produce?",
    opciones: [
      "Una falla visual al entrar a un túnel oscuro.",
      "La reducción del campo visual lateral al aumentar la velocidad.",
      "La ceguera temporal por cambios bruscos de luz."
    ],
    correcta: 1,
    explicacion: "A mayor velocidad, el cerebro descarta la información lateral para enfocarse en el centro, reduciendo el campo visual drásticamente.",
  },
  {
    id: 170,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "Si el pedal de freno se siente 'elástico' o 'esponjoso', ¿qué indica probablemente?",
    opciones: [
      "Falta de alineación en las ruedas.",
      "Aire en el sistema de frenos.",
      "Desgaste normal de las pastillas."
    ],
    correcta: 1,
    explicacion: "El tacto esponjoso suele ser síntoma de burbujas de aire en el circuito hidráulico, lo que reduce la eficiencia del frenado.",
  },
  {
    id: 171,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 3,
    puntaje: 2,
    pregunta: "Bajo la Ley Emilia, ¿cuál es la sanción por causar la muerte conduciendo en estado de ebriedad y huir?",
    opciones: [
      "Multa de 5 UTM.",
      "Cárcel efectiva de al menos un año.",
      "Suspensión de licencia por 3 meses."
    ],
    correcta: 1,
    explicacion: "La Ley Emilia establece cárcel efectiva de al menos 1 año para quienes causen accidentes graves ebrios y abandonen el lugar o se nieguen al alcotest.",
  },
  {
    id: 172,
    categoria: "Normas de Tránsito",
    icono: "⚖️",
    dificultad: 2,
    pregunta: "¿Hasta qué edad es obligatorio que los niños viajen en el asiento trasero?",
    opciones: [
      "Hasta los 8 años.",
      "Hasta cumplir los 12 años.",
      "Hasta que midan 1.50 metros."
    ],
    correcta: 1,
    explicacion: "La ley prohíbe que niños menores de 12 años viajen en el asiento del acompañante delantero, salvo excepciones de vehículos sin asiento trasero.",
  },
  {
    id: 173,
    categoria: "Señales de Tránsito",
    icono: "🚦",
    dificultad: 2,
    pregunta: "Si enfrenta un semáforo apagado o parpadeante en un cruce, ¿quién tiene prioridad?",
    opciones: [
      "El vehículo que circule más rápido.",
      "El vehículo que se acerque por la derecha del otro.",
      "El vehículo que va por la calle más ancha."
    ],
    correcta: 1,
    explicacion: "Ante un semáforo defectuoso, rige la norma del Derecho Preferente de Paso: el vehículo que se acerca por la izquierda debe ceder al de la derecha.",
  },
  {
    id: 174,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cómo debe actuar ante el 'reventón' de un neumático delantero?",
    opciones: [
      "Frenar a fondo inmediatamente.",
      "Sujetar el volante con fuerza y frenar con mucha suavidad.",
      "Girar el volante hacia el lado contrario del reventón rápidamente."
    ],
    correcta: 1,
    explicacion: "Debe sujetar el volante con firmeza para mantener la trayectoria y soltar el acelerador, frenando solo cuando el vehículo esté controlado.",
  },
  {
    id: 175,
    categoria: "Velocidad",
    icono: "🏎️",
    dificultad: 1,
    puntaje: 2,
    pregunta: "¿Cuál es el límite máximo de velocidad en zona urbana para vehículos particulares?",
    opciones: [
      "60 km/h.",
      "50 km/h.",
      "40 km/h."
    ],
    correcta: 1,
    explicacion: "Desde 2018, la velocidad máxima en zonas urbanas de Chile es de 50 km/h para todo tipo de vehículos livianos.",
  },
  {
    id: 176,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Qué indica que los neumáticos tengan más desgaste en el centro que en los bordes?",
    opciones: [
      "Presión de aire demasiado alta.",
      "Presión de aire demasiado baja.",
      "Falta de rotación de neumáticos."
    ],
    correcta: 0,
    explicacion: "El exceso de aire hace que el neumático se abulte por el centro, provocando un desgaste prematuro en esa zona de contacto.",
  },
  {
    id: 177,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Qué distancia recorre un vehículo a 90 km/h durante un segundo de reacción?",
    opciones: [
      "Aproximadamente 15 metros.",
      "Aproximadamente 25 metros.",
      "Aproximadamente 45 metros."
    ],
    correcta: 1,
    explicacion: "A 90 km/h el vehículo recorre unos 25 metros por segundo. Conocer esto es vital para mantener una distancia de seguridad adecuada.",
  },
  {
    id: 178,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 2,
    puntaje: 2,
    pregunta: "¿Qué estado se considera si un conductor tiene 0.5 gramos de alcohol por mil en la sangre?",
    opciones: [
      "Bajo la influencia del alcohol.",
      "Estado de ebriedad.",
      "Condición normal."
    ],
    correcta: 0,
    explicacion: "Entre 0.31 y 0.79 g/l se define legalmente como 'Bajo la influencia del alcohol'. Desde 0.8 g/l es 'Estado de ebriedad'.",
  },
  {
    id: 179,
    categoria: "Convivencia Vial",
    icono: "👪",
    dificultad: 1,
    pregunta: "En una 'Zona 30', ¿cuál es el objetivo principal?",
    opciones: [
      "Permitir el estacionamiento libre.",
      "Proteger a usuarios vulnerables limitando la velocidad a 30 km/h.",
      "Indicar que la calle está en mal estado."
    ],
    correcta: 1,
    explicacion: "Las Zonas 30 son áreas de calmado de tráfico diseñadas para reducir la gravedad de accidentes y favorecer a peatones y ciclistas.",
  },
  {
    id: 180,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Cuál es la profundidad mínima legal permitida de los surcos de un neumático?",
    opciones: [
      "1.0 mm.",
      "1.6 mm.",
      "3.0 mm."
    ],
    correcta: 1,
    explicacion: "Aunque se recomienda cambiarlos con 3mm por seguridad, el mínimo legal antes de ser rechazado en revisión técnica es 1.6 mm.",
  },
  {
    id: 181,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cuándo es más peligroso conducir bajo la lluvia?",
    opciones: [
      "Cuando ya ha llovido por varias horas.",
      "Justo cuando empieza a caer la lluvia.",
      "Inmediatamente después de que deja de llover."
    ],
    correcta: 1,
    explicacion: "Las primeras gotas se mezclan con el polvo y el aceite del pavimento, creando una película extremadamente resbaladiza antes de ser lavada.",
  },
  {
    id: 182,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Qué función cumple el líquido de frenos?",
    opciones: [
      "Lubricar las pastillas de freno.",
      "Transmitir la fuerza ejercida sobre el pedal hacia las ruedas.",
      "Enfriar los discos de freno tras un frenado largo."
    ],
    correcta: 1,
    explicacion: "Es un líquido hidráulico que transmite la presión desde el pedal hasta los cilindros de freno en las ruedas para detener el vehículo.",
  },
  {
    id: 183,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "Si las ruedas traseras de su vehículo resbalan hacia la izquierda, ¿qué debe hacer?",
    opciones: [
      "Girar el volante hacia la derecha.",
      "Girar el volante hacia la izquierda.",
      "Frenar a fondo para detener el giro."
    ],
    correcta: 1,
    explicacion: "Ante un sobreviraje (derrape trasero), debe girar el volante suavemente hacia el mismo lado que derrapan las ruedas traseras para recuperar el control.",
  },
  {
    id: 184,
    categoria: "Normas de Tránsito",
    icono: "⚖️",
    dificultad: 1,
    pregunta: "¿Qué significa la línea longitudinal continua pintada al centro de la calzada?",
    opciones: [
      "Que no se puede adelantar.",
      "Que se puede adelantar con precaución.",
      "Que solo pueden circular vehículos pesados."
    ],
    correcta: 0,
    explicacion: "La línea continua prohíbe el paso de vehículos a la otra pista para adelantar o realizar virajes en U por razones de seguridad.",
  },
  {
    id: 185,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 2,
    pregunta: "¿Cómo afecta el peso excesivo de carga a la conducción?",
    opciones: [
      "Mejora la estabilidad en curvas.",
      "Aumenta la distancia de frenado y desgasta más los frenos.",
      "No afecta si la carga está bien amarrada."
    ],
    correcta: 1,
    explicacion: "Un vehículo sobrecargado requiere mucha más energía para detenerse, aumentando la distancia necesaria y el riesgo de fatiga en los frenos.",
  },

  {
    id: 186,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Qué es la 'distancia de parada total' (o de detención)?",
    opciones: [
      "Es la distancia que recorre el auto desde que el conductor frena hasta que se detiene.",
      "Es la suma de la distancia de reacción más la distancia de frenado.",
      "Es la distancia que recorre el auto en un segundo de tiempo."
    ],
    correcta: 1,
    explicacion: "Es el trayecto total: desde que ves el peligro (reacción) hasta que el auto queda en 0 km/h (frenado).",
  },
  {
    id: 187,
    categoria: "Convivencia Vial",
    icono: "👪",
    dificultad: 2,
    pregunta: "En un cruce peatonal, ¿qué debe hacer si un peatón se baja de la acera?",
    opciones: [
      "Tocar la bocina para que se detenga.",
      "Ceder siempre el paso, ya que el peatón tiene preferencia en el paso cebra.",
      "Pasar rápido si el peatón aún está lejos del centro de la calle."
    ],
    correcta: 1,
    explicacion: "El peatón tiene prioridad total en pasos de cebra. El conductor debe detenerse antes de la línea de detención marcada.",
  },
  {
    id: 188,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Para qué sirve el termómetro del panel de instrumentos?",
    opciones: [
      "Para medir la temperatura ambiental exterior.",
      "Para indicar la temperatura del líquido refrigerante del motor.",
      "Para saber si el aire acondicionado está enfriando bien."
    ],
    correcta: 1,
    explicacion: "Indica la temperatura de trabajo del motor. Si sube a la zona roja, se debe detener el vehículo de inmediato para evitar fundir el motor.",
  },
  {
    id: 189,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "Usted se acerca a una curva cerrada a la izquierda. ¿Qué debería hacer?",
    opciones: [
      "Frenar mientras está dentro de la curva para mantener el control.",
      "Reducir la velocidad antes de entrar a la curva y acelerar suavemente al salir.",
      "Mantener la velocidad alta para que la inercia ayude al giro."
    ],
    correcta: 1,
    explicacion: "La frenada siempre se hace en línea recta antes de girar. Frenar fuerte dentro de la curva puede provocar un derrape por la fuerza centrífuga.",
  },
  
  {
    id: 190,
    categoria: "Normas de Tránsito",
    icono: "⚖️",
    dificultad: 2,
    pregunta: "¿Cuál es el objetivo principal de las señales de tránsito de color amarillo (Advertencia)?",
    opciones: [
      "Indicar prohibiciones u órdenes que se deben cumplir.",
      "Advertir al conductor de peligros existentes o riesgos en la vía.",
      "Entregar información sobre servicios cercanos como gasolineras."
    ],
    correcta: 1,
    explicacion: "Las señales amarillas son preventivas; nos avisan con tiempo sobre curvas, zonas de escuela o peligros para que reduzcamos la velocidad.",
  },
  {
    id: 191,
    categoria: "Alcohol y Drogas",
    icono: "🍺",
    dificultad: 3,
    puntaje: 2,
    pregunta: "¿Cuál es el efecto de la fatiga o el cansancio en la visión?",
    opciones: [
      "Mejora la visión nocturna por el esfuerzo ocular.",
      "Provoca visión borrosa y mayor sensibilidad al encandilamiento.",
      "No afecta la visión, solo la fuerza de las manos."
    ],
    correcta: 1,
    explicacion: "El cansancio ralentiza el procesamiento de imágenes y hace que nos sea más difícil recuperarnos del brillo de las luces de otros autos.",
  },
  {
    id: 192,
    categoria: "Convivencia Vial",
    icono: "👪",
    dificultad: 1,
    pregunta: "Si un vehículo de emergencia (ambulancia o bomberos) viene detrás con sirenas, ¿qué debe hacer?",
    opciones: [
      "Acelerar para no estorbar el paso.",
      "Desplazarse hacia la derecha y detenerse si es necesario para dejar libre el paso.",
      "Mantener su posición y no moverse hasta que el semáforo cambie."
    ],
    correcta: 1,
    explicacion: "Es obligación ceder el paso desplazándose lateralmente. Si es necesario, se puede subir levemente a la acera con precaución para abrir el camino.",
  },
  {
    id: 193,
    categoria: "Mecánica Básica",
    icono: "🔧",
    dificultad: 2,
    pregunta: "¿Qué significa el dibujo de un pequeño surtidor de combustible en el tablero?",
    opciones: [
      "Que el estanque está lleno.",
      "Que el vehículo ha entrado en la reserva y debe cargar combustible pronto.",
      "Que el sistema de inyección está fallando."
    ],
    correcta: 1,
    explicacion: "Es el indicador de nivel bajo. Conducir con la reserva puede succionar impurezas del fondo del estanque y dañar los inyectores.",
  },
  {
    id: 194,
    categoria: "Conducción segura",
    icono: "🛡️",
    dificultad: 3,
    pregunta: "¿Qué es el 'punto ciego' de un vehículo?",
    opciones: [
      "Un área alrededor del vehículo que no puede ser vista a través de los espejos retrovisores.",
      "El momento en que el sol nos da de frente y no vemos nada.",
      "Una falla en las luces traseras que no iluminan el suelo."
    ],
    correcta: 0,
    explicacion: "Son zonas ocultas por la carrocería. Para compensarlos, es necesario girar levemente la cabeza antes de cambiarse de pista.",
  },
  
  {
    id: 195,
    categoria: "Normas de Tránsito",
    icono: "⚖️",
    dificultad: 2,
    pregunta: "Usted llega a un cruce ferroviario que tiene las barreras levantadas pero no hay luces. ¿Qué hace?",
    opciones: [
      "Pasa rápidamente sin mirar.",
      "Se detiene, mira a ambos lados y escucha antes de cruzar.",
      "Toca la bocina y cruza con cuidado."
    ],
    correcta: 1,
    explicacion: "Incluso con barreras arriba, siempre se debe verificar visual y auditivamente. Los sistemas automáticos pueden fallar.",
  },

  // ── PREGUNTAS CON IMAGEN ─────────────────────────────────────────────────────

  {
    id: 196,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/196_ceda_el_paso.png",
    pregunta: "¿Qué significa esta señal de tránsito?",
    opciones: [
      "Pare",
      "Ceda el paso",
      "Prohibido adelantar",
    ],
    correcta: 1,
    explicacion: "Obliga a ceder el paso a los vehículos que circulan por la vía a la que se aproxima.",
  },

  {
    id: 197,
    categoria: "Señales",
    icono: "⚠️",
    dificultad: 1,
    imagen: "/imagenes/197_curva_derecha.png",
    pregunta: "¿Qué indica esta señal de advertencia?",
    opciones: [
      "Curva a la derecha",
      "Curva a la izquierda",
      "Camino sinuoso",
    ],
    correcta: 1,
    explicacion: "Indica la proximidad de una curva hacia la izquierda.",
  },

  {
    id: 198,
    categoria: "Demarcación",
    icono: "🚶",
    dificultad: 1,
    imagen: "/imagenes/198_paso_peatonal.png",
    pregunta: "¿Qué indica la señal?",
    opciones: [
      "Zona de detención",
      "Cruce de ciclistas",
      "Paso de peatones",
    ],
    correcta: 2,
    explicacion: "Estas líneas delimitan el área donde los peatones tienen preferencia para cruzar.",
  },

  {
    id: 199,
    categoria: "Mecánica",
    icono: "🔧",
    dificultad: 2,
    imagen: "/imagenes/199_testigo_bateria.png",
    pregunta: "Si observa este testigo en su tablero, ¿qué sistema falla?",
    opciones: [
      "Falla en el motor",
      "Falla en el alternador o carga",
      "Baja presión de aceite",
    ],
    correcta: 1,
    explicacion: "Indica un problema en el sistema de carga de la batería (alternador).",
  },

  {
    id: 200,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/200_prohibido_camiones.png",
    pregunta: "¿Qué significa esta señal de prohibición?",
    opciones: [
      "Camino para camiones",
      "Solo carga y descarga",
      "Prohibida la circulación de vehículos de carga",
    ],
    correcta: 2,
    explicacion: "Prohíbe la entrada de camiones a una zona determinada.",
  },

  {
    id: 201,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 2,
    imagen: "/imagenes/201_mantener_derecha.png",
    pregunta: "¿Qué deben hacer los conductores al ver esta señal?",
    opciones: [
      "Solo a la derecha",
      "Solo a la izquierda",
      "Mantenerse a la derecha",
    ],
    correcta: 2,
    explicacion: "Obliga a los conductores a circular por el lado derecho de un refugio o obstáculo.",
  },

  {
    id: 202,
    categoria: "Mecánica",
    icono: "🔧",
    dificultad: 2,
    imagen: "/imagenes/202_testigo_temperatura.png",
    pregunta: "¿Qué indica este símbolo en el tablero?",
    opciones: [
      "Bajo nivel de agua",
      "Sobrecalentamiento del motor",
      "Falla en aire acondicionado",
    ],
    correcta: 1,
    explicacion: "Indica que la temperatura del refrigerante del motor es excesivamente alta.",
  },

  {
    id: 203,
    categoria: "Señales",
    icono: "⚠️",
    dificultad: 3,
    imagen: "/imagenes/203_pendiente_fuerte.png",
    pregunta: "¿Qué significa esta señal de advertencia?",
    opciones: [
      "Subida peligrosa",
      "Pendiente fuerte de bajada",
      "Zona de derrumbes",
    ],
    correcta: 1,
    explicacion: "Advierte sobre una bajada pronunciada donde se debe usar el freno de motor.",
  },

  {
    id: 204,
    categoria: "Demarcación",
    icono: "🛣️",
    dificultad: 1,
    imagen: "/imagenes/204_flecha_direccion.png",
    pregunta: "¿Qué indica la flecha blanca pintada en la calzada?",
    opciones: [
      "Sentido del tránsito",
      "Solo virar a la izquierda",
      "Dirección obligatoria",
    ],
    correcta: 2,
    explicacion: "Indica la dirección que el conductor está obligado a seguir.",
  },

  {
    id: 205,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/205_hospital.png",
    pregunta: "¿Qué significa esta señal informativa?",
    opciones: [
      "Cruz roja",
      "Farmacia",
      "Hospital o Centro de salud",
    ],
    correcta: 2,
    explicacion: "Indica la proximidad de un recinto asistencial de salud.",
  },

  {
    id: 206,
    categoria: "Semáforos",
    icono: "🚦",
    dificultad: 3,
    imagen: "/imagenes/206_roja_flecha_verde.png",
    pregunta: "¿Qué debe hacer ante un semáforo con luz roja y flecha verde?",
    opciones: [
      "Detenerse totalmente",
      "Pasar solo si va derecho",
      "Virar con precaución en sentido de la flecha",
    ],
    correcta: 2,
    explicacion: "Permite el viraje en la dirección de la flecha pese a la luz roja, cediendo el paso a peatones.",
  },

  {
    id: 207,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/207_proximidad_semaforo.png",
    pregunta: "¿Qué indica esta señal de advertencia?",
    opciones: [
      "Zona de juegos",
      "Proximidad de semáforo",
      "Cruce peligroso",
    ],
    correcta: 1,
    explicacion: "Advierte que se aproxima a una intersección regulada por semáforo.",
  },

  {
    id: 208,
    categoria: "Demarcación",
    icono: "🛣️",
    dificultad: 1,
    imagen: "/imagenes/208_linea_discontinua.png",
    pregunta: "¿Qué significa la línea discontinua al centro de la calzada?",
    opciones: [
      "Prohibido adelantar",
      "Se puede adelantar con precaución",
      "Solo para bicicletas",
    ],
    correcta: 1,
    explicacion: "Permite el adelantamiento y el cambio de pista siempre que sea seguro.",
  },

  {
    id: 209,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/209_prohibido_bicicletas.png",
    pregunta: "¿Qué significa esta señal de prohibición?",
    opciones: [
      "Ciclovía cercana",
      "Prohibida la circulación de bicicletas",
      "Prioridad ciclistas",
    ],
    correcta: 1,
    explicacion: "Indica que las bicicletas no pueden circular por esa vía.",
  },

  {
    id: 210,
    categoria: "Señales",
    icono: "⚠️",
    dificultad: 2,
    imagen: "/imagenes/210_angostamiento.png",
    pregunta: "¿Qué significa esta señal?",
    opciones: [
      "Camino ancho",
      "Angostamiento de la vía",
      "Puente levadizo",
    ],
    correcta: 1,
    explicacion: "Advierte que la calzada se estrecha más adelante.",
  },

  {
    id: 211,
    categoria: "Mecánica",
    icono: "💡",
    dificultad: 1,
    imagen: "/imagenes/211_luces_altas.png",
    pregunta: "¿Qué indica este símbolo?",
    opciones: [
      "Luces bajas",
      "Luces de posición",
      "Luces altas encendidas",
    ],
    correcta: 2,
    explicacion: "Es el testigo azul que indica que las luces altas están activadas.",
  },

  {
    id: 212,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/212_pare.png",
    pregunta: "¿Qué significa esta señal reglamentaria?",
    opciones: [
      "Ceda el paso",
      "Pare",
      "Prohibido seguir",
    ],
    correcta: 1,
    explicacion: "Obliga a detener el vehículo por completo antes de la línea de detención.",
  },

  {
    id: 213,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 1,
    imagen: "/imagenes/213_aeropuerto.png",
    pregunta: "¿Qué significa esta señal?",
    opciones: [
      "Zona de viento",
      "Aviones volando bajo",
      "Proximidad de aeropuerto",
    ],
    correcta: 2,
    explicacion: "Informa sobre la cercanía de un aeropuerto o aeródromo.",
  },

  {
    id: 214,
    categoria: "Señales",
    icono: "🚦",
    dificultad: 2,
    imagen: "/imagenes/214_no_entrar.png",
    pregunta: "¿Qué significa esta señal de prohibición?",
    opciones: [
      "Prohibida la circulación de automóviles",
      "Prohibido estacionar",
      "Calle sin salida",
    ],
    correcta: 0,
    explicacion: "Indica la prohibición de circulación para automóviles (vehículos motorizados livianos) en el sentido o área donde se encuentra instalada. Significa que ningún vehículo de este tipo puede ingresar o transitar por esa vía.",
  },

  {
    id: 215,
    categoria: "Mecánica",
    icono: "⛽",
    dificultad: 1,
    imagen: "/imagenes/215_combustible.png",
    pregunta: "¿Qué indica este símbolo en el tablero?",
    opciones: [
      "Falla motor",
      "Bajo nivel de combustible",
      "Fuga de aceite",
    ],
    correcta: 1,
    explicacion: "Indica que el vehículo ha entrado en la reserva de combustible.",
  },

  















































































































































  

  
















];

// ── UTILIDADES ──────────────────────────────────────────────────────────────

/**
 * Genera un examen aleatorio de N preguntas
 * Opcionalmente filtrado por categoría
 */
export function generarExamen(cantidad = 35) {
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const dobles = shuffle(PREGUNTAS.filter((p) => p.puntaje === 2));
  const simples = shuffle(PREGUNTAS.filter((p) => p.puntaje !== 2));

  // Exactamente 3 de doble puntaje + 32 simples = 35 preguntas, máximo 38 pts
  const selDobles = dobles.slice(0, Math.min(3, dobles.length));
  const selSimples = simples.slice(0, cantidad - selDobles.length);

  return shuffle([...selDobles, ...selSimples]);
}

/**
 * Lista de categorías únicas disponibles
 */
export const CATEGORIAS = [...new Set(PREGUNTAS.map((p) => p.categoria))];