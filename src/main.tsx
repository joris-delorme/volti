import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from './components/theme-provider'
import { FavorisProvider } from './context/FavorisContext'
import { BornProvider } from './context/BornContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <AuthProvider>
        <FavorisProvider>
          <BornProvider>
            <App />
          </BornProvider>
        </FavorisProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)
