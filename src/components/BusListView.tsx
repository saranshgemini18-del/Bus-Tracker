import React, { useState, useMemo } from 'react';
import { DTCBus } from '../types';
import { resolveBusProgression } from '../utils/routeResolver';
import { Zap, Bus, MapPin, ChevronLeft, ChevronRight, Search, ExternalLink, ArrowRight } from 'lucide-react';

interface BusListViewProps {
  buses: DTCBus[];
  onSelectBus: (bus: DTCBus) => void;
  selectedBusId?: string;
  onFilterRoute: (routeId: string) => void;
}

export const BusListView: React.FC<BusListViewProps> = ({
  buses,
  onSelectBus,
  selectedBusId,
  onFilterRoute,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const totalPages = Math.ceil(buses.length / pageSize) || 1;

  const paginatedBuses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return buses.slice(start, start + pageSize);
  }, [buses, currentPage, pageSize]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header / Summary */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
        <div>
          <h2 className="text-base font-bold text-slate-900">Active DTC Fleet Directory</h2>
          <p className="text-xs text-slate-500">
            Real-time GPS coordinates reported by DTC on-board AIS-140 telemetry units
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          Showing {buses.length.toLocaleString()} matching buses
        </div>
      </div>

      {/* List / Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Vehicle Plate</th>
              <th className="py-3 px-4">Fleet Type</th>
              <th className="py-3 px-4">Route</th>
              <th className="py-3 px-4">Trip Progression (Start ➔ Next ➔ Last)</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Telemetry</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {paginatedBuses.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  No buses found matching the current search filters.
                </td>
              </tr>
            ) : (
              paginatedBuses.map((bus) => {
                const isSelected = selectedBusId === bus.id;
                const isEV = bus.type === 'ev';
                const prog = resolveBusProgression(bus, buses);

                return (
                  <tr
                    key={bus.id}
                    className={`hover:bg-slate-50 transition cursor-pointer ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : ''
                    }`}
                    onClick={() => onSelectBus(bus)}
                  >
                    {/* Vehicle Plate */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isEV ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-indigo-600 ring-2 ring-indigo-200'
                        }`}
                      ></span>
                      {bus.id}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3.5 px-4">
                      {isEV ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <Zap className="w-3 h-3 text-emerald-600" /> Electric EV
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                          <Bus className="w-3 h-3 text-indigo-600" /> CNG {bus.agency}
                        </span>
                      )}
                    </td>

                    {/* Route ID */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFilterRoute(bus.routeId);
                        }}
                        className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline px-2 py-1 bg-emerald-50 rounded border border-emerald-100 text-xs"
                      >
                        Route {bus.routeId}
                      </button>
                    </td>

                    {/* Start -> Next -> Last */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="space-y-0.5 min-w-[220px]">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">Start</span>
                          <span className="truncate max-w-[170px]" title={prog.startPoint}>{prog.startPoint}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-900 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <span className="text-[10px] uppercase">Next:</span>
                          <span className="truncate max-w-[140px]">{prog.nextPoint}</span>
                          <span className="text-[10px] text-amber-700 font-medium ml-auto">(~{prog.nextPointEtaMins}m)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1 rounded">Last</span>
                          <span className="truncate max-w-[170px]" title={prog.lastPoint}>{prog.lastPoint}</span>
                        </div>
                      </div>
                    </td>

                    {/* Coordinates */}
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                      {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
                    </td>

                    {/* Freshness */}
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {bus.ageSeconds < 5 ? 'Just now' : `${bus.ageSeconds}s ago`}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBus(bus);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-slate-900 hover:bg-emerald-600 text-white shadow-sm transition"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Locate
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 bg-slate-50/50">
          <div>
            Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
            <strong className="text-slate-900">{totalPages}</strong>
          </div>
          <div className="flex items-center gap-1">
            <button
              id="pagination-prev-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="pagination-next-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
