import type { PageEntry } from "@/lib/getRouteData";

interface PageTemplateProps {
  entry: PageEntry;
}

export default function PageTemplate({ entry }: PageTemplateProps) {
  return (
    <main className="min-h-screen p-8 text-center bg-gradient-to-br from-[#1e1b2e] via-[#2a223d] to-[#3a2c4a] text-purple-100">
      <h1 className="text-4xl font-bold mb-4 text-purple-300">
        {entry.title || "Untitled"}
      </h1>

      {entry.image?.url && (
        <img
          src={entry.image.url}
          alt={entry.title || "Page image"}
          className="mx-auto w-64 h-auto mb-6 rounded-2xl shadow-lg shadow-purple-900/40 border border-purple-700/40"
        />
      )}

      <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
        {entry.body || ""}
      </p>
    </main>
  );
}
