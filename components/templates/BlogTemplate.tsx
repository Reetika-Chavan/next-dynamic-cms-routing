import type { PageEntry } from "@/lib/getRouteData";

interface BlogTemplateProps {
  entry: PageEntry;
}

export default function BlogTemplate({ entry }: BlogTemplateProps) {
  return (
    <article className="min-h-screen bg-gradient-to-br from-[#1e1b2e] via-[#2a223d] to-[#3a2c4a] text-purple-100 px-6 py-12">
      {/* Blog Header */}
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-300">
          {entry.title || "Untitled Blog Post"}
        </h1>

        {entry.publish_date && (
          <p className="text-purple-400 text-sm mb-1">
            Published: {new Date(entry.publish_date).toLocaleDateString()}
          </p>
        )}
        {entry.author && (
          <p className="text-purple-400 text-sm">By {entry.author}</p>
        )}
      </header>

      {/* Featured Image */}
      {entry.image?.url && (
        <div className="max-w-4xl mx-auto mb-10">
          <img
            src={entry.image.url}
            alt={entry.title || "Blog post image"}
            className="w-full h-auto rounded-2xl shadow-lg shadow-purple-900/40 border border-purple-700/30"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto text-left">
        {entry.body && (
          <div
            className="text-purple-200 leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.body }}
          />
        )}

        {entry.excerpt && (
          <p className="text-lg text-purple-400 italic mt-6">
            {entry.excerpt}
          </p>
        )}
      </div>

      {/* Categories */}
      {entry.categories &&
        Array.isArray(entry.categories) &&
        entry.categories.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-purple-800/50">
            <h3 className="text-sm font-semibold text-purple-400 mb-3">
              Categories:
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.categories.map((cat: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-800/40 text-purple-200 rounded-full text-sm border border-purple-700/30"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
    </article>
  );
}