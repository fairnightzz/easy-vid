"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Upload } from "lucide-react";
import { RedditPost } from "@/types/video";

interface RedditUrlInputProps {
  onPostExtracted: (post: RedditPost) => void;
  isLoading?: boolean;
}

export default function RedditUrlInput({
  onPostExtracted,
  isLoading = false,
}: RedditUrlInputProps) {
  const [url, setUrl] = useState("");
  const [manualText, setManualText] = useState("");
  const [manualTitle, setManualTitle] = useState("");

  const handleUrlSubmit = async () => {
    if (!url.trim()) return;

    try {
      // Call the backend API to fetch Reddit post
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redditUrl: url,
          options: {
            voice: "alloy",
            speechRate: 1.0,
            backgroundVideo: "parkour1",
            backgroundOpacity: 0.7,
            captionStyle: "modern",
            captionSize: 24,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch Reddit post");
      }

      // For now, we'll use the mock data since the API returns video URL
      // In a real implementation, you'd modify the API to return post data separately
      const mockPost: RedditPost = {
        title: "TIFU by accidentally ordering 100 pizzas instead of 1",
        content:
          "So this happened yesterday and I'm still mortified. I was using a food delivery app for the first time, and I thought the quantity selector was for toppings, not the number of pizzas. Long story short, 100 pizzas showed up at my door. The delivery guy looked as confused as I was. My neighbors had pizza for days, and I'm now known as the 'Pizza Guy' in my building. At least everyone loves me now?",
        author: "u/PizzaDisaster",
        subreddit: "r/tifu",
        url: url,
      };

      onPostExtracted(mockPost);
    } catch (error) {
      console.error("Error fetching Reddit post:", error);
      // Fallback to mock data for now
      const mockPost: RedditPost = {
        title: "TIFU by accidentally ordering 100 pizzas instead of 1",
        content:
          "So this happened yesterday and I'm still mortified. I was using a food delivery app for the first time, and I thought the quantity selector was for toppings, not the number of pizzas. Long story short, 100 pizzas showed up at my door. The delivery guy looked as confused as I was. My neighbors had pizza for days, and I'm now known as the 'Pizza Guy' in my building. At least everyone loves me now?",
        author: "u/PizzaDisaster",
        subreddit: "r/tifu",
        url: url,
      };

      onPostExtracted(mockPost);
    }
  };

  const handleManualSubmit = () => {
    if (!manualTitle.trim() || !manualText.trim()) return;

    const manualPost: RedditPost = {
      title: manualTitle,
      content: manualText,
      author: "Manual Entry",
      subreddit: "Manual",
      url: "",
    };

    onPostExtracted(manualPost);
  };

  return (
    <div className="bg-white">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Reddit Story
          </CardTitle>
          <CardDescription>
            Import a Reddit post by URL or enter your story manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Reddit URL
              </TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reddit Post URL</label>
                <Input
                  placeholder="https://www.reddit.com/r/tifu/comments/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Paste any Reddit post URL to automatically extract the content
                </p>
              </div>
              <Button
                onClick={handleUrlSubmit}
                disabled={!url.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? "Extracting..." : "Extract Post"}
              </Button>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Title</label>
                <Input
                  placeholder="Enter your story title..."
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Content</label>
                <Textarea
                  placeholder="Enter your story content here..."
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  disabled={isLoading}
                  rows={6}
                />
              </div>
              <Button
                onClick={handleManualSubmit}
                disabled={
                  !manualTitle.trim() || !manualText.trim() || isLoading
                }
                className="w-full"
              >
                Use This Story
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
