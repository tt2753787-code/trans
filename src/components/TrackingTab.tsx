import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  Truck, 
  Check, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Navigation,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { Shipment } from '../types';

interface TrackingTabProps {
  shipments: Shipment[];
  initialTrackingCode?: string;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({ 
  shipments, 
  initialTrackingCode 
}) => {
  const [searchInput, setSearchInput] = useState(
    initialTrackingCode || (shipments[0]?.trackingCode ?? 'NG-2026-088142')
  );
  const [activeCode, setActiveCode] = useState(
    initialTrackingCode || (shipments[0]?.trackingCode ?? 'NG-2026-088142')
  );

  const currentShipment = shipments.find(
    s => s.trackingCode.toLowerCase() === activeCode.toLowerCase()
  ) || shipments[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveCode(searchInput.trim().toUpperCase());
    }
  };

  const timelineSteps = [
    { step: 1, title: 'الطلب تسجل', time: '09:15 ص', desc: 'تم تسجيل تفاصيل الكولية فالسيستيم' },
    { step: 2, title: 'الطلب تأكد', time: '09:30 ص', desc: 'تمت المراجعة والتأكيد مع المرسل' },
    { step: 3, title: 'السائق تعيّن', time: '10:00 ص', desc: `الشيفور ${currentShipment?.driverName || 'يوسف'} استلم الأوردر` },
    { step: 4, title: 'السلعة تستلمات', time: '11:15 ص', desc: 'تم استلام الطرد من نقطة الجمع بكازا' },
    { step: 5, title: 'السلعة فطريقها', time: '13:40 م', desc: 'في الطريق السيار باتجاه وجهة التوصيل' },
    { step: 6, title: 'وصلات للمدينة', time: '16:00 م', desc: `الوصول لمركز التوزيع بـ ${currentShipment?.destCity || 'المدينة'}` },
    { step: 7, title: 'خرجت للتوصيل', time: '16:45 م', desc: 'مع سائق التوصيل النهائي للعنوان المحدد' },
    { step: 8, title: 'تم التوصيل', time: '17:30 م', desc: 'تسليم الطرد وتأكيد استلام المبلغ والفاتورة' },
  ];

  const currentStep = currentShipment ? currentShipment.timelineStep : 5;

