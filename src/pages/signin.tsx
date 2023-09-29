import { Loader } from "@/components/ui/loader"
import { supabase } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useIonToast } from "@ionic/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { appIcon } from "@/lib/constants"
import { useAuth } from "@/context/AuthContext"

export const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [present] = useIonToast()

    const handler = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {            
            present({
                message: error?.message,
                duration: 1500,
                position: 'top',
                color: 'danger'
            })
            setLoading(false)
        }
    }

    const { session } = useAuth()
    const navigate = useNavigate()
    useEffect(() => { if (session) navigate('/') }, [session])

    return (
        <div className="p-8 pb-16 h-screen flex items-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <img className="absolute top-20 left-1/2 -translate-x-1/2" src={appIcon} height={70} width={70} alt="app icon" />
                
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Connectez-vous</h1>
                    <p className="text-sm text-muted-foreground">Entrez vos informations en dessous pour connectez un compte.</p>
                </div>

                <div className="grid gap-6 mt-12">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Votre meilleur adresse mail</Label>
                        <Input placeholder="nom@exemple.com" type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input placeholder="monmotdepasse*" type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button variant="link" asChild className="ml-auto text-muted-foreground"><Link to="/forgot-password">Mot de passe oublié ?</Link></Button>
                    </div>
                </div>

                <Button className="mt-10" size='lg' onClick={() => handler()} disabled={loading}>{loading && <Loader />}Connexion</Button>

                <Link to='/signup' className="text-center pt-10 absolute bottom-12 left-1/2 -translate-x-1/2">Vous n'avez pas encore de compte <span className="underline">Inscrivez-vous</span> ?</Link>
            </div>
        </div>
    )
}
