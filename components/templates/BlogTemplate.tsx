import type { PageEntry } from "@/lib/getRouteData";

interface BlogTemplateProps {
  entry: PageEntry;
}

export default function BlogTemplate({ entry }: BlogTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple">
          {entry.title || "Untitled Blog Post"}
        </h1>

        {entry.publish_date && (
          <p className="text-gray-600 text-sm mb-2">
            Published: {new Date(entry.publish_date).toLocaleDateString()}
          </p>
        )}
        {entry.author && (
          <p className="text-purple text-sm mb-4">By {entry.author}</p>
        )}
      </header>

      {/* Featured Image */}
      {entry.image?.url && (
        <div className="mb-8">
          <img
            src={entry.image.url}
            alt={entry.title || "Blog post image"}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none">
        {entry.body && (
          <div
            className="text-purple leading-relaxed"
            dangerouslySetInnerHTML={{ __html: entry.body }}
          />
        )}

        {entry.excerpt && (
          <p className="text-xl text-purple italic mt-4">{entry.excerpt}</p>
        )}
      </div>

      {entry.categories &&
        Array.isArray(entry.categories) &&
        entry.categories.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-semibold text-purple mb-2">
              Categories:
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.categories.map((cat: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-purple rounded-full text-sm"
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
