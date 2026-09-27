# InvestiPlay Spanish glossary (UI chrome, phase 1)

Neutral Latin American Spanish. Every string in `locales/es.json` uses these
terms; if a term here changes, search `es.json` for the old word and update it
everywhere. Brand names (InvestiPlay, InvestiCoins, Jeff) are never translated.

Conventions
- Informal "tú" throughout (the audience is high-school students).
- Generic masculine for role nouns and level titles ("Observador del mercado")
  and gender-neutral phrasing where it costs nothing ("¿Todo listo…?" instead
  of "¿Listo/a…?").
- Thousands separator stays a comma ("1,000") to match `toLocaleString()` in
  the en-US browsers the pilot runs on.
- Buttons use the infinitive ("Guardar", "Cancelar"); toasts and empty states
  use full sentences.
- The literal confirmation word `DELETE` in the delete-account dialog is NOT
  translated because the code compares the typed text against it.

## Finance and investing

| English | Spanish | Notes |
|---|---|---|
| stock | acción | plural: acciones. Nav item "Stocks" = "Acciones" |
| share | acción | a unit of stock; abbreviation "sh" = "acc." |
| price per share | precio por acción | |
| ticker | símbolo bursátil | tickers themselves (AAPL) are never translated |
| portfolio | portafolio | not "cartera" (ambiguous in LatAm) |
| holding | posición | |
| watchlist | lista de seguimiento | |
| trade (noun) | operación | "First trade" = "Primera operación" |
| buy / sell | comprar / vender | |
| market | mercado | |
| bond | bono | |
| dividend | dividendo | |
| broker | corredor de bolsa | |
| capital | capital | |
| capital gains | ganancias de capital | |
| profit / loss | ganancia / pérdida | |
| P/L (abbrev.) | G/P | "Total P/L" = "G/P total" |
| revenue | ingresos | "Revenue / mo" = "Ingresos / mes" |
| cash | efectivo | |
| net worth | patrimonio neto | |
| wealth | riqueza | |
| return(s) | retorno(s) | |
| compound (verb) | capitalizar | |
| bank | banco | |
| savings / saver | ahorro / ahorrador | |
| money mindset | mentalidad financiera | |
| financial literacy | educación financiera | |
| economist | economista | |
| investor | inversionista | not "inversor" |
| analyst | analista | |
| strategist | estratega | |
| tokens | tokens | product name, unchanged |

## Game and progress

| English | Spanish | Notes |
|---|---|---|
| coins | monedas | lowercase in running text |
| InvestiCoins | InvestiCoins | brand, unchanged |
| earn (coins) | ganar (monedas) | |
| streak | racha | "day streak" = "racha de N días" |
| best streak | mejor racha | |
| level | nivel | abbreviation "Lv" = "Nv" |
| mastery | dominio | |
| badge | insignia | |
| league | liga | |
| leaderboard | tabla de posiciones | |
| rank | puesto | "#3 in class" = "#3 en la clase" |
| national (board) | nacional | |
| mission | misión | nav item "Missions" = "Misiones" |
| daily missions | misiones diarias | |
| daily challenge | desafío diario | |
| challenges | desafíos | |
| daily game | juego diario | |
| lesson | lección | |
| unit | unidad | |
| quiz | cuestionario | |
| progress | progreso | |
| dashboard | panel | nav item "Dashboard" = "Panel" |
| homework | tarea | nav item "Homework" = "Tareas" |
| lab | laboratorio | |
| partners (friends) | compañeros | "Find Partners" = "Buscar compañeros" |
| friends | amigos | only in the stats ticker |
| classmates | compañeros de clase | |
| milestone | hito | |
| unlock | desbloquear | |
| locked | bloqueado | |
| coming soon | muy pronto | |
| fullscreen | pantalla completa | |
| ride (roller coaster) | recorrido | |

## Micro-business

| English | Spanish | Notes |
|---|---|---|
| business | negocio | |
| micro-business | micronegocio | |
| entrepreneur | emprendedor | |
| customers | clientes | |
| product | producto | |
| brand strength | fuerza de marca | |
| reputation / Rep | reputación / Rep. | |
| profitable | rentable | |
| "in the black" | en números negros | |
| startup (phase) | inicio | phases: Idea, Inicio, Crecimiento, Consolidación, Expansión, Imperio |
| retail | comercio minorista | |
| food & beverage | alimentos y bebidas | |

## Accounts and classes

