import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/templates/BlogTemplate";
import PageTemplate from "@/components/templates/PageTemplate";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Dynamic route handler for ALL pages - automatically creates pages from Contentstack routing entries
 *
 * This catch-all route handles ANY URL path dynamically:
 * - /blog/ai → looks up routing entry with url_path="/blog/ai"
 * - /blog/machine-learning → looks up routing entry with url_path="/blog/machine-learning"
 * - /about → looks up routing entry with url_path="/about"
 *
 * No manual page files needed! Just create routing entries in Contentstack.
 */
export default async function DynamicPage({ params }: PageProps) {
  // Await params (Next.js 15+ requires this)
  const { slug } = await params;

  // Reconstruct the URL path from slug segments
  // Example: slug = ["blog", "ai"] → path = "/blog/ai"
  const path = `/${slug.join("/")}`;

  // Fetch route data from Contentstack
  // This will:
  // 1. Query the "routing" content type for url_path matching the path
  // 2. Get the content_type_uid and entry_uid from the routing entry
  // 3. Fetch the actual content entry (e.g., from "blog" content type)
  const routeData = await getRouteData(path);

  // If no route found, show 404
  if (!routeData) {
    notFound();
  }

  // Render content using the appropriate template
  // Template is specified in the routing entry
  // The page is automatically created - no manual file needed!
  if (routeData.template && routeData.template.toLowerCase() === "blog") {
    return <BlogTemplate entry={routeData.content} />;
  }

  return <PageTemplate entry={routeData.content} />;
}
