import React, { useState } from 'react';
import { Terminal, CheckSquare, Download, Calculator, Sliders, ShieldCheck } from 'lucide-react';

export const DiagnosticsView: React.FC = () => {
  // ISO-7243 calculation parameters
  const [tw, setTw] = useState<number>(29.5);
  const [tg, setTg] = useState<number>(51.0);
  const [td, setTd] = useState<number>(42.5);

  // WBGT formula: 0.7*Tw + 0.2*Tg + 0.1*Td
  const calculatedWbgt = Number((0.7 * tw + 0.2 * tg + 0.1 * td).toFixed(2));

  let riskCategory = 'SAFE';
  let riskColor = 'bg-[#67ffb8] text-[#002112]';
  if (calculatedWbgt >= 32.0) {
    riskCategory = 'SEVERE [MANDATORY CEASE WORK]';
    riskColor = 'bg-[#ba002a] text-[#ffffff]';
  } else if (calculatedWbgt >= 30.0) {
    riskCategory = 'MODERATE [ACTIVE HYDRATION REQUIRED]';
    riskColor = 'bg-[#ffe600] text-[#1b1b1f]';
  }

  const complianceItems = [
    { rule: 'NDMA-HAP-01', text: 'Daily color-coded alert dissemination to all 26 municipal wards by 09:00 IST', status: 'COMPLIANT' },
    { rule: 'NDMA-HAP-02', text: 'Installation of high-pressure misting systems at major inter-state transit stations (ISBT 17 & 43)', status: 'COMPLIANT' },
    { rule: 'NDMA-HAP-03', text: 'Mandatory work suspension order enforced for unshaded outdoor manual labour (11:00 to 16:00)', status: 'ACTIVE' },
    { rule: 'NDMA-HAP-04', text: 'Dedicated heat stroke casualty wings with ready ice-water submersion tubs at PGIMER & GMCH-32', status: 'COMPLIANT' },
    { rule: 'NDMA-HAP-05', text: 'Distribution of oral rehydration salts (ORS) across all traffic police check-posts', status: 'COMPLIANT' },
    { rule: 'NDMA-HAP-06', text: 'Emergency power backup for refrigeration and mortuary cold rooms verified', status: 'VERIFIED' }
  ];

  const exportAuditReport = () => {
    const reportData = {
      system: "HEWS-CHANDIGARH",
      version: "4.2",
      timestamp: new Date().toISOString(),
      iso7243Formula: "0.7*Tw + 0.2*Tg + 0.1*Td",
      calculatedWbgt,
      complianceStatus: "PASSED (100%)",
      operatorNode: "CHD-CENTRAL-01"
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hews-chandigarh-audit-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono-code text-[11px] text-[#4b4731] font-bold uppercase flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#1b1b1f]" />
              MODULE 06 // SYSTEM AUDIT &amp; ISO-7243 PYTHERMALCOMFORT
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1b1b1f]">
              DIAGNOSTICS &amp; REGULATORY COMPLIANCE
            </h1>
            <p className="text-xs text-[#4b4731] mt-0.5">
              Kernel verification, ISO-7243 mathematical engine calibration, and NDMA Heat Action Plan audit log.
            </p>
          </div>

          <button
            onClick={exportAuditReport}
            className="bg-[#ffe600] text-[#1b1b1f] hover:bg-[#1b1b1f] hover:text-[#ffe600] border-[2px] border-[#1b1b1f] px-3.5 py-2 font-mono-code text-xs font-bold uppercase shadow-[3px_3px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            EXPORT AUDIT REPORT (.JSON)
          </button>
        </div>
      </div>

      {/* 2-Column: ISO Calculator Playground + Compliance Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ISO 7243 Sandbox (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#1b1b1f] pb-2">
            <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#ba002a]" />
              ISO-7243 / PYTHERMALCOMFORT SIMULATION SANDBOX
            </h2>
            <span className="font-mono-code text-[10px] bg-[#dec800] px-2 py-0.5 font-bold border border-[#1b1b1f]">
              CALIBRATION TOOL
            </span>
          </div>

          {/* Sliders */}
          <div className="space-y-3 font-mono-code text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>NATURAL WET BULB (TW - 70% WEIGHT):</span>
                <span className="text-[#ba002a]">{tw}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="35"
                step="0.1"
                value={tw}
                onChange={(e) => setTw(parseFloat(e.target.value))}
                className="w-full accent-[#1b1b1f] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>BLACK GLOBE TEMP (TG - 20% WEIGHT):</span>
                <span className="text-[#1b1b1f]">{tg}°C</span>
              </div>
              <input
                type="range"
                min="30"
                max="65"
                step="0.1"
                value={tg}
                onChange={(e) => setTg(parseFloat(e.target.value))}
                className="w-full accent-[#1b1b1f] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>DRY BULB AMBIENT (TD - 10% WEIGHT):</span>
                <span className="text-[#1b1b1f]">{td}°C</span>
              </div>
              <input
                type="range"
                min="25"
                max="50"
                step="0.1"
                value={td}
                onChange={(e) => setTd(parseFloat(e.target.value))}
                className="w-full accent-[#1b1b1f] cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Output Display */}
          <div className="bg-[#2f3034] text-[#faf9fd] p-3.5 border-[2px] border-[#1b1b1f] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-mono-code text-xs text-[#ffe600] font-bold">
                COMPUTED WBGT VALUE:
              </span>
              <span className="font-mono-code text-3xl font-bold text-[#faf9fd]">
                {calculatedWbgt}°C
              </span>
            </div>

            <div className={`p-2 border border-[#1b1b1f] font-mono-code text-xs font-bold uppercase text-center ${riskColor}`}>
              {riskCategory}
            </div>

            <div className="font-mono-code text-[10px] text-[#dbd9dd]">
              EQUATION: (0.7 × {tw}) + (0.2 × {tg}) + (0.1 × {td}) = {calculatedWbgt}°C
            </div>
          </div>
        </div>

        {/* NDMA Compliance Matrix (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#1b1b1f] pb-2">
            <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00754c]" />
              NDMA HEAT ACTION PLAN AUDIT CHECKLIST
            </h2>
            <span className="font-mono-code text-[10px] bg-[#67ffb8] text-[#002112] px-2 py-0.5 font-bold border border-[#1b1b1f]">
              ALL CRITERIA VERIFIED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {complianceItems.map((item) => (
              <div key={item.rule} className="p-2.5 bg-[#f5f3f7] border border-[#1b1b1f] flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-mono-code text-[10px] font-bold text-[#4b4731]">
                    {item.rule}
                  </span>
                  <div className="text-[#1b1b1f]">{item.text}</div>
                </div>
                <span className="font-mono-code text-[10px] bg-[#67ffb8] text-[#002112] px-2 py-0.5 font-bold border border-[#1b1b1f] shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
