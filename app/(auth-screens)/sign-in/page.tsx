"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message ?? "Unable to sign in.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm border border-base-300 bg-base-100">
        <div className="card-body gap-4">
          <div>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Sign in to your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm">
                Email
              </label>

              <input
                id="email"
                type="email"
                className="input w-full"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm">
                Password
              </label>

              <input
                id="password"
                type="password"
                className="input w-full"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div role="alert" className="alert alert-error text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-neutral w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-base-content underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
