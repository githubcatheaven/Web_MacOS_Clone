import React from 'react'

const MobileWarning = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚠️</div>
            <h1 style={{ marginBottom: '10px' }}>Desktop Only</h1>
            <p style={{ maxWidth: '400px', lineHeight: '1.5', color: '#aaa' }}>
                This Web Mac OS experience is designed for larger screens. Please open this on a desktop or laptop computer for the best experience.
            </p>
        </div>
    )
}

export default MobileWarning
