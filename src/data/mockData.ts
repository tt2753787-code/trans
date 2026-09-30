import { Shipment, Vehicle, Claim } from '../types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-1',
    trackingCode: 'NG-2026-088142',
    senderName: 'شركة أطلس للتجارة',
    senderPhone: '0522001122',
    recipientName: 'أيوب العلمي',
    recipientPhone: '0661998877',
    originCity: 'الدار البيضاء',
    destCity: 'طنجة (وسط المدينة)',
    address: 'شارع فاس، قرب محطة القطار طنجة المدينة',
    deliveryType: 'EXPRESS',
    itemType: 'قطع غيار خفيفة ومعدات صناعية',
    weightKg: 2.3,
    quantity: 1,
    codAmount: 350,
    status: 'IN_TRANSIT',
    statusText: 'فـ الطريق',
    driverName: 'يوسف العمراني',
    driverPhone: '0649600070',
    vehicleInfo: 'Renault Master (#22)',
    createdAt: '2026-09-29T10:00:00Z',
    timeAgo: 'منذ 20 دقيقة',
    timelineStep: 5,
    gpsCoords: {
      lat: 34.0208,
      lng: -6.8416
    }
  },
  {
    id: 'ship-2',
    trackingCode: 'NG-2026-088141',
    senderName: 'مؤسسة النور للإلكترونيات',
    senderPhone: '0537004455',
    recipientName: 'محمد بنجلون',
    recipientPhone: '0670112233',
    originCity: 'الرباط',
    destCity: 'مراكش (جليز)',
    address: 'شارع محمد الخامس، إقامة المنارة، جليز',
    deliveryType: 'STANDARD',
    itemType: 'أجهزة هواتف وملحقات ذكية',
    weightKg: 4.8,
    quantity: 2,
    codAmount: 620,
    status: 'OUT_FOR_DELIV',
    statusText: 'خرجت للتوصيل',
    driverName: 'هشام التازي',
    driverPhone: '0649600070',
    vehicleInfo: 'Volvo FH16 (#08)',
    createdAt: '2026-09-29T08:30:00Z',
    timeAgo: 'منذ 45 دقيقة',
    timelineStep: 7,
    gpsCoords: {
      lat: 31.6295,
      lng: -7.9811
    }
  },
  {
    id: 'ship-3',
    trackingCode: 'NG-2026-088140',
    senderName: 'بوتيك الأناقة كازا',
    senderPhone: '0522334455',
    recipientName: 'سلمى الإدريسي',
    recipientPhone: '0662334455',
    originCity: 'الدار البيضاء (Hub Central)',
    destCity: 'فاس (الدكارات)',
    address: 'تجزئة بدر، رقم 14، حي الدكارات، فاس',
    deliveryType: 'EXPRESS',
    itemType: 'ملابس تقليدية وقفاطين جاهزة',
    weightKg: 1.5,
    quantity: 1,
    codAmount: 890,
    status: 'DELIVERED',
    statusText: 'تم التوصيل',
    driverName: 'عادل السوسي',
    driverPhone: '0649600070',
    vehicleInfo: 'Renault Master (#48)',
    createdAt: '2026-09-29T07:15:00Z',
    timeAgo: 'منذ 3 ساعات',
    timelineStep: 8,
    podNote: 'تم التسليم شخصيا واستلام المبلغ نقدا'
  },
  {
    id: 'ship-4',
    trackingCode: 'NG-2026-088139',
    senderName: 'معمل توب كابلو طنجة',
    senderPhone: '0539112233',
    recipientName: 'كريم الناصري',
    recipientPhone: '0665443322',
    originCity: 'طنجة',
    destCity: 'أكادير (الميناء)',
    address: 'الحي الصناعي أنزا، قرب الميناء التجاري',
    deliveryType: 'STANDARD',
    itemType: 'كابلات وأسلاك كهربائية',
    weightKg: 12.0,
    quantity: 3,
    codAmount: 1450,
    status: 'FAILED_ATTEMPT',
    statusText: 'متعثرة (الزبون غير متاح)',
    driverName: 'طارق بناني',
    driverPhone: '0649600070',
    vehicleInfo: 'Scania R450 (#11)',
    createdAt: '2026-09-29T06:00:00Z',
    timeAgo: 'منذ 5 ساعات',
    timelineStep: 6
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'v-1',
    model: 'Volvo FH16 (14 طن)',
    capacityTon: 14,
    plateNumber: '22-أ-16 (Casa)',
    driverName: 'هشام التازي',
    driverPhone: '0649600070',
    route: 'كازا ➔ طنجة (طريق السيار A1)',
    status: 'IN_TRANSIT',
    statusText: 'فـ مهمة',
    loadPercent: 78,
    fuelPercent: 85
  },
  {
    id: 'v-2',
    model: 'Renault Master (3.5 طن)',
    capacityTon: 3.5,
    plateNumber: '48-ب-06 (Casa)',
    driverName: 'طارق بناني',
    driverPhone: '0649600070',
    route: 'توزيع الدار البيضاء الكبرى وعين السبع',
    status: 'AVAILABLE_HUB',
    statusText: 'متاحة فـ الـ Hub',
    loadPercent: 15,
    fuelPercent: 92
  },
  {
    id: 'v-3',
    model: 'Scania R450 (20 طن)',
    capacityTon: 20,
    plateNumber: '11-د-26 (Casa)',
    driverName: 'عمر القاسمي',
    driverPhone: '0649600070',
    route: 'الخط الجنوبي: كازا ➔ مراكش ➔ أكادير',
    status: 'MAINTENANCE',
    statusText: 'فـ الصيانة الدورية',
    loadPercent: 0,
    fuelPercent: 60
  }
];

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'claim-1',
    claimCode: '#REC-901',
    trackingCode: 'NG-2026-087920',
    issueType: 'الزبون ما كيجاوبش',
    description: 'الشحنة #NG-2026-087920: الزبون فـ مراكش غير متوفر هاد الصباح، تمت المحاولة مرتين.',
    status: 'INVESTIGATING',
    statusText: 'كيتعالج المشكل',
    date: '2026-09-29 11:20',
    resolutionNote: 'تم التواصل عبر واتساب وتمت إعادة الجدولة لغداً في الصباح.'
  },
  {
    id: 'claim-2',
    claimCode: '#REC-898',
    trackingCode: 'NG-2026-087810',
    issueType: 'تأخر فـ التسليم',
    description: 'ازدحام مروري استثنائي على الطريق السريع بين بوزنيقة والمحمدية أخر شاحنة الشحن.',
    status: 'RESOLVED',
    statusText: 'تم الحل بنجاح',
    date: '2026-09-29 09:10',
    resolutionNote: 'تم تسليم الطرد بعد الظهر مع تقديم اعتذار رسمي للزبون.'
  }
];
