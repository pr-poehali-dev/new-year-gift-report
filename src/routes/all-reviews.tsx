import { createFileRoute } from "@tanstack/react-router";
import AllReviews from "@/pages/AllReviews";
import { InitialReviewsContext, fetchReviews } from "@/hooks/useReviews";

export const Route = createFileRoute("/all-reviews")({
  head: () => ({
    meta: [
      { title: "Отзывы о новогодних подарках ЧебПодарки — Чебоксары" },
      { name: "description", content: "Реальные отзывы покупателей о сладких новогодних подарках ЧебПодарки: родители, школы, детские сады и компании Чебоксар делятся впечатлениями." },
      { property: "og:title", content: "Отзывы о новогодних подарках ЧебПодарки — Чебоксары" },
      { property: "og:description", content: "Реальные отзывы покупателей о сладких новогодних подарках ЧебПодарки: родители, школы, детские сады и компании Чебоксар делятся впечатлениями." },
      { property: "og:url", content: "https://chebpodarki.ru/all-reviews" },
    ],
    links: [{ rel: "canonical", href: "https://chebpodarki.ru/all-reviews" }],
  }),
  loader: async () => ({ reviews: await fetchReviews() }),
  component: AllReviewsRoute,
});

function AllReviewsRoute() {
  const { reviews } = Route.useLoaderData();
  return (
    <InitialReviewsContext.Provider value={reviews}>
      <AllReviews />
    </InitialReviewsContext.Provider>
  );
}
