import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

// Initialize Stack with basic config
const stackConfig: any = {
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
};

// Add live preview config only if management token is provided
if (process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN) {
  stackConfig.live_preview = {
    enable: true,
    management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || "",
  };
}

export const Stack = Contentstack.Stack(stackConfig);

// Set host only if provided
if (process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST) {
  Stack.setHost(process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST);
}

// Initialize live preview only if enabled
if (process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN) {
  try {
    ContentstackLivePreview.init({
      enable: true,
      stackSdk: Stack,
      ssr: true,
      clientUrlParams: {
        host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST || "",
      },
    });
  } catch (error) {
    console.warn("Live preview initialization failed:", error);
  }
}
