import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SectorData } from '../types';

interface LeafletMapProps {
  sectors: SectorData[];
  selectedWard: SectorData | null;
  forecastDelta: number;
  currentFilter: 'ALL' | 'SEVERE' | 'MODERATE' | 'SAFE';
  onSelectWard: (ward: SectorData) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  sectors,
  selectedWard,
  forecastDelta,
  currentFilter,
  onSelectWard,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([30.736, 76.785], 13);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layersGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers and Polygons
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;

    layersGroupRef.current.clearLayers();

    sectors.forEach((ward) => {
      const currentWbgt = Number((ward.baseWbgt + forecastDelta).toFixed(1));
      let status: 'SEVERE' | 'MODERATE' | 'SAFE' = 'SAFE';
      if (currentWbgt >= 32.0) status = 'SEVERE';
      else if (currentWbgt >= 30.0) status = 'MODERATE';

      // Check Filter
      if (currentFilter !== 'ALL' && status !== currentFilter) {
        return;
      }

      let statusColor = '#006c46'; // SAFE
      if (status === 'SEVERE') statusColor = '#ba002a';
      else if (status === 'MODERATE') statusColor = '#ffe600';

      const isSelected = selectedWard?.id === ward.id;
      const radius = ward.id === 'manimajra' ? 850 : 550;

      // Circle Thermal Zone
      const circle = L.circle([ward.lat, ward.lng], {
        color: isSelected ? '#ba002a' : '#1b1b1f',
        weight: isSelected ? 4 : 3,
        fillColor: statusColor,
        fillOpacity: isSelected ? 0.8 : 0.65,
        radius: radius,
      });

      // Brutalist DivIcon
      const customIcon = L.divIcon({
        className: 'custom-brutalist-pin',
        html: `
          <div style="
            background: #ffffff;
            border: 2px solid #1b1b1f;
            box-shadow: ${isSelected ? '4px 4px 0px #ba002a' : '3px 3px 0px #1b1b1f'};
            padding: 3px 6px;
            font-family: 'Space Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.08)' : 'scale(1)'};
            transition: all 0.15s ease;
          ">
            <span style="width: 8px; height: 8px; background: ${statusColor}; border: 1px solid #000000; display: inline-block;"></span>
            <span>${ward.code}: ${currentWbgt}°C</span>
          </div>
        `,
        iconSize: [120, 26],
        iconAnchor: [60, 13]
      });

      const marker = L.marker([ward.lat, ward.lng], { icon: customIcon });

      const handleClick = () => {
        onSelectWard(ward);
      };

      circle.on('click', handleClick);
      marker.on('click', handleClick);

      layersGroupRef.current?.addLayer(circle);
      layersGroupRef.current?.addLayer(marker);
    });
  }, [sectors, forecastDelta, currentFilter, selectedWard, onSelectWard]);

  // Fly to selected ward when changed
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedWard) return;
    mapInstanceRef.current.flyTo([selectedWard.lat, selectedWard.lng], 14, {
      duration: 0.8
    });
  }, [selectedWard]);

  return (
    <div className="relative w-full border-[2px] border-[#1b1b1f] overflow-hidden bg-[#2f3034] h-[520px]">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Live HUD Overlay inside map (Top-Left) */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none bg-[#1b1b1f]/95 text-[#ffe600] p-2.5 border border-[#ffe600] font-mono-code text-[10px] max-w-xs shadow-[3px_3px_0px_#ffe600]">
        <div className="text-[#faf9fd] font-bold border-b border-[#faf9fd]/30 pb-1 mb-1.5 flex items-center justify-between">
          <span>SPATIAL TELEMETRY OVERLAY</span>
          <span className="w-2 h-2 rounded-full bg-[#ba002a] animate-ping"></span>
        </div>
        <div className="space-y-1">
          <div>
            HOTSPOT:{' '}
            <strong className="text-[#ffdad9]">
              {selectedWard ? selectedWard.code : 'SEC-26 TIMBER / MANDI'}
            </strong>
          </div>
          <div>
            MEAN RADIATIVE FLUX: <strong>890 W/m²</strong>
          </div>
          <div>
            URBAN HEAT ISLAND DELTA:{' '}
            <strong className="text-[#ffe600]">+4.2°C</strong>
          </div>
          <div className="text-[#dbd9dd] text-[9px] pt-0.5">
            Click any sector marker to trigger Ward Action Protocol
          </div>
        </div>
      </div>

      {/* Dynamic Map Legend (Bottom-Right) */}
      <div className="absolute bottom-2 right-2 z-20 bg-[#ffffff]/95 p-2.5 border-[2px] border-[#1b1b1f] shadow-[3px_3px_0px_#1b1b1f] font-mono-code text-[10px]">
        <div className="font-bold border-b border-[#1b1b1f] pb-1 mb-1.5 uppercase">
          WBGT RISK LEGEND
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#1b1b1f] bg-[#ba002a]"></span>
            <span>SEVERE (&gt;32.0°C) // MANDATORY CEASE WORK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#1b1b1f] bg-[#ffe600]"></span>
            <span>MODERATE (30.0 - 31.9°C) // ACTIVE HYDRATION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#1b1b1f] bg-[#00e297]"></span>
            <span>SAFE (&lt;30.0°C) // ROUTINE MONITORING</span>
          </div>
        </div>
      </div>
    </div>
  );
};
