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
        why="Think of this as 'how busy is the system.' If it hits 100%, your queue grows forever and never recovers. Even above 85%, things start getting ugly fast. Always check this number first."
        when="The very first thing you compute in any queueing problem. The exam gives you an arrival rate and service time — just divide to get this."
        how="Customers showing up per hour, divided by how many you can serve per hour. If you have multiple servers, multiply their individual rates. Make sure everything is in the same units (per hour, per minute, etc.).">
        {'$$ \\rho = \\frac{\\lambda}{S \\times \\mu} $$'}
      </F>

      <F
        label="Avg queue length"
        why="How many people are standing in line, annoyed, waiting to be served. This is the number that tells you if your system is overwhelmed. Once you have this, you can figure out wait times and everything else."
        when={'After you know utilization ($\\rho$) and variability ($C_A$, $C_S$). The exam will give you enough info to compute all three. \'Poisson\' means $C_A = 1$. Given $\\sigma$ and mean? Divide them to get $C_S$.'}
        how="Plug in your numbers. The formula looks intimidating but it is just: (how busy) times (how unpredictable). High utilization + high randomness = a LOT of people waiting. Low variability cuts the queue nearly in half.">
        {'$$ L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} $$'}
      </F>

      <F
        label="Avg wait in queue"
        why="How long a customer is stuck in line before anyone even starts helping them. This is what people complain about — 'I waited 20 minutes!' If there is an SLA (like max 3 min wait), this is the number you check."
        when="Whenever the problem asks 'how long do customers wait?' or gives you a target like 'wait must not exceed X minutes.'"
        how={'You already have the number of people waiting ($L_q$). Divide by how fast new people arrive ($\\lambda$). Done. It is just Little\'s Law applied to the queue.'}>
        {'$$ W_q = \\frac{L_q}{\\lambda} $$'}
      </F>

      <F
        label="Avg time in system"
        why="The full experience — waiting in line PLUS actually being served. A customer walks in, waits, gets served, walks out. This measures that entire journey."
        when={'When comparing two setups. For example: 5 slow servers vs 1 fast machine might have similar wait times, but totally different service times — so the total experience ($W$) is what matters.'}
        how={'Just add the queue wait ($W_q$) to the service time. Service time is $t_S = 1/\\mu$ (if the server handles 12 customers/hr, each one takes 5 min = 1/12 hr).'}>
        {'$$ W = W_q + t_S \\quad \\text{where } t_S = \\frac{1}{\\mu} $$'}
      </F>

      <F
        label="Avg # in system"
        why="Everyone inside the building — people in line AND people being served right now. Use this when there is a cost attached to every person in the system (like the Hiring Decision problem where each case costs 100/hr while in the pipeline)."
        when="When the problem puts a price tag on items 'in the system' (not just 'waiting'). Also useful for figuring out how big your waiting room needs to be."
        how={'People waiting ($L_q$) + people being served ($\\rho \\times S$). That is it.'}>
        {'$$ L = L_q + \\rho \\times S $$'}
      </F>

      <F
        label="Variables"
        why="These are your five ingredients. Every single queueing problem boils down to finding these from the problem text. Get these right and everything else is just plugging into formulas."
        when={'Step one of every queueing problem: read the text and write down $\\lambda$, $\\mu$, $S$, $C_A$, $C_S$. Do this BEFORE touching any formula.'}
        how={'Look for magic words: \'Poisson\' or \'exponential arrivals\' means $C_A = 1$. \'Exponential service\' means $C_S = 1$. \'Exactly 5 minutes every time\' (deterministic) means $C_S = 0$. Given standard deviation and mean, just divide: $C = \\sigma / \\text{mean}$. PCE tells you what percent of the total time was actually useful service.'}>
        {'$$ \\lambda = \\text{arrival rate} \\quad \\mu = \\text{service rate} \\quad S = \\text{servers} $$ $$ C_A = \\frac{\\sigma_A}{t_A} \\quad C_S = \\frac{\\sigma_S}{t_S} $$ $$ \\text{PCE} = \\frac{t_S}{W} = 1 - \\frac{W_q}{W} $$'}
      </F>
      <Tip>{"\"Poisson\" or \"exponential\" arrivals → CA = 1. \"Exponential\" service → CS = 1. \"Deterministic\" → CV = 0. Given σ and mean → CV = σ/mean."}</Tip>

      <h2 className="h2">2. Capacity & Little's Law</h2>
      <F
        label="Little's Law"
        why="The Swiss Army knife of OM. It connects three things: how many items are inside a system, how fast they flow through, and how long each one stays. Know any two and you get the third for free. Works everywhere — hospitals, factories, restaurants."
        when="Whenever a problem gives you two out of three (WIP, throughput, time) and asks for the missing one. Also great for sanity-checking: if someone says throughput time is 5 hours and throughput is 20/hr, WIP should be 100. If they say 50, something is wrong."
        how="Multiply throughput rate by time, or divide WIP by throughput. Just make sure your units match — if throughput is per hour, time must be in hours, not minutes.">
        {'$$ \\text{WIP} = \\text{TH} \\times \\text{TT} $$'}
      </F>

      <F
        label="Bathtub"
        why="If more stuff comes in than goes out, it piles up. If more goes out than comes in, the pile shrinks. That is literally all this formula says. Think of a bathtub with the faucet running and the drain open."
        when="Rush hour problems: 'demand is 600/day but capacity is 500/day — after 5 days, how much backlog?' Also shift handover situations where one shift leaves unfinished work for the next."
        how="Start with what you have now, add (what came in minus what went out) times how long. If inflow was 600 and outflow was 500 over 5 days: 0 + (600-500) × 5 = 500 units piled up.">
        {'$$ \\text{WIP}_{end} = \\text{WIP}_{start} + (\\text{Inflow} - \\text{Outflow}) \\times \\text{Time} $$'}
      </F>

      <F
        label="Resource capacity"
        why="Answers the most basic operations question: 'how many people (or machines) do I need to hire (or buy)?' This is what the 2024 exam Part II was about — figuring out employees and sterilization units."
        when="Any time the problem says 'how many resources are needed for X units/day?' Make a table: list each resource type, how many minutes it uses per unit, and how many minutes it has per shift."
        how="Available time ÷ time per unit = how many units one resource can handle. Then demand ÷ that number = how many resources you need. Always round UP — you cannot hire half a person.">
        {'$$ \\text{Capacity} = \\frac{\\text{Available time}}{\\text{Time per unit}} $$ $$ \\text{Resources needed} = \\lceil \\frac{\\text{Demand}}{\\text{Capacity per resource}} \\rceil $$'}
      </F>

      <h2 className="h2">3. Inventory — EOQ</h2>
      <F
        label="Economic Order Quantity"
        why="Finding the sweet spot between 'I order too often and pay too many delivery fees' and 'I order too much and my warehouse is full of stuff I am paying to store.' The beautiful thing: even if you get it slightly wrong, it barely affects cost — the curve is super flat around the optimum."
        when="Whenever you need to decide how many units to order at a time. Demand should be relatively steady (no huge seasonal spikes). The exam will give you demand, ordering cost, unit price, and holding rate — plug them in."
        how={'Four numbers go in: annual demand ($D$), cost per order ($S$), price per unit ($v$), and yearly holding cost rate ($i$). Make sure they are all annual. Out comes the optimal order size.'}>
        {'$$ \\text{EOQ} = \\sqrt{\\frac{2 \\cdot D \\cdot S}{v \\cdot i}} $$'}
      </F>

      <F
        label="Total Cost at EOQ"
        why="A shortcut. Instead of computing ordering cost and holding cost separately and adding them, this gives you the minimum total directly. Heads up: this is ONLY ordering + cycle holding — it does not include the cost of actually buying the product or safety stock."
        when="Quick supplier comparison: compute this for each supplier, add the purchasing cost (unit price × demand), and compare. Whoever has the lower total wins."
        how="Same four inputs as EOQ, but now you multiply them all under the square root instead of dividing some.">
        {'$$ \\text{TC}^* = \\sqrt{2 \\cdot D \\cdot S \\cdot v \\cdot i} $$'}
      </F>

      <F
        label="Cost components"
        why="When you need to see where the money actually goes. Super useful for auditing: if your ordering cost is 18x your holding cost (like the cheese store), your batch size is way too small. At EOQ, these two should be roughly equal."
        when="When the problem asks 'what is the annual ordering cost?' or 'compute the savings.' Also when auditing: compare ordering vs holding to see if the current policy makes sense."
        how={'Ordering: how many orders per year ($D/Q$) times cost per order ($S$). Holding for cycle stock: average inventory sitting around ($Q/2$) times what it costs to hold. Safety stock holding: same idea but for the safety buffer.'}>
        {'$$ \\text{Ordering} = \\frac{D}{Q} \\times S $$ $$ \\text{Holding (cycle)} = \\frac{Q}{2} \\times v \\times i $$ $$ \\text{Holding (SS)} = \\text{SS} \\times v \\times i $$'}
      </F>

      <h2 className="h2">4. Safety Stock & ROP</h2>
      <F
        label="Safety Stock"
        why="Your emergency stash. Demand is unpredictable — some weeks customers buy more, some weeks less. Without a buffer, you run out of stock about half the time. Safety stock is that extra reserve so you only run out 1% of the time (or 5%, depending on how safe you want to be)."
        when={'Every inventory problem that mentions demand uncertainty ($\\sigma$) and a service level (like 95% or 99%). Safety stock has NOTHING to do with batch size — compute it separately.'}
        how={'Three things multiplied: (1) $z$ from the z-table based on your service level — 99% gives you 2.33. (2) How unpredictable demand is ($\\sigma$ per period). (3) How long you are exposed ($\\sqrt{VP}$ — the vulnerability period).'}>
        {'$$ \\text{SS} = z \\times \\sigma_1 \\times \\sqrt{\\text{VP}} $$'}
      </F>

      <F
        label="SS (variable LT)"
        why="Sometimes not only is demand unpredictable, but the delivery truck might be late too. This formula handles both sources of randomness at once."
        when={'Only when the problem gives you TWO standard deviations — one for demand ($\\sigma_1$) and one for lead time ($\\sigma_{LT}$). If only demand variability is mentioned, use the simpler formula above.'}
        how={'Both types of uncertainty get squared, weighted, and added inside a square root. The first part is demand risk; the second is delivery risk. Then multiply by $z$ from the z-table.'}>
        {'$$ \\text{SS} = z \\times \\sqrt{\\sigma_1^2 \\times \\text{VP} + \\sigma_{\\text{VP}}^2 \\times \\bar{D}_1^2} $$'}
      </F>

      <F
        label="Reorder Point"
        why="The alarm bell. When your inventory drops to this number, it is time to order. Set it right and your safety stock covers you until the delivery arrives. Set it too low and you run out before the truck shows up."
        when="Continuous review systems — where you can check inventory and place an order at any moment (think: a smart system that monitors stock in real time)."
        how="Two pieces added together: (1) how much you expect to sell while waiting for delivery (average demand times vulnerability period), plus (2) your safety cushion (SS) for the unpredictable part.">
        {'$$ \\text{ROP} = \\bar{D}_1 \\times \\text{VP} + \\text{SS} $$'}
      </F>

      <F
        label="Periodic Review"
        why="For systems where someone only checks the stock at fixed times — like every morning at 8 AM or every Tuesday. Between checks, you are blind to what is happening. So you need MORE safety stock than continuous review."
        when={'When the problem says things like \'inventory is reviewed daily at 8:00\' or \'orders are placed every R days.\' The key trap: $VP = LT + R$, NOT just $LT$. The 2024 exam tested exactly this.'}
        how={'Same idea as ROP, but the vulnerability period is longer ($LT + R$). At each review you order up to level $S$, which covers expected demand plus safety stock over the entire vulnerability window.'}>
        {'$$ S = \\bar{D}_1 \\times (\\text{LT}+R) + z \\times \\sigma_1 \\times \\sqrt{\\text{LT}+R} $$ $$ \\text{VP} = \\text{LT (continuous)} \\mid \\text{LT}+R \\text{ (periodic)} $$'}
      </F>

      <F
        label="Stockouts"
        why="Turns the abstract '99% service level' into something concrete. With 99% per cycle and 36 orders a year, you STILL expect to run out once every 3 years. Smaller batches mean more orders, which means more chances to get unlucky."
        when="When a problem asks 'how many times per year will you stock out?' or when you need to show the practical difference between current batch and optimal batch."
        how="Your failure rate per cycle (1 minus service level) times how many cycles you go through per year (annual demand divided by batch size). That is it.">
        {'$$ \\text{Stockouts/yr} = (1 - \\text{SL}) \\times \\frac{D}{Q} $$'}
      </F>

      <h2 className="h2">5. Newsvendor</h2>
      <F
        label="Critical Fractile"
        why="You are ordering something you can only sell once — tomorrow's croissants, this season's winter coats, today's newspaper. Leftovers go in the trash. Order too few and you miss sales. Order too many and you eat the loss. This formula tells you the perfect balance point."
        when="Any one-shot ordering decision: perishable food, seasonal fashion, event merchandise, daily print runs. The key signal: you cannot reorder once you see demand."
        how={'Figure out how much it hurts to have too few ($C_u$ = selling price minus cost) and how much it hurts to have too many ($C_o$ = cost minus salvage value). Divide the underage pain by the total pain. The result IS your target service level.'}>
        {'$$ \\alpha = \\frac{C_u}{C_u + C_o} $$ $$ C_u = p - c \\quad C_o = c - v $$'}
      </F>

      <F
        label="Optimal Q*"
        why={'Turns the service level you just computed ($\\alpha$) into an actual number of units to order. Fun fact: this formula is structurally identical to safety stock — mean demand plus a buffer. The only difference is where the $z$ comes from.'}
        when={'Right after you compute $\\alpha$. Look up $z$ in the exact same z-table you use for safety stock. Then plug into this formula.'}
        how={'Mean demand ($\\mu$) plus a buffer ($z \\times \\sigma$). If $\\alpha > 0.5$, you order MORE than the average (underage hurts more). If $\\alpha < 0.5$, you order LESS (overage hurts more). If exactly 0.5, order the mean.'}>
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
