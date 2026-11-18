import { useEffect, useRef, useState } from "react";
import { experiencia } from "@/config/experiencia";
import { cn } from "@/lib/utils";
import { Capitulo, Continuar, Ornamento, Revelar } from "./primitivos";
import { irPara } from "./Navegacao";

/** Tela 7 — Uma carta para você. Envelope que se abre e revela a carta. */
export function Carta({ jaAberta, onAbrir }: { jaAberta: boolean; onAbrir: () => void }) {
  const t = experiencia.carta;
  const [estado, setEstado] = useState<"fechada" | "abrindo" | "aberta">("fechada");
  const cartaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEstado(jaAberta ? "aberta" : "fechada");
  }, [jaAberta]);

  const abrir = () => {
    if (estado !== "fechada") return;
    setEstado("abrindo");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setEstado("aberta");
        onAbrir();
        window.requestAnimationFrame(() =>
          cartaRef.current?.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" }),
        );
      },
      reduzir ? 50 : 2100,
    );
  };

  return (
    <section
      id="carta"
      aria-labelledby="carta-titulo"
      className="grain bg-letter relative overflow-hidden py-28 text-cream lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-10">
        <header className="text-center">
          <Revelar>
            <Capitulo texto={t.capitulo} className="justify-center text-champagne/80" />
          </Revelar>
          <Revelar atraso={150}>
            <h2 id="carta-titulo" className="display-md mx-auto mt-8 max-w-2xl text-balance italic text-ivory">
              {t.convite}
            </h2>
          </Revelar>
        </header>

        {estado !== "aberta" ? (
          <Revelar atraso={250} className="mt-16 flex flex-col items-center">
            <div
              className="envelope relative mt-20 aspect-[3/2] sm:mt-40 w-full max-w-[520px]"
              data-estado={estado}
              aria-hidden
            >
              <div className="envelope-verso absolute inset-0 shadow-paper" />
              <div className="envelope-papel absolute inset-x-[7%] bottom-[5%] top-[6%] z-[2] bg-ivory px-[8%] pt-[8%]">
                <p className="font-script text-2xl text-bordeaux sm:text-3xl">{t.saudacao}</p>
                <div className="mt-4 space-y-2.5">
                  {[92, 80, 86, 64].map((w) => (
                    <span key={w} className="block h-px bg-bordeaux/20" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
              <div className="envelope-frente absolute inset-0 z-[3]" />
              <div className="envelope-aba absolute inset-x-0 top-0 h-[56%]" />
              <div className="envelope-selo absolute left-1/2 top-[56%] z-[5] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bordeaux shadow-gold-glow sm:size-[4.5rem]">
                <span className="absolute inset-1.5 rounded-full border border-champagne/50" />
                <span className="font-display text-3xl italic text-champagne">F</span>
              </div>
            </div>

            <button
              type="button"
              onClick={abrir}
              disabled={estado === "abrindo"}
              className={cn("btn-cinema mt-16 transition-opacity duration-700", estado === "abrindo" && "opacity-0")}
            >
              {t.botao}
            </button>
          </Revelar>
        ) : (
          <div ref={cartaRef} className="mt-16 scroll-mt-10">
            <article
              aria-label="Carta"
              className="animate-rise-in relative mx-auto max-w-[44rem] bg-ivory px-6 py-14 text-wine shadow-paper sm:px-14 sm:py-20 lg:px-20"
            >
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-champagne/40 sm:inset-5" />
              <p className="eyebrow text-[0.6rem] text-bordeaux/55">{experiencia.dataAniversario}</p>
              <p className="mt-8 font-script text-4xl text-bordeaux sm:text-5xl">{t.saudacao}</p>

              <div className="mt-8 space-y-6 font-display text-[1.2rem] font-medium leading-[1.8] text-wine/90 sm:text-[1.3rem]">
                {t.paragrafos.map((p, i) => (
                  <Revelar key={i} atraso={Math.min(i, 3) * 120}>
                    <p>{p}</p>
                  </Revelar>
                ))}
              </div>

              <Revelar className="mt-12 space-y-2">
                {t.encerramento.map((l) => (
                  <p key={l} className="font-display text-2xl italic text-bordeaux sm:text-[1.7rem]">
                    {l}
                  </p>
                ))}
              </Revelar>

              <Revelar className="mt-10" atraso={150}>
                <Ornamento className="text-champagne" />
                <p className="mt-8 font-display text-xl italic text-wine/80">{t.despedida}</p>
                <p className="mt-2 font-script text-4xl text-bordeaux sm:text-5xl">{t.assinatura}</p>
              </Revelar>
            </article>

            <div className="mt-20 flex justify-center">
              <Continuar onClick={() => irPara("final")} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
