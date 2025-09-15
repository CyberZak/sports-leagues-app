import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

type CacheRecord = Record<string, any>

type CacheContextValue = {
  getCache: (key: string) => any
  setCache: (key: string, value: any) => void
}

const CacheContext = createContext<CacheContextValue | undefined>(undefined)

export function useCache() {
  const ctx = useContext(CacheContext)
  if (!ctx) throw new Error('useCache must be used within CacheProvider')
  return ctx
}

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const cacheRef = useRef<CacheRecord>({})

  const getCache = useCallback((key: string) => {
    return cacheRef.current[key]
  }, [])

  const setCache = useCallback((key: string, value: any) => {
    cacheRef.current[key] = value
  }, [])

  const value = useMemo(() => ({ getCache, setCache }), [getCache, setCache])
  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}


