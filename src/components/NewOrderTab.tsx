import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Camera, 
  UploadCloud, 
  Trash2, 
  CheckCircle2, 
  Crosshair,
  Package, 
  Coins, 
  FileText
} from 'lucide-react';
import { Shipment } from '../types';

interface NewOrderTabProps {
  onOrderCreated: (newShipment: Shipment) => void;
}

export const NewOrderTab: React.FC<NewOrderTabProps> = ({ onOrderCreated }) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [originCity, setOriginCity] = useState('الدار البيضاء (Hub Central)');
  const [destCity, setDestCity] = useState('طنجة');
  const [deliveryType, setDeliveryType] = useState<'STANDARD' | 'EXPRESS'>('EXPRESS');
  const [address, setAddress] = useState('');
  
  // GPS State
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsSuccessText, setGpsSuccessText] = useState('');

  // Cargo Details
  const [itemType, setItemType] = useState('');
  const [weightKg, setWeightKg] = useState<number | ''>(2.5);
  const [quantity, setQuantity] = useState<number>(1);
  const [codAmount, setCodAmount] = useState<number | ''>(350);

  // Cargo Photo State
  const [cargoPreview, setCargoPreview] = useState<string | null>(null);
  const [cargoFileName, setCargoFileName] = useState('');

  // Capture GPS
  const handleCaptureGps = () => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      // Graceful fallback to Casablanca Hub
      const fallbackLat = 33.5731 + Number((Math.random() * 0.005).toFixed(4));
      const fallbackLng = -7.5898 + Number((Math.random() * 0.005).toFixed(4));
      setGpsCoords({ lat: fallbackLat, lng: fallbackLng });
      setGpsSuccessText(`${fallbackLat}° N, ${Math.abs(fallbackLng)}° W (Casablanca Hub)`);
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(5));
        const lng = Number(position.coords.longitude.toFixed(5));
        setGpsCoords({ lat, lng });
        setGpsSuccessText(`${lat}° N, ${Math.abs(lng)}° W`);
        setGpsLoading(false);
      },
      () => {
        // Fallback
        const fallbackLat = 33.5731 + Number((Math.random() * 0.005).toFixed(4));
        const fallbackLng = -7.5898 + Number((Math.random() * 0.005).toFixed(4));
        setGpsCoords({ lat: fallbackLat, lng: fallbackLng });
        setGpsSuccessText(`${fallbackLat}° N, ${Math.abs(fallbackLng)}° W (موقع افتراضي معتمد)`);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Image Upload Handling
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCargoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCargoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCargoImage = () => {
    setCargoPreview(null);
    setCargoFileName('');
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = `NG-2026-${randomSuffix}`;

    const newShipment: Shipment = {
      id: `ship-${Date.now()}`,
      trackingCode,
      senderName: 'المرسل المعتمد (الزبون)',
      senderPhone: '0649600070',
      recipientName,
      recipientPhone,
      originCity,
      destCity,
      address,
      deliveryType,
      itemType: itemType || 'بضائع متنوعة',
      weightKg: Number(weightKg) || 1,
      quantity: Number(quantity) || 1,
      codAmount: Number(codAmount) || 0,
      status: 'CONFIRMED',
      statusText: 'الطلب تأكد',
      driverName: 'يوسف العمراني',
      driverPhone: '0649600070',
      vehicleInfo: 'Renault Master (#22)',
      createdAt: new Date().toISOString(),
      timeAgo: 'الآن',
      timelineStep: 2,
      gpsCoords: gpsCoords || { lat: 33.5731, lng: -7.5898 },
      cargoImage: cargoPreview || undefined
    };

    onOrderCreated(newShipment);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 border border-[#d3c5ac]/30">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-black text-[#191c1e]">
            صايب طلب جديد (Nouvelle Expédition)
          </h2>
          <p className="text-xs text-[#575e70] font-semibold">
            عمر المعلومات ديال الكولية وشارِك اللوكاليزاسيون للتوصيل الفوري
          </p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-[#eab308]/20 text-[#785a00] flex items-center justify-center shrink-0 border border-[#eab308]/30">
          <Package className="w-6 h-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipient Contacts */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#575e70] block mb-1 font-bold">
              الاسم الكامل للزبون / المرسل إليه *
            </label>
            <input 
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="مثال: يوسف التازي أو شركة المنارة"
              className="w-full h-11 px-3 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                رقم الهاتف (نمط 0xxxxxxx) *
              </label>
              <input 
                type="tel"
                required
                dir="ltr"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="0661xxxxxx"
                className="w-full h-11 px-3 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] text-right focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white transition-all font-chivo font-bold"
              />
            </div>

            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                نوع التوصيل
              </label>
              <select 
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value as 'STANDARD' | 'EXPRESS')}
                className="w-full h-11 px-3 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              >
                <option value="EXPRESS">إكسبريس سريع (نفس اليوم / أولوية)</option>
                <option value="STANDARD">عادي (24-48 ساعة)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                مدينة الانطلاق
              </label>
              <select 
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                className="w-full h-11 px-2.5 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              >
                <option value="الدار البيضاء (Hub Central)">الدار البيضاء (Hub Central)</option>
                <option value="الرباط">الرباط</option>
                <option value="طنجة">طنجة</option>
                <option value="مراكش">مراكش</option>
                <option value="فاس">فاس</option>
                <option value="أكادير">أكادير</option>
                <option value="مكناس">مكناس</option>
                <option value="وجدة">وجدة</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                مدينة الوصول
              </label>
              <select 
                value={destCity}
                onChange={(e) => setDestCity(e.target.value)}
                className="w-full h-11 px-2.5 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              >
                <option value="طنجة">طنجة</option>
                <option value="الدار البيضاء">الدار البيضاء</option>
                <option value="مراكش">مراكش</option>
                <option value="الرباط">الرباط</option>
                <option value="فاس">فاس</option>
                <option value="مكناس">مكناس</option>
                <option value="أكادير">أكادير</option>
                <option value="تطوان">تطوان</option>
                <option value="وجدة">وجدة</option>
                <option value="العيون">العيون</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#575e70] block mb-1 font-bold">
              العنوان الكامل بالتفصيل *
            </label>
            <textarea 
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="زنقة، رقم العمارة، الحي، قرب معلمة معروفة..."
              className="w-full p-2.5 rounded-xl bg-[#f3f4f6] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white resize-none transition-all"
            />
          </div>
        </div>

        {/* GPS Localization Section */}
        <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-gray-200/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-[#785a00]" />
              <span className="text-xs sm:text-sm text-[#191c1e] font-bold">
                تحديد الإحداثيات المباشرة (GPS)
              </span>
            </div>
            <button 
              type="button"
              onClick={handleCaptureGps}
              disabled={gpsLoading}
              className="px-3 py-1.5 rounded-lg bg-[#eab308] text-[#0f172a] text-xs font-black flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{gpsLoading ? 'جاري التحديد...' : 'صيفط لوكاليزاسيون ديالي'}</span>
            </button>
          </div>

          {gpsSuccessText && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#dce2f7] text-[#0f172a] text-xs font-bold border border-blue-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>لوكاليزاسيون ديالك تحددات بنجاح: <strong className="font-chivo" dir="ltr">{gpsSuccessText}</strong></span>
            </div>
          )}

          {/* Interactive Map Visualizer */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#575e70] font-semibold block">
              تأكيد نقطة التوصيل على الخريطة:
            </span>
            <div 
              className="w-full h-32 rounded-xl bg-cover bg-center shadow-inner relative flex items-center justify-center overflow-hidden border border-gray-200"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdfqjDc3ENsZvKRjgSoKfnrSFzEVCwsXjzoccTK97yYos2DkmxJuaqeYmnrn1Gihix4msyu3imnYJZWU5_NcZvedi24mGTA0vWfnG303VvA5YdXZNXLjIl1KzwOOYb1DpV4Y-y5Q2Ncaclzjuno0_nwzlwkuH7C5LHwsLkKNaUXLrkwxt0C7Nbc8NsEkLKKL1IToMX3cNA3zDrLx06XnmQWzLceP10RU1OijpWQzsimgwKy3PHSHq08w')`
              }}
            >
              <div className="px-3 py-1.5 rounded-full bg-[#0f172a]/90 text-white text-xs flex items-center gap-1.5 shadow-md backdrop-blur-sm border border-[#eab308]/40">
                <MapPin className="w-3.5 h-3.5 text-[#eab308]" />
                <span className="font-bold">
                  {gpsCoords 
                    ? `إحداثيات محددة: ${gpsCoords.lat}, ${gpsCoords.lng}` 
                    : `نقطة الالتقاط المحددة: ${originCity}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Commodity & Parcel Details */}
        <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-3 border border-gray-200/70">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#785a00]" />
            <span className="text-xs sm:text-sm text-[#191c1e] font-bold">
              معلومات السلعة ومبلغ التحصيل
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                شنو هي السلعة؟ *
              </label>
              <input 
                type="text"
                required
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                placeholder="ملابس، إلكترونيك، أوراق..."
                className="w-full h-10 px-3 rounded-xl bg-white text-xs sm:text-sm text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              />
            </div>

            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                الوزن التقريبي (كغ)
              </label>
              <input 
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="مثال: 3.5"
                className="w-full h-10 px-3 rounded-xl bg-white text-xs sm:text-sm text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] font-chivo font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                عدد الطرود (Colis)
              </label>
              <input 
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full h-10 px-3 rounded-xl bg-white text-xs sm:text-sm text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] font-chivo font-bold"
              />
            </div>

            <div>
              <label className="text-xs text-[#575e70] block mb-1 font-bold">
                مبلغ التحصيل COD (د.م.)
              </label>
              <input 
                type="number"
                value={codAmount}
                onChange={(e) => setCodAmount(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="مثال: 450"
                className="w-full h-10 px-3 rounded-xl bg-white text-xs sm:text-sm text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] font-chivo font-bold"
              />
            </div>
          </div>
        </div>

        {/* Camera & File Upload Section */}
        <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-gray-200/70">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#191c1e] font-bold">
              تصوير وتوثيق السلعة
            </span>
            <span className="text-[11px] text-gray-500 font-semibold">
              اختياري لحماية الشحنة
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <label className="h-20 rounded-xl bg-white border-2 border-dashed border-[#eab308]/70 flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-50/40 transition-colors text-center px-2">
              <Camera className="w-6 h-6 text-[#785a00]" />
              <span className="text-[11px] text-[#191c1e] font-bold mt-1">التقط صورة بالكاميرا</span>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                onChange={handleImageFile}
                className="hidden" 
              />
            </label>

            <label className="h-20 rounded-xl bg-white border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-center px-2">
              <UploadCloud className="w-6 h-6 text-[#575e70]" />
              <span className="text-[11px] text-[#575e70] font-bold mt-1">اختر من الملفات</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageFile}
                className="hidden" 
              />
            </label>
          </div>

          {/* Live Preview Container */}
          {cargoPreview && (
            <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border border-gray-200">
                <img 
                  src={cargoPreview} 
                  alt="معاينة السلعة" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-[#191c1e] block truncate">
                  {cargoFileName || 'تم اختيار صورة السلعة'}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  جاهزة للإرسال مع الطلب
                </span>
              </div>
              <button 
                type="button"
                onClick={removeCargoImage}
                className="w-8 h-8 rounded-lg bg-rose-50 text-[#b91a24] flex items-center justify-center hover:bg-rose-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Order Button */}
        <button 
          type="submit"
          className="w-full h-12 rounded-xl bg-[#eab308] text-[#0f172a] text-sm sm:text-base font-black shadow-md hover:bg-yellow-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span>أكّد الطلب وصيفط لواتساب و Sheets</span>
        </button>
      </form>
    </div>
  );
};
