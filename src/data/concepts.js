export const conceptData = [
    {
        category: "1. Queueing Theory",
        items: [
            {
                type: 'intro',
                content: "Queueing theory studies waiting lines. Every time customers wait — at a pharmacy, a call center, a checkout counter — there is a queue system at work. The goal is to understand WHY waits happen and HOW to reduce them without throwing money at the problem."
            },
            {
                type: 'heading',
                title: "What is a Queue System?"
            },
            {
                type: 'card',
                title: "The three building blocks",
                official: "Every queue system has three components:\n\n1. Arrivals — customers showing up. We measure the arrival rate: $\\lambda$ = how many arrive per hour.\n\n2. Servers — the resources that process customers. $S$ servers, each at rate $\\mu$ (customers/hr).\n\n3. Queue — where customers wait when all servers are busy.\n\nThe relationship between demand ($\\lambda$) and capacity ($S \\times \\mu$) determines everything.",
                dumb: "Picture a restaurant. People walk in (arrivals), waiters serve them (servers), and if all tables are full, people stand around the entrance looking annoyed (queue). Every queue problem is just a restaurant with different names.",
                example: {
                    story: "A local hospital runs a 24-hour pharmacy. On average, 280 prescription orders come in every day. The pharmacy employs 5 technicians, and each technician takes about 25 minutes to prepare an order. The hospital CEO wants to understand the system before making changes.",
                    translate: "**Arrivals:** 280 orders/day → $\\lambda = 280/24 = 11.67$/hr\n**Servers:** $S = 5$ technicians\n**Service rate:** 25 min/order → $\\mu = 60/25 = 2.4$/hr per server\n**Total capacity:** $5 \\times 2.4 = 12$/hr\n\nThe problem gives you daily numbers — always convert to hourly. The standard deviation matching the mean ($\\sigma = 280$) signals Poisson-like arrivals ($C_A \\approx 1$).",
                    solve: "$\\rho = 11.67/12 = 97.2\\%$ — extremely high utilization. Expect very long waits even though total capacity (12/hr) slightly exceeds demand (11.67/hr)."
                }
            },
            {
                type: 'card',
                title: "Utilization (ρ) — how busy are the servers?",
                official: "Utilization measures what fraction of available capacity is being used:\n$$ \\rho = \\frac{\\lambda}{S \\times \\mu} $$\n$\\rho = 0.75$ means servers are busy 75% of the time and idle 25%.\n\nIt must be less than 1 for the system to be stable — otherwise the queue grows forever.",
                dumb: "If a barista can make 10 coffees an hour and 8 customers show up, she's busy 80% of the time. If 12 show up? Disaster. The line never ends. You NEED slack.",
                example: {
                    story: "The Catalan distributor Serveis Hospitalaris SL receives an average of 10 phone calls per hour from hospitals placing orders. They currently have 4 operators, and each call takes about 20 minutes to complete (with a standard deviation of 5 minutes). Medcorp requires average waiting time not to exceed 3 minutes.",
                    translate: "**Arrivals:** $\\lambda = 10$ calls/hr (phone calls → assume Poisson, $C_A = 1$)\n**Servers:** $S = 4$ operators\n**Service:** $t_S = 20$ min → $\\mu = 60/20 = 3$/hr per operator\n**Variability:** $C_S = \\sigma/t_S = 5/20 = 0.25$ (operators are consistent)\n\nThe key word \"average of 10 calls per hour\" gives you $\\lambda$ directly. \"20 minutes per call\" must be converted to a rate.",
                    solve: "$\\rho = \\frac{10}{4 \\times 3} = \\frac{10}{12} = 83.3\\%$\n\nThis is high — above 80% is the \"danger zone\" where waits grow rapidly. You should immediately suspect the 3-minute SLA will not be met."
                }
            },
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
                official: "Variability is measured by:\n$$ CV = \\frac{\\sigma}{\\text{mean}} $$\nFor arrivals: $C_A$. For service: $C_S$.\n\nCommon cases:\n• \"Poisson arrivals\" → $C_A = 1$\n• \"Exponential service\" → $C_S = 1$\n• \"Deterministic\" → $C_S = 0$\n• Given $\\sigma$ and mean → compute $C_S = \\sigma / t_S$",
                dumb: "CV tells you how unpredictable something is. If every customer takes exactly 5 minutes (CV=0), life is beautiful. If some take 1 minute and others take 30, life is chaos. The exam gives you clues: 'Poisson' means CV=1, 'deterministic' means CV=0.",
                example: {
                    story: "Alex manages a supermarket with 4 checkout lines. The average service time is 12 minutes with a standard deviation of 12 minutes. He also measured express customers (fewer than 10 items): they take 5 minutes on average with a standard deviation of just 1 minute.",
                    translate: "**Regular customers:** $C_S = 12/12 = 1.0$ — high variability. Some people have 3 items, others have a full cart. Service times are all over the place.\n**Express customers:** $C_S = 1/5 = 0.2$ — very consistent. Few items = predictable checkout time.\n\nWhen $\\sigma$ equals the mean, $C_S = 1$ (exponential). When $\\sigma$ is much smaller than the mean, $C_S$ is low (consistent service).",
                    solve: "This is why a dedicated express line works well. The variability factor $\\frac{C_A^2 + C_S^2}{2}$ drops from $\\frac{1+1}{2} = 1.0$ for regular to $\\frac{1+0.04}{2} = 0.52$ for express — nearly cutting queues in half with no extra staff."
                }
            },
            {
                type: 'heading',
                title: "The Two Fundamental Laws"
            },
            {
                type: 'card',
                title: "1st Law: Higher utilization → exponentially longer waits",
                official: "As $\\rho$ approaches 100%, $L_q$ explodes:\n\n• $\\rho = 50\\%$: small queue\n• $\\rho = 80\\%$: noticeable\n• $\\rho = 90\\%$: roughly doubles from 80%\n• $\\rho = 95\\%$: doubles again\n\nIdle capacity is not waste — it is a buffer against variability.",
                dumb: "If everyone is working at 100% capacity and a tiny thing goes wrong, the whole system blows up. You pay people to stand around so that when 10 orders come in at once, they can handle it.",
                example: {
                    story: "Serveis Hospitalaris currently has 4 operators ($\\rho = 83\\%$) and average wait is 10.75 minutes — way above the 3-minute SLA. The manager asks: 'If I hire just one more operator, will it make a noticeable difference?'",
                    translate: "Going from $S = 4$ to $S = 5$ drops $\\rho$ from $83\\%$ to $67\\%$. This does not sound like a huge change — only 16 percentage points. But because of the nonlinear relationship, the effect is massive.",
                    solve: "$W_q$ drops from 10.75 min to 2.35 min — a **78% reduction**.\n\nOne extra operator, 16% less utilization, 78% less waiting. This is the 1st Law in action: small reductions in $\\rho$ near the danger zone produce enormous improvements."
                }
            },
            {
                type: 'card',
                title: "2nd Law: Higher variability → even longer waits at the same ρ",
                official: "The queue length formula includes:\n$$ \\frac{C_A^2 + C_S^2}{2} $$\nWhen $C_A = C_S = 1$, this factor is 1. When $C_S = 0.25$, it drops to 0.53 — cutting queues nearly in half.\n\nReducing variability is as powerful as adding capacity.",
                dumb: "Unpredictability is the enemy. If customers arrive like clockwork and service is precise as a robot, you barely need a waiting room. Standardize everything and the line disappears.",
                example: {
                    story: "A CEO considers replacing the pharmacy's 5 technicians (25 min/order, $\\sigma = 25$ min) with an automated dispensing machine (5 min/order, $\\sigma = 5$ min). Both setups have the same total capacity of 12 orders/hr.",
                    translate: "Both systems: $\\rho = 97.2\\%$, $C_A = 1$.\nTechnicians: $C_S = 25/25 = 1$ (high variability)\nMachine: $C_S = 5/5 = 1$ (same CV — the machine is faster but proportionally just as variable)\n\nSurprisingly, both have $C_S = 1$. The machine's advantage comes entirely from speed ($t_S = 5$ vs 25 min), not from reduced variability.",
                    solve: "At the same $\\rho$ and same $C_S$, the queue behavior is similar. The machine wins on total time ($W$) because service is 5x faster, but $W_q$ is actually slightly worse ($M/M/1$ vs $M/M/5$). Topology matters!"
                }
            },
            {
                type: 'heading',
                title: "The Queue Length Formula"
            },
            {
                type: 'card',
                title: "Putting it all together: Lq",
                official: "Combines utilization and variability:\n$$ L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} $$\nThree pieces:\n1. $\\rho^{\\sqrt{2(S+1)}}$ — the \"pressure\" from being busy\n2. $\\frac{1}{1-\\rho}$ — the explosion factor as $\\rho \\to 1$\n3. $\\frac{C_A^2 + C_S^2}{2}$ — the variability multiplier",
                dumb: "Queue length = (how busy you are) times (how unpredictable things are). High utilization + high variability = disaster. Low utilization OR low variability = manageable.",
                example: {
                    story: "Back to Alex's supermarket: 12 customers/hr arrive and split randomly among 4 checkout lines. Service takes 12 minutes on average ($\\sigma = 12$ min). Alex wants to know how many customers are typically waiting in each line.",
                    translate: "Each line is independent ($S = 1$) with:\n$\\lambda = 12/4 = 3$/hr per line\n$\\mu = 60/12 = 5$/hr\n$\\rho = 3/5 = 0.6$\n$C_A = 1$ (random arrival), $C_S = 12/12 = 1$",
                    solve: "$$L_q = \\frac{0.6^{\\sqrt{2(1+1)}}}{1-0.6} \\times \\frac{1+1}{2} = \\frac{0.6^2}{0.4} \\times 1 = 0.9 \\text{ customers per line}$$\n$W_q = 0.9/3 = 0.3$ hr $= 18$ minutes average wait."
                }
            },
            {
                type: 'card',
                title: "From Lq to everything else",
                official: "Once you have $L_q$, the rest is mechanical:\n\n• Wait time: $W_q = L_q / \\lambda$\n• Total time: $W = W_q + t_S$\n• Total in system: $L = L_q + \\rho \\times S$\n• Efficiency: $PCE = t_S / W$",
                dumb: "Once you know how many people are in line, you can figure out everything else. Divide by arrival rate to get wait time. Add service time for total. Usually depressingly small — most services are below 15% efficiency.",
                example: {
                    story: "The Chief Actuary Steve is comparing two job candidates. Cases arrive at 3/hr (Poisson). Hannah processes 6/hr (exponential). He needs to know how many cases are in the pipeline at any given time, because each case costs the firm 100/hr.",
                    translate: "$M/M/1$: $\\rho = 3/6 = 0.5$, $C_A = C_S = 1$\nHe needs $L$ (total in system), not just $L_q$ (in queue), because cases being served ALSO cost money while they tie up the pipeline.",
                    solve: "$L_q = 0.5^2/(1-0.5) = 0.5$\n$L = L_q + \\rho = 0.5 + 0.5 = 1.0$ case in system\n\nTotal cost $= 40 + 100 \\times 1.0 = 140$/hr. The waiting cost (100) is higher than her salary (40)!"
                }
            },
            {
                type: 'diagram',
                id: 'utilization-curve'
            },
            {
                type: 'heading',
                title: "Pooling Principle"
            },
            {
                type: 'card',
                title: "One queue feeding S servers always beats S separate queues",
                official: "With pooling, when one server finishes early, it immediately helps the shared queue. With separate queues, that idle capacity is wasted.\n\nSame total capacity, same total demand — but significantly less total waiting.",
                dumb: "Ever picked the slow line at the grocery store while the other line zooms? One big snake-line feeding all cashiers means no cashier ever sits idle while customers wait in another line.",
                example: {
                    story: "A customer service office has two desks on different floors — one fast representative (5 min/customer) and one slower representative (8 customers/hr). Customers arrive at 15/hr and are randomly assigned 50/50 to each desk. There is no way to create a shared queue because the desks are on different floors.",
                    translate: "This is NOT pooling — it is two separate $M/M/1$ systems.\nFast desk: $\\lambda = 7.5$, $\\mu = 12$ → $\\rho = 62.5\\%$\nSlow desk: $\\lambda = 7.5$, $\\mu = 8$ → $\\rho = 93.75\\%$\n\nThe system-level $\\rho = 75\\%$ hides a dangerous imbalance. The slow desk is near collapse while the fast desk has slack.",
                    solve: "Fast: $L_q = 1.04$. Slow: $L_q = 14.06$. Total: **15.1 people waiting**.\n\nFix without more resources: route 60% to fast, 40% to slow (equalizing $\\rho = 75\\%$ on both). Or better: find a way to create one shared queue."
                }
            },
            {
                type: 'tip',
                content: "Pooling is operationally optimal but may not be strategically best. Separating queues (express lanes, VIP) sacrifices efficiency for differentiation. The exam tests whether you argue BOTH sides."
            },
            {
                type: 'heading',
                title: "Strategic Triangle"
            },
            {
                type: 'card',
                title: "Cost — Range — Service: pick two",
                official: "No firm can simultaneously minimize cost (high $\\rho$), offer maximum product range (high $C_S$), and guarantee fast service (low $W_q$). Queueing theory formalizes this impossibility.\n\nExam Part IV (strategic) often tests this tension.",
                dumb: "\"Cheap, Fast, Good — pick two.\" You can't be McDonald's (cheap/fast, but small menu) AND a fine-dining 10-course restaurant (variety, quality, but slow and expensive).",
                example: {
                    story: "Medcorp's Boston headquarters hired consultants to improve European operations. Their proposal: close all 25 country warehouses, centralize inventory in a Brussels hub, and deliver directly to hospitals via an express transport company within 48 hours. They called it \"Red Carpet.\" In Spain, sales dropped 60% in one month.",
                    translate: "The consultants optimized for **cost** (pooling reduces safety stock by $\\sqrt{25} = 5\\times$, eliminating distributors saves 15% margin) and **efficiency** (one warehouse, one carrier). But they sacrificed **service** (express carriers did not know how to navigate hospitals) and **relationships** (distributors were the ones who actually drove demand).",
                    solve: "Cost savings were real on paper: 5x less safety stock, no distributor margin, transport economies. But revenue dropped 60% — making all savings irrelevant.\n\nLesson: the strategic triangle cannot be optimized on one axis alone. The exam expects you to argue both pros AND cons."
                }
            }
        ]
    },
    {
        category: "2. Capacity Analysis",
        items: [
            {
                type: 'intro',
                content: "Capacity analysis asks: do we have enough resources to meet demand? Unlike queueing (which focuses on waiting), capacity analysis focuses on throughput — how much can we produce, and what limits us?"
            },
            {
                type: 'heading',
                title: "Key Definitions"
            },
            {
                type: 'card',
                title: "Capacity, Throughput, and Throughput Time",
                official: "Three terms:\n\n• Capacity — the MAXIMUM a resource can produce per unit of time.\n• Throughput (TH) — how much is ACTUALLY produced. Always $\\leq$ capacity.\n• Throughput Time (TT) — the time ONE unit spends inside the system.",
                dumb: "Capacity is how fast you COULD work. Throughput is how fast you ACTUALLY work. Throughput time is how long each burger takes from raw patty to served plate.",
                example: {
                    story: "Medcorp's Madrid warehouse operates from 8:00 to 12:00 (4 hours). Each employee picks components (30 min), checks them on a precision scale (10 min), then loads the sterilization unit (takes seconds). The employee does the first two tasks. How much can one employee produce?",
                    translate: "One employee spends $30 + 10 = 40$ min per kit.\nAvailable time: $4 \\times 60 = 240$ min/shift.\n\n\"The employee does the first two tasks\" → the employee is ONE resource type that uses 40 min per unit. The scale and sterilization unit are separate resources.",
                    solve: "Capacity per employee $= 240/40 = 6$ kits/shift.\nFor 100 kits: $\\lceil 100/6 \\rceil = 17$ employees needed."
                }
            },
            {
                type: 'card',
                title: "Bottleneck — the resource that limits everything",
                official: "The bottleneck is the resource with the LOWEST capacity relative to demand.\n\n1. List every resource type\n2. For each: capacity = available time / time per unit\n3. Lowest capacity = bottleneck\n\nAdding capacity to a NON-bottleneck does NOT increase output.",
                dumb: "The slowest station on the assembly line dictates how many units you make per day. Yelling at the fast stations to work faster does literally nothing. Find the slow station and fix IT.",
                example: {
                    story: "Continuing the warehouse: employees handle 6 kits/shift each, precision scales handle 24 kits/shift each, and sterilization units handle only 4 kits/shift each. The warehouse needs to prepare 100 kits per day.",
                    translate: "Three resource types with different throughputs:\n• Employee: 6 kits/shift → need $\\lceil 100/6 \\rceil = 17$\n• Scale: 24 kits/shift → need $\\lceil 100/24 \\rceil = 5$\n• Sterilizer: 4 kits/shift → need $\\lceil 100/4 \\rceil = 25$\n\nThe resource needing the MOST units is the bottleneck.",
                    solve: "**Sterilization** is the bottleneck (25 units vs 17 employees vs 5 scales). Even if you hired 50 employees, you cannot exceed 100 kits without 25 sterilization units.\n\nPractical note: 17 employees = 98% utilization. Better to have ~20 (83%) for real-world variability."
                }
            },
            {
                type: 'heading',
                title: "Little's Law"
            },
            {
                type: 'card',
                title: "WIP = TH × TT — the universal connector",
                official: "Little's Law connects three quantities:\n$$ \\text{WIP} = \\text{TH} \\times \\text{TT} $$\nUniversal — works for ANY stable system with NO assumptions. If you know any two, find the third.",
                dumb: "If you throw 10 burgers into the fryer every minute and each takes 2 minutes to cook, there are 20 burgers in the fryer right now. Math is magic.",
                example: {
                    story: "A busy tapas restaurant in Barcelona serves 200 customers per day. At any given moment, you can count about 25 customers inside (eating, waiting for food, paying). The owner wants to know: on average, how long does a customer spend in my restaurant?",
                    translate: "We know TH (200/day) and WIP (25 customers). We need TT.\n$\\text{TT} = \\text{WIP} / \\text{TH}$\n\nNo need to track individual customers with a stopwatch — Little's Law gives you the average from aggregate numbers.",
                    solve: "$TT = 25/200 = 0.125$ days $= 3$ hours.\n\nSanity check: a 3-hour dinner at a tapas restaurant? In Barcelona? That sounds about right."
                }
            },
            {
                type: 'tip',
                content: "Little's Law is your best friend for sanity checks. If throughput time is 5 hours, throughput is 20/hr, then WIP should be 100. If the numbers don't multiply out, something is wrong."
            },
            {
                type: 'heading',
                title: "Bathtub Formula"
            },
            {
                type: 'card',
                title: "Tracking WIP over time when inflow ≠ outflow",
                official: "When input rate $\\neq$ output rate, WIP changes:\n$$ \\text{WIP}_{end} = \\text{WIP}_{start} + (\\text{Inflow} - \\text{Outflow}) \\times \\text{Time} $$",
                dumb: "If more stuff comes in than goes out, stuff piles up. If 600 orders arrive per day but you process 500, after 5 days you have 500 orders piling up.",
                example: {
                    story: "During the holiday season, a toy factory receives 600 orders per day but can only produce 500 per day. The season lasts 10 days. The warehouse starts empty. Management asks: how bad will the backlog get?",
                    translate: "Inflow = 600/day, Outflow = 500/day, Time = 10 days, Starting WIP = 0.\nThis is a straightforward bathtub problem: demand exceeds capacity for a known duration.",
                    solve: "$\\text{WIP}_{end} = 0 + (600 - 500) \\times 10 = 1{,}000$ orders backlog.\n\nAfter the season (demand drops to normal), the factory will need $1000/500 = 2$ extra days to clear the backlog — IF they work at full capacity with no new orders."
                }
            },
            {
                type: 'heading',
                title: "Utilization Targets"
            },
            {
                type: 'card',
                title: "Don't run at 100%",
                official: "Running at 100% = zero buffer for variability.\n\n• > 95%: dangerous\n• 85-90%: acceptable for machines\n• 80-85%: target for human workers",
                dumb: "If you schedule every minute of every employee's shift with zero breaks, zero hiccups — congratulations, you've designed a system that fails the moment someone sneezes. Leave 15-20% slack.",
                example: {
                    story: "The warehouse calculation says 17 employees are needed for 100 kits (98% utilization). On Tuesday, one employee calls in sick and another takes 15 minutes longer on one kit because a screw was missing from the picking station.",
                    translate: "At 98%, there is zero buffer. One absence reduces capacity from 102 (17 × 6) to 96 kits — below the 100-kit target. A single slow kit creates a cascading delay because nobody has slack to absorb it.",
                    solve: "With 20 employees: capacity = 120 kits, $\\rho = 100/120 = 83\\%$. One absence → 114 kits capacity (still above 100). Random slowdowns absorbed by idle time.\n\nThe exam rewards you for mentioning this practical consideration."
                }
            },
            {
                type: 'warn',
                content: "Don't forget sequencing! If employees finish at 12:00 but sterilization takes 60 more minutes, the last kits won't be done until 13:00. Check if resources can work past the shift."
            }
        ]
    },
    {
        category: "3. Inventory Management",
        items: [
            {
                type: 'intro',
                content: "Inventory management answers two questions: HOW MUCH to order and WHEN to order. These are independent decisions — batch size (Q) optimizes cost, while reorder point (ROP) protects against stockouts."
            },
            {
                type: 'heading',
                title: "The Two Fundamental Decisions"
            },
            {
                type: 'card',
                title: "Decision 1: How much to order? → EOQ",
                official: "Balances ordering cost (favors large batches) against holding cost (favors small batches). At the optimum, ordering cost $\\approx$ holding cost.\n$$ EOQ = \\sqrt{\\frac{2DS}{vi}} $$\nThe cost curve is very FLAT around EOQ — a 10% error in $Q$ only increases costs by ~0.5%.",
                dumb: "If you order too much, your warehouse is full and cash is tied up. If you order too little, you're constantly paying delivery fees. EOQ finds the sweet spot. And if you guess wrong by a bit, it barely matters.",
                example: {
                    story: "A drug store chain needs 3,000 cartons of aspirin per year. They can subcontract bottling: 1,000 per order fixed cost, 50 per carton. Or buy prepackaged: 10 per order, 60 per carton. Annual holding cost is 30% of unit price.",
                    translate: "Two suppliers → compute EOQ for each, then compare TOTAL cost.\nSubcontract: $D = 3000$, $S = 1000$, $v = 50$, $i = 0.30$\nPrepackaged: $D = 3000$, $S = 10$, $v = 60$, $i = 0.30$\n\nHigh $S$ + low $v$ → large infrequent orders. Low $S$ + high $v$ → small frequent orders.",
                    solve: "Subcontract: $EOQ = \\sqrt{2 \\times 3000 \\times 1000 / (50 \\times 0.30)} = 632$ cartons (order every 77 days). Total = $159{,}487$.\nPrepackaged: $EOQ = 58$ cartons (order every 7 days). Total = $181{,}039$.\n\nSubcontract wins by ~$21{,}500$/yr — the lower unit price dominates."
                }
            },
            {
                type: 'tip',
                content: "Quick audit trick: if ordering cost >> holding cost, your batch is too small. If holding >> ordering, your batch is too large. At EOQ, they should be roughly equal."
            },
            {
                type: 'diagram',
                id: 'eoq-cost-curve'
            },
            {
                type: 'card',
                title: "Decision 2: When to order? → ROP and Safety Stock",
                official: "$ROP = \\bar{D}_1 \\times VP + SS$\n\nSafety stock: $SS = z \\times \\sigma_1 \\times \\sqrt{VP}$\n\nWhere $z$ comes from the service level (99% → $z = 2.33$).\n\nWithout safety stock, you stock out ~50% of cycles.",
                dumb: "You order beer when there's still a 6-pack left in the fridge. That 6-pack is your safety stock — it covers you in case friends drink faster than expected before the delivery arrives.",
                example: {
                    story: "Frozen Delights makes ice cream with an average demand of 80 liters/day ($\\sigma = 20$). Manufacturing can be started at any time and takes 1 day (lead time). They want a 99% service level — meaning only a 1% chance of running out during any replenishment cycle.",
                    translate: "\"Can be started at any time\" = continuous review → $VP = LT = 1$ day.\n$\\bar{D}_1 = 80$, $\\sigma_1 = 20$, $z(99\\%) = 2.33$.\n\nThe key phrase to identify: \"at any time\" means no review period to add. If it said \"checked daily at 8 AM,\" you would need $VP = LT + R$.",
                    solve: "$SS = 2.33 \\times 20 \\times \\sqrt{1} = 46.6 \\approx 47$ liters\n$ROP = 80 \\times 1 + 47 = 127$ liters\n\nWhen inventory hits 127 liters, start manufacturing. The 47-liter buffer covers the 1% worst-case demand spike during the 1-day lead time."
                }
            },
            {
                type: 'card',
                title: "Q and SS are independent decisions",
                official: "Changing $Q$ does NOT change $SS$.\n\n$Q$ depends on: $D$, $S$, $v$, $i$ (cost)\n$SS$ depends on: $z$, $\\sigma$, $VP$ (service)\n\nThey share no variables.",
                dumb: "How much beer you buy at once is a different question from how many beers you keep as emergency reserves. Buying bigger doesn't mean you need more reserves.",
                example: {
                    story: "Frozen Delights currently orders 800 liters (10-day supply). The optimal EOQ is 2,790 liters. The manager asks: 'If I switch to the larger batch, do I need to increase my safety stock?'",
                    translate: "Check the SS formula: $SS = z \\times \\sigma \\times \\sqrt{VP}$.\nDoes $z$ change? No (still 99%). Does $\\sigma$ change? No (still 20). Does $VP$ change? No (still 1 day).\nNothing in the SS formula depends on $Q$.",
                    solve: "SS stays at 47 liters regardless of batch size.\n\nBUT: stockout frequency changes. With $Q = 800$ you place $29200/800 = 36.5$ orders/yr → $0.01 \\times 36.5 = 0.37$ stockouts/yr (every ~3 years). With $Q = 2790$ → $10.5$ orders/yr → $0.10$ stockouts/yr (every ~10 years)."
                }
            },
            {
                type: 'heading',
                title: "Vulnerable Period: The #1 Exam Trap"
            },
            {
                type: 'card',
                title: "Continuous review: VP = LT",
                official: "If you monitor inventory constantly, you order the instant it hits ROP. Exposure = lead time only.\n$VP = LT$",
                dumb: "Your smart fridge texts you the second you're low on milk. You only stress during the 2 days the milk is in the mail.",
                example: {
                    story: "A cheese store continuously monitors its Emmental stock. The supplier delivers in 4 days. The owner orders 10 kg whenever stock falls below 5 kg.",
                    translate: "\"Continuously checked\" = continuous review → $VP = LT = 4$ days.\nCurrent SS $= ROP - \\bar{D} \\times VP = 5 - 1 \\times 4 = 1$ kg.\n\nFrom this we can reverse-engineer: $z = 1/(0.5 \\times \\sqrt{4}) = 1.0$ → only 84% service level.",
                    solve: "The store has a 15.9% chance of running out each order cycle. With 36.5 cycles/year, expect ~6 stockouts/year. For 99% SL: $z = 2.33$, $SS = 2.33$ kg, $ROP = 6.33$ kg."
                }
            },
            {
                type: 'card',
                title: "Periodic review: VP = LT + R",
                official: "If you check every $R$ periods, you could miss a demand spike between reviews.\n$VP = LT + R$\n\nThe 2024 exam: daily review ($R = 1$) with $LT = 7$ → $VP = 8$.",
                dumb: "You only check the fridge on Sundays. If you run low on Monday, you won't realize until next Sunday PLUS the delivery time. You need to hoard way more milk.",
                example: {
                    story: "Medcorp Spain checks inventory levels and places orders every morning at 8:00. Their US supplier has a 7-day lead time. The question asks for the inventory policy for titanium screws.",
                    translate: "\"Every morning at 8:00\" = periodic review with $R = 1$ day.\n$VP = LT + R = 7 + 1 = 8$ days.\n\n**This is the trap.** If you use $VP = 7$ (forgetting the review period), your safety stock is too low and your ROP is wrong. This single mistake cost many students 5+ points on the 2024 exam.",
                    solve: "$SS = 2.33 \\times 30 \\times \\sqrt{8} = 198$ boxes (vs 185 if you wrongly used $VP = 7$).\n$ROP = 100 \\times 8 + 198 = 998$ boxes.\n\nPolicy: order 382 boxes whenever inventory position falls below 998 boxes. Check daily at 8 AM."
                }
            },
            {
                type: 'warn',
                content: "The phrase 'checks inventory daily at 8:00' means R = 1 day. VP = LT + R, not just LT. Always ask: can they order ANY time (continuous) or only at fixed intervals (periodic)?"
            },
            {
                type: 'heading',
                title: "Newsvendor Model (Single-Period)"
            },
            {
                type: 'card',
                title: "When you only get one chance to order",
                official: "One ordering opportunity, uncertain demand.\n\n$C_u = p - c$ (underage cost)\n$C_o = c - v$ (overage cost)\n\n$$\\alpha = \\frac{C_u}{C_u + C_o}$$\n$$Q^* = \\mu + z^* \\times \\sigma$$",
                dumb: "If leftover Christmas trees go in the trash (high overage cost), buy fewer. If missing a sale means huge lost profit (high underage cost), over-order aggressively.",
                example: {
                    story: "A Barcelona bakery makes fresh croissants each morning. They sell for 3 each and cost 1 to make. Unsold croissants are thrown away at the end of the day (no salvage value). Daily demand averages 100 with a standard deviation of 20. How many should they bake?",
                    translate: "Single-period problem: bake once in the morning, cannot rebake during the day.\n$C_u = 3 - 1 = 2$ (missed profit per croissant not baked)\n$C_o = 1 - 0 = 1$ (wasted cost per unsold croissant)\n\nUnderage hurts 2x more than overage → lean towards over-ordering.",
                    solve: "$\\alpha = 2/(2+1) = 0.667$\n$z^* = \\Phi^{-1}(0.667) \\approx 0.43$\n$Q^* = 100 + 0.43 \\times 20 = 108.6 \\approx 109$ croissants.\n\nBake 109 — about 9% above average demand. The asymmetric costs push you above the mean."
                }
            },
            {
                type: 'card',
                title: "What is Φ⁻¹ and how to use the z-table",
                official: "$\\Phi^{-1}$ is the inverse of the standard Normal CDF. It converts a probability into a z-value.\n\nYou need this because the newsvendor formula gives you $\\alpha$ (a probability like 0.667), but $Q^* = \\mu + z \\times \\sigma$ needs a z-value. $\\Phi^{-1}(\\alpha)$ answers: \"what z-value has $\\alpha$ probability to its left on the Normal curve?\"\n\nHow to look it up on the exam cheat sheet:\n1. Compute $\\alpha$ from costs\n2. Go to the z-table (pages 9-10 of the exam)\n3. Scan the table body for the value closest to $\\alpha$\n4. Read the z-value from the row and column headers\n\nFor safety stock, you do the same thing but in reverse: the service level (e.g., 99%) IS the probability, and you look up z directly. The shortcut table gives you the common ones: 90% → 1.28, 95% → 1.64, 99% → 2.33.",
                dumb: "The z-table is just a two-way lookup. For safety stock: you PICK the service level (99%), look up z (2.33), done — the shortcut table has the common values. For newsvendor: you COMPUTE the service level from costs (maybe 0.667), then scan the FULL table to find what z corresponds to 0.667. Same table, different starting point.",
                example: {
                    story: "The bakery computed $\\alpha = 0.667$. You open the exam cheat sheet to the z-table. You need to find the z-value where the cumulative probability equals 0.667.",
                    translate: "Scan the z-table body (page 10, positive z-values) for the value closest to 0.667.\n\nLook at $z = 0.4$ row: the column $+0.03$ gives 0.66640. That is the closest to 0.667.\nSo $z^* \\approx 0.43$.\n\nFor comparison, the shortcut table only lists 90%, 95%, 99%, 99.9% — it does NOT have 66.7%. That is why you need the full table for newsvendor problems.",
                    solve: "$z^* = \\Phi^{-1}(0.667) \\approx 0.43$\n$Q^* = 100 + 0.43 \\times 20 = 108.6 \\approx 109$ croissants.\n\nIf $\\alpha$ had been 0.80 instead, you would find $z = 0.84$ from the table (row 0.8, column +0.04 gives 0.7995 $\\approx$ 0.80)."
                }
            },
            {
                type: 'tip',
                content: "The newsvendor formula Q* = μ + zσ is structurally identical to safety stock: ROP = D̄₁×VP + z×σ₁×√VP. In safety stock, z comes from a chosen service level. In newsvendor, z comes from the cost-optimal critical fractile."
            },
            {
                type: 'heading',
                title: "Supplier Comparison (2024 Exam Pattern)"
            },
            {
                type: 'card',
                title: "Separate differential from non-differential costs",
                official: "For each supplier:\n1. Non-differential costs (purchasing, transport per unit)\n2. EOQ from differential costs\n3. SS from that supplier's LT\n4. Add ALL costs\n5. Compare",
                dumb: "The cost of actually buying the screws usually dwarfs everything else. If one supplier is significantly cheaper per unit, they almost always win.",
                example: {
                    story: "Medcorp can buy titanium screws from the US (500/box, 100/order, LT=7 days, transport 10/box via FedEx) or Portugal (300/box, 150/order, LT=1 day, transport 7.50/box via truck). Daily demand = 100 boxes ($\\sigma = 30$). Holding cost = 10% of box value. Inventory checked daily. Which supplier should they use?",
                    translate: "For each supplier, compute:\n1. **Purchasing:** unit price × annual demand (this is usually the biggest number)\n2. **Transport:** per-box rate × annual demand\n3. **Safety stock:** depends on VP = LT + R (periodic review!)\n4. **EOQ:** from ordering cost and holding cost\n5. **Sum everything**\n\nThe 200/box price difference × 36,500 boxes = 7.3M/yr. This will dominate.",
                    solve: "US total: $18{,}644{,}005$/yr.\nPortugal total: $11{,}244{,}845$/yr.\n\n**Portugal saves ~7.4M/yr.** The unit price difference ($200 \\times 36{,}500$) is $7.3M$ alone. Ordering and holding differences are rounding errors.\n\nPolicy: order 604 boxes from Portugal when inventory falls below 299. Check daily at 8 AM."
                }
            }
        ]
    }
];
