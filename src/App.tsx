import React, { useState } from 'react';
import { NavScreen, SectorData, DispatchLog } from './types';
import { CHANDIGARH_SECTORS, INITIAL_DISPATCH_LOGS } from './data/sectors';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TacticalCockpit } from './components/TacticalCockpit';
import { WardMatrixView } from './components/WardMatrixView';
import { MortalitySurveillanceView } from './components/MortalitySurveillanceView';
import { DispatchDaemonView } from './components/DispatchDaemonView';
import { SensorGridView } from './components/SensorGridView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { WardModal } from './components/WardModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('tactical-cockpit');
  const [sectors] = useState<SectorData[]>(CHANDIGARH_SECTORS);
  const [selectedWard, setSelectedWard] = useState<SectorData>(CHANDIGARH_SECTORS[0]);
  const [forecastDelta, setForecastDelta] = useState<number>(0);
  const [modalWard, setModalWard] = useState<SectorData | null>(null);
  const [dispatchLogs, setDispatchLogs] = useState<DispatchLog[]>(INITIAL_DISPATCH_LOGS);
  const [lastDispatch, setLastDispatch] = useState<DispatchLog | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3800);
  };

  const handleForecastDeltaChange = (delta: number) => {
    setForecastDelta(delta);
  };

  const handleSelectWard = (ward: SectorData) => {
    setSelectedWard(ward);
  };

  const handleOpenModal = (ward: SectorData) => {
    setModalWard(ward);
  };

  const handleCloseModal = () => {
    setModalWard(null);
  };

  const handleDispatchSms = (phone: string, message: string, sector: SectorData) => {
    const randomSid = 'SM' + Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newLog: DispatchLog = {
      id: `disp-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      sectorId: sector.id,
      sectorName: sector.name,
      phone: phone,
      message: message,
      sid: randomSid,
      status: 'DELIVERED',
      latencyMs: Math.floor(Math.random() * 50) + 140,
    };

    setDispatchLogs((prev) => [newLog, ...prev]);
    setLastDispatch(newLog);
    showToast(`TWILIO SMS DISPATCH CONFIRMED [${randomSid.substring(0, 10)}...]`);
  };

  const handleTriggerBatch = (groupName: string, recipientCount: number) => {
    const batchSid = 'TRK' + Math.random().toString(36).substring(2, 10).toUpperCase();
    showToast(`BATCH DISPATCH TO ${recipientCount} PHONES IN ${groupName.toUpperCase()} INITIATED`);
  };

  return (
    <div className="min-h-screen bg-[#faf9fd] text-[#1b1b1f] selection:bg-[#ffe600] selection:text-[#1b1b1f]">
      {/* Fixed Top Header */}
      <Header sectors={sectors} forecastDelta={forecastDelta} />

      {/* Fixed Operational Modules Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* Main Content Area */}
      <div className="pl-72">
        <main className="w-full pt-[104px] min-h-screen bg-[#faf9fd] px-4 sm:px-6">
          {currentScreen === 'tactical-cockpit' && (
            <TacticalCockpit
              sectors={sectors}
              selectedWard={selectedWard}
              forecastDelta={forecastDelta}
              onForecastDeltaChange={handleForecastDeltaChange}
              onSelectWard={handleSelectWard}
              onOpenModal={handleOpenModal}
              onDispatchSms={handleDispatchSms}
              lastDispatch={lastDispatch}
            />
          )}

          {currentScreen === 'ward-vulnerability-matrix' && (
            <WardMatrixView
              sectors={sectors}
              forecastDelta={forecastDelta}
              onSelectWard={handleSelectWard}
              onOpenModal={handleOpenModal}
            />
          )}

          {currentScreen === 'mortality-risk-surveillance' && (
            <MortalitySurveillanceView />
          )}

          {currentScreen === 'alert-dispatch-daemon' && (
            <DispatchDaemonView
              sectors={sectors}
              dispatchLogs={dispatchLogs}
              onTriggerBatch={handleTriggerBatch}
            />
          )}

          {currentScreen === 'sensor-telemetry-grid' && (
            <SensorGridView />
          )}

          {currentScreen === 'system-diagnostics' && (
            <DiagnosticsView />
          )}
        </main>
      </div>

      {/* Emergency Action Protocol Modal */}
      {modalWard && (
        <WardModal
          ward={modalWard}
          forecastDelta={forecastDelta}
          onClose={handleCloseModal}
          onSendSms={(ward) => {
            handleDispatchSms('+91 98765 43210', `[HEWS-CHD CRITICAL]: Mandatory heat defense action triggered for ${ward.name}. Deploy cooling units & halt unshaded manual labor.`, ward);
          }}
        />
      )}

      {/* Toast Notification Popup */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
      >
        <div className="bg-[#1b1b1f] text-[#fde400] border-[3px] border-[#dec800] p-3 shadow-[5px_5px_0px_#ffe600] flex items-center gap-2.5 font-mono-code text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#ffe600]" />
          <span>{toastMessage || 'DISPATCH SENT TO CARRIER TRUNK'}</span>
        </div>
      </div>
    </div>
  );
}
