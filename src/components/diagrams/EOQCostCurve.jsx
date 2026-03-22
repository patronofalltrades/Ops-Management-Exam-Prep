import { useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

// Register annotation if available, otherwise skip
try { ChartJS.register(annotationPlugin) } catch {}
ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Legend, Filler)

const PRESETS = [
  { label: 'Custom', D: 3000, S: 100, v: 50, i: 0.3 },
  { label: 'Big Headache — Subcontract', D: 3000, S: 1000, v: 50, i: 0.3 },
  { label: 'Big Headache — Prepackaged', D: 3000, S: 10, v: 60, i: 0.3 },
  { label: 'Medcorp US Screws', D: 36500, S: 100, v: 500, i: 0.1 },
  { label: 'Medcorp Portugal Screws', D: 36500, S: 150, v: 300, i: 0.1 },
  { label: 'Frozen Delights', D: 29200, S: 200, v: 10, i: 0.15 },
  { label: 'Emmental Cheese', D: 365, S: 3, v: 5, i: 0.2 },
]

export default function EOQCostCurve() {
  const [D, setD] = useState(3000)
  const [S, setS] = useState(100)
  const [v, setV] = useState(50)
  const [i, setI] = useState(0.3)
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
  const eoq = Math.sqrt((2 * D * S) / h)
  const maxQ = Math.min(Math.max(Math.round(eoq * 3), 500), 5000)

  const curveData = useMemo(() => {
    const ordering = [], holding = [], total = []
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

  const currentOC = (D / Q) * S
  const currentHC = (Q / 2) * h
  const currentTC = currentOC + currentHC
  const eoqTC = Math.sqrt(2 * D * S * v * i)

  const style = getComputedStyle(document.documentElement)
  const acColor = style.getPropertyValue('--ac').trim() || '#B33D0B'
  const blueColor = style.getPropertyValue('--blue').trim() || '#1D4ED8'
  const greenColor = style.getPropertyValue('--green').trim() || '#047857'
  const txColor = style.getPropertyValue('--tx2').trim() || '#52524E'
  const bdColor = style.getPropertyValue('--bd').trim() || '#E4E3DE'

  const data = {
    datasets: [
      {
        label: 'Ordering Cost',
        data: curveData.ordering,
        borderColor: acColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: 'Holding Cost',
        data: curveData.holding,
        borderColor: blueColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: 'Total Cost',
        data: curveData.total,
        borderColor: greenColor,
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: 'Your Q',
        data: [{ x: Q, y: 0 }, { x: Q, y: currentTC * 1.1 }],
        borderColor: txColor,
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: [0, 0],
      },
      {
        label: 'EOQ',
        data: [{ x: Math.round(eoq), y: 0 }, { x: Math.round(eoq), y: eoqTC * 1.1 }],
        borderColor: greenColor,
        borderWidth: 2,
        borderDash: [3, 3],
        pointRadius: [0, 4],
        pointBackgroundColor: greenColor,
      },
    ],
  }

  const yMax = Math.max(currentTC * 1.5, eoqTC * 3, 1000)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    parsing: false,
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: maxQ,
        title: { display: true, text: 'Order Quantity (Q)', color: txColor },
        ticks: { color: txColor },
        grid: { color: bdColor + '60' },
      },
      y: {
        min: 0,
        max: yMax,
        title: { display: true, text: 'Annual Cost', color: txColor },
        ticks: { color: txColor },
        grid: { color: bdColor + '60' },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: txColor, usePointStyle: true, pointStyle: 'line', font: { size: 11 } },
      },
      tooltip: { enabled: true },
    },
  }

  return (
    <div className="diagram-card">
      <h4 className="diagram-title">EOQ Cost Curves</h4>
      <p className="diagram-desc">See how ordering and holding costs trade off. The total cost curve is flat around EOQ.</p>

      <div className="diagram-controls">
        <label className="diagram-label">
          Preset
          <select value={preset} onChange={e => applyPreset(+e.target.value)}>
            {PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
          </select>
        </label>
        <label className="diagram-label">
          D (demand/yr)
          <input type="number" value={D} onChange={e => { setD(+e.target.value); setPreset(0) }} />
        </label>
        <label className="diagram-label">
          S (order cost)
          <input type="number" value={S} onChange={e => { setS(+e.target.value); setPreset(0) }} />
        </label>
        <label className="diagram-label">
          v (unit price)
          <input type="number" value={v} onChange={e => { setV(+e.target.value); setPreset(0) }} />
        </label>
        <label className="diagram-label">
          i (hold rate)
          <input type="number" value={i} step={0.01} onChange={e => { setI(+e.target.value); setPreset(0) }} />
        </label>
      </div>

      <div className="diagram-slider-row">
        <span className="diagram-slider-label">Q = {Q} (EOQ = {Math.round(eoq)})</span>
        <input type="range" min={1} max={maxQ} value={Q} onChange={e => setQ(+e.target.value)} className="diagram-slider" />
      </div>

      <div className="diagram-chart-wrap">
        <Line data={data} options={options} />
      </div>

      <div className="diagram-readout">
        <div><strong>Q</strong> = {Q}</div>
        <div><strong>EOQ</strong> = {Math.round(eoq)}</div>
        <div><strong>Ordering</strong> = {currentOC.toFixed(0)}</div>
        <div><strong>Holding</strong> = {currentHC.toFixed(0)}</div>
        <div><strong>Total</strong> = {currentTC.toFixed(0)}</div>
      </div>
    </div>
  )
}
