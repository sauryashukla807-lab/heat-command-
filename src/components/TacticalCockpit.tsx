import React, { useState } from 'react';
import { Send, MapPin, Radio, Flame, Sparkles } from 'lucide-react';
import { SectorData, DispatchLog } from '../types';
import { LeafletMap } from './LeafletMap';

interface TacticalCockpitProps {
  sectors: SectorData[];
  selectedWard: SectorData;
  forecastDelta: number;
  onForecastDeltaChange: (delta: number, hours: number) => void;
  onSelectWard: (ward: SectorData) => void;
  onOpenModal: (ward: SectorData) => void;
  onDispatchSms: (phone: string, message: string, sector: SectorData) => void;
  lastDispatch: DispatchLog | null;
}

export const TacticalCockpit: React.FC<TacticalCockpitProps> = ({
  sectors,
  selectedWard,
  forecastDelta,
  onForecastDeltaChange,
  onSelectWard,
  onOpenModal,
  onDispatchSms,
  lastDispatch
}) => {
  const [currentFilter, setCurrentFilter] = useState<'ALL' | 'SEVERE' | 'MODERATE' | 'SAFE'>('ALL');
  const [simSliderValue, setSimSliderValue] = useState<number>(0);
  const [recipientPhone, setRecipientPhone] = useState<string>('+91 98765 43210');
  const [customDraft, setCustomDraft] = useState<string>('');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  // Dynamic values based on forecast simulation
  const currentCityAmbient = Number((42.4 + (forecastDelta * 0.9)).toFixed(1));
  const currentCityWbgt = Number((33.1 + forecastDelta).toFixed(1));
  const currentTw = Number((29.1 + (forecastDelta * 0.5)).toFixed(1));
  const currentTg = Number((51.2 + (forecastDelta * 1.1)).toFixed(1));

  // Compute live filter counts
  const severeCount = sectors.filter(s => (s.baseWbgt + forecastDelta) >= 32.0).length;
  const moderateCount = sectors.filter(s => {
    const w = s.baseWbgt + forecastDelta;
    return w >= 30.0 && w < 32.0;
  }).length;
  const safeCount = sectors.length - severeCount - moderateCount;

  // Selected ward simulated WBGT
  const selectedWbgt = Number((selectedWard.baseWbgt + forecastDelta).toFixed(1));
  let selectedStatus: 'SEVERE' | 'MODERATE' | 'SAFE' = 'SAFE';
  if (selectedWbgt >= 32.0) selectedStatus = 'SEVERE';
  else if (selectedWbgt >= 30.0) selectedStatus = 'MODERATE';

  // Format default draft SMS message
  const defaultDraft = `[HEWS-CHD CRITICAL]: WBGT in ${selectedWard.name} reached ${selectedWbgt}°C (${selectedStatus}). Mortality Risk Level Active. Immediate action: Deploy misting units, halt unshaded labour 1100-1600h, open Community Center cooling shelter. Ref ID #CHD-${selectedWard.code}. Auth: CHD-DISASTER-CELL.`;
  const activeMessage = customDraft || defaultDraft;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value, 10);
    setSimSliderValue(hours);

    let delta = 0;
    if (hours === 6) delta = 1.8;
    else if (hours === 12) delta = 2.6;
    else if (hours === 18) delta = 0.9;
    else if (hours === 24) delta = 3.2;

    onForecastDeltaChange(delta, hours);
  };

  const getSliderLabel = (hours: number) => {
    if (hours === 0) return '+0H (NOW)';
    if (hours === 6) return '+6H (+1.8°C)';
    if (hours === 12) return '+12H (+2.6°C PEAK)';
    if (hours === 18) return '+18H (+0.9°C SUNSET)';
    if (hours === 24) return '+24H (+3.2°C HEAT D+1)';
    return `+${hours}H`;
  };

  const handleExecuteDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      onDispatchSms(recipientPhone, activeMessage, selectedWard);
      setIsDispatching(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12">
      {/* TOP METRIC STATUS STRIP (4 NEO-BRUTALIST MODULES) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Current City Ambient */}
        <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f] flex flex-col justify-between relative overflow-hidden">
          <div className="bg-[#1b1b1f] text-[#fde400] font-mono-code text-[10px] px-1.5 py-0.5 flex items-center justify-between uppercase">
            <span>TELEMETRY FEED // SENSOR ARRAY</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#ba002a] animate-ping"></span>
          </div>
          <div className="my-2">
            <span className="font-mono-code text-xs text-[#4b4731] uppercase font-bold">
              CURRENT CITY AMBIENT
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono-code text-4xl sm:text-5xl text-[#1b1b1f] font-bold">
                {currentCityAmbient}
              </span>
              <span className="text-2xl font-bold text-[#ba002a]">°C</span>
            </div>
            <p className="text-xs text-[#4b4731] font-medium mt-1">
              Peak: Sector 26 Timber/Grain Zone
            </p>
          </div>
          <div className="pt-2 border-t-[2px] border-[#1b1b1f] flex justify-between font-mono-code text-[10px] text-[#1b1b1f]">
            <span>HUMIDITY: <strong className="text-[#ba002a] font-bold">44%</strong></span>
            <span>WIND: <strong className="font-bold">11 KM/H (WNW)</strong></span>
          </div>
        </div>

        {/* Stat 2: Calculated WBGT Index */}
        <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f] flex flex-col justify-between relative overflow-hidden">
          <div className="bg-[#ba002a] text-[#ffffff] font-mono-code text-[10px] px-1.5 py-0.5 flex items-center justify-between uppercase">
            <span className="flex items-center gap-1 font-bold">
              <Flame className="w-3 h-3" />
              ISO 7243 ALGORITHM
            </span>
            <span className="bg-[#ffffff] text-[#ba002a] px-1 font-bold">DANGER ZONE</span>
          </div>
          <div className="my-2">
            <span className="font-mono-code text-xs text-[#4b4731] uppercase font-bold">
              CALCULATED WBGT INDEX
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono-code text-4xl sm:text-5xl text-[#ba002a] font-bold">
                {currentCityWbgt}
              </span>
              <span className="text-2xl font-bold text-[#ba002a]">°C</span>
            </div>
            <div className="inline-block bg-[#ffdad9] text-[#410008] px-1.5 py-0.5 font-mono-code text-[10px] uppercase font-bold tracking-wider mt-1 border border-[#ba002a]">
              CRITICAL THRESHOLD &gt;32.0°C EXCEEDED
            </div>
          </div>
          <div className="pt-2 border-t-[2px] border-[#1b1b1f] flex justify-between font-mono-code text-[10px] text-[#1b1b1f]">
            <span>WET BULB: <strong className="font-bold">{currentTw}°C</strong></span>
            <span>GLOBE: <strong className="font-bold">{currentTg}°C</strong></span>
          </div>
        </div>

        {/* Stat 3: 3-Day Open-Meteo Outlook */}
        <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f] flex flex-col justify-between relative">
          <div className="bg-[#1b1b1f] text-[#faf9fd] font-mono-code text-[10px] px-1.5 py-0.5 flex items-center justify-between uppercase">
            <span>OPEN-METEO SYNC // MODEL GFS</span>
            <span className="text-[#ffe600] font-bold">PROJECTION</span>
          </div>
          <div className="my-1.5 space-y-1">
            <div className="flex items-center justify-between bg-[#efedf1] px-2 py-0.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[11px] font-bold">TODAY:</span>
              <span className="font-mono-code text-[11px] font-bold text-[#ba002a]">43.1°C // WBGT 33.4°C</span>
            </div>
            <div className="flex items-center justify-between bg-[#ffdad9] text-[#410008] px-2 py-0.5 border border-[#1b1b1f] font-bold">
              <span className="font-mono-code text-[11px]">TOMORROW [PEAK]:</span>
              <span className="font-mono-code text-[11px]">44.8°C // WBGT 34.6°C</span>
            </div>
            <div className="flex items-center justify-between bg-[#efedf1] px-2 py-0.5 border border-[#1b1b1f]">
              <span className="font-mono-code text-[11px] font-bold">DAY +2:</span>
              <span className="font-mono-code text-[11px] font-bold text-[#6a5f00]">41.8°C // WBGT 32.0°C</span>
            </div>
          </div>
          <div className="pt-2 border-t-[2px] border-[#1b1b1f] flex justify-between font-mono-code text-[10px] text-[#4b4731]">
            <span>SYNOPTIC: SYNTHETIC DRY LRA</span>
            <span className="text-[#ba002a] font-bold">HEATWAVE D-4</span>
          </div>
        </div>

        {/* Stat 4: Twilio Dispatch Gateway */}
        <div className="bg-[#ffe600] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f] flex flex-col justify-between relative">
          <div className="bg-[#1b1b1f] text-[#ffe600] font-mono-code text-[10px] px-1.5 py-0.5 flex items-center justify-between uppercase">
            <span className="flex items-center gap-1 font-bold">
              <Radio className="w-3 h-3" />
              TWILIO DISPATCH GATEWAY
            </span>
            <span className="bg-[#dec800] text-[#201c00] px-1 font-bold border border-[#ffe600]">
              DAEMON ARMED
            </span>
          </div>
          <div className="my-2">
            <div className="font-mono-code text-xs text-[#1b1b1f] uppercase font-bold">
              EMERGENCY BROADCAST TRUNK
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#1b1b1f] uppercase tracking-tight">
              +91-98765-HEWS1
            </div>
            <p className="font-mono-code text-[10px] text-[#4b4731] mt-0.5 font-bold">
              REST API DAEMON ACTIVE // 14,800 SUBSCRIBERS
            </p>
          </div>
          <div className="pt-2 border-t-[2px] border-[#1b1b1f]">
            <button
              onClick={() => onOpenModal(selectedWard)}
              className="w-full bg-[#1b1b1f] text-[#ffe600] hover:bg-[#e3e2e6] hover:text-[#1b1b1f] font-mono-code text-xs py-1.5 uppercase font-bold border border-[#1b1b1f] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              RUN SYSTEM ALERT TEST
            </button>
          </div>
        </div>
      </section>

      {/* MAIN 2-COLUMN TACTICAL CANVAS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT PANEL: GIS LEAFLET MAP & SIMULATION ENGINE (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-3 bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f]">
          {/* Tactical Map Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1b1b1f] text-[#faf9fd] p-2 border border-[#1b1b1f]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ffe600]" />
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#ffe600] font-bold">
                GIS SPATIAL RISK MATRIX // CHANDIGARH UT SECTOR GRID
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-[#e9e7ec]">
              <span>CENTER: 30.7333° N, 76.7794° E</span>
              <span className="text-[#ffe600]">|</span>
              <span>CRS: EPSG-3857</span>
            </div>
          </div>

          {/* Map Filter Bar & Sim Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-[#f5f3f7] p-2 border border-[#1b1b1f] items-center">
            {/* Filter Buttons */}
            <div className="md:col-span-6 flex flex-wrap gap-1">
              <button
                onClick={() => setCurrentFilter('ALL')}
                className={`border border-[#1b1b1f] px-2 py-1 font-mono-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  currentFilter === 'ALL'
                    ? 'bg-[#1b1b1f] text-[#ffe600] shadow-[2px_2px_0px_#1b1b1f]'
                    : 'bg-[#ffffff] text-[#1b1b1f] hover:bg-[#e9e7ec]'
                }`}
              >
                ALL SECTORS ({sectors.length})
              </button>
              <button
                onClick={() => setCurrentFilter('SEVERE')}
                className={`border border-[#1b1b1f] px-2 py-1 font-mono-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  currentFilter === 'SEVERE'
                    ? 'bg-[#ba002a] text-[#ffffff] shadow-[2px_2px_0px_#1b1b1f]'
                    : 'bg-[#ffffff] text-[#1b1b1f] hover:bg-[#ffdad9]'
                }`}
              >
                SEVERE ONLY ({severeCount})
              </button>
              <button
                onClick={() => setCurrentFilter('MODERATE')}
                className={`border border-[#1b1b1f] px-2 py-1 font-mono-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  currentFilter === 'MODERATE'
                    ? 'bg-[#ffe600] text-[#1b1b1f] shadow-[2px_2px_0px_#1b1b1f]'
                    : 'bg-[#ffffff] text-[#1b1b1f] hover:bg-[#fde400]'
                }`}
              >
                MODERATE ({moderateCount})
              </button>
              <button
                onClick={() => setCurrentFilter('SAFE')}
                className={`border border-[#1b1b1f] px-2 py-1 font-mono-code text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  currentFilter === 'SAFE'
                    ? 'bg-[#006c46] text-[#ffffff] shadow-[2px_2px_0px_#1b1b1f]'
                    : 'bg-[#ffffff] text-[#1b1b1f] hover:bg-[#67ffb8]'
                }`}
              >
                SAFE ({safeCount})
              </button>
            </div>

            {/* Simulation Hour Slider */}
            <div className="md:col-span-6 flex items-center justify-end gap-2 bg-[#ffffff] px-2 py-1 border border-[#1b1b1f]">
              <label
                htmlFor="hour-slider"
                className="font-mono-code text-[10px] uppercase font-bold text-[#1b1b1f] shrink-0"
              >
                SIMULATION STEP:
              </label>
              <input
                id="hour-slider"
                type="range"
                min="0"
                max="24"
                step="6"
                value={simSliderValue}
                onChange={handleSliderChange}
                className="w-28 accent-[#1b1b1f] cursor-pointer"
              />
              <span className="font-mono-code text-[11px] font-bold bg-[#ffe600] px-2 py-0.5 border border-[#1b1b1f] shrink-0">
                {getSliderLabel(simSliderValue)}
              </span>
            </div>
          </div>

          {/* LEAFLET MAP CONTAINER */}
          <LeafletMap
            sectors={sectors}
            selectedWard={selectedWard}
            forecastDelta={forecastDelta}
            currentFilter={currentFilter}
            onSelectWard={(ward) => {
              onSelectWard(ward);
              onOpenModal(ward);
            }}
          />

          {/* GIS Telemetry Log Sub-Panel */}
          <div className="bg-[#f5f3f7] border border-[#1b1b1f] p-2 flex flex-wrap items-center justify-between gap-2 font-mono-code text-[10px]">
            <div className="flex items-center gap-2">
              <span className="bg-[#ba002a] text-[#ffffff] px-2 py-0.5 font-bold uppercase">
                HOTSPOT DETECTION
              </span>
              <span className="text-[#1b1b1f] font-bold">
                SECTOR 26 (GRAIN MANDI): SURFACETEMP 49.8°C // WBGT 34.2°C (VULNERABILITY INDEX: 0.88)
              </span>
            </div>
            <div className="text-[#4b4731] font-bold">LATENCY: 42MS</div>
          </div>
        </div>

        {/* RIGHT PANEL: VULNERABILITY MATRIX & DISPATCH ENGINE (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Python Engine Logic Visualizer */}
          <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f]">
            <div className="bg-[#1b1b1f] text-[#faf9fd] font-mono-code text-[10px] px-1.5 py-0.5 flex items-center justify-between uppercase">
              <span>FASTAPI // PYTHERMALCOMFORT KERNEL</span>
              <span className="text-[#4dffb2] font-bold">ISO-7243 LOGIC</span>
            </div>
            <div className="mt-2 bg-[#2f3034] text-[#faf9fd] p-2.5 font-mono-code text-[11px] border border-[#1b1b1f]">
              <div className="text-[#ffe600]">// FORMULA EQUATION</div>
              <div className="text-[#faf9fd] font-bold">WBGT = 0.7*Tw + 0.2*Tg + 0.1*Td</div>
              <div className="mt-1 text-[#dbd9dd]">// MORTALITY ESCALATION RULE:</div>
              <div className="text-[#ffdad9] font-bold leading-tight">
                IF WBGT &gt; 32°C &amp;&amp; Vuln &gt;= HIGH<br />
                =&gt; TRIGGER SEVERE PROTOCOL (SMS DAEMON)
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono-code bg-[#efedf1] p-2 border border-[#1b1b1f]">
              <span>TARGET VULNERABILITY INDEX:</span>
              <span className="font-bold text-[#ba002a]">MAX 0.88 (SECTOR 26)</span>
            </div>
          </div>

          {/* Sector Vulnerability Directory List */}
          <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f]">
            <div className="flex items-center justify-between border-b-[2px] border-[#1b1b1f] pb-2 mb-2">
              <div className="text-sm font-bold text-[#1b1b1f] uppercase leading-none">
                WARD RISK MATRIX
              </div>
              <span className="font-mono-code text-[10px] bg-[#ba002a] text-[#ffffff] px-1.5 py-0.5 font-bold">
                LIVE SECTORS
              </span>
            </div>

            {/* Scrollable Sector Items */}
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {sectors.map((ward) => {
                const currentWbgt = Number((ward.baseWbgt + forecastDelta).toFixed(1));
                let status: 'SEVERE' | 'MODERATE' | 'SAFE' = 'SAFE';
                if (currentWbgt >= 32.0) status = 'SEVERE';
                else if (currentWbgt >= 30.0) status = 'MODERATE';

                const isSelected = selectedWard.id === ward.id;

                let badgeClass = 'bg-[#ba002a] text-[#ffffff]';
                if (status === 'MODERATE') badgeClass = 'bg-[#fde400] text-[#1b1b1f]';
                if (status === 'SAFE') badgeClass = 'bg-[#67ffb8] text-[#002112]';

                return (
                  <div
                    key={ward.id}
                    onClick={() => onSelectWard(ward)}
                    className={`p-2 border-[2px] border-[#1b1b1f] cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#ffe600] shadow-[3px_3px_0px_#1b1b1f]'
                        : 'bg-[#f5f3f7] hover:bg-[#e9e7ec]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-xs font-bold uppercase text-[#1b1b1f]">
                        {ward.name.split('(')[0]}
                      </span>
                      <span
                        className={`font-mono-code text-[10px] px-1.5 border border-[#1b1b1f] font-bold uppercase ${badgeClass}`}
                      >
                        {status} // {currentWbgt}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono-code text-[10px] text-[#4b4731] mt-1">
                      <span>LABOUR: <strong>{ward.labourPct}%</strong></span>
                      <span>ELDERLY: <strong>{ward.elderlyPct}%</strong></span>
                      <span>VULN INDEX: <strong className="text-[#1b1b1f]">{ward.vulnScore}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TWILIO SMS DISPATCH CONSOLE */}
          <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-3 shadow-[4px_4px_0px_#1b1b1f]">
            <div className="hazard-stripe h-4 -mx-3 -mt-3 mb-2 border-b border-[#1b1b1f]"></div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-bold text-[#1b1b1f] uppercase flex items-center gap-1">
                <Send className="w-4 h-4 text-[#ba002a]" />
                TWILIO DISPATCH
              </div>
              <span className="bg-[#dec800] text-[#201c00] font-mono-code text-[10px] px-1.5 py-0.5 font-bold border border-[#1b1b1f]">
                API READY
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-mono-code text-[10px] uppercase font-bold block mb-0.5 text-[#1b1b1f]">
                  SELECT TARGET SECTOR:
                </label>
                <select
                  value={selectedWard.id}
                  onChange={(e) => {
                    const match = sectors.find(s => s.id === e.target.value);
                    if (match) onSelectWard(match);
                  }}
                  className="w-full bg-[#efedf1] border-[2px] border-[#1b1b1f] p-1.5 font-mono-code text-xs text-[#1b1b1f] uppercase font-bold focus:bg-[#ffffff] focus:outline-none"
                >
                  {sectors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono-code text-[10px] uppercase font-bold block mb-0.5 text-[#1b1b1f]">
                  INCIDENT COMMAND RECIPIENT PHONE:
                </label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full bg-[#efedf1] border-[2px] border-[#1b1b1f] p-1.5 font-mono-code text-xs text-[#1b1b1f] font-bold focus:bg-[#ffffff] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono-code text-[10px] uppercase font-bold block mb-0.5 text-[#1b1b1f]">
                  RAW SMS TELEMETRY DRAFT:
                </label>
                <textarea
                  rows={4}
                  value={activeMessage}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  className="w-full bg-[#e3e2e6] border-[2px] border-[#1b1b1f] p-2 font-mono-code text-[10px] text-[#1b1b1f] font-bold resize-none focus:outline-none"
                />
              </div>

              {/* Dispatch Action Button */}
              <button
                disabled={isDispatching}
                onClick={handleExecuteDispatch}
                className="w-full bg-[#ba002a] text-[#ffffff] hover:bg-[#1b1b1f] hover:text-[#ffe600] font-mono-code text-xs py-2 uppercase font-bold border-[2px] border-[#1b1b1f] shadow-[4px_4px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isDispatching ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    DISPATCHING VIA TWILIO TRUNK...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>TRIGGER LIVE TWILIO DISPATCH</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Dispatch Feedback Box */}
            {lastDispatch && (
              <div className="mt-2 bg-[#2f3034] text-[#faf9fd] p-2 border border-[#1b1b1f] font-mono-code text-[10px] animate-in fade-in">
                <div className="text-[#4dffb2] font-bold flex items-center justify-between border-b border-[#faf9fd]/20 pb-1 mb-1">
                  <span>STATUS: 201 CREATED ({lastDispatch.status})</span>
                  <span>LATENCY: {lastDispatch.latencyMs}MS</span>
                </div>
                <div>RECIPIENT: <span className="text-[#ffffff] font-bold">{lastDispatch.phone}</span></div>
                <div>TWILIO MESSAGE SID: <span className="text-[#fde400]">{lastDispatch.sid}</span></div>
                <div className="text-[#dbd9dd] text-[9px] truncate mt-1">
                  PAYLOAD: {lastDispatch.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
