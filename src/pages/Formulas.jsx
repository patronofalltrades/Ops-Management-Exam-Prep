import { useState, useMemo } from 'react'
import { renderWithMath } from '../components/Math'
export default function Formulas() {
  return (
    <>
      <h1 className="h1">Formula Reference</h1>
      <p className="sub">Every exam formula. Matches the official cheat sheet. Queueing → Capacity → Inventory → Newsvendor.</p>

      <h2 className="h2">1. Queueing</h2>
      <F
        label="Utilization"
        why="Shows the % of time servers are visibly busy processing work. High $\rho$ exponentially increases wait times."
        when="Use to check system stability. If $\rho \ge 1$, the queue grows to infinity."
        how="Divide incoming demand rate ($\lambda$) by total processing capacity ($S \times \mu$).">
        {'$$ \\rho = \\frac{\\lambda}{S \\times \\mu} $$'}
      </F>

      <F
        label="Avg queue length"
        why="Approximates how many people or items are stuck waiting before service begins."
        when="Use to figure out if your waiting room needs to be bigger."
        how="Wait, the big equation: accounts for utilization, scale pooling ($S$), and variability ($C_A^2, C_S^2$).">
        {'$$ L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} $$'}
      </F>

      <F
        label="Avg wait in queue"
        why="Converts the number of people waiting into a time duration using Little's Law specifically on the queue."
        when="Use when you need time metrics (e.g. 'How long do I wait?') instead of headcounts."
        how="Divide $L_q$ by the arrival rate $\lambda$.">
        {'$$ W_q = \\frac{L_q}{\\lambda} $$'}
      </F>

      <F
        label="Avg time in system"
        why="Total time equals wait time plus actual service time."
        when="Use to find the total time a customer spends from doors-in to doors-out."
        how="Add $W_q$ and the service time $1/\mu$.">
        {'$$ W = W_q + t_S \\quad \\text{where } t_S = \\frac{1}{\\mu} $$'}
      </F>

      <F
        label="Avg # in system"
        why="Total items equals those in queue plus those currently being served ($\rho \times S$)."
        when="Use for inventory holding costs where items in service still incur costs."
        how="Add $L_q$ and the average number of active servers ($\rho \times S$).">
        {'$$ L = L_q + \\rho \\times S $$'}
      </F>

      <F
        label="Variables"
        why="Fundamental parameters building all queueing logic."
        when="Always extract these 5 elements first when starting a queueing problem."
        how="$\lambda$ = Arrivals/time. $\mu$ = Service capacity/server/time. $S$ = Servers. $C$ = Variability ratios.">
        {'$$ \\lambda = \\text{arrival rate} \\quad \\mu = \\text{service rate} \\quad S = \\text{servers} $$ $$ C_A = \\frac{\\sigma_A}{t_A} \\quad C_S = \\frac{\\sigma_S}{t_S} $$ $$ \\text{PCE} = \\frac{t_S}{W} = 1 - \\frac{W_q}{W} $$'}
      </F>
      <Tip>{"\"Poisson\" or \"exponential\" arrivals → CA = 1. \"Exponential\" service → CS = 1. \"Deterministic\" → CV = 0. Given σ and mean → CV = σ/mean."}</Tip>

      <h2 className="h2">2. Capacity & Little's Law</h2>
      <F
        label="Little's Law"
        why="Universally links inventory, throughput, and time, regardless of statistical distributions."
        when="Use immediately when given 2 of the 3 fundamental process metrics to find the missing one."
        how="Ensure units are consistent (e.g. if TH is per hour, TT must be in hours).">
        {'$$ \\text{WIP} = \\text{TH} \\times \\text{TT} $$'}
      </F>

      <F
        label="Bathtub"
        why="Inventory is simply accumulation over time."
        when="Use when arrivals temporarily exceed capacity for a specific duration of time (a rush hour)."
        how="Track the net rate of build-up (Inflow - Outflow).">
        {'$$ \\text{WIP}_{end} = \\text{WIP}_{start} + (\\text{Inflow} - \\text{Outflow}) \\times \\text{Time} $$'}
      </F>

      <F
        label="Resource capacity"
        why="Maps raw demand to physical worker/machine requirements."
        when="Use to find how many cashiers or machines you need to hire/buy."
        how="Divide Demand by Capacity. Always round UP (you can't hire 4.2 workers).">
        {'$$ \\text{Capacity} = \\frac{\\text{Available time}}{\\text{Time per unit}} $$ $$ \\text{Resources needed} = \\lceil \\frac{\\text{Demand}}{\\text{Capacity per resource}} \\rceil $$'}
      </F>

      <h2 className="h2">3. Inventory — EOQ</h2>
      <F
        label="Economic Order Quantity"
        why="Balances the fixed cost of ordering against the recurring cost of holding inventory."
        when="Use when demand is steady and predictable to find the optimal batch size."
        how="Plug in annual demand $D$, cost per order $S$, unit value $v$, and holding % $i$.">
        {'$$ \\text{EOQ} = \\sqrt{\\frac{2 \\cdot D \\cdot S}{v \\cdot i}} $$'}
      </F>

      <F
        label="Total Cost at EOQ"
        why="Shows the minimum possible combination of ordering and cycle holding costs."
        when="Use to quickly find the lowest cost without calculating Ordering and Holding separately."
        how="Multiply the EOQ terms underneath the square root.">
        {'$$ \\text{TC}^* = \\sqrt{2 \\cdot D \\cdot S \\cdot v \\cdot i} $$'}
      </F>

      <F
        label="Cost components"
        why="Breaks down where the money goes."
        when="Use when a problem asks for specific isolated costs (e.g. 'What is the holding cost?')."
        how="Ordering cost deals with order frequency ($D/Q$). Cycle holding looks at average inventory ($Q/2$). Safety holding is just the buffer ($SS$).">
        {'$$ \\text{Ordering} = \\frac{D}{Q} \\times S $$ $$ \\text{Holding (cycle)} = \\frac{Q}{2} \\times v \\times i $$ $$ \\text{Holding (SS)} = \\text{SS} \\times v \\times i $$'}
      </F>

      <h2 className="h2">4. Safety Stock & ROP</h2>
      <F
        label="Safety Stock"
        why="Creates a buffer against demand variability during vulnerability periods so you don't stock out."
        when="Use when lead time is constant but daily demand fluctuates."
        how="Multiply the z-score (derived from Service Level) by the std dev of demand over the vulnerability period.">
        {'$$ \\text{SS} = z \\times \\sigma_1 \\times \\sqrt{\\text{VP}} $$'}
      </F>

      <F
        label="SS (variable LT)"
        why="Accounts for the danger that the delivery truck itself might be late."
        when="Use when both daily demand AND lead time are uncertain (two standard deviations given)."
        how="Combines variances. The square root term handles the joint probability.">
        {'$$ \\text{SS} = z \\times \\sqrt{\\sigma_1^2 \\times \\text{VP} + \\sigma_{\\text{VP}}^2 \\times \\bar{D}_1^2} $$'}
      </F>

      <F
        label="Reorder Point"
        why="Tells you exactly when to pull the trigger on a new order so you don't run dry."
        when="Use to set inventory control systems (Continuous Review)."
        how="Expected demand during the protection period plus the safety stock buffer.">
        {'$$ \\text{ROP} = \\bar{D}_1 \\times \\text{VP} + \\text{SS} $$'}
      </F>

      <F
        label="Periodic Review"
        why="Defines the order-up-to level ($S$) for systems checked at fixed intervals."
        when="Use when the store only orders on specific days (e.g. every Tuesday)."
        how="Calculate exactly like ROP, but the Vulnerability Period (VP) is extended to $LT + R$.">
        {'$$ S = \\bar{D}_1 \\times (\\text{LT}+R) + z \\times \\sigma_1 \\times \\sqrt{\\text{LT}+R} $$ $$ \\text{VP} = \\text{LT (continuous)} \\mid \\text{LT}+R \\text{ (periodic)} $$'}
      </F>

      <F
        label="Stockouts"
        why="Converts Service Level percentage into tangible missed sales events."
        when="Use to calculate the actual cost penalty of stocking out."
        how="Multiply your failure rate ($1 - SL$) by the number of times you order per year ($D/Q$).">
        {'$$ \\text{Stockouts/yr} = (1 - \\text{SL}) \\times \\frac{D}{Q} $$'}
      </F>

      <h2 className="h2">5. Newsvendor</h2>
      <F
        label="Critical Fractile"
        why="Finds the optimal probability of satisfying all demand by weighing the pain of underage vs overage."
        when="Use for short lifecycle, perishable, or single-period goods (like newspapers or Zara fashion)."
        how="Divide Underage margin by Total marginal error ($C_u + C_o$). This gives your target Service Level ($\\alpha$).">
        {'$$ \\alpha = \\frac{C_u}{C_u + C_o} $$ $$ C_u = p - c \\quad C_o = c - v $$'}
      </F>

      <F
        label="Optimal Q*"
        why="Transforms the optimal probability $\\alpha$ into a physical order quantity using the Normal Distribution."
        when="Use after calculating $\\alpha$ to find exactly how many units to buy."
        how="Look up the z-score for $\\alpha$, then add safety margin ($z^* \\times \\sigma$) to the mean demand $\\mu$.">
        {'$$ Q^* = \\mu + z^* \\times \\sigma $$'}
      </F>

      <h2 className="h2">6. z-Value Table</h2>
      <ZTable />

      <h2 className="h2">7. Calculators</h2>
      <QueueCalc />
      <EOQCalc />
      <SSCalc />
      <NVCalc />
    </>
  )
}

