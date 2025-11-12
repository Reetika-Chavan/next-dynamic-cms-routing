# Next.js Dynamic Routing with Contentstack

A Next.js application that demonstrates dynamic routing powered by Contentstack CMS, designed to be hosted on Contentstack Launch. This solution eliminates the need for manual page files by automatically creating pages from Contentstack routing entries.

## 🎯 Overview

This project implements a fully dynamic routing system where:

- **No manual page files required** - Pages are created automatically from Contentstack entries
- **Content editors control URLs** - All routing is managed in Contentstack CMS
- **Edge-delivered routing data** - Leverages Contentstack's CDN for low-latency routing lookups
- **Flexible content management** - Support for multiple content types with different templates

## 🏗️ Architecture

### Contentstack Approach vs. External Database

This solution uses **Contentstack CMS to store routing data** instead of an external NoSQL database (like Google Cloud Firestore), providing:

- ✅ **Lower latency** - Routing data served from Contentstack's edge locations (CDN)
- ✅ **No additional cost** - No separate database infrastructure needed
- ✅ **Simplified architecture** - Unified content and routing management
- ✅ **Automatic synchronization** - Routing stays in sync with content lifecycle

### How It Works

1. **Contentstack Routing Content Type** - Maps URLs to content entries
2. **Next.js Catch-All Route** - Handles all dynamic URLs automatically
3. **Template System** - Renders different layouts based on content type
4. **Contentstack Launch** - Hosts the Next.js application with seamless CMS integration

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment

# Optional: For Live Preview
NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST=your_preview_host
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST=your_live_preview_host
NEXT_PUBLIC_CONTENTSTACK_APP_HOST=your_app_host
```

## 📦 Contentstack Setup

### Content Types Required

#### 1. Routing Content Type

Create a content type named **"routing"** with the following fields:

| Field UID          | Display Name     | Type            | Required | Description                                  |
| ------------------ | ---------------- | --------------- | -------- | -------------------------------------------- |
| `title`            | EntryName        | Text            | Yes      | Name of the route                            |
| `url_path`         | URL Path         | Text            | Yes      | The URL path (e.g., `/blog/ai` or `blog/ai`) |
| `content_type_uid` | Content Type UID | Text            | Yes      | Content type (e.g., `blog`, `page`)          |
| `entry_uid`        | Entry UID        | Text            | Yes      | Entry UID to display                         |
| `template`         | Template         | Text (Dropdown) | No       | Template: `blog` or `page`                   |

**Template Dropdown Options:**

- `blog` - Uses BlogTemplate
- `page` - Uses PageTemplate (default)

#### 2. Blog Content Type

Create a content type named **"blog"** with fields like:

- `title` (Text, required)
- `body` (Text/Rich Text)
- `image` (File)
- `author` (Text)
- `publish_date` (Date)
- `excerpt` (Text)
- `categories` (Text, multiple)

### Creating Routing Entries

1. **Create a content entry** (e.g., blog post) in Contentstack
2. **Note the Entry UID** (e.g., `******`)
3. **Create a routing entry** with:
   - `url_path`: `/blog/your-post-slug`
   - `content_type_uid`: `blog`
   - `entry_uid`: The Entry UID from step 2
   - `template`: `blog`
4. **Publish both entries**

The page will be automatically available at the specified URL!

## 🔄 How Dynamic Routing Works

### Example: `/blog/chatgpt`

1. **User visits** `https://yourdomain.com/blog/chatgpt`
2. **Next.js matches** to `app/[...slug]/page.tsx` (catch-all route)
3. **Path reconstruction**: `slug = ["blog", "chatgpt"]` → path = `/blog/chatgpt`
4. **Query Contentstack**: Look up routing entry with `url_path = "/blog/chatgpt"`
5. **Get routing data**:
   - `content_type_uid = "blog"`
   - `entry_uid = "****"`
   - `template = "blog"`
6. **Fetch content**: Get blog entry from Contentstack
7. **Render**: Use `BlogTemplate` to display the content

## 🚢 Deployment to Contentstack Launch

### 1. Connect Your Repository

1. Go to Contentstack Launch dashboard
2. Connect your Git repository
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Node Version**: 18.x or higher

### 2. Connect to Contentstack Stack

1. **Link your Launch project to your Contentstack stack**
2. Launch automatically monitors your stack for content changes
3. No additional webhook configuration needed

### 3. Environment Variables

Add your Contentstack environment variables in Launch:

- `NEXT_PUBLIC_CONTENTSTACK_API_KEY`
- `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN`
- `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT`

### 4. Automated Redeployment

Once Launch is connected to your Contentstack stack, it automatically triggers redeployments when:

- ✅ **Entry Published** → Automatic redeployment → New content is live
- ✅ **Entry Updated** → Automatic redeployment → Updated content is live
- ✅ **Entry Deleted** → Automatic redeployment → Page returns 404
- ✅ **Entry Unpublished** → Automatic redeployment → Page returns 404

#### How It Works

- Launch is directly connected to your Contentstack stack
- Launch monitors content changes in real-time
- When any entry is published, updated, deleted, or unpublished, Launch automatically:
  1. Detects the change
  2. Triggers a new build
  3. Deploys the updated application
  4. Makes changes live

#### Benefits

- ✅ **Fully automated** - No manual intervention needed
- ✅ **Real-time updates** - Changes reflect immediately after deployment
- ✅ **Seamless integration** - Direct connection between Launch and Contentstack
- ✅ **Zero configuration** - Works automatically once connected

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Root route handler (/)
│   └── [...slug]/
│       └── page.tsx           # Catch-all route handler (all other routes)
├── components/
│   └── templates/
│       ├── BlogTemplate.tsx  # Blog post template
│       └── PageTemplate.tsx  # Regular page template
├── lib/
│   ├── contentstack.ts       # Contentstack SDK initialization
│   └── getRouteData.ts       # Routing logic (queries Contentstack)
└── .env.local                # Environment variables
```

## 📚 Contentstack Documentation

- [Next.js on Contentstack Launch](https://www.contentstack.com/docs/developers/launch/nextjs-on-launch)
- [Content Modeling](https://www.contentstack.com/docs/developers/create-content-types)
- [Automation](https://www.contentstack.com/docs/developers/automation-hub-guides/get-started-with-automation-hub)

## 🐛 Troubleshooting

### 404 Errors

- **Check routing entry exists**: Ensure a routing entry exists in Contentstack with the correct `url_path`
- **Verify entry is published**: Both routing entry and content entry must be published
- **Check URL path format**: Ensure `url_path` matches exactly (with or without leading slash)

### Content Not Loading

- **Verify API credentials**: Check environment variables are set correctly
- **Check content type UID**: Ensure `content_type_uid` matches the actual content type UID
- **Verify entry UID**: Ensure `entry_uid` is correct and the entry exists

---

