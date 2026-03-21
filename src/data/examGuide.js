export const examGuide = [
  // ════════════════════════════════════════════
  // QUEUEING GYM
  // ════════════════════════════════════════════
  {
    id: 'eg-q1',
    section: 'Queueing Gym',
    title: 'Exercise 1: Customer Service',
    badge: 'Queueing',
    badgeType: 'queue',
    originalExcerpt: `Customers arrive to a customer service office at a rate of 15 customers/hr. At this office there are 2 desks, one served by a fast representative that spends on average 5 minutes per customer, and the other is served by a slower representative that can process 8 customers/hr. At the office, each desk is on a different floor so there is no physical way of having only one queue. Currently, the customers are assigned randomly with equal probability to a specific desk upon arrival.\n\nQuestion(s):\n1. What is the utilization rate of the system?\n2. What is the expected number of people waiting for a representative?\n3. How can we improve the performance of the system without using more resources?`,
    storyline: `Customers arrive to a customer service office at a rate of 15 customers/hr. Two desks on different floors (no shared queue possible). Fast rep: 5 min/customer. Slow rep: processes 8 customers/hr. Customers are randomly assigned 50/50 to each desk.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This is a **queueing problem** with two separate servers — recognize the topology first.',
        'Different floors = no pooling. Each desk is an independent $M/M/1$ system.',
        'The 50/50 split means each desk gets $\\lambda = 15 \\times 0.5 = 7.5$ customers/hr.',
        'No variability info given → assume $C_A = C_S = 1$ (standard M/M/1 assumption).',
        'Convert all units to customers/hr: fast desk $\\mu = 60/5 = 12$/hr, slow desk $\\mu = 8$/hr.',
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
    takeaway: 'System-level utilization can mask severe imbalances at the resource level. Always check individual utilizations. Pooling (single queue) is almost always better than separate queues.',
  },

  {
    id: 'eg-q2',
    section: 'Queueing Gym',
    title: 'Exercise 2: 24 Hrs. Pharmacy',
    badge: 'Queueing',
    badgeType: 'queue',
    originalExcerpt: `A local hospital has a 24 hrs. fully staffed pharmacy. In average, the pharmacy must handle 280 orders every day (standard deviation of 280 orders). There are 5 employees preparing the orders, and it takes about 25 minutes to have each order ready (standard deviation of 25 minutes).\n\nThe CEO is considering whether it will be good for the patient's safety to buy an automatic dispenser for the pharmacy. The machine takes an average of 5 minutes per order (standard deviation of 5 minutes).\n\nQuestion(s):\n1. Compute the average waiting time in queue and the average service time considering the current situation.\n2. What is the impact of replacing the employees with the automatic machine?`,
    storyline: `A hospital pharmacy runs 24 hours. Handles 280 orders/day ($\\sigma = 280$). 5 employees, each takes 25 min/order ($\\sigma = 25$ min). CEO considers replacing all 5 with one automatic machine: 5 min/order ($\\sigma = 5$ min).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This is a **topology comparison**: 5 slow servers (pooled) vs. 1 fast server.',
        'Both setups have the **same total capacity** — the question is whether topology matters.',
        'Convert daily demand to hourly: $\\lambda = 280/24 = 11.67$ orders/hr.',
        '$\\sigma_{\\text{daily}} \\approx \\text{mean}$ → $C_A \\approx 1$ (Poisson-like arrivals).',
        'Current: $M/M/5$ system. Machine: $M/M/1$ system. Same $\\rho$, different behavior.',
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
    takeaway: 'Same capacity ≠ same performance. At very high utilization (97%), $M/M/5$ has better queue behavior than $M/M/1$. The machine wins only on total time because $t_S$ is 5× shorter.',
  },

  {
    id: 'eg-q3',
    section: 'Queueing Gym',
    title: 'Exercise 3: A Hiring Decision',
    badge: 'Queueing + Cost',
    badgeType: 'queue',
    originalExcerpt: `The Chief Actuary, Steve, at a boutique reinsurance firm is asked to evaluate two potential candidates, Hannah and Elaine, for a vacant associate actuarial position. Hannah, who can underwrite an exponential rate of 6 cases per hour, has asked for an hourly salary of $40. Elaine, on the other hand, can process an exponential rate of 7 cases per hour, and intends to use this advantage to negotiate her salary.\n\nLet's denote Elaine's hourly salary as $x for now. Steve estimates that, on average, each case incurs a waiting cost of $100 per hour to the firm while it remains in the pipeline and should be accounted for in the hiring decision.\n\nQuestion(s):\nIf the sales department generates cases at a Poisson rate of 3 per hour, determine the following:\n1. What is the total labor and case waiting cost per hour to the firm if Hannah is hired (denoted C_H)? What about Elaine (denoted C_E)?\n2. Suppose Steve's hiring decision is based on minimizing total labor and case waiting cost per hour. What salary range can Elaine tell Steve if she knows Hannah has asked for $40 per hour?`,
    storyline: `A reinsurance firm is hiring. Hannah: $\\mu = 6$/hr, salary \\$40/hr. Elaine: $\\mu = 7$/hr, salary \\$x/hr. Each case in the pipeline costs the firm \\$100/hr. Cases arrive at Poisson rate $\\lambda = 3$/hr.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This is a **cost optimization** problem, not just queueing. Total cost = labor + waiting cost.',
        '"Poisson arrivals" + "exponential service" → $M/M/1$ with $C_A = C_S = 1$.',
        'Waiting cost applies to cases **in the system** ($L$), not just in the queue ($L_q$).',
        'For $M/M/1$: $L = \\rho / (1 - \\rho)$.',
        'Express Elaine\'s cost as a function of $x$, then solve for the break-even.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the total labor and case waiting cost per hour if Hannah is hired (C_H)? What about Elaine (C_E)?',
        steps: [
          { insight: 'For $M/M/1$: $L = \\rho/(1-\\rho)$. Total cost = salary + \\$100 × $L$.', work: '**Hannah:** $\\rho = 3/6 = 0.5$\n$L = 0.5 / (1 - 0.5) = 1.0$\n$$C_H = 40 + 100 \\times 1.0 = \\$140/\\text{hr}$$', result: '$C_H = \\$140$/hr' },
          { insight: 'Elaine is faster → fewer cases in system → lower waiting cost. But salary is unknown.', work: '**Elaine:** $\\rho = 3/7 = 0.429$\n$L = 0.429 / (1 - 0.429) = 0.75$\n$$C_E = x + 100 \\times 0.75 = x + \\$75/\\text{hr}$$', result: '$C_E = (x + 75)$/hr' },
        ],
      },
      {
        question: 'What salary range can Elaine request?',
        steps: [
          { insight: 'Steve picks whoever is cheaper. Elaine gets the job if $C_E \\leq C_H$.', work: '$$x + 75 \\leq 140$$\n$$x \\leq \\$65/\\text{hr}$$', result: 'Elaine can ask up to **\\$65/hr** — that is \\$25 MORE than Hannah, because her speed saves \\$25/hr in waiting costs.' },
        ],
      },
    ],
    takeaway: 'Faster service has quantifiable economic value. Elaine can charge \\$25 more because her speed reduces queue congestion by \\$25/hr. This is the economic value of reducing $L$.',
  },

  {
    id: 'eg-q4',
    section: 'Queueing Gym',
    title: 'Exercise 4: Express Checkout',
    badge: 'Queueing + Strategy',
    badgeType: 'queue',
    originalExcerpt: `A supermarket chain is evaluating the possibility of introducing an "express line". The idea is to dedicate the use of one of the existing lines to customers carrying less than 10 items. Alex, the manager of the supermarket, before implementing the change decides to collect some information on the current process. After measuring the performance of his cashiers, he realized that customers split randomly among the 4 lines and that they almost never switch lines after joining one. The supermarket received 12 customers/hr. The average service time was 12 minutes with a standard deviation of 12 minutes.\n\nAlex also characterized the service time for customers carrying less than 10 items. He discovered that 50% of all customers qualified for the "express line" and that the average service time for them was 5 minutes, with a standard deviation of 1 minute.\n\nQuestion(s):\n1. Compute the service performance for the current situation.\n2. How will be the service for the "express line" customers if Alex decides to implement the dedicated line?\n3. Imagine that you are the manager of the store, will you implement the dedicated line? Why?`,
    storyline: `A supermarket has 4 checkout lines, customers split randomly. $\\lambda = 12$/hr, $t_S = 12$ min ($\\sigma = 12$). 50% of customers qualify for express: $t_S = 5$ min ($\\sigma = 1$). Alex considers dedicating 1 of the 4 lines to express customers.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'Current: 4 separate $M/G/1$ systems (random split, no lane switching).',
        'Each line gets $\\lambda = 12/4 = 3$/hr. Service rate $\\mu = 60/12 = 5$/hr. $C_S = 12/12 = 1$.',
        'Proposed: 1 dedicated express line + 3 regular lines. Must analyze both segments.',
        'Express customers have **low variability** ($C_S = 1/5 = 0.2$) — dedicated lines work well for low-CV service.',
        'Regular customers\' $t_S$ must be derived: $12 = 0.5 \\times 5 + 0.5 \\times X \\Rightarrow X = 19$ min.',
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
    takeaway: 'Dedicating resources sacrifices pooling efficiency but can dramatically improve service for a specific segment, especially when that segment has low service variability ($C_S = 0.2$). Always check the impact on the *other* segment.',
  },

  // ════════════════════════════════════════════
  // INVENTORY GYM
  // ════════════════════════════════════════════
  {
    id: 'eg-i1',
    section: 'Inventory Gym',
    title: 'Exercise 1: The Big Headache',
    badge: 'EOQ',
    badgeType: 'inventory',
    originalExcerpt: `A drug store chain has two options for purchasing aspirins. They can buy prepackaged aspirin that come already in bottles. Otherwise, they can ask a subcontractor to purchase bulk aspirin and bottle them for the drug stores. In either case the aspirin will be sold under the drug store's own brand at the same price.\n\nIf they subcontract bottling of the aspirin, the subcontractor charges a fix cost of $1,000 for each order and $50 for each carton of 50 bottles. The prepackaged aspirin cost $60 per carton (50 bottles as well) and has a fix ordering charge of $10 per order.\n\nDemand for aspirin is estimated to be 150,000 bottles a year (3,000 cartons). Annual inventory cost equals 30% of the unit price. Assume production runs are completed in negligible amount of time.\n\nQuestion(s):\n1. What is the optimal batch size if they pack their own aspirin? And if they buy the prepackaged aspirin?\n2. From a total cost standpoint, should the drugstore purchase the prepackaged aspirin or subcontract the bottling?`,
    storyline: `A drug store chain can buy aspirin two ways. Subcontract: $S = \\$1{,}000$/order, $v = \\$50$/carton. Prepackaged: $S = \\$10$/order, $v = \\$60$/carton. Demand: $D = 3{,}000$ cartons/yr. Holding cost: $i = 30\\%$ of unit price.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This is a **supplier comparison** using EOQ. No safety stock needed (no demand uncertainty given).',
        'Each supplier has different $S$ (ordering cost) and $v$ (unit price) — compute EOQ for each.',
        'Total cost = purchasing + ordering + holding. Purchasing cost differences usually dominate.',
        'Use: $EOQ = \\sqrt{\\frac{2DS}{vi}}$',
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
          { insight: 'Add up ALL cost components: purchasing + ordering + cycle stock holding.', work: '**Subcontract:**\nPurchase: $3000 \\times 50 = \\$150{,}000$\nOrdering: $(3000/632) \\times 1000 = \\$4{,}747$\nHolding: $(632/2) \\times 50 \\times 0.30 = \\$4{,}740$\n$\\text{Total} = \\$159{,}487$\n\n**Prepackaged:**\nPurchase: $3000 \\times 60 = \\$180{,}000$\nOrdering: $(3000/58) \\times 10 = \\$517$\nHolding: $(58/2) \\times 60 \\times 0.30 = \\$522$\n$\\text{Total} = \\$181{,}039$', result: 'Subcontract wins by ~\\$21,500/yr. The \\$10/carton price advantage saves \\$30,000 in purchasing — dwarfing the higher ordering costs.' },
        ],
      },
    ],
    takeaway: 'When comparing suppliers, unit cost differences often dominate ordering/holding differences. Always compute the FULL total cost, not just EOQ-related costs.',
  },

  {
    id: 'eg-i2',
    section: 'Inventory Gym',
    title: 'Exercise 2: Celebration Time',
    badge: 'EOQ + Periodic',
    badgeType: 'inventory',
    originalExcerpt: `A bar uses 5,000 quart bottles of cava each year. The cava cost $3 per bottle and is served in whole bottles since it loses its bubbles quickly. To replenish the inventory there is a fix cost of $10 per order. Holding costs are 20% of the unit price per bottle per year. It takes 3 weeks for an order to arrive.\n\nWeekly demand is random, with a mean of 100 bottles and a standard deviation of 30. The manager would like to minimize the inventory cost but have enough inventory to satisfy customer demand 95% of the time.\n\nQuestion(s):\n1. Compute the optimal order quantity for this situation.\n2. If a periodic review is used, what is the optimal base stock level?`,
    storyline: `A bar uses 5,000 bottles of cava/year. $v = \\$3$/bottle, $S = \\$10$/order, $i = 20\\%$. Lead time: 3 weeks. Weekly demand: $\\mu = 100$, $\\sigma = 30$. Target: 95% service level.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'Q1 is standard **EOQ** — work in weekly units since demand is given weekly.',
        'Q2 switches to **periodic review** — use EOQ to estimate review period $R$, then compute base stock.',
        'Key difference: periodic review has $VP = LT + R$, requiring more safety stock.',
        'Weekly holding cost: $h = v \\times i / 52 = 3 \\times 0.2 / 52 = \\$0.012$/bottle/week.',
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
    takeaway: 'Periodic review requires more safety stock than continuous review because $VP = LT + R$ instead of just $LT$. The fill rate approach gives a different $z$ than the simple service level — know which method the problem requires.',
  },

  {
    id: 'eg-i3',
    section: 'Inventory Gym',
    title: 'Exercise 3: Frozen Delights',
    badge: 'EOQ + SS + ROP',
    badgeType: 'inventory',
    originalExcerpt: `Frozen Delights is reviewing an inventory control system for manufacturing ice‐cream. Currently it orders a 10 day supply of ice‐cream whenever on‐hand inventory falls below the reorder point. The cost of launching an order is estimated at 200€. Manufacturing can be started at any time and lead time is one day. Sales are estimated to be normally distributed with an average of 80 liters/day and a standard deviation of 20 liters/day. The manufacturing variable cost amounts to 10€/liter and the manufacturing capacity is very large. Current health regulations establish that ice cream cannot be stored for a period longer than 4 months.\n\nFrozen Delights assumes a 15% annual cost of inventory holding when making manufacturing decisions and wishes to ensure a 99% safety level on its products.\n\nQuestion(s):\n1. Compute the current batch size.\n2. What is the optimal batch size?\n3. Compute the annual savings of using the optimal batch size.\n4. What is the safety stock that they should have?\n5. Stockout frequency with current batch size?\n6. If they move to using the optimal batch size, the safety stock would: increase, stay the same, or decrease?\n7. What should the optimal reorder point be (with the current batch size)?\n8. What should the optimal reorder point be (with the optimal batch size)?`,
    storyline: `Frozen Delights manufactures ice cream. Current policy: 10-day supply orders. $S = €200$/order, $LT = 1$ day, daily demand $\\bar{D} = 80$ L ($\\sigma = 20$), $v = €10$/L, $i = 15\\%$, service level $= 99\\%$. Continuous review (can order anytime).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This problem tests **both** inventory decisions: batch size (EOQ) and safety stock (SS/ROP).',
        'Key insight: $Q$ and $SS$ are **independent** — changing one does not affect the other.',
        'Continuous review ("can be started at any time") → $VP = LT = 1$ day (no review period).',
        'Annual demand: $D = 365 \\times 80 = 29{,}200$ L/yr.',
        'For 99% service level: $z = 2.33$.',
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
          { insight: 'Compare only differential costs: ordering + cycle stock holding. Manufacturing cost is the same regardless of $Q$.', work: '**Current** ($Q = 800$):\nOrdering: $29200/800 \\times 200 = €7{,}300$\nHolding: $400 \\times 10 \\times 0.15 = €600$\nTotal $= €7{,}900$\n\n**Optimal** ($Q = 2790$):\nOrdering: $29200/2790 \\times 200 = €2{,}093$\nHolding: $1395 \\times 10 \\times 0.15 = €2{,}093$\nTotal $= €4{,}186$', result: 'Savings $= €7{,}900 - €4{,}186 = €3{,}714$/yr' },
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
    takeaway: '$Q$ and $SS$ are independent decisions. $Q$ optimizes ordering vs. holding costs. $SS$ protects against demand variability during $VP$. Changing one does not affect the other. More orders/year = more chances for stockout, even with the same per-cycle service level.',
  },

  {
    id: 'eg-i4',
    section: 'Inventory Gym',
    title: 'Exercise 4: Purchasing Emmental Cheese',
    badge: 'EOQ + Stockout',
    badgeType: 'inventory',
    originalExcerpt: `A small store specialized in high quality cheese wants to check its purchasing policy. Although the store has approximately 100 references of cheese, to start the analysis, the owner decides to study a particular example of their supply of Swiss Emmental, which can be taken as a representative reference. These are the conclusions drawn from the preliminary analysis:\n\ni. The provider charges 3 € as a fixed cost for each order and 5 €/kg for the cheese.\nii. On average, they sell 1 kg of Swiss Emmental daily, with a standard deviation of σ = 0.5 kg.\n\nThe supplier guarantees the delivery of an order in 4 days. The store is open every day of the year and estimates its cost of capital to be 20% annually. Emmental inventory in the store is continuously checked, and the owner always makes an order for a quantity of 10 kg when the stock in the store falls below 5 kg.\n\nQuestion(s):\n1. Do you think the Emmental purchasing policy is appropriate? Otherwise, do you propose other order size and/or reorder point?\n2. How likely will the store run out of Emmental with its current policy?\n3. How should the reorder point change if the store wants the probability of stock-out to be 1% in each replenishment cycle?`,
    storyline: `A cheese store audits its Swiss Emmental policy. $S = €3$/order, $v = €5$/kg. Daily demand: $\\bar{D} = 1$ kg, $\\sigma = 0.5$. $LT = 4$ days, $i = 20\\%$. Continuous review. Current: $Q = 10$ kg, $ROP = 5$ kg.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'This is a **policy audit** — evaluate the current policy, then propose improvements.',
        'First check: are ordering and holding costs balanced? (At EOQ they should be roughly equal.)',
        'Reverse-engineer the implied safety stock and service level from the current ROP.',
        'Continuous review → $VP = LT = 4$ days.',
        'Reality check: EOQ may not be practical with 100 cheese types and perishability constraints.',
      ],
    },
    questionSteps: [
      {
        question: 'Is the purchasing policy appropriate?',
        steps: [
          { insight: 'Check cost balance. If ordering $\\gg$ holding, batch is too small.', work: '$SS = ROP - \\bar{D} \\times VP = 5 - 1 \\times 4 = 1$ kg\nMaintenance: $(SS + Q/2) \\times v \\times i = (1+5) \\times 5 \\times 0.20 = €6$/yr\nOrdering: $(365/10) \\times 3 = €109.50$/yr', result: 'Ordering cost (€110) ≫ Holding cost (€6). Batch is way too small!' },
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
    takeaway: 'Always audit by checking: (1) are ordering ≈ holding costs? (2) what service level does the current SS imply? Here, ordering was 18× higher and stockout risk was 16%. But EOQ must be tempered by real-world constraints (perishability, storage).',
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
    storyline: `Medcorp Spain needs titanium screws. Daily demand: $\\bar{D} = 100$ boxes ($\\sigma = 30$). Inventory checked daily at 8 AM ($R = 1$ day). $i = 10\\%$, warehouse max $= 2{,}000$ boxes. SL $= 99\\%$ (health product).\n\nUS: $v = €500$, $S = €100$, transport $= €10$/box, $LT = 7$ days.\nPortugal: $v = €300$, $S = €150$, transport $= €7.50$/box, $LT = 1$ day.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        'Full **supplier comparison** with inventory policy design: EOQ + SS + ROP for each.',
        'Health-related product → assume $SL = 99\\% \\Rightarrow z = 2.33$.',
        '**TRAP**: "checks inventory daily at 8:00" means $R = 1$ day → $VP = LT + R$, NOT just $LT$.',
        'Separate **non-differential costs** (purchasing, transport per unit) from **differential costs** (ordering, cycle stock holding).',
        'Annual demand: $D = 100 \\times 365 = 36{,}500$ boxes/yr.',
      ],
    },
    questionSteps: [
      {
        question: 'What should Medcorp\'s inventory policy for titanium screws be?',
        steps: [
          { insight: 'First compute non-differential costs for each supplier.', work: '**US:** Purchase $= 500 \\times 36500 = €18{,}250{,}000$/yr, Transport $= 10 \\times 36500 = €365{,}000$/yr\n**Portugal:** Purchase $= 300 \\times 36500 = €10{,}950{,}000$/yr, Transport $= 7.5 \\times 36500 = €273{,}750$/yr', result: null },
          { insight: '$VP = LT + R$ because of daily periodic review.', work: '**US:** $VP = 7 + 1 = 8$ days\n$SS = 2.33 \\times 30 \\times \\sqrt{8} = 198$ boxes → holding $= 198 \\times 0.10 \\times 500 = €9{,}900$/yr\n$ROP = 100 \\times 8 + 198 = 998$ boxes\n\n**Portugal:** $VP = 1 + 1 = 2$ days\n$SS = 2.33 \\times 30 \\times \\sqrt{2} = 99$ boxes → holding $= 99 \\times 0.10 \\times 300 = €2{,}970$/yr\n$ROP = 100 \\times 2 + 99 = 299$ boxes', result: null },
          { insight: 'Compute EOQ for each.', work: '**US:** $EOQ = \\sqrt{\\frac{2 \\times 36500 \\times 100}{0.10 \\times 500}} = 382$ boxes\nOrdering $= €9{,}555$/yr, Cycle holding $= €9{,}550$/yr\n\n**Portugal:** $EOQ = \\sqrt{\\frac{2 \\times 36500 \\times 150}{0.10 \\times 300}} = 604$ boxes\nOrdering $= €9{,}065$/yr, Cycle holding $= €9{,}060$/yr', result: null },
          { insight: 'Add ALL costs for total comparison.', work: '**US Total:** $18{,}250{,}000 + 365{,}000 + 9{,}900 + 9{,}555 + 9{,}550 = €18{,}644{,}005$\n**Portugal Total:** $10{,}950{,}000 + 273{,}750 + 2{,}970 + 9{,}065 + 9{,}060 = €11{,}244{,}845$', result: '**Portugal saves ~€7.4M/yr.** Policy: order 604 boxes from Portugal whenever inventory falls below 299 boxes. Check daily at 8 AM.' },
        ],
      },
    ],
    takeaway: 'The $VP = LT + R$ trap is the #1 exam pitfall. Unit cost differences dominate — Portugal\'s €200/box savings × 36,500 boxes = €7.3M. Always state the complete policy: Q, ROP, and review schedule.',
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
        'This is a **capacity analysis** — identify all resource types and compute how many of each are needed.',
        'Three resource types: employees, precision scales, sterilization units.',
        'An employee does BOTH picking and checking → 40 min/kit per employee.',
        'Available time per resource: $4 \\times 60 = 240$ min/shift.',
        'Always round UP (can\'t have 0.67 of a person) and consider practical utilization targets.',
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
    takeaway: 'Capacity analysis requires identifying ALL distinct resources, not just "workers." The bottleneck is sterilization (60 min/kit). Plan for <85% utilization and consider sequencing constraints.',
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
        'This is a **queueing SLA** problem — compute $W_q$ and check against the 3-minute target.',
        'Single queue, $S$ servers → use the general queueing formula.',
        'Phone calls → assume Poisson arrivals: $C_A = 1$.',
        '$C_S = \\sigma/t_S = 5/20 = 0.25$ (low variability — operators are consistent).',
        'If $S = 4$ fails, try $S = 5$ and show the dramatic improvement.',
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
    takeaway: 'One extra server dropped $W_q$ from 10.75 to 2.35 min — a 78% reduction! Going from $\\rho = 83\\%$ to $67\\%$ has a massive nonlinear effect. When evaluating SLAs, always compute $W_q$ explicitly.',
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
        'This is a **strategic analysis** — no formulas, but OM concepts (pooling, supply chain design) apply.',
        'Identify the consultant\'s rationale: inventory pooling, disintermediation, standardization.',
        'Analyze both **pros** (cost savings, efficiency) and **cons** (demand destruction, local complexity).',
        'The key tension: supply-side optimization vs. demand-side relationships.',
        'For Miguel: weigh business results vs. ethical/organizational concerns.',
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
    takeaway: 'Supply chain optimization cannot ignore the demand side. The "strategic triangle" matters: efficiency vs. responsiveness vs. customer relationships. Always consider who drives demand, not just who moves inventory.',
  },
]
