'use client';

import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Plus, Trash2, Download, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

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
      balance: 35000,
      rate: 19,
      minPayment: 650
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

    setTimeout(() => {
      setResults({
        snowball,
        avalanche,
        extra: extraPayment,
        totalDebt: debts.reduce((sum, d) => sum + d.balance, 0)
      });
      setIsCalculating(false);
    }, 450);
  };

  const downloadPDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("DebtZero Pro - 債務清零報告", 20, 20);
    doc.setFontSize(12);
    doc.text(`總債務: HK$${results.totalDebt.toLocaleString()}`, 20, 35);
    doc.text(`雪球法: ${results.snowball.months} 個月 | 利息 HK$${results.snowball.totalInterest.toLocaleString()}`, 20, 48);
    doc.text(`雪崩法: ${results.avalanche.months} 個月 | 利息 HK$${results.avalanche.totalInterest.toLocaleString()}`, 20, 61);
    doc.save("debt-payoff-report.pdf");
  };

  const pieData = debts.map((debt, index) => ({
    name: debt.name,
    value: debt.balance,
    fill: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][index % 4]
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-emerald-400 text-sm font-semibold tracking-widest">YOUR DEBTS</div>
          <h3 className="text-3xl font-semibold text-white mt-1">輸入債務資料</h3>
        </div>
        <button 
          onClick={addDebt} 
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-sm border border-white/20 transition"
        >
          <Plus className="w-4 h-4" /> 新增債項
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {debts.map((debt) => (
          <div key={debt.id} className="grid grid-cols-12 gap-4 items-end bg-[#0a0f1a] p-5 rounded-2xl border border-white/10">
            <div className="col-span-12 md:col-span-3">
              <label className="text-xs text-slate-400 mb-1.5 block">DEBT NAME</label>
              <input type="text" value={debt.name} onChange={(e) => updateDebt(debt.id, 'name', e.target.value)} className="w-full bg-[#111827] border border-white/20 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="col-span-6 md:col-span-2">
              <label className="text-xs text-slate-400 mb-1.5 block">BALANCE (HKD)</label>
              <input type="number" value={debt.balance} onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)} className="w-full bg-[#111827] border border-white/20 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="col-span-6 md:col-span-2">
              <label className="text-xs text-slate-400 mb-1.5 block">INTEREST RATE (%)</label>
              <input type="number" value={debt.rate} onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)} className="w-full bg-[#111827] border border-white/20 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="col-span-6 md:col-span-2">
              <label className="text-xs text-slate-400 mb-1.5 block">MIN PAYMENT</label>
              <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)} className="w-full bg-[#111827] border border-white/20 rounded-xl px-4 py-3 text-white" />
            </div>
            <div className="col-span-6 md:col-span-3 flex justify-end">
              <button onClick={() => removeDebt(debt.id)} className="p-3 text-red-400 hover:bg-red-950/60 rounded-xl transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end mb-10">
        <div className="flex-1">
          <label className="text-sm text-slate-400 mb-2 block">EXTRA MONTHLY PAYMENT (HKD)</label>
          <div className="flex items-center gap-4">
            <input type="range" min="0" max="15000" step="500" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} className="flex-1 accent-emerald-500" />
            <div className="w-40 text-right">
              <div className="text-3xl font-semibold text-emerald-400">HK${extraPayment.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <button onClick={calculatePayoff} disabled={isCalculating} className="px-14 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl flex items-center gap-3 transition">
          {isCalculating ? '計算中...' : '計算還款計劃'}
          <TrendingDown className="w-5 h-5" />
        </button>
      </div>

      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0a0f1a] rounded-3xl p-8 border border-emerald-500/30">
              <div className="text-emerald-400 text-sm mb-2">SNOWBALL METHOD</div>
              <div className="text-6xl font-semibold text-white tabular-nums">{results.snowball.months}</div>
              <div className="text-slate-400">個月還清</div>
              <div className="mt-6 text-sm">總利息： <span className="font-mono text-xl text-white">HK${results.snowball.totalInterest.toLocaleString()}</span></div>
            </div>
            <div className="bg-[#0a0f1a] rounded-3xl p-8 border border-blue-500/30">
              <div className="text-blue-400 text-sm mb-2">AVALANCHE METHOD</div>
              <div className="text-6xl font-semibold text-white tabular-nums">{results.avalanche.months}</div>
              <div className="text-slate-400">個月還清</div>
              <div className="mt-6 text-sm">總利息： <span className="font-mono text-xl text-white">HK${results.avalanche.totalInterest.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="bg-[#0a0f1a] rounded-3xl p-8">
            <div className="flex justify-between mb-6">
              <div>
                <div className="font-semibold text-white">債務餘額變化曲線</div>
                <div className="text-sm text-slate-400">越低越快清零</div>
              </div>
              <button onClick={downloadPDF} className="text-emerald-400 flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" /> 下載 PDF
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.snowball.history}>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalBalance" stroke="#10b981" strokeWidth={3} name="雪球法" />
                  <Line type="monotone" dataKey="totalBalance" stroke="#3b82f6" strokeWidth={3} strokeDasharray="4 2" name="雪崩法" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}