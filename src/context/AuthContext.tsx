// AuthContext.tsx

import { ReactNode, createContext, useContext, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/utils'

interface AuthContextProps {
  session: Session | null | undefined
  setSessionData: (sessionData: Session | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
    const setSessionData = (sessionData: Session | null) => {
        setSession(sessionData)
    }
  return (
    <AuthContext.Provider value={{ session, setSessionData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
