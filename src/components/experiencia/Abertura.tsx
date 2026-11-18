import { useState } from "react";
import { experiencia } from "@/config/experiencia";
import { Particulas } from "./Particulas";

const DURACAO_SAIDA = 2100;

/** Tela 1 — A grande surpresa. Cortina cinematográfica que se abre ao clicar. */
export function Abertura({ onAbrir, onConcluir }: { onAbrir: () => void; onConcluir: () => void }) {
  const [fase, setFase] = useState<"entrada" | "saindo">("entrada");
  const t = experiencia.abertura;

  const abrir = () => {
    if (fase === "saindo") return;
    setFase("saindo");
    onAbrir();
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onConcluir, reduzir ? 80 : DURACAO_SAIDA);
  };

  const linha = (atraso: number) => ({ animationDelay: `${atraso}ms` });

  return (
    <div
      className="abertura fixed inset-0 z-50 overflow-hidden"
      data-fase={fase}
      role="dialog"
      aria-modal="true"
      aria-label="Abertura do presente"
    >
      <div data-lado="topo" className="abertura-cortina grain absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-wine-black">
        <div className="bg-night absolute inset-x-0 top-0 h-[200%]" />
      </div>
      <div data-lado="base" className="abertura-cortina grain absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-wine-black">
        <div className="bg-night absolute inset-x-0 bottom-0 h-[200%]" />
      </div>

      <div className="abertura-linha pointer-events-none absolute inset-x-0 top-1/2 z-10 hairline" />

      <div className="abertura-conteudo relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div aria-hidden className="bg-candle animate-light-breathe pointer-events-none absolute left-1/2 top-[42%] size-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2" />
        <Particulas densidade={70} />

        <p className="eyebrow animate-rise-in relative text-champagne" style={linha(300)}>
          {t.data}
        </p>
        <span
          aria-hidden
          className="animate-line-grow relative mt-7 block h-px w-16 bg-champagne/60"
          style={linha(700)}
        />

        <h1
          className="display-lg animate-rise-in relative mt-9 max-w-4xl text-balance text-ivory"
          style={linha(1000)}
        >
          <span className="italic">{t.titulo}</span>
        </h1>

        <p
          className="animate-rise-in relative mt-8 max-w-xl text-balance font-display text-xl leading-relaxed text-cream/85 sm:text-2xl"
          style={linha(1900)}
        >
          {t.subtitulo}
        </p>

        <p className="animate-rise-in relative mt-6 text-sm tracking-wide text-ink-soft" style={linha(2600)}>
          {t.texto}
        </p>

        <div className="animate-rise-in relative mt-12" style={linha(3200)}>
          <button type="button" onClick={abrir} className="btn-cinema">
            {t.botao}
          </button>
        </div>

        <p
          className="animate-rise-in absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-0 right-0 font-script text-2xl text-champagne/80 sm:text-3xl"
          style={linha(3700)}
        >
          {t.assinatura}
        </p>
      </div>
    </div>
  );
}
