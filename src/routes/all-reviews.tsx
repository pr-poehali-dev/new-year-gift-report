import { createFileRoute } from "@tanstack/react-router";
import AllReviews from "@/pages/AllReviews";
import { InitialReviewsContext, fetchReviews } from "@/hooks/useReviews";

export const Route = createFileRoute("/all-reviews")({
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
