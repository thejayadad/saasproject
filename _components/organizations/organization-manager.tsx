"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function OrganizationManager() {
  const { data: organizations, isPending, refetch } =
    authClient.useListOrganizations();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const slug = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      if (!slug) {
        setError("Enter a valid organization name.");
        return;
      }

      const { error } = await authClient.organization.create({
        name: name.trim(),
        slug,
      });

      if (error) {
        setError(error.message ?? "Unable to create organization.");
        return;
      }

      setName("");
      await refetch();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <section className="rounded-lg border border-base-300 bg-base-100 p-4">
        <h2 className="font-semibold">Create organization</h2>

        <form onSubmit={handleCreate} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Organization name"
            className="input w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-neutral btn-sm"
          >
            {loading ? "Creating..." : "Create organization"}
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-base-300 bg-base-100 p-4">
        <h2 className="font-semibold">Your organizations</h2>

        {isPending ? (
          <p className="mt-4 text-sm opacity-60">Loading...</p>
        ) : organizations?.length ? (
          <div className="mt-4 space-y-2">
            {organizations.map((organization) => (
              <div
                key={organization.id}
                className="rounded border border-base-300 p-3"
              >
                <p className="text-sm font-medium">
                  {organization.name}
                </p>

                <p className="text-xs opacity-60">
                  {organization.slug}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm opacity-60">
            No organizations yet.
          </p>
        )}
      </section>
    </div>
  );
}
