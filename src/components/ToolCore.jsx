import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Plus, Trash2, Download } from 'lucide-react';

export default function ToolCore() {
  const { t } = useLocale();
  const [debts, setDebts] = useState([
    { id: 1, name: '信用卡 A', balance: 45000, rate: 24, minPayment: 900 },
    { id: 2, name: '個人貸款', balance: 120000, rate: 12, minPayment: 2400 },
  ]);
  const [extraPayment, setExtraPayment] = useState(3000);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const addDebt = () => {
    setDebts([...debts, {
      id: Date.now(),
      name: `債項 ${debts.length + 1}`,
      balance: 30000,
      rate: 18,
      minPayment: 600
    }]);
  };

  const updateDebt = (id, field, value) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: Number(value) } : d));
  };

  const removeDebt = (id) => {
    if (debts.length > 1) setDebts(debts.filter(d => d.id !== id));
  };

  const calculatePayoff = () => {
    setIsCalculating(true);
    
    const simulate = (strategy) => {
      let sortedDebts = [...debts];
      if (strategy === 'snowball') sortedDebts.sort((a, b) => a.balance - b.balance);
      else sortedDebts.sort((a, b) => b.rate - a.rate);

      let totalInterest = 0;
      let months = 0;
      let history = [];
      let remaining = sortedDebts.map(d => ({ ...d }));

      while (remaining.some(d => d.balance > 0) && months < 600) {
        months++;
        let monthInterest = 0;

        remaining.forEach(d => {
          if (d.balance > 0) {
            const interest = d.balance * (d.rate / 100 / 12);
            monthInterest += interest;
            d.balance = Math.max(0, d.balance + interest - d.minPayment);
          }
        });

        totalInterest += monthInterest;

        if (extraPayment > 0 && remaining[0].balance > 0) {
          remaining[0].balance = Math.max(0, remaining[0].balance - extraPayment);
        }

        history.push({
          month: months,
          totalBalance: remaining.reduce((sum, d) => sum + d.balance, 0)
        });
      }

      return { months, totalInterest: Math.round(totalInterest), history };
    };

    const snowball = simulate('snowball');
    const avalanche = simulate('avalanche');

    setResults({
      snowball,
      avalanche,
      extra: extraPayment,
      totalDebt: debts.reduce((sum, d) => sum + d.balance, 0)
    });
    setIsCalculating(false);
  };

  const downloadPDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    doc.text("DebtZero Pro - 債務清零報告", 20, 20);
    doc.text(`總債務: HK$${results.totalDebt.toLocaleString()}`, 20, 35);
    doc.text(`雪球法: ${results.snowball.months} 個月 | 利息 $${results.snowball.totalInterest}`, 20, 45);
    doc.text(`雪崩法: ${results.avalanche.months} 個月 | 利息 $${results.avalanche.totalInterest}`, 20, 55);
    doc.save("debt-payoff-report.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">你的債項清單</h3>
          <button onClick={addDebt} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-sm font-medium hover:bg-emerald-700 transition">
            <Plus className="w-4 h-4" /> {t('addDebt')}
          </button>
        </div>

        <div className="space-y-4">
          {debts.map((debt) => (
            <div key={debt.id} className="grid grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl">
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs text-slate-500">債項名稱</label>
                <input type="text" value={debt.name} onChange={(e) => updateDebt(debt.id, 'name', e.target.value)} className="w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 mt-1" />
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="text-xs text-slate-500">餘額 (HKD)</label>
                <input type="number" value={debt.balance} onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)} className="w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 mt-1" />
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="text-xs text-slate-500">年利率 (%)</label>
                <input type="number" value={debt.rate} onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)} className="w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 mt-1" />
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="text-xs text-slate-500">每月最低還款</label>
                <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)} className="w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 mt-1" />
              </div>
              <div className="col-span-6 md:col-span-3 flex justify-end">
                <button onClick={() => removeDebt(debt.id)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('extraPayment')}</label>
            <input 
              type="range" 
              min="0" 
              max="15000" 
              step="500"
              value={extraPayment} 
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-2" 
            />
            <div className="text-right text-emerald-600 font-mono text-lg">HK$ {extraPayment.toLocaleString()}</div>
          </div>
          <button 
            onClick={calculatePayoff} 
            disabled={isCalculating}
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-2xl text-lg flex items-center justify-center gap-3 transition w-full md:w-auto"
          >
            {isCalculating ? '計算中...' : t('calculate')}
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-900">
              <div className="text-emerald-600 text-sm font-semibold tracking-widest">雪球法 (Snowball)</div>
              <div className="text-5xl font-semibold mt-4 tabular-nums">{results.snowball.months}</div>
              <div className="text-slate-500">個月還清</div>
              <div className="mt-6 text-sm">總利息： <span className="font-mono text-lg">HK${results.snowball.totalInterest.toLocaleString()}</span></div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-blue-200 dark:border-blue-900">
              <div className="text-blue-600 text-sm font-semibold tracking-widest">雪崩法 (Avalanche)</div>
              <div className="text-5xl font-semibold mt-4 tabular-nums">{results.avalanche.months}</div>
              <div className="text-slate-500">個月還清</div>
              <div className="mt-6 text-sm">總利息： <span className="font-mono text-lg">HK${results.avalanche.totalInterest.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8">
            <h4 className="font-semibold mb-4">債務餘額變化曲線</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.snowball.history}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalBalance" stroke="#10b981" name="雪球法" strokeWidth={3} />
                  <Line type="monotone" dataKey="totalBalance" stroke="#3b82f6" name="雪崩法" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button onClick={downloadPDF} className="w-full flex items-center justify-center gap-3 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-2xl font-semibold transition">
            <Download className="w-5 h-5" /> {t('downloadPDF')}
          </button>
        </div>
      )}
    </div>
  );
}