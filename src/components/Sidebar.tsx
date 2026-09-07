import React from 'react';
import { NavScreen } from '../types';

interface SidebarProps {
  currentScreen: NavScreen;
  onSelectScreen: (screen: NavScreen) => void;
}

interface NavItem {
  id: NavScreen;
  number: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'tactical-cockpit', number: '01', label: 'Tactical Cockpit' },
  { id: 'ward-vulnerability-matrix', number: '02', label: 'Ward Matrix' },
  { id: 'mortality-risk-surveillance', number: '03', label: 'Mortality Surveillance' },
  { id: 'alert-dispatch-daemon', number: '04', label: 'Dispatch Daemon' },
  { id: 'sensor-telemetry-grid', number: '05', label: 'Sensor Grid' },
  { id: 'system-diagnostics', number: '06', label: 'Diagnostics & Logs' }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onSelectScreen }) => {
  return (
    <aside className="fixed left-0 top-[104px] bottom-0 w-72 bg-[#ffffff] border-r-[3px] border-[#1b1b1f] flex flex-col justify-between z-40">
      <div className="flex flex-col">
        {/* Module Header */}
        <div className="p-2.5 bg-[#e9e7ec] border-b border-[#1b1b1f] flex items-center justify-between">
          <span className="font-mono-code text-[10px] uppercase font-bold text-[#1b1b1f]">
            OPERATIONAL MODULES
          </span>
          <span className="font-mono-code text-[10px] bg-[#dec800] text-[#201c00] px-1.5 py-0.5 font-bold border border-[#1b1b1f]">
            ONLINE
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`flex items-center justify-between px-4 py-3 uppercase transition-all text-left ${
                  isActive
                    ? 'bg-[#ffe600] text-[#1b1b1f] font-bold border-l-4 border-l-[#1b1b1f] shadow-[inset_0px_0px_0px_1px_#1b1b1f]'
                    : 'border-b border-[#cdc7aa] text-[#4b4731] hover:bg-[#e9e7ec] hover:text-[#1b1b1f] font-medium'
                }`}
              >
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                <span className="font-mono-code text-[10px] text-[#4b4731] font-bold">
                  {item.number}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Panel */}
      <div className="p-2.5 border-t-[2px] border-[#1b1b1f] bg-[#f5f3f7]">
        <div className="border-[2px] border-[#1b1b1f] p-2 bg-[#ffffff] shadow-[3px_3px_0px_#1b1b1f] mb-1.5">
          <div className="flex justify-between items-center font-mono-code text-[10px] text-[#ba002a] font-bold">
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-[#ba002a] rounded-full animate-ping"></span>
              TELEMETRY DAEMON
            </span>
            <span className="bg-[#ffdad9] text-[#410008] px-1">RUNNING</span>
          </div>
          <div className="font-mono-code text-[11px] text-[#1b1b1f] font-bold mt-1">
            WBGT-ENGINE: STABLE
          </div>
        </div>
        <div className="text-center font-mono-code text-[10px] text-[#4b4731] font-bold">
          SEC-CHD // MUNICIPAL PROTOCOL
        </div>
      </div>
    </aside>
  );
};
