import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import PageContent from "@/components/PageContent";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Dynamic route handler for all pages
 * Handles routes like /about, /contact, /products/item, etc.
 */
export default async function DynamicPage({ params }: PageProps) {
  // Await params (Next.js 15+ requires this)
  const { slug } = await params;

  // Reconstruct the URL path from slug segments
  const path = `/${slug.join("/")}`;

  // Fetch route data from Contentstack
  const page = await getRouteData(path);

  // If no route found, show 404
  if (!page) {
    notFound();
  }

  // Render content using shared component
  return <PageContent page={page} />;
}