function F({ label, why, when, how, children }) {
  return (
    <div className="fbox">
      <span className="fl">{label}</span>
      {renderWithMath(children)}
      {(why || when || how) && (
        <div className="fbox-details">
          {why && <p><strong>Why:</strong> {renderWithMath(why)}</p>}
          {when && <p><strong>When:</strong> {renderWithMath(when)}</p>}
          {how && <p><strong>How:</strong> {renderWithMath(how)}</p>}
        </div>
      )}
    </div>
  )
}

function Tip({ children }) {
  return <div className="cb cb-tip"><span className="ct">Tip</span><p>{children}</p></div>
}

function ZTable() {
  const rows = [
    [['50%', '0.00'], ['80%', '0.84'], ['95%', '1.64', true]],
    [['60%', '0.25'], ['83.3%', '0.97'], ['99%', '2.33', true]],
    [['70%', '0.52'], ['90%', '1.28', true], ['99.9%', '3.09', true]],
  ]
  return (
    <div className="tw"><table><thead><tr><th>SL</th><th>z</th><th>SL</th><th>z</th><th>SL</th><th>z</th></tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.flatMap(([sl, z, hl]) => [<td key={sl} className={hl ? 'hl' : ''}>{sl}</td>, <td key={sl + 'z'} className={hl ? 'hl' : ''}>{z}</td>])}</tr>)}</tbody></table></div>
  )
}

