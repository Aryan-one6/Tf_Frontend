import keywordsData from "../../public/keywords.json";

export type KeywordSeo = {
  title: string;
  metaDescription: string;
  h1: string;
  canonical: string;
};

export type KeywordHero = {
  kicker: string;
  headline: string;
  subheadline: string;
  highlights: string[];
  primaryCta: {
    label: string;
    href: string;
  };
  footnotes: string[];
  pills: {
    title: string;
    text: string;
  }[];
};

export type KeywordSampleAutomation = {
  title: string;
  description: string;
  points: string[];
  highlight: string;
};

export type KeywordSampleAutomations = {
  kicker: string;
  headline: string;
  intro: string;
  items: KeywordSampleAutomation[];
};

export type KeywordSecurityAndIndustries = {
  kicker: string;
  headline: string;
  guardrails: string[];
  industries: {
    label: string;
    note: string;
  }[];
};

export type KeywordTimelineItem = {
  title: string;
  duration: string;
  summary: string;
  details: string[];
};

export type KeywordWhatYouGetTimeline = {
  kicker: string;
  headline: string;
  items: KeywordTimelineItem[];
};

export type KeywordFocusItem = {
  label: string;
  description: string;
  stats: string;
};

export type KeywordTeamsWeSupport = {
  kicker: string;
  headline: string;
  items: KeywordFocusItem[];
  guardrailsRepeater: string[];
};

export type KeywordDeliveryStep = {
  step: string;
  title: string;
  description: string;
  result: string;
};

export type KeywordDeliveryFramework = {
  kicker: string;
  headline: string;
  intro: string;
  steps: KeywordDeliveryStep[];
};

export type KeywordFaq = {
  question: string;
  answer: string;
};

export type KeywordFaqs = {
  kicker: string;
  headline: string;
  items: KeywordFaq[];
};

export type KeywordCtaAction = {
  label: string;
  href: string;
};

export type KeywordCta = {
  kicker: string;
  headline: string;
  text: string;
  actions: KeywordCtaAction[];
};

export type KeywordPageContent = {
  hero: KeywordHero;
  sampleAutomations: KeywordSampleAutomations;
  securityAndIndustries: KeywordSecurityAndIndustries;
  whatYouGetTimeline: KeywordWhatYouGetTimeline;
  teamsWeSupport: KeywordTeamsWeSupport;
  deliveryFramework: KeywordDeliveryFramework;
  faqs: KeywordFaqs;
  cta: KeywordCta;
  internalLinks: {
    label: string;
    href: string;
  }[];
};

export type KeywordPage = {
  keyword: string;
  slug: string;
  seo: KeywordSeo;
  schema: Record<string, unknown>;
  page: KeywordPageContent;
};

type KeywordDataFile = {
  brand: string;
  total_keywords: number;
  keywords: KeywordPage[];
};

const keywordFile = keywordsData as KeywordDataFile;

export const keywordPagesBySlug: Record<string, KeywordPage> = keywordFile.keywords.reduce(
  (acc, entry) => {
    acc[entry.slug] = entry;
    return acc;
  },
  {} as Record<string, KeywordPage>
);

export const allKeywordSlugs = keywordFile.keywords.map(({ slug }) => slug);

export function getKeywordPageBySlug(slug: string): KeywordPage | null {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase();
  return keywordPagesBySlug[normalizedSlug] ?? null;
}

export const keywordCanonicalUrls = allKeywordSlugs.map(
  (slug) => `https://triadflair.com/${slug}`
);
