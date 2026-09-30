import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  LayoutDashboard, 
  PackagePlus, 
  Radar, 
  Bike, 
  Truck, 
  AlertTriangle, 
  Warehouse, 
  UserCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLogin: () => void;
  userRole: UserRole;
  userName: string;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onOpenLogin,
  userRole,
  userName,
  isLoggedIn
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'إرسالية جديدة في الطريق', time: 'منذ 5 د', desc: 'الشحنة NG-2026-088142 انطلقت باتجاه طنجة' },
    { id: 2, title: 'تم تسليم بنجاح', time: 'منذ 25 د', desc: 'الشحنة NG-2026-088140 تسلمت بفاس وتم تحصيل 890 د.م.' },
    { id: 3, title: 'تنبيه شكاية', time: 'منذ ساعة', desc: 'تم فتح ملف تعثر #REC-901 بمدينة مراكش' },
  ];

  const roleLabel = userRole === 'ADMIN' ? 'مدير الأسطول' : userRole === 'DRIVER' ? 'سائق شحن' : 'زبون معتمد';

  return (
    <header className="fixed top-0 w-full z-40 bg-[#f8f9fb]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="px-3 pt-2.5 pb-2 flex flex-col gap-2 max-w-4xl mx-auto">
        {/* Top Row: Extended Rectangular Logo Banner + Actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo Banner */}
          <div 
            onClick={() => onTabChange('overview')}
            className="cursor-pointer flex-1 max-w-[270px] sm:max-w-xs h-12 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl px-3 py-1.5 flex items-center gap-2.5 shadow-sm border border-slate-800 transition-transform active:scale-[0.99]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#eab308] flex items-center justify-center shrink-0 shadow-sm">
              <span className="font-chivo font-black text-[#0f172a] text-sm tracking-tighter">NG</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-chivo font-black text-white text-sm sm:text-base leading-none tracking-tight">
                  NEXT GEN
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[#eab308] text-[#0f172a] font-black tracking-wide">
                  LOGISTICS
                </span>
              </div>
              <span className="text-[11px] text-[#eab308] font-bold leading-tight truncate">
                النقل واللوجستيك بالمغرب
              </span>
            </div>
          </div>

          {/* Profile & Notifications */}
          <div className="flex items-center gap-1.5 shrink-0 relative">
            <button 
              aria-label="الإشعارات"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-[#f3f4f6] text-[#404758] hover:text-[#191c1e] hover:bg-[#e7e8ea] transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#b91a24] ring-2 ring-white"></span>
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute top-12 left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 space-y-2 z-50 animate-fade-in text-right">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-800">التنبيهات اللوجستية (3)</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded-lg bg-gray-50 hover:bg-yellow-50/50 transition-colors text-right">
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-bold text-gray-800">{n.title}</span>
                        <span className="text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Profile Button */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-xl bg-[#f3f4f6] hover:bg-[#e7e8ea] transition-colors text-right"
              title={isLoggedIn ? `المستخدم: ${userName}` : 'تسجيل الدخول'}
            >
              <div className="w-8 h-8 rounded-lg bg-[#0f172a] text-[#eab308] border border-[#eab308]/40 flex items-center justify-center font-chivo font-black text-xs shrink-0 shadow-sm">
                NG
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-xs font-bold text-[#191c1e] truncate max-w-[90px]">
                  {userName}
                </span>
                <span className="text-[10px] text-[#785a00] font-semibold">
                  {roleLabel}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Search input bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-10 px-3 bg-white rounded-xl flex items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#d3c5ac]/40">
            <Search className="w-4 h-4 text-[#817660] shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="بحث سريع برقم الإرسالية، العميل أو السائق..."
              className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[#191c1e] placeholder:text-[#817660]"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-[#817660] hover:text-[#191c1e]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-2 bg-[#eab308]/15 rounded-lg border border-[#eab308]/30 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-[#191c1e] font-bold whitespace-nowrap">
              المنصة متصلة
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Scrollbar Tabs */}
      <nav className="overflow-x-auto no-scrollbar bg-white px-3 py-1 shadow-[0_1px_4px_rgba(0,0,0,0.02)] border-t border-[#f3f4f6]">
        <div className="flex items-center gap-1.5 whitespace-nowrap min-w-max px-1 max-w-4xl mx-auto">
          <button 
            onClick={() => onTabChange('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'overview'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>الرئيسية</span>
          </button>

          <button 
            onClick={() => onTabChange('new-order')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'new-order'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>صايب طلب جديد</span>
          </button>

          <button 
            onClick={() => onTabChange('tracking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'tracking'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>تتبع الشحنة</span>
          </button>

          <button 
            onClick={() => onTabChange('driver')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'driver'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>فضاء السائق</span>
          </button>

          <button 
            onClick={() => onTabChange('fleet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'fleet'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>الشاحنات والأسطول</span>
          </button>

          <button 
            onClick={() => onTabChange('claims')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'claims'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>الشكايات والرجوع</span>
          </button>

          <button 
            onClick={() => onTabChange('hub')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
              currentTab === 'hub'
                ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                : 'text-[#4f4633] hover:text-[#191c1e]'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>موقعنا (كازا)</span>
          </button>

          <button 
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#4f4633] hover:text-[#191c1e] transition-all text-xs font-bold"
          >
            <UserCheck className="w-4 h-4" />
            <span>{isLoggedIn ? 'الحساب' : 'تسجيل الدخول'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
