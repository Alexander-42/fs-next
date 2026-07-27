"use client"

import { useState, useTransition } from "react"
import { generateToken } from "../actions/users"

export const TokenGenerator = ({ initialToken }: { initialToken: string | null }) => {
  const [token, setToken] = useState(initialToken)
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      setToken(await generateToken())
    })
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        data-testid="generate-token-button"
        className="rounded bg-accent-fill px-4 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover disabled:opacity-60"
      >
        {pending ? "Generating…" : token ? "Generate new token" : "Generate token"}
      </button>

      {token ? (
        <div data-testid="token-display">
          <code
            data-testid="api-token"
            className="block overflow-x-auto rounded border border-line bg-background px-3 py-2 font-mono text-sm text-strong"
          >
            {token}
          </code>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-sm text-muted">
          No token yet — generate one.
        </p>
      )}
    </div>
  )
}
