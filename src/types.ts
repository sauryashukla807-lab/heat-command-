export type RiskLevel = 'SEVERE' | 'MODERATE' | 'SAFE';

export interface SectorData {
  id: string;
  code: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  baseAmbient: number;
  baseWbgt: number;
  tw: number; // Wet bulb temp
  tg: number; // Globe temp
  td: number; // Dew point
  vulnScore: number;
  elderlyPct: number;
  labourPct: number;
  greenCoverPct: number;
  status: RiskLevel;
  population: number;
  hospitalNearby: string;
  activeShelters: number;
  mistingPods: number;
  surfaceTemp: number;
}

export interface DispatchLog {
  id: string;
  timestamp: string;
  sectorId: string;
  sectorName: string;
  phone: string;
  message: string;
  sid: string;
  status: 'DELIVERED' | 'QUEUED' | 'SENDING';
  latencyMs: number;
}

export interface SensorStation {
  id: string;
  code: string;
  name: string;
  sector: string;
  ambientTemp: number;
  wetBulb: number;
  globeTemp: number;
  humidity: number;
  solarFlux: number; // W/m^2
  windSpeed: number; // km/h
  windDirection: string;
  batteryPct: number;
  lastPingSec: number;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

export type NavScreen = 
  | 'tactical-cockpit'
  | 'ward-vulnerability-matrix'
  | 'mortality-risk-surveillance'
  | 'alert-dispatch-daemon'
  | 'sensor-telemetry-grid'
  | 'system-diagnostics';
