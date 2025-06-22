"use client";

import { useState } from "react";
import RedditUrlInput from "./RedditUrlInput";
import VideoCustomization from "./VideoCustomization";
import VideoPreview from "./VideoPreview";
import { RedditPost, VideoOptions, VideoGenerationStatus } from "@/types/video";

const DEFAULT_OPTIONS: VideoOptions = {
  voice: "alloy",
  speechRate: 1.0,
  backgroundVideo: "parkour1",
  backgroundOpacity: 0.7,
  captionStyle: "modern",
  captionSize: 24,
};

export default function VideoGenerator() {
  const [currentPost, setCurrentPost] = useState<RedditPost | null>(null);
  const [videoOptions, setVideoOptions] =
    useState<VideoOptions>(DEFAULT_OPTIONS);
  const [generationStatus, setGenerationStatus] =
    useState<VideoGenerationStatus>({
      status: "idle",
      progress: 0,
      message: "",
    });

  const handlePostExtracted = (post: RedditPost) => {
    setCurrentPost(post);
    setGenerationStatus({ status: "idle", progress: 0, message: "" });
  };

  const handleGenerateVideo = async () => {
    if (!currentPost) return;

    setGenerationStatus({
      status: "processing",
      progress: 0,
      message: "Initializing video generation...",
    });

    try {
      // Call the backend API to generate video
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: currentPost,
          options: videoOptions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      setGenerationStatus({
        status: "completed",
        progress: 100,
        message: "Video generated successfully!",
        videoUrl: data.videoUrl,
      });
    } catch (error) {
      console.error("Video generation error:", error);
      setGenerationStatus({
        status: "error",
        progress: 0,
        message:
          error instanceof Error ? error.message : "Failed to generate video",
      });
    }
  };

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    const link = document.createElement("a");
    link.href = generationStatus.videoUrl || "";
    link.download = `reddit-video-${Date.now()}.mp4`;
    link.click();
  };

  const handleReset = () => {
    setCurrentPost(null);
    setVideoOptions(DEFAULT_OPTIONS);
    setGenerationStatus({ status: "idle", progress: 0, message: "" });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="space-y-6">
        {/* Step 1: Import Reddit Story */}
        {!currentPost ? (
          <RedditUrlInput
            onPostExtracted={handlePostExtracted}
            isLoading={generationStatus.status === "processing"}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column: Customization */}
            <div className="space-y-6">
              <VideoCustomization
                options={videoOptions}
                onOptionsChange={setVideoOptions}
              />

              {/* Reset Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  ← Start with different story
                </button>
              </div>
            </div>

            {/* Right Column: Preview */}
            <div>
              <VideoPreview
                post={currentPost}
                options={videoOptions}
                status={generationStatus}
                onGenerateVideo={handleGenerateVideo}
                onDownload={handleDownload}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
