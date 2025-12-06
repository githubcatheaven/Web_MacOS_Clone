import React, { useState } from 'react'
import useStore from '../../store/useStore'
import { motion } from 'framer-motion'

const LoginScreen = () => {
    const { login } = useStore()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            login()
        }, 1000)
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0,0,0,0.2)'
            }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    color: 'white'
                }}
            >
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#ddd',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }}></div>
                <div style={{ fontSize: '24px', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>User</div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '8px 15px',
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            color: 'white',
                            outline: 'none',
                            textAlign: 'center',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    />
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>{loading ? 'Logging in...' : 'Press Enter to login'}</div>
                </form>
            </motion.div>
        </div>
    )
}

export default LoginScreen
