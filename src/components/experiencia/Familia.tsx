import { experiencia } from "@/config/experiencia";
import { cn } from "@/lib/utils";
import { Capitulo, Continuar, Fotografia, Ornamento, Revelar } from "./primitivos";
import { irPara } from "./Navegacao";

/** Tela 4 — Nossa família, nosso maior presente. */
export function Familia() {
  const t = experiencia.familia;
  const f = t.fotos;

  return (
    <section
      id="familia"
      aria-labelledby="familia-titulo"
      className="grain relative overflow-hidden bg-ivory py-28 text-paper-foreground lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <header className="mx-auto max-w-4xl text-center">
          <Revelar>
            <Capitulo texto={t.capitulo} className="justify-center text-bordeaux/70" />
          </Revelar>
          <Revelar atraso={150}>
            <h2 id="familia-titulo" className="display-lg mt-8 text-balance text-wine">
              {t.titulo}
            </h2>
          </Revelar>
          <Revelar atraso={300}>
            <p className="mt-7 font-display text-2xl italic text-bordeaux sm:text-3xl">{t.subtitulo}</p>
          </Revelar>
        </header>

        {/* Foto principal grande dos três */}
        <Revelar imagem className="mt-20 lg:mt-28">
          <Fotografia
            foto={f.principal}
            rotulo="Nós três"
            inicial="3"
            tom="claro"
            className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/10]"
            sizes="100vw"
          />
        </Revelar>
        {f.principal.legenda && (
          <p className="mt-4 text-center font-display text-lg italic text-paper-muted">{f.principal.legenda}</p>
        )}

        <div className="mt-24 grid gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-28">
              {t.paragrafos.map((p, i) => {
                const destaque = p === t.paragrafoEmDestaque;
                return (
                  <Revelar key={i} atraso={Math.min(i, 4) * 80}>
                    <p
                      className={cn(
                        destaque
                          ? "py-4 font-display text-4xl italic text-bordeaux sm:text-5xl"
                          : "prose-editorial text-paper-muted",
                        i === 0 && "font-display text-2xl italic leading-snug text-wine sm:text-[1.7rem]",
                      )}
                    >
                      {p}
                    </p>
                  </Revelar>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Revelar imagem>
              <Fotografia
                foto={f.franciellyComIvy}
                rotulo="Francielly e Ivy"
                tom="claro"
                className="aspect-[4/5] w-full"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Revelar>
            {f.franciellyComIvy.legenda && (
              <p className="mt-3 font-display text-lg italic text-paper-muted">{f.franciellyComIvy.legenda}</p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Revelar imagem atraso={100}>
                  <Fotografia foto={f.ivy} rotulo="Ivy" inicial="I" tom="claro" className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 22vw, 50vw" />
                </Revelar>
                {f.ivy.legenda && <p className="mt-3 font-display text-base italic text-paper-muted">{f.ivy.legenda}</p>}
              </div>
              <div className="mt-14 sm:mt-20">
                <Revelar imagem atraso={200}>
                  <Fotografia foto={f.nosTres} rotulo="Nós três" inicial="3" tom="claro" className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 22vw, 50vw" />
                </Revelar>
                {f.nosTres.legenda && <p className="mt-3 font-display text-base italic text-paper-muted">{f.nosTres.legenda}</p>}
              </div>
            </div>
          </div>
        </div>

        <figure className="mx-auto mt-28 max-w-4xl text-center lg:mt-40">
          <Revelar>
            <Ornamento className="justify-center" />
          </Revelar>
          <Revelar atraso={150}>
            <blockquote className="display-md mt-10 text-balance italic text-wine">“{t.frase}”</blockquote>
          </Revelar>
        </figure>

        <div className="mt-24 flex justify-center">
          <Continuar onClick={() => irPara("motivos")} tom="claro" />
        </div>
      </div>
    </section>
  );
}
