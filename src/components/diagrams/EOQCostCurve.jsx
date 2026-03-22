import { useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

try { ChartJS.register(annotationPlugin) } catch {}
ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Legend, Filler)

const PRESETS = [
  { label: 'Custom', D: 3000, S: 100, v: 50, i: 0.3, desc: 'Set your own parameters.' },
  { label: 'Big Headache — Subcontract', D: 3000, S: 1000, v: 50, i: 0.3, desc: 'OM Gym. Drug store subcontracts aspirin bottling. High ordering cost (1,000/order) but low unit price (50/carton). EOQ = 632 cartons, ordered every ~77 days. Large infrequent orders.' },
  { label: 'Big Headache — Prepackaged', D: 3000, S: 10, v: 60, i: 0.3, desc: 'OM Gym. Same store buys prepackaged aspirin. Low ordering cost (10/order) but higher unit price (60/carton). EOQ = 58 cartons, ordered every ~7 days. Frequent small orders.' },
  { label: 'Medcorp US Screws', D: 36500, S: 100, v: 500, i: 0.1, desc: '2024 Exam. Titanium screws from US headquarters. High unit cost (500/box), moderate ordering cost (100/order for customs). EOQ = 382 boxes. The flat curve means even suboptimal Q barely affects cost — but the unit price dominates total cost.' },
  { label: 'Medcorp Portugal Screws', D: 36500, S: 150, v: 300, i: 0.1, desc: '2024 Exam. Same screws from Portuguese supplier. Lower unit cost (300/box) saves 7.3M/yr in purchasing alone, dwarfing any EOQ differences. EOQ = 604 boxes.' },
  { label: 'Frozen Delights', D: 29200, S: 200, v: 10, i: 0.15, desc: 'OM Gym. Ice cream manufacturer. Current batch (800 L) is far below EOQ (2,790 L). Switching to EOQ saves 3,714/yr in ordering + holding costs. Notice how flat the curve is around the optimum.' },
  { label: 'Emmental Cheese', D: 365, S: 3, v: 5, i: 0.2, desc: 'OM Gym. Small cheese store. EOQ = 47 kg but impractical (100 types \u00D7 47 kg = 2.4 tons of cheese!). Current Q = 10 kg has ordering cost 18\u00D7 higher than holding — way too small. Real-world constraints override the formula.' },
]

function useNumInput(init) {
  const [raw, setRaw] = useState(String(init))
  const num = parseFloat(raw) || 0
  const set = (val) => setRaw(String(val))
  const bind = { value: raw, onChange: (e) => setRaw(e.target.value) }
  return [num, bind, set]
}

