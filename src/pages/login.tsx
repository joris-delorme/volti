import GoogleButton from "@/components/google-button"
import { Loader } from "@/components/ui/loader"
import { AlertMessage } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/firebase"
import { firebaseError } from "@/lib/utils"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handler = () => {
        setError("")
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoading(false)
            })
            .catch((err) => {
                setError(firebaseError(err))
                setLoading(false)
            });
    }

    const navigate = useNavigate()
    useEffect(() => { if (auth.currentUser) navigate('/') }, [auth.currentUser])

    return (
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center mb-8">
                        <h1 className="text-2xl font-semibold tracking-tight">Connectez-vous</h1>
                        <p className="text-sm text-muted-foreground">Entrez vos informations en dessous pour connectez un compte.</p>
                    </div>

                    <Button className="absolute top-4 right-6" variant='ghost' asChild><Link to='/signin'>S'inscrire</Link></Button>

                    <AlertMessage message={error} variant="destructive" />

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Adresse mail</Label>
                        <Input placeholder="nom@exemple.com" type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input placeholder="monmotdepasse*" type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button variant="link" asChild className="ml-auto"><Link to="/forgot-password">Mot de passe oublié ?</Link></Button>
                    </div>

                    <Button onClick={() => handler()} disabled={loading}>{loading && <Loader />}Connexion</Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                        </div>
                    </div>
                    
                    <GoogleButton />
                </div>
            </div>
    )
}

export default Login