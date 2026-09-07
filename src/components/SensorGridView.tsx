import React, { useState } from 'react';
import { SENSOR_STATIONS } from '../data/sectors';
import { SensorStation } from '../types';
import { Radio, Battery, Wind, Sun, Droplet, RefreshCw, CheckCircle2 } from 'lucide-react';

export const SensorGridView: React.FC = () => {
  const [stations, setStations] = useState<SensorStation[]>(SENSOR_STATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleForcePoll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStations(prev => prev.map(s => ({
        ...s,
        lastPingSec: Math.floor(Math.random() * 5) + 1,
        ambientTemp: Number((s.ambientTemp + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        solarFlux: Math.round(s.solarFlux + (Math.random() * 20 - 10))
      })));
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono-code text-[11px] text-[#4b4731] font-bold uppercase flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#ba002a]" />
              MODULE 05 // MICRO-METEOROLOGY IOT TELEMETRY
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1b1b1f]">
              CHANDIGARH URBAN SENSOR GRID
            </h1>
            <p className="text-xs text-[#4b4731] mt-0.5">
              Solar-powered Automatic Weather Stations (AWS) equipped with ISO-7243 calibrated wet-bulb and black-globe pyranometer masts.
            </p>
          </div>

          <button
            disabled={isRefreshing}
            onClick={handleForcePoll}
            className="bg-[#ffe600] text-[#1b1b1f] hover:bg-[#1b1b1f] hover:text-[#ffe600] border-[2px] border-[#1b1b1f] px-3.5 py-2 font-mono-code text-xs font-bold uppercase shadow-[3px_3px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            FORCE TELEMETRY POLL
          </button>
        </div>
      </div>

      {/* Sensor Station Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((st) => (
          <div key={st.id} className="bg-[#ffffff] border-[3px] border-[#1b1b1f] shadow-[4px_4px_0px_#1b1b1f] p-3.5 flex flex-col justify-between">
            <div>
              {/* Station Header */}
              <div className="flex items-start justify-between border-b-2 border-[#1b1b1f] pb-2 mb-2.5">
                <div>
                  <span className="font-mono-code text-[10px] bg-[#dec800] text-[#201c00] px-1.5 py-0.5 font-bold border border-[#1b1b1f]">
                    {st.code}
                  </span>
                  <div className="font-bold text-sm text-[#1b1b1f] mt-1">
                    {st.name}
                  </div>
                </div>

                <span className="font-mono-code text-[10px] bg-[#67ffb8] text-[#002112] px-1.5 py-0.5 font-bold border border-[#1b1b1f] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00754c] animate-ping"></span>
                  {st.status}
                </span>
              </div>

              {/* Temperatures Quad */}
              <div className="grid grid-cols-3 gap-2 bg-[#efedf1] p-2 border border-[#1b1b1f] mb-2.5 font-mono-code text-center">
                <div>
                  <span className="text-[9px] text-[#4b4731] block">AMBIENT (TA)</span>
                  <span className="text-base font-bold text-[#1b1b1f]">{st.ambientTemp}°C</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#4b4731] block">WET BULB (TW)</span>
                  <span className="text-base font-bold text-[#ba002a]">{st.wetBulb}°C</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#4b4731] block">GLOBE (TG)</span>
                  <span className="text-base font-bold text-[#1b1b1f]">{st.globeTemp}°C</span>
                </div>
              </div>

              {/* Atmospheric Details */}
              <div className="space-y-1.5 text-xs font-mono-code">
                <div className="flex items-center justify-between border-b border-[#cdc7aa] pb-1">
                  <span className="flex items-center gap-1 text-[#4b4731]">
                    <Sun className="w-3.5 h-3.5 text-[#6a5f00]" />
                    SOLAR FLUX (RS):
                  </span>
                  <span className="font-bold text-[#1b1b1f]">{st.solarFlux} W/m²</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#cdc7aa] pb-1">
                  <span className="flex items-center gap-1 text-[#4b4731]">
                    <Droplet className="w-3.5 h-3.5 text-[#00754c]" />
                    HUMIDITY:
                  </span>
                  <span className="font-bold text-[#1b1b1f]">{st.humidity}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#4b4731]">
                    <Wind className="w-3.5 h-3.5 text-[#1b1b1f]" />
                    WIND VELOCITY:
                  </span>
                  <span className="font-bold text-[#1b1b1f]">{st.windSpeed} KM/H ({st.windDirection})</span>
                </div>
              </div>
            </div>

            {/* Station Bottom Diagnostics */}
            <div className="pt-2.5 mt-3 border-t-2 border-[#1b1b1f] flex items-center justify-between font-mono-code text-[10px]">
              <span className="flex items-center gap-1 text-[#00754c] font-bold">
                <Battery className="w-3 h-3 text-[#00754c]" />
                SOLAR BATT: {st.batteryPct}%
              </span>
              <span className="text-[#4b4731]">PING: {st.lastPingSec}S AGO</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
