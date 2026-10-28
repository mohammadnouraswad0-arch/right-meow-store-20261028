// Development-time utility to detect accidental image reuse across different
// products. Variant images that intentionally belong to the same product are
// not considered duplicates because they are keyed by productId.
export type ImageOwnerRecord = { id: number; nameAr: string; image: string | null };

export type DuplicateImageReport = {
  image: string;
  firstProduct: { id: number; nameAr: string };
  duplicateProduct: { id: number; nameAr: string };
};

export function findDuplicateProductImages(products: ImageOwnerRecord[]): DuplicateImageReport[] {
  const imageOwners = new Map<string, { id: number; nameAr: string }>();
  const duplicates: DuplicateImageReport[] = [];

  for (const product of products) {
    if (!product.image) continue;
    const normalizedImage = product.image.trim();
    const owner = imageOwners.get(normalizedImage);
    if (owner) {
      duplicates.push({
        image: normalizedImage,
        firstProduct: owner,
        duplicateProduct: { id: product.id, nameAr: product.nameAr },
      });
    } else {
      imageOwners.set(normalizedImage, { id: product.id, nameAr: product.nameAr });
    }
  }

  return duplicates;
}
