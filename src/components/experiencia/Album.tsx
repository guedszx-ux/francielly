import { useCallback, useEffect, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { experiencia, type CategoriaAlbum } from "@/config/experiencia";
import { cn } from "@/lib/utils";
import { Capitulo, Continuar, Fotografia, Revelar } from "./primitivos";
import { irPara } from "./Navegacao";

/** Composição editorial assimétrica (posição na sequência → tamanho). */
const COMPOSICAO = [
  "col-span-2 aspect-[4/3] lg:col-span-7",
  "col-span-1 aspect-[3/4] lg:col-span-5 lg:mt-28",
  "col-span-1 aspect-[3/4] lg:col-span-4",
  "col-span-2 aspect-[4/3] lg:col-span-4 lg:aspect-square lg:mt-20",
  "col-span-1 aspect-[4/5] lg:col-span-4 lg:mt-10",
  "col-span-1 aspect-[4/5] lg:col-span-5",
  "col-span-2 aspect-[16/10] lg:col-span-7 lg:mt-24",
  "col-span-2 aspect-[3/2] lg:col-span-6 lg:col-start-4",
];

const INICIAIS: Record<CategoriaAlbum, string> = { francielly: "F", "nos-dois": "2", ivy: "I", familia: "3" };

/** Tela 6 — Nosso álbum de memórias. */
export function Album() {
  const t = experiencia.album;
  const [filtro, setFiltro] = useState<CategoriaAlbum | "todas">("todas");
  const [aberta, setAberta] = useState<number | null>(null);

  const itens = useMemo(
    () =>
      t.fotos
        .map((foto, indice) => ({ foto, indice }))
        .filter(({ foto }) => filtro === "todas" || foto.categoria === filtro),
    [filtro, t.fotos],
  );
  const ampliaveis = useMemo(() => itens.filter(({ foto }) => Boolean(foto.src)), [itens]);
  const nomeCategoria = (id: CategoriaAlbum) => t.categorias.find((c) => c.id === id)?.nome ?? "";

  const filtros: { id: CategoriaAlbum | "todas"; nome: string }[] = [{ id: "todas", nome: "Todas" }, ...t.categorias];

  return (
    <section
      id="album"
      aria-labelledby="album-titulo"
      className="grain relative overflow-hidden bg-paper py-28 text-paper-foreground lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Revelar>
              <Capitulo texto={t.capitulo} className="text-bordeaux/70" />
            </Revelar>
            <Revelar atraso={150}>
              <h2 id="album-titulo" className="display-lg mt-8 text-balance text-wine">
                {t.titulo}
              </h2>
            </Revelar>
          </div>
          <Revelar atraso={300} className="lg:col-span-5">
            <div role="group" aria-label="Filtrar fotografias" className="flex flex-wrap gap-x-6 gap-y-1 lg:justify-end">
              {filtros.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                  className={cn(
                    "link-line transition-colors",
                    filtro === f.id ? "text-bordeaux after:!opacity-100" : "text-paper-muted after:!opacity-0 hover:text-bordeaux",
                  )}
                >
                  {f.nome}
                </button>
              ))}
            </div>
          </Revelar>
        </header>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {itens.map(({ foto, indice }, pos) => {
            const temFoto = Boolean(foto.src);
            const conteudo = (
              <Fotografia
                foto={foto}
                rotulo={nomeCategoria(foto.categoria)}
                inicial={INICIAIS[foto.categoria]}
                tom="claro"
                className="h-full w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            );
            return (
              <li key={`${filtro}-${indice}`} className={cn(COMPOSICAO[pos % COMPOSICAO.length], "flex flex-col")}>
                <Revelar imagem atraso={(pos % 3) * 120} className="relative min-h-0 flex-1">
                  {temFoto ? (
                    <button
                      type="button"
                      onClick={() => setAberta(ampliaveis.findIndex((a) => a.indice === indice))}
                      aria-label={`Ampliar fotografia: ${foto.alt}`}
                      className="group absolute inset-0 block cursor-zoom-in"
                    >
                      {conteudo}
                    </button>
                  ) : (
                    <div className="absolute inset-0">{conteudo}</div>
                  )}
                </Revelar>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-[0.58rem] text-bordeaux/55">
                    {String(indice + 1).padStart(2, "0")} — {nomeCategoria(foto.categoria)}
                  </span>
                </div>
                {foto.legenda && <p className="mt-1 font-display text-lg italic text-paper-muted">{foto.legenda}</p>}
              </li>
            );
          })}
        </ul>

        <div className="mt-24 flex justify-center">
          <Continuar onClick={() => irPara("carta")} tom="claro" />
        </div>
      </div>

      <Ampliacao
        fotos={ampliaveis.map((a) => a.foto)}
        indice={aberta}
        onMudar={setAberta}
      />
    </section>
  );
}

function Ampliacao({
  fotos,
  indice,
  onMudar,
}: {
  fotos: (typeof experiencia.album.fotos)[number][];
  indice: number | null;
  onMudar: (i: number | null) => void;
}) {
  const aberto = indice !== null && indice >= 0 && indice < fotos.length;
  const atual = aberto ? fotos[indice] : null;

  const mover = useCallback(
    (passo: number) => {
      if (indice === null || fotos.length === 0) return;
      onMudar((indice + passo + fotos.length) % fotos.length);
    },
    [indice, fotos.length, onMudar],
  );

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aberto, mover]);

  return (
    <DialogPrimitive.Root open={aberto} onOpenChange={(o) => !o && onMudar(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-wine-black/95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10">
          <DialogPrimitive.Title className="sr-only">{atual?.alt ?? "Fotografia"}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Use as setas para navegar entre as fotografias.
          </DialogPrimitive.Description>
          {atual?.src && (
            <figure key={atual.src} className="animate-rise-in flex max-h-full flex-col items-center">
              <img src={atual.src} alt={atual.alt} className="max-h-[78svh] w-auto max-w-full object-contain shadow-paper" />
              {atual.legenda && (
                <figcaption className="mt-5 font-display text-xl italic text-cream/85">{atual.legenda}</figcaption>
              )}
            </figure>
          )}
          <div className="mt-6 flex items-center gap-2 text-champagne">
            {fotos.length > 1 && (
              <button type="button" onClick={() => mover(-1)} aria-label="Foto anterior" className="flex size-11 items-center justify-center rounded-full border border-champagne/25 hover:bg-champagne/10">
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
            )}
            <span className="eyebrow min-w-16 text-center tabular-nums">
              {indice !== null ? indice + 1 : 0} / {fotos.length}
            </span>
            {fotos.length > 1 && (
              <button type="button" onClick={() => mover(1)} aria-label="Próxima foto" className="flex size-11 items-center justify-center rounded-full border border-champagne/25 hover:bg-champagne/10">
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <DialogPrimitive.Close
            aria-label="Fechar"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-champagne/25 text-champagne hover:bg-champagne/10 sm:right-8 sm:top-8"
          >
            <X className="size-4" strokeWidth={1.5} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
