import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  MessageSquareWarning,
  FileCheck
} from 'lucide-react';
import { INITIAL_CLAIMS } from '../data/mockData';
import { Claim } from '../types';

export const ClaimsTab: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [trackCode, setTrackCode] = useState('');
  const [issueType, setIssueType] = useState('تأخر فـ التسليم');
  const [description, setDescription] = useState('');
  const [submittedAlert, setSubmittedAlert] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      claimCode: `#REC-${Math.floor(100 + Math.random() * 900)}`,
      trackingCode: trackCode || 'NG-2026-088142',
      issueType,
      description,
      status: 'INVESTIGATING',
      statusText: 'كيتعالج المشكل',
      date: 'الآن'
    };

    setClaims([newClaim, ...claims]);
    setSubmittedAlert(`تم تسجيل الشكاية بنجاح برقم ${newClaim.claimCode} وتم تحويلها للمسؤول اللوجستي.`);
    setTrackCode('');
    setDescription('');
    setTimeout(() => setSubmittedAlert(null), 5000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 border border-[#d3c5ac]/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#b91a24]">
              الشكايات والرجوع (Réclamations)
            </h2>
            <p className="text-xs text-[#575e70] font-semibold">
              معالجة فورية لحالات التعثر، الطرود المتضررة أو طلبات الروتور
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#b91a24] flex items-center justify-center border border-rose-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {submittedAlert && (
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 border border-emerald-300 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{submittedAlert}</span>
          </div>
        )}

        {/* Claim Submission Form */}
        <form onSubmit={handleSubmit} className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-3 border border-gray-200/70">
          <span className="text-xs sm:text-sm text-[#191c1e] font-black block">
            تسجيل شكاية أو طلب إرجاع كولية:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs text-[#575e70] font-bold block mb-1">
                رقم التتبع (NG-2026-...) *
              </label>
              <input 
                type="text"
                required
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                placeholder="NG-2026-XXXXXX"
                className="w-full h-10 px-3 rounded-xl bg-white text-xs text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] font-chivo font-bold"
              />
            </div>

            <div>
              <label className="text-xs text-[#575e70] font-bold block mb-1">
                نوع الإشكال
              </label>
              <select 
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-10 px-2.5 rounded-xl bg-white text-xs text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308]"
              >
                <option value="تأخر فـ التسليم">تأخر فـ التسليم</option>
                <option value="الزبون ما كيجاوبش">الزبون ما كيجاوبش</option>
                <option value="السلعة متضررة">السلعة متضررة</option>
                <option value="عنوان غالط / تبدل">عنوان غالط / تبدل</option>
                <option value="طلب إرجاع السلعة (Retour)">طلب إرجاع السلعة (Retour)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#575e70] font-bold block mb-1">
              شرح المشكل بالتفصيل *
            </label>
            <textarea 
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب شنو وقع باش نحلو المشكل فـ أقرب وقت ممكن..."
              className="w-full p-2.5 rounded-xl bg-white text-xs text-[#191c1e] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#eab308] resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full h-11 rounded-xl bg-[#b91a24] text-white text-xs sm:text-sm font-black shadow-md hover:bg-rose-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>صيفط الشكاية للمعالجة العاجلة</span>
          </button>
        </form>

        {/* Existing Claims List */}
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-black text-[#191c1e] block">
            شكايات قيد المعالجة المباشرة:
          </span>

          {claims.map(claim => (
            <div 
              key={claim.id}
              className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-1.5 border border-gray-200/70"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-chivo text-xs font-black text-gray-900">
                    {claim.claimCode}
                  </span>
                  <span className="text-[11px] text-gray-500 font-chivo">
                    ({claim.trackingCode})
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    claim.status === 'RESOLVED' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-[#b91a24]'
                  }`}>
                    {claim.statusText}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{claim.date}</span>
              </div>

              <p className="text-xs text-gray-800 leading-snug">
                {claim.description}
              </p>

              {claim.resolutionNote && (
                <div className="mt-1 p-2 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 font-semibold border border-emerald-100">
                  <strong>الإجراء:</strong> {claim.resolutionNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
