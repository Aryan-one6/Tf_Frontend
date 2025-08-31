"use client";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { getPostBySlug, getPosts, getFeaturedMedia, getTerms, WPPost } from "../../lib/wp";

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.textContent || div.innerText || "").trim();
}
function readingMinutes(text: string, wpm = 200) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

const BlogDetailsArea = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<WPPost | null>(null);
  const [latest, setLatest] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const _post = await getPostBySlug(slug);
        if (!ignore) setPost(_post);
        const { data: latestPosts } = await getPosts({ page: 1, per_page: 3 });
        if (!ignore) setLatest(latestPosts as WPPost[]);
        setErr(null);
      } catch (e: any) {
        if (!ignore) setErr(e?.message || "Unable to fetch post");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [slug]);

  const safeTitle = useMemo(() => stripHtml(post?.title.rendered || ""), [post]);
  const safeContent = useMemo(
    () => DOMPurify.sanitize(post?.content.rendered || ""),
    [post]
  );
  const authorName =
    (post?._embedded?.author && post?._embedded?.author[0]?.name) || "—";
  const minutes = readingMinutes(stripHtml(post?.content.rendered || ""));

  const featured = post ? getFeaturedMedia(post) : undefined;
  const hero =
    featured?.source_url ||
    featured?.media_details?.sizes?.large?.source_url ||
    "/assets/images/news/news-12.jpg";

  const categories = (post ? getTerms(post, "category") : []) as { id: number; name: string; slug: string }[];
  const tags = (post ? getTerms(post, "post_tag") : []) as { id: number; name: string; slug: string }[];

  return (
    <section className="sidebar-page-container">
      <div className="container">
        <div className="row">
          {/* MAIN */}
          <div className="col-lg-8 col-md-12 col-sm-12 content-side">
            <div className="blog-details-content">
              {err && <p style={{ color: "#f66" }}>Error: {err}</p>}
              {loading && <p>Loading…</p>}

              {post && (
                <>
                  <div className="news-block-five">
                    <div className="news-content-five">
                      <ul className="post-info">
                        <li>
                          <img src="/assets/images/icons/icon-22.png" alt="" />
                          <Link to="#">{authorName}</Link>
                        </li>
                        <li>
                          <img src="/assets/images/icons/icon-24.png" alt="" />
                          <span>{minutes} min Read</span>
                        </li>
                      </ul>
                      <h2>{safeTitle}</h2>
                    </div>

                    <div className="image-box">
                      <figure className="image">
                        <img src={hero} alt={featured?.alt_text || safeTitle} />
                      </figure>
                    </div>
                  </div>

                  {/* full content from WordPress */}
                  <div
                    className="text-box"
                    // WP returns HTML; we sanitize it above:
                    dangerouslySetInnerHTML={{ __html: safeContent }}
                  />

                  {/* Tags/Categories footer */}
                  <div className="post-share-option">
                    <div className="text-box"><h2>Tags:</h2></div>
                    <div className="inner-box">
                      <ul className="post-tags">
                        {tags.length === 0 && <li><span>No tags</span></li>}
                        {tags.map(t => (
                          <li key={t.id}>
                            <Link to={`/blog/${post.slug}`}>{t.name}</Link>
                          </li>
                        ))}
                      </ul>

                      <ul className="social-links">
                        <li><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(safeTitle)}&url=${encodeURIComponent(window?.location?.href || "")}`} target="_blank" rel="noopener noreferrer"><i className="icon-17"></i></a></li>
                        <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window?.location?.href || "")}`} target="_blank" rel="noopener noreferrer"><i className="icon-16"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
            <div className="blog-sidebar">
              {/* Search widget: redirects to /blog?s=... so Blog list will use it */}
              <div className="sidebar-widget search-widget">
                <div className="widget-title"><h3>Search Here</h3></div>
                <div className="search-inner">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const input = form.querySelector("input[name='s']") as HTMLInputElement;
                    if (input?.value) window.location.href = `/blog?s=${encodeURIComponent(input.value)}`;
                  }}>
                    <div className="form-group">
                      <input name="s" type="search" placeholder="Search Here" />
                      <button type="submit"><img src="/assets/images/icons/icon-25.png" alt="" /></button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Latest posts */}
              <div className="sidebar-widget post-widget">
                <div className="widget-title"><h3>Latest Posts</h3></div>
                <div className="post-box">
                  {latest.map(p => {
                    const media = getFeaturedMedia(p);
                    const img = media?.media_details?.sizes?.thumbnail?.source_url || media?.source_url || "/assets/images/news/post-1.jpg";
                    return (
                      <article className="post" key={p.id}>
                        <figure className="post-image">
                          <Link to={`/blog/${p.slug}`}><img src={img} alt={media?.alt_text || stripHtml(p.title.rendered)} /></Link>
                        </figure>
                        <div className="post-content">
                          <div className="post-date">
                            <img src="/assets/images/icons/icon-26.png" alt="" />
                            <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                          </div>
                          <h5><Link to={`/blog/${p.slug}`}>{stripHtml(p.title.rendered)}</Link></h5>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Categories */}
              <div className="sidebar-widget catagories-widget">
                <div className="widget-title"><h3>Categories</h3></div>
                <div className="widget-content">
                  <ul className="catagories-list clearfix">
                    {categories.length === 0 && <li><span className="text">Uncategorized</span><span className="number">—</span></li>}
                    {categories.map(c => (
                      <li key={c.id}>
                        <Link to={`/blog/${post?.slug}`}>
                          <span className="text">{c.name}</span>
                          <span className="number">•</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="sidebar-widget tags-widget">
                <div className="widget-title"><h3>Popular Tags</h3></div>
                <div className="widget-content">
                  <ul className="tags-list clearfix">
                    {tags.map(t => (
                      <li key={t.id}><Link to={`/blog/${post?.slug}`}>{t.name}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* /SIDEBAR */}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
