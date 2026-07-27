"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  const linkClass =
    "rounded px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent-ink"

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-1 px-4 py-2">
        <Link
          href="/"
          className="mr-2 text-xl font-bold tracking-tight text-accent-fill-fg transition-colors hover:text-accent-fill-hover"
        >
          home
        </Link>
        <Link href="/blogs" className={linkClass}>
          blogs
        </Link>
        <Link href="/users" className={linkClass}>
          users
        </Link>
        {session ? (
          <>
            <Link href="/blogs/new" className={linkClass}>
              add blog
            </Link>
            <span className="ml-auto flex items-center gap-3">
              <Link href="/me" className="m-2 font-bold tracking-tight text-accent-fill-fg transition-colors hover:text-accent-fill-hover">
                me
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded border border-line px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                logout
              </button>
            </span>
          </>
        ) : (
          <span className="ml-auto flex items-center gap-1">
            <Link href="/login" className={linkClass}>
              login
            </Link>
            <Link
              href="/register"
              className="rounded bg-accent-fill px-3 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover"
            >
              register
            </Link>
          </span>
        )}
      </div>
    </nav>
  )
}