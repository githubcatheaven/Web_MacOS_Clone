import React, { useRef } from 'react'
import Draggable from 'react-draggable'
import useStore from '../../store/useStore'

const Window = ({ id, title, children, zIndex, position, size, minimized }) => {
    const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition } = useStore()
    const nodeRef = useRef(null)

    if (minimized) return null

    return (
        <Draggable
            handle=".window-header"
            defaultPosition={position}
            onStop={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
            onMouseDown={() => focusWindow(id)}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                style={{
                    position: 'absolute',
                    zIndex: zIndex,
                    width: size.width,
                    height: size.height,
                    backgroundColor: '#1e1e1e', // Dark mode base
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <div className="window-header" style={{
                    height: '30px',
                    backgroundColor: '#2d2d2d',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    cursor: 'default',
                    borderBottom: '1px solid rgba(0,0,0,0.2)'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div onClick={(e) => { e.stopPropagation(); closeWindow(id) }} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', cursor: 'pointer' }}></div>
                        <div onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', cursor: 'pointer' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', cursor: 'pointer' }}></div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: '#ccc', fontWeight: 500 }}>{title}</div>
                </div>
                <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                    {children}
                </div>
            </div>
        </Draggable>
    )
}

export default Window
