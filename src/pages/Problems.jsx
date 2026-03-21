import { useState, useCallback } from 'react'
import { problems } from '../data/problems'
import { renderWithMath } from '../components/Math'

const sections = [...new Set(problems.map(p => p.section))]

export default function Problems() {
  return (
    <>
      <h1 className="h1">Problem Bank</h1>
      <p className="sub">12 problems from the OM Gym and 2024 final exam. Click to expand, toggle solutions.</p>
      {sections.map(sec => (
        <div key={sec}>
          <h2 className="h2">{sec}</h2>
          {problems.filter(p => p.section === sec).map(p => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      ))}
    </>
  )
}

function ProblemCard({ problem }) {
  const [open, setOpen] = useState(false)
  const [showSol, setShowSol] = useState(false)
  const badgeClass = `badge badge-${problem.badgeType || 'queue'}`

  const toggle = useCallback(() => {
    setOpen(o => !o)
    if (open) setShowSol(false)
  }, [open])

  return (
    <div className={`prob${open ? ' open' : ''}`}>
      <div className="ph" onClick={toggle}>
        <h4>{problem.title}</h4>
        <span className={badgeClass}>{problem.badge}</span>
        <span className="chevron">▸</span>
      </div>
      {open && (
        <div className="pb" onClick={e => e.stopPropagation()}>
          <p style={{ whiteSpace: 'pre-wrap' }}>{renderWithMath(problem.prompt)}</p>
          {problem.questions && (
            <div style={{ margin: '8px 0' }}>
              {problem.questions.map((q, i) => (
                <p key={i}><strong>Q{i + 1}:</strong> {q}</p>
              ))}
            </div>
          )}
          <button
            className="sol-t"
            onClick={(e) => { e.stopPropagation(); setShowSol(s => !s) }}
          >
            {showSol ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSol && <div className="pd">{renderWithMath(problem.solution)}</div>}
        </div>
      )}
    </div>
  )
}
