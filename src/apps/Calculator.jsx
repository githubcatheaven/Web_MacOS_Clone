import React, { useState } from 'react'

const Calculator = () => {
    const [display, setDisplay] = useState('0')
    const [prevValue, setPrevValue] = useState(null)
    const [operator, setOperator] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit))
            setWaitingForOperand(false)
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit)
        }
    }

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.')
        }
    }

    const clear = () => {
        setDisplay('0')
        setPrevValue(null)
        setOperator(null)
        setWaitingForOperand(false)
    }

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1))
    }

    const percent = () => {
        setDisplay(String(parseFloat(display) / 100))
    }

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display)

        if (prevValue === null) {
            setPrevValue(inputValue)
        } else if (operator) {
            const currentValue = prevValue || 0
            const newValue = calculate(currentValue, inputValue, operator)
            setPrevValue(newValue)
            setDisplay(String(newValue))
        }

        setWaitingForOperand(true)
        setOperator(nextOperator)
    }

    const calculate = (prev, next, op) => {
        switch (op) {
            case '+': return prev + next
            case '-': return prev - next
            case '*': return prev * next
            case '/': return prev / next
            default: return next
        }
    }

    const Button = ({ label, onClick, className = '', style = {} }) => (
        <button
            onClick={onClick}
            style={{
                fontSize: '20px',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                margin: '5px',
                cursor: 'pointer',
                transition: 'filter 0.2s',
                ...style
            }}
            className={className}
            onMouseDown={(e) => e.target.style.filter = 'brightness(80%)'}
            onMouseUp={(e) => e.target.style.filter = 'brightness(100%)'}
            onMouseLeave={(e) => e.target.style.filter = 'brightness(100%)'}
        >
            {label}
        </button>
    )

    const grayStyle = { backgroundColor: '#a5a5a5', color: 'black' }
    const orangeStyle = { backgroundColor: '#ff9f0a', color: 'white' }
    const darkStyle = { backgroundColor: '#333333', color: 'white' }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                color: 'white',
                fontSize: '50px',
                padding: '10px',
                wordBreak: 'break-all',
                lineHeight: 1
            }}>
                {display}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <Button label={display === '0' ? 'AC' : 'C'} onClick={clear} style={grayStyle} />
                <Button label="+/-" onClick={toggleSign} style={grayStyle} />
                <Button label="%" onClick={percent} style={grayStyle} />
                <Button label="÷" onClick={() => performOperation('/')} style={orangeStyle} />

                <Button label="7" onClick={() => inputDigit(7)} style={darkStyle} />
                <Button label="8" onClick={() => inputDigit(8)} style={darkStyle} />
                <Button label="9" onClick={() => inputDigit(9)} style={darkStyle} />
                <Button label="×" onClick={() => performOperation('*')} style={orangeStyle} />

                <Button label="4" onClick={() => inputDigit(4)} style={darkStyle} />
                <Button label="5" onClick={() => inputDigit(5)} style={darkStyle} />
                <Button label="6" onClick={() => inputDigit(6)} style={darkStyle} />
                <Button label="-" onClick={() => performOperation('-')} style={orangeStyle} />

                <Button label="1" onClick={() => inputDigit(1)} style={darkStyle} />
                <Button label="2" onClick={() => inputDigit(2)} style={darkStyle} />
                <Button label="3" onClick={() => inputDigit(3)} style={darkStyle} />
                <Button label="+" onClick={() => performOperation('+')} style={orangeStyle} />

                <Button label="0" onClick={() => inputDigit(0)} style={{ ...darkStyle, width: '110px', borderRadius: '25px', gridColumn: 'span 2' }} />
                <Button label="." onClick={inputDot} style={darkStyle} />
                <Button label="=" onClick={() => performOperation('=')} style={orangeStyle} />
            </div>
        </div>
    )
}

export default Calculator
