export interface VideoOptions {
  voice: string;
  speechRate: number;
  backgroundVideo: string;
  backgroundOpacity: number;
  captionStyle: string;
  captionSize: number;
}

export interface RedditPost {
  title: string;
  content: string;
  author: string;
  subreddit: string;
  url: string;
}

export interface VideoGenerationStatus {
  status: "idle" | "processing" | "completed" | "error";
  progress: number;
  message: string;
  videoUrl?: string;
}

export const VOICE_OPTIONS = [
  { value: "alloy", label: "Alloy (Neutral)" },
  { value: "echo", label: "Echo (Male)" },
  { value: "fable", label: "Fable (British Male)" },
  { value: "onyx", label: "Onyx (Deep Male)" },
  { value: "nova", label: "Nova (Female)" },
  { value: "shimmer", label: "Shimmer (Soft Female)" },
];

export const BACKGROUND_OPTIONS = [
  { value: "parkour1", label: "Urban Parkour" },
  { value: "parkour2", label: "Rooftop Running" },
  { value: "parkour3", label: "Street Freerunning" },
  { value: "parkour4", label: "Building Jumps" },
  { value: "parkour5", label: "Wall Running" },
];

export const CAPTION_STYLES = [
  { value: "modern", label: "Modern" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
  { value: "neon", label: "Neon" },
  { value: "classic", label: "Classic" },
];
