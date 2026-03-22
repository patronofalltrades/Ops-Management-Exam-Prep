import { useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler)

const PRESETS = [
  { label: 'Custom', S: 1, CA: 1, CS: 1, mu: 10 },
  { label: 'Medcorp Call Center (S=4, CS=0.25)', S: 4, CA: 1, CS: 0.25, mu: 3 },
  { label: 'Pharmacy (S=5, CS=1)', S: 5, CA: 1, CS: 1, mu: 2.4 },
  { label: 'Express Checkout (S=1, CS=0.2)', S: 1, CA: 1, CS: 0.2, mu: 12 },
  { label: 'IQ After-Sales (S=4, CS=0.25)', S: 4, CA: 1, CS: 0.25, mu: 1 },
  { label: 'IQ Pooled Europe (S=40, CS=0.25)', S: 40, CA: 1, CS: 0.25, mu: 1 },
]

function computeLq(rho, S, CA, CS) {
  if (rho >= 1 || rho <= 0) return 0
  const exp = Math.sqrt(2 * (S + 1))
  return (Math.pow(rho, exp) / (1 - rho)) * ((CA * CA + CS * CS) / 2)
}

export default function UtilizationCurve() {
  const [open, setOpen] = useState(false)
  const [S, setS] = useState(1)
  const [CA, setCA] = useState(1)
  const [CS, setCS] = useState(1)
  const [rhoSlider, setRhoSlider] = useState(75)
  const [mu, setMu] = useState(10)
  const [preset, setPreset] = useState(0)

  const applyPreset = (idx) => {
    setPreset(idx)
    const p = PRESETS[idx]
    setS(p.S); setCA(p.CA); setCS(p.CS); setMu(p.mu)
  }

  const rho = rhoSlider / 100
  const lambda = rho * S * mu

  const curveData = useMemo(() => {
    const points = []
    for (let r = 1; r <= 99; r++) {
      points.push({ x: r, y: Math.min(computeLq(r / 100, S, CA, CS), 50) })
    }
    return points
  }, [S, CA, CS])

  const currentLq = computeLq(rho, S, CA, CS)
  const currentWq = lambda > 0 ? (currentLq / lambda) * 60 : 0
  const currentW = currentWq + (mu > 0 ? 60 / mu : 0)

  const style = getComputedStyle(document.documentElement)
  const acColor = style.getPropertyValue('--ac').trim() || '#B33D0B'
  const blueColor = style.getPropertyValue('--blue').trim() || '#1D4ED8'
  const txColor = style.getPropertyValue('--tx2').trim() || '#52524E'
  const bdColor = style.getPropertyValue('--bd').trim() || '#E4E3DE'

  const data = {
    datasets: [
      { label: `Lq (S=${S})`, data: curveData, borderColor: acColor, backgroundColor: acColor + '18', fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2 },
      { label: 'Current', data: [{ x: rhoSlider, y: 0 }, { x: rhoSlider, y: Math.min(currentLq, 50) }], borderColor: blueColor, borderWidth: 2, borderDash: [6, 4], pointRadius: [0, 5], pointBackgroundColor: blueColor },
    ],
  }

  const options = {
    responsive: true, maintainAspectRatio: false, parsing: false,
    scales: {
      x: { type: 'linear', min: 0, max: 100, title: { display: true, text: 'Utilization (%)', color: txColor, font: { family: 'system-ui' } }, ticks: { color: txColor, stepSize: 10 }, grid: { color: bdColor + '60' } },
      y: { min: 0, max: 50, title: { display: true, text: 'Avg Queue Length (Lq)', color: txColor, font: { family: 'system-ui' } }, ticks: { color: txColor }, grid: { color: bdColor + '60' } },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  }

  return (
    <div className="diagram-card">
      <button className="diagram-header" onClick={() => setOpen(o => !o)}>
        <span className="diagram-chevron">{open ? '▾' : '▸'}</span>
        <div>
          <h4 className="diagram-title">Utilization vs Queue Length</h4>
          <p className="diagram-desc">See how Lq explodes as utilization approaches 100%. Adjust servers and variability.</p>
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
            <label className="diagram-label">
              Servers (S)
              <div className="diagram-toggle-group">
                {[1, 2, 4, 5, 10, 40].map(v => (
                  <button key={v} className={`diagram-toggle${S === v ? ' active' : ''}`} onClick={() => { setS(v); setPreset(0) }}>{v}</button>
                ))}
              </div>
            </label>
            <label className="diagram-label">
              CS
              <div className="diagram-toggle-group">
                {[0, 0.2, 0.25, 0.5, 1].map(v => (
                  <button key={v} className={`diagram-toggle${CS === v ? ' active' : ''}`} onClick={() => { setCS(v); setPreset(0) }}>{v}</button>
                ))}
              </div>
            </label>
          </div>

          <div className="diagram-slider-row">
            <span className="diagram-slider-label">{rhoSlider}%</span>
            <input type="range" min={1} max={99} value={rhoSlider} onChange={e => setRhoSlider(+e.target.value)} className="diagram-slider" />
          </div>

          <div className="diagram-chart-wrap"><Line data={data} options={options} /></div>

          <div className="diagram-readout">
            <div><strong>rho</strong> = {(rho * 100).toFixed(0)}%</div>
            <div><strong>Lq</strong> = {currentLq.toFixed(2)}</div>
            <div><strong>Wq</strong> = {currentWq.toFixed(1)} min</div>
            <div><strong>W</strong> = {currentW.toFixed(1)} min</div>
          </div>
        </div>
      )}
    </div>
  )
}
