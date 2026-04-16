import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface BusinessProfile {
  id: string
  user_id: string
  business_name: string
  business_type: string
  whatsapp_number: string | null
  ai_personality: string
  ai_language: string
  islamic_mode: boolean
  product_catalog: any[] | null
  faq_list: any[] | null
  business_hours: string | null
  greeting_message: string | null
  plan: string
  is_active: boolean
  created_at: string
}

interface AuthContextType {
  user: any | null
  business: BusinessProfile | null
  loading: boolean
  signUp: (email: string, password: string, name: string, businessName: string, businessType: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateBusiness: (updates: Partial<BusinessProfile>) => Promise<void>
  refreshBusiness: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [business, setBusiness] = useState<BusinessProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBusiness = async (userId: string) => {
    const { data } = await supabase.from('ai_businesses').select('*').eq('user_id', userId).maybeSingle()
    setBusiness(data as BusinessProfile)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchBusiness(session.user.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchBusiness(session.user.id)
      else setBusiness(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string, businessName: string, businessType: string) => {
    const { data: { user: newUser }, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (newUser) {
      await supabase.from('ai_businesses').insert({
        user_id: newUser.id, business_name: businessName, business_type: businessType,
        ai_personality: 'friendly', ai_language: 'bm_en', islamic_mode: false,
        plan: 'trial', is_active: true,
      })
      await fetchBusiness(newUser.id)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setBusiness(null)
  }

  const updateBusiness = async (updates: Partial<BusinessProfile>) => {
    if (!user) return
    await supabase.from('ai_businesses').update(updates).eq('user_id', user.id)
    await fetchBusiness(user.id)
  }

  const refreshBusiness = async () => {
    if (user) await fetchBusiness(user.id)
  }

  return (
    <AuthContext.Provider value={{ user, business, loading, signUp, signIn, signOut, updateBusiness, refreshBusiness }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
