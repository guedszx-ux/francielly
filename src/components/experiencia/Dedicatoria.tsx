import { experiencia } from "@/config/experiencia";
import { Capitulo, Continuar, Fotografia, Revelar, TituloComDestaque } from "./primitivos";
import { irPara } from "./Navegacao";

/** Tela 2 — Hoje o dia é seu. */
export function Dedicatoria() {
  const t = experiencia.dedicatoria;
  return (
    <section
      id="hoje"
      aria-labelledby="hoje-titulo"
      className="grain relative flex min-h-svh items-center overflow-hidden bg-paper py-28 text-paper-foreground lg:py-36"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="lg:col-span-6 lg:pt-10">
          <Revelar>
            <Capitulo texto={t.capitulo} className="text-bordeaux/70" />
          </Revelar>
          <Revelar atraso={150}>
            <h2 id="hoje-titulo" className="display-xl mt-8 text-balance text-wine [&_em]:text-bordeaux">
              <TituloComDestaque texto={t.titulo} destaque={t.destaque} />
            </h2>
          </Revelar>

          <div className="mt-12 max-w-[34rem] space-y-5 lg:ml-[12%]">
            {t.paragrafos.map((p, i) => (
              <Revelar key={i} atraso={200 + i * 90}>
                <p
                  className={
                    i === 0
                      ? "font-display text-2xl italic leading-snug text-wine sm:text-[1.75rem]"
                      : "prose-editorial text-paper-muted"
                  }
                >
                  {p}
                </p>
              </Revelar>
            ))}
            <Revelar atraso={700}>
              <p className="pt-4 font-script text-4xl text-bordeaux sm:text-5xl">{t.fechamento}</p>
            </Revelar>
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <Revelar imagem className="relative">
            <Fotografia
              foto={t.foto}
              rotulo="Francielly"
              tom="claro"
              prioridade
              className="aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Revelar>
          <div aria-hidden className="absolute -bottom-6 -left-6 hidden h-40 w-px bg-bordeaux/25 lg:block" />
          <p className="eyebrow mt-5 flex justify-between text-[0.6rem] text-bordeaux/60">
            <span>{experiencia.homenageada}</span>
            <span>{experiencia.dataAniversario}</span>
          </p>
          {t.foto.legenda && (
            <p className="mt-2 font-display text-lg italic text-paper-muted">{t.foto.legenda}</p>
          )}
        </div>

        <div className="lg:col-span-12">
          <Continuar onClick={() => irPara("historia")} tom="claro" />
        </div>
      </div>
    </section>
  );
}
