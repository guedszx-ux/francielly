import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Foto } from "@/config/experiencia";

/** Observa quando um elemento entra na tela (uma única vez). */
export function useNaTela<T extends Element>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          setVisivel(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, visivel] as const;
}

export function Revelar({
  children,
  className,
  atraso = 0,
  imagem = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
  imagem?: boolean;
  style?: CSSProperties;
}) {
  const [ref, visivel] = useNaTela<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visivel}
      className={cn(imagem ? "reveal-image" : "reveal", className)}
      style={{ transitionDelay: `${atraso}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/** Título com uma parte em itálico. */
export function TituloComDestaque({ texto, destaque }: { texto: string; destaque?: string }) {
  if (!destaque || !texto.includes(destaque)) return <>{texto}</>;
  const [antes, depois] = texto.split(destaque);
  return (
    <>
      {antes}
      <em className="italic text-champagne">{destaque}</em>
      {depois}
    </>
  );
}

export function Ornamento({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3 text-champagne", className)}>
      <span className="hairline w-14" />
      <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" opacity="0.8" />
      </svg>
      <span className="hairline w-14" />
    </div>
  );
}

export function Capitulo({ texto, className }: { texto: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", className)}>
      <span aria-hidden className="h-px w-10 bg-current opacity-50" />
      {texto}
    </p>
  );
}

export function Continuar({
  onClick,
  rotulo = "Continuar",
  tom = "escuro",
}: {
  onClick: () => void;
  rotulo?: string;
  tom?: "escuro" | "claro";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "link-line group",
        tom === "escuro" ? "text-champagne" : "text-bordeaux",
      )}
    >
      {rotulo}
      <ArrowDown
        className="size-3.5 transition-transform duration-700 group-hover:translate-y-1"
        strokeWidth={1.5}
      />
    </button>
  );
}

/**
 * Fotografia com espaço reservado elegante.
 * Se `foto.src` estiver vazio (ou o arquivo não carregar), mostra o placeholder — nunca uma imagem quebrada.
 */
export function Fotografia({
  foto,
  rotulo,
  inicial = "F",
  tom = "escuro",
  className,
  prioridade = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  posicao = "center",
}: {
  foto: Foto;
  rotulo: string;
  inicial?: string;
  tom?: "escuro" | "claro";
  className?: string;
  prioridade?: boolean;
  sizes?: string;
  posicao?: string;
}) {
  const [falhou, setFalhou] = useState(false);
  const temFoto = Boolean(foto.src) && !falhou;

  return (
    <div className={cn("relative overflow-hidden shadow-photo", className)}>
      {temFoto ? (
        <img
          src={foto.src ?? undefined}
          alt={foto.alt}
          loading={prioridade ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          onError={() => setFalhou(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: posicao }}
        />
      ) : (
        <EspacoReservado rotulo={rotulo} inicial={inicial} tom={tom} />
      )}
    </div>
  );
}

function EspacoReservado({
  rotulo,
  inicial,
  tom,
}: {
  rotulo: string;
  inicial: string;
  tom: "escuro" | "claro";
}) {
  const escuro = tom === "escuro";
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para fotografia: ${rotulo}`}
      className={cn(
        "grain absolute inset-0 flex items-center justify-center",
        escuro ? "bg-placeholder-dark text-champagne" : "bg-placeholder-light text-bordeaux",
      )}
    >
      <div
        className={cn(
          "absolute inset-3 border sm:inset-4",
          escuro ? "border-champagne/25" : "border-bordeaux/15",
        )}
      />
      {/* Marcas de canto */}
      {["left-3 top-3 sm:left-4 sm:top-4 border-l border-t", "right-3 top-3 sm:right-4 sm:top-4 border-r border-t", "left-3 bottom-3 sm:left-4 sm:bottom-4 border-l border-b", "right-3 bottom-3 sm:right-4 sm:bottom-4 border-r border-b"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn(
              "absolute size-4",
              pos,
              escuro ? "border-champagne/70" : "border-bordeaux/45",
            )}
          />
        ),
      )}
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          aria-hidden
          className={cn(
            "font-display text-6xl italic leading-none sm:text-7xl",
            escuro ? "text-champagne/45" : "text-bordeaux/30",
          )}
        >
          {inicial}
        </span>
        <span className={cn("eyebrow text-[0.6rem]", escuro ? "text-champagne/75" : "text-bordeaux/60")}>
          {rotulo}
        </span>
      </div>
    </div>
  );
}
