const API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const MODELS = [
  { id: 'stepfun/step-3.5-flash:free', label: 'Step 3.5 Flash' },
  { id: 'arcee-ai/trinity-large-preview:free', label: 'Arcee Trinity Large' },
  { id: 'liquid/lfm-2.5-1.2b-instruct:free', label: 'Liquid LFM 2.5' },
]

export async function askTutor(systemPrompt, messages, model = MODELS[0].id, onChunk) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) throw new Error('Missing VITE_OPENROUTER_API_KEY in .env')

  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    stream: true,
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`API error ${res.status}: ${err}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue
      const data = trimmed.slice(6)
      if (data === '[DONE]') break

      try {
        const parsed = JSON.parse(data)
        const token = parsed.choices?.[0]?.delta?.content
        if (token) {
          full += token
          onChunk?.(full)
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  return full
}
