import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/_components/auth/sign-out-button";

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-2 text-base-content/60">
          Welcome, {session.user.name}
        </p>

        <div className="card mt-6 border border-base-300 bg-base-100">
          <div className="card-body">
            <h2 className="font-semibold">
              Authentication successful
            </h2>

            <p className="text-sm text-base-content/60">
              Your session was verified on the server.
            </p>

            <p className="text-sm">
              Signed in as: {session.user.email}
            </p>
            <SignOutButton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-base-200 p-6">
          <p className="text-sm text-base-content/60">
            Loading dashboard...
          </p>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
