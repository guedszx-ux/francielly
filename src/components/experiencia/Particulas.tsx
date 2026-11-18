import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particula = { x: number; y: number; r: number; vx: number; vy: number; fase: number; vel: number };

/** Partículas de luz muito sutis, em canvas. Pausa fora da tela e respeita "reduzir movimento". */
export function Particulas({ densidade = 55, className }: { densidade?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let largura = 0;
    let altura = 0;
    let particulas: Particula[] = [];
    let raf = 0;
    let ativo = true;
    const cor = getComputedStyle(canvas).color;

    const criar = () => {
      const rect = canvas.getBoundingClientRect();
      largura = rect.width;
      altura = rect.height;
      canvas.width = Math.max(1, Math.floor(largura * dpr));
      canvas.height = Math.max(1, Math.floor(altura * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const escala = Math.min(1, (largura * altura) / (1280 * 800));
      const total = Math.max(14, Math.round(densidade * Math.max(0.35, escala)));
      particulas = Array.from({ length: total }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.14 + 0.03),
        fase: Math.random() * Math.PI * 2,
        vel: Math.random() * 0.012 + 0.004,
      }));
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.fillStyle = cor;
      for (const p of particulas) {
        if (!reduzir) {
          p.x += p.vx;
          p.y += p.vy;
          p.fase += p.vel;
          if (p.y < -4) {
            p.y = altura + 4;
            p.x = Math.random() * largura;
          }
          if (p.x < -4) p.x = largura + 4;
          if (p.x > largura + 4) p.x = -4;
        }
        ctx.globalAlpha = 0.15 + ((Math.sin(p.fase) + 1) / 2) * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!ativo) return;
      desenhar();
      raf = requestAnimationFrame(loop);
    };

    criar();
    if (reduzir) desenhar();
    else loop();

    const aoRedimensionar = () => {
      criar();
      if (reduzir) desenhar();
    };
    window.addEventListener("resize", aoRedimensionar);

    let io: IntersectionObserver | undefined;
    if (!reduzir && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => {
        const deveAtivar = Boolean(e?.isIntersecting);
        if (deveAtivar && !ativo) {
          ativo = true;
          loop();
        } else if (!deveAtivar) {
          ativo = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(canvas);
    }

    return () => {
      ativo = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", aoRedimensionar);
      io?.disconnect();
    };
  }, [densidade]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-champagne", className)}
    />
  );
}
