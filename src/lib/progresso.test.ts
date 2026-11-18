import { describe, expect, it } from "vitest";
import {
  CHAVE_PROGRESSO,
  contarCoracoes,
  lerProgresso,
  registrarCoracao,
  surpresaDesbloqueada,
} from "./progresso";

describe("mini game dos cinco corações", () => {
  it("não conta o mesmo coração duas vezes", () => {
    const uma = registrarCoracao([], 2);
    const duas = registrarCoracao(uma, 2);
    expect(duas).toEqual([2]);
    expect(contarCoracoes(duas)).toBe(1);
  });

  it("ignora corações que não existem", () => {
    expect(registrarCoracao([], 5)).toEqual([]);
    expect(registrarCoracao([], -1)).toEqual([]);
  });

  it("libera a surpresa final só com os cinco corações", () => {
    expect(surpresaDesbloqueada([0, 1, 2, 3])).toBe(false);
    expect(surpresaDesbloqueada([0, 1, 2, 3, 3])).toBe(false);
    expect(surpresaDesbloqueada([4, 0, 3, 1, 2])).toBe(true);
  });

  it("remove repetições ao recuperar o progresso salvo", () => {
    const storage = {
      getItem: (k: string) =>
        k === CHAVE_PROGRESSO ? JSON.stringify({ coracoes: [1, 1, 9], cartaAberta: true }) : null,
    };
    expect(lerProgresso(storage)).toEqual({ coracoes: [1], cartaAberta: true });
  });
});
