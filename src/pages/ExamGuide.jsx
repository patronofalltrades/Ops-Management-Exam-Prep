import { useState, useCallback } from 'react'
import { examGuide } from '../data/examGuide'
import { renderWithMath } from '../components/Math'

const sections = [...new Set(examGuide.map(p => p.section))]

export default function ExamGuide() {
  return (
    <>
      <h1 className="h1">Exam Guide</h1>
      <p className="sub">Step-by-step deconstruction of every OM Gym and Final Exam problem. Understand the approach, not just the answer.</p>
      {sections.map(sec => (
        <div key={sec}>
          <h2 className="h2">{sec}</h2>
          {examGuide.filter(p => p.section === sec).map(p => (
            <GuideCard key={p.id} problem={p} />
          ))}
        </div>
      ))}
    </>
  )
}

function FrameworkPoint({ text }) {
  const [expanded, setExpanded] = useState(false)
  // Split on first colon+space after bold label to get title vs detail
  const match = text.match(/^\*\*([^*]+)\*\*\s*(.*)$/s)
  const label = match ? match[1] : null
  const detail = match ? match[2] : text

  if (!label) {
    // No bold label — render as plain text
    return <li className="eg-fw-point eg-math-text">{renderWithMath(text)}</li>
  }

  return (
    <li className={`eg-fw-point${expanded ? ' eg-fw-expanded' : ''}`}>
      <button className="eg-fw-point-toggle" onClick={() => setExpanded(e => !e)}>
        <span className="eg-fw-chevron">{expanded ? '▾' : '▸'}</span>
        <span className="eg-fw-label">{label}</span>
        {!expanded && <span className="eg-fw-preview">{detail.replace(/\$[^$]*\$/g, '…').substring(0, 60)}{detail.length > 60 ? '…' : ''}</span>}
      </button>
      {expanded && (
        <div className="eg-fw-detail eg-math-text">
          {renderWithMath(detail)}
        </div>
      )}
    </li>
  )
}

function GuideCard({ problem }) {
  const [open, setOpen] = useState(false)
  const [showExcerpt, setShowExcerpt] = useState(false)
  const [showStoryline, setShowStoryline] = useState(true)
  const [showFramework, setShowFramework] = useState(true)
  const [openQuestions, setOpenQuestions] = useState({})
  const badgeClass = `badge badge-${problem.badgeType || 'queue'}`

  const toggle = useCallback(() => {
    setOpen(o => !o)
    if (open) {
      setShowExcerpt(false)
      setShowStoryline(true)
      setShowFramework(true)
      setOpenQuestions({})
    }
  }, [open])

  const toggleQuestion = useCallback((idx) => {
    setOpenQuestions(prev => ({ ...prev, [idx]: !prev[idx] }))
  }, [])

  const openAllQuestions = useCallback(() => {
    const all = {}
    problem.questionSteps.forEach((_, i) => { all[i] = true })
    setOpenQuestions(all)
  }, [problem.questionSteps])

  return (
    <div className={`prob${open ? ' open' : ''}`}>
      <div className="ph" onClick={toggle}>
        <h4>{problem.title}</h4>
        <span className={badgeClass}>{problem.badge}</span>
        <span className="chevron">▸</span>
      </div>
      {open && (
        <div className="pb eg-content" onClick={e => e.stopPropagation()}>
          {/* Original Excerpt (collapsible, default closed) */}
          {problem.originalExcerpt && (
            <div className="eg-excerpt-wrap">
              <button
                className="eg-excerpt-toggle"
                onClick={() => setShowExcerpt(s => !s)}
              >
                <span className="eg-excerpt-icon">{showExcerpt ? '▾' : '▸'}</span>
                Original Problem Text
              </button>
              {showExcerpt && (
                <div className="eg-excerpt">
                  <p>{problem.originalExcerpt}</p>
                </div>
              )}
            </div>
          )}

          {/* Problem Context (collapsible, default open) */}
          <div className="eg-excerpt-wrap">
            <button
              className={`eg-excerpt-toggle eg-storyline-toggle${showStoryline ? ' eg-toggle-active' : ''}`}
              onClick={() => setShowStoryline(s => !s)}
            >
              <span className="eg-excerpt-icon">{showStoryline ? '▾' : '▸'}</span>
              Problem Context
            </button>
            {showStoryline && (
              <div className="eg-storyline-content">
                <div className="eg-math-text">{renderWithMath(problem.storyline)}</div>
              </div>
            )}
          </div>

          {/* Framework / How to Approach */}
          {problem.framework && (
            <div className="eg-framework-wrap">
              <button
                className={`eg-excerpt-toggle eg-framework-toggle${showFramework ? ' eg-toggle-active' : ''}`}
                onClick={() => setShowFramework(s => !s)}
              >
                <span className="eg-excerpt-icon">{showFramework ? '▾' : '▸'}</span>
                {problem.framework.title}
              </button>
              {showFramework && (
                <div className="eg-framework-content">
                  <ul className="eg-framework-list">
                    {problem.framework.points.map((pt, i) => (
                      <FrameworkPoint key={i} text={pt} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Questions with nested solutions */}
          <div className="eg-questions-section">
            <div className="eg-questions-header">
              <span className="eg-label">Questions & Solutions</span>
              <button className="eg-reveal-all-btn" onClick={openAllQuestions}>
                Reveal All
              </button>
            </div>

            {problem.questionSteps.map((qs, qi) => (
              <div key={qi} className="eg-question-block">
                <button
                  className={`eg-question-toggle${openQuestions[qi] ? ' eg-q-open' : ''}`}
                  onClick={() => toggleQuestion(qi)}
                >
                  <span className="eg-q-num">Q{qi + 1}</span>
                  <span className="eg-q-text">{qs.question}</span>
                  <span className="eg-q-chevron">{openQuestions[qi] ? '▾' : '▸'}</span>
                </button>

                {openQuestions[qi] && (
                  <div className="eg-question-solution">
                    {qs.steps.map((step, si) => (
                      <div key={si} className="eg-sol-step">
                        <div className="eg-sol-step-header">
                          <span className="eg-sol-step-num">{si + 1}</span>
                          <div className="eg-sol-insight">
                            <div className="eg-math-text">{renderWithMath(step.insight)}</div>
                          </div>
                        </div>

                        {step.work && (
                          <div className="eg-sol-work">
                            <span className="eg-label">Work</span>
                            <div className="eg-sol-work-content eg-math-text">
                              {renderWithMath(step.work)}
                            </div>
                          </div>
                        )}

                        {step.result && (
                          <div className="eg-sol-result">
                            <div className="eg-math-text">{renderWithMath(step.result)}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          {problem.takeaway && (
            <div className="eg-takeaway">
              <span className="eg-takeaway-icon">★</span>
              <div style={{ flex: 1 }}>
                <span className="eg-label">Key Takeaways</span>
                {Array.isArray(problem.takeaway) ? (
                  <ul className="eg-takeaway-list">
                    {problem.takeaway.map((t, i) => (
                      <li key={i} className="eg-math-text">{renderWithMath(t)}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="eg-math-text">{renderWithMath(problem.takeaway)}</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
