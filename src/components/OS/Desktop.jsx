import React from 'react'
import MenuBar from './MenuBar'
import Dock from './Dock'
import WindowManager from './WindowManager'

const Desktop = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop")', // macOS Sierra style mountain
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <MenuBar />
            <WindowManager />
            <Dock />
        </div>
    )
}

export default Desktop
