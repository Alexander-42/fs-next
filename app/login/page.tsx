"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("Login successful")
      router.push("/")
      router.refresh()
    }
  }

  const inputClass =
    "w-full rounded border border-line bg-background px-3 py-2 text-sm text-strong outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
  const labelClass =
    "flex flex-col gap-1 text-sm font-medium text-foreground"

  return (
    <div className="mx-auto max-w-md rounded-lg border border-line bg-surface p-6">
      <h2 className="text-xl font-bold tracking-tight text-strong">Login</h2>
      {error && <p data-testid="error-message" className="mt-3 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className={labelClass}>
            Username
            <input
              type="text"
              name="username"
              required
              className={inputClass}
            />
          </label>
        </div>
        <div>
          <label className={labelClass}>
            Password
            <input
              type="password"
              name="password"
              required
              className={inputClass}
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="w-full rounded bg-accent-fill px-4 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover"
        >
          Login
        </button>
      </form>
    </div>
  )
}