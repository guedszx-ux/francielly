import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SECOES, type SecaoId } from "@/config/experiencia";
import { cn } from "@/lib/utils";

export function irPara(id: SecaoId) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
}

/** Indicadores de progresso da experiência + botões discretos de voltar/avançar. */
export function Navegacao() {
  const [ativa, setAtiva] = useState(0);
  const barraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elementos = SECOES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            const i = SECOES.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setAtiva(i);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elementos.forEach((el) => io.observe(el));

    let raf = 0;
    const aoRolar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (barraRef.current) barraRef.current.style.transform = `scaleX(${p})`;
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  const claro = SECOES[ativa]?.tom === "claro";
  const anterior = ativa > 0 ? SECOES[ativa - 1] : null;
  const proxima = ativa < SECOES.length - 1 ? SECOES[ativa + 1] : null;

  return (
    <>
      {/* Barra fina de progresso no topo */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-40 h-px bg-champagne/10">
        <div ref={barraRef} className="h-full origin-left bg-champagne" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* Índice lateral (computador) — as cores acompanham o fundo de cada capítulo */}
      <nav aria-label="Capítulos da experiência" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ol className="flex flex-col items-end">
          {SECOES.map((s, i) => (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => irPara(s.id)}
                aria-current={i === ativa ? "step" : undefined}
                aria-label={s.nome}
                className="group flex h-7 w-10 items-center justify-end"
              >
                <span
                  aria-hidden
                  className="eyebrow pointer-events-none absolute right-12 whitespace-nowrap bg-wine-black px-3 py-1.5 text-[0.58rem] text-champagne opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {s.nome}
                </span>
                <span
                  className={cn(
                    "block h-px transition-all duration-700",
                    i === ativa ? "w-8" : "w-3.5 opacity-40 group-hover:opacity-90",
                    claro ? "bg-bordeaux" : i === ativa ? "bg-champagne" : "bg-cream",
                  )}
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Voltar / avançar (todas as telas) */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-1 rounded-full border border-champagne/25 bg-wine-black p-1 text-champagne shadow-paper sm:left-6">
        <button
          type="button"
          onClick={() => anterior && irPara(anterior.id)}
          disabled={!anterior}
          aria-label={anterior ? `Voltar para ${anterior.nome}` : "Início"}
          className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-champagne/10 disabled:opacity-30"
        >
          <ChevronUp className="size-4" strokeWidth={1.5} />
        </button>
        <span className="eyebrow min-w-[4.5rem] text-center text-[0.58rem] tabular-nums" aria-live="polite">
          {String(ativa + 1).padStart(2, "0")} / {String(SECOES.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => proxima && irPara(proxima.id)}
          disabled={!proxima}
          aria-label={proxima ? `Avançar para ${proxima.nome}` : "Fim"}
          className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-champagne/10 disabled:opacity-30"
        >
          <ChevronDown className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
