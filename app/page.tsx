import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/templates/BlogTemplate";
import PageTemplate from "@/components/templates/PageTemplate";

/**
 * Home Page - dynamically fetches data from Contentstack based on routing entry for "/"
 */
export default async function HomePage() {
  // ✅ Fetch both routing + content in one step
  const routeData = await getRouteData("/");

  // If no route found, show 404
  if (!routeData) {
    notFound();
  }

  // ✅ Render content using the appropriate template
  // Template is specified in the routing entry
  if (routeData.template && routeData.template.toLowerCase() === "blog") {
    return <BlogTemplate entry={routeData.content} />;
  }

  return <PageTemplate entry={routeData.content} />;
}
