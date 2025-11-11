import type { PageEntry } from "@/types/page";

interface PageContentProps {
  page: PageEntry;
}

/**
 * Shared component for rendering page content
 * Used by both home page and dynamic pages
 */
export default function PageContent({ page }: PageContentProps) {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{page.title || "Untitled"}</h1>

      {page.image?.url && (
        <img
          src={page.image.url}
          alt={page.title || "Page image"}
          className="mx-auto w-64 h-auto mb-6 rounded-lg shadow-md"
        />
      )}

      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        {page.body || ""}
      </p>
    </main>
  );
}
