import Link from "next/link";
import { ArrowUpRight, Check, Video, Mic, Captions } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Transform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Reddit Stories
              </span>{" "}
              into Viral Videos
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create engaging vertical videos from Reddit posts with AI-powered
              text-to-speech, synchronized captions, and dynamic parkour
              backgrounds. Perfect for TikTok, YouTube Shorts, and Instagram
              Reels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors text-lg font-medium"
              >
                Create Your First Video
                <Video className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No watermarks</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>HD video export</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Multiple voice options</span>
              </div>
            </div>

            {/* Feature preview icons */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Mic className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  AI Text-to-Speech
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Captions className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Auto Captions
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Parkour Backgrounds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
