const env = (typeof import.meta !== "undefined" && (import.meta as any)?.env) || {};
const nodeEnv = (typeof process !== "undefined" && process.env) || {};

const DEFAULT_CMS_API_BASE = "https://cms-backend.ppconsultings.com/api";
const DEFAULT_CMS_TOKEN =
  "4cbc91718e6de67541730cb693b37bfa35a4eeb13ebad17e3df36dc18e69d774";
const FALLBACK_IMAGE = "/assets/images/news/news-1.jpg";
const MAX_RETRIES = 3;

type JsonRecord = Record<string, unknown>;
type ListOpts = { limit?: number; page?: number; search?: string };

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  contentHtml: string;
  authorName: string;
  authorEmail: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  tags: string[];
};

const asRecord = (value: unknown): JsonRecord | null =>
  typeof value === "object" && value !== null ? (value as JsonRecord) : null;

const readString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const readNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const pickString = (record: JsonRecord, keys: string[]): string => {
  for (const key of keys) {
    const value = readString(record[key]);
    if (value) return value;
  }
  return "";
};

const stripHtml = (value: string): string =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const ellipsis = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeApiBase = (value: string): string => {
  const trimmed = value.replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_CMS_API_BASE;
  if (trimmed.endsWith("/api/public")) return trimmed.slice(0, -"/public".length);
  if (trimmed.endsWith("/public")) return trimmed.slice(0, -"/public".length);
  if (trimmed.endsWith("/api")) return trimmed;
  return `${trimmed}/api`;
};

export const getCmsApiBase = (): string =>
  normalizeApiBase(
    readString(env.VITE_CMS_API_BASE_URL) ||
      readString(env.VITE_CMS_API_BASE) ||
      readString(env.VITE_TRIADFLAIR_CMS_API_BASE_URL) ||
      readString(env.VITE_TRIADFLAIR_CMS_BASE) ||
      readString(nodeEnv.CMS_BASE) ||
      readString(nodeEnv.TRIADFLAIR_CMS_BASE) ||
      readString(nodeEnv.VITE_CMS_API_BASE_URL) ||
      readString(nodeEnv.VITE_CMS_API_BASE) ||
      readString(nodeEnv.VITE_TRIADFLAIR_CMS_API_BASE_URL) ||
      readString(nodeEnv.VITE_TRIADFLAIR_CMS_BASE) ||
      DEFAULT_CMS_API_BASE,
  );

const getCmsOrigin = (): string => getCmsApiBase().replace(/\/api$/, "");

export const getCmsToken = (): string =>
  (
    readString(env.VITE_CMS_SITE_TOKEN) ||
    readString(env.VITE_TRIADFLAIR_CMS_TOKEN) ||
    readString(nodeEnv.CMS_TOKEN) ||
    readString(nodeEnv.TRIADFLAIR_CMS_TOKEN) ||
    readString(nodeEnv.VITE_CMS_SITE_TOKEN) ||
    readString(nodeEnv.VITE_TRIADFLAIR_CMS_TOKEN) ||
    DEFAULT_CMS_TOKEN
  ).trim();