| English | Spanish | Notes |
|---|---|---|
| student | estudiante | |
| teacher | docente | not "maestro"/"profesor" (varies by country) |
| class | clase | |
| class code / join code | código de clase | |
| join (a class) | unirse (a una clase) | button: "Unirme" |
| leave (a class) | salir (de la clase) | |
| grade (school year) | grado | |
| account | cuenta | |
| profile | perfil | |
| email | correo electrónico | "correo" alone when space is tight |
| password | contraseña | |
| verification code | código de verificación | |
| log in | iniciar sesión | |
| log out | cerrar sesión | |
| sign up | registrarse | button: "Regístrate" |
| create account | crear cuenta | |
| reset password | restablecer contraseña | |
| delete account | eliminar cuenta | |
| member since | miembro desde | |
| player | jugador | |

## App chrome

| English | Spanish | Notes |
|---|---|---|
| settings / appearance | configuración / apariencia | |
| accent color | color de acento | |
| light / dark / system | claro / oscuro / sistema | |
| sound effects | efectos de sonido | |
| muted / on | silenciado / activado | |
| language | idioma | |
| notifications | notificaciones | |
| report a bug | reportar un error | |
| issue (GitHub) | issue | left in English |
| try again | intentar de nuevo | |
| cancel / save | cancelar / guardar | |
| edit | editar | |
| expand | ampliar | |
| previous / next | anterior / siguiente | |
| close | cerrar | |
| live (prices) | en vivo | |
| today | hoy | |
| completed | completado | |

## Onboarding, missions and lessons (phase 2a)

| English | Spanish | Notes |
|---|---|---|
| benchmark assessment | evaluación inicial | the onboarding placement test |
| adaptive | adaptativa | |
| program (course choice) | programa | |
| regular course | curso regular | |
| track (course view) | ruta | "AP tracks" = "rutas AP"; teacher-gated track |
| elective | electivo | "the AP elective" = "el electivo AP" |
| Personal Finance (tab) | Finanzas personales | |
| IB Economics | Economía IB | course name; "IB Econ" = "Econ IB" |
| AP Microeconomics | Microeconomía AP | "AP Micro" stays "AP Micro" |
| AP Mode | Modo AP | |
| Gulliver Biz Lab | Gulliver Biz Lab | program name, unchanged |
| Gulliver Intro to Business | Gulliver Intro a los Negocios | |
| Gulliver Introduction to Business | Gulliver Introducción a los Negocios | |
| Introduction to Business | Introducción a los Negocios | |
| Shark Tank / the Sharks | Shark Tank / los Sharks | brand, unchanged |
| College Board | College Board | unchanged |
| learning objective | objetivo de aprendizaje | |
| grade (school year) | grado | "9th Grade" = "9.º grado" |
| freshman / sophomore / junior / senior | primer / segundo / tercer / cuarto año | college years |
| reward multiplier | multiplicador de recompensas | |
| tier: foundational / applied / strategic / advanced | fundamental / aplicado / estratégico / avanzado | benchmark difficulty |
| depth: explorer / builder / strategist / investor / Advanced+ | explorador / constructor / estratega / inversionista / Avanzado+ | literacy tiers |
| grade level | nivel de grado | |
| topic | tema | |
| category breakdown | desglose por categoría | |
| starting point | punto de partida | |
| scaffolding | apoyo | |
| unit test | examen de unidad | |
| validated (lesson) | validada | benchmark-skipped lesson |
| locked / unlock | bloqueada / desbloquear | units and lessons are feminine |
| up next | sigue | lesson card tag |
| finish line | meta | "to the finish line" = "para la meta" |
| pts (points) | pts | |
| badge cabinet ("Your badges") | Tus insignias | |
| vocab | vocabulario | |
| daily missions | misiones diarias | |
| difficulty: easy / medium / hard | fácil / media / difícil | mission badge |
| earned (mission payout) | ganado | |
| mission | misión | "Start Mission" = "Empezar misión" |
| step N of M | paso N de M | |
| Jeff's chat | el chat de Jeff | |
| reflection ("Make it stick") | reflexión ("Que se quede") | |
| bonus | bono | "+50 bonus" = "+50 de bono" |
| lock it in | afianzar | "Lock it in & finish mission" = "Afiánzalo y termina la misión" |
| start over | empezar de nuevo | |
| retake | repetir | |
| passed | aprobado | |
| mission names | see `missions.catalog` in es.json | Warm-up = Calentamiento, Market watch = Vigilancia del mercado, Make a move = Haz una jugada, Sharpshooter = Tiro certero, Coin hustle = Cazamonedas, In the green = En verde, Grind = A darle, Perfectionist = Perfeccionista, Big earner = Gran ganador, High roller = Gran jugador |
