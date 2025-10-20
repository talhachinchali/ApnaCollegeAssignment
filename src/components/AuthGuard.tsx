import React, { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useCurrentUser } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: user, isLoading } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.navigate({ to: '/login' })
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
