import React from 'react'
import useStore from '../../store/useStore'
import Window from './Window'

const WindowManager = () => {
    const windows = useStore((state) => state.windows)

    return (
        <>
            {windows.map((win) => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    zIndex={win.zIndex}
                    position={win.position}
                    size={win.size}
                    minimized={win.minimized}
                >
                    {win.component}
                </Window>
            ))}
        </>
    )
}

export default WindowManager
