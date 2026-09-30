/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewTab } from './components/OverviewTab';
import { NewOrderTab } from './components/NewOrderTab';
import { TrackingTab } from './components/TrackingTab';
import { DriverTab } from './components/DriverTab';
import { FleetTab } from './components/FleetTab';
import { ClaimsTab } from './components/ClaimsTab';
import { HubTab } from './components/HubTab';
import { LoginModal } from './components/LoginModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { SplashScreen } from './components/SplashScreen';
import { INITIAL_SHIPMENTS } from './data/mockData';
import { Shipment, UserRole } from './types';

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('nextgen_shipments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SHIPMENTS;
      }
    }
    return INITIAL_SHIPMENTS;
  });

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [trackingSelectedCode, setTrackingSelectedCode] = useState<string>('NG-2026-088142');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Authentication State
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [userName, setUserName] = useState<string>('مصطفى تقادي');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Success Modal
  const [successModalShipment, setSuccessModalShipment] = useState<Shipment | null>(null);

  // Sync shipments with local storage
  useEffect(() => {
    localStorage.setItem('nextgen_shipments', JSON.stringify(shipments));
  }, [shipments]);

  // Handlers
  const handleTrackShipment = (code: string) => {
    setTrackingSelectedCode(code);
    setCurrentTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCreated = (newShipment: Shipment) => {
    setShipments(prev => [newShipment, ...prev]);
    setSuccessModalShipment(newShipment);
    
    // Celebration effect
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleUpdateShipmentStatus = (id: string, newStatus: any, note?: string) => {
    setShipments(prev => prev.map(s => {
      if (s.id === id) {
        const isDelivered = newStatus === 'DELIVERED';
        const isPickedUp = newStatus === 'PICKED_UP';
        return {
          ...s,
          status: newStatus,
          statusText: isDelivered ? 'تم التوصيل' : isPickedUp ? 'السلعة تستلمات' : s.statusText,
          timelineStep: isDelivered ? 8 : isPickedUp ? 4 : s.timelineStep,
          podNote: note || s.podNote
        };
      }
      return s;
    }));

    if (newStatus === 'DELIVERED') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleLoginSuccess = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
  };

  // KPI Calculations
  const activeOrdersCount = shipments.filter(s => s.status !== 'DELIVERED').length + 138;
  const inTransitCount = shipments.filter(s => s.status === 'IN_TRANSIT').length + 47;
  const deliveredTodayCount = shipments.filter(s => s.status === 'DELIVERED').length + 88;
  const activeClaimsCount = 3;

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] relative selection:bg-[#eab308] selection:text-[#0f172a]" dir="rtl">
      {/* 1. App Launch Splash Screen */}
      <SplashScreen />

      {/* 2. Top Header Navigation */}
      <Header 
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={globalSearchQuery}
        onSearchChange={setGlobalSearchQuery}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        userRole={userRole}
        userName={userName}
        isLoggedIn={isLoggedIn}
      />

      {/* 3. Main Content Workspace */}
      <main className="w-full max-w-4xl mx-auto px-3.5 pt-36 sm:pt-40 pb-28 min-h-screen">
        {currentTab === 'overview' && (
          <OverviewTab 
            shipments={shipments}
            onTrackShipment={handleTrackShipment}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activeOrdersCount={activeOrdersCount}
            inTransitCount={inTransitCount}
            deliveredTodayCount={deliveredTodayCount}
            activeClaimsCount={activeClaimsCount}
            userName={userName}
          />
        )}

        {currentTab === 'new-order' && (
          <NewOrderTab 
            onOrderCreated={handleOrderCreated}
          />
        )}

        {currentTab === 'tracking' && (
          <TrackingTab 
            shipments={shipments}
            initialTrackingCode={trackingSelectedCode}
          />
        )}

        {currentTab === 'driver' && (
          <DriverTab 
            shipments={shipments}
            onUpdateShipmentStatus={handleUpdateShipmentStatus}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'fleet' && (
          <FleetTab />
        )}

        {currentTab === 'claims' && (
          <ClaimsTab />
        )}

        {currentTab === 'hub' && (
          <HubTab />
        )}
      </main>

      {/* 4. Floating WhatsApp Action Button */}
      <WhatsAppFloating />

      {/* 5. Mobile Bottom Tab Navigation */}
      <BottomNav 
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 6. Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={userRole}
      />

      <OrderSuccessModal 
        shipment={successModalShipment}
        onClose={() => setSuccessModalShipment(null)}
        onTrackNow={(code) => {
          setSuccessModalShipment(null);
          handleTrackShipment(code);
        }}
      />
    </div>
  );
}
