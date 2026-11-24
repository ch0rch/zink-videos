# ZinkERP · Showreel 15

Film de producto de 14,9 s para ZinkERP. Una sola idea: **una venta en Centro, seguida por todo el sistema**. Se cobra, baja del stock, entra en la caja y cada sucursal tiene la suya. Todo sale del isologo y vuelve a él.

El texto en pantalla es la frase que ya usa la web (`zinkerp.com`): «Vendés, se descuenta el stock y la caja queda al día».

## Entregables

Todo queda en `out/showreel-15/`.

| Archivo | Qué es |
|---|---|
| `zinkerp-showreel-15.mp4` | Master 1920×1080, 60 fps, H.264, con la banda de sonido |
| `zinkerp-showreel-15-mudo.mp4` | El mismo master sin audio |
| `zinkerp-showreel-15-vertical.mp4` | Recomposición 1080×1920 para Reels, Stories y X |
| `zinkerp-showreel-15-vertical-mudo.mp4` | La vertical sin audio |
| `poster.png`, `poster-vertical.png` | Último fotograma de cada versión |
| `contact-sheet.jpg`, `contact-sheet-vertical.jpg` | 16 fotogramas decodificados del MP4 final |
| `frames/`, `frames-vertical/` | Esos 16 fotogramas a resolución completa |
| `audio/zinkerp-showreel-15-score.wav` | Banda de sonido sola (48 kHz, estéreo) |

Duración exacta: **14,900 s** (894 fotogramas a 60 fps), en las dos versiones.

## Storyboard

120 BPM: un beat cada 0,5 s. Los golpes que pesan caen en un beat.

| Tiempo | Qué se ve | De dónde sale | Texto | Ritmo |
|---|---|---|---|---|
| 0,00 – 0,93 | Tinta violeta. Un destello cian: es el módulo suelto del isologo. El resto del símbolo se arma módulo por módulo, cada uno saliendo de su vecino. | Del negro | — | Preciso, contenido |
| 0,93 – 1,90 | La cámara atraviesa el símbolo. El módulo cian gira 45°, crece y pasa de cian a blanco: es la pantalla del POS. | El módulo del isologo se convierte en la superficie | — | Empuje |
| 2,00 – 3,90 | Centro / POS. Dos escaneos (2,0 y 2,5 s): el total rueda a AR$ 4.850,00 y a AR$ 9.700,00. La columna de totales flota sobre la tarjeta. Se aprieta Finalizar (3,25) y aparece «Venta registrada» (3,5). | — | **Vendés** (2,75) | Dos golpes y un cierre |
| 3,90 – 5,00 | De la cantidad del ítem sale una ficha «−2». La cámara la sigue hasta la consulta de stock. | La cantidad vendida viaja de una pantalla a la otra | — | Viaje |
| 5,00 – 6,60 | Centro / Consulta de stock. La fila de Centro se levanta para recibir la ficha: 51.00 rueda a 49.00. Sur queda en 13.00. | — | **El stock se descuenta** (5,4) | Golpe y calma |
| 6,60 – 7,83 | La línea violeta que subraya la fila de Centro sigue de largo, cruza el escenario y pasa a ser la línea de Caja diaria. Los recuadros cuelgan de ella a medida que llega. | Una línea de la interfaz conecta las dos pantallas | — | Viaje |
| 7,50 – 9,75 | Centro / Caja diaria. «+ AR$ 9.700,00» corre por la línea y cae en Efectivo en caja (8,0). El recuadro se levanta: AR$ 1.852,00 → AR$ 11.552,00. Después, en cascada: cantidad de ventas 1 → 2, total ventas, ingresos, efectivo. | El importe de la venta llega a su lugar | **La caja queda al día** (8,57) | Golpe y cascada |
| 9,75 – 11,70 | La tarjeta de caja se achica hasta ser un recuadro «Centro / Caja diaria». De atrás sale «Sur / Caja diaria». Cámara de frente, sin inclinación. | La caja se convierte en una por sucursal | **En cada sucursal** (10,77) | El momento más quieto |
| 11,70 – 12,50 | Los dos recuadros se achican, giran 45° y toman color: son dos módulos del isologo. Los otros catorce cierran el símbolo alrededor. | Las sucursales se pliegan en la marca | — | Cierre |
| 12,50 – 14,90 | El logotipo sale del símbolo de izquierda a derecha. Debajo, la línea de marca (13,0) y el llamado a la acción (13,4). Desde 14,0 no se mueve nada. | — | **Ventas, stock y caja. En un solo sistema** · Agendá una demo, desde 15 minutos · zinkerp.com/agendar-demo | Resolución y quietud |

