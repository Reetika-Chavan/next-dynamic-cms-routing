import { getRouteData } from "@/lib/getRouteData";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/templates/BlogTemplate";
import PageTemplate from "@/components/templates/PageTemplate";


export default async function HomePage() {
  const routeData = await getRouteData("/");

  
  if (!routeData) {
    notFound();
  }


  if (routeData.template && routeData.template.toLowerCase() === "blog") {
    return <BlogTemplate entry={routeData.content} />;
  }

  return <PageTemplate entry={routeData.content} />;
}