const zLU = [[.999, 3.09], [.99, 2.33], [.95, 1.64], [.90, 1.28], [.85, 1.04], [.80, .84], [.75, .67], [.70, .52], [.60, .25], [.50, 0]]
function zFromSL(sl) { for (const [a, z] of zLU) if (sl >= a) return z; return 0 }
function zFromAlpha(a) { const t = [[.99, 2.33], [.95, 1.64], [.9, 1.28], [.85, 1.04], [.8, .84], [.75, .67], [.7, .52], [.65, .39], [.6, .25], [.55, .13], [.5, 0]]; for (const [x, z] of t) if (a >= x) return z; return 0 }

function QueueCalc() {
  const [v, setV] = useState({ lam: 10, ts: 20, ss: 5, S: 4, ca: 1 })
  const upd = (k, val) => setV(p => ({ ...p, [k]: +val }))
  const res = useMemo(() => {
    const { lam, ts, ss, S, ca } = v; if (!lam || !ts || !S) return ''
    const mu = 60 / ts, rho = lam / (S * mu), cs = ss / ts
    if (rho >= 1) return `ρ = ${rho.toFixed(3)} ≥ 1 → UNSTABLE. Add servers.`
    const exp = Math.sqrt(2 * (S + 1)), lq = (Math.pow(rho, exp) / (1 - rho)) * ((ca * ca + cs * cs) / 2), wq = lq / lam * 60, w = wq + ts, L = lq + rho * S
    return `μ = ${mu.toFixed(2)}/hr  |  ρ = ${(rho * 100).toFixed(1)}%  |  CS = ${cs.toFixed(3)}\nLq = ${lq.toFixed(2)} waiting  |  Wq = ${wq.toFixed(1)} min\nW = ${w.toFixed(1)} min  |  L = ${L.toFixed(2)} in system  |  PCE = ${(ts / w * 100).toFixed(1)}%`
  }, [v])
  return (<div className="calc"><h4>Queueing Calculator</h4><div className="cg">
    <label>λ (arrivals/hr)<input type="number" value={v.lam} onChange={e => upd('lam', e.target.value)} /></label>
    <label>tS avg (min)<input type="number" value={v.ts} onChange={e => upd('ts', e.target.value)} /></label>
    <label>σS (min)<input type="number" value={v.ss} onChange={e => upd('ss', e.target.value)} /></label>
    <label>S (servers)<input type="number" value={v.S} onChange={e => upd('S', e.target.value)} /></label>
    <label>CA<input type="number" value={v.ca} step="0.1" onChange={e => upd('ca', e.target.value)} /></label>
  </div><div className="cr">{res}</div></div>)
}

