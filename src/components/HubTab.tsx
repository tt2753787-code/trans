import React from 'react';
import { 
  Warehouse, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const HubTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#191c1e]">
              موقعنا المركزي (Hub Casablanca)
            </h2>
            <p className="text-xs text-[#575e70] font-semibold">
              الدار البيضاء، المملكة المغربية - نقطة التوزيع الوطنية
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-[#eab308] flex items-center justify-center">
            <Warehouse className="w-6 h-6" />
          </div>
        </div>

        {/* Large Static Map Preview Canvas */}
        <div 
          className="w-full h-52 rounded-2xl bg-cover bg-center shadow-inner relative flex items-end p-3 overflow-hidden border border-gray-200"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdfqjDc3ENsZvKRjgSoKfnrSFzEVCwsXjzoccTK97yYos2DkmxJuaqeYmnrn1Gihix4msyu3imnYJZWU5_NcZvedi24mGTA0vWfnG303VvA5YdXZNXLjIl1KzwOOYb1DpV4Y-y5Q2Ncaclzjuno0_nwzlwkuH7C5LHwsLkKNaUXLrkwxt0C7Nbc8NsEkLKKL1IToMX3cNA3zDrLx06XnmQWzLceP10RU1OijpWQzsimgwKy3PHSHq08w')`
          }}
        >
          <div className="bg-[#0f172a]/95 text-white backdrop-blur-md p-3 rounded-xl shadow-lg max-w-sm space-y-1 border border-[#eab308]/40">
            <span className="text-xs font-black block text-[#eab308] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              المقر المركزي الرئيسي NEXT GEN
            </span>
            <span className="text-[11px] text-slate-300 block font-medium">
              المنطقة اللوجستيكية عين السبع، قبالة الطريق السيار، الدار البيضاء
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#191c1e] pt-1">
          <div className="p-3 bg-[#f8f9fb] rounded-xl space-y-1 border border-gray-200/70">
            <div className="flex items-center gap-1.5 text-[#575e70] font-bold">
              <Clock className="w-4 h-4 text-[#785a00]" />
              <span>أوقات العمل والكوليكط</span>
            </div>
            <span className="font-black text-xs block text-gray-900">
              الإثنين - السبت: 08:00 صباحاً - 20:00 مساءً
            </span>
            <span className="text-[10px] text-gray-500 block">
              خدمة الإيداع السريع مفتوحة 24/24 للشركات المتعاقدة
            </span>
          </div>

          <div className="p-3 bg-[#f8f9fb] rounded-xl space-y-1 border border-gray-200/70">
            <div className="flex items-center gap-1.5 text-[#575e70] font-bold">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>الهاتف المباشر والدعم الفوري</span>
            </div>
            <a 
              href="tel:0649600070" 
              className="font-chivo font-black text-sm block text-emerald-700 hover:underline" 
              dir="ltr"
            >
              0649600070
            </a>
            <span className="text-[10px] text-gray-500 block">
              دعم هاتفي وواتساب رسمي مباشر
            </span>
          </div>
        </div>

        {/* Google Maps Button */}
        <a 
          href="https://maps.google.com/?q=Casablanca,Morocco"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-xl bg-[#0f172a] text-[#eab308] text-xs sm:text-sm flex items-center justify-center gap-2 font-black shadow-md hover:bg-slate-800 active:scale-95 transition-all border border-[#eab308]/40"
        >
          <Navigation className="w-4 h-4" />
          <span>فتح موقع الـ Hub فـ خرائط Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
};
