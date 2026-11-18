import { useCallback, useEffect, useRef, useState } from "react";
import { experiencia } from "@/config/experiencia";
import {
  PROGRESSO_INICIAL,
  lerProgresso,
  registrarCoracao,
  salvarProgresso,
  surpresaDesbloqueada,
  type Progresso,
} from "@/lib/progresso";
import { Abertura } from "./Abertura";
import { Album } from "./Album";
import { Carta } from "./Carta";
import { Dedicatoria } from "./Dedicatoria";
import { Familia } from "./Familia";
import { Final } from "./Final";
import { Historia } from "./Historia";
import { Jogo } from "./Jogo";
import { ControleMusica, iniciarComFade } from "./Musica";
import { Navegacao } from "./Navegacao";

/** Orquestra a narrativa completa: abertura → sete capítulos → surpresa final. */
export function Experiencia() {
  const [progresso, setProgresso] = useState<Progresso>(PROGRESSO_INICIAL);
  const [carregado, setCarregado] = useState(false);
  const [introVisivel, setIntroVisivel] = useState(true);
  const [rodada, setRodada] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const temMusica = Boolean(experiencia.backgroundMusic);

  // Recupera o progresso salvo neste navegador.
  useEffect(() => {
    setProgresso(lerProgresso(window.localStorage));
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) salvarProgresso(window.localStorage, progresso);
  }, [progresso, carregado]);

  // Trava a rolagem enquanto a abertura está na tela.
  useEffect(() => {
    const raiz = document.documentElement;
    if (introVisivel) {
      raiz.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      raiz.style.overflow = "";
    }
    return () => {
      raiz.style.overflow = "";
    };
  }, [introVisivel]);

  const abrirPresente = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) iniciarComFade(audio, experiencia.volumeInicial);
  }, []);

  const encontrarCoracao = useCallback((id: number) => {
    setProgresso((p) => ({ ...p, coracoes: registrarCoracao(p.coracoes, id) }));
  }, []);

  const recomecar = useCallback(() => {
    // A música continua tocando: nada é interrompido de forma abrupta.
    setProgresso(PROGRESSO_INICIAL);
    setRodada((r) => r + 1);
    setIntroVisivel(true);
  }, []);

  return (
    <div className="relative">
      {temMusica && (
        // 🎵 A música vem de `backgroundMusic` em src/config/experiencia.ts
        <audio ref={audioRef} src={experiencia.backgroundMusic} loop preload="auto" />
      )}

      {introVisivel && (
        <Abertura key={`abertura-${rodada}`} onAbrir={abrirPresente} onConcluir={() => setIntroVisivel(false)} />
      )}

      <main key={`capitulos-${rodada}`} aria-hidden={introVisivel} inert={introVisivel}>
        <Dedicatoria />
        <Historia />
        <Familia />
        <Jogo encontrados={progresso.coracoes} onEncontrar={encontrarCoracao} />
        <Album />
        <Carta
          jaAberta={progresso.cartaAberta}
          onAbrir={() => setProgresso((p) => ({ ...p, cartaAberta: true }))}
        />
        <Final desbloqueada={surpresaDesbloqueada(progresso.coracoes)} onRecomecar={recomecar} />
      </main>

      {!introVisivel && <Navegacao />}
      {temMusica && !introVisivel && <ControleMusica audioRef={audioRef} />}
    </div>
  );
}
