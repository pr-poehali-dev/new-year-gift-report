import { createFileRoute } from "@tanstack/react-router";
import Reviews from "@/pages/Reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Оставить отзыв о подарке — ЧебПодарки" },
      { name: "description", content: "Поделитесь впечатлениями о сладком новогоднем подарке ЧебПодарки — ваш отзыв поможет другим покупателям сделать выбор." },
      { property: "og:title", content: "Оставить отзыв о подарке — ЧебПодарки" },
      { property: "og:description", content: "Поделитесь впечатлениями о сладком новогоднем подарке ЧебПодарки — ваш отзыв поможет другим покупателям сделать выбор." },
      { property: "og:url", content: "https://chebpodarki.ru/reviews" },
    ],
    links: [{ rel: "canonical", href: "https://chebpodarki.ru/reviews" }],
  }),
  component: Reviews,
});
