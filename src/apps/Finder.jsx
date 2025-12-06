import React, { useState } from 'react'

const Finder = () => {
    const fileSystem = {
        'Desktop': [
            { name: 'Project.txt', type: 'file', icon: '📄' },
            { name: 'Screenshots', type: 'folder', icon: '📁' }
        ],
        'Documents': [
            { name: 'Resume.pdf', type: 'file', icon: '📄' },
            { name: 'Notes', type: 'folder', icon: '📁' }
        ],
        'Downloads': [
            { name: 'Installer.dmg', type: 'file', icon: '📦' },
            { name: 'Image.png', type: 'file', icon: '🖼️' }
        ],
        'Applications': [
            { name: 'Calculator.app', type: 'app', icon: '🧮' },
            { name: 'Notepad.app', type: 'app', icon: '📝' },
            { name: 'Solitaire.app', type: 'app', icon: '🃏' },
            { name: 'Chess.app', type: 'app', icon: '♟️' }
        ]
    }

    const [currentPath, setCurrentPath] = useState('Desktop')
    const [history, setHistory] = useState(['Desktop'])
    const [historyIndex, setHistoryIndex] = useState(0)

    const navigate = (path) => {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(path)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
        setCurrentPath(path)
    }

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1)
            setCurrentPath(history[historyIndex - 1])
        }
    }

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1)
            setCurrentPath(history[historyIndex + 1])
        }
    }

    const SidebarItem = ({ name, icon, active, onClick }) => (
        <div
            onClick={onClick}
            style={{
                padding: '5px 10px',
                cursor: 'pointer',
                backgroundColor: active ? 'rgba(0,0,0,0.1)' : 'transparent',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#333'
            }}
        >
            <span>{icon}</span>
            <span>{name}</span>
        </div>
    )

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#fff', color: '#333' }}>
            {/* Sidebar */}
            <div style={{
                width: '150px',
                backgroundColor: 'rgba(240, 240, 240, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                borderRight: '1px solid #ddd'
            }}>
                <div style={{ fontSize: '12px', color: '#888', paddingLeft: '10px', marginBottom: '5px' }}>Favorites</div>
                {Object.keys(fileSystem).map(key => (
                    <SidebarItem
                        key={key}
                        name={key}
                        icon="📁"
                        active={currentPath === key}
                        onClick={() => navigate(key)}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Toolbar */}
                <div style={{
                    height: '40px',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    gap: '10px'
                }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={goBack} disabled={historyIndex === 0} style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: historyIndex === 0 ? 0.3 : 1 }}>◀</button>
                        <button onClick={goForward} disabled={historyIndex === history.length - 1} style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: historyIndex === history.length - 1 ? 0.3 : 1 }}>▶</button>
                    </div>
                    <div style={{ fontWeight: 600 }}>{currentPath}</div>
                </div>

                {/* File Grid */}
                <div style={{ flex: 1, padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gridAutoRows: '100px', gap: '10px' }}>
                    {fileSystem[currentPath] ? fileSystem[currentPath].map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '5px'
                        }}
                            onDoubleClick={() => {
                                if (item.type === 'folder') {
                                    // Simulate folder navigation if we had nested folders
                                    alert('Nested folders not implemented in this demo')
                                }
                            }}
                            className="finder-item"
                        >
                            <div style={{ fontSize: '40px' }}>{item.icon}</div>
                            <div style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-word' }}>{item.name}</div>
                        </div>
                    )) : (
                        <div style={{ color: '#888' }}>Empty Folder</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Finder
