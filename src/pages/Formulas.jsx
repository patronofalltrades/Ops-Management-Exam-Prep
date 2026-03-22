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
        symbols={['$\\rho$ = utilization (0 to 1)', '$\\lambda$ = arrival rate (customers/hr)', '$S$ = number of servers', '$\\mu$ = service rate per server (customers/hr)']}
        why="How busy the system is. Above 85% waits grow fast. At 100% the queue never recovers."
        when="First thing to compute in any queueing problem. Arrival rate and service time are always given."
        how="Arrival rate divided by total capacity. Match units (both per hour or both per minute).">
        {'$$ \\rho = \\frac{\\lambda}{S \\times \\mu} $$'}
      </F>

      <F
        label="Avg queue length"
        symbols={['$L_q$ = avg number waiting in queue', '$\\rho$ = utilization', '$S$ = servers', '$C_A$ = CV of inter-arrival times', '$C_S$ = CV of service times']}
        why="How many people are waiting (not being served). Core metric — everything else derives from this."
        when={'After you have $\\rho$, $C_A$, $C_S$. Poisson = $C_A = 1$. Given $\\sigma$ and mean? $C_S = \\sigma / t_S$.'}
        how="(How busy) times (how unpredictable). High utilization + high randomness = long queue. Low variability cuts it in half.">
        {'$$ L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} $$'}
      </F>

      <F
        label="Avg wait in queue"
        symbols={['$W_q$ = avg wait time in queue', '$L_q$ = avg queue length', '$\\lambda$ = arrival rate']}
        why="How long customers wait before being served. Check this against SLAs (e.g. max 3 min)."
        when="Problem asks 'how long do customers wait?' or gives a wait time target."
        how={'Divide $L_q$ by arrival rate $\\lambda$. Little\'s Law applied to the queue.'}>
        {'$$ W_q = \\frac{L_q}{\\lambda} $$'}
      </F>
      <Tip>{"To find Wq: first compute Lq using the queue length formula, then divide by λ. This works for ANY number of servers — you do NOT need separate M/M/1 or M/M/5 tables. The Lq approximation formula already accounts for the number of servers through the √(2(S+1)) exponent."}</Tip>

      <F
        label="Avg time in system"
        symbols={['$W$ = total time in system', '$W_q$ = wait time in queue', '$t_S$ = service time $= 1/\\mu$']}
        why="Total customer experience: waiting + being served. What matters for satisfaction."
        when={'Comparing system designs (e.g. 5 slow servers vs 1 fast machine — same $W_q$, different $t_S$).'}
        how={'Queue wait ($W_q$) + service time ($t_S = 1/\\mu$). Simple addition.'}>
        {'$$ W = W_q + t_S \\quad \\text{where } t_S = \\frac{1}{\\mu} $$'}
      </F>

      <F
        label="Avg # in system"
        symbols={['$L$ = avg number in system (queue + service)', '$L_q$ = avg in queue only', '$\\rho$ = utilization', '$S$ = servers']}
        why="Everyone inside — waiting + being served. Use when there is a cost per item in system (e.g. 100/hr per case in the pipeline)."
        when="Problem assigns cost to items 'in the system,' not just 'waiting.' Also for sizing space."
        how={'$L_q$ + people being served ($\\rho \\times S$).'}>
        {'$$ L = L_q + \\rho \\times S $$'}
      </F>

      <F
        label="Variables"
        why="Five ingredients. Extract these from the problem text first, then everything is just plugging in."
        when={'Step one: find $\\lambda$, $\\mu$, $S$, $C_A$, $C_S$ before touching any formula.'}
        how={'Poisson/exponential arrivals = $C_A = 1$. Exponential service = $C_S = 1$. Deterministic = $C_S = 0$. Given $\\sigma$ and mean: $C = \\sigma / \\text{mean}$.'}>
        {'$$ \\lambda = \\text{arrival rate} \\quad \\mu = \\text{service rate} \\quad S = \\text{servers} $$ $$ C_A = \\frac{\\sigma_A}{t_A} \\quad C_S = \\frac{\\sigma_S}{t_S} $$ $$ \\text{PCE} = \\frac{t_S}{W} = 1 - \\frac{W_q}{W} $$'}
      </F>
      <Tip>{"\"Poisson\" or \"exponential\" arrivals → CA = 1. \"Exponential\" service → CS = 1. \"Deterministic\" → CV = 0. Given σ and mean → CV = σ/mean."}</Tip>

      <h2 className="h2">2. Capacity & Little's Law</h2>
      <F
        label="Little's Law"
        symbols={['WIP = work in progress (units in system)', 'TH = throughput (units/time)', 'TT = throughput time (time per unit)']}
        why="Universal connector. Know any two of WIP, throughput, time — get the third. No assumptions needed."
        when="Given 2 of 3 (WIP, throughput, time), find the missing one. Also for sanity-checking answers."
        how="WIP = throughput × time. Match units (throughput per hour → time in hours).">
        {'$$ \\text{WIP} = \\text{TH} \\times \\text{TT} $$'}
      </F>

      <F
        label="Bathtub"
        symbols={['$\\text{WIP}_{end}$ = inventory at end', '$\\text{WIP}_{start}$ = inventory at start', 'Inflow = units entering/time', 'Outflow = units leaving/time']}
        why="More in than out = stuff piles up. More out than in = pile shrinks. That is it."
        when="Demand temporarily exceeds capacity (rush hour, shift handover backlog)."
        how="Current WIP + (inflow − outflow) × time. Example: (600−500) × 5 days = 500 backlog.">
        {'$$ \\text{WIP}_{end} = \\text{WIP}_{start} + (\\text{Inflow} - \\text{Outflow}) \\times \\text{Time} $$'}
      </F>

      <F
        label="Resource capacity"
        why="How many people or machines you need. 2024 exam Part II: employees and sterilization units."
        when="Problem asks 'how many resources needed for X units/day?'"
        how="Available time ÷ time per unit = capacity per resource. Demand ÷ capacity = resources needed. Round UP.">
        {'$$ \\text{Capacity} = \\frac{\\text{Available time}}{\\text{Time per unit}} $$ $$ \\text{Resources needed} = \\lceil \\frac{\\text{Demand}}{\\text{Capacity per resource}} \\rceil $$'}
      </F>

      <h2 className="h2">3. Inventory — EOQ</h2>
      <F
        label="Economic Order Quantity"
        symbols={['$D$ = annual demand (units/yr)', '$S$ = fixed cost per order', '$v$ = unit value (price per unit)', '$i$ = annual holding cost rate (%)']}
        why="Sweet spot between ordering too often (high delivery fees) and ordering too much (cash tied up). Cost curve is flat around EOQ — 10% error costs only ~0.5% more."
        when="Steady demand, need optimal batch size. Exam gives D, S, v, i — plug them in."
        how={'$D$ = annual demand, $S$ = cost per order, $v$ = unit price, $i$ = holding rate. All annual.'}>
        {'$$ \\text{EOQ} = \\sqrt{\\frac{2 \\cdot D \\cdot S}{v \\cdot i}} $$'}
      </F>

      <F
        label="Total Cost at EOQ"
        symbols={['$TC^*$ = minimum ordering + holding cost', '$D$, $S$, $v$, $i$ = same as EOQ']}
        why="Shortcut for minimum ordering + holding cost. Does NOT include purchasing or SS holding."
        when="Quick supplier comparison: compute for each, add purchasing cost, compare totals."
        how="Same four inputs as EOQ, multiplied under the root instead of divided.">
        {'$$ \\text{TC}^* = \\sqrt{2 \\cdot D \\cdot S \\cdot v \\cdot i} $$'}
      </F>

      <F
        label="Cost components"
        symbols={['$D$ = annual demand', '$Q$ = order quantity', '$S$ = cost per order', '$v$ = unit value', '$i$ = holding rate', '$SS$ = safety stock']}
        why="See where money goes. If ordering >> holding, batch too small. At EOQ they are roughly equal."
        when="Problem asks for specific costs, savings, or policy audit."
        how={'Ordering: ($D/Q$) × $S$. Cycle holding: ($Q/2$) × $v$ × $i$. SS holding: $SS$ × $v$ × $i$.'}>
        {'$$ \\text{Ordering} = \\frac{D}{Q} \\times S $$ $$ \\text{Holding (cycle)} = \\frac{Q}{2} \\times v \\times i $$ $$ \\text{Holding (SS)} = \\text{SS} \\times v \\times i $$'}
      </F>

      <h2 className="h2">4. Safety Stock & ROP</h2>
      <F
        label="Safety Stock"
        symbols={['$SS$ = safety stock (units)', '$z$ = safety factor from z-table', '$\\sigma_1$ = std dev of one period demand', '$VP$ = vulnerable period (days or weeks)']}
        why="Buffer against demand uncertainty. Without it you stock out ~50% of cycles."
        when={'Problem mentions $\\sigma$ and a service level (95%, 99%). Independent of EOQ — compute separately.'}
        how={'$z$ from z-table (99% → 2.33), times $\\sigma_1$ (per-period std dev), times $\\sqrt{VP}$.'}>
        {'$$ \\text{SS} = z \\times \\sigma_1 \\times \\sqrt{\\text{VP}} $$'}
      </F>

      <F
        label="SS (variable LT)"
        symbols={['$\\sigma_1$ = std dev of demand per period', '$\\sigma_{VP}$ = std dev of lead time', '$\\bar{D}_1$ = avg demand per period', '$VP$ = vulnerable period']}
        why="When both demand AND delivery time are uncertain — double source of risk."
        when={'Problem gives TWO standard deviations: one for demand ($\\sigma_1$), one for lead time ($\\sigma_{LT}$).'}
        how={'Both variances squared, weighted, summed under one root. Multiply by $z$.'}>
        {'$$ \\text{SS} = z \\times \\sqrt{\\sigma_1^2 \\times \\text{VP} + \\sigma_{\\text{VP}}^2 \\times \\bar{D}_1^2} $$'}
      </F>

      <F
        label="Reorder Point"
        symbols={['$ROP$ = reorder point (units)', '$\\bar{D}_1$ = avg demand per period', '$VP$ = vulnerable period', '$SS$ = safety stock']}
        why="Trigger level: when inventory hits this, order. Too low = stockout before delivery arrives."
        when="Continuous review (can order anytime). ROP = when to order, EOQ = how much."
        how="Expected demand during VP + safety buffer. Average part + worst-case part.">
        {'$$ \\text{ROP} = \\bar{D}_1 \\times \\text{VP} + \\text{SS} $$'}
      </F>

      <F
        label="Periodic Review"
        symbols={['$S$ = order-up-to level (base stock)', '$LT$ = lead time', '$R$ = review period', '$VP$ = $LT + R$ (periodic) or $LT$ (continuous)']}
        why="Stock checked at fixed intervals (daily, weekly). Between checks you are blind — need more SS."
        when={'Problem says "checked daily at 8:00" or "orders placed every R days." Trap: $VP = LT + R$, not just $LT$.'}
        how={'Same as ROP but $VP = LT + R$. Order up to level $S$ each review.'}>
        {'$$ S = \\bar{D}_1 \\times (\\text{LT}+R) + z \\times \\sigma_1 \\times \\sqrt{\\text{LT}+R} $$ $$ \\text{VP} = \\text{LT (continuous)} \\mid \\text{LT}+R \\text{ (periodic)} $$'}
      </F>

      <F
        label="Fill Rate (periodic review)"
        symbols={['$f$ = fill rate (fraction of demand satisfied)', '$\\sigma$ = std dev of demand per period', '$VP$ = vulnerable period ($LT + R$)', '$\\lambda$ = demand per period', '$R$ = review period', '$L(z)$ = standard loss function (from table)']}
        why="Fill rate measures what fraction of total demand you actually deliver — stricter than cycle service level. A 95% fill rate is NOT the same as 95% cycle SL."
        when={'Problem says "satisfy demand X% of the time" in a periodic review context. The fill rate approach gives a LOWER z than the simple service level, because it accounts for partial fulfillment within each cycle.'}
        how={'Solve for $L(z)$, then look up $z$ in the loss function table (not the regular z-table). The loss function $L(z)$ gives the expected shortage per unit of standard deviation.'}>
        {'$$ f = 1 - \\frac{\\sigma \\sqrt{VP} \\cdot L(z)}{\\lambda \\cdot R} $$'}
      </F>
      <Tip>{"L(z) is the standard loss function — it is NOT the same as the z-table. Your exam cheat sheet may include an L(z) table. To use it: solve the fill rate equation for L(z), then look up the corresponding z value. A fill rate of 95% typically gives z ≈ 0.35, much lower than cycle SL 95% which gives z = 1.64."}</Tip>

      <F
        label="Stockouts"
        symbols={['$SL$ = service level (e.g. 0.99)', '$D$ = annual demand', '$Q$ = order quantity', '$D/Q$ = order cycles per year']}
        why="99% per cycle sounds great, but with 36 orders/year that is 1 stockout every 3 years. Smaller Q = more chances."
        when="Problem asks 'how often will you stock out?' or comparing batch size impact."
        how="Failure rate (1 − SL) times cycles per year (D/Q).">
        {'$$ \\text{Stockouts/yr} = (1 - \\text{SL}) \\times \\frac{D}{Q} $$'}
      </F>

      <h2 className="h2">5. Newsvendor</h2>
      <F
        label="Critical Fractile"
        symbols={['$\\alpha$ = critical fractile (optimal service level)', '$C_u$ = underage cost ($p - c$, profit lost per unit short)', '$C_o$ = overage cost ($c - v$, loss per unsold unit)', '$p$ = selling price', '$c$ = cost', '$v$ = salvage value']}
        why="One-shot ordering: perishable goods, seasonal items. Balances underage pain vs overage pain."
        when="Cannot reorder after seeing demand. Croissants, fashion, newspapers, event merch."
        how={'$C_u$ = profit lost if too few, $C_o$ = cost if too many. Divide $C_u$ by total. Result IS optimal service level.'}>
        {'$$ \\alpha = \\frac{C_u}{C_u + C_o} $$ $$ C_u = p - c \\quad C_o = c - v $$'}
      </F>

      <F
        label="Optimal Q*"
        symbols={['$Q^*$ = optimal order quantity', '$\\mu$ = mean demand', '$\\sigma$ = std dev of demand', '$z^*$ = $\\Phi^{-1}(\\alpha)$ from z-table']}
        why={'Converts $\\alpha$ into order quantity. Same structure as safety stock — mean + buffer.'}
        when={'After computing $\\alpha$. Use same z-table as safety stock.'}
        how={'$\\mu + z \\times \\sigma$. If $\\alpha > 0.5$ order above mean. If $< 0.5$ order below.'}>
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

function F({ label, why, when, how, symbols, children }) {
  return (
    <div className="fbox">
      <span className="fl">{label}</span>
      {renderWithMath(children)}
      {symbols && (
        <div className="fbox-symbols">
          {symbols.map((s, i) => <span key={i} className="fbox-sym">{renderWithMath(s)}</span>)}
        </div>
      )}
      {(why || when || how) && (
        <div className="fbox-details">
          {why && <p><strong>Why use it:</strong> {renderWithMath(why)}</p>}
          {when && <p><strong>When to use:</strong> {renderWithMath(when)}</p>}
          {how && <p><strong>How to use:</strong> {renderWithMath(how)}</p>}
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
