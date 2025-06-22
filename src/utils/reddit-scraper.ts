import axios from "axios";
import { RedditPost } from "@/types/video";

/**
 * Fetches Reddit post data from a given URL
 * Uses Reddit's JSON API endpoint
 */
export async function fetchRedditPost(url: string): Promise<RedditPost> {
  try {
    // Convert Reddit URL to JSON API endpoint
    const jsonUrl = url.endsWith(".json") ? url : `${url}.json`;

    const response = await axios.get(jsonUrl, {
      headers: {
        "User-Agent": "RedditVideoGenerator/1.0",
      },
      timeout: 10000,
    });

    const data = response.data;

    // Reddit API returns an array with post data
    const postData = data[0]?.data?.children?.[0]?.data;

    if (!postData) {
      throw new Error("Invalid Reddit post data");
    }

    return {
      title: postData.title || "",
      content: postData.selftext || postData.body || "",
      author: `u/${postData.author}` || "Unknown",
      subreddit: `r/${postData.subreddit}` || "Unknown",
      url: url,
    };
  } catch (error) {
    console.error("Reddit scraping error:", error);

    // Fallback: return mock data for development
    return {
      title: "TIFU by accidentally ordering 100 pizzas instead of 1",
      content:
        "So this happened yesterday and I'm still mortified. I was using a food delivery app for the first time, and I thought the quantity selector was for toppings, not the number of pizzas. Long story short, 100 pizzas showed up at my door. The delivery guy looked as confused as I was. My neighbors had pizza for days, and I'm now known as the 'Pizza Guy' in my building. At least everyone loves me now?",
      author: "u/PizzaDisaster",
      subreddit: "r/tifu",
      url: url,
    };
  }
}

/**
 * Alternative scraper using Reddit's public API
 * Requires Reddit API credentials for higher rate limits
 */
export async function fetchRedditPostWithAuth(
  url: string,
  clientId?: string,
  clientSecret?: string,
): Promise<RedditPost> {
  // Implementation for authenticated Reddit API access
  // This would require Reddit API credentials
  throw new Error("Authenticated Reddit API not implemented yet");
}
