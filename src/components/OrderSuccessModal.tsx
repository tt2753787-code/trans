import React from 'react';
import { CheckCircle2, Navigation, MessageCircle, X } from 'lucide-react';
import { Shipment } from '../types';

interface OrderSuccessModalProps {
  shipment: Shipment | null;
  onClose: () => void;
  onTrackNow: (code: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  shipment,
  onClose,
  onTrackNow
}) => {
  if (!shipment) return null;

  const waText = encodeURIComponent(
    `📦 *طلب إرسالية جديدة - NEXT GEN المغرب*\n` +
    `• رقم الشحنة: ${shipment.trackingCode}\n` +
    `• الزبون: ${shipment.recipientName} (${shipment.recipientPhone})\n` +
    `• المسار: من ${shipment.originCity} إلى ${shipment.destCity}\n` +
    `• العنوان: ${shipment.address}\n` +
    `• السلعة: ${shipment.itemType} (${shipment.quantity} طرد - ${shipment.weightKg} كغ)\n` +
    `• مبلغ التحصيل COD: ${shipment.codAmount} د.م.\n` +
    `• الموقع GPS: ${shipment.gpsCoords?.lat ?? '33.57'}, ${shipment.gpsCoords?.lng ?? '-7.58'}\n` +
    `---\n` +
    `سلام NEXT GEN، بغيت نأكد تسجيل هاد الطلب.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 border border-[#d3c5ac]/30 animate-fade-in text-right"
        dir="rtl"
      >
        <div className="w-16 h-16 rounded-full bg-[#eab308]/20 text-[#785a00] mx-auto flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="text-lg font-black text-[#191c1e]">
            الطلب ديالك تسجل وتصيفط بنجاح!
          </h3>
          <p className="text-xs text-[#575e70] font-semibold leading-relaxed">
            تم إرسال إشعار فوري وتفاصيل الطلب إلى WhatsApp الرسمي وقاعدة بيانات Google Sheets.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#f8f9fb] font-chivo text-lg tracking-widest text-[#785a00] font-black border border-[#eab308]/40 text-center">
          {shipment.trackingCode}
        </div>

        {/* WhatsApp direct notification trigger */}
        <a 
          href={`https://wa.me/212649600070?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-xl bg-[#25D366] text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm hover:bg-[#20ba59] active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>إرسال ملخص الطلب إلى WhatsApp</span>
        </a>

        <div className="flex flex-col gap-2 pt-1">
          <button 
            type="button"
            onClick={() => onTrackNow(shipment.trackingCode)}
            className="w-full h-12 rounded-xl bg-[#0f172a] text-white text-xs sm:text-sm font-black shadow-md hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-[#eab308]" />
            <span>تبع الشحنة دابا</span>
          </button>

          <button 
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-xl text-gray-500 hover:text-gray-900 text-xs font-bold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
