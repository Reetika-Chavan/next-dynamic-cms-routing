import { Stack } from "./contentstack";

export interface PageEntry {
  title?: string;
  body?: string;
  image?: {
    url: string;
  };
  [key: string]: any;
}

interface RoutingEntry {
  url_path: string;
  content_type_uid: string;
  entry_uid?: string;
  entry_id?: string; // Some Contentstack setups use entry_id instead of entry_uid
  template?: string;
}

export interface RouteData {
  content: PageEntry;
  content_type_uid: string;
  template?: string;
}

export async function getRouteData(path: string): Promise<RouteData | null> {
  try {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const pathWithoutSlash = normalizedPath.slice(1);

    // Try with leading slash first, then without
    let Query = Stack.ContentType("routing")
      .Query()
      .where("url_path", normalizedPath)
      .toJSON();

    let result = await Query.find();
    let entries = result[0] || [];

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

    // Support both entry_uid and entry_id field names
    const entryUid = routeData.entry_uid || routeData.entry_id;

    if (!routeData.content_type_uid || !entryUid) {
      console.error(
        `Invalid routing entry for path ${normalizedPath}: missing content_type_uid or entry_uid/entry_id`
      );
      return null;
    }

    const Entry = Stack.ContentType(routeData.content_type_uid)
      .Entry(entryUid)
      .toJSON();

    const entryResult = await Entry.fetch();
    const pageData = entryResult as PageEntry;

    return {
      content: pageData,
      content_type_uid: routeData.content_type_uid,
      template: routeData.template,
    };
  } catch (error) {
    console.error("Error fetching route or page data:", error);
    return null;
  }
}
