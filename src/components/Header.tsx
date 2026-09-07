import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, User } from 'lucide-react';
import { SectorData } from '../types';

interface HeaderProps {
  sectors: SectorData[];
  forecastDelta: number;
}

export const Header: React.FC<HeaderProps> = ({ sectors, forecastDelta }) => {
  const [timeStr, setTimeStr] = useState<string>('14:38:09 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in IST (+5:30) or local simulated clock
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute crisis counts based on current forecast delta
  const severeCount = sectors.filter(s => (s.baseWbgt + forecastDelta) >= 32.0).length;
  const moderateCount = sectors.filter(s => {
    const wbgt = s.baseWbgt + forecastDelta;
    return wbgt >= 30.0 && wbgt < 32.0;
  }).length;
  const normalCount = sectors.length - severeCount - moderateCount;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b-[3px] border-[#1b1b1f]">
      {/* Top Hazard Warning Stripe */}
      <div className="h-6 hazard-stripe w-full border-b border-[#1b1b1f] flex items-center justify-between px-3">
        <div className="bg-[#1b1b1f] text-[#ffe600] font-mono-code text-[10px] font-bold px-1.5 uppercase tracking-widest">
          SYSTEM PROTOCOL ACTIVE // LEVEL-4 HEAT DEFENSE
        </div>
        <div className="bg-[#1b1b1f] text-[#faf9fd] font-mono-code text-[10px] font-bold px-1.5">
          NODE: CHD-CENTRAL-01
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 flex items-stretch">
        {/* Brand Block */}
        <div className="w-72 border-r-[3px] border-[#1b1b1f] bg-[#ffe600] p-2.5 flex flex-col justify-between shadow-[4px_0px_0px_#1b1b1f] shrink-0">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#1b1b1f] stroke-[2.5]" />
            <span className="font-mono-code text-[11px] text-[#1b1b1f] font-bold uppercase tracking-wider">
              HEWS-CHANDIGARH
            </span>
          </div>
          <div className="text-[20px] font-bold text-[#1b1b1f] tracking-tight leading-none uppercase">
            HEAT COMMAND
          </div>
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold tracking-widest uppercase">
            MORTALITY SURVEILLANCE V4.2
          </div>
        </div>

        {/* Right Info Strips */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#faf9fd]">
          {/* Top Marquee Alert Stream */}
          <div className="h-10 bg-[#1b1b1f] text-[#fde400] flex items-center border-b-[2px] border-[#1b1b1f] overflow-hidden">
            <div className="bg-[#ba002a] text-[#ffffff] font-mono-code text-[11px] px-3 h-full flex items-center shrink-0 tracking-wider font-bold uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ffffff] animate-ping mr-2"></span>
              ALERT STREAM
            </div>
            <div className="overflow-hidden w-full whitespace-nowrap">
              <div className="animate-marquee font-mono-code text-[11px] tracking-wider text-[#ffe600] font-bold">
                <span className="mx-6">
                  LIVE TELEMETRY: SECTOR 17 WBGT 33.8°C [SEVERE RISK] // TWILIO DISPATCH DAEMON: ARMED // CITYWIDE POPULATION EXPOSED: 1,055,450 // OPEN-METEO SYNC: ACTIVE // WARD-3 HYDRATION POINT OFFLINE // AMBULANCE CORRIDOR CLEAR
                </span>
                <span className="mx-6">
                  LIVE TELEMETRY: SECTOR 17 WBGT 33.8°C [SEVERE RISK] // TWILIO DISPATCH DAEMON: ARMED // CITYWIDE POPULATION EXPOSED: 1,055,450 // OPEN-METEO SYNC: ACTIVE // WARD-3 HYDRATION POINT OFFLINE // AMBULANCE CORRIDOR CLEAR
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Crisis Counter Bar */}
          <div className="h-10 px-3 flex items-center justify-between gap-3 bg-[#f5f3f7]">
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-[10px] text-[#4b4731] uppercase tracking-wider font-bold mr-1">
                CRISIS COUNTERS:
              </span>
              <div className="flex items-center border border-[#1b1b1f] bg-[#ba002a] text-[#ffffff] px-2 h-6 shadow-[2px_2px_0px_#1b1b1f]">
                <span className="font-mono-code text-[10px] font-bold">
                  SEVERE: {String(severeCount).padStart(2, '0')} WARDS
                </span>
              </div>
              <div className="flex items-center border border-[#1b1b1f] bg-[#ffe600] text-[#1b1b1f] px-2 h-6 shadow-[2px_2px_0px_#1b1b1f]">
                <span className="font-mono-code text-[10px] font-bold">
                  ALERT: {String(moderateCount).padStart(2, '0')} WARDS
                </span>
              </div>
              <div className="flex items-center border border-[#1b1b1f] bg-[#67ffb8] text-[#002112] px-2 h-6 shadow-[2px_2px_0px_#1b1b1f]">
                <span className="font-mono-code text-[10px] font-bold">
                  NORMAL: {String(normalCount).padStart(2, '0')} WARDS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 border-r border-[#cdc7aa] pr-3">
                <span className="font-mono-code text-[10px] text-[#4b4731] font-bold">
                  TRIGGER STATUS:
                </span>
                <span className="font-mono-code text-[11px] bg-[#ffdad9] text-[#410008] px-1.5 border border-[#ba002a] font-bold">
                  {forecastDelta > 0 ? `SIMULATION +${forecastDelta}°C` : 'SIMULATION ARMED'}
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono-code text-xs font-bold text-[#1b1b1f]">
                <Clock className="w-3.5 h-3.5" />
                <span className="tracking-wider">{timeStr}</span>
              </div>
              <div className="w-7 h-7 bg-[#ffe600] flex items-center justify-center border-[2px] border-[#1b1b1f] shadow-[1px_1px_0px_#1b1b1f]" title="Operator: sauryashukla807@gmail.com">
                <User className="w-4 h-4 text-[#1b1b1f]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
