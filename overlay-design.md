# Como a Overlay foi Projetada — X Performance Digital

Este documento descreve a arquitetura técnica da overlay de entrada do site, o comportamento da Seção 1 (Hero) em relação a ela, e como o Lenis foi integrado sem atritos.

---

## Estrutura da Overlay

O elemento `#intro-overlay` é um `div` com `position: fixed; inset: 0; z-index: 9999`. Ele cobre 100% da viewport, acima de absolutamente tudo no documento.

O background é um gradiente vertical: `linear-gradient(180deg, #141414 0%, #000000 55%)`, criando uma profundidade escura do topo ao fundo.

Dentro da overlay há um `#intro-logo-wrap` (flex, centralizado horizontal e verticalmente) que contém o SVG da logo. Esse wrapper recebe `will-change: transform` pois é ele que encolhe durante a Fase 2. A própria overlay recebe `will-change: opacity` para a Fase 3.

### Camadas internas do SVG

O SVG da logo é composto por três camadas sobrepostas, cada uma com papel distinto:

1. **`.intro-fill`** — os dois paths com `fill: #fad214` (amarelo). Iniciam com `opacity: 0` via CSS e são revelados pelo scroll (Fase 1).
2. **`.outline-ghost`** — os mesmos paths como `fill: none` com `stroke: #3d3d3d`, criando o contorno estático visível desde o início (aparência de logo "fantasma" antes do preenchimento).
3. **`.shimmer-path`** — os mesmos paths como `fill: none` com `stroke: url(#outline-shimmer)`, o gradiente animado via SMIL que percorre o contorno em diagonal. Um `filter` de glow suave (`feGaussianBlur` + `feMerge`) é aplicado sobre ele.

---

## Três Fases ao Longo de 80vh

Toda a lógica de controle da overlay é puramente baseada em `window.scrollY`. A função `updateIntro()` é chamada a cada evento de scroll e calcula três progressos independentes:

### Fase 1 — Preenchimento (0 → 30vh)

```
fillT = Math.min(scrollY / (vh * 0.3), 1)
```

O fill amarelo da logo vai de `opacity: 0` para `opacity: 1` conforme o usuário rola os primeiros 30% da viewport.

Paralelamente, quando `fillT` ultrapassa `0.7` (70% do preenchimento), o contorno fantasma e o shimmer começam a desaparecer:

```
edgeOpacity = fillT < 0.7 ? 1 : Math.max(0, 1 - (fillT - 0.7) / 0.3)
```

Isso cria uma transição natural onde o outline some justamente quando o fill já está quase completo — a logo "solidifica" visualmente.

### Fase 2 — Encolhimento (30vh → 60vh)

```
shrinkT = Math.min((scrollY - fillEnd) / (shrinkEnd - fillEnd), 1)
scale = 1 - shrinkT * 0.32
introLogoWrap.style.transform = `scale(${scale})`
```

O wrapper da logo encolhe até 68% do tamanho original (`scale(0.68)`). O `transform-origin` está em `center center`, então ela encolhe para o meio da tela.

### Fase 3 — Fade out (60vh → 80vh)

```
fadeT = (scrollY - shrinkEnd) / (bufferH - shrinkEnd)
introOverlay.style.opacity = (1 - fadeT)
```

A overlay inteira some (opacity 0→1 invertido). Simultaneamente, navbar e o botão flutuante de WhatsApp surgem com opacidade proporcional:

```
navT = Math.max(0, (fadeT - 0.5) / 0.5)
navbar.style.opacity = navT
```

Eles só começam a aparecer quando a overlay já está na metade do fade — evitando que navbar apareça antes da hora.

### Após 80vh

Quando `scrollY >= vh * 0.8`, a overlay recebe `opacity: 0` e `pointerEvents: none` definitivamente (para aquele frame). O `pointerEvents: none` garante que a overlay não intercepte nenhum clique ou interação mesmo estando no DOM.

A função `revealHero()` é chamada uma única vez (guardada por `heroRevealDone`), disparando as animações `.animate-on-scroll` dos elementos do hero com escalonamento de 150ms entre eles.

### Scroll reverso

Não há nenhum guard que impeça a overlay de voltar. Se o usuário rolar para cima, `updateIntro()` recalcula tudo com o `scrollY` atual e a overlay reaparece corretamente na fase correspondente. O estado é completamente derivado do scroll — sem flags de bloqueio para o visual.

---

## Seção 1 — Hero e o Wrapper Sticky

A Hero fica **atrás** da overlay durante toda a animação. Isso é possível pela seguinte arquitetura:

```html
<div class="hero-sticky-wrapper">   <!-- height: 260vh -->
  <section id="hero">               <!-- position: sticky; top: 0; z-index: 1 -->
    ...
  </section>
</div>
```

O `.hero-sticky-wrapper` tem `height: 260vh`. Isso cria o espaço de scroll que alimenta tanto a overlay quanto o tempo de permanência da hero visível. O `#hero` tem `position: sticky; top: 0`, então ele permanece fixado ao topo da viewport enquanto o scroll avança dentro dos 260vh do wrapper.