Todos los tiempos salen de `src/showreel/timeline.ts`. Cambiar un número ahí mueve imagen y sonido juntos.

## Lenguaje de movimiento

- **Un objeto por transición.** Nada se funde ni corta: el módulo se vuelve tarjeta, la cantidad viaja como ficha, la línea de una tabla es la línea de la otra pantalla, la caja se vuelve recuadro y el recuadro vuelve a ser módulo.
- **Una sola cámara.** Todas las pantallas viven en un mismo plano. La cámara sigue al objeto que viaja, se acerca apenas (3,5 %) mientras una pantalla está en cuadro y devuelve esa distancia en el viaje siguiente.
- **Profundidad con motivo.** Lo que importa en cada pantalla se despega de la tarjeta: la columna de totales, la fila de Centro, Efectivo en caja. Tiene sombra propia y paralaje con la inclinación de la cámara.
- **Números mecánicos.** Solo ruedan las columnas que cambian, y una cifra que gana un dígito se abre en vez de saltar.
- **Curvas.** Llegadas con `cubic-bezier(0.16, 1, 0.3, 1)`, viajes con `cubic-bezier(0.72, 0, 0.18, 1)`, asentamientos con un resorte de forma cerrada (≈1 % de sobrepaso). Nada lineal, nada rebota. Todo es función pura del fotograma: no hay `Math.random` ni temporizadores.
- **Luz.** Tinta violeta, una luz clave que sigue a la pantalla en cuadro, viñeta y grano solo detrás del producto. La interfaz queda limpia.

## Marca y producto usados

| Recurso | Origen |
|---|---|
| Isologo y logotipo | `zinkerp.com/brand/zinkerp-horizontal_dark_tight.svg`, sin redibujar. `scripts/extract-brand.mjs` separa los 16 módulos (posición y color exactos) del logotipo. |
| Paleta | `#723f97`, `#8262a9`, `#a49fce`, `#10b0e6`, `#8fcdf0` de `main-prompt-motion.md` |
| Tipografía | Montserrat (marca, del zip). Roboto para la interfaz, que es la que usa la app en las capturas. |
| Centro / POS | `qa-capturas/02-pos-venta.png` |
| Venta registrada | `qa-capturas/03a-venta-registrada.png` |
| Centro / Consulta de stock | `qa-capturas/01-stock-antes.png` y `04-stock-despues.png` |
| Centro / Caja diaria | `qa-capturas/05-caja-centro.png` |
| Colores de la interfaz | Muestreados de esas capturas: violeta `#7500b9`, verde `#43a047`, fila `#e6e6e6` |

Las pantallas están reconstruidas en React a partir de las capturas, no son las capturas escaladas. Los datos son los del ambiente de QA: Yerba mate 1 kg (EJ001), 2 × AR$ 4.850,00, stock 51 → 49 en Centro y 13 en Sur, caja de AR$ 1.852,00 a AR$ 11.552,00.

## Reglas de marca que se respetaron

- Se escribe ZinkERP. Solo aparece el core: POS, stock por sucursal y caja.
- Llamado a la acción textual: «Agendá una demo, desde 15 minutos», con `zinkerp.com/agendar-demo`. Sin botones inventados.
- Títulos sin punto final, de vos.
- Sin prueba gratis, sin horarios de soporte, sin clientes, testimonios ni logos de terceros.

## Banda de sonido

Sintetizada por `scripts/make-score.mjs` con osciladores y ruido con semilla fija. No usa samples ni audio de terceros. −16 LUFS integrados, pico −1,5 dBFS.

