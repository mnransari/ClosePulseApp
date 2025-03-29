"use client"

import { AuthProvider } from "@/contexts/auth-context"
import type { ReactNode } from "react"

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

