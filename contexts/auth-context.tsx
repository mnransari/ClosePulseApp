"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, remember: boolean) => Promise<{ success: boolean; message: string }>
  logout: () => void
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>
}

// Create a default context value to avoid undefined checks
const defaultContextValue: AuthContextType = {
  user: null,
  isLoading: false,
  login: async () => ({ success: false, message: "Context not initialized" }),
  logout: () => {},
  forgotPassword: async () => ({ success: false, message: "Context not initialized" }),
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    try {
      setIsLoading(true)
      const storedUser = localStorage.getItem("closepulse_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error)
      localStorage.removeItem("closepulse_user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Mock login function - in a real app, this would call an API
  const login = async (
    email: string,
    password: string,
    remember: boolean,
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation (in a real app, this would be server-side)
      if (!email || !password) {
        return { success: false, message: "Please enter both email and password" }
      }

      // Mock credentials check (replace with actual authentication in production)
      if (email === "demo@closepulse.com" && password === "password") {
        const userData: User = {
          id: "user-1",
          email: email,
          name: "Demo User",
        }

        setUser(userData)

        // Store user data if "remember me" is checked
        if (remember) {
          localStorage.setItem("closepulse_user", JSON.stringify(userData))
        }

        return { success: true, message: "Login successful" }
      }

      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced logout function
  const logout = () => {
    // Clear user state
    setUser(null)

    // Remove from localStorage
    try {
      localStorage.removeItem("closepulse_user")
    } catch (error) {
      console.error("Error during logout:", error)
    }

    // Additional cleanup if needed
    console.log("User logged out successfully")
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!email) {
        return { success: false, message: "Please enter your email address" }
      }

      // In a real app, this would trigger a password reset email
      return {
        success: true,
        message: "If an account exists with this email, you will receive password reset instructions.",
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    forgotPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

