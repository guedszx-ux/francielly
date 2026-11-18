import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import petalas from "@/assets/petalas-textura.jpg";
import { experiencia } from "@/config/experiencia";
import { TOTAL_CORACOES, surpresaDesbloqueada } from "@/lib/progresso";
import { cn } from "@/lib/utils";
import { Capitulo, Revelar } from "./primitivos";
import { irPara } from "./Navegacao";

/** Posições dos cinco corações escondidos (em % da área de jogo). */
const POSICOES = [
  { x: 16, y: 24 },
  { x: 78, y: 16 },
  { x: 46, y: 58 },
  { x: 86, y: 74 },
  { x: 22, y: 82 },
];

const FAISCAS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Tela 5 — Mini game "Cinco pequenos motivos para sorrir." */
export function Jogo({ encontrados, onEncontrar }: { encontrados: number[]; onEncontrar: (id: number) => void }) {
  const t = experiencia.jogo;
  const [ultimo, setUltimo] = useState<number | null>(null);
  const [explosoes, setExplosoes] = useState<{ id: number; chave: number }[]>([]);
  const completo = surpresaDesbloqueada(encontrados);
  const [etapaFinal, setEtapaFinal] = useState(0);

  useEffect(() => {
    if (!completo) {
      setEtapaFinal(0);
      return;
    }
    const t1 = window.setTimeout(() => setEtapaFinal(1), 900);
    const t2 = window.setTimeout(() => setEtapaFinal(2), 2600);
    const t3 = window.setTimeout(() => setEtapaFinal(3), 3800);
    return () => [t1, t2, t3].forEach(window.clearTimeout);
  }, [completo]);

  useEffect(() => {
    if (encontrados.length === 0) setUltimo(null);
  }, [encontrados.length]);

  const tocar = (id: number) => {
    setUltimo(id);
    if (!encontrados.includes(id)) {
      onEncontrar(id);
      const chave = Date.now();
      setExplosoes((e) => [...e, { id, chave }]);
      window.setTimeout(() => setExplosoes((e) => e.filter((x) => x.chave !== chave)), 1000);
    }
  };

  return (
    <section
      id="motivos"
      aria-labelledby="motivos-titulo"
      className="grain relative overflow-hidden bg-wine-black py-28 text-cream lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <Revelar>
            <Capitulo texto={t.capitulo} className="justify-center text-champagne/80" />
          </Revelar>
          <Revelar atraso={150}>
            <h2 id="motivos-titulo" className="display-lg mt-8 text-balance text-ivory">
              {t.titulo}
            </h2>
          </Revelar>
          <Revelar atraso={300}>
            <div className="mx-auto mt-8 max-w-xl space-y-3 font-display text-xl italic leading-relaxed text-cream/80 sm:text-2xl">
              {t.apresentacao.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Revelar>
        </header>

        {/* Progresso */}
        <div className="mt-14 flex flex-col items-center gap-4" aria-live="polite">
          <div className="flex items-center gap-3">
            {Array.from({ length: TOTAL_CORACOES }, (_, i) => (
              <Heart
                key={i}
                aria-hidden
                strokeWidth={1.2}
                className={cn(
                  "size-4 transition-all duration-700",
                  encontrados.includes(i) ? "fill-rose text-rose" : "text-champagne/35",
                )}
              />
            ))}
          </div>
          <p className="eyebrow tabular-nums text-champagne">
            <span className="sr-only">Corações encontrados: </span>
            {encontrados.length}/{TOTAL_CORACOES}
          </p>
        </div>

        {/* Área de jogo */}
        <Revelar className="mt-8">
          <div
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden border border-champagne/15 sm:aspect-[16/9]",
              completo && "shadow-gold-glow",
            )}
          >
            <img
              src={petalas}
              alt=""
              aria-hidden
              loading="lazy"
              width={1600}
              height={1008}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div aria-hidden className="bg-fade-up absolute inset-0 opacity-60" />

            {completo && (
              <div
                aria-hidden
                className="bg-candle animate-gold-bloom pointer-events-none absolute left-1/2 top-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2"
              />
            )}

            {POSICOES.map((pos, i) => {
              const achado = encontrados.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => tocar(i)}
                  aria-label={achado ? `Coração ${i + 1}, encontrado` : `Coração escondido ${i + 1}`}
                  className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <Heart
                    strokeWidth={1.1}
                    className={cn(
                      "size-6 transition-colors duration-700",
                      achado
                        ? cn("fill-rose text-rose animate-heart-pop", completo && "animate-float-up")
                        : "text-champagne animate-heart-breathe",
                    )}
                    style={{ animationDelay: achado ? `${i * 0.3}s` : `${i * 0.6}s` }}
                  />
                </button>
              );
            })}

            {explosoes.map(({ id, chave }) => (
              <span
                key={chave}
                aria-hidden
                className="pointer-events-none absolute"
                style={{ left: `${POSICOES[id]?.x ?? 50}%`, top: `${POSICOES[id]?.y ?? 50}%` }}
              >
                <span className="animate-ring-burst absolute left-0 top-0 size-12 rounded-full border border-champagne" />
                {FAISCAS.map((a) => (
                  <span
                    key={a}
                    className="animate-spark absolute left-0 top-0 size-1 rounded-full bg-champagne"
                    style={{ ["--angle" as string]: `${a}deg` }}
                  />
                ))}
              </span>
            ))}
          </div>
        </Revelar>

        {/* Mensagem revelada */}
        <div className="mx-auto mt-10 min-h-[9rem] max-w-2xl text-center" aria-live="polite">
          {!completo && ultimo !== null && (
            <div key={ultimo} className="animate-rise-in">
              <p className="eyebrow text-champagne/70">
                Coração {String(ultimo + 1).padStart(2, "0")}
              </p>
              <p className="display-md mt-4 text-balance italic text-ivory">“{t.mensagens[ultimo]}”</p>
            </div>
          )}

          {completo && (
            <div className="space-y-6">
              {etapaFinal >= 1 && (
                <p className="display-md animate-rise-in text-balance italic text-ivory">{t.finalizacao.primeira}</p>
              )}
              {etapaFinal >= 2 && (
                <p className="animate-rise-in font-display text-xl text-cream/80 sm:text-2xl">{t.finalizacao.segunda}</p>
              )}
              {etapaFinal >= 3 && (
                <div className="animate-rise-in pt-4">
                  <button type="button" onClick={() => irPara("album")} className="btn-cinema">
                    {t.finalizacao.botao}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Motivos já descobertos */}
        {encontrados.length > 0 && (
          <ol className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-4 border-t border-champagne/15 pt-10 sm:grid-cols-2">
            {[...encontrados].sort((a, b) => a - b).map((id) => (
              <li key={id} className="flex gap-4 text-cream/75">
                <span className="eyebrow pt-1 text-champagne/60">{String(id + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg italic">{t.mensagens[id]}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