function EOQCalc() {
  const [v, setV] = useState({ D: 36500, S: 100, vv: 500, i: 10 })
  const upd = (k, val) => setV(p => ({ ...p, [k]: +val }))
  const res = useMemo(() => {
    const { D, S, vv, i } = v; const ii = i / 100; if (!D || !S || !vv || !ii) return ''
    const eoq = Math.sqrt(2 * D * S / (vv * ii)), oc = (D / eoq) * S, hc = (eoq / 2) * vv * ii
    return `EOQ = ${eoq.toFixed(0)} units\nOrdering = ${oc.toFixed(0)}€/yr  |  Holding = ${hc.toFixed(0)}€/yr\nTotal = ${(oc + hc).toFixed(0)}€/yr  |  Orders/yr = ${(D / eoq).toFixed(1)}`
  }, [v])
  return (<div className="calc"><h4>EOQ Calculator</h4><div className="cg">
    <label>D (annual)<input type="number" value={v.D} onChange={e => upd('D', e.target.value)} /></label>
    <label>S (order cost €)<input type="number" value={v.S} onChange={e => upd('S', e.target.value)} /></label>
    <label>v (unit cost €)<input type="number" value={v.vv} onChange={e => upd('vv', e.target.value)} /></label>
    <label>i (holding %)<input type="number" value={v.i} onChange={e => upd('i', e.target.value)} /></label>
  </div><div className="cr">{res}</div></div>)
}

function SSCalc() {
  const [v, setV] = useState({ d: 100, sig: 30, lt: 7, r: 1, sl: 99 })
  const upd = (k, val) => setV(p => ({ ...p, [k]: +val }))
  const res = useMemo(() => {
    const { d, sig, lt, r, sl } = v; if (!d || !sig) return ''
    const z = zFromSL(sl / 100), vp = lt + (r || 0), ss = z * sig * Math.sqrt(vp), rop = d * vp + ss
    return `VP = LT+R = ${lt}+${r} = ${vp} days\nz(${sl}%) = ${z}\nSS = ${z}×${sig}×√${vp} = ${ss.toFixed(1)} units\nROP = ${d}×${vp}+${ss.toFixed(0)} = ${rop.toFixed(0)}`
  }, [v])
  return (<div className="calc"><h4>Safety Stock & ROP</h4><div className="cg">
    <label>D̄₁ (daily)<input type="number" value={v.d} onChange={e => upd('d', e.target.value)} /></label>
    <label>σ₁ (daily)<input type="number" value={v.sig} onChange={e => upd('sig', e.target.value)} /></label>
    <label>LT (days)<input type="number" value={v.lt} onChange={e => upd('lt', e.target.value)} /></label>
    <label>R (review, 0=continuous)<input type="number" value={v.r} onChange={e => upd('r', e.target.value)} /></label>
    <label>SL (%)<input type="number" value={v.sl} onChange={e => upd('sl', e.target.value)} /></label>
  </div><div className="cr">{res}</div></div>)
}

function NVCalc() {
  const [v, setV] = useState({ p: 6, c: 2, vv: 1, mu: 500, sig: 120 })
  const upd = (k, val) => setV(p => ({ ...p, [k]: +val }))
  const res = useMemo(() => {
    const { p, c, vv, mu, sig } = v; if (!p || !c || !mu || !sig) return ''
    const cu = p - c, co = c - vv, alpha = cu / (cu + co), z = zFromAlpha(alpha), q = mu + z * sig
    return `Cu = ${cu}  |  Co = ${co}\nα = ${cu}/(${cu}+${co}) = ${alpha.toFixed(3)}\nz* ≈ ${z.toFixed(2)}\nQ* = ${mu}+${z.toFixed(2)}×${sig} = ${q.toFixed(0)} units`
  }, [v])
  return (<div className="calc"><h4>Newsvendor</h4><div className="cg">
    <label>p (sell €)<input type="number" value={v.p} onChange={e => upd('p', e.target.value)} /></label>
    <label>c (cost €)<input type="number" value={v.c} onChange={e => upd('c', e.target.value)} /></label>
    <label>v (salvage €)<input type="number" value={v.vv} onChange={e => upd('vv', e.target.value)} /></label>
    <label>μ (mean)<input type="number" value={v.mu} onChange={e => upd('mu', e.target.value)} /></label>
    <label>σ (std dev)<input type="number" value={v.sig} onChange={e => upd('sig', e.target.value)} /></label>
  </div><div className="cr">{res}</div></div>)
}
