import React, { useState } from 'react'

const ChineseChess = () => {
    const initialBoard = [
        ['r', 'n', 'b', 'a', 'k', 'a', 'b', 'n', 'r'],
        ['', '', '', '', '', '', '', '', ''],
        ['', 'c', '', '', '', '', '', 'c', ''],
        ['p', '', 'p', '', 'p', '', 'p', '', 'p'],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['P', '', 'P', '', 'P', '', 'P', '', 'P'],
        ['', 'C', '', '', '', '', '', 'C', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['R', 'N', 'B', 'A', 'K', 'A', 'B', 'N', 'R']
    ]

    const [board, setBoard] = useState(initialBoard)
    const [turn, setTurn] = useState('red') // 'red' (uppercase) or 'black' (lowercase)
    const [selected, setSelected] = useState(null) // { r, c }

    const pieces = {
        'r': '♜', 'n': '♞', 'b': '♝', 'a': '♛', 'k': '♚', 'c': '♙', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'A': '♕', 'K': '♔', 'C': '♙', 'P': '♙'
    }

    // Better unicode mapping
    const pieceChars = {
        'r': '車', 'n': '馬', 'b': '象', 'a': '士', 'k': '將', 'c': '砲', 'p': '卒',
        'R': '車', 'N': '馬', 'B': '相', 'A': '仕', 'K': '帥', 'C': '炮', 'P': '兵'
    }

    const isRed = (piece) => piece >= 'A' && piece <= 'Z'
    const isBlack = (piece) => piece >= 'a' && piece <= 'z'

    const handleSquareClick = (r, c) => {
        const piece = board[r][c]

        if (selected) {
            // Move or capture
            if (selected.r === r && selected.c === c) {
                setSelected(null) // Deselect
                return
            }

            const selectedPiece = board[selected.r][selected.c]
            if (isValidMove(selected.r, selected.c, r, c, selectedPiece)) {
                const newBoard = board.map(row => [...row])
                newBoard[r][c] = selectedPiece
                newBoard[selected.r][selected.c] = ''
                setBoard(newBoard)
                setTurn(turn === 'red' ? 'black' : 'red')
                setSelected(null)
            } else {
                // If clicking own piece, change selection
                if (piece && ((turn === 'red' && isRed(piece)) || (turn === 'black' && isBlack(piece)))) {
                    setSelected({ r, c })
                }
            }
        } else {
            // Select
            if (piece && ((turn === 'red' && isRed(piece)) || (turn === 'black' && isBlack(piece)))) {
                setSelected({ r, c })
            }
        }
    }

    const isValidMove = (r1, c1, r2, c2, piece) => {
        const target = board[r2][c2]
        if (target && ((isRed(piece) && isRed(target)) || (isBlack(piece) && isBlack(target)))) return false

        const dr = r2 - r1
        const dc = c2 - c1
        const absDr = Math.abs(dr)
        const absDc = Math.abs(dc)

        switch (piece.toLowerCase()) {
            case 'k': // General
                if (absDr + absDc !== 1) return false
                if (c2 < 3 || c2 > 5) return false
                if (isRed(piece)) { if (r2 < 7) return false }
                else { if (r2 > 2) return false }
                return true
            case 'a': // Advisor
                if (absDr !== 1 || absDc !== 1) return false
                if (c2 < 3 || c2 > 5) return false
                if (isRed(piece)) { if (r2 < 7) return false }
                else { if (r2 > 2) return false }
                return true
            case 'b': // Elephant
                if (absDr !== 2 || absDc !== 2) return false
                if (board[(r1 + r2) / 2][(c1 + c2) / 2]) return false // Blocking eye
                if (isRed(piece)) { if (r2 < 5) return false }
                else { if (r2 > 4) return false }
                return true
            case 'n': // Horse
                if (!((absDr === 2 && absDc === 1) || (absDr === 1 && absDc === 2))) return false
                if (absDr === 2) { if (board[(r1 + r2) / 2][c1]) return false } // Hobbling leg
                if (absDc === 2) { if (board[r1][(c1 + c2) / 2]) return false }
                return true
            case 'r': // Chariot
                if (r1 !== r2 && c1 !== c2) return false
                if (countObstacles(r1, c1, r2, c2) !== 0) return false
                return true
            case 'c': // Cannon
                if (r1 !== r2 && c1 !== c2) return false
                const obstacles = countObstacles(r1, c1, r2, c2)
                if (target) { return obstacles === 1 } // Capture needs 1 screen
                else { return obstacles === 0 } // Move needs 0 screens
            case 'p': // Soldier
                const forward = isRed(piece) ? -1 : 1
                if (isRed(piece)) {
                    if (r1 > 4) { // Before river
                        if (dr !== forward || dc !== 0) return false
                    } else { // After river
                        if (dr !== forward && dr !== 0) return false
                        if (dr === 0 && absDc !== 1) return false
                        if (dr === forward && absDc !== 0) return false
                    }
                } else {
                    if (r1 < 5) { // Before river
                        if (dr !== forward || dc !== 0) return false
                    } else { // After river
                        if (dr !== forward && dr !== 0) return false
                        if (dr === 0 && absDc !== 1) return false
                        if (dr === forward && absDc !== 0) return false
                    }
                }
                return true
            default: return false
        }
    }

    const countObstacles = (r1, c1, r2, c2) => {
        let count = 0
        if (r1 === r2) {
            const min = Math.min(c1, c2)
            const max = Math.max(c1, c2)
            for (let c = min + 1; c < max; c++) {
                if (board[r1][c]) count++
            }
        } else {
            const min = Math.min(r1, r2)
            const max = Math.max(r1, r2)
            for (let r = min + 1; r < max; r++) {
                if (board[r][c1]) count++
            }
        }
        return count
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#dcb35c',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px'
        }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Turn: {turn.toUpperCase()}</div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 40px)',
                gridTemplateRows: 'repeat(10, 40px)',
                border: '2px solid #5d4037',
                backgroundColor: '#e6cca0',
                position: 'relative'
            }}>
                {/* Grid Lines */}
                {/* This is a simplified visual representation */}

                {board.map((row, r) => (
                    row.map((piece, c) => (
                        <div
                            key={`${r}-${c}`}
                            onClick={() => handleSquareClick(r, c)}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                border: selected && selected.r === r && selected.c === c ? '2px solid blue' : 'none',
                                boxSizing: 'border-box'
                            }}
                        >
                            {/* Cross lines */}
                            <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '1px', backgroundColor: '#5d4037', zIndex: 0 }}></div>
                            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '1px', backgroundColor: '#5d4037', zIndex: 0 }}></div>

                            {/* River */}
                            {r === 4 && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#5d4037', zIndex: 0 }}></div>}
                            {r === 5 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#5d4037', zIndex: 0 }}></div>}

                            {piece && (
                                <div style={{
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    backgroundColor: '#f0d9b5',
                                    border: `2px solid ${isRed(piece) ? '#c00' : '#000'}`,
                                    color: isRed(piece) ? '#c00' : '#000',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    zIndex: 1,
                                    boxShadow: '0 2px 2px rgba(0,0,0,0.3)'
                                }}>
                                    {pieceChars[piece]}
                                </div>
                            )}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default ChineseChess
