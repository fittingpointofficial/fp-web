import { categories, defaultSettings, products } from './data';
import { Category, Order, OrderItem, Product, SiteSettings } from './types';

const mem = {
  products: [...products],
  categories: [...categories],
  orders: [] as Order[],
  orderItems: [] as OrderItem[],
  settings: { ...defaultSettings }
};

export const db = {
  products: {
    list: async () => mem.products,
    bySlug: async (slug: string) => mem.products.find((p) => p.slug === slug),
    upsert: async (payload: Product) => {
      const i = mem.products.findIndex((p) => p.id === payload.id);
      if (i >= 0) mem.products[i] = payload;
      else mem.products.push(payload);
      return payload;
    },
    remove: async (id: string) => { mem.products = mem.products.filter((p) => p.id !== id); }
  },
  categories: {
    list: async () => [...mem.categories].sort((a, b) => a.sortOrder - b.sortOrder),
    upsert: async (payload: Category) => {
      const i = mem.categories.findIndex((c) => c.id === payload.id);
      if (i >= 0) mem.categories[i] = payload;
      else mem.categories.push(payload);
      return payload;
    }
  },
  orders: {
    list: async () => mem.orders,
    create: async (order: Order, items: OrderItem[]) => {
      mem.orders.unshift(order);
      mem.orderItems.push(...items);
      return { order, items };
    },
    update: async (id: string, patch: Partial<Order>) => {
      const idx = mem.orders.findIndex((o) => o.id === id);
      if (idx === -1) return null;
      mem.orders[idx] = { ...mem.orders[idx], ...patch };
      return mem.orders[idx];
    }
  },
  settings: {
    get: async (): Promise<SiteSettings> => mem.settings,
    update: async (patch: Partial<SiteSettings>) => {
      mem.settings = { ...mem.settings, ...patch };
      return mem.settings;
    }
  }
};
