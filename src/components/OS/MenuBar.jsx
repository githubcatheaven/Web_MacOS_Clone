import React, { useState, useEffect } from 'react'

const MenuBar = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }

    return (
        <div style={{
            height: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10000
        }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ fontWeight: 700 }}></div>
                <div style={{ fontWeight: 700 }}>Finder</div>
                <div>File</div>
                <div>Edit</div>
                <div>View</div>
                <div>Go</div>
                <div>Window</div>
                <div>Help</div>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div>🔋 100%</div>
                <div>📶</div>
                <div>{formatDate(time)}</div>
                <div>{formatTime(time)}</div>
            </div>
        </div>
    )
}

export default MenuBar
