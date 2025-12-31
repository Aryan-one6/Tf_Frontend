import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { listPosts } from "../../lib/cms";

type SapphirePost = {
  id: string;
  slug: string;
  title: string;
  date?: string | null;
  categories: string[];
  image: string;
};

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.textContent || div.innerText || "").trim();
}
function monthShort(d: Date) {
  return d.toLocaleString("en-US", { month: "short" });
}
function day2(d: Date) {
  return String(d.getDate()).padStart(2, "0");
}

function parseDate(date?: string | null) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return { day: day2(d), month: monthShort(d) };
}

function normalizePost(raw: any, index: number): SapphirePost {
  const title = stripHtml(raw?.title || raw?.name || "");
  const slug = String(raw?.slug || raw?._id || raw?.id || `post-${index}`);
  const date =
    raw?.publishedAt || raw?.createdAt || raw?.updatedAt || raw?.date || raw?.postedAt || null;
  const categories = Array.isArray(raw?.categories)
    ? raw.categories
        .map((c: any) => (typeof c === "string" ? c : c?.name || c?.title))
        .filter(Boolean)
        .slice(0, 4)
    : Array.isArray(raw?.tags)
    ? raw.tags
        .map((t: any) =>
          typeof t === "string"
            ? t
            : t?.name || t?.title || t?.tag?.name || t?.tag?.title
        )
        .filter(Boolean)
        .slice(0, 4)
    : [];
  const image =
    raw?.featuredImage?.url ||
    raw?.featuredImage ||
    raw?.coverImageUrl ||
    raw?.coverImage?.url ||
    raw?.coverImage ||
    raw?.image?.url ||
    raw?.image ||
    raw?.heroImage ||
    raw?.thumbnailUrl ||
    raw?.thumbnail ||
    raw?.bannerUrl ||
    raw?.media?.url ||
    "/assets/images/news/news-1.jpg";

  return {
    id: String(raw?.id || raw?._id || slug || index),
    slug,
    title: title || "Untitled post",
    date,
    categories,
    image,
  };
}

const BlogArea = () => {
  const { search: queryString } = useLocation();
  const query = useMemo(() => new URLSearchParams(queryString), [queryString]);
  const q = query.get("s") || "";                    // support ?s=your+search
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<SapphirePost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    listPosts({ page, limit: 9, search: q })
      .then(({ posts, totalPages }) => {
        if (ignore) return;
        const normalized = Array.isArray(posts) ? posts.map((p, i) => normalizePost(p, i)) : [];
        setPosts(normalized);
        setTotalPages(totalPages || 1);
        setErr(null);
      })
      .catch((e) => setErr(e.message || "Failed to load posts"))
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, [page, q]);

  return (
    <section className="news-section blog-page-one">
      <div className="container">
        {err && <p style={{ color: "#f66", marginBottom: 16 }}>Error: {err}</p>}
        {loading && <p style={{ marginBottom: 16 }}>Loading posts…</p>}
        {!loading && !err && posts.length === 0 && (
          <p style={{ marginBottom: 16 }}>No posts found.</p>
        )}
        <div className="row">
          {posts.map((post) => {
            const dateParts = parseDate(post.date);
            const cats = post.categories.slice(0, 4);

            return (
              <div className="col-lg-4 col-md-6 col-sm-12 block-column" key={post.id}>
                <div className="news-block-one">
                  <div className="image-box">
                    <figure className="image">
                      <Link to={`/blog/${post.slug}`}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                    </figure>
                    <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                    <div className="post-date">
                      <h3>{dateParts?.day || "--"}</h3>
                      <span>{dateParts?.month || ""}</span>
                    </div>
                  </div>

                  <div className="news-content">
                    <ul className="category">
                      {cats.map((c) => (
                        <li key={c}><Link to={`/blog/${post.slug}`}>{c}</Link></li>
                      ))}
                    </ul>

                    <h3>
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <div className="btn-box">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="primary-btn one gradient-bg white-color border-btn"
                      >
                        <span>Read More</span>
                        <i className="icon-1 gradient-color"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple pagination controls (optional) */}
        {(totalPages > 1) && (
          <div className="row">
            <div className="col-12" style={{ textAlign: "center", marginTop: 24 }}>
              <button
                className="primary-btn one gradient-bg white-color border-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ marginRight: 8, opacity: page <= 1 ? 0.5 : 1 }}
              >
                <span>Previous</span>
                <i className="icon-1 gradient-color"></i>
              </button>
              <button
                className="primary-btn one gradient-bg white-color border-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ marginLeft: 8, opacity: page >= totalPages ? 0.5 : 1 }}
              >
                <span>Next</span>
                <i className="icon-1 gradient-color"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogArea;
