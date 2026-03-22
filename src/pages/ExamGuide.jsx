import { useState, useCallback } from 'react'
import { examGuide } from '../data/examGuide'
import { renderWithMath } from '../components/Math'

const sections = [...new Set(examGuide.map(p => p.section))]
const groups = {
  gym: { label: 'OM Gym', desc: 'Practice problems from the Queueing and Inventory gyms', sections: sections.filter(s => s.startsWith('OM Gym')) },
  exams: { label: 'Past Exams', desc: 'Full final exams with step-by-step solutions (2022–2024)', sections: sections.filter(s => s.startsWith('Final Exam')) },
}

export default function ExamGuide() {
  const [activeGroup, setActiveGroup] = useState(null)

  if (!activeGroup) {
    return (
      <>
        <h1 className="h1">Exam Guide</h1>
        <p className="sub">Choose a focus area to get started.</p>
        <div className="eg-group-picker">
          {Object.entries(groups).map(([key, g]) => (
            <button key={key} className="eg-group-card" onClick={() => setActiveGroup(key)}>
              <span className="eg-group-icon">{key === 'gym' ? '🏋️' : '📝'}</span>
              <div>
                <h3>{g.label}</h3>
                <p>{g.desc}</p>
                <span className="eg-group-count">{g.sections.length} sets · {examGuide.filter(p => g.sections.includes(p.section)).length} problems</span>
              </div>
            </button>
          ))}
        </div>
      </>
    )
  }

  const group = groups[activeGroup]

  return (
    <>
      <div className="eg-top-bar">
        <button className="eg-back-btn" onClick={() => setActiveGroup(null)}>← Back</button>
        <h1 className="h1" style={{ marginBottom: 0 }}>{group.label}</h1>
      </div>
      <p className="sub">{group.desc}</p>
      {group.sections.map(sec => (
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
  const [practiceMode, setPracticeMode] = useState(false)
  const [attempts, setAttempts] = useState({})
  const [revealed, setRevealed] = useState({})
  const badgeClass = `badge badge-${problem.badgeType || 'queue'}`

  const toggle = useCallback(() => {
    setOpen(o => !o)
    if (open) {
      setShowExcerpt(false)
      setShowStoryline(true)
      setShowFramework(true)
      setOpenQuestions({})
      setPracticeMode(false)
      setAttempts({})
      setRevealed({})
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
              <div className="eg-questions-actions">
                <button
                  className={`eg-practice-toggle${practiceMode ? ' eg-practice-active' : ''}`}
                  onClick={() => setPracticeMode(p => !p)}
                >
                  {practiceMode ? '✎ Practice ON' : '✎ Practice'}
                </button>
                <button className="eg-reveal-all-btn" onClick={openAllQuestions}>
                  Reveal All
                </button>
              </div>
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
                    {/* Practice mode: textarea before solution */}
                    {practiceMode && !revealed[qi] && (
                      <div className="eg-practice-area">
                        <span className="eg-label">Your attempt</span>
                        <textarea
                          className="eg-practice-textarea"
                          placeholder="Write your solution here before revealing the answer..."
                          value={attempts[qi] || ''}
                          onChange={e => setAttempts(a => ({ ...a, [qi]: e.target.value }))}
                          rows={5}
                        />
                        <button
                          className="eg-practice-reveal-btn"
                          onClick={() => setRevealed(r => ({ ...r, [qi]: true }))}
                          disabled={!(attempts[qi] || '').trim()}
                        >
                          Check Answer
                        </button>
                      </div>
                    )}

                    {/* Show solution: side-by-side if practice mode + revealed */}
                    {(!practiceMode || revealed[qi]) && (
                      <div className={revealed[qi] && attempts[qi] ? 'eg-sidebyside' : ''}>
                        {revealed[qi] && attempts[qi] && (
                          <div className="eg-attempt-panel">
                            <span className="eg-label">Your attempt</span>
                            <div className="eg-attempt-content">{attempts[qi]}</div>
                          </div>
                        )}
                        <div className={revealed[qi] && attempts[qi] ? 'eg-solution-panel' : ''}>
                          {revealed[qi] && attempts[qi] && <span className="eg-label">Solution</span>}
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
                      </div>
                    )}
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
