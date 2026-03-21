import { useState, useRef, useCallback, useMemo } from 'react'
import { problems } from '../data/problems'
import { askTutor, MODELS } from '../lib/ai'

function formatMarkdown(text) {
  if (!text) return null
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const html = escaped
    // headings
    .replace(/^### (.+)$/gm, '<h5 class="tutor-md-h3">$1</h5>')
    .replace(/^## (.+)$/gm, '<h4 class="tutor-md-h2">$1</h4>')
    .replace(/^# (.+)$/gm, '<h3 class="tutor-md-h1">$1</h3>')
    // bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // horizontal rule
    .replace(/^---$/gm, '<hr class="tutor-md-hr"/>')
    // bullet lists
    .replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>')
    // numbered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="tutor-md-list">$1</ul>')
    // paragraphs (double newline)
    .replace(/\n\n/g, '</p><p>')
    // single newlines
    .replace(/\n/g, '<br/>')

  return <div className="tutor-md" dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />
}

const SYSTEM_PROMPT_TEMPLATE = (problem) => `You are an Operations Management tutor at IESE Business School. You are helping an MBA student practice for their final exam.

The student is solving this problem:
Title: ${problem.title}
Category: ${problem.badge}
Problem: ${problem.prompt}
${problem.questions ? '\nQuestions:\n' + problem.questions.map((q, i) => `${i + 1}. ${q}`).join('\n') : ''}

The correct solution is:
${problem.solution}

Your job:
1. Grade their answer step by step against the correct solution.
2. Identify EXACTLY where they went wrong (wrong formula, wrong inputs, arithmetic error, missing step, etc.).
3. Use the exact formulas from the OM course (EOQ, Lq, SS, ROP, etc.).
4. Be Socratic — after your feedback, ask ONE follow-up question to deepen their understanding.
5. Be encouraging but precise. Do not give away the full answer — guide them to find it.
6. Use plain text with line breaks for readability. Use * for emphasis.`

export default function Tutor() {
  const [selectedProblem, setSelectedProblem] = useState('')
  const [model, setModel] = useState(MODELS[0].id)
  const [attempt, setAttempt] = useState('')
  const [chat, setChat] = useState([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const [followUp, setFollowUp] = useState('')
  const chatEndRef = useRef(null)
  const abortRef = useRef(false)

  const problem = problems.find(p => p.id === selectedProblem)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  const handleCheck = useCallback(async () => {
    if (!problem || !attempt.trim() || streaming) return
    setError(null)
    setStreaming(true)
    abortRef.current = false

    const userMsg = `Here is my solution attempt:\n\n${attempt.trim()}`
    const newChat = [{ role: 'user', content: userMsg }]
    setChat(newChat)
    scrollToBottom()

    try {
      const messages = [{ role: 'user', content: userMsg }]
      const assistantMsg = { role: 'assistant', content: '' }
      setChat([...newChat, assistantMsg])

      await askTutor(
        SYSTEM_PROMPT_TEMPLATE(problem),
        messages,
        model,
        (partial) => {
          if (abortRef.current) return
          setChat([...newChat, { role: 'assistant', content: partial }])
          scrollToBottom()
        }
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setStreaming(false)
    }
  }, [problem, attempt, model, streaming, scrollToBottom])

  const handleFollowUp = useCallback(async () => {
    if (!problem || !followUp.trim() || streaming) return
    setError(null)
    setStreaming(true)
    abortRef.current = false

    const userMsg = { role: 'user', content: followUp.trim() }
    const updatedChat = [...chat, userMsg]
    setChat(updatedChat)
    setFollowUp('')
    scrollToBottom()

    try {
      const messages = updatedChat.map(m => ({ role: m.role, content: m.content }))
      const assistantMsg = { role: 'assistant', content: '' }
      setChat([...updatedChat, assistantMsg])

      await askTutor(
        SYSTEM_PROMPT_TEMPLATE(problem),
        messages,
        model,
        (partial) => {
          if (abortRef.current) return
          setChat([...updatedChat, { role: 'assistant', content: partial }])
          scrollToBottom()
        }
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setStreaming(false)
    }
  }, [problem, followUp, chat, model, streaming, scrollToBottom])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleFollowUp()
    }
  }, [handleFollowUp])

  const handleReset = useCallback(() => {
    abortRef.current = true
    setChat([])
    setAttempt('')
    setFollowUp('')
    setError(null)
    setStreaming(false)
  }, [])

  return (
    <>
      <h1 className="h1">AI Tutor</h1>
      <p className="sub">Select a problem, write your solution attempt, and get step-by-step feedback from an AI tutor.</p>

      {/* Controls */}
      <div className="tutor-controls">
        <div className="tutor-row">
          <label className="tutor-label">
            Problem
            <select
              className="tutor-select"
              value={selectedProblem}
              onChange={e => { setSelectedProblem(e.target.value); handleReset() }}
            >
              <option value="">-- Select a problem --</option>
              {problems.map(p => (
                <option key={p.id} value={p.id}>{p.section} — {p.title}</option>
              ))}
            </select>
          </label>

          <label className="tutor-label tutor-model-label">
            Model
            <select
              className="tutor-select tutor-model-select"
              value={model}
              onChange={e => setModel(e.target.value)}
            >
              {MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Problem preview */}
      {problem && (
        <div className="tutor-problem">
          <div className="tutor-problem-header">
            <h4>{problem.title}</h4>
            <span className={`badge badge-${problem.badgeType || 'queue'}`}>{problem.badge}</span>
          </div>
          <p className="tutor-prompt">{problem.prompt}</p>
          {problem.questions && (
            <div className="tutor-questions">
              {problem.questions.map((q, i) => (
                <p key={i}><strong>Q{i + 1}:</strong> {q}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solution attempt */}
      {problem && (
        <div className="tutor-attempt">
          <label className="tutor-label">
            Your Solution Attempt
            <textarea
              className="tutor-textarea"
              value={attempt}
              onChange={e => setAttempt(e.target.value)}
              placeholder="Write your solution here... Show your work step by step."
              rows={8}
              disabled={streaming}
            />
          </label>
          <div className="tutor-attempt-actions">
            <button
              className="tutor-btn tutor-btn-primary"
              onClick={handleCheck}
              disabled={!attempt.trim() || streaming}
            >
              {streaming && chat.length <= 2 ? 'Checking...' : 'Check My Work'}
            </button>
            {chat.length > 0 && (
              <button className="tutor-btn tutor-btn-reset" onClick={handleReset}>
                Start Over
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="tutor-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Chat */}
      {chat.length > 0 && (
        <div className="tutor-chat">
          {chat.map((msg, i) => (
            <div key={i} className={`tutor-msg tutor-msg-${msg.role}`}>
              <span className="tutor-msg-role">{msg.role === 'user' ? 'You' : 'Tutor'}</span>
              <div className="tutor-msg-content">
                {msg.role === 'assistant'
                  ? (msg.content ? formatMarkdown(msg.content) : (streaming && i === chat.length - 1 ? '...' : ''))
                  : (msg.content || '')}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Follow-up input */}
      {chat.length >= 2 && !streaming && (
        <div className="tutor-followup">
          <input
            className="tutor-followup-input"
            type="text"
            value={followUp}
            onChange={e => setFollowUp(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
          />
          <button
            className="tutor-btn tutor-btn-primary"
            onClick={handleFollowUp}
            disabled={!followUp.trim()}
          >
            Send
          </button>
        </div>
      )}
      {chat.length >= 2 && streaming && (
        <div className="tutor-followup">
          <input className="tutor-followup-input" disabled placeholder="Waiting for response..." />
        </div>
      )}
    </>
  )
}
