import { useEffect, useState, type RefObject } from "react";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pequeno controle musical. Só aparece quando há uma música configurada em `backgroundMusic`. */
export function ControleMusica({ audioRef }: { audioRef: RefObject<HTMLAudioElement | null> }) {
  const [tocando, setTocando] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sinc = () => setTocando(!audio.paused);
    const vol = () => setVolume(audio.volume);
    audio.addEventListener("play", sinc);
    audio.addEventListener("pause", sinc);
    audio.addEventListener("volumechange", vol);
    sinc();
    return () => {
      audio.removeEventListener("play", sinc);
      audio.removeEventListener("pause", sinc);
      audio.removeEventListener("volumechange", vol);
    };
  }, [audioRef]);

  const alternar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const mudarVolume = (v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    audio.muted = v === 0;
  };

  const IconeVolume = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-1 rounded-full border border-champagne/25 bg-wine-black p-1 text-champagne shadow-paper sm:right-6"
      role="group"
      aria-label="Controle da música"
    >
      <button
        type="button"
        onClick={alternar}
        aria-label={tocando ? "Pausar música" : "Tocar música"}
        aria-pressed={tocando}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-champagne/10"
      >
        {tocando ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4" strokeWidth={1.5} />}
      </button>

      <span aria-hidden className="flex h-4 items-end gap-[3px] px-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("block w-[2px] bg-champagne/80", tocando ? "animate-eq" : "")}
            style={{
              height: "100%",
              animationDelay: `${i * 0.17}s`,
              transform: tocando ? undefined : `scaleY(${[0.3, 0.55, 0.4, 0.25][i]})`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </span>

      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-label="Ajustar volume"
        aria-expanded={aberto}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-champagne/10"
      >
        <IconeVolume className="size-4" strokeWidth={1.5} />
      </button>

      <div className={cn("overflow-hidden transition-all duration-500", aberto ? "w-28 pr-3" : "w-0")}>
        <label className="sr-only" htmlFor="volume-musica">
          Volume
        </label>
        <input
          id="volume-musica"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => mudarVolume(Number(e.target.value))}
          className="h-10 w-full cursor-pointer accent-champagne"
          tabIndex={aberto ? 0 : -1}
        />
      </div>
    </div>
  );
}

/** Aumenta o volume suavemente até o alvo. */
export function iniciarComFade(audio: HTMLAudioElement, alvo: number) {
  audio.volume = 0;
  audio
    .play()
    .then(() => {
      const passos = 30;
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        audio.volume = Math.min(alvo, (alvo * i) / passos);
        if (i >= passos) window.clearInterval(id);
      }, 60);
    })
    .catch(() => {
      audio.volume = alvo;
    });
}
