"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.61 1.21 3.25.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Octo home">
          <span className="brand-mark">
            <GitHubMark />
          </span>
          <span>octo</span>
        </Link>
        <span className="topbar-note">A simpler way to get started</span>
      </header>

      <section className="signin-card" aria-labelledby="signin-title">
        <div className="card-emblem">
          <GitHubMark />
        </div>
        {session ? (
          <>
            <p className="eyebrow">You&apos;re signed in</p>
            <h1 id="signin-title">Welcome{session.user?.name ? `, ${session.user.name}` : ""}.</h1>
            <p className="description">
              Your GitHub account is connected. You can safely sign out whenever
              you&apos;re finished.
            </p>
            <button
              className="github-button secondary-button"
              onClick={() => void signOut()}
              type="button"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="eyebrow">Welcome to Octo</p>
            <h1 id="signin-title">Sign in to continue</h1>
            <p className="description">
              Use your GitHub account to securely access your workspace.
            </p>
            <button
              className="github-button"
              disabled={isLoading}
              onClick={() => void signIn("github")}
              type="button"
            >
              <GitHubMark className="button-icon" />
              {isLoading ? "Checking your session..." : "Continue with GitHub"}
            </button>
            <p className="privacy-note">
              We&apos;ll only access the information needed to sign you in.
            </p>
          </>
        )}
      </section>

      <footer className="page-footer">
        <span>Secure sign-in powered by GitHub OAuth</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <a href="https://github.com">GitHub</a>
      </footer>
    </main>
  );
}
