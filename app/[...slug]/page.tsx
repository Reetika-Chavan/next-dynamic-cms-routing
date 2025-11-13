import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/templates/BlogTemplate";
import PageTemplate from "@/components/templates/PageTemplate";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const path = `/${slug.join("/")}`;

  const routeData = await getRouteData(path);

  if (!routeData) {
    notFound();
  }

  if (routeData.template && routeData.template.toLowerCase() === "blog") {
    return <BlogTemplate entry={routeData.content} />;
  }

  return <PageTemplate entry={routeData.content} />;
}
