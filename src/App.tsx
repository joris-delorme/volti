import {
  IonApp,
  setupIonicReact,
} from '@ionic/react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { useEffect } from 'react'
import { Loader } from './components/ui/loader'
import Login from './pages/login'

setupIonicReact()

const App: React.FC = () => {

  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!user && !loading) navigate('/login')
  }, [user, loading])

  if (loading) return <div className="h-screen w-screen flex items-center justify-center"><Loader /></div>

  return (
    <IonApp>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </IonApp>
  )
}

export default App
