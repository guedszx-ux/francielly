import { createFileRoute } from "@tanstack/react-router";
import { Experiencia } from "@/components/experiencia/Experiencia";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Francielly — Um capítulo bonito da nossa história" },
      {
        name: "description",
        content: "Um presente de aniversário feito com amor para Francielly, em 18 de novembro de 2026.",
      },
      { property: "og:title", content: "Francielly — Um capítulo bonito da nossa história" },
      {
        property: "og:description",
        content: "Fiz uma coisa especial para você... Um presente de aniversário feito com amor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Experiencia />;
}
