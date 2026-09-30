import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  GitFork, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  Search, 
  PlusCircle, 
  ClipboardCheck, 
  X,
  Radar
} from 'lucide-react';
import { Shipment } from '../types';

interface OverviewTabProps {
  shipments: Shipment[];
  onTrackShipment: (code: string) => void;
  onNavigateTab: (tab: string) => void;
  activeOrdersCount: number;
  inTransitCount: number;
  deliveredTodayCount: number;
  activeClaimsCount: number;
  userName: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  shipments,
  onTrackShipment,
  onNavigateTab,
  activeOrdersCount,
  inTransitCount,
  deliveredTodayCount,
  activeClaimsCount,
  userName
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredShipments = shipments.filter(item => {
    // Search match
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const match = 
        item.trackingCode.toLowerCase().includes(q) ||
        item.recipientName.toLowerCase().includes(q) ||
        item.recipientPhone.includes(q) ||
        item.originCity.toLowerCase().includes(q) ||
        item.destCity.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Filter pill match
    if (filterType === 'CASA_TANGER') {
      return item.originCity.includes('الدار البيضاء') && item.destCity.includes('طنجة');
    }
    if (filterType === 'CASA_MARRAKECH') {
      return (item.originCity.includes('الدار البيضاء') || item.originCity.includes('الرباط')) && item.destCity.includes('مراكش');
    }
    if (filterType === 'DELIVERING') {
      return item.status === 'OUT_FOR_DELIV' || item.status === 'IN_TRANSIT';
    }
    if (filterType === 'FAILED') {
      return item.status === 'FAILED_ATTEMPT';
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* 1. Hero / Dashboard Welcome Card */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden border border-[#d3c5ac]/30">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#eab308]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eab308] text-[#0f172a] text-[11px] font-black">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a] animate-pulse"></span>
              المنصة المركزية المغربية
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#191c1e] tracking-tight">
              مرحبا بك فـ NEXT GEN
            </h1>
            <p className="text-xs sm:text-sm text-[#4f4633] max-w-md leading-relaxed font-semibold">
              حلول النقل، الكوليكط، والتوصيل السريع لجميع المدن المغربية بحرفية وموثوقية عالية.
            </p>
            {/* Responsible profile */}
            <div className="pt-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#0f172a] text-[#eab308] flex items-center justify-center font-black text-[10px]">
                NG
              </div>
              <span className="text-xs text-[#191c1e] font-semibold">
                المسؤول اللوجستي: <strong className="text-[#785a00] font-bold">{userName}</strong>
              </span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#0f172a] flex items-center justify-center text-[#eab308] shadow-md shrink-0 border border-[#eab308]/30">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        {/* Quick Metrics Counters */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-gray-100">
          <div className="bg-[#f3f4f6] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#575e70] font-bold block mb-0.5">
                الطلبات النشطة
              </span>
              <span className="font-chivo text-xl text-[#191c1e] font-black">
                {activeOrdersCount}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-[#785a00] flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#f3f4f6] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#575e70] font-bold block mb-0.5">
                فـ الطريق
              </span>
              <span className="font-chivo text-xl text-[#785a00] font-black">
                {inTransitCount}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-[#785a00] flex items-center justify-center shadow-xs">
              <GitFork className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#f3f4f6] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#575e70] font-bold block mb-0.5">
                تسلمات اليوم
              </span>
              <span className="font-chivo text-xl text-[#191c1e] font-black">
                {deliveredTodayCount}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#f3f4f6] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#b91a24] font-bold block mb-0.5">
                الشكايات النشطة
              </span>
              <span className="font-chivo text-xl text-[#b91a24] font-black">
                {activeClaimsCount}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-[#b91a24] flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Logistics Search & Pills */}
      <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2 border border-[#d3c5ac]/30">
        <div className="relative flex items-center">
          <Search className="absolute right-3.5 text-[#817660] w-4 h-4 pointer-events-none" />
          <input 
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="بحث بالرقم (NG-2026-...)، الزبون، التيليفون، أو المدينة..."
            className="w-full h-11 pr-10 pl-10 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] placeholder:text-[#817660] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#eab308] transition-all"
          />
          {searchFilter && (
            <button 
              onClick={() => setSearchFilter('')}
              className="absolute left-3 text-[#817660] hover:text-[#191c1e]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button 
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === 'ALL'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-[#f3f4f6] text-[#4f4633] hover:bg-gray-200'
            }`}
          >
            الكل ({shipments.length})
          </button>

          <button 
            type="button"
            onClick={() => setFilterType('CASA_TANGER')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === 'CASA_TANGER'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-[#f3f4f6] text-[#4f4633] hover:bg-gray-200'
            }`}
          >
            كازا ➔ طنجة
          </button>

          <button 
            type="button"
            onClick={() => setFilterType('CASA_MARRAKECH')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === 'CASA_MARRAKECH'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-[#f3f4f6] text-[#4f4633] hover:bg-gray-200'
            }`}
          >
            كازا ➔ مراكش
          </button>

          <button 
            type="button"
            onClick={() => setFilterType('DELIVERING')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === 'DELIVERING'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-[#f3f4f6] text-[#4f4633] hover:bg-gray-200'
            }`}
          >
            قيد التوصيل
          </button>

          <button 
            type="button"
            onClick={() => setFilterType('FAILED')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === 'FAILED'
                ? 'bg-[#b91a24] text-white shadow-sm'
                : 'bg-[#f3f4f6] text-[#b91a24] hover:bg-rose-100'
            }`}
          >
            متعثرة
          </button>
        </div>
      </section>

      {/* 3. Live Operations Feed */}
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] animate-ping"></span>
            <h2 className="text-base font-black text-[#191c1e]">
              آخر الإرساليات والتحركات
            </h2>
          </div>
          <button 
            onClick={() => onNavigateTab('tracking')}
            className="text-xs text-[#785a00] font-bold hover:underline flex items-center gap-1"
          >
            <span>شوف التتبع المباشر</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Shipment Cards Feed */}
        <div className="space-y-3">
          {filteredShipments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              لا توجد شحنات مطابقة للبحث أو الفلتر الحالي.
            </div>
          ) : (
            filteredShipments.map(item => (
              <div 
                key={item.id}
                className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-gray-200/70 hover:border-[#eab308] transition-all"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-chivo text-sm text-[#191c1e] font-black tracking-wide">
                      {item.trackingCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'FAILED_ATTEMPT'
                        ? 'bg-rose-100 text-[#b91a24]'
                        : item.status === 'OUT_FOR_DELIV'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-[#dce2f7] text-[#0f172a]'
                    }`}>
                      {item.statusText}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#575e70] font-medium">
                    {item.timeAgo}
                  </span>
                </div>

                {/* Cities and Price */}
                <div className="flex items-center justify-between py-0.5 text-xs text-[#191c1e]">
                  <div className="flex items-center gap-2 font-bold">
                    <span>{item.originCity}</span>
                    <ArrowLeft className="w-4 h-4 text-[#817660]" />
                    <span className="text-[#0f172a]">{item.destCity}</span>
                  </div>
                  <span className="font-chivo text-base text-[#785a00] font-black">
                    {item.codAmount} د.م.
                  </span>
                </div>

                {/* Footer with driver and Track CTA */}
                <div className="flex items-center justify-between pt-1.5 border-t border-gray-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0f172a] text-[#eab308] flex items-center justify-center font-black text-[10px]">
                      NG
                    </div>
                    <span className="text-xs text-[#575e70]">
                      السائق: <strong className="text-gray-800">{item.driverName || 'قيد التعيين'}</strong> {item.vehicleInfo && `(${item.vehicleInfo})`}
                    </span>
                  </div>
                  <button 
                    onClick={() => onTrackShipment(item.trackingCode)}
                    className="px-3 py-1.5 rounded-lg bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-1 shadow-xs"
                  >
                    <Radar className="w-3.5 h-3.5 text-[#eab308]" />
                    <span>تتبع الآن</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Quick Action Grid Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button 
          onClick={() => onNavigateTab('new-order')}
          className="p-3.5 rounded-2xl bg-[#eab308] text-[#0f172a] text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-sm hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>إرسالية جديدة</span>
        </button>

        <button 
          onClick={() => onNavigateTab('driver')}
          className="p-3.5 rounded-2xl bg-[#0f172a] text-white text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-sm hover:bg-slate-800 active:scale-[0.98] transition-all border border-[#eab308]/30"
        >
          <ClipboardCheck className="w-5 h-5 text-[#eab308]" />
          <span>مهمات الشيفور</span>
        </button>
      </div>
    </div>
  );
};
