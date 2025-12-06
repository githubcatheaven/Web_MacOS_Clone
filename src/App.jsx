import React, { useState, useEffect } from 'react'
import useStore from './store/useStore'
import LoginScreen from './components/OS/LoginScreen'
import Desktop from './components/OS/Desktop'
import BootScreen from './components/OS/BootScreen'
import MobileWarning from './components/OS/MobileWarning'

function App() {
    const { isLoggedIn } = useStore()
    const [isBooting, setIsBooting] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) return <MobileWarning />
    if (isBooting) return <BootScreen onComplete={() => setIsBooting(false)} />

    return (
        <div className="app">
            {isLoggedIn ? <Desktop /> : <LoginScreen />}
        </div>
    )
}

export default App
