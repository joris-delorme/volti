import { ReactNode, createContext, useContext, useState } from 'react'

interface FavorisContextProps {
  favoris: IFavoris[]
  setSetData: (favorisData: IFavoris[]) => void
  setDeleteData: (id: number) => void
}

const FavorisContext = createContext<FavorisContextProps | undefined>(undefined)

export const FavorisProvider = ({ children }: { children: ReactNode }) => {
  const [favoris, setFavoris] = useState<IFavoris[]>([])

    const setSetData = (favorisData: IFavoris[]) => {
        setFavoris(old => [...favorisData])
    }

    const setDeleteData = (id: number) => {
        setFavoris(old => [...old.filter(x => x.id !== id)])
    }

  return (
    <FavorisContext.Provider value={{ favoris, setSetData, setDeleteData }}>
      {children}
    </FavorisContext.Provider>
  )
}

export const useFavoris = () => {
  const context = useContext(FavorisContext)
  if (context === undefined) {
    throw new Error('useFavoris must be used within an FavorisProvider')
  }
  return context
}
