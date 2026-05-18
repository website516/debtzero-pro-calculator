function initCalculator() {
  const form = document.getElementById('debt-form');
  const resultsSection = document.getElementById('results-section');
  const snowballEl = document.getElementById('snowball-result');
  const avalancheEl = document.getElementById('avalanche-result');
  const chartCanvas = document.getElementById('balance-chart');

  let chartInstance = null;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const debts = getDebtsFromForm();
    if (debts.length === 0) {
      alert('請至少輸入一項債務');
      return;
    }

    const extraPayment = parseFloat(document.getElementById('extra-payment').value) || 0;

    const snowball = calculatePayoff(debts, extraPayment, 'snowball');
    const avalanche = calculatePayoff(debts, extraPayment, 'avalanche');

    displayResults(snowball, avalanche, snowballEl, avalancheEl);
    drawChart(snowball.history, avalanche.history, chartCanvas, chartInstance);
    
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('add-debt').addEventListener('click', addDebtRow);
}

function getDebtsFromForm() {
  const rows = document.querySelectorAll('.debt-row');
  const debts = [];
  
  rows.forEach(row => {
    const name = row.querySelector('.debt-name').value.trim();
    const balance = parseFloat(row.querySelector('.debt-balance').value);
    const rate = parseFloat(row.querySelector('.debt-rate').value);
    const minPayment = parseFloat(row.querySelector('.debt-min').value);
    
    if (name && balance > 0 && rate >= 0 && minPayment > 0) {
      debts.push({ name, balance, rate, minPayment });
    }
  });
  
  return debts;
}

function addDebtRow() {
  const container = document.getElementById('debt-rows');
  const newRow = document.createElement('div');
  newRow.className = 'debt-row grid grid-cols-12 gap-3 items-end mb-4';
  newRow.innerHTML = `
    <div class="col-span-12 md:col-span-3">
      <input type="text" class="debt-name input w-full px-4 py-2.5 rounded-xl text-sm" placeholder="債項名稱" value="信用卡 B">
    </div>
    <div class="col-span-6 md:col-span-2">
      <input type="number" class="debt-balance input w-full px-4 py-2.5 rounded-xl text-sm" placeholder="餘額" value="30000">
    </div>
    <div class="col-span-6 md:col-span-2">
      <input type="number" class="debt-rate input w-full px-4 py-2.5 rounded-xl text-sm" placeholder="年利率 %" value="22">
    </div>
    <div class="col-span-6 md:col-span-2">
      <input type="number" class="debt-min input w-full px-4 py-2.5 rounded-xl text-sm" placeholder="最低還款" value="600">
    </div>
    <div class="col-span-6 md:col-span-3">
      <button type="button" class="remove-debt text-red-400 hover:text-red-500 text-sm px-3 py-2">移除</button>
    </div>
  `;
  
  container.appendChild(newRow);
  
  newRow.querySelector('.remove-debt').addEventListener('click', () => {
    if (document.querySelectorAll('.debt-row').length > 1) {
      newRow.remove();
    }
  });
}

function calculatePayoff(debts, extraPayment, strategy) {
  let sortedDebts = [...debts];
  
  if (strategy === 'snowball') {
    sortedDebts.sort((a, b) => a.balance - b.balance);
  } else {
    sortedDebts.sort((a, b) => b.rate - a.rate);
  }

  let months = 0;
  let totalInterest = 0;
  let history = [];
  let balances = sortedDebts.map(d => ({...d}));

  while (balances.some(d => d.balance > 0) && months < 600) {
    months++;
    let monthInterest = 0;

    balances.forEach(d => {
      if (d.balance > 0) {
        const interest = d.balance * (d.rate / 100 / 12);
        monthInterest += interest;
        d.balance = Math.max(0, d.balance + interest - d.minPayment);
      }
    });

    totalInterest += monthInterest;

    if (extraPayment > 0 && balances[0].balance > 0) {
      balances[0].balance = Math.max(0, balances[0].balance - extraPayment);
    }

    const totalBalance = balances.reduce((sum, d) => sum + d.balance, 0);
    history.push({ month: months, totalBalance });
  }

  return {
    months,
    totalInterest: Math.round(totalInterest),
    history
  };
}

function displayResults(snowball, avalanche, snowballEl, avalancheEl) {
  snowballEl.innerHTML = `
    <div class="text-emerald-400 text-sm font-medium mb-1">雪球法 (Snowball)</div>
    <div class="text-5xl font-semibold text-white tabular-nums">${snowball.months}</div>
    <div class="text-slate-400 text-sm mt-1">個月還清</div>
    <div class="mt-4 text-sm">總利息：<span class="font-mono text-white">HK$${snowball.totalInterest.toLocaleString()}</span></div>
  `;

  avalancheEl.innerHTML = `
    <div class="text-blue-400 text-sm font-medium mb-1">雪崩法 (Avalanche)</div>
    <div class="text-5xl font-semibold text-white tabular-nums">${avalanche.months}</div>
    <div class="text-slate-400 text-sm mt-1">個月還清</div>
    <div class="mt-4 text-sm">總利息：<span class="font-mono text-white">HK$${avalanche.totalInterest.toLocaleString()}</span></div>
  `;
}

function drawChart(snowballHistory, avalancheHistory, canvas, chartInstance) {
  if (chartInstance) chartInstance.destroy();

  const ctx = canvas.getContext('2d');
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: snowballHistory.map(h => h.month),
      datasets: [
        {
          label: '雪球法',
          data: snowballHistory.map(h => h.totalBalance),
          borderColor: '#10b981',
          borderWidth: 3,
          tension: 0.3,
          fill: false
        },
        {
          label: '雪崩法',
          data: avalancheHistory.map(h => h.totalBalance),
          borderColor: '#3b82f6',
          borderWidth: 3,
          borderDash: [5, 3],
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top' }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#1f2937' } },
        x: { grid: { color: '#1f2937' } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initCalculator();
});