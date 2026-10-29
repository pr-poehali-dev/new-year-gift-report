import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";

function AdminPending() {
  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <p className="text-white/70 text-sm">Загрузка админ-панели…</p>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  pendingComponent: AdminPending,
  head: () => ({ meta: [{ title: "Админка — ЧебПодарки" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: Admin,
});
