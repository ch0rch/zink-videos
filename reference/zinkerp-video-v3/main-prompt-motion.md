# Main prompt de motion graphics — ZinkERP

Plantilla maestra para armar briefs de videos de motion graphics (no filmados) para las redes de ZinkERP: X, Instagram y LinkedIn. Está basada en lo que se repite en los prompts que mejor funcionan en [Prompt Motion](https://prompt-motion.com/) (librería de videos hechos con Claude Opus 5.5 + Remotion, HyperFrames o HTML; analicé la home, Templates, Customize, los posts de método y 15 entradas con su prompt o skill).

Nada de esto se publica sin el OK explícito de Fer («publicá la N» o equivalente).

Fecha de armado: 23 de noviembre de 2026 (America/Buenos_Aires).

---

## Veredicto (para qué sirve y para qué no)

Sirve, y puede dar calidad de red si el brief es largo y específico. Prompt Motion no es un generador de video “de cámara”: es una librería de **motion graphics hechos con código** (tipo, formas, UI abstracta, números que se mueven). Un prompt corto tipo «make a dynamic 15-second showreel, go all out» se copió decenas de veces y los resultados van de flojos a muy buenos; deja demasiado al azar. Los prompts que sostienen calidad tienen cinco piezas: **un solo concepto**, **lista de lo prohibido**, **timing a un beat**, **método de render** y **un paso de revisión** antes del MP4 final.

Límites honestos:

- No reemplaza un video filmado, un testimonio ni un recorrido real del producto.
- La UI en pantalla no puede hacerse pasar por una captura del ERP. O es **UI abstracta** (cartas, listas, números, tipografía) o son **capturas reales de QA**.
- El audio es optativo. En redes el video suele arrancar sin sonido: todo lo importante tiene que leerse en pantalla.
- La calidad depende del modelo (en la librería, Claude Opus 5.5 a máximo esfuerzo) y de revisar fotogramas, no solo de pegar el prompt.

---

## Cómo usarlo

1. Completá los placeholders de la sección «Brief de esta pieza» (más abajo hay dos ejemplos ya llenos).
2. Pegá el bloque **Main prompt** + el brief completo a un modelo que pueda escribir código y renderizar (la librería usó Claude Opus 5.5, effort max).
3. El modelo tiene que devolver primero el concepto en una línea, el storyboard beat por beat y 4 stills. Recién después escribe código.
4. Revisá textos, hechos y que no se haya inventado un cliente, un número “real” o un módulo que no está.
5. Render del MP4. Fer aprueba antes de publicar.

---

## Reglas duras de producto y marca

Estas reglas van también dentro del prompt. No se negocian en una pieza puntual.

- La marca se escribe **ZinkERP** (nunca «Zink ERP», «Zinkerp» ni «Zink»).
- Solo se muestra el **core** en producción: ventas y facturación ARCA, stock por sucursal, compras, caja y finanzas, multisucursal con usuarios ilimitados, Mercado Pago y punto de venta.
- Cualquier otra cosa (Cheques, Depósitos, Tareas de depósito, Promociones, Producción, CRM, Contable, OT, Logística, RRHH, Marketing, Portal Cliente, etc.) es **módulo** y, si se nombra, va con la etiqueta **«Próximamente»**. No se comunica como disponible.
- No hay prueba gratis pública. No prometas trial, 7 días ni “probá gratis”.
- El soporte es humano por WhatsApp y email. **Nunca 24x7**, ni horarios inventados.
- No inventes datos, clientes, testimonios, métricas de un negocio real ni logos de terceros. Si hay números en pantalla, son **ejemplo** y tiene que poder leerse que lo son (o ser tan genéricos que no parezcan un caso).
- CTA exacto, sin variar: **«Agendá una demo, desde 15 minutos»**. Apunta a [https://zinkerp.com/agendar-demo](https://zinkerp.com/agendar-demo).
- Tono rioplatense, de vos. La pieza abre con el problema concreto (la venta que se pierde, el stock que no está, la caja que no cierra), no con un folleto («la mejor gestión», «bien para tu comercio»).
- Textos en pantalla en español rioplatense, cortos, sin punto final en títulos.

---

## Tokens de marca y formato

Paleta oficial (PDF de Zink in Tech). Usar como máximo esos violetas/cianes + negro, blanco y un off-white. No inventar un acento extra.

| Rol | Hex |
|---|---|
| Violeta primario | `#723f97` |
| Violeta secundario | `#8262a9` |
| Violeta claro | `#a49fce` |
| Cian primario | `#10b0e6` |
| Cian claro | `#8fcdf0` |

- Tipografía: **Montserrat** (la institucional). ExtraBold 800 en wordmark y titulares. Un solo typeface, no Geist ni Inter (salen por defecto en muchos prompts de la librería).
- Símbolo: isologo «Núcleo Esencial», diamante de 4 módulos (3 violeta + 1 cian). Sirve como motivo que conecta escenas. No armar un logo nuevo ni un cubo/engranaje “de ERP”.
- Fondos: off-white cálido o casi negro. Un modo por pieza, no mezclar light y dark sin motivo.
- Easing: springs de forma cerrada (función pura del tiempo), **overshoot mínimo**. Nada de rebote caricaturesco, ni linear en todo, ni `Math.random`.
- Duración: **15 a 30 s**. Tempo de partida: 120 BPM, algo pasa en cada beat. Holds de más de 0,5 s solo si hay que leer un texto.
- Formatos (declarar píxeles en el prompt, no solo el ratio):

| Red / uso | Ratio | Tamaño |
|---|---|---|
| Reels / Stories / X vertical | 9:16 | 1080×1920 |
| Feed IG / LinkedIn cuadrado | 1:1 | 1080×1080 (o 1440×1440) |
| LinkedIn / X horizontal, web | 16:9 | 1920×1080 |

En la galería, la mayoría de los launch videos salen en 16:9 porque el prompt no pedía otra cosa. Si la pieza es para Reels o X vertical, el ratio tiene que estar en el brief desde el primer frame.

---

## Cómo se renderiza (y qué hay en esta máquina)

Todos los videos de Prompt Motion los escribe un modelo como código; otra herramienta arma el MP4 frame a frame (no se “graba la pantalla” en vivo, para no perder frames).

| Enfoque | Cuándo usarlo | Licencia / setup |
|---|---|---|
| **HTML + `seek(t)` + Playwright + ffmpeg** (default para ZinkERP) | Piezas de redes: tipo, UI abstracta, números. El más simple y el más común en la galería. | Playwright es de instalar cuando toque renderizar. ffmpeg y Chrome ya están en la box. |
| HyperFrames (HeyGen) | Si queremos un renderer listo para agentes, sin React. | Apache 2.0. Hay que clonar el repo cuando se use. |
| Remotion (React) | Si reusamos componentes reales del producto o de la web. | Revisar la licencia comercial de Remotion antes de usarlo para la empresa. Más setup (studio, proyecto React). |
| Three.js | Solo si la pieza pide 3D de verdad (casi nunca para estos cortes de 15–30 s). | Suma complejidad de más para typography + UI. |

En esta box, hoy (sin instalar nada pesado): **Node v24.22.1**, npm 11.21.1, **ffmpeg 7.1.5**, **Google Chrome 156**. No están preinstalados Playwright (paquete npm ni browsers), Remotion ni HyperFrames. Cuando fer pedimos el primer render, el camino más corto es: un HTML con `window.seek(t)`, Playwright usando el Chrome que ya está (`channel: "chrome"`), 60 fps, 3–4 subframes por frame mezclados con `ffmpeg tmix` para motion blur, audio (si hay) a −14 LUFS.

---

## Brief de esta pieza (completar antes de pegar el main prompt)

```
FORMATO:        {{FORMATO}}          # 9:16 | 1:1 | 16:9
PIXELS:         {{PIXELS}}           # 1080x1920 | 1080x1080 | 1920x1080
DURACION:       {{DURACION}}         # 15 a 30 segundos
RED:            {{RED}}              # X | Instagram | LinkedIn
TEMA:           {{TEMA}}             # una sola capacidad del core
PROMESA:        {{PROMESA}}          # una línea, lo que gana el dueño
PROBLEMA:       {{PROBLEMA}}         # la venta o la plata que se pierde, en una línea
HOOK:           {{HOOK}}             # texto de apertura, ≤ 12 palabras, sin punto final
MOMENTOS:       {{MOMENTOS}}         # 3 a 5 momentos, en orden, solo del core
CONCEPTO:       {{CONCEPTO}}         # un solo motivo visual que nunca corta (se transforma)
UI:             {{UI}}               # abstracta | capturas QA (y las rutas)
NUMEROS:        {{NUMEROS}}          # ejemplos genéricos, rotulados como ejemplo
FONDO:          {{FONDO}}            # off-white | casi negro
MUSICA:         {{MUSICA}}           # ninguna | pista royalty-free (origen y licencia)
CTA:            Agendá una demo, desde 15 minutos
URL:            zinkerp.com/agendar-demo
```

---

## Main prompt (copiar tal cual, con el brief ya lleno)

```
Eres un motion designer senior. Vas a armar un video de motion graphics (no filmado) para las redes de ZinkERP, un ERP SaaS para pymes y comercios de Argentina, de Zink in Tech.

Primero leé el brief de esta pieza y estas reglas. Después mostrame, sin escribir código todavía:
1) el concepto en una sola línea;
2) el storyboard beat por beat (120 BPM, qué pasa en cada beat, textos exactos en pantalla);
3) cuatro stills descritos (hook, problema, momento de producto, end card).
Cuando yo te diga que sigas, construí el HTML y renderizá el MP4 final. No me pidas más datos si el brief está completo: si falta un detalle menor, elegí la opción más sobria y anotala.

CONCEPTO
Un solo concepto visual: {{CONCEPTO}}. Cada escena sale de la anterior: el motivo se transforma (tamaño, radio, color, contenido) en lugar de cortar o hacer crossfade. Una idea por plano. El hook tipográfico abre; el end card cierra con wordmark + CTA + URL. Si el video loopea, el último frame coincide con el primero (posición del motivo, cursor y tipografía). Si no loopea, termina en el end card y se queda ahí el último medio compás.

DIRECCIÓN
Estilo: SaaS de producto, limpio, técnico, con aire. No corporativo pesado ni lúdico.
Canvas: {{FONDO}}. Paleta únicamente oficial: violeta #723f97, violeta #8262a9, violeta #a49fce, cian #10b0e6, cian #8fcdf0, más negro, blanco y off-white. Un acento dominante por pieza (violeta o cian), el otro como apoyo puntual.
Tipografía: solo Montserrat (Google Fonts). ExtraBold 800 en wordmark y titulares; pesos 500–700 en labels. Tracking un poco cerrado en títulos. Nada de Geist, Inter, ni display genérico.
Texto en pantalla: español rioplatense, de vos, corto, sin punto final en títulos. Tiene que entenderse sin audio (en redes arranca muted). No pongas labels chicos en las esquinas tipo HUD.
UI: {{UI}}. Si es abstracta, son cartas, listas, selectores y números esquemáticos: nunca una ventana fotorealista que parezca una captura de ZinkERP. Si son capturas de QA, usá solo los archivos que te pasé, sin retocar datos ni inventar chrome alrededor que finja otra pantalla.
Cursor: si hay un click o un arrastre, que se sienta físico (down, hold, up), no un fade del estado.
Cámara: un solo lenguaje (push-in o travelling suave). El motivo llena el cuadro en cada momento. Nunca camera shake.
Motion: springs de forma cerrada (suma de respuestas a cada cambio de target, función pura del tiempo). Overshoot mínimo. Blur solo a favor de la dirección en movimientos rápidos. Nada de easing rebotón.

PROHIBIDO
Glows y neon, particle bursts, lens flares, RGB split, camera shake, shockwave rings, grid floors, fondos que parpadean, crossfades y blur-ins, gradients en el chrome de la UI, iconos con strokes que no coinciden, kits de UI stock, footage stock salvo que el brief lo pida con licencia, texto decorativo en las esquinas, holds de más de 0,5 s sin nada que leer, dead time, Math.random, y cualquier cosa que se vea a plantilla o “hecha por un modelo”.
Tampoco: prueba gratis, trial, 24x7, horarios de soporte, clientes inventados, testimonios, métricas de un negocio real, logos de terceros, ni un módulo presentado como disponible. La marca se escribe ZinkERP.

ESTRUCTURA Y TIMING
Duración {{DURACION}} (entre 15 y 30 s). Formato {{FORMATO}} a {{PIXELS}}, 60 fps. 120 BPM; algo sucede en cada beat. Recorte típico (ajustá los compases a la duración, ~2 s por compás):
- Compás 1: hook {{HOOK}}. Entra palabra por palabra o por máscara, en el beat.
- Compases 2–3: el problema {{PROBLEMA}}, visible (dos realidades que no coinciden, no un párrafo).
- Compases del medio: los momentos {{MOMENTOS}}, uno por compás o por dos, siempre saliendo del motivo {{CONCEPTO}}. Un cursor puede conducir el cambio.
- Anteúltimo compás: la promesa {{PROMESA}} en una línea, tipográfica, sin adornos.
- Último compás: end card con isologo + wordmark ZinkERP, el CTA exacto «Agendá una demo, desde 15 minutos» y la URL zinkerp.com/agendar-demo. Sin botones inventados ni “Start free”.

REGLAS DE PRODUCTO (otra vez, para lo que aparece en cuadro)
Solo el core: ventas y facturación ARCA, stock por sucursal, compras, caja y finanzas, multisucursal con usuarios ilimitados, Mercado Pago y punto de venta. El tema de esta pieza es {{TEMA}}. Si aparece un módulo, la palabra es «módulo» y la etiqueta es «Próximamente». Números: {{NUMEROS}}.

BUILD
1. Un solo archivo HTML a {{PIXELS}}. Todo estilo se calcula a partir del tiempo en window.seek(t): sin CSS animations, sin transitions, sin timers, sin estado entre frames.
2. Springs y easings exponenciales escritos como funciones del tiempo. Un valor con varios targets es la suma de un spring por cambio.
3. Audio: {{MUSICA}}. Si hay pista, que sea royalty-free con licencia comercial, arranque en un downbeat, y los hits de UI caigan en el peak medido, no en el inicio del archivo. Loudnorm a −14 LUFS. Si no hay música, el video es silencioso y el texto carga toda la historia.
4. Render con Playwright, usando Chrome, a 60 fps. 3 o 4 subframes por frame, mezclados con ffmpeg tmix para motion blur. Después mux del audio si existe.
5. Antes del render completo: un fotograma por beat. Corregí lo que esté fuera de grilla, apretado, superpuesto o difícil de leer. En textos que entran y salen dentro de un contenedor que se transforma, dales timing propio para que no se pisen. Nunca will-change sobre algo que la cámara escala (el texto se ve borroso).
6. Sin Math.random. Si hace falta variación, un seed fijo para que preview y render coincidan.

AL ENTREGAR
Dame el HTML, el MP4 y el storyboard final. Listá cualquier supuesto que hayas tomado.
```

---

## Ejemplo 1 — Stock por sucursal

Pieza lista para pegar debajo del main prompt (el main prompt se usa igual; este es el brief ya completo).

```
FORMATO:        9:16
PIXELS:         1080x1920
DURACION:       20 segundos
RED:            Instagram / X
TEMA:           stock por sucursal
PROMESA:        Ver qué hay en cada sucursal, sin llamar
PROBLEMA:       La planilla dice que hay, pero en la otra sucursal no está, y se pierde la venta
HOOK:           La planilla dice que hay
MOMENTOS:
  1. Una tarjeta de producto se parte en dos sucursales (Centro y Norte), nombres genéricos
  2. El número de una se queda en 12 y el de la otra baja a 0, rotulado «ejemplo»
  3. Al elegir la sucursal que sí tiene, el número queda en primer plano
CONCEPTO:       La tarjeta del producto, que se parte en columnas de sucursal y se vuelve a unir en el diamante de ZinkERP
UI:             abstracta (cartas y números esquemáticos, no una captura falsa del ERP)
NUMEROS:        SKU «Remera básica M», Sucursal Centro 12 y Sucursal Norte 0, todos como ejemplo, no de un cliente
FONDO:          off-white
MUSICA:         ninguna (el video se entiende muted)
CTA:            Agendá una demo, desde 15 minutos
URL:            zinkerp.com/agendar-demo
```

Storyboard de referencia (120 BPM, 10 compases de 2 s):

| Tiempo | Compás | En pantalla |
|---|---|---|
| 0–2 s | 1 | Hook: «La planilla dice que hay». Montserrat 800, violeta. |
| 2–6 s | 2–3 | La misma línea se parte: a la izquierda sigue «hay»; a la derecha aparece «en la otra, no». Se pierde la venta, dicha en una línea corta: «la venta se va». |
| 6–8 s | 4 | Una tarjeta abstracta «Remera básica M» (ejemplo) ocupa el cuadro. |
| 8–12 s | 5–6 | La tarjeta se parte en «Sucursal Centro 12» y «Sucursal Norte 0». El 0 queda en cian, sin drama visual de más. |
| 12–16 s | 7–8 | Un selector esquemático elige Centro; Norte se retrae; queda una sola columna legible. Promesa: «Ver qué hay en cada sucursal, sin llamar». |
| 16–20 s | 9–10 | Las dos columnas se pliegan en el diamante de 4 módulos + wordmark ZinkERP. CTA: «Agendá una demo, desde 15 minutos». Debajo: zinkerp.com/agendar-demo. |

---

## Ejemplo 2 — Caja local por local

```
FORMATO:        1:1
PIXELS:         1080x1080
DURACION:       18 segundos
RED:            LinkedIn / feed IG
TEMA:           caja y finanzas, por sucursal
PROMESA:        Ver la caja de cada local, sin esperar el WhatsApp del cierre
PROBLEMA:       Cerrás un local y todavía no sabés cuánta plata quedó en el de al lado
HOOK:           Cerrás el local y no sabés la caja de al lado
MOMENTOS:
  1. Un cierre de caja (rendición) de un operador, en un local
  2. El mismo motivo se duplica en un segundo local, cada uno con su total
  3. Los dos totales conviven en un mismo cuadro, sin mezclarse
CONCEPTO:       Un recuadro de cierre de caja que se duplica en dos locales y termina en el diamante de ZinkERP
UI:             abstracta (un recuadro de cierre con ítems esquemáticos; no simular la pantalla real de ZinkERP)
NUMEROS:        «Local 1» y «Local 2», totales $ 154.000 y $ 89.500 como ejemplo, operador «Caja A» / «Caja B», sin nombre de comercio real
FONDO:          casi negro
MUSICA:         ninguna (el video se entiende muted)
CTA:            Agendá una demo, desde 15 minutos
URL:            zinkerp.com/agendar-demo
```

Storyboard de referencia (120 BPM, 9 compases, ~18 s):

| Tiempo | Compás | En pantalla |
|---|---|---|
| 0–2 s | 1 | Hook en off-white sobre casi negro: «Cerrás el local y no sabés la caja de al lado». |
| 2–6 s | 2–3 | El texto se parte en dos mitades vacías: un local “cerrado” y el de al lado en espera. Una línea: «el cierre llega por WhatsApp, tarde». |
| 6–10 s | 4–5 | Aparece un recuadro abstracto de cierre: «Local 1 · Caja A · $ 154.000» (ejemplo). Ítems mínimos (efectivo, Mercado Pago), sin fingir una captura. |
| 10–14 s | 6–7 | El recuadro se duplica a «Local 2 · Caja B · $ 89.500». Los dos totales quedan juntos, cada uno en su columna. Promesa: «Ver la caja de cada local, sin esperar el WhatsApp del cierre». |
| 14–18 s | 8–9 | Los recuadros se pliegan en el diamante + ZinkERP. CTA: «Agendá una demo, desde 15 minutos». URL: zinkerp.com/agendar-demo. |

---

## Fuentes

Prompts y skills pertenecen a sus creadores; cada entrada de Prompt Motion linkea el post original en X. Acá van las que usé para armar esta plantilla (y los posts de método del sitio). No copiamos un prompt ajeno de cabo a rabo: tomamos la estructura común y la adaptamos a ZinkERP.

### Método y plantillas (Prompt Motion)

- Librería: [https://prompt-motion.com/](https://prompt-motion.com/)
- Templates: [https://prompt-motion.com/templates](https://prompt-motion.com/templates)
- Customize: [https://prompt-motion.com/customize](https://prompt-motion.com/customize)
- The showreel prompt (Prompt Motion): [https://prompt-motion.com/templates/showreel](https://prompt-motion.com/templates/showreel)
- The 3D template (Prompt Motion): [https://prompt-motion.com/templates/realtime](https://prompt-motion.com/templates/realtime)
- What 230 real prompts show: [https://prompt-motion.com/blog/ai-motion-graphics-prompts](https://prompt-motion.com/blog/ai-motion-graphics-prompts)
- Launch videos (92 prompts): [https://prompt-motion.com/blog/ai-launch-video-prompts](https://prompt-motion.com/blog/ai-launch-video-prompts)
- Explainers (27 prompts): [https://prompt-motion.com/blog/ai-explainer-video-prompts](https://prompt-motion.com/blog/ai-explainer-video-prompts)
- Por qué se ven “AI-made”: [https://prompt-motion.com/blog/make-ai-motion-graphics-look-less-ai](https://prompt-motion.com/blog/make-ai-motion-graphics-look-less-ai)
- Remotion vs HyperFrames vs HTML: [https://prompt-motion.com/blog/remotion-vs-hyperframes](https://prompt-motion.com/blog/remotion-vs-hyperframes)
- Tag Product UI: [https://prompt-motion.com/tags/product-ui](https://prompt-motion.com/tags/product-ui)

### Entradas de la galería (prompt o skill + creador)

| Entrada | Creador | Tipo | Herramienta | Post en X |
|---|---|---|---|---|
| [Shape morphing through UI states](https://prompt-motion.com/twoclipping-5cba86) | [zero (@twoclipping)](https://x.com/twoclipping) | Prompt (474 palabras; un shape, never cut; springs; banned list; Playwright) | HTML + Playwright | [post](https://x.com/twoclipping/status/2103273003555402193) |
| [Photo print app launch film](https://prompt-motion.com/twoclipping-221cab) | [zero (@twoclipping)](https://x.com/twoclipping) | Prompt (912 palabras; launch 1:1, 120 BPM) | HTML + Playwright | [post](https://x.com/twoclipping/status/2103835273813496100) |
| [UGC ad generator promo](https://prompt-motion.com/twoclipping-6dd14e) | [zero (@twoclipping)](https://x.com/twoclipping) | Prompt (bloque inputs / direction / structure / build / gotchas / start; «3 a 5 UI moments») | HTML + Playwright | [post](https://x.com/twoclipping/status/2102554209166000267) |
| [Orange dot motion system](https://prompt-motion.com/ultimaxbt-bbebf5) | [@ultimaxbt](https://x.com/ultimaxbt) | Prompt (un punto conecta todas las escenas; banned list fuerte) | HTML | [post](https://x.com/ultimaxbt/status/2107486052550062398) |
| [White ball UI motion loop](https://prompt-motion.com/rossaxbt-94583b) | [@rossaxbt](https://x.com/rossaxbt) | Prompt (un mundo de UI, una cámara, un motivo) | HTML | [post](https://x.com/rossaxbt/status/2108933141406638456) |
| [Negroni recipe animation](https://prompt-motion.com/ror-fly-9950f1) | [@Ror_Fly](https://x.com/Ror_Fly) | Prompt (explainer: un proceso de principio a fin) | HTML | [post](https://x.com/Ror_Fly/status/2102853258582880547) |
| [Animated business explainer](https://prompt-motion.com/alex-prompter-1ea044) | [@alex_prompter](https://x.com/alex_prompter) | Prompt (plantilla de 5 escenas: problema → qué hago → 3 pasos → prueba → nombre) | HTML | [post](https://x.com/alex_prompter/status/2103499977632997524) |
| [Engraving-style Claude ad](https://prompt-motion.com/lexnlin-038035) | [Leon Lin (@LexnLin)](https://x.com/LexnLin) | Prompt (dirección + lista de lo que no; 10–15 s) | no declarada | [post](https://x.com/LexnLin/status/2106101651010449796) |
| [Dub promo video](https://prompt-motion.com/steventey-0d20e4) | [@steventey](https://x.com/steventey) | Prompt corto (showreel + URL); sirve de contraejemplo | no declarada | [post](https://x.com/steventey/status/2103625902211088880) |
| [Enxovaly baby app promo](https://prompt-motion.com/gabrielbuzziv-4ff0c6) | [@gabrielbuzziv](https://x.com/gabrielbuzziv) | Prompt corto de showreel (caso HyperFrames) | HyperFrames | [post](https://x.com/gabrielbuzziv/status/2103590703289057430) |
| [Travel visa service promo](https://prompt-motion.com/thismacapital-dfba20) | [@thismacapital](https://x.com/thismacapital) | Prompt corto de showreel | no declarada | [post](https://x.com/thismacapital/status/2103773635714375808) |
| [Lightspark social promo](https://prompt-motion.com/davidmarcus-a28a60) | [@davidmarcus](https://x.com/davidmarcus) | Prompt corto vertical 9:16 | no declarada | [post](https://x.com/davidmarcus/status/2103275618045686217) |
| [TasteSkill dashboard showcase](https://prompt-motion.com/lexnlin-f9b3bd8) | [Leon Lin (@LexnLin)](https://x.com/LexnLin) | Skill de dirección de arte para dashboards | [taste-skill](https://github.com/Leonxlnx/taste-skill) | [post](https://x.com/LexnLin/status/2112674349132194185) |
| [Cinetic skill launch film](https://prompt-motion.com/lexnlin-6161a6) | [Leon Lin (@LexnLin)](https://x.com/LexnLin) | Skill para conceptuar y renderizar un launch film desde código | [cinetic](https://github.com/Leonxlnx/cinetic) | [post](https://x.com/LexnLin/status/2106891315371737480) |
| [HTML app demo skill](https://prompt-motion.com/mengto-a7f4679) | [Meng To (@MengTo)](https://x.com/MengTo) | Skill: demo HTML con un solo reloj, para loop y scrub | React; [html-demo](https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/html-demo) | [post](https://x.com/MengTo/status/2112843787777249661) |
| [Reddit marketing tool launch](https://prompt-motion.com/anthonyriera-9b1b2a) | [Anthony Riera (@anthonyriera)](https://x.com/anthonyriera) | Skill: aprende el design system y renderiza el film en Remotion | Remotion; [product-film-skill](https://github.com/Rieranthony/product-film-skill) | [post](https://x.com/anthonyriera/status/2103784508860305566) |
| [Claude motion designer showreel](https://prompt-motion.com/stephanlivera-df17a2) | [@stephanlivera](https://x.com/stephanlivera) | Prompt original de 26 palabras («go all out»), el más copiado | no declarada | ver entrada |
| [Launch video remake comparison](https://prompt-motion.com/notdwd-c2037d) | [@notdwd](https://x.com/notdwd) | Prompt muy largo (inputs + momentos de UI); referencia de especificidad, no de tono | no declarada | [post](https://x.com/notdwd/status/2104401208958230764) |

El prompt mejorado de showreel y el de 3D son de Prompt Motion (sitio de [@p4nthera_](https://x.com/p4nthera_)).
