import { Stack } from "./contentstack";

/**
 * Page entry from Contentstack
 */
export interface PageEntry {
  title?: string;
  body?: string;
  image?: {
    url: string;
  };
  [key: string]: any; // Allow additional fields from different content types
}

/**
 * Routing entry from Contentstack routing content type
 */
interface RoutingEntry {
  url_path: string;
  content_type_uid: string;
  entry_uid: string;
  template?: string; // Template name from routing entry (e.g., "blog", "page")
}

/**
 * Route data with content type information
 */
export interface RouteData {
  content: PageEntry;
  content_type_uid: string;
  template?: string; // Template from routing entry
}

/**
 * Fetch route data from Contentstack based on URL path
 *
 * This function:
 * 1. Queries the "routing" content type to find a route matching the URL path
 * 2. Gets the content_type_uid and entry_uid from the routing entry
 * 3. Fetches the actual content entry from the specified content type
 *
 * @param path - The URL path (e.g., "/blog/ai", "/about", "/contact")
 * @returns RouteData with content and content_type_uid, or null if not found
 */
export async function getRouteData(path: string): Promise<RouteData | null> {
  try {
    // Normalize path (ensure it starts with /)
    // Handles both "blog/ai" and "/blog/ai" formats
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    // Also try without leading slash (in case routing entry is stored without it)
    const pathWithoutSlash = normalizedPath.slice(1);

    // Step 1: Find routing entry by URL path
    // Try with leading slash first, then without
    let Query = Stack.ContentType("routing")
      .Query()
      .where("url_path", normalizedPath)
      .toJSON();

    let result = await Query.find();
    let entries = result[0] || [];

    // If not found, try without leading slash
    if (!entries || entries.length === 0) {
      Query = Stack.ContentType("routing")
        .Query()
        .where("url_path", pathWithoutSlash)
        .toJSON();

      result = await Query.find();
      entries = result[0] || [];
    }

    if (!entries || entries.length === 0) {
      console.warn(
        `No routing entry found for path: ${normalizedPath} or ${pathWithoutSlash}`
      );
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

    // Return both content and content_type_uid so we can choose the right template
    return {
      content: pageData,
      content_type_uid: routeData.content_type_uid,
      template: routeData.template, // Template from routing entry
    };
  } catch (error) {
    console.error("Error fetching route or page data:", error);
    return null;
  }
}
