import React, { useState } from 'react';
import { 
  Phone, 
  Map, 
  PackageCheck, 
  CheckCircle2, 
  AlertOctagon, 
  Truck, 
  User, 
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Shipment } from '../types';
import { PodModal } from './PodModal';

interface DriverTabProps {
  shipments: Shipment[];
  onUpdateShipmentStatus: (id: string, newStatus: any, note?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const DriverTab: React.FC<DriverTabProps> = ({
  shipments,
  onUpdateShipmentStatus,
  onNavigateTab
}) => {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id ?? '');
  const [isPodOpen, setIsPodOpen] = useState(false);
  const [pickupAlert, setPickupAlert] = useState<string | null>(null);

  const activeMission = shipments.find(s => s.id === selectedShipmentId) || shipments[0];

  const handlePickup = () => {
    if (activeMission) {
      onUpdateShipmentStatus(activeMission.id, 'PICKED_UP', 'تم استلام السلعة بنجاح وتوثيق الـ GPS والتوقيت فالسيستيم');
      setPickupAlert('تم تسجيل استلام السلعة بنجاح بنقطة الجمع بكازا!');
      setTimeout(() => setPickupAlert(null), 4000);
    }
  };

  const handlePodConfirm = (signatureData: string, note: string) => {
    if (activeMission) {
      onUpdateShipmentStatus(activeMission.id, 'DELIVERED', note || 'تم التوصيل بنجاح واستلام التوقيع');
      setIsPodOpen(false);
      setPickupAlert('تم توثيق إثبات التسليم النهائي (POD) وتأكيد الاستلام!');
      setTimeout(() => setPickupAlert(null), 4000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Driver Workspace Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0f172a] text-[#eab308] border border-[#eab308]/40 flex items-center justify-center font-chivo font-black text-lg shadow-sm">
              NG
            </div>
            <div>
              <h2 className="text-base font-black text-[#191c1e]">
                فضاء السائق الميداني
              </h2>
              <span className="text-xs text-[#575e70] font-semibold block">
                السائق: يوسف العمراني | Renault Master #42-أ-16
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            متصل الآن
          </span>
        </div>

        {/* Assigned Missions Bar */}
        <div className="p-3 bg-[#eab308]/20 rounded-xl flex items-center justify-between border border-[#eab308]/40">
          <span className="text-xs sm:text-sm text-[#0f172a] font-black">
            المهمات المعينة لليوم: {shipments.filter(s => s.status !== 'DELIVERED').length} كوليات نشطة
          </span>
          <button 
            type="button"
            onClick={() => onNavigateTab('tracking')}
            className="text-xs text-[#785a00] font-black underline hover:text-[#0f172a]"
          >
            تحديث التعيينات
          </button>
        </div>
      </div>

      {pickupAlert && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 border border-emerald-300 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{pickupAlert}</span>
        </div>
      )}

      {/* Active Driver Mission Card */}
      {activeMission && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 border border-[#d3c5ac]/30">
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <div className="space-y-0.5">
              <span className="px-2 py-0.5 rounded-md bg-[#eab308] text-[#0f172a] text-[10px] font-black">
                مهمة عاجلة
              </span>
              <span className="font-chivo text-sm sm:text-base text-[#191c1e] font-black block tracking-wide">
                إرسالية #{activeMission.trackingCode}
              </span>
            </div>
            <div className="text-left">
              <span className="font-chivo text-base sm:text-lg text-[#785a00] font-black block">
                {activeMission.codAmount} د.م. COD
              </span>
              <span className="text-[10px] text-gray-500 font-semibold">مبلغ التحصيل نقداً</span>
            </div>
          </div>

          {/* Mission Details Box */}
          <div className="space-y-2 text-xs text-[#191c1e] bg-[#f8f9fb] p-3.5 rounded-xl border border-gray-200/70">
            <div className="flex items-center justify-between">
              <span className="text-[#575e70] font-bold">الزبون:</span>
              <span className="font-black text-gray-900">{activeMission.recipientName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#575e70] font-bold">رقم التيليفون:</span>
              <span className="font-chivo font-black text-gray-900" dir="ltr">
                {activeMission.recipientPhone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#575e70] font-bold">العنوان:</span>
              <span className="font-bold text-gray-800 text-left max-w-[210px] truncate">
                {activeMission.address}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#575e70] font-bold">محتوى الكولية:</span>
              <span className="text-gray-700">
                {activeMission.itemType} ({activeMission.weightKg} كغ)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#575e70] font-bold">الحالة الراهنة:</span>
              <span className="font-bold text-blue-700">{activeMission.statusText}</span>
            </div>
          </div>

          {/* Driver Quick Action Rails */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a 
              href={`tel:${activeMission.recipientPhone || '0649600070'}`}
              className="h-11 rounded-xl bg-[#f3f4f6] text-[#191c1e] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 hover:bg-gray-200 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>عيّط للزبون</span>
            </a>

            <button 
              type="button"
              onClick={() => onNavigateTab('hub')}
              className="h-11 rounded-xl bg-[#f3f4f6] text-[#191c1e] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 hover:bg-gray-200 active:scale-95 transition-all"
            >
              <Map className="w-4 h-4 text-[#785a00]" />
              <span>شوف الخريطة</span>
            </button>
          </div>

          {/* Driver Workflow Progression */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={handlePickup}
                className="flex-1 h-12 rounded-xl bg-[#0f172a] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm hover:bg-slate-800"
              >
                <PackageCheck className="w-4 h-4 text-[#eab308]" />
                <span>استلمات السلعة (Pick up)</span>
              </button>

              <button 
                type="button"
                onClick={() => setIsPodOpen(true)}
                className="flex-1 h-12 rounded-xl bg-[#eab308] text-[#0f172a] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm hover:bg-yellow-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تأكيد التوصيل (POD)</span>
              </button>
            </div>

            <button 
              type="button"
              onClick={() => onNavigateTab('claims')}
              className="w-full h-10 rounded-xl bg-rose-50 text-[#b91a24] text-xs font-black flex items-center justify-center gap-1.5 hover:bg-rose-100 active:scale-95 transition-all border border-rose-200"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>بلّغ على مشكل / تعثر فالطريق</span>
            </button>
          </div>
        </div>
      )}

      {/* POD Modal Component */}
      <PodModal 
        isOpen={isPodOpen}
        onClose={() => setIsPodOpen(false)}
        onConfirm={handlePodConfirm}
        trackingCode={activeMission?.trackingCode || 'NG-2026-088142'}
      />
    </div>
  );
};
