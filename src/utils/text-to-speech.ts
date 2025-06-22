import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Converts text to speech using OpenAI's TTS API
 */
export async function textToSpeech(
  text: string,
  voice: string = "alloy",
  speed: number = 1.0,
): Promise<string> {
  try {
    // Create audio using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as any,
      input: text,
      speed: speed,
    });

    // Convert to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Save to temporary file
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const audioPath = path.join(tempDir, `audio-${Date.now()}.mp3`);
    fs.writeFileSync(audioPath, buffer);

    return audioPath;
  } catch (error) {
    console.error("Text-to-speech error:", error);
    throw new Error("Failed to generate audio");
  }
}

/**
 * Gets the duration of an audio file in seconds
 */
export async function getAudioDuration(audioPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const ffmpeg = require("fluent-ffmpeg");

    ffmpeg.ffprobe(audioPath, (err: any, metadata: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration || 0);
      }
    });
  });
}
