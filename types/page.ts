export interface PageEntry {
  title?: string;
  body?: string;
  image?: {
    url: string;
  };
  [key: string]: any; // Allow additional fields from different content types
}

export interface RoutingEntry {
  url_path: string;
  content_type_uid: string;
  entry_uid: string;
}
