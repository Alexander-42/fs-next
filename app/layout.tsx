import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import AuthSessionProvider from "./components/SessionProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="mx-auto max-w-3xl px-4 py-6">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}