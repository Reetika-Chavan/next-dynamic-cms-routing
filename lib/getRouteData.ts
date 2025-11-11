import { Stack } from "./contentstack";
import type { PageEntry, RoutingEntry } from "@/types/page";

/**
 * Fetch route data from Contentstack based on URL path
 * @param path - The URL path (e.g., "/", "/about", "/contact")
 * @returns PageEntry data or null if not found
 */
export async function getRouteData(path: string): Promise<PageEntry | null> {
  try {
    // Normalize path (ensure it starts with /)
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    // Step 1: Find routing entry by URL path
    const Query = Stack.ContentType("routing")
      .Query()
      .where("url_path", normalizedPath)
      .toJSON();

    const result = await Query.find();

    // Contentstack returns [entries, count]
    const entries = result[0] || [];

    if (!entries || entries.length === 0) {
      console.warn(`No routing entry found for path: ${normalizedPath}`);
      return null;
    }

    const routeData = entries[0] as RoutingEntry;

    // Validate routing data
    if (!routeData.content_type_uid || !routeData.entry_uid) {
      console.error(
        `Invalid routing entry for path ${normalizedPath}: missing content_type_uid or entry_uid`
      );
      return null;
    }

    // Step 2: Fetch actual page content from Contentstack
    const Entry = Stack.ContentType(routeData.content_type_uid)
      .Entry(routeData.entry_uid)
      .toJSON();

    const entryResult = await Entry.fetch();
    const pageData = entryResult as PageEntry;

    return pageData;
  } catch (error) {
    console.error("Error fetching route or page data:", error);
    return null;
  }
}
