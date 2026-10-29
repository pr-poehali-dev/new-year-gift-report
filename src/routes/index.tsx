import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { InitialProductsContext, fetchProducts } from "@/hooks/useProducts";
import { InitialReviewsContext, fetchReviews } from "@/hooks/useReviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Сладкие новогодние подарки 2027 в Чебоксарах — оптом и в розницу | ЧебПодарки" },
      { name: "description", content: "Сладкие новогодние подарки от 590 ₽ в Чебоксарах: свежие конфеты в праздничной упаковке для детей, школ, садов и сотрудников. Скачайте каталог, закажите от 50 шт. с логотипом — доставка по России." },
      { property: "og:title", content: "Сладкие новогодние подарки 2027 в Чебоксарах — оптом и в розницу | ЧебПодарки" },
      { property: "og:description", content: "Сладкие новогодние подарки от 590 ₽ в Чебоксарах: свежие конфеты в праздничной упаковке для детей, школ, садов и сотрудников. Скачайте каталог, закажите от 50 шт. с логотипом — доставка по России." },
      { property: "og:url", content: "https://chebpodarki.ru/" },
    ],
    links: [{ rel: "canonical", href: "https://chebpodarki.ru/" }],
  }),
  loader: async () => {
    const [products, reviews] = await Promise.all([fetchProducts(), fetchReviews()]);
    return { products, reviews };
  },
  component: IndexRoute,
});

function IndexRoute() {
  const { products, reviews } = Route.useLoaderData();
  return (
    <InitialProductsContext.Provider value={products}>
      <InitialReviewsContext.Provider value={reviews}>
        <Index />
      </InitialReviewsContext.Provider>
    </InitialProductsContext.Provider>
  );
}