const toAbsoluteAssetUrl = (value: string): string => {
  if (!value) return "";

  const cmsOrigin = getCmsOrigin();
  const normalized = value.replace(/^https?:\/\/localhost:\d+(?=\/api\/public\/)/i, cmsOrigin);

  if (/^https?:\/\//i.test(normalized)) return normalized;
  if (normalized.startsWith("/api/public/")) return `${cmsOrigin}${normalized}`;

  try {
    return new URL(normalized, `${cmsOrigin}/`).toString();
  } catch {
    return normalized;
  }
};

const normalizeContentHtml = (value: string): string => {
  if (!value) return "";

  const cmsOrigin = getCmsOrigin();
  return value
    .replace(/https?:\/\/localhost:\d+(?=\/api\/public\/)/gi, cmsOrigin)
    .replace(/(["'(])\/api\/public\//g, `$1${cmsOrigin}/api/public/`);
};

const extractCoverImage = (record: JsonRecord): string => {
  const imageKeys = [
    "coverImageUrl",
    "cover_image_url",
    "featuredImageUrl",
    "imageUrl",
    "thumbnailUrl",
    "coverImage",
    "featuredImage",
    "image",
    "heroImage",
    "bannerUrl",
  ];

  for (const key of imageKeys) {
    const value = record[key];

    if (typeof value === "string") {
      const normalized = toAbsoluteAssetUrl(value.trim());
      if (normalized) return normalized;
      continue;
    }

    const nested = asRecord(value);
    if (nested) {
      const nestedUrl = pickString(nested, ["url", "src", "secureUrl"]);
      if (nestedUrl) return toAbsoluteAssetUrl(nestedUrl);
    }
  }

  return FALLBACK_IMAGE;
};

const extractTags = (record: JsonRecord): string[] => {
  const rawTags = record.tags ?? record.tagList ?? record.categories;
  if (!Array.isArray(rawTags)) return [];

  return rawTags
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();

      const nested = asRecord(entry);
      if (!nested) return "";

      const directName = pickString(nested, ["name", "label", "value", "tag", "slug", "title"]);
      if (directName) return directName;

      const linkedTag = asRecord(nested.tag) ?? asRecord(nested.category);
      return linkedTag
        ? pickString(linkedTag, ["name", "label", "value", "tag", "slug", "title"])
        : "";
    })
    .filter(Boolean);
};

const normalizePost = (rawPost: unknown, index = 0): CmsPost | null => {
  const record = asRecord(rawPost);
  if (!record) return null;

  const slug = pickString(record, ["slug", "postSlug", "urlSlug"]) || `post-${index}`;
  const id = pickString(record, ["id", "_id", "postId"]) || slug;
  if (!id || !slug) return null;

  const contentHtml = normalizeContentHtml(
    pickString(record, ["contentHtml", "content_html", "html", "content", "body"]),
  );
  const plainContent = stripHtml(contentHtml);
  const excerptSource = pickString(record, ["excerpt", "summary", "description", "seoDescription"]);
  const excerpt = excerptSource || ellipsis(plainContent, 180);

  const authorRecord = asRecord(record.author);
  const authorName =
    pickString(record, ["authorName", "createdByName"]) ||
    (authorRecord ? pickString(authorRecord, ["name", "fullName"]) : "");
  const authorEmail = authorRecord ? pickString(authorRecord, ["email"]) : "";

  return {
    id,
    slug,
    title: pickString(record, ["title", "name", "seoTitle"]) || "Untitled Post",
    excerpt,
    coverImageUrl: extractCoverImage(record),
    contentHtml,
    authorName,
    authorEmail,
    publishedAt: pickString(record, ["publishedAt", "published_at", "publishedOn", "createdAt"]),
    updatedAt: pickString(record, ["updatedAt", "updated_at"]),
    createdAt: pickString(record, ["createdAt", "created_at"]),
    tags: extractTags(record),
  };
};

const parseJsonSafely = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const isRetryableStatus = (status: number): boolean => status === 408 || status === 425 || status === 429 || status >= 500;

const cmsGet = async (path: string, query: Record<string, string | number | undefined> = {}) => {
  const token = getCmsToken();
  if (!token) {
    throw new Error("Missing CMS token.");
  }

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });

  const requestUrl = `${getCmsApiBase()}${path}${params.toString() ? `?${params.toString()}` : ""}`;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "X-Site-Token": token,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const payload = await parseJsonSafely(response);
      if (response.ok) {
        return payload;
      }

      const record = asRecord(payload);
      const message = record ? pickString(record, ["message", "error", "detail"]) : "";
      lastError = new Error(message || `CMS request failed (${response.status})`);

      if (!isRetryableStatus(response.status) || attempt === MAX_RETRIES) {
        throw lastError;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("CMS request failed");
      if (attempt === MAX_RETRIES) throw lastError;
    }

    await sleep(250 * attempt);
  }

  throw lastError || new Error("CMS request failed");
};

export async function listPosts(
  opts: ListOpts = {},
): Promise<{ posts: CmsPost[]; total: number; totalPages: number }> {
  const page = Math.max(1, opts.page ?? 1);
  const limit = Math.min(50, Math.max(1, opts.limit ?? 9));
  const payload = (await cmsGet("/public/posts", {
    page,
    limit,
    search: opts.search,
  })) as JsonRecord;

  const rawPosts = Array.isArray(payload?.posts)
    ? payload.posts
    : Array.isArray(asRecord(payload?.data)?.posts)
      ? (asRecord(payload?.data)?.posts as unknown[])
      : [];

  const posts = rawPosts
    .map((post, index) => normalizePost(post, index))
    .filter((post): post is CmsPost => Boolean(post));
  const total =
    readNumber(payload?.total) ??
    readNumber(asRecord(payload?.data)?.total) ??
    readNumber(payload?.count) ??
    posts.length;
  const totalPages =
    readNumber(payload?.totalPages) ??
    readNumber(asRecord(payload?.data)?.totalPages) ??
    Math.max(1, Math.ceil(total / limit));

  return { posts, total, totalPages };
}

export async function getPost(slug: string): Promise<CmsPost> {
  const cleanSlug = slug.trim();
  if (!cleanSlug) throw new Error("Missing post slug.");

  const payload = (await cmsGet(`/public/posts/${encodeURIComponent(cleanSlug)}`)) as JsonRecord;
  const post = normalizePost(payload?.post ?? payload, 0);
  if (!post) throw new Error("Post not found");
  return post;
}
