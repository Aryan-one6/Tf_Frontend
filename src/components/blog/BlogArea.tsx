import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getPosts, getFeaturedMedia, getTerms, WPPost } from "../../lib/wp";

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

const BlogArea = () => {
  const { search: queryString } = useLocation();
  const query = useMemo(() => new URLSearchParams(queryString), [queryString]);
  const q = query.get("s") || "";                    // support ?s=your+search
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    getPosts({ page, per_page: 9, search: q })
      .then(({ data, totalPages }) => {
        if (ignore) return;
        setPosts(Array.isArray(data) ? data : []);
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
        <div className="row">
          {posts.map((post) => {
            const d = new Date(post.date);
            const media = getFeaturedMedia(post);
            const img =
              media?.media_details?.sizes?.medium?.source_url ||
              media?.source_url ||
              "/assets/images/news/news-1.jpg"; // fallback
            const alt = media?.alt_text || stripHtml(post.title.rendered);

            const cats = getTerms(post, "category").slice(0, 4) as { id: number; name: string; slug: string }[];

            return (
              <div className="col-lg-4 col-md-6 col-sm-12 block-column" key={post.id}>
                <div className="news-block-one">
                  <div className="image-box">
                    <figure className="image">
                      <Link to={`/blog/${post.slug}`}>
                        <img src={img} alt={alt} />
                      </Link>
                    </figure>
                    <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                    <div className="post-date">
                      <h3>{day2(d)}</h3>
                      <span>{monthShort(d)}</span>
                    </div>
                  </div>

                  <div className="news-content">
                    <ul className="category">
                      {cats.map((c) => (
                        // you can point these to a category page if/when you add it
                        <li key={c.id}><Link to={`/blog/${post.slug}`}>{c.name}</Link></li>
                      ))}
                    </ul>

                    <h3>
                      <Link to={`/blog/${post.slug}`}>
                        {stripHtml(post.title.rendered)}
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
