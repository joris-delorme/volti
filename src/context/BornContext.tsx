import { ReactNode, createContext, useContext, useState } from 'react'

interface BornContextProps {
  selectedBorn: IBorn | null
  setData: (data: IBorn) => void
}

const BornContext = createContext<BornContextProps | undefined>(undefined)

export const BornProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBorn, setSelectedBorn] = useState<IBorn | null>(null)

    const setData = (data: IBorn) => {
      setSelectedBorn(data)
    }

  return (
    <BornContext.Provider value={{ selectedBorn, setData }}>
      {children}
    </BornContext.Provider>
  )
}

export const useBorn = () => {
  const context = useContext(BornContext)
  if (context === undefined) {
    throw new Error('useBorn must be used within an BornProvider')
  }
  return context
}
