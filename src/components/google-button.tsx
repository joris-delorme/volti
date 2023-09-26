import { Button } from '@/components/ui/button'
import { auth } from "@/firebase";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const GoogleButton = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    return (
        <Button className="w-full" onClick={() => signInWithGoogle()} variant="outline">
            <span>Google</span>
        </Button>
    )
}

export default GoogleButton