/**
 * Progresso da experiência guardado no próprio navegador (localStorage).
 * Nenhum dado pessoal é coletado ou enviado.
 */
export const TOTAL_CORACOES = 5;
export const CHAVE_PROGRESSO = "francielly-experiencia-v1";

export type Progresso = {
  /** Corações encontrados no mini game (índices 0–4, sem repetição). */
  coracoes: number[];
  /** A carta já foi aberta. */
  cartaAberta: boolean;
};

export const PROGRESSO_INICIAL: Progresso = { coracoes: [], cartaAberta: false };

/** Registra um coração. O mesmo coração nunca é contado duas vezes. */
export function registrarCoracao(coracoes: number[], id: number): number[] {
  if (!Number.isInteger(id) || id < 0 || id >= TOTAL_CORACOES) return coracoes;
  if (coracoes.includes(id)) return coracoes;
  return [...coracoes, id];
}

export function contarCoracoes(coracoes: number[]): number {
  return new Set(coracoes.filter((id) => Number.isInteger(id) && id >= 0 && id < TOTAL_CORACOES))
    .size;
}

/** A surpresa final só é revelada com os cinco corações encontrados. */
export function surpresaDesbloqueada(coracoes: number[]): boolean {
  return contarCoracoes(coracoes) >= TOTAL_CORACOES;
}

export function lerProgresso(storage: Pick<Storage, "getItem"> | undefined): Progresso {
  if (!storage) return PROGRESSO_INICIAL;
  try {
    const bruto = storage.getItem(CHAVE_PROGRESSO);
    if (!bruto) return PROGRESSO_INICIAL;
    const dados = JSON.parse(bruto) as Partial<Progresso>;
    const coracoes = Array.isArray(dados.coracoes)
      ? dados.coracoes.reduce<number[]>((acc, id) => registrarCoracao(acc, Number(id)), [])
      : [];
    return { coracoes, cartaAberta: dados.cartaAberta === true };
  } catch {
    return PROGRESSO_INICIAL;
  }
}

export function salvarProgresso(
  storage: Pick<Storage, "setItem"> | undefined,
  progresso: Progresso,
): void {
  if (!storage) return;
  try {
    storage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
  } catch {
    /* armazenamento indisponível (modo privado): segue sem salvar */
  }
}
