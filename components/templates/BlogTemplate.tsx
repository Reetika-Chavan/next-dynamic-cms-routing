import type { PageEntry } from "@/lib/getRouteData";

interface BlogTemplateProps {
  entry: PageEntry;
}

/**
 * Blog post template - designed specifically for blog entries
 * You can customize this template in Contentstack by adding fields like:
 * - author
 * - publish_date
 * - categories
 * - featured_image
 * - excerpt
 */
export default function BlogTemplate({ entry }: BlogTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {entry.title || "Untitled Blog Post"}
        </h1>

        {/* Optional: Add author, date, categories here */}
        {entry.publish_date && (
          <p className="text-gray-600 text-sm mb-2">
            Published: {new Date(entry.publish_date).toLocaleDateString()}
          </p>
        )}
        {entry.author && (
          <p className="text-gray-600 text-sm mb-4">By {entry.author}</p>
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
            className="text-white leading-relaxed"
            dangerouslySetInnerHTML={{ __html: entry.body }}
          />
        )}

        {/* Optional: Add more blog-specific fields */}
        {entry.excerpt && (
          <p className="text-xl text-white italic mt-4">{entry.excerpt}</p>
        )}
      </div>

      {/* Optional: Categories/Tags */}
      {entry.categories &&
        Array.isArray(entry.categories) &&
        entry.categories.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              Categories:
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.categories.map((cat: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-white rounded-full text-sm"
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
