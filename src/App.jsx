import { useState, useCallback } from 'react'
import Concepts from './pages/Concepts'
import Formulas from './pages/Formulas'
import FlashCards from './pages/FlashCards'
import ExamGuide from './pages/ExamGuide'
import Tutor from './pages/Tutor'

const tabs = [
  { key: 'concepts', label: 'Concepts' },
  { key: 'formulas', label: 'Formulas' },
  { key: 'flashcards', label: 'Flash Cards' },
  { key: 'examguide', label: 'Exam Guide' },
  { key: 'tutor', label: 'AI Tutor' },
  { key: 'visualizer', label: 'Visualizer', soon: true },
]

const panels = { concepts: Concepts, formulas: Formulas, flashcards: FlashCards, examguide: ExamGuide, tutor: Tutor }

export default function App() {
  const [tab, setTab] = useState('concepts')
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const toggleTheme = useCallback(() => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('omt', next)
    setDark(!dark)
  }, [dark])

  const switchTab = useCallback((key) => {
    setTab(key)
    window.scrollTo({ top: 0 })
  }, [])

  const Panel = panels[tab]

  return (
    <>
      <header className="hdr">
        <div className="hdr-inner">
          <div className="hdr-logo">OM Exam Lab<span>IESE MBA 2027</span></div>
          <div className="hdr-right">
            <button className="hdr-btn" onClick={toggleTheme} title="Toggle dark mode" aria-label="Toggle dark mode">
              {dark ? '☀️' : '🌙'}
            </button>
            <a className="hdr-btn" href="/om-cheatsheet-2026.pdf" download="OM_Exam_Cheatsheet_2026.pdf" title="Download Cheatsheet" aria-label="Download Cheatsheet" style={{fontSize:'12px',textDecoration:'none'}}>⬇</a>
          </div>
        </div>
      </header>

      <nav className="tabs-bar">
        <div className="tabs-inner">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`tab-btn${tab === t.key ? ' active' : ''}${t.soon ? ' soon' : ''}`}
              onClick={() => !t.soon && switchTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="container animate-in" key={tab}>
        {Panel ? <Panel /> : (
          <div style={{ textAlign: 'center', paddingTop: 80 }}>
            <h1 className="h1">{tabs.find(t => t.key === tab)?.label}</h1>
            <p className="sub">Coming soon.</p>
          </div>
        )}
      </div>
    </>
  )
}
