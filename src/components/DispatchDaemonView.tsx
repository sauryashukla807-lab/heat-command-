import React, { useState } from 'react';
import { DispatchLog, SectorData } from '../types';
import { Radio, Send, CheckCircle2, PhoneCall, Smartphone, ShieldCheck } from 'lucide-react';

interface DispatchDaemonViewProps {
  sectors: SectorData[];
  dispatchLogs: DispatchLog[];
  onTriggerBatch: (groupName: string, recipientCount: number) => void;
}

export const DispatchDaemonView: React.FC<DispatchDaemonViewProps> = ({
  dispatchLogs,
  onTriggerBatch
}) => {
  const [broadcastingGroup, setBroadcastingGroup] = useState<string | null>(null);

  const groups = [
    { id: 'contractors', name: 'Registered Construction & Labour Contractors', count: 1420, sectors: 'Sec 26, 43, Manimajra' },
    { id: 'vendors', name: 'Street Vendors & Hawkers Welfare Association', count: 3250, sectors: 'Sec 17, 22, Shastri Market' },
    { id: 'sanitation', name: 'Municipal Sanitation & Waste Handlers', count: 2800, sectors: 'Citywide All Sectors' },
    { id: 'asha', name: 'ASHA & Anganwadi Community Health Network', count: 1180, sectors: 'Slum & Colony Pockets' },
    { id: 'traffic', name: 'Chandigarh Traffic Police Personnel On-Duty', count: 950, sectors: 'Major Intersections' }
  ];

  const handleBroadcast = (group: typeof groups[0]) => {
    setBroadcastingGroup(group.name);
    setTimeout(() => {
      onTriggerBatch(group.name, group.count);
      setBroadcastingGroup(null);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono-code text-[11px] text-[#4b4731] font-bold uppercase flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#ba002a]" />
              MODULE 04 // EMERGENCY TRUNK &amp; BROADCAST GATEWAY
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-[#1b1b1f]">
              TWILIO SMS &amp; TELEMETRY DISPATCH DAEMON
            </h1>
            <p className="text-xs text-[#4b4731] mt-0.5">
              High-throughput asynchronous SMS delivery trunk connected to cellular towers across the Tri-City zone.
            </p>
          </div>

          <div className="bg-[#dec800] text-[#201c00] px-3 py-1 font-mono-code text-xs font-bold border border-[#1b1b1f] shadow-[2px_2px_0px_#1b1b1f]">
            TRUNK ID: TWL-CHD-MUNICIPAL-REST-01
          </div>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <span className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase block">
            SUBSCRIBED ENDPOINTS
          </span>
          <span className="font-mono-code text-2xl sm:text-3xl font-bold text-[#1b1b1f]">
            14,800
          </span>
          <span className="text-[10px] text-[#00754c] block mt-0.5 font-bold">● 100% Opt-in registered</span>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <span className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase block">
            DISPATCHES TODAY
          </span>
          <span className="font-mono-code text-2xl sm:text-3xl font-bold text-[#ba002a]">
            8,420
          </span>
          <span className="text-[10px] text-[#4b4731] block mt-0.5">Automated threshold triggers</span>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <span className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase block">
            CARRIER DELIVERABILITY
          </span>
          <span className="font-mono-code text-2xl sm:text-3xl font-bold text-[#00754c]">
            99.4%
          </span>
          <span className="text-[10px] text-[#4b4731] block mt-0.5">Airtel / Jio / BSNL / Vi SMPP</span>
        </div>

        <div className="bg-[#ffffff] border-[2px] border-[#1b1b1f] p-3 shadow-[3px_3px_0px_#1b1b1f]">
          <span className="font-mono-code text-[10px] text-[#4b4731] font-bold uppercase block">
            AVG DISPATCH LATENCY
          </span>
          <span className="font-mono-code text-2xl sm:text-3xl font-bold text-[#1b1b1f]">
            162 MS
          </span>
          <span className="text-[10px] text-[#4b4731] block mt-0.5">Direct SMS gateway handshake</span>
        </div>
      </div>

      {/* Recipient Groups Batch Trigger Console */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f] space-y-3">
        <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5 border-b-2 border-[#1b1b1f] pb-2">
          <Smartphone className="w-4 h-4 text-[#ba002a]" />
          ONE-CLICK TARGETED EMERGENCY BROADCAST TRUNKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map((group) => {
            const isSending = broadcastingGroup === group.name;
            return (
              <div key={group.id} className="p-3 bg-[#f5f3f7] border-[2px] border-[#1b1b1f] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono-code text-xs font-bold text-[#1b1b1f] uppercase">
                      {group.name}
                    </span>
                  </div>
                  <div className="font-mono-code text-[11px] text-[#4b4731] mt-1">
                    Coverage: {group.sectors}
                  </div>
                  <div className="font-mono-code text-xs font-bold text-[#ba002a] mt-1">
                    {group.count.toLocaleString()} ACTIVE RECIPIENTS
                  </div>
                </div>

                <button
                  disabled={isSending}
                  onClick={() => handleBroadcast(group)}
                  className="mt-3 w-full bg-[#1b1b1f] text-[#ffe600] hover:bg-[#ba002a] hover:text-[#ffffff] border border-[#1b1b1f] font-mono-code text-xs py-1.5 uppercase font-bold transition-all shadow-[2px_2px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1"
                >
                  {isSending ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      DISPATCHING...
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      BLAST GROUP ({group.count})
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Broadcast Log Stream */}
      <div className="bg-[#ffffff] border-[3px] border-[#1b1b1f] p-4 shadow-[4px_4px_0px_#1b1b1f]">
        <div className="flex items-center justify-between border-b-2 border-[#1b1b1f] pb-2 mb-3">
          <h2 className="font-bold text-sm uppercase text-[#1b1b1f] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00754c]" />
            LIVE DISPATCH AUDIT &amp; CARRIER RECEIPTS
          </h2>
          <span className="font-mono-code text-[10px] text-[#4b4731] font-bold">
            SHOWING LATEST DISPATCHES
          </span>
        </div>

        <div className="divide-y divide-[#cdc7aa]">
          {dispatchLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code font-bold text-[#1b1b1f]">{log.sectorName}</span>
                  <span className="font-mono-code text-[10px] text-[#4b4731]">➔ {log.phone}</span>
                  <span className="font-mono-code text-[10px] bg-[#67ffb8] text-[#002112] px-1.5 font-bold border border-[#1b1b1f]">
                    {log.status}
                  </span>
                </div>
                <div className="font-mono-code text-[11px] text-[#4b4731]">{log.message}</div>
              </div>

              <div className="text-right shrink-0 font-mono-code text-[10px]">
                <div className="text-[#1b1b1f] font-bold">SID: {log.sid}</div>
                <div className="text-[#4b4731]">{log.timestamp} // {log.latencyMs}ms</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
