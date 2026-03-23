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
        '**Identify** This is a queueing problem. Two desks on different floors means there is no shared queue — so we are dealing with two separate $M/M/1$ systems, not a pooled system.',
        '**Extract the data** Total arrivals $\\lambda = 15$/hr, split 50/50 → each desk gets $7.5$/hr. Fast desk: $t_S = 5$ min → $\\mu = 12$/hr. Slow desk: $\\mu = 8$/hr (given directly).',
        '**Assumptions** No info on variability, so assume $C_A = C_S = 1$ (the standard assumption when nothing is stated). This makes it a classic $M/M/1$.',
        '**Watch out** System-level utilization (75%) looks fine, but individual desk utilization can be wildly different. The slow desk at 94% is the real problem.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the utilization rate of the system?',
        steps: [
          { insight: 'System utilization = total demand / total capacity. But be careful — individual desk utilizations can be very different.', dumb: 'Think of it like a highway — 75% full sounds fine, but some lanes might be jammed while others are empty.', work: '**Formula** $\\rho = \\lambda / (S \\times \\mu)$\nwhere $\\rho$ = utilization, $\\lambda$ = arrival rate, $S$ = servers, $\\mu$ = service rate/server\n\n$\\text{Total capacity} = 12 + 8 = 20$ customers/hr\n$$\\rho_{\\text{system}} = \\frac{\\lambda}{\\text{capacity}} = \\frac{15}{20} = 0.75 = 75\\%$$', result: '$\\rho_{\\text{system}} = 75\\%$' },
        ],
      },
      {
        question: 'What is the expected number of people waiting for a representative?',
        steps: [
          { insight: 'Even though the system is at 75%, individual desks tell a very different story. The slow desk gets the same arrival rate but has lower capacity — it is dangerously overloaded.', dumb: 'The average hides the truth. One desk is basically drowning while the other is chilling.', work: '**Formula** $L_q = \\rho^2/(1-\\rho)$ for $M/M/1$ (since $C_A = C_S = 1$, variability factor = 1)\nwhere $L_q$ = avg customers waiting, $\\rho$ = utilization per desk\n\n$\\text{Fast desk: } \\rho = 7.5/12 = 62.5\\%$\n$\\text{Slow desk: } \\rho = 7.5/8 = 93.75\\%$ ← danger zone!', result: null },
          { insight: 'Use the $M/M/1$ formula for each desk. Notice how a small increase in $\\rho$ causes an explosion in $L_q$ — this is the nonlinear nature of queues.', dumb: 'Just plug the numbers in. The slow desk\'s queue explodes because 94% utilization is like a highway with one lane closed during rush hour.', work: '$$L_q = \\frac{\\rho^2}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2}$$\n$\\text{Fast desk: } L_q = \\frac{0.625^2}{0.375} \\times 1 = 1.04$\n$\\text{Slow desk: } L_q = \\frac{0.9375^2}{0.0625} \\times 1 = 14.06$', result: '$L_q^{\\text{total}} = 1.04 + 14.06 = 15.1$ people waiting' },
        ],
      },
      {
        question: 'How can we improve the performance of the system without using more resources?',
        steps: [
          { insight: 'The root cause is unbalanced utilization: 94% vs 63%. We can fix this by changing routing probabilities to equalize $\\rho$.', dumb: 'Stop sending equal customers to unequal desks. Send more people to the faster desk — it can handle it.', work: '**Approach** Equalize $\\rho$ across desks\n\n$\\text{Target: } \\rho_{\\text{fast}} = \\rho_{\\text{slow}} = 0.75$\n$\\text{Fast desk: } \\lambda = 0.75 \\times 12 = 9$ → route 60% of arrivals\n$\\text{Slow desk: } \\lambda = 0.75 \\times 8 = 6$ → route 40% of arrivals', result: 'Route 60% to fast desk, 40% to slow desk. Or better: create a single pooled queue.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** System-level $\\rho$ can hide dangerous imbalances. Always check utilization at each individual resource — the slow desk at 94% was the real problem.',
      '**Tip** If you see separate queues in a problem, immediately think about pooling. A single shared queue feeding all servers almost always reduces total waiting.',
      '**Exam pattern** When asked "how to improve without more resources," think about rebalancing (routing probabilities) or pooling — not hiring.',
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
        '**Identify** This is a comparison between two system designs — 5 slow humans vs. 1 fast machine. Both have the same total capacity, so the question is: does the number of servers matter?',
        '**Extract the data** The pharmacy runs 24 hours, so convert daily to hourly: $\\lambda = 280/24 = 11.67$/hr. The standard deviation equals the mean ($\\sigma = 280$), which signals $C_A \\approx 1$ (Poisson-like).',
        '**Frame the comparison** Current = $M/M/5$ (5 servers, each at $\\mu = 2.4$/hr). Machine = $M/M/1$ (1 server at $\\mu = 12$/hr). Total capacity is 12/hr in both cases, so $\\rho = 97.2\\%$ in both.',
        '**Watch out** Same $\\rho$ does NOT mean same performance. At 97% utilization, 5 pooled servers handle variability much better than 1 server. But the machine has a huge advantage in service time ($t_S = 5$ vs 25 min).',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the average waiting time in queue and the average service time considering the current situation.',
        steps: [
          { insight: 'With 5 servers, we need to find $C_A$ and $C_S$ before computing anything. These are the coefficients of variation that measure how unpredictable arrivals and service are.', dumb: 'Five slow workers sharing one queue. They can barely keep up — 97% busy means almost no breathing room.', work: '**Finding $C_A$ (arrival variability)**\nThe problem states $\\sigma_{\\text{daily}} = 280$ orders and mean $= 280$ orders/day.\n$C_A = \\sigma / \\text{mean} = 280/280 = 1$\nWhen $\\sigma$ equals the mean, $C_A = 1$ — this is Poisson-like (natural randomness).\n\n**Finding $C_S$ (service variability)**\nService time: mean $= 25$ min, $\\sigma = 25$ min.\n$C_S = \\sigma_S / t_S = 25/25 = 1$\nWhen $\\sigma$ equals the mean, $C_S = 1$ — this is exponential service.\n\nWith $C_A = C_S = 1$, this is an $M/M/5$ system (Poisson arrivals, exponential service, 5 servers).\n\n**Formula** $\\rho = \\lambda/(S \\times \\mu)$\nwhere $\\rho$ = utilization, $\\lambda$ = arrival rate, $S$ = servers, $\\mu$ = service rate per server\n\n$\\mu = 60/25 = 2.4$ orders/hr per server\n$\\text{Total capacity} = 5 \\times 2.4 = 12$ orders/hr\n$$\\rho = \\frac{11.67}{12} = 97.2\\%$$', result: null },
          { insight: 'At 97% utilization with 5 servers, compute $L_q$ using the approximation formula, then derive $W_q$ via Little\'s Law.', dumb: '97% utilization is like a highway at near-standstill. Even with 5 lanes, everyone is barely crawling.', work: '**Formula** $L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1-\\rho} \\times \\frac{C_A^2 + C_S^2}{2}$\nwhere $\\rho = 0.972$, $S = 5$, $C_A = 1$, $C_S = 1$\n\n$\\sqrt{2(5+1)} = \\sqrt{12} = 3.46$\n$\\rho^{3.46} = 0.972^{3.46} = 0.905$\n$$L_q = \\frac{0.905}{1 - 0.972} \\times \\frac{1 + 1}{2} = \\frac{0.905}{0.028} \\times 1 = 32.3$$\n\n**Then** $W_q = L_q / \\lambda$\nwhere $W_q$ = wait time, $L_q$ = queue length, $\\lambda$ = arrival rate\n$W_q = 32.3 / 11.67 = 2.77$ hrs $\\approx 2.79$ hrs\n\n**Then** $W = W_q + t_S$\n$t_S = 25/60 = 0.417$ hrs\n$$W = 2.79 + 0.417 = 3.21 \\text{ hrs}$$\n\nNote: the exact $M/M/5$ result gives $W_q = 2.79$ hrs. Our approximation formula gives $\\approx 2.77$ hrs — close enough for exam purposes.', result: '$W_q \\approx 2.79$ hrs, $W = 3.21$ hrs' },
        ],
      },
      {
        question: 'What is the impact of replacing the employees with the automatic machine?',
        steps: [
          { insight: 'The machine is 5× faster, so one machine has the **same total capacity** as 5 employees. But the topology changes from $M/M/5$ to $M/M/1$.', dumb: 'One super-fast robot vs five slow humans. Same total speed, but the robot finishes each job in 5 min instead of 25. The queue behaves differently though.', work: '**Formula** $\\rho = \\lambda/(S \\times \\mu)$\nwhere $\\rho$ = utilization, $\\lambda$ = arrival rate (11.67/hr), $S$ = servers (now 1), $\\mu$ = service rate per server\n\n$\\mu = 60/5 = 12$ orders/hr (1 server)\n$\\rho = 11.67/12 = 97.2\\%$ ← same utilization!\n$C_S = 5/5 = 1$', result: null },
          { insight: 'Despite identical utilization, the outcomes differ because of topology.', dumb: 'Same workload, different experience. The robot wins on total time because each job is done in 5 min, but the queue itself is slightly worse with just one server.', work: '**Formula** $W = W_q + t_S$\nwhere $W$ = total time in system, $W_q$ = wait time in queue, $t_S$ = service time $= 1/\\mu$\n\n$W_q = 2.91$ hrs (from $M/M/1$ formula: $L_q = \\rho^2/(1-\\rho) = 0.972^2/0.028 = 33.7$, then $W_q = L_q/\\lambda = 33.7/11.67 = 2.91$ hrs)\n$t_S = 5/60 = 0.083$ hrs\n$$W = 2.91 + 0.083 = 3.0 \\text{ hrs}$$\n$\\text{Savings: } 3.21 - 3.0 = 0.21$ hrs $= 12.6$ min faster', result: '$W$ drops by 12.6 min. But $W_q$ is actually slightly *worse* — the gain comes entirely from faster service, not less waiting.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Same total capacity does NOT mean same queue performance. At high $\\rho$, multiple slow servers ($M/M/5$) handle variability better than one fast server ($M/M/1$).',
      '**Tip** When comparing system designs, separate $W_q$ (waiting) from $t_S$ (service time). The machine won on total time $W$ only because service was 5× faster — the actual queue was slightly worse.',
      '**Exam pattern** If a problem gives you two systems with the same $\\rho$, the exam is testing whether you understand that topology (number of servers) matters.',
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
        '**Identify** This is NOT just a queueing problem — it is a cost optimization. You need to compare total cost (salary + waiting cost) for each candidate.',
        '**Extract the data** "Poisson arrivals" and "exponential service" are code words for $M/M/1$ ($C_A = C_S = 1$). $\\lambda = 3$/hr. Hannah: $\\mu = 6$, salary 40. Elaine: $\\mu = 7$, salary $x$.',
        '**Key formula** Total cost = salary + 100 $\\times$ $L$ (cases in system). Use $L = \\rho/(1-\\rho)$ for $M/M/1$. The waiting cost uses $L$ (total in system), not $L_q$ (only in queue), because cases being served still cost money.',
        '**Strategy** Compute both costs, then set $C_E \\leq C_H$ to find Elaine\'s maximum salary.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the total labor and case waiting cost per hour if Hannah is hired? What about Elaine?',
        steps: [
          { insight: 'For $M/M/1$: $L = \\rho/(1-\\rho)$. Total cost = salary + $100 \\times L$.', work: '**Hannah** $\\rho = 3/6 = 0.5$\n$L = 0.5 / (1 - 0.5) = 1.0$\n$$C_H = 40 + 100 \\times 1.0 = 140 \\text{ per hr}$$', result: '$C_H = 140$ per hr' },
          { insight: 'Elaine is faster, so fewer cases pile up in the system, meaning lower waiting cost. But her salary is unknown ($x$).', dumb: 'Faster worker = shorter pipeline = less money burning while cases wait. Her speed literally has a dollar value.', work: '**Elaine** $\\rho = 3/7 = 0.429$\n$L = 0.429 / (1 - 0.429) = 0.75$\n$$C_E = x + 100 \\times 0.75 = x + 75 \\text{ per hr}$$', result: '$C_E = (x + 75)$ per hr' },
        ],
      },
      {
        question: 'What salary range can Elaine request?',
        steps: [
          { insight: 'Steve picks whoever is cheaper. Elaine gets the job if $C_E \\leq C_H$.', dumb: 'Simple math: if Elaine\'s total cost (salary + pipeline waste) is less than Hannah\'s, hire Elaine. She can charge more because she wastes less.', work: '$$x + 75 \\leq 140$$\n$$x \\leq 65 \\text{ per hr}$$', result: 'Elaine can ask up to $65$/hr — that is $25$ MORE than Hannah, because her speed saves $25$/hr in waiting costs.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Faster service has a dollar value. Elaine can charge 25 more per hour because her speed saves 25/hr in waiting costs. Speed is not free — and its value can be calculated.',
      '**Tip** When a problem mentions "waiting cost per unit of time," the total cost formula is: salary + waiting cost × $L$ (total in system, not just in queue). Cases being served also tie up capital.',
      '**Exam pattern** "Poisson" + "exponential" = $M/M/1$ with $C_A = C_S = 1$. This simplifies $L_q$ to $\\rho^2/(1-\\rho)$ and $L$ to $\\rho/(1-\\rho)$.',
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
        '**Identify** This is a pooling vs. dedication trade-off. Currently 4 identical lines (all customers mixed). The proposal: dedicate 1 line to express customers (< 10 items).',
        '**Current setup** 4 separate lines, random split → each gets $\\lambda = 3$/hr. $\\mu = 5$/hr. $C_S = 12/12 = 1$. This is four independent $M/G/1$ systems.',
        '**Express line analysis** Express customers have very consistent service ($\\sigma = 1$ min, so $C_S = 0.2$). Low variability makes dedicated lines work well — the queue length formula drops by nearly half.',
        '**Watch out** You must check what happens to the regular customers too. Removing express customers changes the average service time for the remaining 3 lines. Use the mixture formula: $12 = 0.5 \\times 5 + 0.5 \\times X$ → regular $t_S = 19$ min.',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the service performance for the current situation.',
        steps: [
          { insight: 'Currently 4 identical lines with random customer split. Each line is an independent $M/G/1$ system. We need to find the parameters for ONE line, then that applies to all four.', dumb: 'Four identical lines, four identical answers. Do the math once and you\'re done.', work: '**Step 1: Find the parameters for one line**\nTotal arrivals: $\\lambda_{\\text{total}} = 12$/hr, split among 4 lines equally\n$\\lambda_{\\text{per line}} = 12/4 = 3$ customers/hr\n\nService rate: $t_S = 12$ min → $\\mu = 60/12 = 5$ customers/hr\n\n**Step 2: Find $C_A$ and $C_S$**\n$C_A = 1$ (random split of arrivals → Poisson → $C_A = 1$)\n$C_S = \\sigma_S / t_S = 12/12 = 1$ (high variability — some customers have 2 items, others have 50)\n\n**Step 3: Compute $\\rho$**\n$$\\rho = \\frac{\\lambda}{S \\times \\mu} = \\frac{3}{1 \\times 5} = 0.6 = 60\\%$$\n\n**Step 4: Compute $L_q$**\n**Formula** $L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1-\\rho} \\times \\frac{C_A^2+C_S^2}{2}$\nwhere $\\rho = 0.6$, $S = 1$ (one cashier per line), $C_A = 1$, $C_S = 1$\n\nExponent: $\\sqrt{2(1+1)} = \\sqrt{4} = 2$\n$\\rho^2 = 0.6^2 = 0.36$\nVariability factor: $(1^2 + 1^2)/2 = 1$\n$$L_q = \\frac{0.36}{1 - 0.6} \\times 1 = \\frac{0.36}{0.4} = 0.9 \\text{ customers per line}$$\n\n**Step 5: Derive $W_q$ and $W$**\n$W_q = L_q / \\lambda = 0.9 / 3 = 0.3$ hr $= 18$ min\n$W = W_q + t_S = 18 + 12 = 30$ min', result: 'Every customer waits 18 min in queue, 30 min total. This is the SAME for all customers regardless of basket size.' },
        ],
      },
      {
        question: 'How will the service be for express customers with a dedicated line?',
        steps: [
          { insight: 'First find the express line parameters. All express-eligible customers (50%) go to this one dedicated line.', dumb: 'All quick shoppers funneled into one lane. Figure out how many show up, how fast they are served, and how predictable the service is.', work: '**Parameters**\nExpress customers = 50% of 12 = $\\lambda = 6$/hr\nService: $t_S = 5$ min → $\\mu = 60/5 = 12$/hr\n$S = 1$ cashier\n\n**Variability**\n$C_A = 1$ (random arrivals → Poisson)\n$C_S = \\sigma_S / t_S = 1/5 = 0.2$ ← the game changer!\n\n**Utilization**\n$$\\rho = \\frac{6}{1 \\times 12} = 0.5 = 50\\%$$', result: null },
          { insight: 'Now compute $L_q$ — notice how the low $C_S$ dramatically reduces the variability factor.', dumb: 'The magic: low variability (CS=0.2) cuts the queue nearly in half compared to CS=1. Consistency is as powerful as adding more cashiers.', work: '**Formula** $L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1-\\rho} \\times \\frac{C_A^2+C_S^2}{2}$\n\nExponent: $\\sqrt{2(1+1)} = \\sqrt{4} = 2$\n$\\rho^2 = 0.5^2 = 0.25$\n\nVariability factor: $\\frac{1^2 + 0.2^2}{2} = \\frac{1 + 0.04}{2} = 0.52$\nCompare to before: was $\\frac{1+1}{2} = 1.0$ → now 0.52 (48% lower!)\n\n$$L_q = \\frac{0.25}{0.5} \\times 0.52 = 0.26 \\text{ customers}$$\nWas 0.9 → now 0.26 (71% fewer people waiting)', result: null },
          { insight: 'Derive wait time and total time from $L_q$.', dumb: 'From queue length to actual minutes — divide by arrival rate, add service time.', work: '**Formula** $W_q = L_q / \\lambda$, then $W = W_q + t_S$\n\n$W_q = 0.26 / 6 = 0.043$ hr $= 2.6$ min\n$W = 2.6 + 5 = 7.6$ min\n\n**Before → After**\n$W_q$: 18 min → 2.6 min (86% reduction)\n$W$: 30 min → 7.6 min (75% reduction)\n\nTwo factors drove this:\n- Lower $\\rho$ (60% → 50%): less congestion\n- Lower $C_S$ (1.0 → 0.2): variability factor halved', result: 'Express wait drops from 18 → 2.6 min. Total time from 30 → 7.6 min.' },
        ],
      },
      {
        question: 'Should you implement the dedicated line?',
        steps: [
          { insight: 'Before deciding, you MUST check what happens to the other 50% — the regular customers. Removing express customers from the mix changes the service time for the remaining lines.', dumb: 'Helping one group might hurt the other. Always check both sides.', work: '**Formula** Mixture: $\\bar{t}_S = p_1 \\times t_1 + p_2 \\times t_2$\nwhere $p$ = proportion, $t$ = service time per type\n\nThe original 12-min average was a mix:\n$12 = 0.5 \\times 5 + 0.5 \\times X$\n$12 - 2.5 = 0.5X$\n$X = 19$ min for regular customers\n\nRegular customers take nearly 4x longer than express!', result: null },
          { insight: 'Compute the regular line parameters. Now 3 lines serve only regular customers.', dumb: 'Three lines, only big-basket shoppers. More stuff per customer means slower service and higher utilization.', work: '**Parameters for regular lines**\n$\\lambda_{\\text{regular}} = 12 \\times 0.5 = 6$/hr total\n$\\lambda_{\\text{per line}} = 6/3 = 2$/hr\n$\\mu = 60/19 = 3.16$/hr\n$$\\rho = \\frac{2}{3.16} = 0.63 = 63\\%$$\n\n**The problem:** we do NOT know $C_S$ for regular customers alone.\nOriginal $C_S = 1$ was for ALL customers mixed.\nRegular-only $C_S$ could be anywhere from 0.2 to 1.0.\n\nIf $C_S = 0.2$: $W_q \\approx 17$ min (slightly better than 18)\nIf $C_S = 1.0$: $W_q \\approx 32$ min (much worse than 18)', result: null },
          { insight: 'Make the decision — this is a trade-off that depends on data you do not have. The exam rewards you for arguing both sides.', dumb: 'Never just say yes or no. Show the trade-off, say what data you need, and give a conditional answer.', work: '**Comparison**\nCurrent (all mixed): $W_q = 18$ min, $W = 30$ min, $\\rho = 60\\%$\nExpress (dedicated): $W_q = 2.6$ min, $W = 7.6$ min, $\\rho = 50\\%$\nRegular (3 lines): $W_q = 17$-$32$ min, $W = 36$-$51$ min, $\\rho = 63\\%$\n\n**Threshold:** regulars are NOT worse off if $C_S < 0.32$\n\n**To decide, you need:**\n1. Actual $C_S$ for regular customers (measure it)\n2. Are express customers more likely to leave? (price sensitivity)\n3. Profit margin per segment\n4. Could you add a 5th cashier instead?', result: 'Conditional: if regular $C_S < 0.32$, implement it — everyone benefits. If high, express gains but regulars suffer. State the trade-off and what data you need.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Dedicating a resource (anti-pooling) sacrifices overall efficiency but can massively improve service for one segment — especially when that segment has low variability ($C_S = 0.2$).',
      '**Tip** When you dedicate a line, always compute the impact on BOTH segments. Express customers improved (18 → 2.6 min), but regular customers may suffer. The exam expects you to analyze both sides.',
      '**Exam pattern** If a problem asks "should you implement?", the answer is never just yes or no. Give the trade-off and state what additional information you would need to decide.',
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
        '**Identify** This is a supplier comparison. Two options with different ordering costs ($S$) and unit prices ($v$). No demand variability is given, so safety stock is not part of this problem.',
        '**Extract the data** Subcontract: $S = 1{,}000$, $v = 50$. Prepackaged: $S = 10$, $v = 60$. Demand: $D = 3{,}000$ cartons/yr. Holding rate: $i = 30\\%$.',
        '**Strategy** Compute EOQ for each option, then compare the full total cost (purchasing + ordering + holding). Do not just compare EOQ costs — the unit price difference ($10$/carton $\\times$ 3,000 cartons $= 30{,}000$/yr) usually dominates everything else.',
      ],
    },
    questionSteps: [
      {
        question: 'What is the optimal batch size for each option?',
        steps: [
          { insight: 'Subcontract has high $S$ but low $v$ → large, infrequent orders.', dumb: 'Big delivery fee but cheap product = order a lot at once, rarely. Like buying toilet paper at Costco.', work: '$$EOQ_{\\text{sub}} = \\sqrt{\\frac{2 \\times 3000 \\times 1000}{50 \\times 0.30}} = \\sqrt{400{,}000} = 632 \\text{ cartons}$$\nOrder every $365 \\times 632/3000 = 77$ days', result: '$Q^*_{\\text{sub}} = 632$ cartons' },
          { insight: 'Prepackaged has low $S$ but higher $v$ → frequent, small orders.', dumb: 'Cheap to order but expensive product = order small amounts, often. Like buying a single coffee every morning.', work: '$$EOQ_{\\text{pre}} = \\sqrt{\\frac{2 \\times 3000 \\times 10}{60 \\times 0.30}} = \\sqrt{3{,}333} = 58 \\text{ cartons}$$\nOrder every $365 \\times 58/3000 = 7$ days', result: '$Q^*_{\\text{pre}} = 58$ cartons' },
        ],
      },
      {
        question: 'Which option has lower total cost?',
        steps: [
          { insight: 'Add up ALL cost components: purchasing + ordering + cycle stock holding. We use the cycle stock holding formula $(Q/2) \\times v \\times i$, NOT the safety stock holding formula $(SS \\times v \\times i)$, because this problem has no demand uncertainty — no $\\sigma$ is given, no service level is mentioned, and lead time is negligible. Without uncertainty, there is no need for safety stock. The only inventory that exists is the cycle stock that builds up when you receive an order and depletes as you sell.', dumb: 'No safety stock here because the problem gives you zero information about demand variability. No $\\sigma$, no service level, no lead time risk. When the problem doesn\'t mention uncertainty, SS = 0 and you only pay to hold cycle stock — the average pile of stuff sitting in your warehouse between deliveries.', work: '**Formulas**\nPurchasing $= D \\times v$ (total units bought $\\times$ unit price)\nOrdering $= (D/Q) \\times S$ (orders per year $\\times$ cost per order)\nHolding (cycle) $= (Q/2) \\times v \\times i$ (avg inventory $\\times$ unit value $\\times$ holding rate)\n\nWhy $Q/2$? When an order of $Q$ arrives, inventory jumps to $Q$. It then depletes linearly to 0. The average over the cycle is $Q/2$.\n\nWhy NOT SS holding? No demand uncertainty is given — no $\\sigma$, no service level target. Without uncertainty, $SS = 0$.\n\n**Subcontract**\nPurchase: $3000 \\times 50 = 150{,}000$\nOrdering: $(3000/632) \\times 1000 = 4{,}747$\nHolding: $(632/2) \\times 50 \\times 0.30 = 4{,}740$\nTotal $= 159{,}487$\n\n**Prepackaged**\nPurchase: $3000 \\times 60 = 180{,}000$\nOrdering: $(3000/58) \\times 10 = 517$\nHolding: $(58/2) \\times 60 \\times 0.30 = 522$\nTotal $= 181{,}039$', result: 'Subcontract wins by ~$21{,}500$/yr. The $10$/carton price advantage saves $30{,}000$ in purchasing — dwarfing the higher ordering costs.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Unit cost differences almost always dominate ordering and holding cost differences. A $10$/carton saving $\\times$ 3,000 cartons $= 30{,}000$/yr — dwarfing any EOQ-related cost differences.',
      '**Tip** Always compute the full total cost: purchasing + ordering + holding. Do not just compare EOQ costs — that misses the biggest line item.',
      '**Exam pattern** If two suppliers have different unit prices, the cheaper one almost always wins. The EOQ just tells you how much to order, not who to order from.',
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
        '**Identify** Two parts — Q1 asks for a standard EOQ (continuous review), Q2 switches to periodic review with a base stock level. These are two different inventory systems.',
        '**Extract the data** Demand is given in weekly terms (mean $= 100$/week, $\\sigma = 30$/week), so work in weeks. Holding cost per week: $h = v \\times i / 52 = 3 \\times 0.2 / 52 = 0.012$/bottle/week.',
        '**Key difference between Q1 and Q2** In continuous review, $VP = LT = 3$ weeks. In periodic review, $VP = LT + R$, which is longer — meaning you need more safety stock to cover the extra gap.',
        '**Watch out** For the periodic review base stock, use the fill rate formula (not the simple service level), because the problem says "satisfy demand 95% of the time" — this is a fill rate target.',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the optimal order quantity.',
        steps: [
          { insight: 'Standard EOQ but with a twist: demand is given in WEEKLY units, so the holding cost must also be per week. This is why we use $h$ (holding cost per unit per week) instead of $v \\times i$ (which is annual).', dumb: 'The formula needs everything in the same time unit. Demand is per week, so holding cost must be per week too. Convert the annual holding rate to weekly by dividing by 52.', work: '**Formula** $EOQ = \\sqrt{\\frac{2 \\times D \\times S}{h}}$\nwhere:\n$D$ = demand per period (100 bottles/week)\n$S$ = fixed cost per order (10)\n$h$ = holding cost per unit per period (per week)\n\n**Why use h instead of v times i?**\nThe standard EOQ uses $v \\times i$ which is the ANNUAL holding cost per unit.\nBut here $D = 100$/week (not annual). All terms must match the same time unit.\nSo we convert the annual holding cost to weekly:\n$$h = \\frac{v \\times i}{52} = \\frac{3 \\times 0.20}{52} = 0.012 \\text{ per bottle per week}$$\n\nAlternatively, you could convert $D$ to annual ($D = 5{,}000$/yr) and use $v \\times i = 0.60$/yr. You get the same answer:\n$EOQ = \\sqrt{2 \\times 5000 \\times 10 / 0.60} = \\sqrt{166{,}667} \\approx 408$\n\n**Plugging in:**\n$$EOQ = \\sqrt{\\frac{2 \\times 100 \\times 10}{0.012}} = \\sqrt{166{,}667} \\approx 408 \\text{ bottles}$$', result: '$Q^* = 408$ bottles' },
        ],
      },
      {
        question: 'If a periodic review is used, what is the optimal base stock level?',
        steps: [
          { insight: 'In periodic review, you check inventory every $R$ periods and order up to a base stock level $S$. Use EOQ to estimate $R$, then compute $VP = R + LT$.', dumb: 'How often do you check the fridge? Use EOQ to estimate that. Then figure out how long you are blind (review gap + delivery time).', work: '**Formula** $R = Q^* / D$\nwhere $R$ = review period, $Q^*$ = EOQ, $D$ = demand per period\n\n$R = 408 / 100 = 4.08 \\approx 4$ weeks\n\nThen $VP = R + LT = 4 + 3 = 7$ weeks\n(In periodic review, VP is longer because you can only order at review points)', result: null },
          { insight: 'The problem says "satisfy demand 95% of the time" — this is a fill rate target, NOT a simple cycle service level. The fill rate formula uses $L(z)$, the standard loss function.', dumb: 'Fill rate = what fraction of demand you actually deliver. It is different from "probability of not stocking out." Fill rate is stricter — you need to use a special formula with something called the loss function.', work: '**What is the fill rate formula?**\n$$f = 1 - \\frac{\\sigma \\sqrt{VP} \\cdot L(z)}{\\lambda \\cdot R}$$\nwhere:\n$f$ = fill rate (fraction of demand satisfied, here 0.95)\n$\\sigma$ = std dev of demand per period (30/week)\n$VP$ = vulnerable period (7 weeks)\n$\\lambda$ = demand per period (100/week)\n$R$ = review period (4 weeks)\n$L(z)$ = standard loss function (looked up from a table)\n\n**What is $L(z)$?**\n$L(z)$ is the "standard loss function" — it tells you the expected shortage per unit of standard deviation. It is NOT the same as the z-table. Your exam cheat sheet may include an $L(z)$ table, or you can compute it from the Normal distribution.\n\n**Solving for $L(z)$:**\n$0.95 = 1 - \\frac{30 \\times \\sqrt{7} \\times L(z)}{100 \\times 4}$\n$0.05 = \\frac{79.4 \\times L(z)}{400}$\n$L(z) = \\frac{0.05 \\times 400}{79.4} = 0.252$\n\nLook up $L(z) = 0.252$ in the loss function table → $z \\approx 0.35$\n\n**Note:** With the simpler cycle service level approach (95% → $z = 1.64$), you would get a much higher $z$. The fill rate approach gives a LOWER $z$ because it accounts for how much you actually sell during a cycle, not just whether you stock out.', result: null },
          { insight: 'Now compute the base stock level $S$ using the $z$ from the fill rate.', dumb: 'The base stock level covers expected demand during the entire vulnerability window plus a safety buffer.', work: '**Formula** $S = (R + LT) \\cdot \\lambda + z \\cdot \\sigma \\cdot \\sqrt{R + LT}$\nwhere:\n$S$ = base stock level (order up to this)\n$(R + LT)$ = total vulnerability window\n$\\lambda$ = demand per period\n$z$ = safety factor from fill rate (0.35)\n$\\sigma$ = demand std dev per period\n\n$$S = 7 \\times 100 + 0.35 \\times 30 \\times \\sqrt{7}$$\n$$S = 700 + 0.35 \\times 30 \\times 2.646$$\n$$S = 700 + 27.8 \\approx 728 \\text{ bottles}$$\n\nAt each review: order quantity $= S - \\text{current inventory position}$', result: 'Base stock level $S \\approx 728$ bottles. At each weekly review, order up to 728.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Periodic review always needs more safety stock than continuous review because $VP = LT + R > LT$. The longer vulnerability period means more demand uncertainty to buffer against.',
      '**Tip** When a problem says "satisfy demand X% of the time," this is a fill rate target — use the fill rate formula, not the simple cycle service level. The resulting $z$ value will be different.',
      '**Exam pattern** Use EOQ to estimate the review period ($R = Q^*/D$), then plug $R$ into the base stock formula. The exam often tests whether you correctly identify $R$ from the EOQ.',
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
        '**Identify** This problem tests both inventory decisions at once — how much to order (EOQ) and when to order (ROP/SS). It has 8 sub-questions that methodically walk through each concept.',
        '**Core insight you need** Batch size ($Q$) and safety stock ($SS$) are completely independent. $Q$ depends on ordering vs. holding costs. $SS$ depends on service level, demand variability, and vulnerability period. Changing $Q$ does NOT change $SS$.',
        '**Extract the data** "Can be started at any time" = continuous review → $VP = LT = 1$ day. Annual demand $D = 365 \\times 80 = 29{,}200$ L/yr. Service level 99% → $z = 2.33$.',
        '**Watch out** Q5 asks about stockout frequency — this connects $Q$ to stockouts indirectly: smaller $Q$ means more order cycles per year, which means more chances to stock out (even though SS per cycle stays the same).',
      ],
    },
    questionSteps: [
      {
        question: 'Compute the current batch size.',
        steps: [
          { insight: '"10 day supply" directly gives the batch.', dumb: 'They literally told you: 10 days of ice cream. 10 days times 80 liters/day. Done.', work: '**Direct** Batch = days $\\times$ daily demand\n\n$Q_{\\text{current}} = 10 \\times 80 = 800$ liters', result: '$Q_{\\text{current}} = 800$ L' },
        ],
      },
      {
        question: 'What is the optimal batch size?',
        steps: [
          { insight: 'Standard EOQ with annual figures.', dumb: 'Classic EOQ — annual demand, annual holding cost, plug and chug. The optimal batch is 3.5x larger than what they\'re currently ordering.', work: '$$EOQ = \\sqrt{\\frac{2 \\times 29{,}200 \\times 200}{10 \\times 0.15}} = \\sqrt{7{,}786{,}667} \\approx 2{,}790 \\text{ L}$$', result: '$Q^* \\approx 2{,}790$ L (\\~35 day supply)' },
        ],
      },
      {
        question: 'Compute the annual savings.',
        steps: [
          { insight: 'Compare only differential costs: ordering + cycle stock holding. Manufacturing cost is the same regardless of $Q$.', dumb: 'Ignore the cost of actually making the ice cream — it\'s the same either way. Only compare the costs that change when you change the batch size.', work: '**Current** ($Q = 800$):\nOrdering: $29200/800 \\times 200 = 7{,}300$\nHolding: $400 \\times 10 \\times 0.15 = 600$\nTotal $= 7{,}900$\n\n**Optimal** ($Q = 2790$):\nOrdering: $29200/2790 \\times 200 = 2{,}093$\nHolding: $1395 \\times 10 \\times 0.15 = 2{,}093$\nTotal $= 4{,}186$', result: 'Savings $= 7{,}900 - 4{,}186 = 3{,}714$/yr' },
        ],
      },
      {
        question: 'What is the safety stock?',
        steps: [
          { insight: 'SS depends on service level, demand variability, and $VP$ — **not** on $Q$. Continuous review → $VP = LT = 1$ day.', dumb: 'Safety stock is your insurance policy. How much insurance depends on how unpredictable demand is and how long you are exposed.', work: '**Formula** $SS = z \\times \\sigma_1 \\times \\sqrt{VP}$\nwhere $z$ = safety factor (99% → 2.33 from z-table), $\\sigma_1$ = std dev of daily demand, $VP$ = vulnerable period\n\n$$SS = 2.33 \\times 20 \\times \\sqrt{1} = 46.6 \\approx 47 \\text{ L}$$', result: '$SS = 47$ L' },
        ],
      },
      {
        question: 'Stockout frequency with current batch size?',
        steps: [
          { insight: 'A 99% service level means a 1% chance of stocking out in each replenishment cycle. But how many cycles do you go through per year? That depends on $Q$.', dumb: 'Think of it like rolling a 100-sided die every time you order. You lose if you roll a 1. With small batches you roll 36 times a year — eventually you will roll a 1.', work: '**Formula** Stockouts per year $= (1 - SL) \\times \\frac{D}{Q}$\nwhere:\n$(1 - SL)$ = probability of stockout per cycle ($1 - 0.99 = 0.01 = 1\\%$)\n$D/Q$ = number of order cycles per year\n\n**Why does $Q$ affect stockout frequency?**\nSmaller $Q$ → more orders per year → more cycles → more chances to get unlucky.\nLarger $Q$ → fewer orders → fewer cycles → fewer chances.\nBut the probability PER CYCLE stays the same (1%) — only the number of cycles changes.\n\n**Calculation:**\nCycles per year: $D/Q = 29{,}200 / 800 = 36.5$ orders\nStockouts per year: $0.01 \\times 36.5 = 0.365$\n\nThat means about 1 stockout every $1/0.365 = 2.7$ years.\n\n**What if we used the optimal $Q = 2{,}790$?**\nCycles: $29{,}200 / 2{,}790 = 10.5$ orders/yr\nStockouts: $0.01 \\times 10.5 = 0.105$ per year = 1 every ~10 years\nFewer orders = fewer chances to fail.', result: 'With $Q = 800$: ~1 stockout every 3 years. With $Q^* = 2{,}790$: ~1 every 10 years.' },
        ],
      },
      {
        question: 'Does SS change with optimal Q?',
        steps: [
          { insight: 'This question tests whether you understand that $Q$ and $SS$ are completely independent decisions. They are computed from different formulas with NO shared variables.', dumb: 'How much you buy at once (batch size) has absolutely nothing to do with how much emergency reserve you keep. They are two different questions answered by two different formulas.', work: '**The SS formula:**\n$$SS = z \\times \\sigma_1 \\times \\sqrt{VP}$$\nwhere:\n$z$ = safety factor (from service level, here $z = 2.33$ for 99%)\n$\\sigma_1$ = std dev of demand per period (20 L/day)\n$VP$ = vulnerable period (1 day)\n\n**Does anything change when $Q$ goes from 800 to 2,790?**\n$z$: still 2.33 (service level target hasn\'t changed)\n$\\sigma_1$: still 20 L/day (demand variability hasn\'t changed)\n$VP$: still 1 day (lead time and review type haven\'t changed)\n\nNone of these three inputs depend on $Q$.\n\n**Why are they independent?**\n$Q$ answers: "how much to order?" → depends on $D$, $S$, $v$, $i$ (cost optimization)\n$SS$ answers: "how much buffer?" → depends on $z$, $\\sigma$, $VP$ (service protection)\nThey solve different problems with different inputs.\n\n**What DOES change with $Q$?**\nOnly the stockout FREQUENCY (as shown in Q5) — not the safety stock level itself.', result: '$SS$ stays at 47 L regardless of batch size. $Q$ and $SS$ are independent.' },
        ],
      },
      {
        question: 'Optimal reorder point (current and optimal Q)?',
        steps: [
          { insight: 'ROP tells you WHEN to order. It equals the demand you expect during the vulnerability period plus your safety buffer.', dumb: 'When your fridge hits this number of beers, order more. It needs to last through the delivery wait plus a cushion for unpredictable friends.', work: '**Formula** $ROP = \\bar{D}_1 \\times VP + SS$\nwhere:\n$\\bar{D}_1$ = average demand per period (80 L/day)\n$VP$ = vulnerable period (1 day for continuous review)\n$SS$ = safety stock (47 L)\n\n**Part 1: Expected demand during VP**\n$\\bar{D}_1 \\times VP = 80 \\times 1 = 80$ L\nThis is what you expect to sell while waiting for the new batch.\n\n**Part 2: Safety buffer**\n$SS = 47$ L\nThis covers the worst case — if demand is higher than expected.\n\n**ROP:**\n$$ROP = 80 + 47 = 127 \\text{ L}$$\n\n**Is it the same for both $Q$ values?**\nYes! $ROP$ depends on $\\bar{D}_1$, $VP$, and $SS$ — none of which depend on $Q$.\nWhether you order 800 L or 2,790 L, you trigger the order at the same inventory level (127 L).\n\n**How it works in practice:**\nWith $Q = 800$: inventory cycles between 127 L (order point) and ~927 L (after delivery)\nWith $Q = 2{,}790$: inventory cycles between 127 L and ~2,917 L\nThe trigger point is the same — only the refill size differs.', result: '$ROP = 127$ L for both batch sizes. The trigger is the same; only the order quantity differs.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** $Q$ and $SS$ are completely independent. $Q$ balances ordering vs. holding costs. $SS$ protects against demand uncertainty during $VP$. They share no variables — changing one does not affect the other.',
      '**Tip** Smaller $Q$ means more order cycles per year. More cycles = more chances to stock out, even with the same per-cycle service level. So stockout frequency depends on $Q$, even though $SS$ does not.',
      '**Exam pattern** If the problem asks "does SS change if Q changes?", the answer is always NO. If it asks about stockout frequency, compute: stockouts/yr $= (1 - SL) \\times D/Q$.',
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
        '**Identify** This is a policy audit — you are given a current policy ($Q = 10$, $ROP = 5$) and asked to evaluate whether it makes sense. Think like a consultant reviewing someone else\'s decisions.',
        '**Quick audit trick** At EOQ, ordering cost ≈ holding cost. If they are wildly unbalanced, the batch size is wrong. Compute both costs and compare.',
        '**Reverse-engineer the service level** From the current ROP, compute the implied safety stock ($SS = ROP - \\bar{D} \\times VP$), then find $z = SS / (\\sigma \\times \\sqrt{VP})$. Look up $z$ in the table to find what service level the store is actually running at.',
        '**Watch out** The EOQ formula gives $Q^* = 47$ kg, but with 100 cheese types that means 2.4 tons of cheese in the store. Always reality-check EOQ against storage space and perishability.',
      ],
    },
    questionSteps: [
      {
        question: 'Is the purchasing policy appropriate?',
        steps: [
          { insight: 'To audit a policy, reverse-engineer the safety stock, then compare ordering cost vs holding cost. At EOQ they should be roughly equal — if one dominates, the batch size is wrong.', dumb: 'Work backwards from what the store does. Find the safety stock, then check if delivery fees and storage costs are balanced. If one is 18x the other, something is very wrong.', work: '**Step 1: Find the implied safety stock**\n**Formula** $SS = ROP - \\bar{D}_1 \\times VP$\nwhere $ROP = 5$ kg, $\\bar{D}_1 = 1$ kg/day, $VP = LT = 4$ days\n\n$SS = 5 - 1 \\times 4 = 1$ kg of buffer\n\n**Step 2: Compute holding cost (also called maintenance cost)**\n**Formula** Total holding $= (SS + Q/2) \\times v \\times i$\n\nThere are three versions of the holding formula you will see:\n- $(Q/2) \\times v \\times i$ = cycle stock holding only (used in EOQ comparison when SS is unknown or identical)\n- $SS \\times v \\times i$ = safety stock holding only (used when comparing SS costs between suppliers)\n- $(SS + Q/2) \\times v \\times i$ = total holding (used when auditing a full policy — this is what we need here)\n\nHere we use the combined form because we are auditing the TOTAL cost of the current policy:\n$SS = 1$ kg (permanent buffer)\n$Q/2 = 10/2 = 5$ kg (average cycle stock — inventory goes from 10 down to 0, average is 5)\nTotal average inventory $= 1 + 5 = 6$ kg\n\nHolding $= 6 \\times 5 \\times 0.20 = 6$/yr\n\n**Step 3: Compute ordering cost**\n**Formula** Ordering $= (D/Q) \\times S$\nwhere $D/Q$ = how many times you order per year, $S$ = what each order costs\n\nThe store sells 1 kg/day = 365 kg/year. With $Q = 10$ kg per order:\n$D/Q = 365/10 = 36.5$ orders per year (ordering every 10 days)\nEach order costs 3 (the fixed delivery/admin fee)\n\nOrdering $= 36.5 \\times 3 = 109.50$/yr\n\n**The verdict:**\nOrdering (110) vs Holding (6) = 18:1 ratio\nAt EOQ these should be roughly 1:1\nThis means the store orders WAY too often — it should buy more per order to reduce the number of deliveries.', result: 'Ordering (110) is 18x higher than holding (6). Batch is way too small. The store needs to order more per delivery.' },
          { insight: 'Compute the optimal batch size with EOQ. But also reality-check it against practical constraints.', dumb: 'The formula says order 47 kg at a time. But with 100 cheese types, that means 2.4 tons of cheese in a tiny shop. Sometimes the formula gives a theoretically correct but practically impossible answer.', work: '**Formula** $EOQ = \\sqrt{\\frac{2 \\times D \\times S}{v \\times i}}$\nwhere:\n$D$ = annual demand ($365$ kg/yr)\n$S$ = cost per order (3)\n$v$ = unit price (5/kg)\n$i$ = annual holding rate (0.20)\n\n$$EOQ = \\sqrt{\\frac{2 \\times 365 \\times 3}{5 \\times 0.20}} = \\sqrt{\\frac{2{,}190}{1}} = \\sqrt{2{,}190} \\approx 47 \\text{ kg}$$\n\n**Reality check:**\nWith $Q = 47$ kg, the store orders every $47/1 = 47$ days (about 1.5 months).\nWith 100 cheese types at $Q/2 = 23.5$ kg average each: total stock $\\approx$ 2,400 kg = 2.4 tons.\nA small specialty cheese shop cannot store 2.4 tons!\nAlso, cheese ordered every 47 days may spoil before being sold.\n\nThe EOQ gives the cost-optimal answer, but storage and perishability constraints override it in practice.', result: '$EOQ = 47$ kg. Theoretically optimal but impractical — storage and freshness constraints mean the store should order more than 10 kg but less than 47 kg.' },
        ],
      },
      {
        question: 'How likely will the store run out of Emmental?',
        steps: [
          { insight: 'Reverse-engineer $z$ from current safety stock to find the implied service level.', dumb: 'Work backwards: what service level is the store actually running at? Turns out only 84% — meaning they run out 1 in 6 orders. Terrible for a cheese shop.', work: '**Formula** $z = SS / (\\sigma \\times \\sqrt{VP})$, then look up $z$ in z-table for SL\n\n$SS = 1$ kg\n$\\sigma_{VP} = \\sigma \\times \\sqrt{VP} = 0.5 \\times \\sqrt{4} = 1.0$ kg\n$$z = \\frac{SS}{\\sigma_{VP}} = \\frac{1}{1} = 1.0$$\nFrom z-table: $P(z \\leq 1.0) = 84.13\\%$', result: 'Stockout probability $= 15.9\\%$ per cycle. Very high!' },
        ],
      },
      {
        question: 'What ROP for 1% stockout probability?',
        steps: [
          { insight: 'For 99% service level, $z = 2.33$.', dumb: 'To almost never run out, bump the reorder point from 5 to about 6.3 kg. A small change with a big impact on customer satisfaction.', work: '$$SS = 2.33 \\times 0.5 \\times \\sqrt{4} = 2.33 \\text{ kg}$$\n$$ROP = \\bar{D} \\times VP + SS = 1 \\times 4 + 2.33 = 6.33 \\text{ kg}$$', result: 'New $ROP \\approx 6.33$ kg (up from 5 kg)' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** To audit a policy, check two things: (1) are ordering ≈ holding costs? If not, $Q$ is wrong. (2) What service level does the current $SS$ imply? Reverse-engineer $z$ to find out.',
      '**Tip** EOQ is a theoretical optimum. Always reality-check it against physical constraints — storage space, perishability, minimum order quantities. A cheese store cannot stock 47 kg × 100 types = 4.7 tons.',
      '**Exam pattern** When given a current policy ($Q$ and $ROP$), first evaluate it before proposing changes. Show that you understand both what is wrong and why.',
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
        '**Identify** This is a full supplier comparison — design the complete inventory policy (EOQ + SS + ROP) for each supplier, then compare total annual costs.',
        '**Assumption** This is a health product (spinal implants). Stockouts are dangerous → assume 99% service level ($z = 2.33$).',
        '**TRAP — do not miss this** "checks inventory daily at 8:00" means periodic review with $R = 1$ day. Therefore $VP = LT + R$, NOT just $LT$. For the US supplier: $VP = 7 + 1 = 8$ days, not 7. This is the #1 exam mistake.',
        '**Organize your costs** Separate non-differential costs (purchasing per box, transport per box — these are paid regardless of batch size) from differential costs (ordering cost per order, cycle stock holding). Compute EOQ only from the differential costs.',
        '**Data setup** Annual demand $D = 100 \\times 365 = 36{,}500$ boxes/yr. US: $v = 500$, $S = 100$, transport $= 10$/box. Portugal: $v = 300$, $S = 150$, transport $= 7.50$/box.',
      ],
    },
    questionSteps: [
      {
        question: 'What should Medcorp\'s inventory policy for titanium screws be?',
        steps: [
          { insight: 'First compute non-differential costs for each supplier.', dumb: 'Purchasing and shipping costs are the same per box no matter how many you order at once. Calculate these first — they\'re usually the biggest numbers.', work: '**US** Purchase $= 500 \\times 36500 = 18{,}250{,}000$/yr, Transport $= 10 \\times 36500 = 365{,}000$/yr\n**Portugal** Purchase $= 300 \\times 36500 = 10{,}950{,}000$/yr, Transport $= 7.5 \\times 36500 = 273{,}750$/yr', result: null },
          { insight: 'Compute SS, SS holding cost, and ROP for each supplier. The key formula is $SS = z \\times \\sigma_1 \\times \\sqrt{VP}$.', dumb: 'Safety stock protects you during the vulnerability window. Longer window = more buffer needed. Portugal wins here because its VP is only 2 days vs 8 for US.', work: '**Formula** $SS = z \\times \\sigma_1 \\times \\sqrt{VP}$\nwhere:\n$z$ = safety factor = 2.33 (from z-table: 99% service level because health product)\n$\\sigma_1$ = std dev of daily demand = 30 boxes/day\n$VP$ = vulnerable period = $LT + R$ (periodic review: checked daily so $R = 1$)\n\n**Formula** SS holding $= SS \\times v \\times i$ (cost of keeping the safety buffer)\n**Formula** $ROP = \\bar{D}_1 \\times VP + SS$ (when to place an order)\n\n---\n\n**US supplier** ($LT = 7$, $R = 1$, $v = 500$)\n\n$VP = 7 + 1 = 8$ days\n$$SS = 2.33 \\times 30 \\times \\sqrt{8} = 2.33 \\times 30 \\times 2.83 = 198 \\text{ boxes}$$\n\nSS holding cost: how much does it cost to keep 198 boxes as permanent buffer?\n$= 198 \\times 500 \\times 0.10 = 9{,}900$/yr\n\nROP: when inventory drops to this level, order more\n$= 100 \\times 8 + 198 = 800 + 198 = 998$ boxes\n\n---\n\n**Portugal supplier** ($LT = 1$, $R = 1$, $v = 300$)\n\n$VP = 1 + 1 = 2$ days (much shorter!)\n$$SS = 2.33 \\times 30 \\times \\sqrt{2} = 2.33 \\times 30 \\times 1.41 = 99 \\text{ boxes}$$\n\nSS holding cost: $= 99 \\times 300 \\times 0.10 = 2{,}970$/yr\n\nROP: $= 100 \\times 2 + 99 = 200 + 99 = 299$ boxes\n\n---\n\n**Comparison:**\nUS: SS = 198 boxes, SS holding = 9,900/yr, ROP = 998\nPortugal: SS = 99 boxes, SS holding = 2,970/yr, ROP = 299\n\nPortugal needs half the safety stock because $\\sqrt{2}$ vs $\\sqrt{8}$ — shorter lead time means less exposure to demand uncertainty.', result: null },
          { insight: 'Compute EOQ for each supplier, then derive the ordering cost and cycle stock holding cost from it.', dumb: 'Find the optimal order size, then figure out what it costs per year in delivery fees and storage. Notice how ordering and holding come out nearly equal at EOQ — that is the sweet spot.', work: '**Formula** $EOQ = \\sqrt{\\frac{2DS}{vi}}$, then Ordering $= \\frac{D}{Q} \\times S$, then Cycle holding $= \\frac{Q}{2} \\times v \\times i$\n\n**US supplier:**\n$EOQ = \\sqrt{\\frac{2 \\times 36{,}500 \\times 100}{0.10 \\times 500}} = \\sqrt{\\frac{7{,}300{,}000}{50}} = \\sqrt{146{,}000} = 382$ boxes\n\nOrdering: how many deliveries per year?\n$D/Q = 36{,}500 / 382 = 95.5$ orders/yr\nOrdering cost $= 95.5 \\times 100 = 9{,}555$/yr\n\nCycle holding: average inventory sitting in warehouse?\n$Q/2 = 382/2 = 191$ boxes on average\nCycle holding $= 191 \\times 500 \\times 0.10 = 9{,}550$/yr\n\nNote: ordering (9,555) $\\approx$ holding (9,550) — confirming we are at EOQ!\n\n**Portugal supplier:**\n$EOQ = \\sqrt{\\frac{2 \\times 36{,}500 \\times 150}{0.10 \\times 300}} = \\sqrt{\\frac{10{,}950{,}000}{30}} = \\sqrt{365{,}000} = 604$ boxes\n\nOrdering: $36{,}500 / 604 = 60.4$ orders/yr $\\times$ 150 $= 9{,}065$/yr\nCycle holding: $604/2 = 302$ boxes $\\times$ 300 $\\times$ 0.10 $= 9{,}060$/yr\n\nAgain ordering $\\approx$ holding — balanced at EOQ.\n\n**Remember:**\n- At EOQ, ordering cost always $\\approx$ holding cost (that is the definition of EOQ)\n- Portugal has fewer but larger orders (60 vs 96/yr) because its ordering cost is higher (150 vs 100)\n- Both fit within the 2,000-box warehouse limit ($382 < 2000$ and $604 < 2000$)', result: null },
          { insight: 'Add ALL costs for total comparison.', dumb: 'Add everything up. Portugal wins by 7.4 million euros. The cheaper box price completely dominates — everything else is a rounding error.', work: '**US Total** $18{,}250{,}000 + 365{,}000 + 9{,}900 + 9{,}555 + 9{,}550 = 18{,}644{,}005$\n**Portugal Total** $10{,}950{,}000 + 273{,}750 + 2{,}970 + 9{,}065 + 9{,}060 = 11{,}244{,}845$', result: '**Portugal saves ~7.4M/yr.** Policy: order 604 boxes from Portugal whenever inventory falls below 299 boxes. Check daily at 8 AM.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** "Checks inventory daily at 8:00" means $R = 1$ day → $VP = LT + R$, NOT $LT$. This trap cost many students 5+ points on this exact exam. Always ask: continuous or periodic review?',
      '**Tip** Unit cost differences dominate everything else. Portugal saves 200/box × 36,500 = 7.3M in purchasing alone. Ordering and holding cost differences are rounding errors by comparison.',
      '**Exam pattern** Always conclude with a clear policy statement: "Order [Q] boxes from [supplier] whenever inventory falls below [ROP] boxes. Review daily at 8 AM." This shows you understand the full system.',
    ],
  },

  {
    id: 'eg-e2',
    section: 'Final Exam 2024',
    title: 'Part II: Kit Preparation — Capacity Analysis',
    badge: 'Capacity',
    badgeType: 'queue',
    originalExcerpt: `II. Preparing surgical kits

When a hospital needs to perform a surgery requiring any of the company's devices, they must prepare a kit: a medium SAMSONITE suitcase that includes two or three plastic boxes. One contains all the equipment (drill, screw drivers, etc.) the surgeons will need. The other boxes include the components (screws, rods, plates, etc.) to be implanted.

Once the operation is over, the distributor recovers the kit, checks which components have been implanted (to bill the hospital), and returns the suitcase to the warehouse where the boxes are thoroughly cleaned, sorted and stored.

When a new order arrives, the warehouse employees prepare a new kit and then sterilize each plastic box before sending the new kit to the distributor.

The Madrid warehouse has several employees who, from 8:00 to 12:00, prepare the new kits (during the afternoons they deal with used kits from distributors). Preparing a kit requires the employee to go to a semi-automated picking station, pack the components in plastic boxes, weigh them on a precision scale that detects if a single screw is missing, and then take the boxes to a sterilization unit (similar to a large home oven). A sterilization unit can only sterilize one kit at a time. The times needed:

- Getting components from the warehouse: 30 minutes/kit
- Checking using the precision scale: 10 minutes/kit
- Sterilization: 60 minutes/kit (loading/unloading takes just seconds)

II.1. (20 points) If the company needs to prepare 100 kits per day, how many employees should be dedicated to this task? And how many sterilization units are needed?`,
    storyline: `Medcorp's Madrid warehouse prepares surgical kits (8:00–12:00, 4-hour shift). Per kit: picking = 30 min (employee), checking = 10 min (employee + scale), sterilization = 60 min (machine, 1 kit at a time). Target: 100 kits/day.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** This is a capacity/resource planning problem. You need to figure out how many of each resource type (employees, scales, machines) are required to meet a daily target of 100 kits.',
        '**Map out the resources** There are three distinct resource types — employees, precision scales, and sterilization units. One employee does both picking (30 min) and checking (10 min), so each employee uses 40 min per kit.',
        '**Calculate capacity per unit** Each resource is available for $4 \\times 60 = 240$ minutes per shift. Divide available time by usage time per kit to get how many kits one resource unit can handle.',
        '**Watch out** Always round UP when computing resource counts (you cannot hire 0.67 of a person). Also, running at 98% utilization is risky — aim for ~83% to handle real-world variability. And check sequencing: the last kit entering sterilization needs 60 min, so it must enter by 11:00 to finish by 12:00.',
      ],
    },
    questionSteps: [
      {
        question: 'How many employees and sterilization units are needed for 100 kits/day?',
        steps: [
          { insight: 'Compute capacity per resource unit, then divide demand by capacity.', dumb: 'How many kits can one employee/scale/machine handle in a 4-hour shift? Divide available minutes by minutes per kit.', work: '**Per resource unit capacity (in 240 min shift)**\nEmployee: $240/40 = 6$ kits/shift\nScale: $240/10 = 24$ kits/shift\nSterilization: $240/60 = 4$ kits/shift', result: null },
          { insight: 'Divide demand by per-unit capacity, round up.', dumb: 'Need 100 kits. Each employee does 6. That\'s 16.67 employees — but you can\'t hire 0.67 of a person, so round up to 17.', work: '**Formula** Resources $= \\lceil D / \\text{cap} \\rceil$\n\nEmployees: $\\lceil 100/6 \\rceil = \\lceil 16.67 \\rceil = 17$\nScales: $\\lceil 100/24 \\rceil = \\lceil 4.17 \\rceil = 5$\nSterilization units: $\\lceil 100/4 \\rceil = 25$', result: 'Need: **17 employees**, 5 scales, **25 sterilization units**' },
          { insight: 'Sterilization is the bottleneck (needs most units). But 17 employees at 98% utilization is risky — add buffer.', dumb: 'You need 25 sterilization machines but only 17 employees. The machines are the constraint. And running at 98% with zero slack is asking for trouble.', work: '**Utilization check** $\\rho = \\text{Demand} / (\\text{Resources} \\times \\text{Capacity per resource})$\n\nWith exactly 17 employees: $\\rho = 100/(17 \\times 6) = 98\\%$ ← dangerous\nSafer: ~20 employees + ~30 sterilization units → $\\rho \\approx 83\\%$\n\nAlso: last kit enters sterilization at 11:00, finishes at 12:00.\nIf all kits must be FULLY done by 12:00, need even more units.', result: 'Recommended: ~20 employees, ~30 sterilization units for sustainable operations.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Capacity analysis requires identifying ALL distinct resource types — not just "employees." Employees, scales, and sterilization units are separate constraints. The bottleneck (sterilization, 60 min/kit) determines the system.',
      '**Tip** Never plan for 100% utilization. At 98%, one hiccup cascades into delays. Target ~83% utilization for human-operated processes. The exam rewards you for mentioning this practical consideration.',
      '**Exam pattern** After computing the minimum resources, add a sentence about sequencing (first kit enters sterilization at 8:40, last must enter by 11:00) and about practical capacity buffers. This shows managerial judgment.',
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
        '**Identify** This is a queueing problem with a service level agreement (SLA). You need to compute the average wait time $W_q$ and check if it meets the ≤ 3 minute contractual target.',
        '**System setup** Single queue feeding $S$ operators. Phone calls → assume Poisson arrivals ($C_A = 1$). Service variability is given: $C_S = \\sigma/t_S = 5/20 = 0.25$ — operators are fairly consistent.',
        '**Strategy** Compute $W_q$ with $S = 4$. If it fails the SLA, try $S = 5$ and show the improvement. This demonstrates the nonlinear relationship between utilization and wait times — adding just one server can have a dramatic effect.',
        '**Watch out** Going from $\\rho = 83\\%$ to $67\\%$ does not sound like a big change, but it reduces $W_q$ by nearly 80%. Queues are exponential, not linear.',
      ],
    },
    questionSteps: [
      {
        question: 'With 4 employees, will they meet the ≤ 3 min SLA? If not, how many operators needed?',
        steps: [
          { insight: 'First try $S = 4$.', dumb: 'Four operators, 83% busy. Sounds manageable, but the math says customers wait almost 11 minutes on average. Way over the 3-minute promise.', work: '**Formula** $\\rho = \\lambda/(S\\mu)$, $L_q$, $W_q = L_q/\\lambda$\n\n$\\mu = 60/20 = 3$ calls/hr per operator\n$\\text{Total capacity} = 3 \\times 4 = 12$ calls/hr\n$\\rho = 10/12 = 0.833 = 83.3\\%$\n\n$$L_q = \\frac{\\rho^{\\sqrt{2(S+1)}}}{1 - \\rho} \\times \\frac{C_A^2 + C_S^2}{2} = \\frac{0.833^{\\sqrt{2 \\times 5}}}{0.167} \\times \\frac{1 + 0.0625}{2} = 1.79$$\n(exponent: $\\sqrt{2(4+1)} = \\sqrt{10} = 3.16$, so $0.833^{3.16} = 0.542$)\n$$W_q = \\frac{L_q}{\\lambda} = \\frac{1.79}{10} = 0.179 \\text{ hr} = 10.75 \\text{ min}$$', result: '$W_q = 10.75$ min → **FAILS** the 3-minute SLA' },
          { insight: 'Try $S = 5$. See how dramatically performance improves with one extra server.', dumb: 'One more person drops the wait from 11 minutes to 2.3 minutes. That\'s a 78% improvement from just one hire. Queues are weird like that.', work: '**Same formula, $S = 5$**\n\n$\\text{Total capacity} = 3 \\times 5 = 15$ calls/hr\n$\\rho = 10/15 = 0.667 = 66.7\\%$\n\n$$L_q = \\frac{0.667^{\\sqrt{2 \\times 6}}}{1 - 0.667} \\times \\frac{1^2 + 0.25^2}{2} = 0.39$$\n$$W_q = \\frac{0.39}{10} = 0.039 \\text{ hr} = 2.35 \\text{ min}$$', result: '$W_q = 2.35$ min → **MEETS** the SLA. Need **5 operators** (+1).' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Queues are nonlinear. One extra server dropped $W_q$ from 10.75 to 2.35 min (78% reduction). Going from $\\rho = 83\\%$ to $67\\%$ sounds modest but the impact is massive.',
      '**Tip** When the SLA fails, try $S+1$ servers. Show the before/after comparison — the exam loves seeing you demonstrate the nonlinear effect of adding one server.',
      '**Exam pattern** Follow the 4-step structure: (1) system structure, (2) arrival characterization, (3) service characterization, (4) compute $\\rho$, $L_q$, $W_q$. This systematic approach avoids mistakes.',
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
        '**Identify** This is a strategic analysis question — no calculations needed, but you must apply OM concepts (pooling, supply chain centralization, the strategic triangle) to structure your argument.',
        '**Consultant\'s logic** The proposal is textbook centralization — consolidate 25 country warehouses into 1 hub. The theory says this reduces safety stock by a factor of $\\sqrt{25} = 5$ through demand pooling. Plus: eliminate distributors (save 15% margin), simplify upstream logistics.',
        '**Why it failed** The theory ignored the demand side. Distributors were not just moving boxes — they were driving sales through hospital relationships. The express carrier could not replicate that. Cost savings are meaningless if revenue drops 60%.',
        '**For Miguel\'s case** This is an ethics + management question. Balance his correct business judgment (sales recovered) against his unethical methods (fabricated exports). Also consider: did the company fail to listen?',
      ],
    },
    questionSteps: [
      {
        question: 'What was the consultant\'s rationale? Pros and cons?',
        steps: [
          { insight: 'The proposal is textbook supply chain centralization.', dumb: 'On paper, brilliant: pool everything in Brussels, cut safety stock by 5x, eliminate distributor margins. Classic consulting playbook.', work: '**PROS**\n• Inventory pooling: with 25 countries, $SS_{\\text{pooled}} = z \\times \\sqrt{25} \\times \\sigma_1 \\times \\sqrt{VP} = 5 \\times SS_1$ vs. $SS_{\\text{total}} = 25 \\times SS_1$ → **5× less safety stock**\n• Disintermediation: save 15% margin paid to distributors\n• Transport economies of scale with one carrier\n• Upstream simplification: one destination vs. 25 country warehouses\n• Removes dependence on ethically questionable practices', result: null },
          { insight: 'The cons explain why it failed catastrophically in Spain.', dumb: 'The consultants optimized the supply side but blew up the demand side. Express carriers can\'t navigate hospital politics. Distributors weren\'t just moving boxes — they were making sales happen.', work: '**CONS**\n• Express carriers don\'t understand hospital operations (must deliver to operating theater, not logistics dept)\n• Loss of local distributor relationships that **drive demand**\n• EU ≠ US: each country\'s healthcare system is different\n• Longer/variable delivery to peripheral countries\n• Alienated stakeholders (distributors) who are demand creators', result: 'Cost optimization is meaningless if it destroys demand. Sales dropped 60% — the pooling savings cannot offset that.' },
        ],
      },
      {
        question: 'What should the company do about Miguel?',
        steps: [
          { insight: 'This is not binary (keep/fire). Address both the person AND the systemic failure.', dumb: 'Miguel broke the rules but saved the business. The company ignored its own people. Both sides have a point — the exam wants you to argue both.', work: '**FOR Miguel** Tried official channels first (3 trips). Acted to save the business. Sales proved him right.\n**AGAINST Miguel** Fabricating exports is fraud/legal liability. Unilateral decisions undermine authority. Company may have had bigger-picture strategy.', result: 'Miguel should be disciplined but not fired — he demonstrated deep market knowledge. The company must learn to listen to local employees and pilot changes before full rollout. (Real life: Miguel was NOT fired, Red Carpet was discontinued.)' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Supply chain optimization that destroys demand is worse than no optimization at all. The consultants saved on inventory costs but lost 60% of revenue. Always consider who drives demand.',
      '**Tip** For Part IV questions, structure your answer as: (1) consultant\'s rationale with OM theory, (2) pros with quantified pooling math, (3) cons with real-world factors the theory ignores, (4) your recommendation.',
      '**Exam pattern** The exam always tests both sides of trade-offs. Never say centralization is purely good or bad. Show that you understand the strategic triangle: cost, service, and range — pick two.',
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
    originalExcerpt: `NEWBIO is a pharmaceutical company based in Austria, specializing in the manufacturing of generic drugs. NEWBIO has started manufacturing biological drugs for cancer treatment and got approval for their first generic biological product, BIOTOPIN. It is sold to 12 pharmaceutical companies.

BIOTOPIN is produced via a 20 days-long biological process, which takes place in 10 reactors of 50,000L each. The minimum production batch is 50,000L. Three additional reactors are not used on a regular basis, but are employed whenever there is need.

The yield of this process is 96%; in other words, 4% of the 50,000L in each reactor is wasted. When the biological process finishes, BIOTOPIN is bottled in 50ml syringes without being diluted and then boxed. These last two stages are highly automatized, and hence quite fast.

NEWBIO does not accept orders smaller than 10,000 units. The price is $50 per unit, irrespective of the size of the order. The COGS is $10 per unit.

I. Central Warehouse Operations

The yearly sales of BIOTOPIN follow a Normal distribution with mean 144M units and standard deviation of 7.75M units. All sales are fulfilled from the inventory in NEWBIO's central warehouse, and it is done in trucks. The vast majority of the orders are equal to the minimum order quantity (10,000 units) each. The warehouse works 24/7.

The time needed to load a pallet is short, but the time to process the paperwork of each order requires 30 min. A specific part of the warehouse has a single dock (with its administrative team) available for trucks to pick up their orders.

Maria Freud, COO of NEWBIO, is facing two issues:
- Mismatch of the sales that need to be picked up and the available inventory of BIOTOPIN in the warehouse
- Some truck drivers have complained about excessive delays in the pick-up of sales

What would you recommend Maria regarding the inventory management policy of BIOTOPIN? What causes truck delays, how bad are they, and what should Maria do about them?`,
    storyline: `NEWBIO manufactures BIOTOPIN, a biological cancer drug. 10 reactors, 50,000L each, 20-day process, 96% yield. Bottled in 50ml syringes (1L = 1,000ml = 20 syringes). Yearly demand: $\\mu = 144M$ units, $\\sigma = 7.75M$. Single warehouse dock, 30 min paperwork per truck. This problem combines capacity, inventory, AND queueing.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** This is a three-part problem: (1) capacity check — can we produce enough? (2) inventory policy — how much safety stock? (3) queueing — why are trucks waiting?',
        '**Capacity first** 1 reactor produces $50{,}000 \\times 0.96 / 0.05 = 960{,}000$ units every 20 days. That is $960{,}000 \\times 365/20 = 17.52M$/yr per reactor. 10 reactors = $175.2M$/yr. Utilization $= 144/175.2 = 82\\%$.',
        '**Inventory** Warehouse is next to plant, so $LT$ = production lead time = 20 days. Continuous review (warehouse monitors stock). Batch size = minimum production batch = $0.96M$ units.',
        '**Queueing** Trucks arrive at rate $\\lambda = 144M / (365 \\times 24 \\times 10{,}000) = 1.64$/hr. Service = 30 min/truck ($\\mu = 2$/hr). Single dock ($S = 1$). This is an $M/G/1$ system.',
      ],
    },
    questionSteps: [
      {
        question: 'What inventory policy should Maria use for BIOTOPIN?',
        steps: [
          { insight: 'Set batch size = minimum production batch (producing more only adds holding cost). Convert yearly demand variability to monthly using square-root law.', dumb: 'Each reactor makes 960k units. Producing more than one batch at a time just fills up the warehouse for no reason.', work: '**Approach:** $Q^* =$ minimum production batch (one reactor output)\n$\sigma_{\text{month}} = \sigma_{\text{year}} / \sqrt{12}$ (square-root law)\n\n$Q^* = 0.96M$ units (one reactor batch)\n$\\sigma_{\\text{monthly}} = 7.75M / \\sqrt{12} = 2.24M$ units\n$VP = LT = 20$ days $= 2/3$ months\nAssume $SL = 99.87\\%$ (virtually all pick-ups fulfilled) $\\Rightarrow z = 3$ from z-table', result: null },
          { insight: 'Compute safety stock and reorder point.', dumb: 'Keep 5.5 million units as a buffer. When stock drops to 13.5 million, start a new batch. This covers the 20 days it takes to produce.', work: '$$SS = z \\times \\sigma_1 \\times \\sqrt{VP} = 3 \\times 2.24M \\times \\sqrt{2/3} \\approx 5.5M \\text{ units}$$\n$$ROP = \\bar{D}_1 \\times VP + SS = (144M/12) \\times (2/3) + 5.5M = 13.5M \\text{ units}$$', result: 'When inventory falls to 13.5M units, schedule production of 0.96M units.' },
        ],
      },
      {
        question: 'What causes truck delays and what should Maria do?',
        steps: [
          { insight: 'Model the dock as a queueing system. Trucks arrive randomly, each takes 30 min of paperwork.', dumb: 'Trucks lining up at a single loading dock = classic queue. One dock processing paperwork for 30 min each while trucks arrive randomly.', work: '**Formula** $\\rho = \\lambda/\\mu$, $L_q$, $W_q = L_q/\\lambda$\n\n$\\lambda = 1.64$ trucks/hr, $\\mu = 2$ trucks/hr, $S = 1$\n$\\rho = 1.64/2 = 82\\%$\n$C_A = 1$ (natural arrivals), $C_S \\approx 0.3$ (limited variability)\n$$L_q = \\frac{0.82^{\\sqrt{2 \\times 2}}}{1 - 0.82} \\times \\frac{1 + 0.09}{2} \\approx 2.04 \\text{ trucks}$$\n$$W_q = 2.04 / 1.64 = 1.24 \\text{ hrs} = 74.6 \\text{ min}$$', result: null },
          { insight: 'Average 75-minute delay is very troubling. Recommend reducing service time (online paperwork) or reducing variability before adding a second dock.', dumb: 'Truck drivers are waiting over an hour on average. Fix the paperwork process before building a second dock — it\'s cheaper and faster.', work: '**Improvement levers (in order):** Reduce $t_S$ → reduce $C_S$ → add capacity ($S$)\n\nPriority 1: Move paperwork online to cut $t_S$\nPriority 2: Standardize the process to reduce $C_S$\nPriority 3: Only if neither works, build a second dock ($S = 2$)', result: 'Average truck wait = 75 min. Fix the process first, add capacity second.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Always check capacity first before designing inventory policy. If production cannot meet demand, no amount of safety stock will help.',
      '**Tip** When a problem combines inventory AND queueing, solve them separately. Inventory policy answers "how much stock?" Queueing answers "why are trucks waiting?"',
      '**Exam pattern** The square-root law for converting annual $\\sigma$ to monthly: $\\sigma_{\\text{month}} = \\sigma_{\\text{year}} / \\sqrt{12}$. This comes up whenever demand is given in different time units than the vulnerability period.',
    ],
  },

  {
    id: 'eg-22-2',
    section: 'Final Exam 2022',
    title: 'Part II: Distribution in Latin America',
    badge: 'Inventory + Supplier Comparison',
    badgeType: 'inventory',
    originalExcerpt: `II. Distribution in Latin America

Laboratorios de Mexico (LdM), based in Mexico City, sells BIOTOPIN in Mexico and in five other countries in Central America, at an average price of $120 per unit. Their aggregate monthly demand is estimated as a Normal distribution with mean 12,000 units and standard deviation 2,000 units. The yearly inventory holding cost for LdM is 48% of their procurement cost (LdM is highly leveraged).

LdM buys in batches of 20,000 units - the number of units that can fit in a standard ship-freight pallet - that the logistics company Kuehne+Nagel delivers through its international maritime freight services for a cost of $2,000 per ship-freight pallet. The lead time is 15 days, and the company can guarantee the preservation of the cold chain.

Francisco Arenas has been asked to evaluate an offer from AEROMEXICO. AEROMEXICO has daily cargo flights from Vienna to Mexico City. Accounting for customs, AEROMEXICO can deliver BIOTOPIN to LdM in 2 days, and can also guarantee the preservation of the cold chain. It allows batches of 10,000 units - the number of units that can fit in a standard air-freight pallet. The price offered by AEROMEXICO is $3,000 per air-freight pallet.

What would you recommend Francisco regarding the supply of BIOTOPIN?`,
    storyline: `Laboratorios de Mexico sells BIOTOPIN across Latin America. Monthly demand: $\\mu = 12{,}000$, $\\sigma = 2{,}000$. Holding cost $i = 48\\%$ (highly leveraged company). Two shipping options: sea freight (cheap, slow, big batches) vs air freight (expensive, fast, small batches).`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** Supplier/logistics comparison — same product, different transport modes. Compute total cost for each: holding + transportation.',
        '**Key insight** Air freight costs more per shipment but the shorter LT drastically reduces safety stock, and the smaller batch reduces cycle stock. With a 48% holding rate, inventory savings can outweigh higher shipping costs.',
        '**Data conversion** Sea: $Q = 20{,}000$, $LT = 15$ days $= 0.5$ months. Air: $Q = 10{,}000$, $LT = 2$ days $= 2/30$ months.',
        '**Watch out** Also consider in-transit inventory (Little\'s Law). Longer transit = more inventory stuck on ships/planes.',
      ],
    },
    questionSteps: [
      {
        question: 'Which logistics provider should LdM use?',
        steps: [
          { insight: 'Compute total cost for Kuehne+Nagel (sea freight).', dumb: 'Sea freight: cheap shipping but massive inventory sitting in Mexico. With a 48% holding rate, that inventory cost is brutal.', work: '**Formula** $SS = z \\times \\sigma_1 \\times \\sqrt{VP}$\nHolding $= (Q/2 + SS) \\times v \\times i$\nTransport $= (D/Q) \\times S$\n\n$Q_{KN} = 20{,}000$, $VP = 0.5$ months\n$SS_{KN} = 3 \\times 2{,}000 \\times \\sqrt{0.5} = 4{,}243$ units\nHolding: $(10{,}000 + 4{,}243) \\times 50 \\times 0.48 = 342k$/yr\nTransport: $(12 \\times 12{,}000 / 20{,}000) \\times 2{,}000 = 14{,}400$/yr\n**Total = 356.5k/yr**', result: null },
          { insight: 'Compute total cost for Aeromexico (air freight).', dumb: 'Air freight: shipping costs 3x more per pallet, but inventory drops so much that the total is 156k cheaper per year.', work: '**Same formulas, different inputs:**\n\n$Q_{AM} = 10{,}000$, $VP = 2/30$ months\n$SS_{AM} = 3 \\times 2{,}000 \\times \\sqrt{2/30} = 1{,}549$ units\nHolding: $(5{,}000 + 1{,}549) \\times 50 \\times 0.48 = 157k$/yr\nTransport: $(12 \\times 12{,}000 / 10{,}000) \\times 3{,}000 = 43.2k$/yr\n**Total = 200k/yr**', result: '**Aeromexico saves ~156k/yr.** Faster delivery + smaller batches dramatically reduce inventory costs, more than offsetting the higher shipping price.' },
          { insight: 'In-transit inventory further favors air. Use Little\'s Law.', dumb: 'Stuff on a boat for 15 days is still your inventory. By air it\'s only 2 days in transit. That\'s 7x less capital locked up on the move.', work: '**Formula** In-transit $= \\lambda \\times LT$ (Little\'s Law)\n\nSea in-transit: $\\lambda \\times LT = (12 \\times 12{,}000/30) \\times 15 = 6{,}000$ units\nAir in-transit: $(12 \\times 12{,}000/30) \\times 2 = 800$ units', result: 'Air freight has 7x less in-transit inventory, making it even more appealing.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** When holding cost rate is high (48%), inventory savings dominate transportation cost differences. Faster delivery = less SS = less cash tied up.',
      '**Tip** Always consider in-transit inventory using Little\'s Law: items on the ship/plane are still your inventory. Longer transit = more working capital locked up.',
      '**Exam pattern** This is the same structure as the 2024 exam (US vs Portugal) — compute total cost for each option including SS, cycle stock holding, and transport. The one with lower total wins.',
    ],
  },

  {
    id: 'eg-22-3',
    section: 'Final Exam 2022',
    title: 'Part III: Growth Strategy',
    badge: 'Strategy',
    badgeType: 'strategy',
    originalExcerpt: `III. Growth Strategy

The Latin American market for BIOTOPIN is considered of strategic importance to NEWBIO, as it is there where the company is expecting to have the highest growth rates. Elsa Schwarz, CEO of NEWBIO, is convinced that this growth will only be possible if NEWBIO manages to combine high service levels with competitive pricing. She is considering a number of proposals:

- Open a manufacturing plant in Latin America, as a means to establish a dominant position in the region
- Subcontract the production of BIOTOPIN corresponding to Latin America to LdM
- Send bulk shipments of BIOTOPIN to LdM, and then have LdM do the final bottling and boxing phases
- Keep a significant stock of finished goods (pallets of bottled and boxed BIOTOPIN) in consignment, in LdM's facility

Elsa is also wondering whether these are the only viable alternatives, or if there exists a different out-of-the-box one. What would you advise her to do?`,
    storyline: `NEWBIO sees Latin America as strategic for growth. Asia is blocked by cheap Chinese/Indian competitors (35/unit). Four options on the table, each with hidden costs or risks. The exam wants you to analyze all four AND propose something better.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** Strategic analysis — evaluate four proposals on operational feasibility, cost, risk, and quality.',
        '**Key tension** Short-term vs long-term. Current demand is tiny (one reactor at low utilization would suffice), but growth is expected.',
        '**Think about** Quality control (biological drug!), capital intensity, supply chain flexibility, and what happens if demand does NOT grow as expected.',
      ],
    },
    questionSteps: [
      {
        question: 'Evaluate each option and recommend a strategy.',
        steps: [
          { insight: 'Analyze each option for feasibility.', dumb: 'New plant costs too much for current demand. Subcontracting risks quality of a cancer drug. Bulk shipping is sketchy. Consignment makes NEWBIO eat LdM\'s holding cost.', work: '**New plant** Huge capex, current demand too low to justify even 1 reactor. Maybe long-term.\n**Subcontract to LdM** Lose quality control over a biological drug — extremely risky.\n**Bulk shipment + local bottling** Unclear how to maintain cold chain integrity. No customization in BIOTOPIN, so postponement adds no value.\n**Consignment stock** NEWBIO absorbs LdM\'s holding cost. With 48% rate, this erodes profitability.', result: null },
          { insight: 'None of the four is great. Propose a phased approach.', dumb: 'When all four options have problems, the best answer is a phased plan: fix logistics now, find better partners soon, invest in production later.', work: '**Short term** Sound inventory management (switch to air freight as shown in Part II).\n**Medium term** Find a different/additional distribution partner, possibly in South America (closer to larger markets, potentially lower holding costs than LdM).\n**Long term** If demand grows as expected, build a plant with strategic partners in South America.', result: 'No single option is best. Phased approach: optimize logistics now, explore new partners, invest in production later when demand justifies it.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** For strategic questions, evaluate EVERY option the problem lists — do not skip any. Show you considered each one seriously.',
      '**Tip** The best answer for "which option?" is often "none of the above, but here is a phased plan." The exam rewards creative thinking beyond the given choices.',
      '**Exam pattern** Strategic questions worth 30+ points require structured arguments: for each option, state the operational logic, then the hidden cost/risk, then your verdict.',
    ],
  },

  {
    id: 'eg-22-4',
    section: 'Final Exam 2022',
    title: 'Part IV: Industrial Partnership',
    badge: 'Capacity + Strategy',
    badgeType: 'queue',
    originalExcerpt: `IV. Industrial Partnership

A French pharmaceutical company, Laboratoires Chamonix (LC), also specializing in the manufacturing of biological drugs, has approached Elsa Schwarz and proposed an industrial partnership: to co-produce BIORISAN - a biological drug somewhat different to BIOTOPIN, whose intellectual property is held by LC - at NEWBIO's Vienna factory.

Changing production from one drug to the other would require a very long and complicated cleaning process of the reactors. After considering the production volumes proposed by LC, Elsa realized that accepting this proposal would require NEWBIO to effectively commit the capacity of 4 reactors to the production of BIORISAN and leave the other 9 dedicated to BIOTOPIN.

The production lead time and the COGS of the two drugs are very similar. The selling price of BIORISAN, $90 per unit, is significantly higher than that of BIOTOPIN.

What would you recommend Elsa to do?`,
    storyline: `LC wants to co-produce BIORISAN (90/unit, much higher margin than BIOTOPIN at 50/unit) using 4 of NEWBIO\'s reactors. This leaves 9 reactors for BIOTOPIN, pushing utilization from 82% to 91%. New reactors cost 30M each and take 1 year to deliver.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** Capacity allocation decision with financial and operational trade-offs.',
        '**Revenue opportunity** 4 reactors at $17.52M$ units/yr each, margin of $(90-10) = 80$/unit. Potential profit: $17.52M \\times 4 \\times 80 = 5.6B$/yr (split with LC).',
        '**Risk** 9 reactors for BIOTOPIN = $\\rho = 144M / (9 \\times 17.52M) = 91\\%$. No spare capacity for maintenance, demand spikes, or emergencies.',
        '**Solution structure** Accept the deal (too profitable to pass up) BUT mitigate the capacity risk.',
      ],
    },
    questionSteps: [
      {
        question: 'Should Elsa accept the industrial partnership?',
        steps: [
          { insight: 'The financial opportunity is enormous. Calculate the potential.', dumb: 'The partnership could generate billions. You\'d be crazy to say no. But you\'d also be crazy to give up 4 reactors without a plan B.', work: '**Formula** Revenue $= \\text{units/yr} \\times \\text{reactors} \\times \\text{margin}$\n\nBIORISAN revenue potential: $17.52M \\times 4 \\times 80 = 5.6B$/yr (before profit split with LC)\nEven a 20% share = $1.12B$/yr — impossible to pass up.', result: null },
          { insight: 'But the capacity risk is severe. 91% utilization with no buffer is unsustainable.', dumb: 'Going from 82% to 91% utilization means zero buffer. One reactor breaks down and you can\'t fill orders for your flagship product.', work: '**Formula** $\\rho = D / \\text{Capacity}$\n\nCurrent: 10 reactors, $\\rho = 82\\%$, 3 spare reactors for emergencies.\nProposed: 9 reactors, $\\rho = 91\\%$, 0 spare. No room for maintenance, cleaning, or demand spikes.', result: null },
          { insight: 'Accept but mitigate: order new reactors immediately and phase in BIORISAN gradually.', dumb: 'Say yes to the money, but immediately order new reactors and phase in slowly. Don\'t put all your eggs in the partnership basket on day one.', work: '**Action plan**\n1. Accept LC\'s proposal\n2. Order 3+ new reactors immediately (30M each, 1-year delivery)\n3. Phase in: dedicate 1-2 reactors to BIORISAN in year 1\n4. Full 4-reactor commitment in year 2, after new reactors arrive\n5. Protect BIOTOPIN supply chain — it is the flagship product', result: 'Accept the deal — too profitable to refuse. But order new reactors NOW and phase in production gradually to protect BIOTOPIN.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** 91% utilization is a red flag. No buffer for maintenance, demand spikes, or emergencies. Always flag high utilization even when the financial case is strong.',
      '**Tip** For partnership/investment questions, the answer is rarely pure yes or pure no. It is "yes, with conditions" or "no, unless." Show the conditions explicitly.',
      '**Exam pattern** Capacity allocation questions test whether you can balance financial opportunity against operational risk. Show both sides, then propose a phased mitigation plan.',
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
    originalExcerpt: `I. IQ's After-Sales Service

In 2018, IQ launched its first 3D printer: the IQ VOXEL. The new printer had 200 transductors that had the tendency to generate a transducent overflow. Any printer would present a transducent overflow situation "once a year, on average" (the time between overflows was distributed as a Negative Exponential). The affected transductor would generate progressive overheating and, if left unattended too long, could cause a fire.

IQ installed software that would continuously control all 200 transductors. The moment it detected an overflow, it would send an alarm to the After-Sales Service Department, which would then remotely connect, run tests, and solve the issue.

The Spanish after-sale service operated 24/7 from Madrid. Alex Lake was in charge:

"We get an average of three calls per hour and the arrival process is distributed like a Poisson. Once we get a call, one of our engineers remotely connects to the printer, finds the faulty transductor, re-sets it, and re-launches the printer. These operations are done in seconds.

Subsequently our engineer has to remain connected running post-intervention tests. The whole process takes on average 1 hour (normally distributed, standard deviation of 15 minutes).

We currently have 4 engineers in every shift but the probability of generating a fire really gets dangerous after a transductor has been in overflow for more than one hour. I have been contemplating alternatives:

A. Hire an additional engineer per shift.
B. Our labs have developed a robot that can do what an engineer does in 10 minutes, with no fluctuations whatsoever. It costs 6 times the annual cost of an engineer.
C. In Europe we have 250,000 printers served from 10 identical centers. Why not allow any European engineer to serve any printer?"

How do you see the current situation? How would alternatives A, B, and C change it?`,
    storyline: `IQ's Madrid after-sales center handles printer overflow alerts. $\\lambda = 3$/hr (Poisson), $S = 4$ engineers, $t_S = 60$ min ($\\sigma = 15$ min). Fire risk if overflow unresolved > 1 hour. Three proposals to compare: add staff, automate, or pool European centers.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** Four queueing scenarios to compare: current (4 engineers), +1 engineer (5), robot ($S = 1$, $t_S = 10$ min, $C_S = 0$), pooling (40 engineers, $\\lambda = 30$/hr).',
        '**Extract data** $\\lambda = 3$/hr, $C_A = 1$ (Poisson). Service: $t_S = 60$ min, $\\sigma_S = 15$ min, so $C_S = 15/60 = 0.25$.',
        '**Key metric** $W_q$ (wait before service starts) and $W$ (total time until overflow resolved). Fire risk increases dangerously after 1 hour total.',
        '**Cost comparison** Robot costs 6x one engineer. But there are 3 shifts/day, so 5 engineers/shift = 15 engineers total vs 1 robot = 6 engineer-equivalents. Robot is cheaper.',
      ],
    },
    questionSteps: [
      {
        question: 'Analyze the current situation (4 engineers).',
        steps: [
          { insight: 'Standard queueing analysis with $S = 4$.', dumb: 'Four engineers, 75% busy, 17-minute average wait. That\'s 17 minutes where a printer could be silently overheating toward a fire.', work: '**Formula** $\\rho = \\lambda/(S\\mu)$, $L_q$, $W_q$\n\n$\\rho = 3/4 = 75\\%$, $C_A = 1$, $C_S = 0.25$\n$$L_q = \\frac{0.75^{\\sqrt{2 \\times 5}}}{1-0.75} \\times \\frac{1 + 0.0625}{2} = 0.856$$\n$$W_q = 0.856/3 = 0.285 \\text{ hr} = 17.1 \\text{ min}$$\n$W = 17.1 + 60 = 77.1$ min', result: 'Average total time = 77 min — exceeds the 1-hour fire danger threshold. This is risky.' },
        ],
      },
      {
        question: 'Alternative A: Add 1 engineer per shift (S = 5).',
        steps: [
          { insight: 'Same arrival/service, just one more server.', dumb: 'One extra engineer drops the wait from 17 min to 4.5 min. The total time (64 min) is still above the fire-danger threshold but much safer.', work: '**Same formula, $S = 5$**\n\n$\\rho = 3/5 = 60\\%$\n$$L_q = \\frac{0.6^{\\sqrt{2 \\times 6}}}{1-0.6} \\times \\frac{1 + 0.0625}{2} = 0.226$$\n$$W_q = 0.226/3 = 0.075 \\text{ hr} = 4.5 \\text{ min}$$\n$W = 4.5 + 60 = 64.5$ min', result: '$W_q$ drops from 17 min to 4.5 min. Total time 64.5 min — still above 1 hour but much safer.' },
        ],
      },
      {
        question: 'Alternative B: Replace engineers with a robot.',
        steps: [
          { insight: 'Robot: $S = 1$, $t_S = 10$ min ($\\mu = 6$/hr), $C_S = 0$ (deterministic). Same arrivals.', dumb: 'One robot does in 10 min what four humans do in 60. Zero variability means the queue barely forms. Total resolution time: 15 minutes.', work: '**Robot** $S=1$, $\\mu=6$, $C_S=0$\n\n$\\rho = 3/6 = 50\\%$\n$$L_q = \\frac{0.5^{\\sqrt{2 \\times 2}}}{1-0.5} \\times \\frac{1 + 0}{2} = 0.25$$\n$$W_q = 0.25/3 = 0.083 \\text{ hr} = 5 \\text{ min}$$\n$W = 5 + 10 = 15$ min', result: 'Total time = 15 min — dramatically better. And robot costs 6 engineers but replaces 4 per shift (12 total for 24/7). Robot is cheaper AND faster.' },
        ],
      },
      {
        question: 'Alternative C: Pool all 10 European centers.',
        steps: [
          { insight: 'Same 4 engineers/center but all 10 centers share one queue. $S = 40$, $\\lambda = 30$/hr.', dumb: 'Instead of 10 separate teams of 4, make one team of 40. Same people, same utilization, but the wait drops from 17 minutes to 19 SECONDS. This is pooling magic.', work: '**Pooling** $S=40$, $\\lambda=30$\n\n$\\rho = 30/40 = 75\\%$ (same as before!)\n$$L_q = \\frac{0.75^{\\sqrt{2 \\times 41}}}{1-0.75} \\times \\frac{1 + 0.0625}{2} = 0.157$$\n$$W_q = 0.157/30 = 0.005 \\text{ hr} = 19 \\text{ seconds}$$\n$W = 0.3 + 60 = 60.3$ min', result: 'Wait drops from 17 min to **19 seconds** — no extra cost! Just let any engineer serve any printer across Europe. Same utilization, vastly better performance.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** Pooling is the most powerful lever — 17 min wait to 19 seconds with ZERO additional cost. This works because service is remote (no language barrier, no physical presence needed).',
      '**Tip** The robot option shows the 2nd Law in action: $C_S = 0$ (deterministic) vs $C_S = 0.25$ cuts the variability factor. Combined with faster service, total time drops to 15 min.',
      '**Exam pattern** When comparing multiple alternatives, use a consistent table format. For each: compute $\\rho$, $L_q$, $W_q$, $W$, and cost. Then recommend based on the full picture.',
    ],
  },

  {
    id: 'eg-23-2',
    section: 'Final Exam 2023',
    title: 'Part II: Ink Logistics at IQ',
    badge: 'Inventory + Strategy',
    badgeType: 'inventory',
    originalExcerpt: `II. Ink Logistics at IQ

IQ's printing business accounted for 35% of revenue. Supplies (ink) represented 60%. The printing industry used the "razor and blades" model: discount the printer, profit from ink cartridges. Top retailers had margins of roughly 30%.

Consumer ink cartridges ranged from $30 to $50 (printing 200+ pages). The COGS ranged from $4 to $10. Half of customers purchased cheaper third-party ink cartridges.

Data showed that pages printed per month were normally distributed with mean 200 and standard deviation 40. Cartridge retail price: $40. Interest rate: 5%.

The "Dirty Dozen" team identified two pain points: high ink price and cartridges running out at inconvenient times. They proposed several alternatives:

A. When and how are customers purchasing cartridges from office supply stores? Why? What is the impact on IQ?
B. Shall IQ offer printers with larger cartridges?
C. Shall IQ adopt an auto-replenishment model, where the printer automatically orders ink when running low? (Customer pays retail, IQ pays $4 delivery via UPS/FedEx)
D. Shall IQ charge at the time of insertion, as opposed to the time of shipment?
E. Shall IQ adopt a subscription model? (e.g., $30/month for 200 pages, $50 for 1000 pages, $15 for 50 pages — IQ provides the ink whenever the customer runs out)`,
    storyline: `IQ faces a declining printing market. Ink cartridges are expensive (40 retail, 28 net after retailer margin) and run out unpredictably. Half of customers buy cheaper third-party ink. The Dirty Dozen team proposes four progressively innovative models. This is a strategy question driven by inventory and supply chain concepts.`,
    framework: {
      title: 'How to approach this problem',
      points: [
        '**Identify** This is an operations-driven strategy question. Each proposal changes the inventory model from the customer\'s perspective.',
        '**Root cause of "running out"** Customers have no safety stock (batch = 1 cartridge, zero buffer). Expensive ink + low ordering cost (just drive to store) = small batches = frequent stockouts.',
        '**Revenue math** Retail 40/cartridge. Retailer takes 30% = 12. IQ net = 28. COGS ~7. Going direct eliminates the 12 retailer margin.',
        '**Frame each proposal** How does it change the customer\'s inventory model (batch size, safety stock, VP, who bears holding cost)?',
      ],
    },
    questionSteps: [
      {
        question: 'Why do cartridges run out at inconvenient times? Should IQ offer larger cartridges?',
        steps: [
          { insight: 'Customer inventory model: batch = 1 cartridge, SS = 0. With zero safety stock, every cycle ends in a stockout.', dumb: 'Customers buy one cartridge when they run out. No buffer, no planning. Of course they run out at the worst time.', work: '**Inventory model:** Batch $= 1$, $SS = 0$, no ROP → stockout every cycle\n\nCustomer buys 1 cartridge when they run out (reactive, not proactive).\nNo visibility on ink level = no reorder point.\nResult: stockout every cycle. Then emergency trip to store or printing on another (non-IQ) machine.', result: null },
          { insight: 'Larger cartridge increases batch but does not fix root cause (zero safety stock). Also expensive to implement and looks even pricier vs private labels.', dumb: 'A bigger cartridge is like a bigger gas tank — you run out less often but you still run out. The real problem is no early warning system.', work: '**Analysis:** Increasing $Q$ does not fix $SS = 0$ problem\n\nLarger cartridge: maybe doubles the batch. But still zero SS = still stocks out.\nRequires redesigned printer (engineering cost).\nHigher price point increases gap with private labels.\n**Better alternative** sell pre-packs of 2-3 cartridges with volume discount.', result: 'Larger cartridge does NOT solve the root cause. Pre-packs are cheaper and more effective.' },
        ],
      },
      {
        question: 'Should IQ adopt auto-replenishment?',
        steps: [
          { insight: 'Auto-replenishment gives IQ visibility on ink level = IQ controls the ROP and SS. Customer never runs out.', dumb: 'Let the printer tell IQ when ink is low. IQ ships a new cartridge before you run out. You never run out, and IQ skips the retailer\'s 30% cut.', work: '**Formula** $ROP = VP \\times D_1 + z \\times \\sigma \\times \\sqrt{VP}$\n\nPrinter monitors ink level continuously ($RP = 0$).\n$VP = LT = 6/30$ months (delivery time).\n$$ROP = VP \\times D_1 + z \\times \\sigma \\times \\sqrt{VP} = \\frac{6}{30} \\times 200 + 3 \\times 40 \\times \\sqrt{1/5} = 93 \\text{ pages}$$\nThat is about half a cartridge — order when half-empty.', result: null },
          { insight: 'Going direct eliminates retailer margin (saves 12/cartridge). Even with 4 shipping cost, IQ nets 8 more per cartridge AND customer never runs out.', dumb: 'Cut out the middleman. Ship directly to the customer, keep the 12 per cartridge that Staples used to take, AND the customer never runs out. Win-win.', work: '**Comparison:** Direct channel eliminates retailer margin\n\nStore channel: IQ nets 28/cartridge. Customer stocks out.\nDirect auto-replenish: IQ nets $40 - 4 - 7 = 29$/cartridge. Customer never stocks out.\nWin-win — except retailers lose business (channel conflict).', result: 'Auto-replenishment is a clear improvement. Better margins, zero stockouts, higher loyalty.' },
        ],
      },
      {
        question: 'Should IQ charge at insertion instead of shipment? Should IQ adopt a subscription model?',
        steps: [
          { insight: 'Charging at insertion allows larger batches at customer\'s home without upfront cost. But risk: customer may lose/resell unpaid cartridges.', dumb: 'Customer gets cartridges but only pays when they use them. Less sticker shock, more buffer stock. But risky if cartridges go missing.', work: '**Analysis:** Shifts holding cost and payment timing\n\nInsertion-based billing: customer holds more inventory but only pays when used.\nRisk: no tracking = potential fraud or loss.\nBenefit: customer has buffer stock = fewer stockouts.', result: null },
          { insight: 'Subscription (30/month for 200 pages) is the most radical proposal. Analyze from operations perspective.', dumb: 'Netflix for printing. Customer pays less, never runs out, IQ gets predictable revenue and kills private-label competition. Everyone wins except Staples.', work: '**Subscription economics:** Revenue vs cost-to-serve analysis\n\nAt 30/month: customer pays less than retail (40/cartridge/month).\nIQ cost to serve: COGS 7 + shipping (4/4 cartridges shipped at once) = 8/cartridge.\nIQ margin: $30 - 8 = 22$/month (vs 28 currently but with higher volume and loyalty).\n\n**Key advantages**\n- Customer never runs out (IQ manages replenishment)\n- Eliminates retailer margin entirely\n- Kills private-label substitution (subscription = locked in)\n- IQ gets usage data on every customer\n- Predictable recurring revenue', result: 'Subscription is the most transformative option. Lower price for customer, higher loyalty for IQ, predictable revenue, zero stockouts. But requires managing retailer backlash carefully.' },
        ],
      },
    ],
    takeaway: [
      '**Reminder** The root cause of "running out at inconvenient times" is zero safety stock, not insufficient batch size. Fix the root cause (give IQ control of ROP), not the symptom (bigger cartridges).',
      '**Tip** When analyzing business model proposals, translate each one into inventory terms: who controls Q, ROP, SS, and who bears holding cost? This makes the comparison systematic.',
      '**Exam pattern** Strategy questions that list multiple proposals (A, B, C, D) expect you to analyze each, show why simpler ones fail, and build towards the most innovative solution. Show the progression.',
    ],
  },
]
