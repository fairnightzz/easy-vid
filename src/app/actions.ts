"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "../../supabase/server";

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();

  // Get the current URL dynamically from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const currentUrl =
    process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
  console.log(`${currentUrl}/auth/callback?redirect_to=/dashboard`);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${currentUrl}/auth/callback?redirect_to=/dashboard`,
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  if (data.url) {
    return redirect(data.url);
  }
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};
