export const examGuide = [
  // ════════════════════════════════════════════
  // QUEUEING GYM
  // ════════════════════════════════════════════
  {
    id: 'eg-q1',
    section: 'OM Gym — Queueing',
    title: 'Exercise 1: Customer Service',
    badge: 'Queueing',
    badgeType: 'queue',
    originalExcerpt: `Customers arrive to a customer service office at a rate of 15 customers/hr. At this office there are 2 desks, one served by a fast representative that spends on average 5 minutes per customer, and the other is served by a slower representative that can process 8 customers/hr. At the office, each desk is on a different floor so there is no physical way of having only one queue. Currently, the customers are assigned randomly with equal probability to a specific desk upon arrival.\n\nQuestion(s):\n1. What is the utilization rate of the system?\n2. What is the expected number of people waiting for a representative?\n3. How can we improve the performance of the system without using more resources?`,
    storyline: `Customers arrive to a customer service office at a rate of 15 customers/hr. Two desks on different floors (no shared queue possible). Fast rep: 5 min/customer. Slow rep: processes 8 customers/hr. Customers are randomly assigned 50/50 to each desk.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a queueing problem. Two desks on different floors means there is no shared queue — so we are dealing with two separate $M/M/1$ systems, not a pooled system.',
        '**Extract the data:** Total arrivals $\\lambda = 15$/hr, split 50/50 → each desk gets $7.5$/hr. Fast desk: $t_S = 5$ min → $\\mu = 12$/hr. Slow desk: $\\mu = 8$/hr (given directly).',
        '**Assumptions:** No info on variability, so assume $C_A = C_S = 1$ (the standard assumption when nothing is stated). This makes it a classic $M/M/1$.',
        '**Watch out:** System-level utilization (75%) looks fine, but individual desk utilization can be wildly different. The slow desk at 94% is the real problem.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the utilization rate of the system?',
        steps: [
          { insight: 'System utilization = total demand / total capacity. But be careful — individual desk utilizations can be very different.', work: '$\\text{Total capacity} = 12 + 8 = 20$ customers/hr\n$$\\rho_{\\text{system}} = \\frac{\\lambda}{\\text{capacity}} = \\frac{15}{20} = 0.75 = 75\\%$$', result: '$\\rho_{\\text{system}} = 75\\%$' },
        ],
      },
      {
        question: 'What is the expected number of people waiting for a representative?',
        steps: [
          { insight: 'Even though the system is at 75%, individual desks tell a very different story. The slow desk gets the same arrival rate but has lower capacity — it is dangerously overloaded.', work: '$\\text{Fast desk: } \\rho = 7.5/12 = 62.5\\%$\n$\\text{Slow desk: } \\rho = 7.5/8 = 93.75\\%$ ← danger zone!', result: null },
          { insight: 'Use the $M/M/1$ formula for each desk. Notice how a small increase in $\\rho$ causes an explosion in $L_q$ — this is the nonlinear nature of queues.', work: '$$L_q = \\frac{\\rho^2}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2}$$\n$\\text{Fast desk: } L_q = \\frac{0.625^2}{0.375} \\times 1 = 1.04$\n$\\text{Slow desk: } L_q = \\frac{0.9375^2}{0.0625} \\times 1 = 14.06$', result: '$L_q^{\\text{total}} = 1.04 + 14.06 = 15.1$ people waiting' },
        ],
      },
      {
        question: 'How can we improve the performance of the system without using more resources?',
        steps: [
          { insight: 'The root cause is unbalanced utilization: 94% vs 63%. We can fix this by changing routing probabilities to equalize $\\rho$.', work: '$\\text{Target: } \\rho_{\\text{fast}} = \\rho_{\\text{slow}} = 0.75$\n$\\text{Fast desk: } \\lambda = 0.75 \\times 12 = 9$ → route 60% of arrivals\n$\\text{Slow desk: } \\lambda = 0.75 \\times 8 = 6$ → route 40% of arrivals', result: 'Route 60% to fast desk, 40% to slow desk. Or better: create a single pooled queue.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** System-level $\\rho$ can hide dangerous imbalances. Always check utilization at each individual resource — the slow desk at 94% was the real problem.',
      '**Tip:** If you see separate queues in a problem, immediately think about pooling. A single shared queue feeding all servers almost always reduces total waiting.',
      '**Exam pattern:** When asked "how to improve without more resources," think about rebalancing (routing probabilities) or pooling — not hiring.',
    ],
  },

  {
    id: 'eg-q2',
    section: 'OM Gym — Queueing',
    title: 'Exercise 2: 24 Hrs. Pharmacy',
    badge: 'Queueing',
    badgeType: 'queue',
    originalExcerpt: `A local hospital has a 24 hrs. fully staffed pharmacy. In average, the pharmacy must handle 280 orders every day (standard deviation of 280 orders). There are 5 employees preparing the orders, and it takes about 25 minutes to have each order ready (standard deviation of 25 minutes).\n\nThe CEO is considering whether it will be good for the patient's safety to buy an automatic dispenser for the pharmacy. The machine takes an average of 5 minutes per order (standard deviation of 5 minutes).\n\nQuestion(s):\n1. Compute the average waiting time in queue and the average service time considering the current situation.\n2. What is the impact of replacing the employees with the automatic machine?`,
    storyline: `A hospital pharmacy runs 24 hours. Handles 280 orders/day ($\\sigma = 280$). 5 employees, each takes 25 min/order ($\\sigma = 25$ min). CEO considers replacing all 5 with one automatic machine: 5 min/order ($\\sigma = 5$ min).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a comparison between two system designs — 5 slow humans vs. 1 fast machine. Both have the same total capacity, so the question is: does the number of servers matter?',
        '**Extract the data:** The pharmacy runs 24 hours, so convert daily to hourly: $\\lambda = 280/24 = 11.67$/hr. The standard deviation equals the mean ($\\sigma = 280$), which signals $C_A \\approx 1$ (Poisson-like).',
        '**Frame the comparison:** Current = $M/M/5$ (5 servers, each at $\\mu = 2.4$/hr). Machine = $M/M/1$ (1 server at $\\mu = 12$/hr). Total capacity is 12/hr in both cases, so $\\rho = 97.2\\%$ in both.',
        '**Watch out:** Same $\\rho$ does NOT mean same performance. At 97% utilization, 5 pooled servers handle variability much better than 1 server. But the machine has a huge advantage in service time ($t_S = 5$ vs 25 min).',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the average waiting time in queue and the average service time considering the current situation.',
        steps: [
          { insight: 'With 5 servers, $C_S = \\sigma/t_S = 25/25 = 1$, this is an $M/M/5$ system.', work: '$\\mu = 60/25 = 2.4$ orders/hr per server\n$\\text{Total capacity} = 5 \\times 2.4 = 12$ orders/hr\n$$\\rho = \\frac{11.67}{12} = 97.2\\%$$', result: null },
          { insight: 'At 97% utilization with 5 servers, use the $M/M/S$ queueing results.', work: '$W_q = 2.79$ hrs\n$t_S = 25/60 = 0.417$ hrs\n$$W = W_q + t_S = 2.79 + 0.417 = 3.21 \\text{ hrs}$$', result: '$W_q = 2.79$ hrs, $W = 3.21$ hrs' },
        ],
      },
      {
        question: 'What is the impact of replacing the employees with the automatic machine?',
        steps: [
          { insight: 'The machine is 5× faster, so one machine has the **same total capacity** as 5 employees. But the topology changes from $M/M/5$ to $M/M/1$.', work: '$\\mu = 60/5 = 12$ orders/hr (1 server)\n$\\rho = 11.67/12 = 97.2\\%$ ← same utilization!\n$C_S = 5/5 = 1$', result: null },
          { insight: 'Despite identical utilization, the outcomes differ because of topology.', work: '$W_q = 2.91$ hrs (slightly worse than $M/M/5$!)\n$t_S = 5/60 = 0.083$ hrs\n$$W = 2.91 + 0.083 = 3.0 \\text{ hrs}$$\n$\\text{Savings: } 3.21 - 3.0 = 0.21$ hrs $= 12.6$ min faster', result: '$W$ drops by 12.6 min. But $W_q$ is actually slightly *worse* — the gain comes entirely from faster service, not less waiting.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Same total capacity does NOT mean same queue performance. At high $\\rho$, multiple slow servers ($M/M/5$) handle variability better than one fast server ($M/M/1$).',
      '**Tip:** When comparing system designs, separate $W_q$ (waiting) from $t_S$ (service time). The machine won on total time $W$ only because service was 5× faster — the actual queue was slightly worse.',
      '**Exam pattern:** If a problem gives you two systems with the same $\\rho$, the exam is testing whether you understand that topology (number of servers) matters.',
    ],
  },

  {
    id: 'eg-q3',
    section: 'OM Gym — Queueing',
    title: 'Exercise 3: A Hiring Decision',
    badge: 'Queueing + Cost',
    badgeType: 'queue',
    originalExcerpt: `The Chief Actuary, Steve, at a boutique reinsurance firm is asked to evaluate two potential candidates, Hannah and Elaine, for a vacant associate actuarial position. Hannah, who can underwrite an exponential rate of 6 cases per hour, has asked for an hourly salary of $40. Elaine, on the other hand, can process an exponential rate of 7 cases per hour, and intends to use this advantage to negotiate her salary.\n\nLet's denote Elaine's hourly salary as $x for now. Steve estimates that, on average, each case incurs a waiting cost of $100 per hour to the firm while it remains in the pipeline and should be accounted for in the hiring decision.\n\nQuestion(s):\nIf the sales department generates cases at a Poisson rate of 3 per hour, determine the following:\n1. What is the total labor and case waiting cost per hour to the firm if Hannah is hired (denoted C_H)? What about Elaine (denoted C_E)?\n2. Suppose Steve's hiring decision is based on minimizing total labor and case waiting cost per hour. What salary range can Elaine tell Steve if she knows Hannah has asked for $40 per hour?`,
    storyline: `A reinsurance firm is hiring. Hannah: $\\mu = 6$/hr, salary 40/hr. Elaine: $\\mu = 7$/hr, salary $x$/hr. Each case in the pipeline costs the firm 100/hr. Cases arrive at Poisson rate $\\lambda = 3$/hr.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is NOT just a queueing problem — it is a cost optimization. You need to compare total cost (salary + waiting cost) for each candidate.',
        '**Extract the data:** "Poisson arrivals" and "exponential service" are code words for $M/M/1$ ($C_A = C_S = 1$). $\\lambda = 3$/hr. Hannah: $\\mu = 6$, salary 40. Elaine: $\\mu = 7$, salary $x$.',
        '**Key formula:** Total cost = salary + 100 $\\times$ $L$ (cases in system). Use $L = \\rho/(1-\\rho)$ for $M/M/1$. The waiting cost uses $L$ (total in system), not $L_q$ (only in queue), because cases being served still cost money.',
        '**Strategy:** Compute both costs, then set $C_E \\leq C_H$ to find Elaine\'s maximum salary.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the total labor and case waiting cost per hour if Hannah is hired (C_H)? What about Elaine (C_E)?',
        steps: [
          { insight: 'For $M/M/1$: $L = \\rho/(1-\\rho)$. Total cost = salary + $100 \\times L$.', work: '**Hannah:** $\\rho = 3/6 = 0.5$\n$L = 0.5 / (1 - 0.5) = 1.0$\n$$C_H = 40 + 100 \\times 1.0 = 140 \\text{ per hr}$$', result: '$C_H = 140$ per hr' },
          { insight: 'Elaine is faster, so fewer cases pile up in the system, meaning lower waiting cost. But her salary is unknown ($x$).', work: '**Elaine:** $\\rho = 3/7 = 0.429$\n$L = 0.429 / (1 - 0.429) = 0.75$\n$$C_E = x + 100 \\times 0.75 = x + 75 \\text{ per hr}$$', result: '$C_E = (x + 75)$ per hr' },
        ],
      },
      {
        question: 'What salary range can Elaine request?',
        steps: [
          { insight: 'Steve picks whoever is cheaper. Elaine gets the job if $C_E \\leq C_H$.', work: '$$x + 75 \\leq 140$$\n$$x \\leq 65 \\text{ per hr}$$', result: 'Elaine can ask up to $65$/hr — that is $25$ MORE than Hannah, because her speed saves $25$/hr in waiting costs.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Faster service has a dollar value. Elaine can charge 25 more per hour because her speed saves 25/hr in waiting costs. Speed is not free — and its value can be calculated.',
      '**Tip:** When a problem mentions "waiting cost per unit of time," the total cost formula is: salary + waiting cost × $L$ (total in system, not just in queue). Cases being served also tie up capital.',
      '**Exam pattern:** "Poisson" + "exponential" = $M/M/1$ with $C_A = C_S = 1$. This simplifies $L_q$ to $\\rho^2/(1-\\rho)$ and $L$ to $\\rho/(1-\\rho)$.',
    ],
  },

  {
    id: 'eg-q4',
    section: 'OM Gym — Queueing',
    title: 'Exercise 4: Express Checkout',
    badge: 'Queueing + Strategy',
    badgeType: 'queue',
    originalExcerpt: `A supermarket chain is evaluating the possibility of introducing an "express line". The idea is to dedicate the use of one of the existing lines to customers carrying less than 10 items. Alex, the manager of the supermarket, before implementing the change decides to collect some information on the current process. After measuring the performance of his cashiers, he realized that customers split randomly among the 4 lines and that they almost never switch lines after joining one. The supermarket received 12 customers/hr. The average service time was 12 minutes with a standard deviation of 12 minutes.\n\nAlex also characterized the service time for customers carrying less than 10 items. He discovered that 50% of all customers qualified for the "express line" and that the average service time for them was 5 minutes, with a standard deviation of 1 minute.\n\nQuestion(s):\n1. Compute the service performance for the current situation.\n2. How will be the service for the "express line" customers if Alex decides to implement the dedicated line?\n3. Imagine that you are the manager of the store, will you implement the dedicated line? Why?`,
    storyline: `A supermarket has 4 checkout lines, customers split randomly. $\\lambda = 12$/hr, $t_S = 12$ min ($\\sigma = 12$). 50% of customers qualify for express: $t_S = 5$ min ($\\sigma = 1$). Alex considers dedicating 1 of the 4 lines to express customers.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a pooling vs. dedication trade-off. Currently 4 identical lines (all customers mixed). The proposal: dedicate 1 line to express customers (< 10 items).',
        '**Current setup:** 4 separate lines, random split → each gets $\\lambda = 3$/hr. $\\mu = 5$/hr. $C_S = 12/12 = 1$. This is four independent $M/G/1$ systems.',
        '**Express line analysis:** Express customers have very consistent service ($\\sigma = 1$ min, so $C_S = 0.2$). Low variability makes dedicated lines work well — the queue length formula drops by nearly half.',
        '**Watch out:** You must check what happens to the regular customers too. Removing express customers changes the average service time for the remaining 3 lines. Use the mixture formula: $12 = 0.5 \\times 5 + 0.5 \\times X$ → regular $t_S = 19$ min.',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the service performance for the current situation.',
        steps: [
          { insight: 'All 4 lines are identical. Compute once.', work: '$\\lambda_{\\text{per line}} = 3$/hr, $\\mu = 5$/hr, $\\rho = 3/5 = 0.6$\n$C_A = 1, C_S = 1$\n$$L_q = \\frac{0.6^2}{1-0.6} \\times \\frac{1+1}{2} = 0.9 \\text{ customers}$$\n$W_q = 0.9/3 = 0.3$ hr $= 18$ min\n$W = 18 + 12 = 30$ min', result: 'Every customer waits 18 min in queue, 30 min total.' },
        ],
      },
      {
        question: 'How will the service be for express customers with a dedicated line?',
        steps: [
          { insight: 'Express line gets ALL express customers. Low $C_S = 0.2$ makes it very efficient.', work: '$\\lambda = 12 \\times 0.5 = 6$/hr, $\\mu = 60/5 = 12$/hr\n$\\rho = 6/12 = 0.5$, $C_A = 1$, $C_S = 1/5 = 0.2$\n$$L_q = \\frac{0.5^2}{1-0.5} \\times \\frac{1^2 + 0.2^2}{2} = 0.5 \\times 0.52 = 0.26$$\n$W_q = 0.26/6 = 0.043$ hr $= 2.6$ min\n$W = 2.6 + 5 = 7.6$ min', result: 'Express customers: $W_q$ drops from 18 min → 2.6 min!' },
        ],
      },
      {
        question: 'Should you implement the dedicated line?',
        steps: [
          { insight: 'Must check impact on regular customers. Removing express customers changes the service time distribution for the remaining 3 lines.', work: 'Regular $t_S$: $12 = 0.5 \\times 5 + 0.5 \\times X \\Rightarrow X = 19$ min\n$\\mu_{\\text{regular}} = 60/19 = 3.16$/hr\n$\\lambda_{\\text{per line}} = 6/3 = 2$/hr\n$\\rho = 2/3.16 = 0.63$\n$C_S$ for regular customers is unknown (ranges 0.2 to 1)', result: null },
          { insight: 'This is a trade-off. Express customers gain massively. Regular customers may be slightly worse off depending on their $C_S$.', work: 'If $C_S < 0.32$ → regulars are NOT worse off\nIf $C_S$ is high → regulars wait longer\nNeed: profitability data per segment', result: 'Decision depends on whether express customers are strategically important and on the unknown $C_S$ of regular service. Dedicated resources (anti-pooling) can work when segments have very different service characteristics.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Dedicating a resource (anti-pooling) sacrifices overall efficiency but can massively improve service for one segment — especially when that segment has low variability ($C_S = 0.2$).',
      '**Tip:** When you dedicate a line, always compute the impact on BOTH segments. Express customers improved (18 → 2.6 min), but regular customers may suffer. The exam expects you to analyze both sides.',
      '**Exam pattern:** If a problem asks "should you implement?", the answer is never just yes or no. Give the trade-off and state what additional information you would need to decide.',
    ],
  },

  // ════════════════════════════════════════════
  // INVENTORY GYM
  // ════════════════════════════════════════════
  {
    id: 'eg-i1',
    section: 'OM Gym — Inventory',
    title: 'Exercise 1: The Big Headache',
    badge: 'EOQ',
    badgeType: 'inventory',
    originalExcerpt: `A drug store chain has two options for purchasing aspirins. They can buy prepackaged aspirin that come already in bottles. Otherwise, they can ask a subcontractor to purchase bulk aspirin and bottle them for the drug stores. In either case the aspirin will be sold under the drug store's own brand at the same price.\n\nIf they subcontract bottling of the aspirin, the subcontractor charges a fix cost of $1,000 for each order and $50 for each carton of 50 bottles. The prepackaged aspirin cost $60 per carton (50 bottles as well) and has a fix ordering charge of $10 per order.\n\nDemand for aspirin is estimated to be 150,000 bottles a year (3,000 cartons). Annual inventory cost equals 30% of the unit price. Assume production runs are completed in negligible amount of time.\n\nQuestion(s):\n1. What is the optimal batch size if they pack their own aspirin? And if they buy the prepackaged aspirin?\n2. From a total cost standpoint, should the drugstore purchase the prepackaged aspirin or subcontract the bottling?`,
    storyline: `A drug store chain can buy aspirin two ways. Subcontract: $S = 1{,}000$/order, $v = 50$/carton. Prepackaged: $S = 10$/order, $v = 60$/carton. Demand: $D = 3{,}000$ cartons/yr. Holding cost: $i = 30\\%$.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a supplier comparison. Two options with different ordering costs ($S$) and unit prices ($v$). No demand variability is given, so safety stock is not part of this problem.',
        '**Extract the data:** Subcontract: $S = 1{,}000$, $v = 50$. Prepackaged: $S = 10$, $v = 60$. Demand: $D = 3{,}000$ cartons/yr. Holding rate: $i = 30\\%$.',
        '**Strategy:** Compute EOQ for each option, then compare the full total cost (purchasing + ordering + holding). Do not just compare EOQ costs — the unit price difference ($10$/carton $\\times$ 3,000 cartons $= 30{,}000$/yr) usually dominates everything else.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the optimal batch size for each option?',
        steps: [
          { insight: 'Subcontract has high $S$ but low $v$ → large, infrequent orders.', work: '$$EOQ_{\\text{sub}} = \\sqrt{\\frac{2 \\times 3000 \\times 1000}{50 \\times 0.30}} = \\sqrt{400{,}000} = 632 \\text{ cartons}$$\nOrder every $365 \\times 632/3000 = 77$ days', result: '$Q^*_{\\text{sub}} = 632$ cartons' },
          { insight: 'Prepackaged has low $S$ but higher $v$ → frequent, small orders.', work: '$$EOQ_{\\text{pre}} = \\sqrt{\\frac{2 \\times 3000 \\times 10}{60 \\times 0.30}} = \\sqrt{3{,}333} = 58 \\text{ cartons}$$\nOrder every $365 \\times 58/3000 = 7$ days', result: '$Q^*_{\\text{pre}} = 58$ cartons' },
        ],
      },
      {
        question: 'Which option has lower total cost?',
        steps: [
          { insight: 'Add up ALL cost components: purchasing + ordering + cycle stock holding.', work: '**Subcontract:**\nPurchase: $3000 \\times 50 = 150{,}000$\nOrdering: $(3000/632) \\times 1000 = 4{,}747$\nHolding: $(632/2) \\times 50 \\times 0.30 = 4{,}740$\nTotal $= 159{,}487$\n\n**Prepackaged:**\nPurchase: $3000 \\times 60 = 180{,}000$\nOrdering: $(3000/58) \\times 10 = 517$\nHolding: $(58/2) \\times 60 \\times 0.30 = 522$\nTotal $= 181{,}039$', result: 'Subcontract wins by ~$21{,}500$/yr. The $10$/carton price advantage saves $30{,}000$ in purchasing — dwarfing the higher ordering costs.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Unit cost differences almost always dominate ordering and holding cost differences. A $10$/carton saving $\\times$ 3,000 cartons $= 30{,}000$/yr — dwarfing any EOQ-related cost differences.',
      '**Tip:** Always compute the full total cost: purchasing + ordering + holding. Do not just compare EOQ costs — that misses the biggest line item.',
      '**Exam pattern:** If two suppliers have different unit prices, the cheaper one almost always wins. The EOQ just tells you how much to order, not who to order from.',
    ],
  },

  {
    id: 'eg-i2',
    section: 'OM Gym — Inventory',
    title: 'Exercise 2: Celebration Time',
    badge: 'EOQ + Periodic',
    badgeType: 'inventory',
    originalExcerpt: `A bar uses 5,000 quart bottles of cava each year. The cava cost $3 per bottle and is served in whole bottles since it loses its bubbles quickly. To replenish the inventory there is a fix cost of $10 per order. Holding costs are 20% of the unit price per bottle per year. It takes 3 weeks for an order to arrive.\n\nWeekly demand is random, with a mean of 100 bottles and a standard deviation of 30. The manager would like to minimize the inventory cost but have enough inventory to satisfy customer demand 95% of the time.\n\nQuestion(s):\n1. Compute the optimal order quantity for this situation.\n2. If a periodic review is used, what is the optimal base stock level?`,
    storyline: `A bar uses 5,000 bottles of cava/year. $v = 3$/bottle, $S = 10$/order, $i = 20\\%$. Lead time: 3 weeks. Weekly demand: mean $= 100$, $\\sigma = 30$. Target: 95% service level.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** Two parts — Q1 asks for a standard EOQ (continuous review), Q2 switches to periodic review with a base stock level. These are two different inventory systems.',
        '**Extract the data:** Demand is given in weekly terms (mean $= 100$/week, $\\sigma = 30$/week), so work in weeks. Holding cost per week: $h = v \\times i / 52 = 3 \\times 0.2 / 52 = 0.012$/bottle/week.',
        '**Key difference between Q1 and Q2:** In continuous review, $VP = LT = 3$ weeks. In periodic review, $VP = LT + R$, which is longer — meaning you need more safety stock to cover the extra gap.',
        '**Watch out:** For the periodic review base stock, use the fill rate formula (not the simple service level), because the problem says "satisfy demand 95% of the time" — this is a fill rate target.',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the optimal order quantity.',
        steps: [
          { insight: 'Standard EOQ with weekly units.', work: '$$EOQ = \\sqrt{\\frac{2 \\times D \\times S}{h}} = \\sqrt{\\frac{2 \\times 100 \\times 10}{0.012}} = \\sqrt{166{,}667} \\approx 408 \\text{ bottles}$$', result: '$Q^* = 408$ bottles' },
        ],
      },
      {
        question: 'If a periodic review is used, what is the optimal base stock level?',
        steps: [
          { insight: 'Use EOQ to estimate the review period, then compute the order-up-to level covering $VP = R + LT$.', work: '$R = Q^*/D = 408/100 \\approx 4$ weeks\n$VP = R + LT = 4 + 3 = 7$ weeks', result: null },
          { insight: 'For periodic review with fill rate $f = 0.95$, solve for $z$ using the fill rate formula, then compute $S$.', work: '$f = 1 - \\frac{\\sigma\\sqrt{VP} \\cdot L(z)}{\\lambda \\cdot R}$\n$0.95 = 1 - \\frac{30\\sqrt{7} \\cdot L(z)}{100 \\times 4}$\n$L(z) = 0.252 \\Rightarrow z \\approx 0.35$\n$$S = (R + LT) \\cdot \\lambda + z \\cdot \\sigma \\cdot \\sqrt{R + LT}$$\n$$S = 7 \\times 100 + 0.35 \\times 30 \\times \\sqrt{7} \\approx 728$$', result: 'Base stock level $S \\approx 728$ bottles' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Periodic review always needs more safety stock than continuous review because $VP = LT + R > LT$. The longer vulnerability period means more demand uncertainty to buffer against.',
      '**Tip:** When a problem says "satisfy demand X% of the time," this is a fill rate target — use the fill rate formula, not the simple cycle service level. The resulting $z$ value will be different.',
      '**Exam pattern:** Use EOQ to estimate the review period ($R = Q^*/D$), then plug $R$ into the base stock formula. The exam often tests whether you correctly identify $R$ from the EOQ.',
    ],
  },

  {
    id: 'eg-i3',
    section: 'OM Gym — Inventory',
    title: 'Exercise 3: Frozen Delights',
    badge: 'EOQ + SS + ROP',
    badgeType: 'inventory',
    originalExcerpt: `Frozen Delights is reviewing an inventory control system for manufacturing ice‐cream. Currently it orders a 10 day supply of ice‐cream whenever on‐hand inventory falls below the reorder point. The cost of launching an order is estimated at 200€. Manufacturing can be started at any time and lead time is one day. Sales are estimated to be normally distributed with an average of 80 liters/day and a standard deviation of 20 liters/day. The manufacturing variable cost amounts to 10€/liter and the manufacturing capacity is very large. Current health regulations establish that ice cream cannot be stored for a period longer than 4 months.\n\nFrozen Delights assumes a 15% annual cost of inventory holding when making manufacturing decisions and wishes to ensure a 99% safety level on its products.\n\nQuestion(s):\n1. Compute the current batch size.\n2. What is the optimal batch size?\n3. Compute the annual savings of using the optimal batch size.\n4. What is the safety stock that they should have?\n5. Stockout frequency with current batch size?\n6. If they move to using the optimal batch size, the safety stock would: increase, stay the same, or decrease?\n7. What should the optimal reorder point be (with the current batch size)?\n8. What should the optimal reorder point be (with the optimal batch size)?`,
    storyline: `Frozen Delights manufactures ice cream. Current policy: 10-day supply orders. $S = 200$/order, $LT = 1$ day, daily demand $\\bar{D} = 80$ L ($\\sigma = 20$), $v = 10$/L, $i = 15\\%$, service level $= 99\\%$. Continuous review (can order anytime).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This problem tests both inventory decisions at once — how much to order (EOQ) and when to order (ROP/SS). It has 8 sub-questions that methodically walk through each concept.',
        '**Core insight you need:** Batch size ($Q$) and safety stock ($SS$) are completely independent. $Q$ depends on ordering vs. holding costs. $SS$ depends on service level, demand variability, and vulnerability period. Changing $Q$ does NOT change $SS$.',
        '**Extract the data:** "Can be started at any time" = continuous review → $VP = LT = 1$ day. Annual demand $D = 365 \\times 80 = 29{,}200$ L/yr. Service level 99% → $z = 2.33$.',
        '**Watch out:** Q5 asks about stockout frequency — this connects $Q$ to stockouts indirectly: smaller $Q$ means more order cycles per year, which means more chances to stock out (even though SS per cycle stays the same).',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the current batch size.',
        steps: [
          { insight: '"10 day supply" directly gives the batch.', work: '$Q_{\\text{current}} = 10 \\times 80 = 800$ liters', result: '$Q_{\\text{current}} = 800$ L' },
        ],
      },
      {
        question: 'What is the optimal batch size?',
        steps: [
          { insight: 'Standard EOQ with annual figures.', work: '$$EOQ = \\sqrt{\\frac{2 \\times 29{,}200 \\times 200}{10 \\times 0.15}} = \\sqrt{7{,}786{,}667} \\approx 2{,}790 \\text{ L}$$', result: '$Q^* \\approx 2{,}790$ L (\\~35 day supply)' },
        ],
      },
      {
        question: 'Compute the annual savings.',
        steps: [
          { insight: 'Compare only differential costs: ordering + cycle stock holding. Manufacturing cost is the same regardless of $Q$.', work: '**Current** ($Q = 800$):\nOrdering: $29200/800 \\times 200 = 7{,}300$\nHolding: $400 \\times 10 \\times 0.15 = 600$\nTotal $= 7{,}900$\n\n**Optimal** ($Q = 2790$):\nOrdering: $29200/2790 \\times 200 = 2{,}093$\nHolding: $1395 \\times 10 \\times 0.15 = 2{,}093$\nTotal $= 4{,}186$', result: 'Savings $= 7{,}900 - 4{,}186 = 3{,}714$/yr' },
        ],
      },
      {
        question: 'What is the safety stock?',
        steps: [
          { insight: 'SS depends on service level, demand variability, and $VP$ — **not** on $Q$. Continuous review → $VP = LT = 1$ day.', work: '$$SS = z \\times \\sigma \\times \\sqrt{VP} = 2.33 \\times 20 \\times \\sqrt{1} = 46.6 \\approx 47 \\text{ L}$$', result: '$SS = 47$ L' },
        ],
      },
      {
        question: 'Stockout frequency with current batch size?',
        steps: [
          { insight: 'Stockout probability per cycle $= 1\\%$. Multiply by cycles per year.', work: '$\\text{Cycles/yr} = 29200/800 = 36.5$\n$\\text{Stockouts/yr} = 0.01 \\times 36.5 = 0.365$', result: '~1 stockout every 3 years' },
        ],
      },
      {
        question: 'Does SS change with optimal Q?',
        steps: [
          { insight: '$SS = z \\times \\sigma \\times \\sqrt{VP}$. None of these depend on $Q$.', work: '$z$ stays 2.33, $\\sigma$ stays 20, $VP$ stays 1 day.', result: 'SS stays the same (47 L). It does NOT depend on $Q$.' },
        ],
      },
      {
        question: 'Optimal reorder point (current and optimal Q)?',
        steps: [
          { insight: 'ROP = expected demand during $VP$ + safety stock. Since $VP$ is the same for both batch sizes, ROP is identical.', work: '$$ROP = \\bar{D}_1 \\times VP + SS = 80 \\times 1 + 47 = 127 \\text{ L}$$', result: '$ROP = 127$ L (same for both $Q$ values)' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** $Q$ and $SS$ are completely independent. $Q$ balances ordering vs. holding costs. $SS$ protects against demand uncertainty during $VP$. They share no variables — changing one does not affect the other.',
      '**Tip:** Smaller $Q$ means more order cycles per year. More cycles = more chances to stock out, even with the same per-cycle service level. So stockout frequency depends on $Q$, even though $SS$ does not.',
      '**Exam pattern:** If the problem asks "does SS change if Q changes?", the answer is always NO. If it asks about stockout frequency, compute: stockouts/yr $= (1 - SL) \\times D/Q$.',
    ],
  },

  {
    id: 'eg-i4',
    section: 'OM Gym — Inventory',
    title: 'Exercise 4: Purchasing Emmental Cheese',
    badge: 'EOQ + Stockout',
    badgeType: 'inventory',
    originalExcerpt: `A small store specialized in high quality cheese wants to check its purchasing policy. Although the store has approximately 100 references of cheese, to start the analysis, the owner decides to study a particular example of their supply of Swiss Emmental, which can be taken as a representative reference. These are the conclusions drawn from the preliminary analysis:\n\ni. The provider charges 3 € as a fixed cost for each order and 5 €/kg for the cheese.\nii. On average, they sell 1 kg of Swiss Emmental daily, with a standard deviation of σ = 0.5 kg.\n\nThe supplier guarantees the delivery of an order in 4 days. The store is open every day of the year and estimates its cost of capital to be 20% annually. Emmental inventory in the store is continuously checked, and the owner always makes an order for a quantity of 10 kg when the stock in the store falls below 5 kg.\n\nQuestion(s):\n1. Do you think the Emmental purchasing policy is appropriate? Otherwise, do you propose other order size and/or reorder point?\n2. How likely will the store run out of Emmental with its current policy?\n3. How should the reorder point change if the store wants the probability of stock-out to be 1% in each replenishment cycle?`,
    storyline: `A cheese store audits its Swiss Emmental policy. $S = 3$/order, $v = 5$/kg. Daily demand: $\\bar{D} = 1$ kg, $\\sigma = 0.5$. $LT = 4$ days, $i = 20\\%$. Continuous review. Current: $Q = 10$ kg, $ROP = 5$ kg.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a policy audit — you are given a current policy ($Q = 10$, $ROP = 5$) and asked to evaluate whether it makes sense. Think like a consultant reviewing someone else\'s decisions.',
        '**Quick audit trick:** At EOQ, ordering cost ≈ holding cost. If they are wildly unbalanced, the batch size is wrong. Compute both costs and compare.',
        '**Reverse-engineer the service level:** From the current ROP, compute the implied safety stock ($SS = ROP - \\bar{D} \\times VP$), then find $z = SS / (\\sigma \\times \\sqrt{VP})$. Look up $z$ in the table to find what service level the store is actually running at.',
        '**Watch out:** The EOQ formula gives $Q^* = 47$ kg, but with 100 cheese types that means 2.4 tons of cheese in the store. Always reality-check EOQ against storage space and perishability.',
      ],
    },
    questionSteps: [
      {
        question: 'Is the purchasing policy appropriate?',
        steps: [
          { insight: 'Check cost balance. If ordering $\\gg$ holding, batch is too small.', work: '$SS = ROP - \\bar{D} \\times VP = 5 - 1 \\times 4 = 1$ kg\nMaintenance: $(SS + Q/2) \\times v \\times i = (1+5) \\times 5 \\times 0.20 = 6$/yr\nOrdering: $(365/10) \\times 3 = 109.50$/yr', result: 'Ordering cost (110) ≫ Holding cost (6). Batch is way too small!' },
          { insight: 'Compute optimal $Q$ with EOQ.', work: '$$EOQ = \\sqrt{\\frac{2 \\times 365 \\times 3}{5 \\times 0.20}} = \\sqrt{2{,}190} \\approx 47 \\text{ kg}$$', result: '$EOQ = 47$ kg (vs current 10 kg). But with 100 cheese types × 47 kg = 2.4 tons in store — may not be practical. Plus cheese ordered every ~47 days may spoil.' },
        ],
      },
      {
        question: 'How likely will the store run out of Emmental?',
        steps: [
          { insight: 'Reverse-engineer $z$ from current safety stock to find the implied service level.', work: '$SS = 1$ kg\n$\\sigma_{VP} = \\sigma \\times \\sqrt{VP} = 0.5 \\times \\sqrt{4} = 1.0$ kg\n$$z = \\frac{SS}{\\sigma_{VP}} = \\frac{1}{1} = 1.0$$\nFrom z-table: $P(z \\leq 1.0) = 84.13\\%$', result: 'Stockout probability $= 15.9\\%$ per cycle. Very high!' },
        ],
      },
      {
        question: 'What ROP for 1% stockout probability?',
        steps: [
          { insight: 'For 99% service level, $z = 2.33$.', work: '$$SS = 2.33 \\times 0.5 \\times \\sqrt{4} = 2.33 \\text{ kg}$$\n$$ROP = \\bar{D} \\times VP + SS = 1 \\times 4 + 2.33 = 6.33 \\text{ kg}$$', result: 'New $ROP \\approx 6.33$ kg (up from 5 kg)' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** To audit a policy, check two things: (1) are ordering ≈ holding costs? If not, $Q$ is wrong. (2) What service level does the current $SS$ imply? Reverse-engineer $z$ to find out.',
      '**Tip:** EOQ is a theoretical optimum. Always reality-check it against physical constraints — storage space, perishability, minimum order quantities. A cheese store cannot stock 47 kg × 100 types = 4.7 tons.',
      '**Exam pattern:** When given a current policy ($Q$ and $ROP$), first evaluate it before proposing changes. Show that you understand both what is wrong and why.',
    ],
  },

  // ════════════════════════════════════════════
  // FINAL EXAM 2024
  // ════════════════════════════════════════════
  {
    id: 'eg-e1',
    section: 'Final Exam 2024',
    title: 'Part I: Sourcing Screws — Supplier Comparison',
    badge: 'EOQ + SS + Periodic',
    badgeType: 'inventory',
    originalExcerpt: `Medcorp Spain's daily demand for the 10 mm titanium screws is, on average, 100 boxes, with a standard deviation of 30 boxes. Each box weights 250 g.\n\nAs of now, they are purchasing them from their American Headquarters. The purchasing cost is 500€ for a box of 10 screws (this includes import taxes). When importing them, they need to pay 100€/order for the customs declaration. The screws are shipped via FedEx at 40€/kg. The lead time, which includes customs clearance at the Madrid Barajas airport and transfer to the warehouse, is seven days. Medcorp Spain pays Medcorp US when it places its order.\n\nAlternatively, they could source the screws from a Portuguese supplier, who would charge 300€ for a box of 10 screws (without import taxes, as both countries are part of the European Union). Coming from Portugal, the lead time would be one day, and the transportation costs (Portuguese LTL) would be 30€/kg. The quality of each batch of Portuguese screws would need to be checked by a third-party company, who would run some physical tests (dimensional and stress resistance). These tests cost 150€ per purchase order. Medcorp Spain would need to pay the Portuguese supplier when it placed its order.\n\nRegardless of who supplies the screws, storing them for a year costs Medcorp Spain 10% of the box's value. The Madrid warehouse can store up to 2,000 boxes of 10 mm titanium screws.\n\nFollowing the usual administrative procedures, the company checks inventory levels and decides what orders to place every day at 8:00.\n\nI.1. (20 points) What should Medcorp's inventory policy for titanium screws be?`,
    storyline: `Medcorp Spain needs titanium screws. Daily demand: $\\bar{D} = 100$ boxes ($\\sigma = 30$). Inventory checked daily at 8 AM ($R = 1$ day). $i = 10\\%$, warehouse max $= 2{,}000$ boxes. SL $= 99\\%$ (health product).\n\nUS: $v = 500$, $S = 100$, transport $= 10$/box, $LT = 7$ days.\nPortugal: $v = 300$, $S = 150$, transport $= 7.50$/box, $LT = 1$ day.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a full supplier comparison — design the complete inventory policy (EOQ + SS + ROP) for each supplier, then compare total annual costs.',
        '**Assumption:** This is a health product (spinal implants). Stockouts are dangerous → assume 99% service level ($z = 2.33$).',
        '**TRAP — do not miss this:** "checks inventory daily at 8:00" means periodic review with $R = 1$ day. Therefore $VP = LT + R$, NOT just $LT$. For the US supplier: $VP = 7 + 1 = 8$ days, not 7. This is the #1 exam mistake.',
        '**Organize your costs:** Separate non-differential costs (purchasing per box, transport per box — these are paid regardless of batch size) from differential costs (ordering cost per order, cycle stock holding). Compute EOQ only from the differential costs.',
        '**Data setup:** Annual demand $D = 100 \\times 365 = 36{,}500$ boxes/yr. US: $v = 500$, $S = 100$, transport $= 10$/box. Portugal: $v = 300$, $S = 150$, transport $= 7.50$/box.',
      ],
    },
    questionSteps: [
      {
        question: 'What should Medcorp\'s inventory policy for titanium screws be?',
        steps: [
          { insight: 'First compute non-differential costs for each supplier.', work: '**US:** Purchase $= 500 \\times 36500 = 18{,}250{,}000$/yr, Transport $= 10 \\times 36500 = 365{,}000$/yr\n**Portugal:** Purchase $= 300 \\times 36500 = 10{,}950{,}000$/yr, Transport $= 7.5 \\times 36500 = 273{,}750$/yr', result: null },
          { insight: '$VP = LT + R$ because of daily periodic review.', work: '**US:** $VP = 7 + 1 = 8$ days\n$SS = 2.33 \\times 30 \\times \\sqrt{8} = 198$ boxes → holding $= 198 \\times 0.10 \\times 500 = 9{,}900$/yr\n$ROP = 100 \\times 8 + 198 = 998$ boxes\n\n**Portugal:** $VP = 1 + 1 = 2$ days\n$SS = 2.33 \\times 30 \\times \\sqrt{2} = 99$ boxes → holding $= 99 \\times 0.10 \\times 300 = 2{,}970$/yr\n$ROP = 100 \\times 2 + 99 = 299$ boxes', result: null },
          { insight: 'Compute EOQ for each.', work: '**US:** $EOQ = \\sqrt{\\frac{2 \\times 36500 \\times 100}{0.10 \\times 500}} = 382$ boxes\nOrdering $= 9{,}555$/yr, Cycle holding $= 9{,}550$/yr\n\n**Portugal:** $EOQ = \\sqrt{\\frac{2 \\times 36500 \\times 150}{0.10 \\times 300}} = 604$ boxes\nOrdering $= 9{,}065$/yr, Cycle holding $= 9{,}060$/yr', result: null },
          { insight: 'Add ALL costs for total comparison.', work: '**US Total:** $18{,}250{,}000 + 365{,}000 + 9{,}900 + 9{,}555 + 9{,}550 = 18{,}644{,}005$\n**Portugal Total:** $10{,}950{,}000 + 273{,}750 + 2{,}970 + 9{,}065 + 9{,}060 = 11{,}244{,}845$', result: '**Portugal saves ~7.4M/yr.** Policy: order 604 boxes from Portugal whenever inventory falls below 299 boxes. Check daily at 8 AM.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** "Checks inventory daily at 8:00" means $R = 1$ day → $VP = LT + R$, NOT $LT$. This trap cost many students 5+ points on this exact exam. Always ask: continuous or periodic review?',
      '**Tip:** Unit cost differences dominate everything else. Portugal saves 200/box × 36,500 = 7.3M in purchasing alone. Ordering and holding cost differences are rounding errors by comparison.',
      '**Exam pattern:** Always conclude with a clear policy statement: "Order [Q] boxes from [supplier] whenever inventory falls below [ROP] boxes. Review daily at 8 AM." This shows you understand the full system.',
    ],
  },

  {
    id: 'eg-e2',
    section: 'Final Exam 2024',
    title: 'Part II: Kit Preparation — Capacity Analysis',
    badge: 'Capacity',
    badgeType: 'queue',
    originalExcerpt: `When a hospital needs to perform a surgery requiring any of the company's devices, they must prepare a kit: a medium SAMSONITE suitcase that includes two or three plastic boxes.\n\nThe Madrid warehouse has several employees who, from 8:00 to 12:00, prepare the new kits. Preparing a kit requires the employee to go to one of the warehouse semi-automated picking stations, pack the different components and tools in the plastic boxes, weigh the different boxes on a precision scale that detects if a single screw is missing, and then take the plastic boxes to one of the sterilization units. A sterilization unit can only sterilize one kit at the time. The times needed for each operation are:\n\n• Getting the different components from the warehouse: 30 minutes/kit\n• Checking (and possibly correcting the units picked) using the precision scale: 10 minutes/kit\n• Sterilization: 60 minutes/kit\n\nII.1. (20 points) If the company needs to prepare 100 kits per day, how many employees should be dedicated to this task? And how many sterilization units are needed?`,
    storyline: `Medcorp's Madrid warehouse prepares surgical kits (8:00–12:00, 4-hour shift). Per kit: picking = 30 min (employee), checking = 10 min (employee + scale), sterilization = 60 min (machine, 1 kit at a time). Target: 100 kits/day.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a capacity/resource planning problem. You need to figure out how many of each resource type (employees, scales, machines) are required to meet a daily target of 100 kits.',
        '**Map out the resources:** There are three distinct resource types — employees, precision scales, and sterilization units. One employee does both picking (30 min) and checking (10 min), so each employee uses 40 min per kit.',
        '**Calculate capacity per unit:** Each resource is available for $4 \\times 60 = 240$ minutes per shift. Divide available time by usage time per kit to get how many kits one resource unit can handle.',
        '**Watch out:** Always round UP when computing resource counts (you cannot hire 0.67 of a person). Also, running at 98% utilization is risky — aim for ~83% to handle real-world variability. And check sequencing: the last kit entering sterilization needs 60 min, so it must enter by 11:00 to finish by 12:00.',
      ],
    },
    questionSteps: [
      {
        question: 'How many employees and sterilization units are needed for 100 kits/day?',
        steps: [
          { insight: 'Compute capacity per resource unit, then divide demand by capacity.', work: '**Per resource unit capacity (in 240 min shift):**\nEmployee: $240/40 = 6$ kits/shift\nScale: $240/10 = 24$ kits/shift\nSterilization: $240/60 = 4$ kits/shift', result: null },
          { insight: 'Divide demand by per-unit capacity, round up.', work: 'Employees: $\\lceil 100/6 \\rceil = \\lceil 16.67 \\rceil = 17$\nScales: $\\lceil 100/24 \\rceil = \\lceil 4.17 \\rceil = 5$\nSterilization units: $\\lceil 100/4 \\rceil = 25$', result: 'Need: **17 employees**, 5 scales, **25 sterilization units**' },
          { insight: 'Sterilization is the bottleneck (needs most units). But 17 employees at 98% utilization is risky — add buffer.', work: 'With exactly 17 employees: $\\rho = 100/(17 \\times 6) = 98\\%$ ← dangerous\nSafer: ~20 employees + ~30 sterilization units → $\\rho \\approx 83\\%$\n\nAlso: last kit enters sterilization at 11:00, finishes at 12:00.\nIf all kits must be FULLY done by 12:00, need even more units.', result: 'Recommended: ~20 employees, ~30 sterilization units for sustainable operations.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Capacity analysis requires identifying ALL distinct resource types — not just "employees." Employees, scales, and sterilization units are separate constraints. The bottleneck (sterilization, 60 min/kit) determines the system.',
      '**Tip:** Never plan for 100% utilization. At 98%, one hiccup cascades into delays. Target ~83% utilization for human-operated processes. The exam rewards you for mentioning this practical consideration.',
      '**Exam pattern:** After computing the minimum resources, add a sentence about sequencing (first kit enters sterilization at 8:40, last must enter by 11:00) and about practical capacity buffers. This shows managerial judgment.',
    ],
  },

  {
    id: 'eg-e3',
    section: 'Final Exam 2024',
    title: 'Part III: Call Center — Queueing SLA',
    badge: 'Queueing SLA',
    badgeType: 'queue',
    originalExcerpt: `Each hospital has a distributor assigned to it by Medcorp Spain. When a hospital needs to place an order, it contacts its distributor by phone. Each distributor has several operators. An operator spends, on average, 20 minutes per call in order to complete the order and make sure they include all the needed details. The standard deviation of the duration of a call is 5 minutes.\n\nMedcorp has requested every distributor to incorporate software that keeps track of all these calls and their waiting time. All the distributors know that the average waiting time may, by contract, not exceed 3 minutes.\n\nThe Catalan Distributor (Serveis Hospitalaris SL) is receiving an average of 10 calls per hour during its opening hours (9:00 to 17:00).\n\nIII.1 (20 points) With four employees taking care of the phone calls, will Serveis Hospitalaris SL fulfill its commitment to an average waiting time of at most three minutes? If not, how many more operators do they need?`,
    storyline: `Serveis Hospitalaris SL receives $\\lambda = 10$ calls/hr. Each operator: $t_S = 20$ min ($\\sigma = 5$ min). SLA: $W_q \\leq 3$ min. Currently $S = 4$ operators, single pooled queue.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a queueing problem with a service level agreement (SLA). You need to compute the average wait time $W_q$ and check if it meets the ≤ 3 minute contractual target.',
        '**System setup:** Single queue feeding $S$ operators. Phone calls → assume Poisson arrivals ($C_A = 1$). Service variability is given: $C_S = \\sigma/t_S = 5/20 = 0.25$ — operators are fairly consistent.',
        '**Strategy:** Compute $W_q$ with $S = 4$. If it fails the SLA, try $S = 5$ and show the improvement. This demonstrates the nonlinear relationship between utilization and wait times — adding just one server can have a dramatic effect.',
        '**Watch out:** Going from $\\rho = 83\\%$ to $67\\%$ does not sound like a big change, but it reduces $W_q$ by nearly 80%. Queues are exponential, not linear.',
      ],
    },
    questionSteps: [
      {
        question: 'With 4 employees, will they meet the ≤ 3 min SLA? If not, how many operators needed?',
        steps: [
          { insight: 'First try $S = 4$.', work: '$\\mu = 60/20 = 3$ calls/hr per operator\n$\\text{Total capacity} = 3 \\times 4 = 12$ calls/hr\n$\\rho = 10/12 = 0.833 = 83.3\\%$\n\n$$L_q = \\frac{0.833^{\\sqrt{2 \\times 5}}}{1 - 0.833} \\times \\frac{1^2 + 0.25^2}{2} = 1.79$$\n$$W_q = \\frac{L_q}{\\lambda} = \\frac{1.79}{10} = 0.179 \\text{ hr} = 10.75 \\text{ min}$$', result: '$W_q = 10.75$ min → **FAILS** the 3-minute SLA' },
          { insight: 'Try $S = 5$. See how dramatically performance improves with one extra server.', work: '$\\text{Total capacity} = 3 \\times 5 = 15$ calls/hr\n$\\rho = 10/15 = 0.667 = 66.7\\%$\n\n$$L_q = \\frac{0.667^{\\sqrt{2 \\times 6}}}{1 - 0.667} \\times \\frac{1^2 + 0.25^2}{2} = 0.39$$\n$$W_q = \\frac{0.39}{10} = 0.039 \\text{ hr} = 2.35 \\text{ min}$$', result: '$W_q = 2.35$ min → **MEETS** the SLA. Need **5 operators** (+1).' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Queues are nonlinear. One extra server dropped $W_q$ from 10.75 to 2.35 min (78% reduction). Going from $\\rho = 83\\%$ to $67\\%$ sounds modest but the impact is massive.',
      '**Tip:** When the SLA fails, try $S+1$ servers. Show the before/after comparison — the exam loves seeing you demonstrate the nonlinear effect of adding one server.',
      '**Exam pattern:** Follow the 4-step structure: (1) system structure, (2) arrival characterization, (3) service characterization, (4) compute $\\rho$, $L_q$, $W_q$. This systematic approach avoids mistakes.',
    ],
  },

  {
    id: 'eg-e4',
    section: 'Final Exam 2024',
    title: 'Part IV: Red Carpet — Strategic Analysis',
    badge: 'Strategy',
    badgeType: 'strategy',
    originalExcerpt: `After a few years Medcorp decided to make some changes. "I knew it was going to be a disaster" Miguel explains. "Headquarters hired a consulting firm and asked them to find ways to improve service and reduce costs. And guess what, the guys had this fantastic idea to replicate the distribution model Medcorp had in the US here in Europe. How? They reached an agreement with a multinational express transport group that covers the whole of Europe and has its major hub in the airport of Brussels. Medcorp was going to store all the inventory and kits in the facilities of the transport group, our customers would place their orders directly with them, and they would deliver the kits to any European hospital in under 48 hours. They called the service "Red Carpet"."\n\nSales in Spain plummeted by 60% in one month. Miguel decided to act. He fabricated a huge export to a Middle Eastern country. He received the kits and stored them in the Spanish warehouse. He then used this inventory to continue operating as the company had been operating for years. One month after setting up his scheme, sales were miraculously back to their previous levels.\n\nIV.1 (30 points) What was the rationale behind the consultant's proposal? What were, most probably, the pros and cons of his proposal? What was the rationale behind Miguel's decision?\nIV.2 (10 points) What should the company do about an employee like Miguel?`,
    storyline: `Medcorp's consultants proposed "Red Carpet" — centralizing all European inventory in a Brussels hub with 48-hour delivery. Result: Spain sales dropped 60% in one month. Miguel secretly diverted inventory back to the old system — sales recovered fully. He had tried 3 times to convince Boston before acting unilaterally.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a strategic analysis question — no calculations needed, but you must apply OM concepts (pooling, supply chain centralization, the strategic triangle) to structure your argument.',
        '**Consultant\'s logic:** The proposal is textbook centralization — consolidate 25 country warehouses into 1 hub. The theory says this reduces safety stock by a factor of $\\sqrt{25} = 5$ through demand pooling. Plus: eliminate distributors (save 15% margin), simplify upstream logistics.',
        '**Why it failed:** The theory ignored the demand side. Distributors were not just moving boxes — they were driving sales through hospital relationships. The express carrier could not replicate that. Cost savings are meaningless if revenue drops 60%.',
        '**For Miguel\'s case:** This is an ethics + management question. Balance his correct business judgment (sales recovered) against his unethical methods (fabricated exports). Also consider: did the company fail to listen?',
      ],
    },
    questionSteps: [
      {
        question: 'What was the consultant\'s rationale? Pros and cons?',
        steps: [
          { insight: 'The proposal is textbook supply chain centralization.', work: '**PROS:**\n• Inventory pooling: with 25 countries, $SS_{\\text{pooled}} = z \\times \\sqrt{25} \\times \\sigma_1 \\times \\sqrt{VP} = 5 \\times SS_1$ vs. $SS_{\\text{total}} = 25 \\times SS_1$ → **5× less safety stock**\n• Disintermediation: save 15% margin paid to distributors\n• Transport economies of scale with one carrier\n• Upstream simplification: one destination vs. 25 country warehouses\n• Removes dependence on ethically questionable practices', result: null },
          { insight: 'The cons explain why it failed catastrophically in Spain.', work: '**CONS:**\n• Express carriers don\'t understand hospital operations (must deliver to operating theater, not logistics dept)\n• Loss of local distributor relationships that **drive demand**\n• EU ≠ US: each country\'s healthcare system is different\n• Longer/variable delivery to peripheral countries\n• Alienated stakeholders (distributors) who are demand creators', result: 'Cost optimization is meaningless if it destroys demand. Sales dropped 60% — the pooling savings cannot offset that.' },
        ],
      },
      {
        question: 'What should the company do about Miguel?',
        steps: [
          { insight: 'This is not binary (keep/fire). Address both the person AND the systemic failure.', work: '**FOR Miguel:** Tried official channels first (3 trips). Acted to save the business. Sales proved him right.\n**AGAINST Miguel:** Fabricating exports is fraud/legal liability. Unilateral decisions undermine authority. Company may have had bigger-picture strategy.', result: 'Miguel should be disciplined but not fired — he demonstrated deep market knowledge. The company must learn to listen to local employees and pilot changes before full rollout. (Real life: Miguel was NOT fired, Red Carpet was discontinued.)' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Supply chain optimization that destroys demand is worse than no optimization at all. The consultants saved on inventory costs but lost 60% of revenue. Always consider who drives demand.',
      '**Tip:** For Part IV questions, structure your answer as: (1) consultant\'s rationale with OM theory, (2) pros with quantified pooling math, (3) cons with real-world factors the theory ignores, (4) your recommendation.',
      '**Exam pattern:** The exam always tests both sides of trade-offs. Never say centralization is purely good or bad. Show that you understand the strategic triangle: cost, service, and range — pick two.',
    ],
  },

  // ════════════════════════════════════════════
  // FINAL EXAM 2022 — BIOTOPIN / NEWBIO
  // ════════════════════════════════════════════
  {
    id: 'eg-22-1',
    section: 'Final Exam 2022',
    title: 'Part I: Central Warehouse Operations',
    badge: 'Capacity + Inventory + Queueing',
    badgeType: 'queue',
    originalExcerpt: `NEWBIO produces BIOTOPIN via a 20-day biological process in 10 reactors of 50,000L each (96% yield). Bottled in 50ml syringes. Yearly sales: Normal with mean 144M units, std dev 7.75M. Central warehouse next to plant, single dock, 30 min paperwork per truck. Min order = 10,000 units. Price = 50/unit, COGS = 10/unit.\n\nMaria Freud (COO) faces: (1) inventory mismatch — sometimes too much, sometimes too little; (2) truck drivers complaining about delays.\n\nWhat inventory policy do you recommend? What causes truck delays and what should Maria do?`,
    storyline: `NEWBIO manufactures BIOTOPIN, a biological cancer drug. 10 reactors, 50,000L each, 20-day process, 96% yield. Bottled in 50ml syringes (1L = 1,000ml = 20 syringes). Yearly demand: $\\mu = 144M$ units, $\\sigma = 7.75M$. Single warehouse dock, 30 min paperwork per truck. This problem combines capacity, inventory, AND queueing.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is a three-part problem: (1) capacity check — can we produce enough? (2) inventory policy — how much safety stock? (3) queueing — why are trucks waiting?',
        '**Capacity first:** 1 reactor produces $50{,}000 \\times 0.96 / 0.05 = 960{,}000$ units every 20 days. That is $960{,}000 \\times 365/20 = 17.52M$/yr per reactor. 10 reactors = $175.2M$/yr. Utilization $= 144/175.2 = 82\\%$.',
        '**Inventory:** Warehouse is next to plant, so $LT$ = production lead time = 20 days. Continuous review (warehouse monitors stock). Batch size = minimum production batch = $0.96M$ units.',
        '**Queueing:** Trucks arrive at rate $\\lambda = 144M / (365 \\times 24 \\times 10{,}000) = 1.64$/hr. Service = 30 min/truck ($\\mu = 2$/hr). Single dock ($S = 1$). This is an $M/G/1$ system.',
      ],
    },
    questionSteps: [
      {
        question: 'What inventory policy should Maria use for BIOTOPIN?',
        steps: [
          { insight: 'Set batch size = minimum production batch (producing more only adds holding cost). Convert yearly demand variability to monthly using square-root law.', work: '$Q^* = 0.96M$ units (one reactor batch)\n$\\sigma_{\\text{monthly}} = 7.75M / \\sqrt{12} = 2.24M$ units\n$VP = LT = 20$ days $= 2/3$ months\nAssume $SL = 99.87\\% \\Rightarrow z = 3$', result: null },
          { insight: 'Compute safety stock and reorder point.', work: '$$SS = z \\times \\sigma_1 \\times \\sqrt{VP} = 3 \\times 2.24M \\times \\sqrt{2/3} \\approx 5.5M \\text{ units}$$\n$$ROP = \\bar{D}_1 \\times VP + SS = (144M/12) \\times (2/3) + 5.5M = 13.5M \\text{ units}$$', result: 'When inventory falls to 13.5M units, schedule production of 0.96M units.' },
        ],
      },
      {
        question: 'What causes truck delays and what should Maria do?',
        steps: [
          { insight: 'Model the dock as a queueing system. Trucks arrive randomly, each takes 30 min of paperwork.', work: '$\\lambda = 1.64$ trucks/hr, $\\mu = 2$ trucks/hr, $S = 1$\n$\\rho = 1.64/2 = 82\\%$\n$C_A = 1$ (natural arrivals), $C_S \\approx 0.3$ (limited variability)\n$$L_q = \\frac{0.82^{\\sqrt{2 \\times 2}}}{1 - 0.82} \\times \\frac{1 + 0.09}{2} \\approx 2.04 \\text{ trucks}$$\n$$W_q = 2.04 / 1.64 = 1.24 \\text{ hrs} = 74.6 \\text{ min}$$', result: null },
          { insight: 'Average 75-minute delay is very troubling. Recommend reducing service time (online paperwork) or reducing variability before adding a second dock.', work: 'Priority 1: Move paperwork online to cut $t_S$\nPriority 2: Standardize the process to reduce $C_S$\nPriority 3: Only if neither works, build a second dock ($S = 2$)', result: 'Average truck wait = 75 min. Fix the process first, add capacity second.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Always check capacity first before designing inventory policy. If production cannot meet demand, no amount of safety stock will help.',
      '**Tip:** When a problem combines inventory AND queueing, solve them separately. Inventory policy answers "how much stock?" Queueing answers "why are trucks waiting?"',
      '**Exam pattern:** The square-root law for converting annual $\\sigma$ to monthly: $\\sigma_{\\text{month}} = \\sigma_{\\text{year}} / \\sqrt{12}$. This comes up whenever demand is given in different time units than the vulnerability period.',
    ],
  },

  {
    id: 'eg-22-2',
    section: 'Final Exam 2022',
    title: 'Part II: Distribution in Latin America',
    badge: 'Inventory + Supplier Comparison',
    badgeType: 'inventory',
    originalExcerpt: `LdM (Mexico) sells BIOTOPIN at 120/unit. Monthly demand: Normal, mean 12,000, std dev 2,000. Holding cost 48% of procurement cost.\n\nOption A — Kuehne+Nagel (sea): 2,000/pallet (20,000 units), LT = 15 days.\nOption B — Aeromexico (air): 3,000/pallet (10,000 units), LT = 2 days.\n\nWhich logistics provider should LdM use?`,
    storyline: `Laboratorios de Mexico sells BIOTOPIN across Latin America. Monthly demand: $\\mu = 12{,}000$, $\\sigma = 2{,}000$. Holding cost $i = 48\\%$ (highly leveraged company). Two shipping options: sea freight (cheap, slow, big batches) vs air freight (expensive, fast, small batches).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** Supplier/logistics comparison — same product, different transport modes. Compute total cost for each: holding + transportation.',
        '**Key insight:** Air freight costs more per shipment but the shorter LT drastically reduces safety stock, and the smaller batch reduces cycle stock. With a 48% holding rate, inventory savings can outweigh higher shipping costs.',
        '**Data conversion:** Sea: $Q = 20{,}000$, $LT = 15$ days $= 0.5$ months. Air: $Q = 10{,}000$, $LT = 2$ days $= 2/30$ months.',
        '**Watch out:** Also consider in-transit inventory (Little\'s Law). Longer transit = more inventory stuck on ships/planes.',
      ],
    },
    questionSteps: [
      {
        question: 'Which logistics provider should LdM use?',
        steps: [
          { insight: 'Compute total cost for Kuehne+Nagel (sea freight).', work: '$Q_{KN} = 20{,}000$, $VP = 0.5$ months\n$SS_{KN} = 3 \\times 2{,}000 \\times \\sqrt{0.5} = 4{,}243$ units\nHolding: $(10{,}000 + 4{,}243) \\times 50 \\times 0.48 = 342k$/yr\nTransport: $(12 \\times 12{,}000 / 20{,}000) \\times 2{,}000 = 14{,}400$/yr\n**Total = 356.5k/yr**', result: null },
          { insight: 'Compute total cost for Aeromexico (air freight).', work: '$Q_{AM} = 10{,}000$, $VP = 2/30$ months\n$SS_{AM} = 3 \\times 2{,}000 \\times \\sqrt{2/30} = 1{,}549$ units\nHolding: $(5{,}000 + 1{,}549) \\times 50 \\times 0.48 = 157k$/yr\nTransport: $(12 \\times 12{,}000 / 10{,}000) \\times 3{,}000 = 43.2k$/yr\n**Total = 200k/yr**', result: '**Aeromexico saves ~156k/yr.** Faster delivery + smaller batches dramatically reduce inventory costs, more than offsetting the higher shipping price.' },
          { insight: 'In-transit inventory further favors air. Use Little\'s Law.', work: 'Sea in-transit: $\\lambda \\times LT = (12 \\times 12{,}000/30) \\times 15 = 6{,}000$ units\nAir in-transit: $(12 \\times 12{,}000/30) \\times 2 = 800$ units', result: 'Air freight has 7x less in-transit inventory, making it even more appealing.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** When holding cost rate is high (48%), inventory savings dominate transportation cost differences. Faster delivery = less SS = less cash tied up.',
      '**Tip:** Always consider in-transit inventory using Little\'s Law: items on the ship/plane are still your inventory. Longer transit = more working capital locked up.',
      '**Exam pattern:** This is the same structure as the 2024 exam (US vs Portugal) — compute total cost for each option including SS, cycle stock holding, and transport. The one with lower total wins.',
    ],
  },

  {
    id: 'eg-22-3',
    section: 'Final Exam 2022',
    title: 'Part III: Growth Strategy',
    badge: 'Strategy',
    badgeType: 'strategy',
    originalExcerpt: `NEWBIO expects highest growth in Latin America. CEO Elsa considers: (A) Open a LatAm plant, (B) Subcontract production to LdM, (C) Bulk shipments for local bottling, (D) Consignment stock at LdM. Any other ideas?\n\nWhat would you advise?`,
    storyline: `NEWBIO sees Latin America as strategic for growth. Asia is blocked by cheap Chinese/Indian competitors (35/unit). Four options on the table, each with hidden costs or risks. The exam wants you to analyze all four AND propose something better.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** Strategic analysis — evaluate four proposals on operational feasibility, cost, risk, and quality.',
        '**Key tension:** Short-term vs long-term. Current demand is tiny (one reactor at low utilization would suffice), but growth is expected.',
        '**Think about:** Quality control (biological drug!), capital intensity, supply chain flexibility, and what happens if demand does NOT grow as expected.',
      ],
    },
    questionSteps: [
      {
        question: 'Evaluate each option and recommend a strategy.',
        steps: [
          { insight: 'Analyze each option for feasibility.', work: '**New plant:** Huge capex, current demand too low to justify even 1 reactor. Maybe long-term.\n**Subcontract to LdM:** Lose quality control over a biological drug — extremely risky.\n**Bulk shipment + local bottling:** Unclear how to maintain cold chain integrity. No customization in BIOTOPIN, so postponement adds no value.\n**Consignment stock:** NEWBIO absorbs LdM\'s holding cost. With 48% rate, this erodes profitability.', result: null },
          { insight: 'None of the four is great. Propose a phased approach.', work: '**Short term:** Sound inventory management (switch to air freight as shown in Part II).\n**Medium term:** Find a different/additional distribution partner, possibly in South America (closer to larger markets, potentially lower holding costs than LdM).\n**Long term:** If demand grows as expected, build a plant with strategic partners in South America.', result: 'No single option is best. Phased approach: optimize logistics now, explore new partners, invest in production later when demand justifies it.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** For strategic questions, evaluate EVERY option the problem lists — do not skip any. Show you considered each one seriously.',
      '**Tip:** The best answer for "which option?" is often "none of the above, but here is a phased plan." The exam rewards creative thinking beyond the given choices.',
      '**Exam pattern:** Strategic questions worth 30+ points require structured arguments: for each option, state the operational logic, then the hidden cost/risk, then your verdict.',
    ],
  },

  {
    id: 'eg-22-4',
    section: 'Final Exam 2022',
    title: 'Part IV: Industrial Partnership',
    badge: 'Capacity + Strategy',
    badgeType: 'queue',
    originalExcerpt: `French company LC proposes co-producing BIORISAN (90/unit) at NEWBIO's Vienna factory. Would require dedicating 4 reactors to BIORISAN, leaving 9 for BIOTOPIN. Same COGS and production lead time.\n\nShould Elsa accept?`,
    storyline: `LC wants to co-produce BIORISAN (90/unit, much higher margin than BIOTOPIN at 50/unit) using 4 of NEWBIO\'s reactors. This leaves 9 reactors for BIOTOPIN, pushing utilization from 82% to 91%. New reactors cost 30M each and take 1 year to deliver.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** Capacity allocation decision with financial and operational trade-offs.',
        '**Revenue opportunity:** 4 reactors at $17.52M$ units/yr each, margin of $(90-10) = 80$/unit. Potential profit: $17.52M \\times 4 \\times 80 = 5.6B$/yr (split with LC).',
        '**Risk:** 9 reactors for BIOTOPIN = $\\rho = 144M / (9 \\times 17.52M) = 91\\%$. No spare capacity for maintenance, demand spikes, or emergencies.',
        '**Solution structure:** Accept the deal (too profitable to pass up) BUT mitigate the capacity risk.',
      ],
    },
    questionSteps: [
      {
        question: 'Should Elsa accept the industrial partnership?',
        steps: [
          { insight: 'The financial opportunity is enormous. Calculate the potential.', work: 'BIORISAN revenue potential: $17.52M \\times 4 \\times 80 = 5.6B$/yr (before profit split with LC)\nEven a 20% share = $1.12B$/yr — impossible to pass up.', result: null },
          { insight: 'But the capacity risk is severe. 91% utilization with no buffer is unsustainable.', work: 'Current: 10 reactors, $\\rho = 82\\%$, 3 spare reactors for emergencies.\nProposed: 9 reactors, $\\rho = 91\\%$, 0 spare. No room for maintenance, cleaning, or demand spikes.', result: null },
          { insight: 'Accept but mitigate: order new reactors immediately and phase in BIORISAN gradually.', work: '**Action plan:**\n1. Accept LC\'s proposal\n2. Order 3+ new reactors immediately (30M each, 1-year delivery)\n3. Phase in: dedicate 1-2 reactors to BIORISAN in year 1\n4. Full 4-reactor commitment in year 2, after new reactors arrive\n5. Protect BIOTOPIN supply chain — it is the flagship product', result: 'Accept the deal — too profitable to refuse. But order new reactors NOW and phase in production gradually to protect BIOTOPIN.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** 91% utilization is a red flag. No buffer for maintenance, demand spikes, or emergencies. Always flag high utilization even when the financial case is strong.',
      '**Tip:** For partnership/investment questions, the answer is rarely pure yes or pure no. It is "yes, with conditions" or "no, unless." Show the conditions explicitly.',
      '**Exam pattern:** Capacity allocation questions test whether you can balance financial opportunity against operational risk. Show both sides, then propose a phased mitigation plan.',
    ],
  },

  // ════════════════════════════════════════════
  // FINAL EXAM 2023 — IQ INC.
  // ════════════════════════════════════════════
  {
    id: 'eg-23-1',
    section: 'Final Exam 2023',
    title: 'Part I: IQ After-Sales Service',
    badge: 'Queueing (4 scenarios)',
    badgeType: 'queue',
    originalExcerpt: `IQ's VOXEL 3D printer has transductors that overflow once a year on average (Negative Exponential). Software detects overflow and alerts the After-Sales Service in Madrid. 4 engineers per shift, 24/7. Arrival rate: 3 calls/hr (Poisson). Service: 1 hour avg, normally distributed, std dev 15 min.\n\nAlternatives: (A) Hire 1 more engineer/shift. (B) Replace with a robot: 10 min/request, no variability, costs 6x one engineer annually. (C) Pool all 10 European centers together.\n\nAnalyze current state and all three alternatives.`,
    storyline: `IQ's Madrid after-sales center handles printer overflow alerts. $\\lambda = 3$/hr (Poisson), $S = 4$ engineers, $t_S = 60$ min ($\\sigma = 15$ min). Fire risk if overflow unresolved > 1 hour. Three proposals to compare: add staff, automate, or pool European centers.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** Four queueing scenarios to compare: current (4 engineers), +1 engineer (5), robot ($S = 1$, $t_S = 10$ min, $C_S = 0$), pooling (40 engineers, $\\lambda = 30$/hr).',
        '**Extract data:** $\\lambda = 3$/hr, $C_A = 1$ (Poisson). Service: $t_S = 60$ min, $\\sigma_S = 15$ min, so $C_S = 15/60 = 0.25$.',
        '**Key metric:** $W_q$ (wait before service starts) and $W$ (total time until overflow resolved). Fire risk increases dangerously after 1 hour total.',
        '**Cost comparison:** Robot costs 6x one engineer. But there are 3 shifts/day, so 5 engineers/shift = 15 engineers total vs 1 robot = 6 engineer-equivalents. Robot is cheaper.',
      ],
    },
    questionSteps: [
      {
        question: 'Analyze the current situation (4 engineers).',
        steps: [
          { insight: 'Standard queueing analysis with $S = 4$.', work: '$\\rho = 3/4 = 75\\%$, $C_A = 1$, $C_S = 0.25$\n$$L_q = \\frac{0.75^{\\sqrt{2 \\times 5}}}{1-0.75} \\times \\frac{1 + 0.0625}{2} = 0.856$$\n$$W_q = 0.856/3 = 0.285 \\text{ hr} = 17.1 \\text{ min}$$\n$W = 17.1 + 60 = 77.1$ min', result: 'Average total time = 77 min — exceeds the 1-hour fire danger threshold. This is risky.' },
        ],
      },
      {
        question: 'Alternative A: Add 1 engineer per shift (S = 5).',
        steps: [
          { insight: 'Same arrival/service, just one more server.', work: '$\\rho = 3/5 = 60\\%$\n$$L_q = \\frac{0.6^{\\sqrt{2 \\times 6}}}{1-0.6} \\times \\frac{1 + 0.0625}{2} = 0.226$$\n$$W_q = 0.226/3 = 0.075 \\text{ hr} = 4.5 \\text{ min}$$\n$W = 4.5 + 60 = 64.5$ min', result: '$W_q$ drops from 17 min to 4.5 min. Total time 64.5 min — still above 1 hour but much safer.' },
        ],
      },
      {
        question: 'Alternative B: Replace engineers with a robot.',
        steps: [
          { insight: 'Robot: $S = 1$, $t_S = 10$ min ($\\mu = 6$/hr), $C_S = 0$ (deterministic). Same arrivals.', work: '$\\rho = 3/6 = 50\\%$\n$$L_q = \\frac{0.5^{\\sqrt{2 \\times 2}}}{1-0.5} \\times \\frac{1 + 0}{2} = 0.25$$\n$$W_q = 0.25/3 = 0.083 \\text{ hr} = 5 \\text{ min}$$\n$W = 5 + 10 = 15$ min', result: 'Total time = 15 min — dramatically better. And robot costs 6 engineers but replaces 4 per shift (12 total for 24/7). Robot is cheaper AND faster.' },
        ],
      },
      {
        question: 'Alternative C: Pool all 10 European centers.',
        steps: [
          { insight: 'Same 4 engineers/center but all 10 centers share one queue. $S = 40$, $\\lambda = 30$/hr.', work: '$\\rho = 30/40 = 75\\%$ (same as before!)\n$$L_q = \\frac{0.75^{\\sqrt{2 \\times 41}}}{1-0.75} \\times \\frac{1 + 0.0625}{2} = 0.157$$\n$$W_q = 0.157/30 = 0.005 \\text{ hr} = 19 \\text{ seconds}$$\n$W = 0.3 + 60 = 60.3$ min', result: 'Wait drops from 17 min to **19 seconds** — no extra cost! Just let any engineer serve any printer across Europe. Same utilization, vastly better performance.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** Pooling is the most powerful lever — 17 min wait to 19 seconds with ZERO additional cost. This works because service is remote (no language barrier, no physical presence needed).',
      '**Tip:** The robot option shows the 2nd Law in action: $C_S = 0$ (deterministic) vs $C_S = 0.25$ cuts the variability factor. Combined with faster service, total time drops to 15 min.',
      '**Exam pattern:** When comparing multiple alternatives, use a consistent table format. For each: compute $\\rho$, $L_q$, $W_q$, $W$, and cost. Then recommend based on the full picture.',
    ],
  },

  {
    id: 'eg-23-2',
    section: 'Final Exam 2023',
    title: 'Part II: Ink Logistics at IQ',
    badge: 'Inventory + Strategy',
    badgeType: 'inventory',
    originalExcerpt: `IQ printers use ink cartridges (retail 40, COGS 4-10). Customers print ~200 pages/month (std dev 40, Normal). Cartridge prints 200+ pages. Customers buy from Staples/Office Depot (30% retailer margin). Pain points: (1) ink is expensive, (2) runs out at bad times.\n\nThe "Dirty Dozen" team proposes: (A) Larger cartridges, (B) Auto-replenishment (printer orders ink when low), (C) Charge at insertion not shipment, (D) Subscription model (30/month for 200 pages).\n\nAnalyze each alternative from an operations perspective.`,
    storyline: `IQ faces a declining printing market. Ink cartridges are expensive (40 retail, 28 net after retailer margin) and run out unpredictably. Half of customers buy cheaper third-party ink. The Dirty Dozen team proposes four progressively innovative models. This is a strategy question driven by inventory and supply chain concepts.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify:** This is an operations-driven strategy question. Each proposal changes the inventory model from the customer\'s perspective.',
        '**Root cause of "running out":** Customers have no safety stock (batch = 1 cartridge, zero buffer). Expensive ink + low ordering cost (just drive to store) = small batches = frequent stockouts.',
        '**Revenue math:** Retail 40/cartridge. Retailer takes 30% = 12. IQ net = 28. COGS ~7. Going direct eliminates the 12 retailer margin.',
        '**Frame each proposal:** How does it change the customer\'s inventory model (batch size, safety stock, VP, who bears holding cost)?',
      ],
    },
    questionSteps: [
      {
        question: 'Why do cartridges run out at inconvenient times? Should IQ offer larger cartridges?',
        steps: [
          { insight: 'Customer inventory model: batch = 1 cartridge, SS = 0. With zero safety stock, every cycle ends in a stockout.', work: 'Customer buys 1 cartridge when they run out (reactive, not proactive).\nNo visibility on ink level = no reorder point.\nResult: stockout every cycle. Then emergency trip to store or printing on another (non-IQ) machine.', result: null },
          { insight: 'Larger cartridge increases batch but does not fix root cause (zero safety stock). Also expensive to implement and looks even pricier vs private labels.', work: 'Larger cartridge: maybe doubles the batch. But still zero SS = still stocks out.\nRequires redesigned printer (engineering cost).\nHigher price point increases gap with private labels.\n**Better alternative:** sell pre-packs of 2-3 cartridges with volume discount.', result: 'Larger cartridge does NOT solve the root cause. Pre-packs are cheaper and more effective.' },
        ],
      },
      {
        question: 'Should IQ adopt auto-replenishment?',
        steps: [
          { insight: 'Auto-replenishment gives IQ visibility on ink level = IQ controls the ROP and SS. Customer never runs out.', work: 'Printer monitors ink level continuously ($RP = 0$).\n$VP = LT = 6/30$ months (delivery time).\n$$ROP = VP \\times D_1 + z \\times \\sigma \\times \\sqrt{VP} = \\frac{6}{30} \\times 200 + 3 \\times 40 \\times \\sqrt{1/5} = 93 \\text{ pages}$$\nThat is about half a cartridge — order when half-empty.', result: null },
          { insight: 'Going direct eliminates retailer margin (saves 12/cartridge). Even with 4 shipping cost, IQ nets 8 more per cartridge AND customer never runs out.', work: 'Store channel: IQ nets 28/cartridge. Customer stocks out.\nDirect auto-replenish: IQ nets $40 - 4 - 7 = 29$/cartridge. Customer never stocks out.\nWin-win — except retailers lose business (channel conflict).', result: 'Auto-replenishment is a clear improvement. Better margins, zero stockouts, higher loyalty.' },
        ],
      },
      {
        question: 'Should IQ charge at insertion instead of shipment? Should IQ adopt a subscription model?',
        steps: [
          { insight: 'Charging at insertion allows larger batches at customer\'s home without upfront cost. But risk: customer may lose/resell unpaid cartridges.', work: 'Insertion-based billing: customer holds more inventory but only pays when used.\nRisk: no tracking = potential fraud or loss.\nBenefit: customer has buffer stock = fewer stockouts.', result: null },
          { insight: 'Subscription (30/month for 200 pages) is the most radical proposal. Analyze from operations perspective.', work: 'At 30/month: customer pays less than retail (40/cartridge/month).\nIQ cost to serve: COGS 7 + shipping (4/4 cartridges shipped at once) = 8/cartridge.\nIQ margin: $30 - 8 = 22$/month (vs 28 currently but with higher volume and loyalty).\n\n**Key advantages:**\n- Customer never runs out (IQ manages replenishment)\n- Eliminates retailer margin entirely\n- Kills private-label substitution (subscription = locked in)\n- IQ gets usage data on every customer\n- Predictable recurring revenue', result: 'Subscription is the most transformative option. Lower price for customer, higher loyalty for IQ, predictable revenue, zero stockouts. But requires managing retailer backlash carefully.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder:** The root cause of "running out at inconvenient times" is zero safety stock, not insufficient batch size. Fix the root cause (give IQ control of ROP), not the symptom (bigger cartridges).',
      '**Tip:** When analyzing business model proposals, translate each one into inventory terms: who controls Q, ROP, SS, and who bears holding cost? This makes the comparison systematic.',
      '**Exam pattern:** Strategy questions that list multiple proposals (A, B, C, D) expect you to analyze each, show why simpler ones fail, and build towards the most innovative solution. Show the progression.',
    ],
  },
]
