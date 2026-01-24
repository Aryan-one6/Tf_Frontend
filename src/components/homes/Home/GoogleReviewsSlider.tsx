import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./google-reviews.css";

type Review = {
  author_name: string;
  author_photo_url?: string;
  rating: number;
  text: string;
  relative_time: string;
  timestamp?: number;
};

type ReviewsResponse = {
  reviews: Review[];
  rating?: number;
  total_reviews?: number;
  cached?: boolean;
  message?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  className?: string;
};

const GoogleIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="gr-icon">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.82-.07-1.64-.2-2.44H12v4.63h6.46a5.51 5.51 0 0 1-2.39 3.6v3h3.86c2.26-2.08 3.56-5.14 3.56-8.79Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-3c-1.07.72-2.45 1.14-4.08 1.14-3.14 0-5.8-2.12-6.75-4.98H1.25v3.13A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.25 14.25c-.24-.72-.38-1.48-.38-2.25s.14-1.53.38-2.25V6.62H1.25A12 12 0 0 0 0 12c0 1.94.46 3.77 1.25 5.38l4-3.13Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.76 0 3.35.6 4.6 1.76l3.44-3.44C17.96 1.15 15.24 0 12 0 7.32 0 3.25 2.69 1.25 6.62l4 3.13C6.2 6.87 8.86 4.75 12 4.75Z"
    />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < full || (half && i === full);
    return (
      <svg
        key={i}
        viewBox="0 0 24 24"
        className={`gr-star ${filled ? "is-filled" : ""}`}
        aria-hidden="true"
      >
        <path d="M12 2.7 14.7 9l6.3.5-4.8 4 1.5 6.1-5.7-3.4-5.7 3.4 1.5-6.1-4.8-4L9.3 9 12 2.7Z" />
      </svg>
    );
  });
  return <div className="gr-stars" aria-label={`Rated ${rating} out of 5`}>{stars}</div>;
};

const SkeletonCard = () => (
  <div className="gr-card gr-skeleton">
    <div className="gr-card-top">
      <div className="gr-badge" />
      <div className="gr-stars">
        <span className="gr-star-skel" />
        <span className="gr-star-skel" />
        <span className="gr-star-skel" />
        <span className="gr-star-skel" />
        <span className="gr-star-skel" />
      </div>
    </div>
    <div className="gr-lines">
      <span />
      <span />
      <span />
    </div>
    <div className="gr-footer">
      <div className="gr-avatar-skel" />
      <div className="gr-meta">
        <span />
        <span />
      </div>
    </div>
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const initials = review.author_name
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="gr-card">
      <div className="gr-card-top">
        <div className="gr-badge">
          <GoogleIcon />
          <span>Google Reviews</span>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="gr-text" title={review.text}>
        {review.text}
      </p>
      <div className="gr-footer">
        <div className="gr-avatar">
          {review.author_photo_url ? (
            <img src={review.author_photo_url} alt="" loading="lazy" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="gr-meta">
          <span className="gr-author">{review.author_name}</span>
          <span className="gr-time">{review.relative_time}</span>
        </div>
      </div>
    </div>
  );
};

export default function GoogleReviewsSlider({
  title = "Google Reviews",
  subtitle = "",
  maxItems = 9,
  className = "",
}: Props) {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const base =
      (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE) || "";
    const endpoint = `${base}/api/google-reviews?limit=${maxItems}`;
    const load = async () => {
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to load reviews");
        const json = (await res.json()) as ReviewsResponse;
        if (isMounted) setData(json);
      } catch (err: unknown) {
        if (isMounted) setError("Unable to load Google reviews right now. If developing locally, set VITE_API_BASE to your deployed URL or run `vercel dev` so the API route is available.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [maxItems]);

  const reviews = useMemo(() => data?.reviews?.slice(0, maxItems) || [], [data, maxItems]);
  const hasReviews = reviews && reviews.length > 0;

  return (
    <section className={`google-reviews ${className}`} aria-label="Google reviews">
      <div className="container">
        <div className="gr-header">
          <div>
            <div className="gr-heading">
              <GoogleIcon />
              <div>
                <p className="gr-eyebrow">From Google Reviews</p>
                <h3 className="gr-title">{title}</h3>
              </div>
            </div>
            {subtitle ? <p className="gr-subtitle">{subtitle}</p> : null}
          </div>
          {data?.rating && data?.total_reviews ? (
            <div className="gr-summary" aria-label={`Overall rating ${data.rating} out of 5`}>
              <div className="gr-summary-rating">
                <StarRating rating={data.rating} />
                <span className="gr-rating-number">{data.rating.toFixed(1)}/5</span>
              </div>
              <p className="gr-summary-text">Based on {data.total_reviews}+ reviews on Google</p>
            </div>
          ) : null}
        </div>

        {error ? <p className="gr-error">{error}</p> : null}

        <div className="gr-slider">
          {loading ? (
            <div className="gr-skeleton-row">
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : hasReviews ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              slidesPerView={1}
              spaceBetween={18}
              loop
              autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                900: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {reviews.map((review, idx) => (
                <SwiperSlide key={`${review.author_name}-${idx}`}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="gr-empty">No Google reviews available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
