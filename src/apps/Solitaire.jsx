import React, { useState, useEffect } from 'react'

const Solitaire = () => {
    const [deck, setDeck] = useState([])
    const [tableau, setTableau] = useState([])
    const [foundation, setFoundation] = useState([[], [], [], []])
    const [stock, setStock] = useState([])
    const [waste, setWaste] = useState([])
    const [selected, setSelected] = useState(null) // { type: 'tableau'|'waste'|'foundation', index: number, card: object }

    const suits = ['♠', '♥', '♣', '♦']
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
        return array
    }

    const initGame = () => {
        let newDeck = []
        suits.forEach(suit => {
            values.forEach((value, index) => {
                newDeck.push({ suit, value, index: index + 1, color: (suit === '♥' || suit === '♦') ? 'red' : 'black', faceUp: false })
            })
        })
        newDeck = shuffle(newDeck)

        const newTableau = []
        for (let i = 0; i < 7; i++) {
            const column = []
            for (let j = 0; j <= i; j++) {
                const card = newDeck.pop()
                if (j === i) card.faceUp = true
                column.push(card)
            }
            newTableau.push(column)
        }

        setStock(newDeck)
        setWaste([])
        setFoundation([[], [], [], []])
        setTableau(newTableau)
        setSelected(null)
    }

    useEffect(() => {
        initGame()
    }, [])

    const handleCardClick = (card, source, index, pileIndex) => {
        if (!card && source !== 'tableau' && source !== 'foundation') return
        if (card && !card.faceUp) {
            if (source === 'stock') {
                drawCard()
            }
            return
        }

        if (selected) {
            // Try to move selected card to this target
            if (isValidMove(selected.card, card, source)) {
                moveCard(selected, { source, index, pileIndex })
                setSelected(null)
            } else {
                // If clicking same card or invalid move, deselect or select new
                if (selected.card === card) {
                    setSelected(null)
                } else {
                    // Only select if it's a valid source (top of waste, or face up in tableau)
                    if (source === 'waste' || source === 'tableau' || source === 'foundation') {
                        setSelected({ card, source, index, pileIndex })
                    }
                }
            }
        } else {
            // Select card
            if (source === 'waste' || source === 'tableau' || source === 'foundation') {
                setSelected({ card, source, index, pileIndex })
            }
        }
    }

    const drawCard = () => {
        if (stock.length === 0) {
            setStock(waste.reverse().map(c => ({ ...c, faceUp: false })))
            setWaste([])
        } else {
            const card = stock.pop()
            card.faceUp = true
            setWaste([...waste, card])
            setStock([...stock])
        }
    }

    const isValidMove = (cardToMove, targetCard, targetSource) => {
        if (targetSource === 'foundation') {
            // Move to foundation
            if (!targetCard) {
                return cardToMove.value === 'A'
            }
            return cardToMove.suit === targetCard.suit && cardToMove.index === targetCard.index + 1
        } else if (targetSource === 'tableau') {
            // Move to tableau
            if (!targetCard) {
                return cardToMove.value === 'K'
            }
            return cardToMove.color !== targetCard.color && cardToMove.index === targetCard.index - 1
        }
        return false
    }

    const moveCard = (from, to) => {
        // Remove from source
        let card
        if (from.source === 'waste') {
            card = waste.pop()
            setWaste([...waste])
        } else if (from.source === 'tableau') {
            const column = tableau[from.pileIndex]
            card = column.pop()
            if (column.length > 0) column[column.length - 1].faceUp = true
            setTableau([...tableau])
        } else if (from.source === 'foundation') {
            card = foundation[from.pileIndex].pop()
            setFoundation([...foundation])
        }

        // Add to destination
        if (to.source === 'foundation') {
            foundation[to.pileIndex].push(card)
            setFoundation([...foundation])
        } else if (to.source === 'tableau') {
            tableau[to.pileIndex].push(card)
            setTableau([...tableau])
        }
    }

    const Card = ({ card, onClick, isSelected }) => (
        <div
            onClick={onClick}
            style={{
                width: '60px',
                height: '90px',
                backgroundColor: card && card.faceUp ? 'white' : '#0044aa', // Blue back
                border: '1px solid #ccc',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                color: card ? card.color : 'black',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected ? '0 0 10px yellow' : '0 2px 5px rgba(0,0,0,0.2)',
                userSelect: 'none'
            }}
        >
            {card && card.faceUp ? `${card.value}${card.suit}` : ''}
        </div>
    )

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#006400', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div onClick={drawCard} style={{ width: '60px', height: '90px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        {stock.length > 0 ? <div style={{ width: '100%', height: '100%', backgroundColor: '#0044aa', borderRadius: '5px' }}></div> : <div style={{ color: 'white', fontSize: '20px' }}>↺</div>}
                    </div>
                    <div style={{ width: '60px', height: '90px' }}>
                        {waste.length > 0 && (
                            <Card
                                card={waste[waste.length - 1]}
                                onClick={() => handleCardClick(waste[waste.length - 1], 'waste')}
                                isSelected={selected && selected.card === waste[waste.length - 1]}
                            />
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {foundation.map((pile, i) => (
                        <div key={i} style={{ width: '60px', height: '90px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px' }}>
                            {pile.length > 0 ? (
                                <Card
                                    card={pile[pile.length - 1]}
                                    onClick={() => handleCardClick(pile[pile.length - 1], 'foundation', pile.length - 1, i)}
                                    isSelected={selected && selected.card === pile[pile.length - 1]}
                                />
                            ) : (
                                <div onClick={() => handleCardClick(null, 'foundation', -1, i)} style={{ width: '100%', height: '100%', cursor: 'pointer' }}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {tableau.map((column, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '-60px' }}>
                        {column.length === 0 ? (
                            <div onClick={() => handleCardClick(null, 'tableau', -1, i)} style={{ width: '60px', height: '90px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px' }}></div>
                        ) : (
                            column.map((card, index) => (
                                <div key={index} style={{ marginBottom: '-65px' }}>
                                    <Card
                                        card={card}
                                        onClick={() => handleCardClick(card, 'tableau', index, i)}
                                        isSelected={selected && selected.card === card}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Solitaire
