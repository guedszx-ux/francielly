import { useEffect, useRef } from "react";
import { experiencia } from "@/config/experiencia";
import { cn } from "@/lib/utils";
import { Capitulo, Continuar, Fotografia, Revelar, TituloComDestaque, useNaTela } from "./primitivos";
import { irPara } from "./Navegacao";

/** Tela 3 — Nossa história (linha do tempo que se desenha conforme a rolagem). */
export function Historia() {
  const t = experiencia.historia;
  const trilhaRef = useRef<HTMLDivElement>(null);
  const linhaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const atualizar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trilha = trilhaRef.current;
        const linha = linhaRef.current;
        if (!trilha || !linha) return;
        const r = trilha.getBoundingClientRect();
        const alvo = window.innerHeight * 0.6;
        const p = Math.min(1, Math.max(0, (alvo - r.top) / r.height));
        linha.style.transform = `scaleY(${p})`;
      });
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="grain relative overflow-hidden bg-wine py-28 text-cream lg:py-40"
    >
      <div aria-hidden className="bg-candle pointer-events-none absolute -right-1/4 top-0 size-[900px] opacity-60" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <Revelar>
            <Capitulo texto={t.capitulo} className="text-champagne/80" />
          </Revelar>
          <Revelar atraso={150}>
            <h2 id="historia-titulo" className="display-lg mt-8 text-balance text-ivory">
              <TituloComDestaque texto={t.titulo} destaque={t.destaque} />
            </h2>
          </Revelar>
        </div>

        <div ref={trilhaRef} className="relative mt-24 lg:mt-32">
          {/* Linha do tempo */}
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-champagne/15 lg:left-1/2">
            <div ref={linhaRef} className="h-full w-full origin-top bg-champagne/80" style={{ transform: "scaleY(0)" }} />
          </div>

          <ol className="space-y-24 lg:space-y-40">
            {t.marcos.map((m, i) => (
              <Marco key={m.rotulo} indice={i} {...m} />
            ))}
          </ol>
        </div>

        <div className="mt-24">
          <Continuar onClick={() => irPara("familia")} />
        </div>
      </div>
    </section>
  );
}

function Marco({
  indice,
  rotulo,
  texto,
  foto,
}: {
  indice: number;
  rotulo: string;
  texto: string;
  foto: (typeof experiencia.historia.marcos)[number]["foto"];
}) {
  const [ref, visivel] = useNaTela<HTMLLIElement>("0px 0px -30% 0px");
  const espelhado = indice % 2 === 1;
  const proporcoes = ["aspect-[4/5]", "aspect-[3/2]", "aspect-[4/5]"];
  const iniciais = ["F", "I", "F"];

  return (
    <li ref={ref} className="relative grid gap-10 pl-10 lg:grid-cols-2 lg:gap-24 lg:pl-0">
      {/* Ponto da linha */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-2 flex size-[15px] items-center justify-center rounded-full border transition-all duration-1000 lg:left-1/2 lg:-translate-x-1/2",
          visivel ? "border-champagne bg-wine shadow-gold-glow" : "border-champagne/30 bg-wine",
        )}
      >
        <span className={cn("size-[5px] rounded-full transition-colors duration-1000", visivel ? "bg-champagne" : "bg-transparent")} />
      </span>

      <div className={cn("lg:pt-0", espelhado ? "lg:order-2 lg:pl-4" : "lg:pr-4 lg:text-right")}>
        <Revelar>
          <p className="eyebrow text-champagne">{String(indice + 1).padStart(2, "0")}</p>
          <h3 className="mt-5 font-display text-4xl font-light tracking-wide text-ivory sm:text-5xl">{rotulo}</h3>
        </Revelar>
        <Revelar atraso={160}>
          <p
            className={cn(
              "mt-6 max-w-md font-display text-xl italic leading-relaxed text-cream/85 sm:text-2xl",
              !espelhado && "lg:ml-auto",
            )}
          >
            “{texto}”
          </p>
        </Revelar>
      </div>

      <div className={cn(espelhado ? "lg:order-1 lg:pr-10" : "lg:pl-10")}>
        <Revelar imagem>
          <Fotografia
            foto={foto}
            rotulo={rotulo}
            inicial={iniciais[indice] ?? "F"}
            className={cn("w-full", proporcoes[indice] ?? "aspect-[4/5]", indice !== 1 && "lg:w-[80%]", !espelhado && indice !== 1 && "")}
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Revelar>
        {foto.legenda && <p className="mt-4 font-display text-lg italic text-cream/70">{foto.legenda}</p>}
      </div>
    </li>
  );
}
