"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        console.error("Unable to sign out:", error.message);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="btn btn-sm btn-outline"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
