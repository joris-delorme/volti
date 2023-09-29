import {
  IonApp,
  IonContent,
  IonPage,
  setupIonicReact,
} from '@ionic/react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SignIn } from '@/pages/signin'
import { Home } from '@/pages/home'
import { Welcome } from '@/pages/welcome'
import { SignUp } from '@/pages/signup'
import { supabase } from '@/lib/utils'
import { Session } from '@supabase/supabase-js'
import { useAuth } from './context/AuthContext'

setupIonicReact()

const App = () => {

  const [currentSession, setCurrentSession] = useState<Session | null | undefined>(undefined)
  const navigate = useNavigate()
  const { session, setSessionData } = useAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session === null) navigate('/welcome')
      setSessionData(session)
      setCurrentSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionData(session)
      setCurrentSession(session)
    })
  }, [])

  useEffect(() => {
    if (session === null) navigate('/welcome')
  }, [session])

  if (currentSession === undefined) {
    return (<IonPage><IonContent></IonContent></IonPage>)
  }

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default App
