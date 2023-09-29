import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { supabase } from "@/lib/utils"
import { useIonToast } from "@ionic/react"
import { Loader } from "@/components/ui/loader"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useBorn } from "@/context/BornContext"
import { useFavoris } from "@/context/FavorisContext"
import { HeartCrack } from "lucide-react"

export function Profile({setIsOpen}: {setIsOpen: (st: boolean) => void}) {

    const [loading, setLoading] = useState(false)
    const [present] = useIonToast()
    const { setSessionData } = useAuth()
    const { setData } = useBorn()
    const { favoris, setSetData } = useFavoris()

    const signOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        if (error) {
            present({
                message: error?.message,
                duration: 1500,
                position: 'top',
                color: 'danger'
            })
            setLoading(false)
        } else {
            setSessionData(null)
        }
    }

    const { session } = useAuth()
    const navigate = useNavigate()
    useEffect(() => { if (session === undefined || session === null) navigate('/welcome') }, [session])

    const getFavoris = async () => {
        const { data, error } = await supabase
            .from('favoris')
            .select('*')

        if (error) {
            present({
                message: error?.message,
                duration: 1500,
                position: 'top',
                color: 'danger'
            })
            setLoading(false)
        } else {
            setSetData(data)
        }
    }
    useEffect(() => {
        getFavoris()
    }, [])

    return (
        <>
            <div className="p-4 pb-12 h-screen">
                <div className="mb-2 flex justify-between">
                    <p className="text-sm font-bold text-muted-foreground">Favoris</p>
                    <button className="text-accent" onClick={() => setIsOpen(true)}>Plus</button>
                </div>
                {
                    favoris.length ?
                        <div className="bg-muted flex gap-4 w-full h-[128px] p-4 rounded-xl">
                            {favoris?.map((favori, key) => <button onClick={() => setData({
                                id: favori.id,
                                place_name: favori.adresse,
                                center: [favori.longitude, favori.latitude],
                                statut_pdc: ""
                            })} key={key} className="flex gap-2 flex-col items-center">
                                <div className="flex items-center justify-center rounded-full h-[64px] w-[64px]" style={{ background: favori.color }}>
                                    <span className="text-2xl">{favori.icon}</span>
                                </div>
                                <p>{favori.name}</p>
                            </button>)}
                        </div>
                        :
                        <div className="bg-muted flex gap-4 w-full h-[100px] items-center justify-center rounded-xl">
                            <HeartCrack className=" text-muted-foreground" size={50} />
                        </div>
                }
                <Button className="mt-10" variant="destructive" size='lg' onClick={() => signOut()} disabled={loading}>{loading && <Loader />}Déconnexion</Button>
            </div>
        </>
    )
}