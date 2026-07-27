"use client"
import { useActionState, useEffect } from "react"
import { registerUser } from "../actions/users"
import { RegistrationState } from "../types"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const initialState: RegistrationState = { errors: {}, values: { username: "", name: "", password: "" }, success: false}
  const [state, formAction] = useActionState(registerUser, initialState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Registration successful, please log in")
      router.push("/login")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values.username} required />
          </label>
          {state.errors.usernameError && <p data-testid="username-error" style={{ color: "red" }}>{state.errors.usernameError.error}</p>}
          {state.errors.usernameExistsError && <p data-testid="username-exists-error" style={{ color: "red" }}>{state.errors.usernameExistsError.error}</p>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          {state.errors.passwordError && <p data-testid="password-error" style={{ color: "red" }}>{state.errors.passwordError.error}</p>}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
          </label>
          {state.errors.passwordConfirmError && <p data-testid="passwordConfirm-error" style={{ color: "red" }}>{state.errors.passwordConfirmError.error}</p>}
        </div>
        <button type="submit" data-testid="register-button">Register</button>
      </form>
    </div>
  )
}