import React, { useState } from 'react';
import { SectorData } from '../types';
import { Search, ArrowUpDown, ShieldAlert, Users, Trees, Droplets } from 'lucide-react';

interface WardMatrixViewProps {
  sectors: SectorData[];
  forecastDelta: number;
  onSelectWard: (ward: SectorData) => void;
  onOpenModal: (ward: SectorData) => void;
}

export const WardMatrixView: React.FC<WardMatrixViewProps> = ({
  sectors,
  forecastDelta,
  onSelectWard,
  onOpenModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'vulnScore' | 'baseWbgt' | 'labourPct' | 'elderlyPct'>('vulnScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filtered = sectors
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.type.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'baseWbgt') {
        valA = a.baseWbgt + forecastDelta;
        valB = b.baseWbgt + forecastDelta;
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono-code text-[11px] text-[#4b4731] font-bold uppercase">
              MODULE 02 // SOCIO-SPATIAL EPIDEMIOLOGY
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1b1b1f]">
              WARD VULNERABILITY MATRIX
            </h1>
            <p className="text-xs text-[#4b4731] mt-0.5">
              Multi-criteria assessment combining ISO-7243 thermal burden with informal labour demographics and canopy deficit.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-[#4b4731]" />
              <input
                type="text"
                placeholder="SEARCH SECTOR OR WARD..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#efedf1] border-[2px] border-[#1b1b1f] font-mono-code text-xs uppercase font-bold focus:bg-[#ffffff] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#ba002a]" />
            CRITICAL VULN WARDS
          </div>
          <div className="text-2xl font-bold text-[#ba002a] font-mono-code mt-1">
            03 / {sectors.length}
          </div>
          <div className="text-[10px] text-[#4b4731] mt-0.5">Vulnerability Index &gt; 0.75</div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#1b1b1f]" />
            EXPOSED LABOUR FORCE
          </div>
          <div className="text-2xl font-bold text-[#1b1b1f] font-mono-code mt-1">
            184,200
          </div>
          <div className="text-[10px] text-[#4b4731] mt-0.5">Outdoor wage workers</div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-[#00754c]" />
            ACTIVE HYDRATION HUBS
          </div>
          <div className="text-2xl font-bold text-[#00754c] font-mono-code mt-1">
            51 KIOSKS
          </div>
          <div className="text-[10px] text-[#4b4731] mt-0.5">ORS & misting fans deployed</div>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <div className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase flex items-center gap-1">
            <Trees className="w-3.5 h-3.5 text-[#6a5f00]" />
            AVERAGE CANOPY SHADOW
          </div>
          <div className="text-2xl font-bold text-[#6a5f00] font-mono-code mt-1">
            24.7%
          </div>
          <div className="text-[10px] text-[#4b4731] mt-0.5">Target municipal minimum: 35%</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] shadow-[4px_4px_0px_#1b1b1f] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1b1b1f] text-[#ffe600] font-mono-code text-xs uppercase border-b-2 border-[#1b1b1f]">
              <th className="p-3">SECTOR / CODE</th>
              <th className="p-3">TYPOLOGY</th>
              <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('baseWbgt')}>
                <div className="flex items-center gap-1">
                  CURRENT WBGT <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('vulnScore')}>
                <div className="flex items-center gap-1">
                  VULNERABILITY INDEX <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('labourPct')}>
                <div className="flex items-center gap-1">
                  LABOUR % <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('elderlyPct')}>
                <div className="flex items-center gap-1">
                  ELDERLY % <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-3">CANOPY %</th>
              <th className="p-3">COOLING PODS</th>
              <th className="p-3 text-right">PROTOCOL ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cdc7aa] text-xs">
            {filtered.map((ward) => {
              const currentWbgt = Number((ward.baseWbgt + forecastDelta).toFixed(1));
              let status: 'SEVERE' | 'MODERATE' | 'SAFE' = 'SAFE';
              if (currentWbgt >= 32.0) status = 'SEVERE';
              else if (currentWbgt >= 30.0) status = 'MODERATE';

              return (
                <tr
                  key={ward.id}
                  className="hover:bg-[#f5f3f7] transition-colors"
                >
                  <td className="p-3 font-mono-code font-bold text-[#1b1b1f]">
                    <div>{ward.code}</div>
                    <div className="text-[11px] text-[#4b4731] font-normal">{ward.name}</div>
                  </td>
                  <td className="p-3 text-[#4b4731]">{ward.type}</td>
                  <td className="p-3 font-mono-code font-bold">
                    <span
                      className={`inline-block px-1.5 py-0.5 border border-[#1b1b1f] ${
                        status === 'SEVERE'
                          ? 'bg-[#ba002a] text-[#ffffff]'
                          : status === 'MODERATE'
                          ? 'bg-[#ffe600] text-[#1b1b1f]'
                          : 'bg-[#67ffb8] text-[#002112]'
                      }`}
                    >
                      {currentWbgt}°C
                    </span>
                  </td>
                  <td className="p-3 font-mono-code font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#efedf1] h-2 border border-[#1b1b1f]">
                        <div
                          className="bg-[#ba002a] h-full"
                          style={{ width: `${ward.vulnScore * 100}%` }}
                        />
                      </div>
                      <span>{ward.vulnScore}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono-code">{ward.labourPct}%</td>
                  <td className="p-3 font-mono-code">{ward.elderlyPct}%</td>
                  <td className="p-3 font-mono-code">{ward.greenCoverPct}%</td>
                  <td className="p-3 font-mono-code">
                    <span className="font-bold text-[#00754c]">{ward.mistingPods}</span> / {ward.activeShelters} halls
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        onSelectWard(ward);
                        onOpenModal(ward);
                      }}
                      className="bg-[#ffe600] text-[#1b1b1f] hover:bg-[#1b1b1f] hover:text-[#ffe600] border border-[#1b1b1f] px-2.5 py-1 font-mono-code text-[11px] font-bold uppercase shadow-[2px_2px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      INSPECT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
