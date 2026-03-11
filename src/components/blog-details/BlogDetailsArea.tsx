import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import { getPost, listPosts, type CmsPost } from "../../lib/cms";

const SITE_URL =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : "https://triadflair.com";
const FALLBACK_IMAGE = "/assets/images/news/news-12.jpg";

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.textContent || div.innerText || "").trim();
}

function readingMinutes(text: string, wpm = 200) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

function formatPublishedDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const BlogDetailsArea = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<CmsPost | null>(null);
  const [latest, setLatest] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const notFound = err === "Post not found";

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const currentPost = await getPost(slug);
        const { posts } = await listPosts({ page: 1, limit: 4 });

        if (ignore) return;
        setPost(currentPost);
        setLatest(posts.filter((entry) => entry.slug !== currentPost.slug).slice(0, 3));
        setErr(null);
      } catch (error: any) {
        if (!ignore) {
          setPost(null);
          setLatest([]);
          setErr(error?.message || "Unable to fetch post");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const safeTitle = post?.title || "Blog Details";
  const safeExcerpt = post?.excerpt || "";
  const safeContent = useMemo(
    () =>
      DOMPurify.sanitize(post?.contentHtml || "", {
        ADD_ATTR: ["target", "rel", "style", "data-name", "data-rte-button"],
      }),
    [post?.contentHtml],
  );
  const authorName = post?.authorName || "Triad Flair";
  const authorEmail = post?.authorEmail || "";
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}/blog/${slug}`;
  const publishedDate = formatPublishedDate(post?.publishedAt || post?.createdAt || post?.updatedAt);
  const minutes = readingMinutes(stripHtml(post?.contentHtml || post?.excerpt || ""));
  const hero = post?.coverImageUrl || FALLBACK_IMAGE;
  const tags = post?.tags || [];
  const metaDescription = safeExcerpt || stripHtml(post?.contentHtml || "").slice(0, 160);
  const canonical = notFound ? `${SITE_URL}/404` : `${SITE_URL}/blog/${post?.slug || slug}`;

  return (
    <section className="sidebar-page-container">
      <Helmet>
        <title>
          {notFound
            ? "404 Not Found | Triad Flair"
            : post
              ? `${safeTitle} | Triad Flair`
              : "Blog Details | Triad Flair"}
        </title>
        <meta
          name="description"
          content={
            notFound
              ? "The requested blog post could not be found."
              : metaDescription || "Latest insights from Triad Flair."
          }
        />
        {notFound && <meta name="robots" content="noindex, nofollow" />}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content={notFound ? "website" : "article"} />
        <meta property="og:title" content={notFound ? "404 Not Found | Triad Flair" : safeTitle} />
        <meta
          property="og:description"
          content={
            notFound
              ? "The requested blog post could not be found."
              : metaDescription || "Latest insights from Triad Flair."
          }
        />
        <meta property="og:url" content={canonical} />
        {hero && <meta property="og:image" content={hero} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={notFound ? "404 Not Found | Triad Flair" : safeTitle} />
        <meta
          name="twitter:description"
          content={
            notFound
              ? "The requested blog post could not be found."
              : metaDescription || "Latest insights from Triad Flair."
          }
        />
        {hero && <meta name="twitter:image" content={hero} />}
      </Helmet>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 content-side">
            <div className="blog-details-content">
              {err && <p style={{ color: "#f66" }}>Error: {err}</p>}
              {loading && <p>Loading…</p>}

              {!loading && notFound && (
                <div className="news-block-five">
                  <div className="news-content-five">
                    <h2>Post not found</h2>
                    <p>The requested article does not exist anymore or the slug is invalid.</p>
                    <div className="btn-box" style={{ marginTop: 24 }}>
                      <Link to="/blog" className="primary-btn one gradient-bg white-color border-btn">
                        <span>Browse blog</span>
                        <i className="icon-1 gradient-color"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {post && (
                <>
                  <div className="news-block-five">
                    <div className="news-content-five">
                      <ul className="post-info">
                        <li>
                          <img src="/assets/images/icons/icon-22.png" alt="" />
                          <Link to="/blog">{authorName}</Link>
                        </li>
                        {publishedDate && (
                          <li>
                            <img src="/assets/images/icons/icon-26.png" alt="" />
                            <span>{publishedDate}</span>
                          </li>
                        )}
                        <li>
                          <img src="/assets/images/icons/icon-24.png" alt="" />
                          <span>{minutes} min Read</span>
                        </li>
                      </ul>
                      <h2>{safeTitle}</h2>
                      {safeExcerpt && <p>{safeExcerpt}</p>}
                      {authorEmail && (
                        <p>
                          <strong>Email:</strong> <a href={`mailto:${authorEmail}`}>{authorEmail}</a>
                        </p>
                      )}
                    </div>

                    <div className="image-box">
                      <figure className="image">
                        <img src={hero} alt={safeTitle} />
                      </figure>
                    </div>
                  </div>

                  <div
                    className="text-box cms-blog-content"
                    dangerouslySetInnerHTML={{ __html: safeContent }}
                  />

                  <div className="post-share-option">
                    <div className="text-box">
                      <h2>Tags:</h2>
                    </div>
                    <div className="inner-box">
                      <ul className="post-tags">
                        {tags.length === 0 && (
                          <li>
                            <span>No tags</span>
                          </li>
                        )}
                        {tags.map((tag) => (
                          <li key={tag}>
                            <Link to={`/blog?s=${encodeURIComponent(tag)}`}>{tag}</Link>
                          </li>
                        ))}
                      </ul>

                      <ul className="social-links">
                        <li>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(safeTitle)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-17"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-16"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
            <div className="blog-sidebar">
              <div className="sidebar-widget search-widget">
                <div className="widget-title">
                  <h3>Search Here</h3>
                </div>
                <div className="search-inner">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const form = event.currentTarget as HTMLFormElement;
                      const input = form.querySelector("input[name='s']") as HTMLInputElement;
                      if (input?.value) {
                        window.location.href = `/blog?s=${encodeURIComponent(input.value)}`;
                      }
                    }}
                  >
                    <div className="form-group">
                      <input name="s" type="search" placeholder="Search Here" />
                      <button type="submit">
                        <img src="/assets/images/icons/icon-25.png" alt="" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sidebar-widget post-widget">
                <div className="widget-title">
                  <h3>Latest Posts</h3>
                </div>
                <div className="post-box">
                  {latest.map((entry) => (
                    <article className="post" key={entry.id}>
                      <figure className="post-image">
                        <Link to={`/blog/${entry.slug}`}>
                          <img src={entry.coverImageUrl || FALLBACK_IMAGE} alt={entry.title} />
                        </Link>
                      </figure>
                      <div className="post-content">
                        <div className="post-date">
                          <img src="/assets/images/icons/icon-26.png" alt="" />
                          <span>{formatPublishedDate(entry.publishedAt || entry.createdAt || entry.updatedAt)}</span>
                        </div>
                        <h5>
                          <Link to={`/blog/${entry.slug}`}>{entry.title}</Link>
                        </h5>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget catagories-widget">
                <div className="widget-title">
                  <h3>Topics</h3>
                </div>
                <div className="widget-content">
                  <ul className="catagories-list clearfix">
                    {tags.length === 0 && (
                      <li>
                        <span className="text">General</span>
                        <span className="number">—</span>
                      </li>
                    )}
                    {tags.map((tag) => (
                      <li key={tag}>
                        <Link to={`/blog?s=${encodeURIComponent(tag)}`}>
                          <span className="text">{tag}</span>
                          <span className="number">•</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sidebar-widget tags-widget">
                <div className="widget-title">
                  <h3>Popular Tags</h3>
                </div>
                <div className="widget-content">
                  <ul className="tags-list clearfix">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <Link to={`/blog?s=${encodeURIComponent(tag)}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
