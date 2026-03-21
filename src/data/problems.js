export const problems = [
  // === QUEUEING GYM ===
  { id:'qg1', section:'Queueing Gym', title:'Customer Service — Separate Queues', badge:'Queueing', badgeType:'queue',
    prompt:'λ=15 customers/hr. 2 desks on different floors (no pooling, 50/50 split). Fast: 5 min/customer (μ=12/hr). Slow: μ=8/hr. CA=CS=1.',
    questions:['System utilization?','Expected # waiting?','How to improve without more resources?'],
    solution:`System utilization: ρ = 15/(12+8) = 75%
But each desk gets λ=7.5/hr (50/50 split):

Fast desk (S=1): ρ = 7.5/12 = 62.5%
  Lq = [0.625^√4 / (1-0.625)] × 1 = 0.625²/0.375 = 1.04
  Wq = 1.04/7.5 = 8.3 min

Slow desk (S=1): ρ = 7.5/8 = 93.75%  ← danger zone!
  Lq = [0.9375^2 / 0.0625] × 1 = 14.06
  Wq = 14.06/7.5 = 112.5 min  ← nearly 2 hours!

Total Lq = 1.04 + 14.06 = 15.1 people waiting

Q3: Route more customers to fast server (60/40 or 70/30).
Or: common queue feeding both desks (pooling).` },

  { id:'qg2', section:'Queueing Gym', title:'24hr Pharmacy — Automation Impact', badge:'Queueing', badgeType:'queue',
    prompt:'λ=280 orders/day (σ=280). 5 employees: tS=25 min (σ=25). Machine: tS=5 min (σ=5). 24hr operation.',
    questions:['Current Wq and tS?','Impact of replacing employees with machine?'],
    solution:`λ = 280/24 = 11.67/hr; CA ≈ 1 (σ_daily ≈ mean)
Current: μ = 60/25 = 2.4/hr; S=5; capacity=12/hr
  ρ = 11.67/12 = 97.2%  ← extremely high!
  CS = 25/25 = 1 → Lq is enormous at 97% util

Machine (S=1): μ = 60/5 = 12/hr; capacity=12/hr
  ρ = 11.67/12 = 97.2%  ← same utilization!
  But S=1 with 97% is WORSE than S=5 at same ρ

Key: Same total capacity, different topology.
5 servers pooled >> 1 fast server at same ρ.` },

  { id:'qg3', section:'Queueing Gym', title:'Hiring Decision — Cost Optimization', badge:'Queueing + Cost', badgeType:'queue',
    prompt:'λ=3/hr (Poisson). Hannah: μ=6/hr, $40/hr. Elaine: μ=7/hr, $x/hr. Waiting cost=$100/hr per case in system.',
    questions:['Total cost CH and CE?','Max salary Elaine can request?'],
    solution:`Both M/M/1 (Poisson, exponential, S=1, CA=CS=1)

Hannah: ρ = 3/6 = 0.5
  Lq = 0.5²/(1-0.5) × 1 = 0.5
  L = 0.5 + 0.5 = 1.0
  CH = $40 + $100×1.0 = $140/hr

Elaine: ρ = 3/7 = 0.429
  Lq = 0.429²/0.571 × 1 = 0.322
  L = 0.322 + 0.429 = 0.751
  CE = x + $100×0.751 = x + $75.10/hr

Elaine wins if CE < CH: x + 75.10 < 140 → x < $64.90/hr` },

  { id:'qg4', section:'Queueing Gym', title:'Express Checkout — Pooling vs Separation', badge:'Queueing + Strategy', badgeType:'queue',
    prompt:'λ=12/hr, 4 lines (separate S=1, random split). tS=12 min, σ=12. 50% express-eligible: tS=5 min, σ=1.',
    questions:['Current performance?','Express line performance?','Should you implement?'],
    solution:`Q1 — Current: each gets λ=3, μ=5, ρ=0.6, CS=1
  Lq = 0.6²/0.4 × 1 = 0.9; Wq = 18 min; W = 30 min $

Q2 — Express (1 dedicated): λ=6, μ=12, ρ=0.5, CS=0.2
  Lq = 0.5²/0.5 × (1+0.04)/2 = 0.26
  Wq = 2.6 min; W = 7.6 min ← huge improvement!

  Regular (3 lines): tS = 19 min (solve mixture)
  Wait slightly higher for regular customers

Q3: Express customers: 30→8 min. Net positive if express
customers are more price-sensitive. Need margin data.` },

  // === INVENTORY GYM ===
  { id:'ig1', section:'Inventory Gym', title:'The Big Headache — EOQ Comparison', badge:'EOQ', badgeType:'inventory',
    prompt:'D=3,000 cartons/yr. Subcontract: S=$1,000, v=$50. Prepackaged: S=$10, v=$60. i=30%.',
    questions:['Optimal batch size for each?','Which has lower total cost?'],
    solution:`Subcontract: EOQ = √(2×3000×1000/(50×0.30)) = √400,000 = 632
  TC = 9,487 + 150,000 = $159,487

Prepackaged: EOQ = √(2×3000×10/(60×0.30)) = √3,333 = 58
  TC = 1,039 + 180,000 = $181,039

→ Subcontract wins by ~$21,500/yr (lower unit cost dominates)` },

  { id:'ig2', section:'Inventory Gym', title:'Celebration Time — EOQ + Periodic Review', badge:'EOQ + Periodic', badgeType:'inventory',
    prompt:'D=5,000 bottles/yr. v=$3, S=$10, i=20%. LT=3 weeks. Weekly: μ=100, σ=30. SL=95%.',
    questions:['Optimal order quantity (continuous)?','Base stock level (periodic)?'],
    solution:`Q1 — Continuous: EOQ = √(2×5000×10/(3×0.2)) = 408
  VP=LT=3 wks; z(95%)=1.64
  SS = 1.64×30×√3 = 85; ROP = 300+85 = 385 $

Q2 — Periodic (R≈4 weeks):
  VP = LT+R = 7 weeks
  S = 100×7 + 1.64×30×√7 = 700+130 = 830 bottles` },

  { id:'ig3', section:'Inventory Gym', title:'Frozen Delights — Full Analysis (8 parts)', badge:'EOQ + SS + ROP', badgeType:'inventory',
    prompt:'D̄=80 L/day, σ=20, S=€200, v=€10, i=15%, LT=1 day, SL=99%. Current Q=800.',
    questions:['Current batch?','Optimal batch?','Savings?','SS?','Stockout frequency?','SS vs Q?','ROP (current Q)?','ROP (optimal Q)?'],
    solution:`Q1: Current = 80×10 = 800 L
Q2: D=29,200; EOQ = √(2×29200×200/(10×0.15)) ≈ 2,791 L
Q3: TC(800)=7,900; TC(2791)=4,183 → saves 3,717€/yr
Q4: z(99%)=2.33; SS = 2.33×20×√1 = 47 L
Q5: Orders = 29200/800 = 36.5; stockouts = 0.01×36.5 = 0.37
    → ~1 stockout every 3 years
Q6: SS does NOT change with Q (depends on z, σ, VP only)
Q7-Q8: ROP = 80×1 + 47 = 127 L (same for both Q values)` },

  { id:'ig4', section:'Inventory Gym', title:'Emmental Cheese — Policy Audit', badge:'EOQ + Stockout', badgeType:'inventory',
    prompt:'D̄=1 kg/day, σ=0.5, S=€3, v=€5, i=20%, LT=4 days. Current: Q=10, ROP=5. Continuous.',
    questions:['Is policy appropriate?','Stockout probability?','ROP for 1% stockout?'],
    solution:`Q1: EOQ = √(2×365×3/(5×0.20)) ≈ 47 kg. Current Q=10 far below.
Q2: SS = 5-4 = 1; z = 1/(0.5×√4) = 1.0 → SL=84.1%
    Stockout = 15.9%/cycle; 365/10 = 36.5 orders → 5.8/yr
Q3: z=2.33; SS = 2.33×0.5×√4 = 2.33 → ROP ≈ 7 kg` },

  // === EXAM 2024 ===
  { id:'ex1', section:'Final Exam 2024', title:'Part I: Sourcing Screws — Supplier Comparison (20 pts)', badge:'EOQ + SS + Periodic', badgeType:'inventory',
    prompt:'D̄=100 boxes/day, σ=30. Review daily (R=1). i=10%, warehouse=2,000. SL=99%.\nUS: v=500€, S=100€, transport=40€/kg (0.25kg/box), LT=7.\nPortugal: v=300€, S=150€, transport=30€/kg, LT=1.',
    questions:['Full inventory policy for each supplier?','Which is cheaper?'],
    solution:`US: Transport/box = 10€ (non-differential)
  VP = LT+R = 7+1 = 8; SS = 2.33×30×√8 = 197
  ROP = 800+197 = 997; EOQ = 382 $
  Total = 18,643,955€/yr

Portugal: Transport/box = 7.5€ (non-differential)
  VP = 1+1 = 2; SS = 2.33×30×√2 = 99
  ROP = 200+99 = 299; EOQ = 604 $
  Total = 11,244,845€/yr

→ Portugal saves ~7.4M€/yr` },

  { id:'ex2', section:'Final Exam 2024', title:'Part II: Kit Preparation — Capacity (20 pts)', badge:'Capacity', badgeType:'queue',
    prompt:'100 kits/day. Shift: 4 hrs. Picking: 30 min (employee). Checking: 10 min (employee+scale). Sterilization: 60 min (machine).',
    questions:['How many employees?','How many sterilization units?'],
    solution:`Employee: 40 min/kit; 240/40 = 6/shift → ⌈100/6⌉ = 17
Scale: 10 min/kit; 240/10 = 24/shift → ⌈100/24⌉ = 5
Sterilization: 60 min/kit; 240/60 = 4/shift → ⌈100/4⌉ = 25

Bottleneck: sterilization (most resources needed).
Better: 20 employees + 30 machines → ~83% util (safer)` },

  { id:'ex3', section:'Final Exam 2024', title:'Part III: Call Center — Queueing SLA (20 pts)', badge:'Queueing SLA', badgeType:'queue',
    prompt:'λ=10 calls/hr. tS=20 min, σS=5 min. S=4. SLA: Wq ≤ 3 min. CA=1.',
    questions:['Does S=4 meet SLA?','How many operators needed?'],
    solution:`S=4: ρ=83.3%; CS=0.25
  Lq = [0.833^3.16/0.167] × 0.531 = 1.81
  Wq = 10.8 min → FAILS SLA ✗

S=5: ρ=66.7%
  Lq = [0.667^3.46/0.333] × 0.531 = 0.44
  Wq = 2.6 min → MEETS SLA ✓

→ Need 5 operators (+1 from current)` },

  { id:'ex4', section:'Final Exam 2024', title:'Part IV: Red Carpet — Strategic (30+10 pts)', badge:'Strategy', badgeType:'strategy',
    prompt:'IV.1: Consultant rationale? Pros/cons?\nIV.2: What about Miguel?',
    questions:['Pros of centralization?','Cons?','Miguel\'s case?'],
    solution:`PROS: Inventory pooling (SS drops √25 = 5×), disintermediation
(save 15% margin), transport economies, simpler upstream,
removes bribery-dependent distribution.

CONS: Longer delivery to periphery, loss of local relationships
that DRIVE demand, EU ≠ US, alienates distributors who know
surgeons, last-mile requires hospital access.

MIGUEL: Saved sales (60% recovery) but acted unethically.
Should be disciplined, not fired. Company should pilot locally.` },
]
