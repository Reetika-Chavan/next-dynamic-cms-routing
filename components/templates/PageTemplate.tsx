import type { PageEntry } from "@/lib/getRouteData";

interface PageTemplateProps {
  entry: PageEntry;
}

export default function PageTemplate({ entry }: PageTemplateProps) {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-600">
        {entry.title || "Untitled"}
      </h1>

      {entry.image?.url && (
        <img
          src={entry.image.url}
          alt={entry.title || "Page image"}
          className="mx-auto w-64 h-auto mb-6 rounded-lg shadow-md"
        />
      )}

      <p className="text-lg text-purple-600 max-w-2xl mx-auto">
        {entry.body || ""}
      </p>
    </main>
  );
}
