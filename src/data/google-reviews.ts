export interface GoogleReview {
  id: string;
  author: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
}

export const googleReviewStats = {
  rating: 5,
  reviewCount: 18,
  url: "https://www.google.com/search?q=Triad+Flair",
};

export const googleReviews: GoogleReview[] = [
  {
    id: "abhishek-verma",
    author: "Abhishek Verma",
    role: "Founder, Exalt Digital",
    date: "November 2024",
    rating: 5,
    comment:
      "Triad Flair automated our onboarding, CRM, and WhatsApp follow-ups in a single sprint. Their team mapped every touchpoint, kept us informed, and shipped a workflow that saves hours each week.",
  },
  {
    id: "laura-jensen",
    author: "Laura Jensen",
    role: "CMO, Brightlane Labs",
    date: "September 2024",
    rating: 5,
    comment:
      "We hired Triad Flair for a high-stakes website rebuild and they paired beautiful UI decisions with strong engineering fundamentals. Lighthouse scores, SEO, accessibility—everything was dialed in.",
  },
  {
    id: "vikas-patel",
    author: "Vikas Patel",
    role: "Operations Director, CloudNXT",
    date: "July 2024",
    rating: 5,
    comment:
      "From AI chatbots to analytics dashboards, every deliverable arrived with documentation and Loom walkthroughs. That transparency made it easy for our internal team to manage after launch.",
  },
];
