import { Category, Product, SiteSettings } from './types';
import { CONTACT } from './site-config';

export const categories: Category[] = [
  { id: 'c1', name: 'Ihram & Clothing', slug: 'ihram-clothing', sortOrder: 1 },
  { id: 'c2', name: 'Prayer Essentials', slug: 'prayer-essentials', sortOrder: 2 },
  { id: 'c3', name: 'Travel Kits', slug: 'travel-kits', sortOrder: 3 }
];

export const products: Product[] = [
  {
    id: 'p1', slug: 'premium-men-ihram-set', name: 'Premium Men Ihram Set',
    description: 'Breathable cotton ihram set designed for comfort during Hajj and Umrah.',
    price: 2499, stock: 40, categoryId: 'c1',
    primaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    badge: 'BESTSELLER', visible: true
  },
  {
    id: 'p2', slug: 'women-modest-travel-abaya', name: 'Women Modest Travel Abaya',
    description: 'Lightweight wrinkle-resistant abaya for peaceful travel and worship.',
    price: 3299, stock: 15, categoryId: 'c1',
    primaryImage: 'https://images.unsplash.com/photo-1611695434369-4411d67c3f5d?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW', visible: true
  },
  {
    id: 'p3', slug: 'digital-tasbeeh-counter', name: 'Digital Tasbeeh Counter',
    description: 'Compact digital tasbeeh counter with soft-touch finish.',
    price: 699, stock: 120, categoryId: 'c2',
    primaryImage: 'https://images.unsplash.com/photo-1509474520651-53cf6a805f45?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?auto=format&fit=crop&w=800&q=80',
    badge: null, visible: true
  },
  {
    id: 'p4', slug: 'zamzam-safe-bottle-kit', name: 'Zamzam Safe Bottle Kit',
    description: 'Secure TSA-friendly bottle set for bringing Zamzam home safely.',
    price: 1199, stock: 8, categoryId: 'c3',
    primaryImage: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1526401485004-2fda9f0a3db2?auto=format&fit=crop&w=800&q=80',
    badge: null, visible: true
  }
];

export const defaultSettings: SiteSettings = {
  logoUrl: '/logo.svg',
  whatsappNumber: CONTACT.whatsappNumber,
  contactEmail: CONTACT.email,
  primaryColor: '#165D54',
  secondaryColor: '#C39A5F',
  fontStyle: 'serif',
  homeBanners: [
    'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=1400&q=80'
  ]
};
