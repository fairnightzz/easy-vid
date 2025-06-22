"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  VideoOptions,
  VOICE_OPTIONS,
  BACKGROUND_OPTIONS,
  CAPTION_STYLES,
} from "@/types/video";
import { Settings, Volume2, Video, Type } from "lucide-react";

interface VideoCustomizationProps {
  options: VideoOptions;
  onOptionsChange: (options: VideoOptions) => void;
}

export default function VideoCustomization({
  options,
  onOptionsChange,
}: VideoCustomizationProps) {
  const updateOption = (key: keyof VideoOptions, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="bg-white">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Customize Video
          </CardTitle>
          <CardDescription>
            Adjust voice, background, and caption settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <h3 className="font-medium">Voice Settings</h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Voice</label>
              <Select
                value={options.voice}
                onValueChange={(value) => updateOption("voice", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VOICE_OPTIONS.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Speech Rate: {options.speechRate}x
              </label>
              <Slider
                value={[options.speechRate]}
                onValueChange={([value]) => updateOption("speechRate", value)}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>
          </div>

          {/* Background Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <h3 className="font-medium">Background Settings</h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Background Video</label>
              <Select
                value={options.backgroundVideo}
                onValueChange={(value) =>
                  updateOption("backgroundVideo", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BACKGROUND_OPTIONS.map((bg) => (
                    <SelectItem key={bg.value} value={bg.value}>
                      {bg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Background Opacity:{" "}
                {Math.round(options.backgroundOpacity * 100)}%
              </label>
              <Slider
                value={[options.backgroundOpacity]}
                onValueChange={([value]) =>
                  updateOption("backgroundOpacity", value)
                }
                min={0.3}
                max={1.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtle</span>
                <span>Full</span>
              </div>
            </div>
          </div>

          {/* Caption Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <h3 className="font-medium">Caption Settings</h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Caption Style</label>
              <Select
                value={options.captionStyle}
                onValueChange={(value) => updateOption("captionStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAPTION_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Caption Size: {options.captionSize}px
              </label>
              <Slider
                value={[options.captionSize]}
                onValueChange={([value]) => updateOption("captionSize", value)}
                min={16}
                max={48}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
