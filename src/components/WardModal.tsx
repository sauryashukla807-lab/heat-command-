import React, { useState } from 'react';
import { X, CheckSquare, Square, Radio } from 'lucide-react';
import { SectorData } from '../types';

interface WardModalProps {
  ward: SectorData | null;
  forecastDelta: number;
  onClose: () => void;
  onSendSms: (ward: SectorData) => void;
}

export const WardModal: React.FC<WardModalProps> = ({
  ward,
  forecastDelta,
  onClose,
  onSendSms
}) => {
  const [checklist, setChecklist] = useState({
    workStop: true,
    hydration: true,
    coolingShelters: true,
    smsAlert: true,
  });

  if (!ward) return null;

  const currentWbgt = Number((ward.baseWbgt + forecastDelta).toFixed(1));
  const currentAmbient = Number((ward.baseAmbient + (forecastDelta * 0.8)).toFixed(1));
  const currentTw = Number((ward.tw + (forecastDelta * 0.5)).toFixed(1));

  let status: 'SEVERE' | 'MODERATE' | 'SAFE' = 'SAFE';
  if (currentWbgt >= 32.0) status = 'SEVERE';
  else if (currentWbgt >= 30.0) status = 'MODERATE';

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1b1b1f]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#ffffff] border-[3px] border-[#1b1b1f] shadow-[8px_8px_0px_#1b1b1f] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Warning Stripe */}
        <div className="hazard-stripe h-7 w-full border-b border-[#1b1b1f] flex items-center justify-between px-2">
          <span className="bg-[#1b1b1f] text-[#ffe600] font-mono-code text-[10px] uppercase font-bold px-2 py-0.5">
            ACTION PROTOCOL // LEVEL-4 HEAT SURVEILLANCE
          </span>
          <button
            onClick={onClose}
            className="bg-[#1b1b1f] text-[#ffffff] hover:bg-[#ba002a] font-bold px-2 py-0.5 text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Header Details */}
          <div className="flex items-start justify-between border-b-[2px] border-[#1b1b1f] pb-3">
            <div>
              <span className="font-mono-code text-[11px] text-[#4b4731] font-bold">
                LOCATION INCIDENT REPORT
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#1b1b1f] uppercase leading-tight mt-0.5">
                {ward.name}
              </div>
              <span className="font-mono-code text-[10px] bg-[#ffe600] px-2 py-0.5 border border-[#1b1b1f] font-bold uppercase mt-1 inline-block">
                {ward.type}
              </span>
            </div>

            <div className="text-right shrink-0">
              <div
                className={`px-3 py-1 font-mono-code text-xs font-bold uppercase shadow-[2px_2px_0px_#1b1b1f] border border-[#1b1b1f] ${
                  status === 'SEVERE'
                    ? 'bg-[#ba002a] text-[#ffffff]'
                    : status === 'MODERATE'
                    ? 'bg-[#ffe600] text-[#1b1b1f]'
                    : 'bg-[#67ffb8] text-[#002112]'
                }`}
              >
                {status === 'SEVERE'
                  ? 'SEVERE [CODE RED]'
                  : status === 'MODERATE'
                  ? 'MODERATE [CODE AMBER]'
                  : 'SAFE [ROUTINE NORMAL]'}
              </div>
              <div className="font-mono-code text-[10px] text-[#4b4731] font-bold mt-1">
                TIMESTAMP: 14:38 IST
              </div>
            </div>
          </div>

          {/* Metric Readout Quad-Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#efedf1] p-2.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[10px] text-[#4b4731] uppercase font-bold block">
                WBGT TEMP
              </span>
              <span className="font-mono-code text-xl sm:text-2xl text-[#ba002a] font-bold">
                {currentWbgt}°C
              </span>
            </div>
            <div className="bg-[#efedf1] p-2.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[10px] text-[#4b4731] uppercase font-bold block">
                AMBIENT (TA)
              </span>
              <span className="font-mono-code text-xl sm:text-2xl text-[#1b1b1f] font-bold">
                {currentAmbient}°C
              </span>
            </div>
            <div className="bg-[#efedf1] p-2.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[10px] text-[#4b4731] uppercase font-bold block">
                WET BULB (TW)
              </span>
              <span className="font-mono-code text-xl sm:text-2xl text-[#1b1b1f] font-bold">
                {currentTw}°C
              </span>
            </div>
            <div className="bg-[#efedf1] p-2.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[10px] text-[#4b4731] uppercase font-bold block">
                VULN INDEX
              </span>
              <span className="font-mono-code text-xl sm:text-2xl text-[#ba002a] font-bold">
                {ward.vulnScore} / 1.0
              </span>
            </div>
          </div>

          {/* Mandatory Ward Action Plan Checklist */}
          <div className="bg-[#f5f3f7] border-[2px] border-[#1b1b1f] p-3">
            <div className="font-mono-code text-[11px] font-bold uppercase mb-2.5 flex items-center gap-1.5 text-[#1b1b1f]">
              <span className="inline-block w-2.5 h-2.5 bg-[#ba002a]"></span>
              MANDATORY HEAT MITIGATION DIRECTIVES (NDMA PROTOCOL):
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <label
                onClick={() => toggleItem('workStop')}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checklist.workStop}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#ba002a] h-4 w-4 rounded-none border border-[#1b1b1f]"
                />
                <span>
                  <strong>1. Enforce Work Stoppage:</strong> Halt outdoor construction, loading, and rickshaw cart operations between 11:00 AM - 4:00 PM.
                </span>
              </label>

              <label
                onClick={() => toggleItem('hydration')}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checklist.hydration}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#ba002a] h-4 w-4 rounded-none border border-[#1b1b1f]"
                />
                <span>
                  <strong>2. Mobilize Hydration Kiosks:</strong> Activate {ward.mistingPods || 4} ORS (Oral Rehydration Solution) misting pods at primary ingress gates.
                </span>
              </label>

              <label
                onClick={() => toggleItem('coolingShelters')}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checklist.coolingShelters}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#ba002a] h-4 w-4 rounded-none border border-[#1b1b1f]"
                />
                <span>
                  <strong>3. Open High-Capacity Cooling Shelters:</strong> Verify {ward.activeShelters || 2} air-conditioned public halls are operational at Community Hub.
                </span>
              </label>

              <label
                onClick={() => toggleItem('smsAlert')}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checklist.smsAlert}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#ba002a] h-4 w-4 rounded-none border border-[#1b1b1f]"
                />
                <span>
                  <strong>4. Automated Worker SMS Alert:</strong> Dispatch targeted SMS blast to registered labour contractors in this ward.
                </span>
              </label>
            </div>
          </div>

          {/* Modal Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t-[2px] border-[#1b1b1f]">
            <button
              onClick={() => {
                onSendSms(ward);
                onClose();
              }}
              className="bg-[#ffe600] text-[#1b1b1f] hover:bg-[#1b1b1f] hover:text-[#ffe600] border-[2px] border-[#1b1b1f] px-4 py-2 font-mono-code text-xs font-bold uppercase shadow-[3px_3px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              SEND WARD SMS BROADCAST NOW
            </button>
            <button
              onClick={onClose}
              className="bg-[#e9e7ec] text-[#1b1b1f] hover:bg-[#dbd9dd] border-[2px] border-[#1b1b1f] px-4 py-2 font-mono-code text-xs font-bold uppercase active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              DISMISS WINDOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
