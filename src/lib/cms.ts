type JsonRecord = Record<string, unknown>;
type ListOpts = { limit?: number; page?: number; search?: string };

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  coverImageUrl: string;
  contentHtml: string;
  authorName: string;
  authorEmail: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  tags: string[];
};

const POSTS_INDEX_PATH = "/cms-blog/posts.json";
const POST_DETAIL_BASE_PATH = "/cms-blog/posts";
const FALLBACK_IMAGE = "/cms_post.webp";

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

const stripHtml = (value: string): string =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const ellipsis = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const pickString = (record: JsonRecord, keys: string[]): string => {
  for (const key of keys) {
    const value = readString(record[key]);
    if (value) return value;
  }
  return "";
};

const normalizePost = (rawPost: unknown, index = 0): CmsPost | null => {
  const record = asRecord(rawPost);
  if (!record) return null;

  const slug = pickString(record, ["slug", "postSlug", "urlSlug"]) || `post-${index}`;
  const id = pickString(record, ["id", "_id", "postId"]) || slug;
  if (!slug || !id) return null;

  const excerptSource =
    pickString(record, ["excerpt", "summary", "description", "seoDescription"]) ||
    ellipsis(stripHtml(pickString(record, ["contentHtml", "content_html", "html", "content", "body"])), 180);

  return {
    id,
    slug,
    title: pickString(record, ["title", "name", "seoTitle"]) || "Untitled Post",
    excerpt: excerptSource,
    description:
      pickString(record, ["description", "seoDescription"]) ||
      excerptSource ||
      ellipsis(stripHtml(pickString(record, ["contentHtml", "content_html", "html", "content", "body"])), 160),
    coverImageUrl: pickString(record, ["coverImageUrl", "cover_image_url", "featuredImageUrl", "imageUrl"]) || FALLBACK_IMAGE,
    contentHtml: pickString(record, ["contentHtml", "content_html", "html", "content", "body"]),
    authorName: pickString(record, ["authorName", "createdByName"]) || "Triad Flair",
    authorEmail: pickString(record, ["authorEmail"]),
    publishedAt: pickString(record, ["publishedAt", "published_at", "publishedOn", "createdAt"]),
    updatedAt: pickString(record, ["updatedAt", "updated_at"]),
    createdAt: pickString(record, ["createdAt", "created_at"]),
    tags: Array.isArray(record.tags)
      ? record.tags.map((tag) => readString(tag)).filter(Boolean)
      : [],
  };
};

const fetchJson = async (path: string): Promise<unknown> => {
  const response = await fetch(path, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error(`Failed to fetch blog data (${response.status})`);
  }

  return response.json();
};

const matchesSearch = (post: CmsPost, search: string): boolean => {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  return [post.title, post.excerpt, post.description, post.slug, ...post.tags]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(query));
};

export async function listPosts(
  opts: ListOpts = {},
): Promise<{ posts: CmsPost[]; total: number; totalPages: number }> {
  const payload = (await fetchJson(POSTS_INDEX_PATH)) as JsonRecord;
  const rawPosts = Array.isArray(payload?.posts) ? payload.posts : [];

  const posts = rawPosts
    .map((post, index) => normalizePost(post, index))
    .filter((post): post is CmsPost => Boolean(post));

  const filteredPosts = opts.search ? posts.filter((post) => matchesSearch(post, opts.search || "")) : posts;
  const limit = Math.min(50, Math.max(1, opts.limit ?? 9));
  const page = Math.max(1, opts.page ?? 1);
  const total = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(start, start + limit);

  return {
    posts: paginatedPosts,
    total: readNumber(payload?.total) ?? total,
    totalPages,
  };
}

export async function getPost(slug: string): Promise<CmsPost> {
  const cleanSlug = slug.trim();
  if (!cleanSlug) {
    throw new Error("Post not found");
  }

  const payload = await fetchJson(`${POST_DETAIL_BASE_PATH}/${encodeURIComponent(cleanSlug)}.json`);
  const post = normalizePost(payload, 0);
  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}
