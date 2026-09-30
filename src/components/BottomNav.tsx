import React from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Navigation, 
  AlertCircle, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenLogin: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenLogin
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#d3c5ac]/30">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        <button
          onClick={() => onTabChange('overview')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-all ${
            currentTab === 'overview'
              ? 'text-[#785a00] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[11px] font-bold">الرئيسية</span>
        </button>

        <button
          onClick={() => onTabChange('new-order')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-all ${
            currentTab === 'new-order'
              ? 'text-[#785a00] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[11px] font-bold">الطلبات</span>
        </button>

        <button
          onClick={() => onTabChange('tracking')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-all ${
            currentTab === 'tracking'
              ? 'text-[#785a00] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[11px] font-bold">التتبع</span>
        </button>

        <button
          onClick={() => onTabChange('claims')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-all ${
            currentTab === 'claims'
              ? 'text-[#785a00] font-bold'
              : 'text-[#575e70] hover:text-[#191c1e]'
          }`}
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-[11px] font-bold">الشكايات</span>
        </button>

        <button
          onClick={onOpenLogin}
          className="flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 text-[#575e70] hover:text-[#191c1e] transition-all"
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-bold">الحساب</span>
        </button>
      </div>
    </nav>
  );
};
