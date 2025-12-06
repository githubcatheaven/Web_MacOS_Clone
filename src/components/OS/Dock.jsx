import React from 'react'
import useStore from '../../store/useStore'
import { motion } from 'framer-motion'
import Calculator from '../../apps/Calculator'
import Notepad from '../../apps/Notepad'
import Solitaire from '../../apps/Solitaire'
import ChineseChess from '../../apps/ChineseChess'
import Finder from '../../apps/Finder'

const Dock = () => {
    const { openWindow } = useStore()

    const apps = [
        { id: 'finder', name: 'Finder', icon: '📂', component: <Finder /> },
        { id: 'calculator', name: 'Calculator', icon: '🧮', component: <Calculator /> },
        { id: 'notepad', name: 'Notepad', icon: '📝', component: <Notepad /> },
        { id: 'solitaire', name: 'Solitaire', icon: '🃏', component: <Solitaire /> },
        { id: 'chess', name: 'Chess', icon: '♟️', component: <ChineseChess /> },
    ]

    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(15px)',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            gap: '15px',
            zIndex: 10000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {apps.map((app) => (
                <DockIcon key={app.id} app={app} onClick={() => openWindow(app.id, app.id, app.name, app.component)} />
            ))}
        </div>
    )
}

const DockIcon = ({ app, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#eee',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
            title={app.name}
        >
            {app.icon}
        </motion.div>
    )
}

export default Dock
