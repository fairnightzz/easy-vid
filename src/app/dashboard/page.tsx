import DashboardNavbar from "@/components/dashboard-navbar";
import VideoGenerator from "@/components/VideoGenerator";
import { createClient } from "../../../supabase/server";
import { Video, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Video Creator
                </h1>
                <p className="text-muted-foreground">
                  Transform Reddit stories into viral videos
                </p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm text-sm p-3 px-4 rounded-lg border border-orange-200 flex gap-2 items-center">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-orange-700">
                Welcome back, {user.email?.split("@")[0]}! Ready to create
                amazing videos?
              </span>
            </div>
          </header>

          {/* Video Generator */}
          <section>
            <VideoGenerator />
          </section>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
