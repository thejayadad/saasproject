import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import OrganizationManager from "@/_components/organizations/organization-manager";

async function OrganizationsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-xl font-semibold">Organizations</h1>

      <p className="mt-1 text-sm opacity-60">
        Create and manage your workspaces.
      </p>

      <OrganizationManager />
    </main>
  );
}

export default function OrganizationsPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <OrganizationsContent />
    </Suspense>
  );
}