export default function EOQCostCurve() {
  const [open, setOpen] = useState(false)
  const [D, dBind, setD] = useNumInput(3000)
  const [S, sBind, setS] = useNumInput(100)
  const [v, vBind, setV] = useNumInput(50)
  const [i, iBind, setI] = useNumInput(0.3)
  const [Q, setQ] = useState(200)
  const [preset, setPreset] = useState(0)

  const applyPreset = (idx) => {
    setPreset(idx)
    const p = PRESETS[idx]
    setD(p.D); setS(p.S); setV(p.v); setI(p.i)
    const eoq = Math.round(Math.sqrt((2 * p.D * p.S) / (p.v * p.i)))
    setQ(Math.min(eoq, 2000))
  }

  const h = v * i
  const eoq = h > 0 ? Math.sqrt((2 * D * S) / h) : 0
  const maxQ = Math.min(Math.max(Math.round(eoq * 3), 500), 5000)

  const curveData = useMemo(() => {
    const ordering = [], holding = [], total = []
    if (h <= 0 || D <= 0 || S <= 0) return { ordering, holding, total }
    const step = Math.max(1, Math.round(maxQ / 200))
    for (let q = step; q <= maxQ; q += step) {
      const oc = (D / q) * S
      const hc = (q / 2) * h
      ordering.push({ x: q, y: oc })
      holding.push({ x: q, y: hc })
      total.push({ x: q, y: oc + hc })
    }
    return { ordering, holding, total }
  }, [D, S, h, maxQ])

  const currentOC = Q > 0 ? (D / Q) * S : 0
  const currentHC = (Q / 2) * h
  const currentTC = currentOC + currentHC
  const eoqTC = Math.sqrt(2 * D * S * v * i) || 0

  const style = getComputedStyle(document.documentElement)
  const acColor = style.getPropertyValue('--ac').trim() || '#B33D0B'
  const blueColor = style.getPropertyValue('--blue').trim() || '#1D4ED8'
  const greenColor = style.getPropertyValue('--green').trim() || '#047857'
  const txColor = style.getPropertyValue('--tx2').trim() || '#52524E'
  const bdColor = style.getPropertyValue('--bd').trim() || '#E4E3DE'

  const data = {
    datasets: [
      { label: 'Ordering Cost', data: curveData.ordering, borderColor: acColor, borderWidth: 2, pointRadius: 0, tension: 0.3 },
      { label: 'Holding Cost', data: curveData.holding, borderColor: blueColor, borderWidth: 2, pointRadius: 0, tension: 0.3 },
      { label: 'Total Cost', data: curveData.total, borderColor: greenColor, borderWidth: 3, pointRadius: 0, tension: 0.3 },
      { label: 'Your Q', data: [{ x: Q, y: 0 }, { x: Q, y: currentTC * 1.1 }], borderColor: txColor, borderWidth: 2, borderDash: [6, 4], pointRadius: [0, 0] },
      { label: 'EOQ', data: [{ x: Math.round(eoq), y: 0 }, { x: Math.round(eoq), y: eoqTC * 1.1 }], borderColor: greenColor, borderWidth: 2, borderDash: [3, 3], pointRadius: [0, 4], pointBackgroundColor: greenColor },
    ],
  }

  const yMax = Math.max(currentTC * 1.5, eoqTC * 3, 1000)

  const options = {
    responsive: true, maintainAspectRatio: false, parsing: false,
    scales: {
      x: { type: 'linear', min: 0, max: maxQ, title: { display: true, text: 'Order Quantity (Q)', color: txColor, font: { family: 'system-ui' } }, ticks: { color: txColor }, grid: { color: bdColor + '60' } },
      y: { min: 0, max: yMax, title: { display: true, text: 'Annual Cost', color: txColor, font: { family: 'system-ui' } }, ticks: { color: txColor }, grid: { color: bdColor + '60' } },
    },
    plugins: {
      legend: { display: true, position: 'bottom', labels: { color: txColor, usePointStyle: true, pointStyle: 'line', font: { size: 11, family: 'system-ui' } } },
      tooltip: { enabled: true },
    },
  }

  return (
    <div className="diagram-card">
      <button className="diagram-header" onClick={() => setOpen(o => !o)}>
        <span className="diagram-chevron">{open ? '▾' : '▸'}</span>
        <div>
          <h4 className="diagram-title">EOQ Cost Curves</h4>
          <p className="diagram-desc">See how ordering and holding costs trade off. The total cost curve is flat around EOQ.</p>
        </div>
      </button>

      {open && (
        <div className="diagram-body">
          <div className="diagram-controls">
            <label className="diagram-label">
              Preset
              <select value={preset} onChange={e => applyPreset(+e.target.value)}>
                {PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
              </select>
            </label>
            <label className="diagram-label">D (demand/yr)<input type="number" {...dBind} onFocus={e => e.target.select()} onChange={e => { dBind.onChange(e); setPreset(0) }} /></label>
            <label className="diagram-label">S (order cost)<input type="number" {...sBind} onFocus={e => e.target.select()} onChange={e => { sBind.onChange(e); setPreset(0) }} /></label>
            <label className="diagram-label">v (unit price)<input type="number" {...vBind} onFocus={e => e.target.select()} onChange={e => { vBind.onChange(e); setPreset(0) }} /></label>
            <label className="diagram-label">i (hold rate)<input type="number" step={0.01} {...iBind} onFocus={e => e.target.select()} onChange={e => { iBind.onChange(e); setPreset(0) }} /></label>
          </div>

          {PRESETS[preset].desc && preset > 0 && (
            <div className="diagram-preset-desc">{PRESETS[preset].desc}</div>
          )}

          <div className="diagram-slider-row">
            <span className="diagram-slider-label">Q = {Q} (EOQ = {Math.round(eoq)})</span>
            <input type="range" min={1} max={maxQ} value={Q} onChange={e => setQ(+e.target.value)} className="diagram-slider" />
          </div>

          <div className="diagram-chart-wrap"><Line data={data} options={options} /></div>

          <div className="diagram-readout">
            <div><strong>Q</strong> = {Q}</div>
            <div><strong>EOQ</strong> = {Math.round(eoq)}</div>
            <div><strong>Ordering</strong> = {currentOC.toFixed(0)}</div>
            <div><strong>Holding</strong> = {currentHC.toFixed(0)}</div>
            <div><strong>Total</strong> = {currentTC.toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
