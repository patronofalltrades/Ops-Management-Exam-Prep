# OM Exam Lab

Interactive study tool for the IESE MBA Operations Management final exam. Built with React + Vite.

**Live:** [opsmanagement.vercel.app](https://opsmanagement.vercel.app)

## Features

### Conceptual Discovery
- Collapsible concept cards covering Queueing Theory, Capacity Analysis, and Inventory Management
- Each card has: official explanation, "Dumb MBA Translation," and a practice problem with storyline
- Practice problems have progressive reveal: Story > Translation > Solution
- Interactive charts:
  - **Utilization Curve** -- visualize how Lq explodes as utilization approaches 100%
  - **EOQ Cost Curve** -- see ordering vs holding cost trade-offs with draggable Q slider
- Presets from actual exam problems (Medcorp, Pharmacy, IQ Inc, etc.)

### Formula Reference
- All exam formulas with KaTeX math rendering
- Each formula includes: Why use it / When to use / How to use
- Interactive calculators for Queueing, EOQ, Safety Stock, and Newsvendor
- z-value lookup table

### Flash Cards
- 40 scenario-based flashcards (not formula recitation)
- Spaced repetition with weighted algorithm (missed cards appear more often)
- Progress persists across sessions via localStorage
- All-time stats: total reviewed, mastered, struggling, sessions

### Exam Guide
- **OM Gym** -- 8 practice problems (Queueing + Inventory)
- **Past Exams** -- Full 2022, 2023, 2024 final exams with solutions
- Focus area picker (OM Gym vs Exams) to reduce overwhelm
- Each problem includes:
  - Original problem text (collapsible)
  - Problem context (collapsible, default open)
  - "How to approach" framework with interactive bullet points
  - Per-question step-by-step solutions with KaTeX math
  - Practice Mode: write your attempt, then see it side-by-side with the solution
  - 3-point key takeaways (Reminder, Tip, Exam pattern)

### AI Tutor
- Select any problem from the bank
- Write your solution attempt
- AI grades your work step-by-step against the correct solution
- Socratic follow-up questions to deepen understanding
- Multiple free LLM models via OpenRouter API
- Streaming responses with markdown formatting

## Tech Stack

- **React 19** + **Vite 8**
- **KaTeX** -- math rendering (direct API, not react-katex)
- **Chart.js** + **react-chartjs-2** -- interactive visualizations
- **OpenRouter API** -- AI Tutor LLM access
- **Vercel** -- deployment

## Setup

```bash
# Install dependencies
npm install

# Create .env file with your OpenRouter API key
echo "VITE_OPENROUTER_API_KEY=your-key-here" > .env

# Start dev server
npm run dev

# Production build
npm run build
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | For AI Tutor only | OpenRouter API key. Get one at [openrouter.ai](https://openrouter.ai). Free tier models available. |

For Vercel deployment, add this in **Settings > Environment Variables**.

## Project Structure

```
src/
  components/
    Math.jsx              # KaTeX rendering (renderWithMath)
    diagrams/
      UtilizationCurve.jsx  # Interactive queueing chart
      EOQCostCurve.jsx      # Interactive inventory chart
  data/
    concepts.js           # Conceptual Discovery content
    examGuide.js          # All exam/gym problems + solutions
    flashcards.js         # 40 scenario-based flashcards
    problems.js           # Problem bank data (used by AI Tutor)
  lib/
    ai.js                 # OpenRouter API helper with streaming
  pages/
    Concepts.jsx          # Conceptual Discovery tab
    ExamGuide.jsx         # Exam Guide tab
    FlashCards.jsx         # Flash Cards tab
    Formulas.jsx          # Formula Reference tab
    Tutor.jsx             # AI Tutor tab
  App.jsx                 # Tab navigation
  main.jsx                # Entry point
  index.css               # All styles (CSS variables, dark mode)
```

## Content Sources

- **OM Gym** -- Queueing and Inventory practice sets from IESE Operations Management I
- **Final Exam 2022** -- BIOTOPIN / NEWBIO supply chain case
- **Final Exam 2023** -- IQ Inc. after-sales service and ink logistics
- **Final Exam 2024** -- Medcorp spinal implants (sourcing, capacity, queueing, strategy)
- **Cheat Sheet** -- Official exam formula sheet

## Dark Mode

Toggle via the moon/sun button in the header. Preference saved to localStorage.

## License

Educational use only. Exam content belongs to IESE Business School.
