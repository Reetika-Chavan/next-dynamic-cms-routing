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
  entry_uid: string;
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

    if (!routeData.content_type_uid || !routeData.entry_uid) {
      console.error(
        `Invalid routing entry for path ${normalizedPath}: missing content_type_uid or entry_uid`
      );
      return null;
    }

    const Entry = Stack.ContentType(routeData.content_type_uid)
      .Entry(routeData.entry_uid)
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
