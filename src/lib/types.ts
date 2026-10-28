import type { ProductImage, ProductVariant } from "@/db/schema";

export type PetType = "cats" | "dogs" | "small-pets" | "fish" | "general";

export type ProductDTO = {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  brandId: number | null;
  brandName: string | null;
  categoryId: number;
  categorySlug: string;
  categoryNameAr: string;
  petType: PetType;
  description: string;
  details: string[];
  price: number;
  compareAtPrice: number | null;
  currency: string;
  stock: number;
  weight: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number | null;
  reviewCount: number;
  isBestseller: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isOffer: boolean;
  visible: boolean;
  createdAt: string;
};

export type CategoryDTO = {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  petType: PetType;
  description: string | null;
  image: string | null;
  sortOrder: number;
  visible: boolean;
};

export type BrandDTO = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  visible: boolean;
};
