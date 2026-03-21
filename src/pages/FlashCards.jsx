import { useState, useCallback, useRef } from 'react'
import { flashcards, catMeta } from '../data/flashcards'
import { renderWithMath } from '../components/Math'

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

function buildWeightedOrder(weights) {
  const total = weights.reduce((a, b) => a + b, 0)
  const out = []
  for (let i = 0; i < flashcards.length; i++) {
    const n = Math.max(1, Math.round(weights[i] / total * flashcards.length))
    for (let j = 0; j < n; j++) out.push(i)
  }
  return shuffle(out)
}

export default function FlashCards() {
  const [weights, setWeights] = useState(() => flashcards.map(() => 1))
  const [order, setOrder] = useState(() => buildWeightedOrder(flashcards.map(() => 1)))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState(0)
  const wRef = useRef(weights)

  const current = flashcards[order[idx % order.length]]
  const meta = catMeta[current.cat] || { label: 'General', color: '#666', bg: '#f5f5f5' }

  const flip = useCallback(() => setFlipped(true), [])

  const rate = useCallback((score) => {
    const ci = order[idx % order.length]
    const nw = [...wRef.current]
    if (score === 0) { nw[ci] = Math.min(5, nw[ci] + 1); setWrong(w => w + 1) }
    else if (score === 2) { nw[ci] = Math.max(0.2, nw[ci] * 0.5); setRight(r => r + 1) }
    wRef.current = nw
    setWeights(nw)

    const next = idx + 1
    if (next >= order.length) {
      setOrder(buildWeightedOrder(nw))
      setIdx(0)
    } else {
      setIdx(next)
    }
    setFlipped(false)
  }, [idx, order])

  const reset = useCallback(() => {
    const w = flashcards.map(() => 1)
    wRef.current = w
    setWeights(w)
    setOrder(buildWeightedOrder(w))
    setIdx(0); setFlipped(false); setRight(0); setWrong(0)
  }, [])

  return (
    <>
      <h1 className="h1">Flash Cards</h1>
      <p className="sub">Click card to flip. Rate your recall. Missed cards appear more often.</p>

      <div className="fc-container">
        <div className="fc-stats">
          Remaining: <strong>{Math.max(0, order.length - idx)}</strong>
          &nbsp;· Correct: <strong>{right}</strong>
          &nbsp;· Missed: <strong>{wrong}</strong>
          <button className="hdr-btn" onClick={reset} title="Reset" style={{ marginLeft: 'auto', fontSize: 12 }}>↺</button>
        </div>

        <div className="fc-card" onClick={!flipped ? flip : undefined}>
          <div className="fc-cat" style={{ background: meta.bg, color: meta.color }}>{meta.label}</div>
          {!flipped ? (
            <>
              <div className="fc-q">{renderWithMath(current.q)}</div>
              <div className="fc-hint">Click to reveal answer</div>
            </>
          ) : (
            <div className="fc-a">{renderWithMath(current.a)}</div>
          )}
        </div>

        {flipped && (
          <div className="fc-actions">
            <button className="fc-btn fc-btn-miss" onClick={() => rate(0)}>Missed</button>
            <button className="fc-btn fc-btn-skip" onClick={() => rate(1)}>Fuzzy</button>
            <button className="fc-btn fc-btn-know" onClick={() => rate(2)}>Got it</button>
          </div>
        )}
      </div>
    </>
  )
}
