import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { listPosts, type CmsPost } from "../../lib/cms";

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

const BlogArea = () => {
  const { search: queryString } = useLocation();
  const query = useMemo(() => new URLSearchParams(queryString), [queryString]);
  const q = query.get("s") || "";
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    listPosts({ page, limit: 9, search: q })
      .then(({ posts, totalPages }) => {
        if (ignore) return;
        setPosts(posts);
        setTotalPages(totalPages || 1);
        setErr(null);
      })
      .catch((error) => {
        if (!ignore) setErr(error?.message || "Failed to load posts");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
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
            const dateParts = parseDate(post.publishedAt || post.createdAt || post.updatedAt);
            const tags = post.tags.slice(0, 4);

            return (
              <div className="col-lg-4 col-md-6 col-sm-12 block-column" key={post.id}>
                <div className="news-block-one">
                  <div className="image-box">
                    <figure className="image">
                      <Link to={`/blog/${post.slug}`}>
                        <img src={post.coverImageUrl} alt={post.title} />
                      </Link>
                    </figure>
                    <div
                      className="shape"
                      style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}
                    ></div>
                    <div className="post-date">
                      <h3>{dateParts?.day || "--"}</h3>
                      <span>{dateParts?.month || ""}</span>
                    </div>
                  </div>

                  <div className="news-content">
                    <ul className="category">
                      {tags.map((tag) => (
                        <li key={tag}>
                          <Link to={`/blog?s=${encodeURIComponent(tag)}`}>{tag}</Link>
                        </li>
                      ))}
                    </ul>

                    <h3>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {post.excerpt && <p>{post.excerpt}</p>}

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

        {totalPages > 1 && (
          <div className="row">
            <div className="col-12" style={{ textAlign: "center", marginTop: 24 }}>
              <button
                className="primary-btn one gradient-bg white-color border-btn"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                style={{ marginRight: 8, opacity: page <= 1 ? 0.5 : 1 }}
              >
                <span>Previous</span>
                <i className="icon-1 gradient-color"></i>
              </button>
              <button
                className="primary-btn one gradient-bg white-color border-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
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
