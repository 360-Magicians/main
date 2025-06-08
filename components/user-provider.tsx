"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "professional" | "entrepreneur" | "admin" | "partner" | null

type UserProfile = {
  id: string
  name: string
  email: string
  role: UserRole
  preferredLanguage: string
  communicationPreferences: {
    videoCall: boolean
    textChat: boolean
    email: boolean
  }
  accessibilityNeeds: string[]
  onboardingCompleted: boolean
}

type UserContextType = {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user for demo purposes
const mockUser: UserProfile = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  role: "professional",
  preferredLanguage: "ASL",
  communicationPreferences: {
    videoCall: true,
    textChat: true,
    email: true,
  },
  accessibilityNeeds: ["captions", "high-contrast"],
  onboardingCompleted: true,
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in - using a safer approach
    const checkAuth = async () => {
      try {
        // For demo purposes, we'll simulate an API call
        // In a real app, this would be a fetch to your auth endpoint
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if we have a stored user in localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch (e) {
            console.error("Failed to parse stored user", e)
            // If parsing fails, clear the invalid data
            localStorage.removeItem("user")
          }
        }
      } catch (error) {
        console.error("Authentication check failed", error)
        // Don't set user if authentication fails
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // This would be an API call to login in a real app
      await new Promise((resolve) => setTimeout(resolve, 800))

      // For demo, we'll use the mock user
      const userData = { ...mockUser, email }

      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      // Redirect based on onboarding status
      if (!userData.onboardingCompleted) {
        router.push("/onboarding")
      } else {
        router.push("/dashboard")
      }

      return Promise.resolve()
    } catch (error) {
      console.error("Login error", error)
      return Promise.reject("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return Promise.reject("No user logged in")

    try {
      // This would be an API call in a real app
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = { ...user, ...data }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return Promise.resolve()
    } catch (error) {
      console.error("Profile update error", error)
      return Promise.reject("Failed to update profile")
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
