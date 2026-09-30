export type UserRole = 'CLIENT' | 'DRIVER' | 'ADMIN';

export type ShipmentStatus = 
  | 'REGISTERED'     // الطلب تسجل
  | 'CONFIRMED'      // الطلب تأكد
  | 'DRIVER_ASSIGNED'// السائق تعيّن
  | 'PICKED_UP'      // السلعة تستلمات
  | 'IN_TRANSIT'     // فـ الطريق
  | 'ARRIVED_HUB'    // وصلات للمدينة
  | 'OUT_FOR_DELIV'  // خرجت للتوصيل
  | 'DELIVERED'      // تم التوصيل
  | 'FAILED_ATTEMPT';// متعثرة

export interface Shipment {
  id: string;
  trackingCode: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  originCity: string;
  destCity: string;
  address: string;
  deliveryType: 'STANDARD' | 'EXPRESS';
  itemType: string;
  weightKg: number;
  quantity: number;
  codAmount: number;
  status: ShipmentStatus;
  statusText: string;
  driverName?: string;
  driverPhone?: string;
  vehicleInfo?: string;
  createdAt: string;
  timeAgo: string;
  gpsCoords?: {
    lat: number;
    lng: number;
  };
  cargoImage?: string;
  podSignature?: string;
  podImage?: string;
  podNote?: string;
  timelineStep: number; // 1 to 8
}

export interface Claim {
  id: string;
  claimCode: string;
  trackingCode: string;
  issueType: string;
  description: string;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED';
  statusText: string;
  date: string;
  resolutionNote?: string;
}

export interface Vehicle {
  id: string;
  model: string;
  capacityTon: number;
  plateNumber: string;
  driverName: string;
  driverPhone: string;
  route: string;
  status: 'IN_TRANSIT' | 'AVAILABLE_HUB' | 'MAINTENANCE';
  statusText: string;
  loadPercent: number;
  fuelPercent: number;
}
