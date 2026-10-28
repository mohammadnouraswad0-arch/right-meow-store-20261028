import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import type { OrderItem } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, email, country, city, address, notes, shippingMethod, paymentMethod, items } = body;

    if (!customerName || !phone || !country || !city || !address || !items?.length) {
      return NextResponse.json({ error: "يرجى تعبئة جميع الحقول المطلوبة" }, { status: 400 });
    }

    // Re-validate price & stock against the database (never trust client totals)
    const verifiedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of items as { productId: number; quantity: number; variant?: string }[]) {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId)).limit(1);
      if (!product || !product.visible) {
        return NextResponse.json({ error: `أحد المنتجات لم يعد متوفرًا` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `الكمية المطلوبة من "${product.nameAr}" غير متوفرة في المخزون` }, { status: 400 });
      }
      const price = Number(product.price);
      subtotal += price * item.quantity;
      verifiedItems.push({
        productId: product.id,
        nameAr: product.nameAr,
        image: product.images?.[0]?.url ?? "",
        price,
        quantity: item.quantity,
        variant: item.variant,
      });
    }

    const shippingFee = shippingMethod === "express" ? 25 : subtotal > 200 ? 0 : 15;
    const total = subtotal + shippingFee;

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        phone,
        email: email || null,
        country,
        city,
        address,
        notes: notes || null,
        shippingMethod: shippingMethod || "standard",
        paymentMethod: paymentMethod || "cod",
        subtotal: String(subtotal),
        shippingFee: String(shippingFee),
        total: String(total),
        items: verifiedItems,
      })
      .returning();

    // Decrement stock
    for (const item of verifiedItems) {
      await db
        .update(products)
        .set({ stock: (await db.select().from(products).where(eq(products.id, item.productId)))[0].stock - item.quantity })
        .where(eq(products.id, item.productId));
    }

    return NextResponse.json({ ok: true, orderId: order.id, total });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "تعذر إتمام الطلب، حاول مرة أخرى" }, { status: 500 });
  }
}
