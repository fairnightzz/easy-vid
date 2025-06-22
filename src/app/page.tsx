import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Video,
  Mic,
  Captions,
  Download,
  Smartphone,
  Clock,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Create Viral Content
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform Reddit stories into engaging videos with our
              comprehensive suite of AI-powered tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-6 h-6" />,
                title: "AI Text-to-Speech",
                description:
                  "Multiple voice options with adjustable speech rates for natural narration",
              },
              {
                icon: <Captions className="w-6 h-6" />,
                title: "Auto-Generated Captions",
                description:
                  "Synchronized captions that appear perfectly timed with narration",
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: "Parkour Backgrounds",
                description:
                  "Dynamic gameplay footage library with customizable overlay opacity",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "One-Click Export",
                description:
                  "Export to MP4 in mobile-optimized 9:16 aspect ratio",
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Mobile Optimized",
                description:
                  "Perfect for TikTok, YouTube Shorts, and Instagram Reels",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Quick Generation",
                description: "Create professional videos in minutes, not hours",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-orange-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-orange-100 max-w-2xl mx-auto">
              Create viral videos in just three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Reddit URL</h3>
              <p className="text-orange-100">
                Paste any Reddit post URL and we'll extract the content
                automatically
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customize Your Video
              </h3>
              <p className="text-orange-100">
                Choose voice, background, and caption settings to match your
                style
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Share</h3>
              <p className="text-orange-100">
                Download your video and share across all social media platforms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Start Creating Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your content creation needs. Scale as
              you grow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Viral?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join content creators who are already turning Reddit stories into
            viral videos and growing their audience.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Create Your First Video
            <Video className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
