import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { RedditPost, VideoOptions } from "@/types/video";
import { textToSpeech, getAudioDuration } from "./text-to-speech";

/**
 * Main video generation function
 */
export async function generateVideo(
  post: RedditPost,
  options: VideoOptions,
): Promise<string> {
  try {
    // Create temp directory
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Step 1: Generate audio from text
    const fullText = `${post.title}. ${post.content}`;
    const audioPath = await textToSpeech(
      fullText,
      options.voice,
      options.speechRate,
    );
    const audioDuration = await getAudioDuration(audioPath);

    // Step 2: Get background video (placeholder for now)
    const backgroundVideoPath = getBackgroundVideo(options.backgroundVideo);

    // Step 3: Generate subtitle file
    const subtitlePath = await generateSubtitles(
      fullText,
      audioDuration,
      options,
    );

    // Step 4: Compose final video
    const outputPath = path.join(tempDir, `video-${Date.now()}.mp4`);
    await composeVideo({
      backgroundVideo: backgroundVideoPath,
      audio: audioPath,
      subtitles: subtitlePath,
      output: outputPath,
      options,
    });

    // Step 5: Clean up temporary files
    cleanupTempFiles([audioPath, subtitlePath]);

    return outputPath;
  } catch (error) {
    console.error("Video generation error:", error);
    throw new Error("Failed to generate video");
  }
}

/**
 * Gets the path to a background video file
 */
function getBackgroundVideo(backgroundType: string): string {
  // For now, use a placeholder video
  // In production, you'd have multiple background videos
  const videosDir = path.join(process.cwd(), "public", "videos");

  // Create videos directory if it doesn't exist
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  // Return path to placeholder video (you'll need to add actual video files)
  const placeholderPath = path.join(videosDir, "placeholder-parkour.mp4");

  // If placeholder doesn't exist, create a simple colored video
  if (!fs.existsSync(placeholderPath)) {
    createPlaceholderVideo(placeholderPath);
  }

  return placeholderPath;
}

/**
 * Creates a simple placeholder video
 */
function createPlaceholderVideo(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("color=c=blue:s=1080x1920:d=30")
      .inputFormat("lavfi")
      .outputOptions(["-c:v libx264", "-t 30", "-pix_fmt yuv420p"])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
}

/**
 * Generates subtitle file (SRT format)
 */
async function generateSubtitles(
  text: string,
  duration: number,
  options: VideoOptions,
): Promise<string> {
  const tempDir = path.join(process.cwd(), "temp");
  const subtitlePath = path.join(tempDir, `subtitles-${Date.now()}.srt`);

  // Simple subtitle generation - split text into chunks
  const words = text.split(" ");
  const wordsPerSecond = 2; // Adjust based on speech rate
  const wordsPerSubtitle = Math.ceil(wordsPerSecond * 3); // 3 seconds per subtitle

  let srtContent = "";
  let subtitleIndex = 1;

  for (let i = 0; i < words.length; i += wordsPerSubtitle) {
    const chunk = words.slice(i, i + wordsPerSubtitle).join(" ");
    const startTime = i / wordsPerSecond;
    const endTime = Math.min((i + wordsPerSubtitle) / wordsPerSecond, duration);

    srtContent += `${subtitleIndex}\n`;
    srtContent += `${formatSRTTime(startTime)} --> ${formatSRTTime(endTime)}\n`;
    srtContent += `${chunk}\n\n`;

    subtitleIndex++;
  }

  fs.writeFileSync(subtitlePath, srtContent);
  return subtitlePath;
}

/**
 * Formats time for SRT subtitle format
 */
function formatSRTTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")},${ms.toString().padStart(3, "0")}`;
}

/**
 * Composes the final video with background, audio, and subtitles
 */
function composeVideo(params: {
  backgroundVideo: string;
  audio: string;
  subtitles: string;
  output: string;
  options: VideoOptions;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const { backgroundVideo, audio, subtitles, output, options } = params;

    ffmpeg()
      .input(backgroundVideo)
      .input(audio)
      .outputOptions([
        "-c:v libx264",
        "-c:a aac",
        "-shortest",
        "-vf",
        `subtitles=${subtitles}:force_style='FontSize=${options.captionSize},PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2'`,
        "-aspect",
        "9:16",
        "-s",
        "1080x1920",
      ])
      .output(output)
      .on("end", () => {
        console.log("Video composition completed");
        resolve();
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
      })
      .on("progress", (progress) => {
        console.log("Processing: " + progress.percent + "% done");
      })
      .run();
  });
}

/**
 * Cleans up temporary files
 */
function cleanupTempFiles(filePaths: string[]) {
  filePaths.forEach((filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error cleaning up file:", filePath, error);
    }
  });
}
