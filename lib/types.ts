export type RestaurantPublic = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverImageUrl: string;
  description: string;
  address: string;
  contactNumber: string;
  currency: string;
  isOpen: boolean;
};

export type CategoryPublic = {
  id: string;
  name: string;
  displayOrder: number;
};

export type MenuItemPublic = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
  isSpecial: boolean;
  displayOrder: number;
};

export type TablePublic = {
  id: string;
  label: string;
  qrCodeUrl: string;
  menuUrl: string;
  qrDataUrl: string;
};

export type ActionState = {
  error?: string;
  success?: string;
};
