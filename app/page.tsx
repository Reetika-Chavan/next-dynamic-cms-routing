import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import PageContent from "@/components/PageContent";

/**
 * Home Page - dynamically fetches data from Contentstack based on routing entry for "/"
 */
export default async function HomePage() {
  // ✅ Fetch both routing + content in one step
  const page = await getRouteData("/");

  // If no route found, show 404
  if (!page) {
    notFound();
  }

  // ✅ Render content using shared component
  return <PageContent page={page} />;
}
