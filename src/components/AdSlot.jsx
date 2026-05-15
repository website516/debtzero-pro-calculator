export default function AdSlot({ slotId = "300x250", label = "廣告" }) {
  return (
    <div className="my-8">
      <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        {label}
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>
      {/* AdSense Slot: 300x250 應答式廣告 — 請替換為真實 data-ad-client & data-ad-slot */}
      <div 
        className="bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center min-h-[250px]"
        style={{ minHeight: '250px' }}
      >
        <div className="text-center">
          <div className="text-xs text-slate-400">Google AdSense</div>
          <div className="text-[10px] text-slate-500 mt-1">300×250 Responsive Ad</div>
        </div>
      </div>
    </div>
  );
}