| Tiempo | Sonido |
|---|---|
| 0,05 | Toque de vidrio (destello) |
| 0,13 – 0,60 | Quince ticks muy bajos, uno por módulo |
| 0,93 – 1,90 | Aire que crece; cama de acorde abierto sobre re |
| 1,83 | Golpe grave suave: la tarjeta llega |
| 2,00 · 2,50 | Bip de escaneo y tick del número |
| cada beat, 2,0 – 11,5 | Pulso grave apenas audible |
| 3,25 | Click del botón |
| 3,50 | Dos notas (la, re): venta registrada |
| 3,90 | Tick: sale la ficha |
| 4,10 – 5,00 | Aire del viaje |
| 5,00 | Golpe grave y tick: la ficha llega |
| 5,20 · 5,30 | Dos ticks: rueda el stock |
| 6,60 – 7,83 | Aire del viaje |
| 8,00 – 8,53 | Golpe grave y arpegio de cinco notas, una por total |
| 9,75 – 10,50 | Aire; golpe grave al asentarse los recuadros |
| 11,70 – 12,50 | Aire que baja |
| 12,50 | El acorde resuelve a re mayor |
| 13,00 | Una nota alta con la línea de marca |
| 14,20 – 14,90 | La cama se apaga |

## Compromisos y supuestos

- **Sur en caja usa un valor de ejemplo.** La captura de QA de Sur muestra AR$ 0,00 y 0 ventas. En el recuadro «Sur / Caja diaria» puse AR$ 4.850,00 y 1 venta (una yerba). Es el único número que no sale de una captura.
- **La tabla de stock muestra solo Centro y Sur.** La captura trae además tres filas de organizaciones de prueba («sucursal32», «Nico Test 4», «Test Nico 5»), que quedaron fuera.
- **El paso de cobro no aparece.** En la app, entre Finalizar y «Venta registrada» está el modal de medios de pago. Se saltea para sostener una idea por plano.
- **Tipos más grandes que en la app.** La estructura es la real, pero el cuerpo de la letra y las cifras de stock están agrandados para que se lean en video.
- **Los recuadros por sucursal son un recorte.** Usan los rótulos reales de Caja diaria (Efectivo en caja, Cantidad de ventas), pero la app no tiene esa vista compacta.
- **Las fichas «−2» y «+ AR$ 9.700,00» y el resaltado violeta de la fila no son parte de la interfaz.** Son los objetos que el film hace viajar.
- **Sin íconos.** Los botones y el menú van sin los íconos de la app para no dibujar trazos que no coincidan.
- **La banda de sonido no se escuchó.** Se generó y se midió (sonoridad, pico, espectro), pero falta el oído de una persona. La versión `-mudo` cuenta la historia completa sin audio.
- **Licencia de Remotion.** Es gratis para personas y empresas de hasta 3 empleados; arriba de eso pide licencia de empresa. `main-prompt-motion.md` ya marcaba revisarlo antes de usarlo para Zink in Tech.

## Reproducir

```bash
bun install
bun run brand                          # solo si cambia el SVG de marca
bun run typecheck

node scripts/render-final.mjs          # imagen 16:9, sin audio
node scripts/make-score.mjs            # banda de sonido
node scripts/finish.mjs                # MP4 con audio, poster, contact sheet

node scripts/render-final.mjs --vertical
node scripts/finish.mjs --vertical
```

Para revisar: `bun run studio` abre Remotion Studio con las composiciones `ZinkShowreel15` y `ZinkShowreel15Vertical`. `node scripts/render-stills.mjs 2.8,8.5 --dir=revision` renderiza fotogramas sueltos (sumar `--vertical` para la otra versión).

## Estructura

```
src/showreel/
  timeline.ts        todos los tiempos, en fotogramas
  format.ts          puesta en cuadro 16:9 y 9:16
  layout.ts          geometría del plano donde viven las pantallas
  camera.ts          recorrido de cámara y luz
  motion.ts          curvas y helpers de animación
  primitives/        Stage, World, Surface, Odometer, Caption, Token, SymbolModules
  surfaces/          POS, modal de venta, stock, caja, recuadro de sucursal
  acts/              los cinco actos del film
  ZinkShowreel15.tsx la composición
scripts/             extracción de marca, render, sonido y cierre
```
