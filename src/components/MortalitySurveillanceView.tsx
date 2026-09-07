import React from 'react';
import { Activity, Siren, Hospital, AlertOctagon, HeartPulse, CheckCircle2 } from 'lucide-react';

export const MortalitySurveillanceView: React.FC = () => {
  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono-code text-[11px] text-[#ba002a] font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ba002a] animate-ping"></span>
              MODULE 03 // CLINICAL TRIAGE &amp; CASUALTY SURVEILLANCE
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1b1b1f]">
              MORTALITY RISK &amp; EMERGENCY HOSPITAL CORRIDORS
            </h1>
            <p className="text-xs text-[#4b4731] mt-0.5">
              Real-time monitoring of clinical heat exhaustion, hospital bed capacities, and ambulance priority corridors across Chandigarh UT.
            </p>
          </div>
          <div className="bg-[#ba002a] text-[#ffffff] px-3 py-1 font-mono-code text-xs font-bold uppercase shadow-[3px_3px_0px_#1b1b1f]">
            ESCALATION: LEVEL-4 RED ALERT
          </div>
        </div>
      </div>

      {/* Critical Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center justify-between">
            <span>EMERGENCY ADMISSIONS</span>
            <HeartPulse className="w-4 h-4 text-[#ba002a]" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-[#ba002a] mt-1">
            47 CASES
          </div>
          <div className="text-[11px] text-[#4b4731] mt-0.5">
            Exertional heat stroke &amp; severe dehydration
          </div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center justify-between">
            <span>TERTIARY ICU UTILIZATION</span>
            <Hospital className="w-4 h-4 text-[#1b1b1f]" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-[#1b1b1f] mt-1">
            82.4%
          </div>
          <div className="text-[11px] text-[#ba002a] font-bold mt-0.5">
            Critical threshold &gt; 80% reached
          </div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center justify-between">
            <span>AMBULANCE GREEN CORRIDORS</span>
            <Siren className="w-4 h-4 text-[#00754c]" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-[#00754c] mt-1">
            4 ACTIVE
          </div>
          <div className="text-[11px] text-[#4b4731] mt-0.5">
            Avg transit response: 6.8 min
          </div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center justify-between">
            <span>FATALITIES PREVENTED</span>
            <CheckCircle2 className="w-4 h-4 text-[#dec800]" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-[#1b1b1f] mt-1">
            29 LIVES
          </div>
          <div className="text-[11px] text-[#4b4731] mt-0.5">
            Rapid ice-bath triage intervention
          </div>
        </div>
      </div>

      {/* Main Grid: Hospital Triage + Ambulance Corridor Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Hospital Hubs (7 Cols) */}
        <div className="lg:col-span-7 bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#1b1b1f] pb-2">
            <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5">
              <Hospital className="w-4 h-4 text-[#ba002a]" />
              APEX HOSPITAL CLINICAL CAPACITY TRACKER
            </h2>
            <span className="font-mono-code text-[10px] bg-[#dec800] px-2 py-0.5 font-bold border border-[#1b1b1f]">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="space-y-3">
            {/* Hospital 1 */}
            <div className="p-3 bg-[#f5f3f7] border-[2px] border-[#1b1b1f]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono-code text-xs font-bold text-[#1b1b1f]">
                    PGIMER APEX MEDICAL CENTER (SECTOR 12)
                  </span>
                  <div className="text-[11px] text-[#4b4731]">
                    Regional Referral Center // Apex Trauma &amp; Thermal Shock Unit
                  </div>
                </div>
                <span className="font-mono-code text-[10px] bg-[#ba002a] text-[#ffffff] px-2 py-0.5 font-bold">
                  HIGH PRESSURE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 font-mono-code text-[11px]">
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">TOTAL ADMISSIONS</span>
                  <span className="font-bold text-[#ba002a]">22 TODAY</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">COOLING BEDS</span>
                  <span className="font-bold text-[#1b1b1f]">18 / 20 IN USE</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">ORS STOCKS</span>
                  <span className="font-bold text-[#00754c]">4,800 LITRES</span>
                </div>
              </div>
            </div>

            {/* Hospital 2 */}
            <div className="p-3 bg-[#f5f3f7] border-[2px] border-[#1b1b1f]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono-code text-xs font-bold text-[#1b1b1f]">
                    GOVT MEDICAL COLLEGE &amp; HOSPITAL (GMCH-32)
                  </span>
                  <div className="text-[11px] text-[#4b4731]">
                    South Corridor Emergency Receiving Facility
                  </div>
                </div>
                <span className="font-mono-code text-[10px] bg-[#ffe600] text-[#1b1b1f] px-2 py-0.5 font-bold border border-[#1b1b1f]">
                  MODERATE LOAD
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 font-mono-code text-[11px]">
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">TOTAL ADMISSIONS</span>
                  <span className="font-bold text-[#1b1b1f]">14 TODAY</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">COOLING BEDS</span>
                  <span className="font-bold text-[#1b1b1f]">9 / 14 IN USE</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">ORS STOCKS</span>
                  <span className="font-bold text-[#00754c]">3,100 LITRES</span>
                </div>
              </div>
            </div>

            {/* Hospital 3 */}
            <div className="p-3 bg-[#f5f3f7] border-[2px] border-[#1b1b1f]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono-code text-xs font-bold text-[#1b1b1f]">
                    GOVT MULTI-SPECIALTY HOSPITAL (GMSH-16)
                  </span>
                  <div className="text-[11px] text-[#4b4731]">
                    Central Zone Rapid Rehydration Clinic
                  </div>
                </div>
                <span className="font-mono-code text-[10px] bg-[#67ffb8] text-[#002112] px-2 py-0.5 font-bold border border-[#1b1b1f]">
                  OPTIMAL
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 font-mono-code text-[11px]">
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">TOTAL ADMISSIONS</span>
                  <span className="font-bold text-[#1b1b1f]">8 TODAY</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">COOLING BEDS</span>
                  <span className="font-bold text-[#00754c]">4 / 12 IN USE</span>
                </div>
                <div className="bg-[#ffffff] p-1.5 border border-[#1b1b1f]">
                  <span className="text-[#4b4731] text-[9px] block">ORS STOCKS</span>
                  <span className="font-bold text-[#00754c]">2,400 LITRES</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Corridors & NDMA Protocol Levels (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
            <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5 border-b-2 border-[#1b1b1f] pb-2 mb-3">
              <Siren className="w-4 h-4 text-[#ba002a]" />
              GREEN WAVE EMERGENCY CORRIDORS
            </h2>
            <div className="space-y-2">
              <div className="bg-[#f5f3f7] p-2.5 border border-[#1b1b1f]">
                <div className="flex justify-between items-center font-mono-code text-xs font-bold">
                  <span>MADHYA MARG CORRIDOR</span>
                  <span className="text-[#00754c] bg-[#67ffb8] px-1.5 py-0.5 border border-[#1b1b1f]">
                    CLEAR // 6.2 MIN
                  </span>
                </div>
                <div className="text-[11px] text-[#4b4731] mt-1">
                  Transport Chowk ➔ PGIMER Sec 12. Police escort traffic lights overridden.
                </div>
              </div>

              <div className="bg-[#f5f3f7] p-2.5 border border-[#1b1b1f]">
                <div className="flex justify-between items-center font-mono-code text-xs font-bold">
                  <span>DAKSHIN MARG CORRIDOR</span>
                  <span className="text-[#00754c] bg-[#67ffb8] px-1.5 py-0.5 border border-[#1b1b1f]">
                    CLEAR // 7.1 MIN
                  </span>
                </div>
                <div className="text-[11px] text-[#4b4731] mt-1">
                  ISBT 43 ➔ GMCH 32. Dedicated ambulance transit bypass operational.
                </div>
              </div>

              <div className="bg-[#f5f3f7] p-2.5 border border-[#1b1b1f]">
                <div className="flex justify-between items-center font-mono-code text-xs font-bold">
                  <span>HIMALAYA MARG CORRIDOR</span>
                  <span className="text-[#410008] bg-[#ffdad9] px-1.5 py-0.5 border border-[#ba002a]">
                    CONGESTION RISK
                  </span>
                </div>
                <div className="text-[11px] text-[#4b4731] mt-1">
                  Sec 17 ➔ Sec 35. Traffic diversion active at Sector 22 Kisan Bhawan.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2f3034] text-[#faf9fd] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
            <div className="font-mono-code text-xs text-[#ffe600] font-bold uppercase mb-1">
              NDMA HEAT ACTION PLAN MATRIX
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-[#faf9fd]/20 pb-1">
                <span>YELLOW ADVISORY:</span>
                <span className="font-mono-code">WBGT 30.0°C - 31.9°C</span>
              </div>
              <div className="flex justify-between border-b border-[#faf9fd]/20 pb-1 text-[#ffe600]">
                <span>ORANGE ALERT:</span>
                <span className="font-mono-code font-bold">WBGT 32.0°C - 33.9°C</span>
              </div>
              <div className="flex justify-between text-[#ffdad9] font-bold">
                <span>RED EMERGENCY:</span>
                <span className="font-mono-code">WBGT &gt;= 34.0°C (CURRENT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
