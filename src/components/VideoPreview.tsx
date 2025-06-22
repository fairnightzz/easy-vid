"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RedditPost, VideoOptions, VideoGenerationStatus } from "@/types/video";
import { Play, Download, Eye, Loader2 } from "lucide-react";

interface VideoPreviewProps {
  post: RedditPost;
  options: VideoOptions;
  status: VideoGenerationStatus;
  onGenerateVideo: () => void;
  onDownload?: () => void;
}

export default function VideoPreview({
  post,
  options,
  status,
  onGenerateVideo,
  onDownload,
}: VideoPreviewProps) {
  const isGenerating = status.status === "processing";
  const isCompleted = status.status === "completed";
  const hasError = status.status === "error";

  return (
    <div className="bg-white">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Video Preview
          </CardTitle>
          <CardDescription>
            Preview your video settings and generate the final video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Story Preview */}
          <div className="space-y-3">
            <h3 className="font-medium">Story Content</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm">{post.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {post.content}
              </p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.subreddit}</span>
              </div>
            </div>
          </div>

          {/* Video Settings Summary */}
          <div className="space-y-3">
            <h3 className="font-medium">Video Settings</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Voice:</span>
                <span className="ml-2 font-medium">
                  {options.voice.charAt(0).toUpperCase() +
                    options.voice.slice(1)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Speed:</span>
                <span className="ml-2 font-medium">{options.speechRate}x</span>
              </div>
              <div>
                <span className="text-muted-foreground">Background:</span>
                <span className="ml-2 font-medium">
                  {options.backgroundVideo.charAt(0).toUpperCase() +
                    options.backgroundVideo.slice(1)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Captions:</span>
                <span className="ml-2 font-medium">
                  {options.captionStyle.charAt(0).toUpperCase() +
                    options.captionStyle.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Video Preview Area */}
          <div className="aspect-[9/16] bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center border-2 border-dashed border-orange-200">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">{status.message}</p>
                  <Progress value={status.progress} className="w-48" />
                  <p className="text-xs text-muted-foreground">
                    {status.progress}% complete
                  </p>
                </div>
              </div>
            ) : isCompleted && status.videoUrl ? (
              <div className="text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3 w-fit mx-auto">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-700">
                  Video Ready!
                </p>
                <video
                  src={status.videoUrl}
                  controls
                  className="max-w-full max-h-48 rounded-lg"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='356'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E"
                />
              </div>
            ) : hasError ? (
              <div className="text-center space-y-2">
                <div className="bg-red-100 rounded-full p-3 w-fit mx-auto">
                  <Play className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-sm font-medium text-red-700">
                  Generation Failed
                </p>
                <p className="text-xs text-muted-foreground">
                  {status.message}
                </p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto">
                  <Play className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium">9:16 Video Preview</p>
                <p className="text-xs text-muted-foreground">
                  Click generate to create your video
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onGenerateVideo}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Video
                </>
              )}
            </Button>

            {isCompleted && (
              <Button
                onClick={onDownload}
                variant="outline"
                className="flex-shrink-0"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
