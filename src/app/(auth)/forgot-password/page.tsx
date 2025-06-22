import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                Password Reset
              </h1>
              <p className="text-sm text-muted-foreground">
                Password reset is not needed with Google OAuth.
              </p>
              <p className="text-sm text-muted-foreground">
                Simply sign in with your Google account.
              </p>
            </div>

            <Link
              className="text-primary font-medium hover:underline transition-all inline-block"
              href="/sign-in"
            >
              Go to Sign In
            </Link>

            <FormMessage message={searchParams} />
          </div>
        </div>
      </div>
    </>
  );
}
