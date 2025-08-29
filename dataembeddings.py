import google.generativeai as genai
from pinecone import Pinecone
import time
import requests
from bs4 import BeautifulSoup




# API Keys (Store securely in production)
GEMINI_API_KEY = "AIzaSyCeyJhKZYrZ-w9m_2hOjv1D9OwIfRz1NWc"
PINECONE_API_KEY = "pcsk_2DGpRG_NArWnnBv76sN7r1wpFR1Qcg5vAPfE1KqsenN3d2as64xhcuYntWkquUfQBGJjDw"
TAVILY_API_KEY = "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"

# Initialize Google Gemini API
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index("heyaryann")

# Initialize Tavily Client
# tavily_client = TavilyClient(api_key=TAVILY_API_KEY)

def scrape_urls(url_list):
    """Scrape and extract visible text content using BeautifulSoup."""
    all_results = {}

    for url in url_list:
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')

                # Remove script and style elements
                for tag in soup(['script', 'style', 'noscript']):
                    tag.decompose()

                # Extract visible text
                text = ' '.join(soup.stripped_strings)
                all_results[url] = text
                print(f"Scraped: {url}")
            else:
                print(f"Failed ({response.status_code}): {url}")
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    return all_results


def embed_with_gemini(content):
    """Generates embeddings using Google Gemini API."""
    try:
        result = genai.embed_content(model="models/text-embedding-004", content=content)
        return result['embedding']
    except Exception as e:
        print(f"Error in embedding: {e}")
        return None

# URLs to scrape
urls = [
  "https://www.triadflair.com/",
  "https://www.triadflair.com/about",
  "https://www.triadflair.com/ai-agent-development",
  "https://www.triadflair.com/ai-automation",
  "https://www.triadflair.com/blog",
  "https://www.triadflair.com/chatbot-development",
  "https://www.triadflair.com/contact",
  "https://www.triadflair.com/digital-marketing",
  "https://www.triadflair.com/disclaimer",
  "https://www.triadflair.com/mobile-app-development",
  "https://www.triadflair.com/pricing",
  "https://www.triadflair.com/privacy",
  "https://www.triadflair.com/service",
  "https://www.triadflair.com/terms",
  "https://www.triadflair.com/web-development"
]

# Scrape content
scraped_data = scrape_urls(urls)

# Process and insert into Pinecone
for index_num, (url, text) in enumerate(scraped_data.items(), start=1):  # Generate unique index number
    embedding = embed_with_gemini(text)
    if embedding:
        unique_id = f"page-{index_num}"  # Unique ID for each page
        index.upsert([(unique_id, embedding, {"url": url, "content": text})])
        print(f"Inserted: {url} as {unique_id}")
    else:
        print(f"Skipping {url} due to embedding failure.")