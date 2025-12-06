import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BootScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(onComplete, 500)
                    return 100
                }
                return prev + 1
            })
        }, 30) // Adjust speed here

        return () => clearInterval(timer)
    }, [onComplete])

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <div style={{ fontSize: '100px', marginBottom: '50px' }}></div>
            <div style={{
                width: '200px',
                height: '4px',
                backgroundColor: '#333',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        backgroundColor: 'white',
                        width: `${progress}%`
                    }}
                />
            </div>
        </div>
    )
}

export default BootScreen