A overlay tem `z-index: 9999` e a hero tem `z-index: 1` — a hero existe durante toda a animação, mas está invisível debaixo da overlay.

### Linha do tempo de 260vh

| Faixa de scroll | O que acontece |
|---|---|
| 0 → 30vh | Fase 1: fill da logo |
| 30 → 60vh | Fase 2: logo encolhe |
| 60 → 80vh | Fase 3: overlay some, hero é revelada |
| 80 → 160vh | Hero visível "em repouso" — sem overlay, sem transição |
| 160vh+ | Sticky termina, hero começa a sair da tela pelo topo naturalmente |

Os primeiros 80vh são a "zona da overlay". Os 80vh restantes (até 160vh) são o tempo de dwell — o usuário pode ler o hero com calma antes de rolar para a Seção 2.

---

## A "Mina Trava" — Snap da Seção 1

Quando o usuário vem de baixo (rolando para cima, da Seção 2 de volta à Seção 1), existe um problema sutil: o hero sai do sticky em 160vh, e se o usuário parar o scroll em qualquer ponto entre 160vh e 175vh, a hero fica "meio enquadrada" — parcialmente visível, sem terminar de reposicionar.

Para resolver isso, existe uma trava suave baseada em snap:

```js
if (heroRevealDone && !heroSnapActive && scrollDir === 'up') {
  const snapPoint = wrapper.offsetHeight - window.innerHeight  // = ~160vh
  const snapZone  = window.innerHeight * 0.15                  // ±15vh
  if (scrollY > snapPoint && scrollY < snapPoint + snapZone) {
    heroSnapActive = true;
    _lenis.scrollTo(snapPoint, { duration: 0.6 });
    setTimeout(() => { heroSnapActive = false; }, 800);
  }
}
```

**Condições para ativar:**
- A overlay já foi revelada (`heroRevealDone = true`)
- O usuário está rolando para cima (`scrollDir === 'up'`)
- O scroll está dentro da zona de snap (entre 160vh e 175vh)
- Nenhum snap está em andamento (`!heroSnapActive`)

Quando ativada, chama `lenis.scrollTo(snapPoint)` com duração de 0.6s, enquadrando a hero perfeitamente na tela. A flag `heroSnapActive` é desligada após 800ms para evitar loop. Se Lenis não estiver disponível, cai no `window.scrollTo({ behavior: 'smooth' })` nativo.

---

## Lenis e a Overlay — Por Que Não Conflita

O Lenis é inicializado com:

```js
new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
})
```

O `duration: 1.2` com o easing exponencial dá uma sensação de scroll premium e fluido no desktop. O `smoothTouch: false` é intencional — no mobile, o scroll nativo já é suavizado pelo próprio sistema operacional, e ativar o Lenis no touch poderia interferir com o `touch-action: pan-y` que a overlay usa.

### Por que `touch-action: pan-y` na overlay

A overlay é `position: fixed` e cobre a tela inteira. Sem `touch-action: pan-y`, em dispositivos touch o scroll não passaria através dela — o usuário não conseguiria rolar a página para disparar as fases da animação. Com `touch-action: pan-y`, o browser passa os eventos de toque verticais para o scroll da página mesmo com a overlay em cima.

### Por que o Lenis não quebra `window.scrollY`

Toda a lógica da overlay lê `window.scrollY` diretamente. O Lenis não altera `window.scrollY` — ele apenas interpola o quanto o conteúdo se move visualmente via `requestAnimationFrame`, enquanto o scroll nativo (e portanto `scrollY`) continua sendo a fonte de verdade.

O listener de scroll da overlay é `{ passive: true }`, o que significa que não tenta bloquear o scroll — apenas observa. O Lenis funciona na mesma camada sem colisão. Na prática, o Lenis só melhorou a experiência: as fases da overlay ficaram mais suaves porque os valores de `scrollY` chegam de forma mais progressiva no RAF loop, em vez de saltos bruscos de eventos de wheel.

---

## Resumo Técnico para Replicação

| Ponto | Decisão |
|---|---|
| Overlay position | `fixed; inset: 0; z-index: 9999` |
| Hero position | `sticky; top: 0; z-index: 1` dentro de wrapper com `height: 260vh` |
| Controle de animação | 100% derivado de `window.scrollY` — sem CSS transitions, sem timers para o visual |
| Fases | 3 fases em 80vh: fill (0→30vh), encolhimento (30→60vh), fade (60→80vh) |
| Scroll reverso | Sem guards no visual — overlay reaparece automaticamente |
| Mina trava | Snap programático via Lenis ao rolar para cima perto do fim do sticky |
| Mobile | `touch-action: pan-y` na overlay + `smoothTouch: false` no Lenis |
| Lenis | Não interfere com `scrollY`, só suaviza a renderização |
