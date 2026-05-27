import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { UserProfile, LessonProgress, Token, StockHolding, MasteryTier } from "@/types"
import { supabase } from "@/integrations/supabase/client"

interface UnitTestProgress {
  category: string
  completed: boolean
  score: number
  completedAt?: Date
}

interface AppContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  lessonProgress: LessonProgress[]
  updateLessonProgress: (lessonId: string, completed: boolean, quizScore?: number) => void
  tokens: Token[]
  addToken: (token: Omit<Token, "id" | "createdAt" | "priceSimulation" | "marketCap">) => void
  watchlist: string[]
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  resetOnboarding: () => void
  // InvestiCoins system
  jeffsBalance: number
  earnJeffs: (amount: number, reason: string) => void
  spendJeffs: (amount: number, reason: string) => boolean
  jeffsHistory: { amount: number; reason: string; date: Date }[]
  // Unit test progress
  unitTestProgress: UnitTestProgress[]
  updateUnitTestProgress: (category: string, completed: boolean, score: number) => void
  // Stock portfolio
  portfolio: StockHolding[]
  buyStock: (symbol: string, shares: number, pricePerShare: number) => boolean
  sellStock: (symbol: string, shares: number, pricePerShare: number) => boolean
  getHolding: (symbol: string) => StockHolding | undefined
  // Reward multiplier from benchmark
  getRewardMultiplier: () => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("investiplay_user")
    return stored ? JSON.parse(stored) : null
  })

  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(() => {
    const stored = localStorage.getItem("investiplay_progress")
    return stored ? JSON.parse(stored) : []
  })

  const [tokens, setTokens] = useState<Token[]>(() => {
    const stored = localStorage.getItem("investiplay_tokens")
    return stored ? JSON.parse(stored) : []
  })

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const stored = localStorage.getItem("investiplay_watchlist")
    return stored ? JSON.parse(stored) : []
  })

  const [jeffsBalance, setJeffsBalance] = useState<number>(() => {
    const stored = localStorage.getItem("investiplay_jeffs_balance")
    return stored ? JSON.parse(stored) : 0
  })

  const [jeffsHistory, setJeffsHistory] = useState<{ amount: number; reason: string; date: Date }[]>(() => {
    const stored = localStorage.getItem("investiplay_jeffs_history")
    return stored ? JSON.parse(stored) : []
  })

  const [unitTestProgress, setUnitTestProgress] = useState<UnitTestProgress[]>(() => {
    const stored = localStorage.getItem("investiplay_unit_tests")
    return stored ? JSON.parse(stored) : []
  })

  const [portfolio, setPortfolio] = useState<StockHolding[]>(() => {
    const stored = localStorage.getItem("investiplay_portfolio")
    return stored ? JSON.parse(stored) : []
  })

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("investiplay_user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("investiplay_user")
    }
  }

  // Hydrate user profile from the database whenever the auth session changes.
  // This is what makes login work across devices: even with no localStorage,
  // we rebuild the user from the `profiles` row.
  useEffect(() => {
    const hydrateFromProfile = async (userId: string, email?: string) => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle()

      if (error) {
        console.error("[AppContext] Failed to load profile", error)
        return
      }
      if (!profile) return

      const hydrated: UserProfile = {
        id: profile.id,
        firstName: profile.first_name ?? undefined,
        age: profile.age ?? 14,
        schoolName: profile.school_name ?? "",
        grade: profile.grade ?? 9,
        literacyLevel: (profile.literacy_level as MasteryTier) ?? "explorer",
        onboardingComplete: !!profile.onboarding_complete,
        assessmentScore: profile.assessment_score ?? 0,
        benchmarkScores: (profile.benchmark_scores as any) ?? {},
        benchmarkCategoryScores: (profile.benchmark_category_scores as any) ?? {},
        rewardMultiplier: profile.reward_multiplier ?? 1,
        createdAt: new Date(profile.created_at ?? Date.now()),
      }

      setUser(hydrated)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Defer Supabase call to avoid deadlocks inside the listener
        setTimeout(() => hydrateFromProfile(session.user.id, session.user.email), 0)
      } else {
        // Signed out — clear in-memory user so guards redirect properly
        setUserState(null)
        localStorage.removeItem("investiplay_user")
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) hydrateFromProfile(session.user.id, session.user.email)
    })

    return () => subscription.unsubscribe()
  }, [])

  const updateLessonProgress = (lessonId: string, completed: boolean, quizScore?: number) => {
    setLessonProgress(prev => {
      const existing = prev.find(p => p.lessonId === lessonId)
      const updated = existing
        ? prev.map(p =>
            p.lessonId === lessonId
              ? { ...p, completed, quizScore, completedAt: completed ? new Date() : undefined }
              : p
          )
        : [...prev, { lessonId, completed, quizScore, completedAt: completed ? new Date() : undefined }]
      
      localStorage.setItem("investiplay_progress", JSON.stringify(updated))
      return updated
    })
  }

  // Reward multiplier: 1.0 to 1.5 based on benchmark percentage
  const getRewardMultiplier = (): number => {
    if (!user) return 1.0
    if (typeof user.rewardMultiplier === "number") return user.rewardMultiplier
    if (typeof user.assessmentScore !== "number") return 1.0

    const normalizedScore = user.assessmentScore > 1.5
      ? Math.min(user.assessmentScore, 100)
      : user.assessmentScore * 100

    return Math.min(1 + normalizedScore / 200, 1.5)
  }

  const earnJeffs = (amount: number, reason: string) => {
    const multiplier = getRewardMultiplier()
    const scaledAmount = Math.round(amount * multiplier)
    setJeffsBalance(prev => {
      const newBalance = prev + scaledAmount
      localStorage.setItem("investiplay_jeffs_balance", JSON.stringify(newBalance))
      return newBalance
    })
    setJeffsHistory(prev => {
      const newHistory = [...prev, { amount: scaledAmount, reason, date: new Date() }]
      localStorage.setItem("investiplay_jeffs_history", JSON.stringify(newHistory))
      return newHistory
    })
  }

  const spendJeffs = (amount: number, reason: string): boolean => {
    if (jeffsBalance < amount) return false
    setJeffsBalance(prev => {
      const newBalance = prev - amount
      localStorage.setItem("investiplay_jeffs_balance", JSON.stringify(newBalance))
      return newBalance
    })
    setJeffsHistory(prev => {
      const newHistory = [...prev, { amount: -amount, reason, date: new Date() }]
      localStorage.setItem("investiplay_jeffs_history", JSON.stringify(newHistory))
      return newHistory
    })
    return true
  }

  const buyStock = (symbol: string, shares: number, pricePerShare: number): boolean => {
    const totalCost = Math.round(shares * pricePerShare * 100) / 100
    if (jeffsBalance < totalCost) return false
    
    // Spend the InvestiCoins
    spendJeffs(totalCost, `Bought ${shares} shares of ${symbol}`)
    
    // Add to portfolio
    setPortfolio(prev => {
      const existing = prev.find(h => h.symbol === symbol)
      let updated: StockHolding[]
      if (existing) {
        // Average the purchase price
        const totalShares = existing.shares + shares
        const avgPrice = ((existing.purchasePrice * existing.shares) + (pricePerShare * shares)) / totalShares
        updated = prev.map(h => 
          h.symbol === symbol 
            ? { ...h, shares: totalShares, purchasePrice: avgPrice }
            : h
        )
      } else {
        updated = [...prev, { symbol, shares, purchasePrice: pricePerShare, purchasedAt: new Date() }]
      }
      localStorage.setItem("investiplay_portfolio", JSON.stringify(updated))
      return updated
    })
    return true
  }

  const sellStock = (symbol: string, shares: number, pricePerShare: number): boolean => {
    const holding = portfolio.find(h => h.symbol === symbol)
    if (!holding || holding.shares < shares) return false
    
    const totalValue = Math.round(shares * pricePerShare * 100) / 100
    earnJeffs(totalValue, `Sold ${shares} shares of ${symbol}`)
    
    setPortfolio(prev => {
      const updated = prev.map(h => {
        if (h.symbol === symbol) {
          const remainingShares = h.shares - shares
          return remainingShares > 0 ? { ...h, shares: remainingShares } : null
        }
        return h
      }).filter((h): h is StockHolding => h !== null)
      localStorage.setItem("investiplay_portfolio", JSON.stringify(updated))
      return updated
    })
    return true
  }

  const getHolding = (symbol: string): StockHolding | undefined => {
    return portfolio.find(h => h.symbol === symbol)
  }

  const updateUnitTestProgress = (category: string, completed: boolean, score: number) => {
    setUnitTestProgress(prev => {
      const existing = prev.find(p => p.category === category)
      const updated = existing
        ? prev.map(p =>
            p.category === category
              ? { ...p, completed, score, completedAt: completed ? new Date() : undefined }
              : p
          )
        : [...prev, { category, completed, score, completedAt: completed ? new Date() : undefined }]
      
      localStorage.setItem("investiplay_unit_tests", JSON.stringify(updated))
      return updated
    })
  }

  const addToken = (tokenData: Omit<Token, "id" | "createdAt" | "priceSimulation" | "marketCap">) => {
    const newToken: Token = {
      ...tokenData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      priceSimulation: Math.random() * 10 + 0.1,
      marketCap: tokenData.totalSupply * (Math.random() * 10 + 0.1)
    }
    setTokens(prev => {
      const updated = [...prev, newToken]
      localStorage.setItem("investiplay_tokens", JSON.stringify(updated))
      return updated
    })
  }

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist(prev => {
        const updated = [...prev, symbol]
        localStorage.setItem("investiplay_watchlist", JSON.stringify(updated))
        return updated
      })
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      const updated = prev.filter(s => s !== symbol)
      localStorage.setItem("investiplay_watchlist", JSON.stringify(updated))
      return updated
    })
  }

  const resetOnboarding = () => {
    setUserState(null)
    setLessonProgress([])
    setTokens([])
    setWatchlist([])
    setJeffsBalance(0)
    setJeffsHistory([])
    setUnitTestProgress([])
    setPortfolio([])
    localStorage.removeItem("investiplay_user")
    localStorage.removeItem("investiplay_progress")
    localStorage.removeItem("investiplay_tokens")
    localStorage.removeItem("investiplay_watchlist")
    localStorage.removeItem("investiplay_jeffs_balance")
    localStorage.removeItem("investiplay_jeffs_history")
    localStorage.removeItem("investiplay_unit_tests")
    localStorage.removeItem("investiplay_portfolio")
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        lessonProgress,
        updateLessonProgress,
        tokens,
        addToken,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        resetOnboarding,
        jeffsBalance,
        earnJeffs,
        spendJeffs,
        jeffsHistory,
        unitTestProgress,
        updateUnitTestProgress,
        portfolio,
        buyStock,
        sellStock,
        getHolding,
        getRewardMultiplier
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
