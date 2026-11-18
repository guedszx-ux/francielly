import rosas from "@/assets/rosas-cinematico.jpg";
import { experiencia } from "@/config/experiencia";
import { Ornamento, Revelar } from "./primitivos";
import { Particulas } from "./Particulas";
import { irPara } from "./Navegacao";

/** Tela 8 — A surpresa final (liberada ao encontrar os cinco corações). */
export function Final({ desbloqueada, onRecomecar }: { desbloqueada: boolean; onRecomecar: () => void }) {
  const t = experiencia.final;
  const fundo = t.fotoFundo.src ?? rosas;

  return (
    <section
      id="final"
      aria-labelledby="final-titulo"
      className="grain bg-night relative flex min-h-svh items-center overflow-hidden py-32 text-cream"
    >
      <img
        src={fundo}
        alt=""
        aria-hidden
        loading="lazy"
        width={1600}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
      />
      <div aria-hidden className="bg-night absolute inset-0 opacity-80" />
      <div aria-hidden className="bg-fade-up absolute inset-x-0 top-0 h-56 rotate-180" />
      <div aria-hidden className="bg-candle animate-light-breathe pointer-events-none absolute left-1/2 top-1/2 size-[min(130vw,1000px)] -translate-x-1/2 -translate-y-1/2" />
      <Particulas densidade={60} />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
        {desbloqueada ? (
          <>
            <Revelar>
              <Ornamento className="justify-center" />
            </Revelar>
            <Revelar atraso={200}>
              <h2 id="final-titulo" className="display-xl mt-10 text-balance text-ivory">
                Feliz aniversário, <em className="italic text-champagne">{experiencia.homenageada}.</em>
              </h2>
            </Revelar>
            <div className="mx-auto mt-12 max-w-2xl space-y-4">
              {t.mensagem.map((m, i) => (
                <Revelar key={m} atraso={350 + i * 180}>
                  <p className="font-display text-xl leading-relaxed text-cream/85 sm:text-2xl">{m}</p>
                </Revelar>
              ))}
            </div>
            <Revelar atraso={300} className="mt-16">
              <p className="display-md text-balance italic text-champagne">“{t.fraseDestaque}”</p>
            </Revelar>
            <Revelar atraso={450} className="mt-8">
              <p className="font-display text-xl italic text-cream/80 sm:text-2xl">{t.segundaMensagem}</p>
            </Revelar>
            <Revelar atraso={600} className="mt-14">
              <p className="font-script text-3xl text-champagne/90 sm:text-4xl">{t.assinatura}</p>
            </Revelar>
            <Revelar atraso={750} className="mt-16">
              <button type="button" onClick={onRecomecar} className="btn-cinema">
                {t.botao}
              </button>
            </Revelar>
          </>
        ) : (
          <Revelar>
            <h2 id="final-titulo" className="sr-only">
              Surpresa final
            </h2>
            <Ornamento className="justify-center" />
            <p className="display-md mx-auto mt-10 max-w-xl text-balance italic text-ivory">{t.bloqueado}</p>
            <button type="button" onClick={() => irPara("motivos")} className="btn-cinema mt-12">
              {t.botaoBloqueado}
            </button>
          </Revelar>
        )}
      </div>
    </section>
  );
}