  return (
    <div className="space-y-4">
      {/* 1. Search Box */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#191c1e]">
              تبع السلعة ديالك (Live Tracking)
            </h2>
            <p className="text-xs text-[#575e70] font-semibold">
              أدخل كود الشحنة أو رقم الهاتف للمعاينة المباشرة اللحظية
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#eab308]/20 text-[#785a00] flex items-center justify-center">
            <Radar className="w-5 h-5" />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="NG-2026-XXXXXX"
            className="flex-1 h-11 px-3 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] font-chivo font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white"
          />
          <button 
            type="submit"
            className="px-4 h-11 rounded-xl bg-[#eab308] text-[#0f172a] text-xs font-black shadow-sm hover:bg-yellow-400 active:scale-95 transition-all shrink-0"
          >
            تحديث
          </button>
        </form>

        {/* Quick chip selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] text-gray-500 font-bold whitespace-nowrap">شحنات نموذجية:</span>
          {shipments.slice(0, 4).map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSearchInput(s.trackingCode);
                setActiveCode(s.trackingCode);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-chivo font-bold whitespace-nowrap transition-all ${
                activeCode === s.trackingCode 
                  ? 'bg-[#0f172a] text-[#eab308]' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s.trackingCode}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Current Tracking Status Details Card */}
      {currentShipment ? (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 border border-[#d3c5ac]/30">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-xs text-[#575e70] font-bold block mb-0.5">
                رقم الإرسالية المحددة
              </span>
              <span className="font-chivo text-base sm:text-lg text-[#191c1e] font-black tracking-wider">
                {currentShipment.trackingCode}
              </span>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-[#dce2f7] text-[#0f172a] text-xs font-bold shadow-xs">
              {currentShipment.statusText}
            </span>
          </div>

          {/* Route Visualizer */}
          <div className="flex items-center justify-between bg-[#f8f9fb] rounded-xl p-3.5 border border-gray-200/70">
            <div className="space-y-0.5">
              <span className="text-xs text-[#575e70] font-semibold">المرسل</span>
              <span className="text-sm font-black text-[#191c1e] block">
                {currentShipment.originCity}
              </span>
              <span className="text-[11px] text-[#575e70] font-bold">
                {currentShipment.senderName}
              </span>
            </div>

            <div className="flex flex-col items-center px-3">
              <div className="w-10 h-10 rounded-full bg-[#eab308]/20 flex items-center justify-center text-[#785a00] mb-1 animate-pulse">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-[#785a00] font-bold whitespace-nowrap">
                A1 طريق السيار
              </span>
            </div>

            <div className="space-y-0.5 text-left">
              <span className="text-xs text-[#575e70] font-semibold">المستلم</span>
              <span className="text-sm font-black text-[#191c1e] block">
                {currentShipment.destCity}
              </span>
              <span className="text-[11px] text-[#575e70] font-bold">
                {currentShipment.recipientName}
              </span>
            </div>
          </div>

          {/* Static Route Map Banner */}
          <div 
            className="w-full h-36 rounded-xl bg-cover bg-center shadow-inner relative flex items-end p-3 overflow-hidden border border-gray-200"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkNz-DoFilVbaoaNPeV_-1bNFuwgNXS1QY9st3-Ksn5BHDxDzH7UvSyWHmAao1EaKDLv4W5LNIANk3Q7JI84ZCETt9UDS-JDaQm96kIo7yHGi-hl2n258UzXBZChUwqllkT1SWTIDPLSZGK03ZsXjBNMOjukufhoSmM5VN5N7SCZXvzU7oesdwH3iOV_wty_D-5yU6EkjXqcxzOD66F8gK_yskxSovZg_K5lFDNSzVRehPoOh4QC8KTw')`
            }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-[#0f172a]/90 text-white text-xs flex items-center gap-2 backdrop-blur-sm border border-[#eab308]/30">
              <span className="w-2 h-2 rounded-full bg-[#eab308] animate-ping"></span>
              <span className="font-bold">
                السرعة الحالية: 84 كلم/ساعة - الوصول المتوقع: 17:30
              </span>
            </div>
          </div>

          {/* Driver & Details Card */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#f8f9fb] border border-gray-200/60">
              <span className="text-gray-500 font-bold block mb-0.5">الشيفور المسؤول:</span>
              <span className="font-bold text-gray-900 block">{currentShipment.driverName || 'يوسف العمراني'}</span>
              <span className="text-[11px] text-gray-600 block">{currentShipment.vehicleInfo || 'Renault Master #22'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f8f9fb] border border-gray-200/60">
              <span className="text-gray-500 font-bold block mb-0.5">مبلغ التحصيل COD:</span>
              <span className="font-chivo text-base font-black text-[#785a00] block">{currentShipment.codAmount} د.م.</span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> مؤمّنة بالكامل
              </span>
            </div>
          </div>

          {/* 8-Step Official Tracking Timeline */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-black text-[#191c1e] flex items-center gap-1.5">
              <span>محطات التوصيل الرسمية (Timeline)</span>
              <span className="text-xs text-gray-400 font-normal">({currentStep} من 8 مكتملة)</span>
            </h3>

            <div className="space-y-3 relative pr-4">
              <div className="absolute top-2 bottom-2 right-[7px] w-0.5 bg-gray-200"></div>

              {timelineSteps.map((s) => {
                const isPassed = s.step < currentStep;
                const isCurrent = s.step === currentStep;
                const isFuture = s.step > currentStep;

                return (
                  <div key={s.step} className={`flex items-start gap-3 relative transition-all ${isFuture ? 'opacity-40' : ''}`}>
                    {/* Step Icon */}
                    {isPassed ? (
                      <span className="w-4 h-4 rounded-full bg-[#eab308] text-[#0f172a] flex items-center justify-center ring-4 ring-white shrink-0 z-10">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full bg-[#0f172a] text-[#eab308] flex items-center justify-center ring-4 ring-white shrink-0 z-10 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white shrink-0 z-10"></span>
                    )}

                    {/* Step Content */}
                    <div className={`flex-1 rounded-xl p-2.5 ${
                      isCurrent 
                        ? 'bg-[#f8f9fb] border border-[#eab308]/40 shadow-xs' 
                        : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#191c1e]">
                          {s.title} {isCurrent && <span className="text-[#785a00] font-black">(الآن)</span>}
                        </span>
                        <span className="text-[11px] text-[#575e70] font-chivo font-bold">
                          {s.time}
                        </span>
                      </div>
                      <span className="text-xs text-[#575e70] block mt-0.5 font-medium">
                        {s.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 text-center text-gray-500 text-sm">
          لم يتم العثور على الشحنة المحددة. يرجى التأكد من الرمز.
        </div>
      )}
    </div>
  );
};
