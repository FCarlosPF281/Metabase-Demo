import LoginForm from "../../features/auth/components/LoginForm"

export const metadata = {
  title: "Login - inControl",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-2xl">
        <LoginForm />
      </div>
    </main>
  )
}
