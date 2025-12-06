import React, { useState, useEffect } from 'react'

const Notepad = () => {
    const [text, setText] = useState('')

    useEffect(() => {
        const savedText = localStorage.getItem('notepad-content')
        if (savedText) {
            setText(savedText)
        }
    }, [])

    const handleChange = (e) => {
        const newText = e.target.value
        setText(newText)
        localStorage.setItem('notepad-content', newText)
    }

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <textarea
                value={text}
                onChange={handleChange}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resize: 'none',
                    border: 'none',
                    padding: '10px',
                    fontSize: '16px',
                    fontFamily: 'monospace',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box'
                }}
                placeholder="Type something..."
            />
        </div>
    )
}

export default Notepad
