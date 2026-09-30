import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  User, 
  Bike, 
  ShieldAlert, 
  MessageCircle 
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, name: string) => void;
  initialRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'CLIENT'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [identifier, setIdentifier] = useState('0649600070');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const displayName = 
        selectedRole === 'ADMIN' ? 'مصطفى تقادي' : 
        selectedRole === 'DRIVER' ? 'يوسف العمراني' : 'زبون معتمد';
      onLoginSuccess(selectedRole, displayName);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 my-auto space-y-4 border border-[#d3c5ac]/30 text-right animate-fade-in"
        dir="rtl"
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo & Header (matches Image 4 & 8) */}
        <div className="flex flex-col items-center text-center pt-1 space-y-2">
          {/* Logo badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f172a] border border-slate-800 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-[#eab308] flex items-center justify-center font-chivo font-black text-[#0f172a] text-xs">
              NG
            </div>
            <div className="flex flex-col text-right">
              <span className="font-chivo text-xs text-white font-black tracking-tight leading-none">
                NEXT GEN
              </span>
              <span className="text-[9px] text-[#eab308] font-bold">
                لوجستيك المغرب
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-[#191c1e]">
              مرحبا بك فـ NEXT GEN
            </h2>
            <p className="text-xs text-[#575e70] font-semibold">
              دخل للحساب ديالك باش تكمل
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-1.5">
          <span className="text-xs text-[#575e70] font-bold block">
            حدد نوع الحساب:
          </span>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f3f4f6] rounded-xl">
            <button 
              type="button"
              onClick={() => setSelectedRole('CLIENT')}
              className={`py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 ${
                selectedRole === 'CLIENT'
                  ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                  : 'text-[#575e70] hover:text-[#191c1e]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>زبون</span>
            </button>

            <button 
              type="button"
              onClick={() => setSelectedRole('DRIVER')}
              className={`py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 ${
                selectedRole === 'DRIVER'
                  ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                  : 'text-[#575e70] hover:text-[#191c1e]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>سائق</span>
            </button>

            <button 
              type="button"
              onClick={() => setSelectedRole('ADMIN')}
              className={`py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 ${
                selectedRole === 'ADMIN'
                  ? 'bg-[#eab308] text-[#0f172a] shadow-sm'
                  : 'text-[#575e70] hover:text-[#191c1e]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>إدارة</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          {/* Email / Phone input */}
          <div className="space-y-1">
            <label className="text-xs text-[#575e70] font-bold block">
              البريد الإلكتروني أو الهاتف
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute right-3.5 text-[#817660] w-4 h-4 pointer-events-none" />
              <input 
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="nom@example.com أو 06XXXXXXXX"
                className="w-full h-11 pr-10 pl-3 rounded-xl bg-[#f3f4f6] text-xs text-[#191c1e] placeholder:text-[#817660] focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white transition-all text-right font-chivo font-bold"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-[#575e70] font-bold block">
                كلمة السر
              </label>
              <a 
                href="https://wa.me/212649600070?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D9%86%D8%B3%D9%8A%D8%AA%20%D9%83%D9%84%D9%85%D8%A9%20%D8%A7%D9%84%D8%B3%D8%B1%20%D8%AF%D9%8A%D8%A7%D9%84%D9%8A%20%D9%81%D9%80%20NEXT%20GEN" 
                target="_blank" 
                rel="noreferrer"
                className="text-[11px] text-[#785a00] hover:underline font-bold"
              >
                نسيت كلمة السر؟
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute right-3.5 text-[#817660] w-4 h-4 pointer-events-none" />
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pr-10 pl-10 rounded-xl bg-[#f3f4f6] text-xs text-[#191c1e] placeholder:text-[#817660] focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:bg-white transition-all text-right font-chivo"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 text-[#817660] hover:text-[#191c1e] flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & secure connection */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#eab308] focus:ring-[#eab308] w-4 h-4 accent-[#eab308]"
              />
              <span className="text-xs text-[#191c1e] font-bold">عقل عليا</span>
            </label>
            <span className="text-[11px] text-[#575e70] font-semibold">اتصال آمن 100%</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-[#eab308] text-[#0f172a] text-sm font-black shadow-md hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-[#0f172a] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>دخول للمنصة</span>
              </>
            )}
          </button>
        </form>

        {/* WhatsApp Help CTA (matches Image 4 & 8) */}
        <div className="pt-2 border-t border-gray-100 text-center space-y-2">
          <div className="text-xs text-[#575e70] font-semibold">ما عندكش حساب؟</div>
          <a 
            href="https://wa.me/212649600070?text=%D8%B3%D9%84%D8%A7%D9%85%20NEXT%20GEN%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D9%81%D8%AA%D8%AD%20%D8%AD%D8%B3%D8%A7%D8%A8%20%D8%AC%D8%AF%D9%8A%D8%AF%20%D9%81%D9%80%20%D8%A7%D9%84%D9%85%D9%86%D8%B5%D8%A9."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#20ba59] text-xs font-black transition-all border border-[#25D366]/30"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366]" />
            <span>تواصل مع الإدارة عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
};
