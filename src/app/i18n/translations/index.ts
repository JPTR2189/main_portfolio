import type { Language } from "../../types";
import { ptBR, type Translation } from "./pt-BR";
import { enUS } from "./en-US";

export type { Translation };

export const translations: Record<Language, Translation> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};
