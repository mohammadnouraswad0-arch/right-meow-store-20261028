import { and, asc, desc, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, products } from "@/db/schema";
import type { BrandDTO, CategoryDTO, PetType, ProductDTO } from "@/lib/types";

function toProductDTO(row: {
  product: typeof products.$inferSelect;
  categorySlug: string;
  categoryNameAr: string;
  brandName: string | null;
}): ProductDTO {
  const p = row.product;
  return {
    id: p.id,
    slug: p.slug,
    nameAr: p.nameAr,
    nameEn: p.nameEn,
    brandId: p.brandId,
    brandName: row.brandName,
    categoryId: p.categoryId,
    categorySlug: row.categorySlug,
    categoryNameAr: row.categoryNameAr,
    petType: p.petType as PetType,
    description: p.description,
    details: p.details ?? [],
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
    currency: p.currency,
    stock: p.stock,
    weight: p.weight,
    images: p.images ?? [],
    variants: p.variants ?? [],
    rating: p.rating ? Number(p.rating) : null,
    reviewCount: p.reviewCount,
    isBestseller: p.isBestseller,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    isOffer: p.isOffer,
    visible: p.visible,
    createdAt: p.createdAt.toISOString(),
  };
}

export type ProductFilters = {
  petType?: string;
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  search?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "bestseller" | "rating";
  includeHidden?: boolean;
  limit?: number;
};

export async function getProducts(filters: ProductFilters = {}): Promise<ProductDTO[]> {
  const conditions = [] as any[];
  if (!filters.includeHidden) conditions.push(eq(products.visible, true));
  if (filters.petType && filters.petType !== "all") conditions.push(eq(products.petType, filters.petType));
  if (filters.onSale) conditions.push(eq(products.isOffer, true));
  if (filters.inStock) conditions.push(gte(products.stock, 1));
  if (filters.minPrice !== undefined) conditions.push(gte(products.price, String(filters.minPrice)));
  if (filters.maxPrice !== undefined) conditions.push(lte(products.price, String(filters.maxPrice)));
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(or(ilike(products.nameAr, term), ilike(products.nameEn, term), ilike(products.description, term)));
  }

  let categoryIds: number[] | null = null;
  if (filters.categorySlug) {
    const cat = await db.select().from(categories).where(eq(categories.slug, filters.categorySlug));
    categoryIds = cat.map((c) => c.id);
    if (categoryIds.length > 0) conditions.push(inArray(products.categoryId, categoryIds));
    else conditions.push(eq(products.categoryId, -1));
  }

  let brandIds: number[] | null = null;
  if (filters.brandSlug) {
    const b = await db.select().from(brands).where(eq(brands.slug, filters.brandSlug));
    brandIds = b.map((x) => x.id);
    if (brandIds.length > 0 && filters.brandSlug) {
      conditions.push(inArray(products.brandId, brandIds));
    }
  }

  const orderBy =
    filters.sort === "price-asc"
      ? [asc(products.price)]
      : filters.sort === "price-desc"
        ? [desc(products.price)]
        : filters.sort === "bestseller"
          ? [desc(products.isBestseller), desc(products.reviewCount)]
          : filters.sort === "rating"
            ? [desc(products.rating)]
            : [desc(products.createdAt)];

  const query = db
    .select({
      product: products,
      categorySlug: categories.slug,
      categoryNameAr: categories.nameAr,
      brandName: brands.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(...orderBy);

  const rows = filters.limit ? await query.limit(filters.limit) : await query;

  return rows.map((r) =>
    toProductDTO({
      product: r.product,
      categorySlug: r.categorySlug ?? "",
      categoryNameAr: r.categoryNameAr ?? "",
      brandName: r.brandName,
    }),
  );
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const rows = await db
    .select({
      product: products,
      categorySlug: categories.slug,
      categoryNameAr: categories.nameAr,
      brandName: brands.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (rows.length === 0) return null;
  return toProductDTO({
    product: rows[0].product,
    categorySlug: rows[0].categorySlug ?? "",
    categoryNameAr: rows[0].categoryNameAr ?? "",
    brandName: rows[0].brandName,
  });
}

export async function getRelatedProducts(product: ProductDTO, limit = 8): Promise<ProductDTO[]> {
  const all = await getProducts({ categorySlug: product.categorySlug });
  return all.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function getCategories(includeHidden = false): Promise<CategoryDTO[]> {
  const rows = await db
    .select()
    .from(categories)
    .where(includeHidden ? undefined : eq(categories.visible, true))
    .orderBy(asc(categories.sortOrder));
  return rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    nameAr: c.nameAr,
    nameEn: c.nameEn,
    petType: c.petType as PetType,
    description: c.description,
    image: c.image,
    sortOrder: c.sortOrder,
    visible: c.visible,
  }));
}

export async function getBrands(includeHidden = false): Promise<BrandDTO[]> {
  const rows = await db
    .select()
    .from(brands)
    .where(includeHidden ? undefined : eq(brands.visible, true))
    .orderBy(asc(brands.sortOrder));
  return rows.map((b) => ({
    id: b.id,
    slug: b.slug,
    name: b.name,
    description: b.description,
    visible: b.visible,
  }));
}

export async function getProductCountByPetType(): Promise<Record<string, number>> {
  const rows = await db
    .select({ petType: products.petType, count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.visible, true))
    .groupBy(products.petType);
  const out: Record<string, number> = {};
  for (const r of rows) out[r.petType] = Number(r.count);
  return out;
}
