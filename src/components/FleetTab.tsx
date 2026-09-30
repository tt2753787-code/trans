import React, { useState } from 'react';
import { 
  Truck, 
  Fuel, 
  Wrench, 
  Gauge, 
  CheckCircle, 
  MapPin, 
  Plus, 
  UserCheck 
} from 'lucide-react';
import { INITIAL_VEHICLES } from '../data/mockData';
import { Vehicle } from '../types';

export const FleetTab: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModel, setNewModel] = useState('');
  const [newPlate, setNewPlate] = useState('');

  const toggleStatus = (id: string) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'IN_TRANSIT' 
          ? 'AVAILABLE_HUB' 
          : v.status === 'AVAILABLE_HUB' 
          ? 'MAINTENANCE' 
          : 'IN_TRANSIT';
        const nextText = nextStatus === 'IN_TRANSIT' 
          ? 'فـ مهمة' 
          : nextStatus === 'AVAILABLE_HUB' 
          ? 'متاحة فـ الـ Hub' 
          : 'فـ الصيانة الدورية';
        return { ...v, status: nextStatus, statusText: nextText };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#191c1e]">
              الشاحنات والأسطول (Gestion Flotte)
            </h2>
            <p className="text-xs text-[#575e70] font-semibold">
              متابعة جاهزية الشاحنات وعمليات النقل البيني عبر المملكة
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#eab308] flex items-center justify-center shadow-md">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        {/* Fleet KPI Quick Bar */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-500 font-bold block">إجمالي الشاحنات</span>
            <span className="font-chivo text-lg font-black text-gray-900">{vehicles.length} شاحنات</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-[10px] text-blue-600 font-bold block">فـ الطريق</span>
            <span className="font-chivo text-lg font-black text-blue-800">
              {vehicles.filter(v => v.status === 'IN_TRANSIT').length}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] text-emerald-600 font-bold block">جاهزة فـ Hub</span>
            <span className="font-chivo text-lg font-black text-emerald-800">
              {vehicles.filter(v => v.status === 'AVAILABLE_HUB').length}
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="space-y-3">
        {vehicles.map(v => (
          <div 
            key={v.id}
            className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-[#d3c5ac]/30 hover:border-[#eab308] transition-all"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#191c1e]">
                  {v.model}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  v.status === 'IN_TRANSIT'
                    ? 'bg-[#dce2f7] text-[#0f172a]'
                    : v.status === 'AVAILABLE_HUB'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-[#b91a24]'
                }`}>
                  {v.statusText}
                </span>
              </div>
              <span className="text-xs font-chivo font-black text-[#0f172a] bg-gray-100 px-2 py-0.5 rounded-md" dir="ltr">
                {v.plateNumber}
              </span>
            </div>

            {/* Driver & Route */}
            <div className="text-xs text-[#191c1e] bg-[#f8f9fb] p-3 rounded-xl space-y-1.5 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-[#575e70]">السائق المسؤول:</span>
                <span className="font-bold text-gray-900">{v.driverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#575e70]">المسار الحالي:</span>
                <span className="font-bold text-[#785a00]">{v.route}</span>
              </div>
            </div>

            {/* Load bar & Fuel bar */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-[#575e70] mb-1">
                  <span>الحمولة الحالية:</span>
                  <span className="font-chivo">{v.loadPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#785a00] h-full rounded-full transition-all duration-500"
                    style={{ width: `${v.loadPercent}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-[#575e70] mb-1">
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3 h-3 text-[#575e70]" />
                    <span>مستوى الوقود:</span>
                  </span>
                  <span className="font-chivo">{v.fuelPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${v.fuelPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Status switcher button */}
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={() => toggleStatus(v.id)}
                className="text-[11px] font-bold text-[#785a00] hover:text-[#0f172a] underline"
              >
                تبديل حالة الجاهزية (محاكاة)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
