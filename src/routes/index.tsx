import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { InitialProductsContext, fetchProducts } from "@/hooks/useProducts";
import { InitialReviewsContext, fetchReviews } from "@/hooks/useReviews";

export const Route = createFileRoute("/")({
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
