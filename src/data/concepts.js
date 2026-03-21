export const conceptData = [
    {
        category: "1. Queueing Theory",
        items: [
            // ── Section intro ──
            {
                type: 'intro',
                content: "Queueing theory studies waiting lines. Every time customers wait — at a pharmacy, a call center, a checkout counter — there is a queue system at work. The goal is to understand WHY waits happen and HOW to reduce them without throwing money at the problem. This section builds from intuition to formulas, step by step."
            },

            // ── What is a queue system? ──
            {
                type: 'heading',
                title: "What is a Queue System?"
            },
            {
                type: 'card',
                title: "The three building blocks",
                official: "Every queue system has three components:\n\n1. Arrivals — customers (or orders, calls, patients) showing up. We measure the arrival rate: $\\lambda$ = how many arrive per hour.\n\n2. Servers — the resources that process customers. We count the number of servers: $S$. Each server processes at rate $\\mu$ (customers/hr), so service time is $t_S = 1/\\mu$.\n\n3. Queue — where customers wait when all servers are busy.\n\nThe relationship between demand ($\\lambda$) and capacity ($S \\times \\mu$) determines everything.",
                dumb: "Picture a restaurant. People walk in (arrivals), waiters serve them (servers), and if all tables are full, people stand around the entrance looking annoyed (queue). That's it. Every queue problem is just a restaurant with different names."
            },
            {
                type: 'card',
                title: "Utilization (ρ) — how busy are the servers?",
                official: "Utilization measures what fraction of available capacity is being used:\n$$ \\rho = \\frac{\\lambda}{S \\times \\mu} $$\n$\\rho = 0.75$ means servers are busy 75% of the time and idle 25%.\n\nThis is the MOST important number in any queue problem. It must be less than 1 (100%) for the system to be stable — otherwise the queue grows forever.",
                dumb: "If a barista can make 10 coffees an hour and 8 customers show up, she's busy 80% of the time. If 12 show up? Disaster. The line never ends. You NEED slack. That 20% idle time is not lazy — it's the only thing preventing chaos."
            },

            // ── Variability ──
            {
                type: 'heading',
                title: "Why Do Queues Form?"
            },
            {
                type: 'concept',
                title: "Core insight",
                official: "Queues form even when average demand < average capacity. The culprit is variability — random fluctuations in both arrivals and service times create temporary imbalances that accumulate into waiting lines."
            },
            {
                type: 'card',
                title: "Measuring variability: the Coefficient of Variation (CV)",
                official: "Variability is measured by the Coefficient of Variation:\n$$ CV = \\frac{\\sigma}{\\text{mean}} $$\nFor arrivals: $C_A$ = CV of inter-arrival times\nFor service: $C_S$ = CV of service times\n\nCommon cases you must recognize:\n• \"Poisson arrivals\" → $C_A = 1$ (natural randomness)\n• \"Exponential service\" → $C_S = 1$ (high variability)\n• \"Deterministic\" (fixed time) → $C_S = 0$ (no variability)\n• Given $\\sigma$ and mean → compute $C_S = \\sigma / t_S$",
                dumb: "CV tells you how unpredictable something is. If every customer takes exactly 5 minutes (CV=0), life is beautiful. If some take 1 minute and others take 30 (CV=1+), life is chaos. The exam gives you clues: 'Poisson' means CV=1, 'deterministic' means CV=0, otherwise just divide σ by the mean."
            },

            // ── The Two Laws ──
            {
                type: 'heading',
                title: "The Two Fundamental Laws"
            },
            {
                type: 'card',
                title: "1st Law: Higher utilization → exponentially longer waits",
                official: "As $\\rho$ approaches 100%, the average queue length $L_q$ explodes. This is not linear — it is exponential:\n\n• At $\\rho = 50\\%$: $L_q$ is small\n• At $\\rho = 80\\%$: $L_q$ is noticeable\n• At $\\rho = 90\\%$: $L_q$ roughly doubles from 80%\n• At $\\rho = 95\\%$: $L_q$ doubles again\n• At $\\rho = 99\\%$: $L_q$ is enormous\n\nThis is why you NEED idle capacity. Idle capacity is not waste — it is a buffer against variability.",
                dumb: "If everyone is working at 100% capacity and a tiny thing goes wrong, the whole system blows up. You pay people to stand around so that when 10 orders come in at once, they can handle it. The 'lazy' employee is actually your insurance policy."
            },
            {
                type: 'card',
                title: "2nd Law: Higher variability → even longer waits at the same ρ",
                official: "The queue length formula includes a variability factor:\n$$ \\frac{C_A^2 + C_S^2}{2} $$\nThis multiplies the queue length. When $C_A = C_S = 1$ (M/M/1), this factor equals 1. But if you reduce variability:\n\n• $C_S = 0.25$ → factor drops to $\\frac{1 + 0.0625}{2} = 0.53$\n• Queues are nearly cut in half!\n\nReducing variability is as powerful as adding capacity.",
                dumb: "Unpredictability is the enemy. If customers arrive like clockwork and service is as precise as a robot, you barely need a waiting room. Standardize everything and the line disappears — no new hires needed."
            },

            // ── The Lq Formula ──
            {
                type: 'heading',
                title: "The Queue Length Formula"
            },
            {
                type: 'card',
                title: "Putting it all together: Lq",
                official: "Now we can combine utilization and variability into one formula:\n$$ L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} $$\nThis tells you the average number of customers waiting in the queue. It has three pieces:\n\n1. $\\rho^{\\sqrt{2(S+1)}}$ — utilization raised to a power (the \"pressure\" from being busy)\n2. $\\frac{1}{1-\\rho}$ — the explosion factor as ρ→1\n3. $\\frac{C_A^2 + C_S^2}{2}$ — the variability multiplier\n\nOnce you have $L_q$, everything else follows.",
                dumb: "This formula looks scary but it just says: queue length = (how busy you are) × (how unpredictable things are). That's it. High utilization + high variability = disaster. Low utilization OR low variability = manageable."
            },
            {
                type: 'card',
                title: "From Lq to everything else",
                official: "Once you have $L_q$, the rest is mechanical:\n\n• Waiting time in queue: $W_q = L_q / \\lambda$\n  (Little's Law applied to the queue)\n\n• Total time in system: $W = W_q + t_S$\n  (waiting + being served)\n\n• Total people in system: $L = L_q + \\rho \\times S$\n  (waiting + being served)\n\n• Process Cycle Efficiency: $PCE = t_S / W$\n  (what fraction of time is actual service vs. total time)",
                dumb: "Once you know how many people are in line, you can figure out everything else. How long is the wait? Divide by the arrival rate. How long total? Add service time. What fraction of time is actually useful? Usually depressingly small — most services are below 15% efficiency."
            },

            // ── Pooling ──
            {
                type: 'heading',
                title: "Pooling Principle"
            },
            {
                type: 'card',
                title: "One queue feeding S servers always beats S separate queues",
                official: "With pooling, when one server finishes early, it immediately helps the shared queue. With separate queues, that idle capacity is wasted.\n\nWhy? In the $L_q$ formula, the exponent $\\sqrt{2(S+1)}$ grows with S. For a pooled system with S servers, this single exponent is applied once. For S separate systems, you compute $L_q$ S times with lower exponents.\n\nSame total capacity, same total demand — but significantly less total waiting.",
                dumb: "Ever picked the slow line at the grocery store while the other line zooms? That's the cost of separate queues. One big snake-line feeding all cashiers (like at the airport) means no cashier ever sits idle while customers wait in another line."
            },
            {
                type: 'tip',
                content: "Pooling is operationally optimal but may not be strategically best. Separating queues (express lanes, VIP) sacrifices efficiency for differentiation and willingness-to-pay segmentation. The exam tests whether you can argue BOTH sides."
            },

            // ── Strategic Triangle ──
            {
                type: 'heading',
                title: "Strategic Triangle"
            },
            {
                type: 'card',
                title: "Cost — Range — Service: pick two",
                official: "No firm can simultaneously minimize cost (high ρ), offer maximum product range (high $C_S$), and guarantee fast service (low $W_q$). Queueing theory formalizes this impossibility:\n\n• Low cost → high ρ → long waits\n• High variety → high $C_S$ → long waits\n• Fast service → low ρ → high cost\n\nExam Part IV (strategic questions) often tests this tension.",
                dumb: "\"Cheap, Fast, Good — pick two.\" You can't be McDonald's (cheap/fast, but small menu) AND a fine-dining 10-course restaurant (variety, great quality, but slow and expensive). Every operational decision is a trade-off."
            }
        ]
    },
    {
        category: "2. Capacity Analysis",
        items: [
            // ── Section intro ──
            {
                type: 'intro',
                content: "Capacity analysis asks: do we have enough resources to meet demand? Unlike queueing (which focuses on waiting), capacity analysis focuses on throughput — how much can we produce, and what limits us? This is the foundation for staffing decisions, equipment purchases, and process design."
            },

            // ── Core concepts ──
            {
                type: 'heading',
                title: "Key Definitions"
            },
            {
                type: 'card',
                title: "Capacity, Throughput, and Throughput Time",
                official: "Three terms you must keep straight:\n\n• Capacity — the MAXIMUM a resource can produce per unit of time. Measured in units/hr or units/shift.\n\n• Throughput (TH) — how much is ACTUALLY produced. Always ≤ capacity. Limited by the bottleneck.\n\n• Throughput Time (TT) — the time ONE unit spends inside the system, from entry to exit. Includes processing time AND any waiting.",
                dumb: "Capacity is how fast you COULD work. Throughput is how fast you ACTUALLY work. Throughput time is how long each burger takes from raw patty to served plate. The first two are about the kitchen; the last one is about the burger."
            },
            {
                type: 'card',
                title: "Bottleneck — the resource that limits everything",
                official: "The bottleneck is the resource with the LOWEST capacity relative to demand.\n\nTo find it:\n1. List every resource type\n2. For each: capacity = available time / time per unit\n3. The one with the lowest capacity is the bottleneck\n\nCritical rule: adding capacity to a NON-bottleneck resource does NOT increase system output. You must fix the bottleneck first.",
                dumb: "The slowest station on the assembly line dictates how many units you make per day. Yelling at the fast stations to work faster does literally nothing. Find the slow station and fix IT. Everything else is noise."
            },

            // ── Little's Law ──
            {
                type: 'heading',
                title: "Little's Law"
            },
            {
                type: 'card',
                title: "WIP = TH × TT — the universal connector",
                official: "Little's Law connects three quantities:\n$$ \\text{WIP} = \\text{TH} \\times \\text{TT} $$\n• WIP (Work in Progress) = number of units inside the system\n• TH = throughput rate\n• TT = throughput time\n\nThis is universal — it works for ANY stable system with NO assumptions about distributions. If you know any two, you can find the third.\n\nExamples:\n• Hospital: 30 patients/day admitted, each stays 4 days → 120 beds occupied\n• Factory: 10 units/hr, each takes 2 hrs → 20 units on the floor",
                dumb: "If you throw 10 burgers into the fryer every minute and each takes 2 minutes to cook, there are 20 burgers in the fryer right now. If you want fewer burgers in the fryer (less WIP), either cook them faster (lower TT) or throw in fewer (lower TH). Math is magic."
            },
            {
                type: 'tip',
                content: "Little's Law is your best friend for sanity checks. If someone tells you throughput time is 5 hours, throughput is 20/hr, but WIP is only 50... that's wrong (should be 100). Always verify."
            },

            // ── Bathtub Formula ──
            {
                type: 'heading',
                title: "Bathtub Formula"
            },
            {
                type: 'card',
                title: "Tracking WIP over time when inflow ≠ outflow",
                official: "When input rate ≠ output rate, WIP changes over time:\n$$ \\text{WIP}_{end} = \\text{WIP}_{start} + (\\text{Inflow} - \\text{Outflow}) \\times \\text{Time} $$\nThis is like a bathtub: if water comes in faster than it drains, the level rises.\n\nUse this when:\n• A shift starts with backlog from the previous shift\n• Demand temporarily exceeds capacity\n• You need to compute how much inventory builds up during a peak period",
                dumb: "If more stuff comes in than goes out, stuff piles up. If 600 orders arrive per day but you can only process 500, after 5 days you have 500 orders sitting in a pile. It's just addition and subtraction."
            },

            // ── Resource Analysis ──
            {
                type: 'heading',
                title: "Resource Analysis (Exam Pattern)"
            },
            {
                type: 'card',
                title: "How to solve \"how many resources do we need?\"",
                official: "The 2024 exam asked how many employees and sterilization units are needed for 100 kits/day. Here is the systematic approach:\n\n1. Identify ALL resource types (employees, scales, machines)\n2. For each resource, calculate total time it spends per unit\n   — An employee doing picking (30 min) AND checking (10 min) uses 40 min/kit\n3. Compute capacity per unit: available time / usage time\n4. Compute units needed: ⌈demand / capacity per unit⌉ (round UP)\n5. Identify bottleneck: whichever needs the most units",
                dumb: "Make a table. Every column is a type of resource. Every row is a step. Fill in how many minutes each resource is used. Add up the column. Divide available time by that total. Round up (you can't hire 0.67 of a person). The resource that needs the most units is the bottleneck."
            },
            {
                type: 'card',
                title: "Utilization targets: don't run at 100%",
                official: "Running at 100% utilization means zero buffer for variability. In practice:\n\n• > 95% utilization → dangerous, any disruption cascades\n• 85-90% → acceptable for machines\n• 80-85% → target for human workers\n• < 75% → may be over-staffed (unless variability is high)\n\nIn the 2024 exam, 17 employees gave 98% utilization. The solution recommended ~20 employees (83%) as safer.",
                dumb: "If you schedule every minute of every employee's shift with zero breaks, zero hiccups, zero bathroom runs — congratulations, you've designed a system that will fail the moment someone sneezes. Leave 15-20% slack. That's not waste, that's reality."
            },
            {
                type: 'warn',
                content: "Don't forget sequencing! In the 2024 exam, if employees finish at 12:00 but sterilization takes 60 more minutes, the last kits won't be done until 13:00. Check if resources can work past the shift (e.g., unattended machines)."
            }
        ]
    },
    {
        category: "3. Inventory Management",
        items: [
            // ── Section intro ──
            {
                type: 'intro',
                content: "Inventory management answers two questions: HOW MUCH to order and WHEN to order. These are independent decisions — batch size (Q) optimizes cost, while reorder point (ROP) protects against stockouts. Understanding this separation is the key to every inventory problem."
            },

            // ── The Two Decisions ──
            {
                type: 'heading',
                title: "The Two Fundamental Decisions"
            },
            {
                type: 'card',
                title: "Decision 1: How much to order? → EOQ",
                official: "The Economic Order Quantity balances two opposing costs:\n\n• Ordering cost — fixed cost per order (setup, shipping paperwork, customs). Favors LARGE, infrequent orders.\n• Holding cost — cost of keeping inventory (capital tied up, storage, spoilage). Favors SMALL, frequent orders.\n\nAt the optimal point, ordering cost ≈ holding cost. The formula:\n$$ EOQ = \\sqrt{\\frac{2 \\times D \\times S}{v \\times i}} $$\nD = annual demand, S = ordering cost, v = unit value, i = annual holding rate.\n\nKey insight: the total cost curve is very FLAT around EOQ — a 10% error in Q only increases costs by ~0.5%. So EOQ is a good estimate, not a sacred number.",
                dumb: "If you order too much, your warehouse is full and cash is tied up in boxes nobody's using. If you order too little, you're constantly paying delivery fees and paperwork costs. EOQ finds the sweet spot. And the great news? If you guess the sweet spot wrong by a bit, it barely matters — the cost curve is super flat."
            },
            {
                type: 'tip',
                content: "Quick audit trick: if ordering cost >> holding cost, your batch is too small (order more, less often). If holding >> ordering, your batch is too large. At EOQ, they are roughly equal."
            },
            {
                type: 'card',
                title: "Decision 2: When to order? → ROP and Safety Stock",
                official: "The Reorder Point tells you WHEN to place an order:\n$$ ROP = \\bar{D}_1 \\times VP + SS $$\nWhere:\n• $\\bar{D}_1$ = average demand per period\n• VP = vulnerable period (how long you're exposed to stockout risk)\n• SS = safety stock (buffer against demand uncertainty)\n\nSafety stock formula:\n$$ SS = z \\times \\sigma_1 \\times \\sqrt{VP} $$\nWhere z comes from the desired service level (e.g., z=2.33 for 99%).\n\nWithout safety stock, you stock out ~50% of replenishment cycles.",
                dumb: "You order beer when there's still a 6-pack left in the fridge. That 6-pack is your safety stock — it covers you in case your friends drink faster than expected before the delivery arrives. The more unpredictable your friends (high σ) and the slower the delivery (long VP), the bigger your safety stock needs to be."
            },
            {
                type: 'card',
                title: "Q and SS are independent decisions",
                official: "This is critical: changing your batch size (Q) does NOT change your safety stock (SS).\n\n• Q depends on: D, S, v, i (cost optimization)\n• SS depends on: z, σ, VP (service level protection)\n\nThey share no variables. The only connection: smaller Q means more orders per year, which means more chances to stock out (but SS per cycle stays the same).",
                dumb: "How much beer you buy at once (a 6-pack vs. a case) is a different question from how many beers you keep as emergency reserves. Buying bigger doesn't mean you need more reserves. Buying smaller doesn't mean you need fewer."
            },

            // ── Vulnerable Period ──
            {
                type: 'heading',
                title: "Vulnerable Period: The #1 Exam Trap"
            },
            {
                type: 'card',
                title: "Continuous review: VP = LT",
                official: "If you monitor inventory constantly (e.g., a sensor, real-time tracking), you order the instant inventory hits the ROP. You are only exposed to uncertainty during lead time.\n$$ VP = LT $$",
                dumb: "Your smart fridge texts you the second you're low on milk. You order immediately. You only stress during the 2 days the milk is in the mail."
            },
            {
                type: 'card',
                title: "Periodic review: VP = LT + R",
                official: "If you check inventory every R periods (e.g., daily at 8 AM), you could miss a demand spike between reviews. So you must cover demand during BOTH the review gap AND lead time:\n$$ VP = LT + R $$\nThe 2024 exam had daily review (R=1 day) with LT=7 days, making VP=8.",
                dumb: "You only check the fridge on Sundays. If you run low on Monday, you won't realize it until next Sunday. PLUS it takes the mail 7 days to arrive. You need to hoard way more milk to survive this blindness. VP = 7 + 1 = 8 days, not 7."
            },
            {
                type: 'warn',
                content: "The phrase \"checks inventory daily at 8:00\" means R = 1 day. VP = LT + R, not just LT. This single mistake cost many students 5+ points on the 2024 exam. Always ask: can they order ANY time (continuous) or only at fixed intervals (periodic)?"
            },

            // ── Newsvendor ──
            {
                type: 'heading',
                title: "Newsvendor Model (Single-Period)"
            },
            {
                type: 'card',
                title: "When you only get one chance to order",
                official: "Some products can only be ordered once — seasonal goods, perishable food, fashion items, newspaper print runs. You order before knowing exact demand.\n\nThe trade-off:\n• Order too many → leftover cost (overage): $C_o = c - v$ (what you paid minus salvage value)\n• Order too few → lost profit (underage): $C_u = p - c$ (selling price minus cost)\n\nThe optimal service level (critical fractile):\n$$ \\alpha = \\frac{C_u}{C_u + C_o} $$\nThen find $z^*$ from the z-table and:\n$$ Q^* = \\mu + z^* \\times \\sigma $$",
                dumb: "If leftover Christmas trees go straight in the trash (high overage cost), buy fewer. If missing a sale means losing huge profit (high underage cost), over-order aggressively. The formula just tells you how aggressive to be based on the cost asymmetry."
            },
            {
                type: 'tip',
                content: "The newsvendor formula Q* = μ + zσ is structurally identical to safety stock: ROP = D̄₁×VP + z×σ₁×√VP. In safety stock, z comes from a CHOSEN service level. In newsvendor, z comes from the COST-OPTIMAL critical fractile. Same math, different source of z."
            },

            // ── Supplier Comparison ──
            {
                type: 'heading',
                title: "Supplier Comparison (2024 Exam Pattern)"
            },
            {
                type: 'card',
                title: "The systematic approach to comparing suppliers",
                official: "When comparing suppliers, follow this structure:\n\n1. Separate costs into:\n   • Non-differential (same regardless of Q): purchasing cost, transport per unit, SS holding\n   • Differential (depend on Q): ordering cost, cycle stock holding\n\n2. For each supplier, compute:\n   • EOQ from differential costs\n   • SS from that supplier's lead time\n   • Total annual cost = purchase + transport + ordering + cycle holding + SS holding\n\n3. Compare totals\n\nIn the 2024 exam, Portugal saved €7.4M/yr vs. US — purchasing cost difference ($200/box × 36,500 boxes = €7.3M) dominated everything else.",
                dumb: "Keep the math organized. The cost of actually BUYING the screws usually dwarfs everything else. If one supplier charges €200 less per box and you buy 36,500 boxes a year, that's €7.3M saved. Shipping and ordering cost differences are noise by comparison."
            },
            {
                type: 'tip',
                content: "Always do a reality check on EOQ. The Emmental cheese problem gave EOQ = 47 kg, but with 100 cheese types that means 2.4 tons in the store. Practical constraints (storage, perishability) can override the formula."
            }
        ]
    }
];
