export type Badge = 'NEW' | 'BESTSELLER' | null;

export type Category = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  primaryImage: string;
  hoverImage: string;
  badge: Badge;
  visible: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  total: number;
  status: 'NEW' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED';
  notes?: string;
};

export type OrderItem = {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type SiteSettings = {
  logoUrl: string;
  whatsappNumber: string;
  contactEmail: string;
  primaryColor: string;
  secondaryColor: string;
  fontStyle: 'serif' | 'sans';
  homeBanners: string[];
};
