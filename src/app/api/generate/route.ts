import { NextRequest, NextResponse } from "next/server";
import { RedditPost, VideoOptions } from "@/types/video";
import { generateVideo } from "@/utils/video-generator";
import { fetchRedditPost } from "@/utils/reddit-scraper";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post, options, redditUrl } = body as {
      post?: RedditPost;
      options: VideoOptions;
      redditUrl?: string;
    };

    let redditPost = post;

    // If Reddit URL is provided, fetch the post data
    if (redditUrl && !post) {
      try {
        redditPost = await fetchRedditPost(redditUrl);
      } catch (error) {
        console.error("Error fetching Reddit post:", error);
        return NextResponse.json(
          { error: "Failed to fetch Reddit post" },
          { status: 400 },
        );
      }
    }

    if (!redditPost) {
      return NextResponse.json(
        { error: "No Reddit post data provided" },
        { status: 400 },
      );
    }

    // Generate the video
    const videoUrl = await generateVideo(redditPost, options);

    return NextResponse.json({
      success: true,
      videoUrl,
      message: "Video generated successfully",
    });
  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 },
    );
  }
}
