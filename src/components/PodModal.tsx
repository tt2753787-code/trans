import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, Check, RotateCcw, PenTool } from 'lucide-react';

interface PodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signatureData: string, note: string) => void;
  trackingCode: string;
}

export const PodModal: React.FC<PodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  trackingCode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [podNote, setPodNote] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmSubmit = () => {
    const signatureData = canvasRef.current ? canvasRef.current.toDataURL() : '';
    onConfirm(signatureData, podNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-gray-200 space-y-3.5 animate-fade-in text-right"
        dir="rtl"
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-base font-black text-[#191c1e]">
              إثبات التسليم النهائي (POD)
            </h3>
            <span className="text-xs text-[#785a00] font-bold font-chivo">
              {trackingCode}
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Signature Pad */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs text-[#575e70] font-bold flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5 text-[#785a00]" />
              <span>توقيع الزبون الرقمي:</span>
            </label>
            {hasDrawn && (
              <button 
                type="button"
                onClick={clearCanvas}
                className="text-[11px] text-[#b91a24] font-bold flex items-center gap-0.5 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>مسح</span>
              </button>
            )}
          </div>

          <div className="w-full h-28 bg-[#f8f9fb] rounded-xl border border-dashed border-gray-300 relative overflow-hidden">
            <canvas 
              ref={canvasRef}
              width={340}
              height={112}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-xs">
                <span>وقّع هنا بالإصبع أو الفأرة</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-1.5">
          <label className="text-xs text-[#575e70] font-bold block">
            صورة إثبات التسليم عند العميل:
          </label>
          <label className="h-16 rounded-xl bg-[#f8f9fb] border border-dashed border-gray-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
            <Camera className="w-5 h-5 text-[#785a00]" />
            <span className="text-xs text-[#191c1e] font-bold">
              {photoPreview ? 'تم التقاط صورة التسليم ✓' : 'التقط صورة التسليم'}
            </span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              onChange={handlePhotoCapture} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Note */}
        <div>
          <input 
            type="text"
            value={podNote}
            onChange={(e) => setPodNote(e.target.value)}
            placeholder="ملاحظة (مثال: استلمها الحارس، أو الأخ يونس)"
            className="w-full h-11 px-3 rounded-xl bg-[#f3f4f6] text-xs text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#eab308]"
          />
        </div>

        {/* Confirm Button */}
        <button 
          type="button"
          onClick={handleConfirmSubmit}
          className="w-full h-12 rounded-xl bg-[#eab308] text-[#0f172a] text-sm font-black shadow-md hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>تسجيل التسليم بنجاح</span>
        </button>
      </div>
    </div>
  );
};
