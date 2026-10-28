import "dotenv/config";
import { db, pool } from "@/db";
import { brands, categories, products, storeSettings } from "@/db/schema";
import type { ProductImage } from "@/db/schema";

function img(url: string, alt: string, source: ProductImage["source"] = "stock"): ProductImage {
  return { url, alt, verified: true, source };
}

async function main() {
  console.log("Seeding Right Meow database...");

  await db.delete(products);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(storeSettings);

  // ---------------- Categories ----------------
  const categoryRows = await db
    .insert(categories)
    .values([
      {
        slug: "cats",
        nameAr: "القطط",
        nameEn: "Cats",
        petType: "cats",
        description: "كل ما تحتاجه قطتك من طعام وألعاب ومستلزمات عناية",
        image: "https://images.pexels.com/photos/31831037/pexels-photo-31831037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
        sortOrder: 1,
      },
      {
        slug: "dogs",
        nameAr: "الكلاب",
        nameEn: "Dogs",
        petType: "dogs",
        description: "مستلزمات متكاملة لكلبك من الطعام إلى التدريب والنزهات",
        image: "https://images.pexels.com/photos/9248865/pexels-photo-9248865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
        sortOrder: 2,
      },
      {
        slug: "small-pets",
        nameAr: "الحيوانات الصغيرة",
        nameEn: "Small Pets",
        petType: "small-pets",
        description: "طعام ومساكن ومستلزمات للأرانب وخنازير غينيا",
        image: "https://images.pexels.com/photos/13805714/pexels-photo-13805714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
        sortOrder: 3,
      },
      {
        slug: "fish",
        nameAr: "الأسماك",
        nameEn: "Fish",
        petType: "fish",
        description: "أحواض ومعدات وديكورات لعالم مائي متكامل",
        image: "https://images.pexels.com/photos/15330135/pexels-photo-15330135.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900",
        sortOrder: 4,
      },
      // sub categories
      { slug: "cat-food", nameAr: "طعام القطط", nameEn: "Cat Food", petType: "cats", sortOrder: 10, image: null },
      { slug: "cat-litter", nameAr: "الرمل وصناديق الفضلات", nameEn: "Litter", petType: "cats", sortOrder: 11, image: null },
      { slug: "cat-toys", nameAr: "ألعاب القطط", nameEn: "Cat Toys", petType: "cats", sortOrder: 12, image: null },
      { slug: "cat-furniture", nameAr: "أعمدة الخدش والأثاث", nameEn: "Cat Furniture", petType: "cats", sortOrder: 13, image: null },
      { slug: "cat-beds", nameAr: "الأسرة ومستلزمات الراحة", nameEn: "Cat Beds", petType: "cats", sortOrder: 14, image: null },
      { slug: "dog-food", nameAr: "طعام الكلاب", nameEn: "Dog Food", petType: "dogs", sortOrder: 20, image: null },
      { slug: "dog-training", nameAr: "التدريب والمكافآت", nameEn: "Training & Treats", petType: "dogs", sortOrder: 21, image: null },
      { slug: "dog-walking", nameAr: "الأطواق والمقاود والأحزمة", nameEn: "Collars & Leashes", petType: "dogs", sortOrder: 22, image: null },
      { slug: "dog-toys", nameAr: "ألعاب الكلاب", nameEn: "Dog Toys", petType: "dogs", sortOrder: 23, image: null },
      { slug: "dog-beds", nameAr: "الأسرة والراحة", nameEn: "Dog Beds", petType: "dogs", sortOrder: 24, image: null },
      { slug: "dog-apparel", nameAr: "الملابس والإكسسوارات", nameEn: "Apparel", petType: "dogs", sortOrder: 25, image: null },
      { slug: "small-pet-food", nameAr: "طعام الحيوانات الصغيرة", nameEn: "Small Pet Food", petType: "small-pets", sortOrder: 30, image: null },
      { slug: "small-pet-housing", nameAr: "الأقفاص ومستلزمات السكن", nameEn: "Housing", petType: "small-pets", sortOrder: 31, image: null },
      { slug: "fish-tanks", nameAr: "أحواض الأسماك", nameEn: "Tanks", petType: "fish", sortOrder: 40, image: null },
      { slug: "fish-equipment", nameAr: "الفلاتر والإضاءة", nameEn: "Equipment", petType: "fish", sortOrder: 41, image: null },
      { slug: "fish-decor", nameAr: "الزينة والديكور", nameEn: "Decor", petType: "fish", sortOrder: 42, image: null },
      { slug: "pet-care", nameAr: "العناية والإكسسوارات", nameEn: "Care & Accessories", petType: "general", sortOrder: 50, image: null },
    ])
    .returning();

  const cat = (slug: string) => categoryRows.find((c) => c.slug === slug)!.id;

  // ---------------- Brands (store-owned product lines) ----------------
  const brandRows = await db
    .insert(brands)
    .values([
      { slug: "right-meow-kitchen", name: "Right Meow Kitchen", description: "خط الأطعمة الخاص بمتجرنا", sortOrder: 1 },
      { slug: "yarr-play", name: "Yarr Play", description: "خط الألعاب والترفيه", sortOrder: 2 },
      { slug: "right-meow-care", name: "Right Meow Care", description: "خط العناية والصحة", sortOrder: 3 },
      { slug: "yarr-aqua", name: "Yarr Aqua", description: "خط مستلزمات الأسماك والأحواض", sortOrder: 4 },
      { slug: "right-meow-comfort", name: "Right Meow Comfort", description: "خط الراحة والأثاث", sortOrder: 5 },
      { slug: "yarr-outdoors", name: "Yarr Outdoors", description: "خط النزهات والسفر", sortOrder: 6 },
    ])
    .returning();

  const brand = (slug: string) => brandRows.find((b) => b.slug === slug)!.id;

  const now = Date.now();
  const daysAgo = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000);

  // ---------------- Products ----------------
  await db.insert(products).values([
    // CATS
    {
      slug: "cat-dry-food-chicken-1-5kg",
      nameAr: "طعام القطط الجاف بالدجاج 1.5كغ",
      nameEn: "Dry Cat Food – Chicken Recipe 1.5kg",
      brandId: brand("right-meow-kitchen"),
      categoryId: cat("cat-food"),
      petType: "cats",
      description: "طعام جاف متكامل الفيتامينات لقطتك البالغة بنكهة الدجاج الطبيعي، يدعم صحة الفراء والهضم.",
      details: ["مكون أساسي: الدجاج الطبيعي", "مدعم بالفيتامينات والمعادن", "مناسب للقطط البالغة", "عبوة 1.5 كغ"],
      price: "89", compareAtPrice: "109", stock: 42, weight: "1.5 كغ",
      images: [img("/images/products/cat-dry-food.jpg", "عبوة طعام القطط الجاف بنكهة الدجاج من Right Meow", "generated")],
      rating: "4.7", reviewCount: 58, isBestseller: true, isOffer: true, isFeatured: false,
      createdAt: daysAgo(40),
    },
    {
      slug: "cat-clumping-litter-10kg",
      nameAr: "رمل القطط المتكتل الفاخر 10كغ",
      nameEn: "Premium Clumping Cat Litter 10kg",
      brandId: brand("right-meow-care"),
      categoryId: cat("cat-litter"),
      petType: "cats",
      description: "رمل متكتل عالي الامتصاص يحتجز الروائح بفعالية، سهل التنظيف ولطيف على أقدام القطط.",
      details: ["تكتل سريع وقوي", "احتجاز فائق للرائحة", "غبار منخفض", "عبوة 10 كغ"],
      price: "45", compareAtPrice: null, stock: 60, weight: "10 كغ",
      images: [img("/images/products/cat-litter.jpg", "كيس رمل القطط المتكتل من Right Meow", "generated")],
      rating: "4.5", reviewCount: 31, isBestseller: false, isOffer: false,
      createdAt: daysAgo(55),
    },
    {
      slug: "cat-open-litter-box",
      nameAr: "صندوق فضلات القطط المفتوح",
      nameEn: "Open Cat Litter Box",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("cat-litter"),
      petType: "cats",
      description: "صندوق فضلات بتصميم مفتوح سهل الدخول، خفيف الوزن وسهل التنظيف اليومي.",
      details: ["تصميم مفتوح منخفض الحواف", "سهل التفريغ والتنظيف", "بلاستيك متين خالٍ من الروائح"],
      price: "65", compareAtPrice: null, stock: 25, weight: null,
      images: [img("/images/products/cat-litter-box.jpg", "صندوق فضلات القطط المفتوح", "generated")],
      rating: "4.3", reviewCount: 14, isBestseller: false, isOffer: false,
      createdAt: daysAgo(20),
    },
    {
      slug: "cat-scratching-post-tower",
      nameAr: "عمود خدش القطط ثلاثي المستويات",
      nameEn: "3-Level Cat Scratching Post Tower",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("cat-furniture"),
      petType: "cats",
      description: "عمود خدش متعدد المستويات ملفوف بحبال السيزال الطبيعية، يمنح قطتك مساحة للتسلق والخدش والراحة.",
      details: ["حبال سيزال طبيعية مقاومة للتلف", "منصات علوية مبطنة للراحة", "قاعدة ثابتة وآمنة", "لعبة كرة معلقة"],
      price: "229", compareAtPrice: null, stock: 15, weight: null,
      images: [img("/images/products/cat-scratching-post.jpg", "عمود خدش القطط ثلاثي المستويات", "generated")],
      rating: "4.8", reviewCount: 22, isNew: true, isFeatured: true,
      createdAt: daysAgo(6),
    },
    {
      slug: "cat-feather-wand-toy",
      nameAr: "لعبة القطط عصا الريش التفاعلية",
      nameEn: "Interactive Cat Feather Wand Toy",
      brandId: brand("yarr-play"),
      categoryId: cat("cat-toys"),
      petType: "cats",
      description: "لعبة تفاعلية بعصا طويلة وريش ملون تحفز غريزة الصيد لدى قطتك وتمنحها نشاطًا يوميًا ممتعًا.",
      details: ["عصا خفيفة سهلة الإمساك", "ريش طبيعي آمن", "تحفز الحركة واللعب التفاعلي"],
      price: "29", compareAtPrice: null, stock: 80, weight: null,
      images: [img("https://images.pexels.com/photos/10914514/pexels-photo-10914514.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "قطة تلعب بلعبة عصا الريش التفاعلية", "stock")],
      rating: "4.6", reviewCount: 47, isBestseller: true,
      createdAt: daysAgo(70),
    },
    {
      slug: "cat-round-plush-bed",
      nameAr: "سرير القطط الدائري المخملي",
      nameEn: "Round Plush Cat Bed",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("cat-beds"),
      petType: "cats",
      description: "سرير دائري ناعم ودافئ يمنح قطتك مكانًا هادئًا للنوم والاسترخاء طوال اليوم.",
      details: ["حشوة ناعمة وداعمة", "قاعدة مانعة للانزلاق", "قابل للغسل"],
      price: "99", compareAtPrice: null, stock: 33, weight: null,
      images: [img("https://images.pexels.com/photos/15011316/pexels-photo-15011316.png?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "قطة ترتاح داخل سريرها المخملي الدائري", "stock")],
      rating: "4.4", reviewCount: 19,
      createdAt: daysAgo(12),
    },

    // DOGS
    {
      slug: "dog-dry-food-beef-3kg",
      nameAr: "طعام الكلاب الجاف باللحم 3كغ",
      nameEn: "Dry Dog Food – Beef Recipe 3kg",
      brandId: brand("right-meow-kitchen"),
      categoryId: cat("dog-food"),
      petType: "dogs",
      description: "وجبة متكاملة العناصر الغذائية بنكهة اللحم البقري لدعم طاقة وصحة كلبك البالغ.",
      details: ["مصدر بروتين أساسي: اللحم البقري", "يدعم صحة المفاصل والفراء", "عبوة 3 كغ"],
      price: "139", compareAtPrice: "159", stock: 37, weight: "3 كغ",
      images: [img("/images/products/dog-dry-food.jpg", "عبوة طعام الكلاب الجاف بنكهة اللحم من Right Meow", "generated")],
      rating: "4.7", reviewCount: 64, isBestseller: true, isOffer: true,
      createdAt: daysAgo(48),
    },
    {
      slug: "dog-training-treats-chicken",
      nameAr: "مكافآت تدريب الكلاب بالدجاج",
      nameEn: "Chicken Dog Training Treats",
      brandId: brand("right-meow-kitchen"),
      categoryId: cat("dog-training"),
      petType: "dogs",
      description: "قطع صغيرة لذيذة ومناسبة لجلسات التدريب، تساعد على تحفيز وتشجيع كلبك أثناء التعلم.",
      details: ["قطع صغيرة مناسبة للتدريب المتكرر", "نكهة دجاج طبيعية", "خالية من الحشو الصناعي"],
      price: "35", compareAtPrice: null, stock: 90, weight: "250 جم",
      images: [img("/images/products/dog-training-treats.jpg", "عبوة مكافآت تدريب الكلاب من Right Meow", "generated")],
      rating: "4.6", reviewCount: 28, isNew: true,
      createdAt: daysAgo(5),
    },
    {
      slug: "dog-leather-collar-classic",
      nameAr: "طوق الكلاب الجلدي الكلاسيكي",
      nameEn: "Classic Leather Dog Collar",
      brandId: brand("yarr-outdoors"),
      categoryId: cat("dog-walking"),
      petType: "dogs",
      description: "طوق أنيق مصنوع من الجلد المتين مع إبزيم قابل للتعديل ليلائم مقاس رقبة كلبك بأمان وراحة.",
      details: ["جلد متين عالي الجودة", "إبزيم معدني قابل للتعديل", "متوفر بأكثر من مقاس"],
      price: "49", compareAtPrice: null, stock: 55, weight: null,
      images: [img("https://images.pexels.com/photos/16254908/pexels-photo-16254908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب يرتدي الطوق الجلدي الكلاسيكي", "stock")],
      rating: "4.5", reviewCount: 36,
      createdAt: daysAgo(33),
    },
    {
      slug: "dog-comfort-harness",
      nameAr: "حزام صدر مريح للكلاب",
      nameEn: "Comfort Dog Harness",
      brandId: brand("yarr-outdoors"),
      categoryId: cat("dog-walking"),
      petType: "dogs",
      description: "حزام صدر موزع الضغط بتصميم مريح يمنع خنق الرقبة أثناء المشي والنزهات الطويلة.",
      details: ["توزيع ضغط آمن على الصدر لا الرقبة", "حشوة ناعمة مبطنة", "حلقة تثبيت مقود مقواة"],
      price: "79", compareAtPrice: null, stock: 48, weight: null,
      images: [img("https://images.pexels.com/photos/12002618/pexels-photo-12002618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب يرتدي حزام الصدر أثناء النزهة", "stock")],
      rating: "4.8", reviewCount: 52, isBestseller: true, isFeatured: true,
      createdAt: daysAgo(60),
    },
    {
      slug: "dog-rubber-chew-toy",
      nameAr: "لعبة مضغ مطاطية للكلاب",
      nameEn: "Durable Rubber Chew Toy",
      brandId: brand("yarr-play"),
      categoryId: cat("dog-toys"),
      petType: "dogs",
      description: "لعبة مضغ متينة من المطاط الآمن تساعد على تسلية كلبك والعناية بصحة أسنانه.",
      details: ["مطاط آمن وخالٍ من المواد الضارة", "يقاوم المضغ القوي", "يساعد على تنظيف الأسنان أثناء اللعب"],
      price: "32", compareAtPrice: null, stock: 75, weight: null,
      images: [img("https://images.pexels.com/photos/32070608/pexels-photo-32070608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب يحمل لعبة المضغ المطاطية", "stock")],
      rating: "4.4", reviewCount: 21,
      createdAt: daysAgo(15),
    },
    {
      slug: "dog-large-comfort-bed",
      nameAr: "سرير الكلاب الكبير المريح",
      nameEn: "Large Comfort Dog Bed",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("dog-beds"),
      petType: "dogs",
      description: "سرير واسع بحشوة سميكة يدعم مفاصل كلبك ويمنحه راحة تامة أثناء النوم.",
      details: ["حشوة سميكة داعمة للمفاصل", "قماش متين قابل للغسل", "قاعدة مانعة للانزلاق"],
      price: "189", compareAtPrice: null, stock: 20, weight: null,
      images: [img("https://images.pexels.com/photos/39849167/pexels-photo-39849167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب نائم في سريره المريح", "stock")],
      rating: "4.6", reviewCount: 17,
      createdAt: daysAgo(10),
    },
    {
      slug: "dog-winter-coat",
      nameAr: "معطف شتوي دافئ للكلاب",
      nameEn: "Warm Winter Dog Coat",
      brandId: brand("yarr-outdoors"),
      categoryId: cat("dog-apparel"),
      petType: "dogs",
      description: "معطف دافئ يحمي كلبك من برودة الطقس أثناء نزهاته الشتوية، بتصميم عملي وسهل اللبس.",
      details: ["بطانة داخلية دافئة", "إغلاق سهل بسحاب/فيلكرو", "مقاوم للماء بدرجة خفيفة"],
      price: "99", compareAtPrice: null, stock: 28, weight: null,
      images: [img("https://images.pexels.com/photos/9382440/pexels-photo-9382440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب يرتدي المعطف الشتوي الدافئ", "stock")],
      rating: "4.5", reviewCount: 12, isNew: true,
      createdAt: daysAgo(4),
    },
    {
      slug: "dog-steel-bowl",
      nameAr: "وعاء طعام الكلاب الفولاذي",
      nameEn: "Stainless Steel Dog Bowl",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("dog-food"),
      petType: "dogs",
      description: "وعاء فولاذي متين وسهل التنظيف لتقديم الطعام والماء لكلبك يوميًا.",
      details: ["فولاذ مقاوم للصدأ", "قاعدة مطاطية مانعة للانزلاق", "سهل التعقيم والتنظيف"],
      price: "39", compareAtPrice: null, stock: 66, weight: null,
      images: [img("https://images.pexels.com/photos/13581209/pexels-photo-13581209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "كلب بجانب وعاء الطعام الفولاذي", "stock")],
      rating: "4.3", reviewCount: 9,
      createdAt: daysAgo(25),
    },
    {
      slug: "dog-adjustable-leash",
      nameAr: "مقود نزهة للكلاب قابل للتعديل",
      nameEn: "Adjustable Dog Walking Leash",
      brandId: brand("yarr-outdoors"),
      categoryId: cat("dog-walking"),
      petType: "dogs",
      description: "مقود متين وقابل للتعديل الطول، مثالي للنزهات اليومية مع قبضة مريحة لليد.",
      details: ["طول قابل للتعديل", "قبضة مبطنة مريحة", "حلقة تثبيت معدنية قوية"],
      price: "55", compareAtPrice: "70", stock: 40, weight: null,
      images: [img("https://images.pexels.com/photos/4085432/pexels-photo-4085432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "شخص يمشي كلبه باستخدام المقود", "stock")],
      rating: "4.5", reviewCount: 25, isOffer: true,
      createdAt: daysAgo(18),
    },

    // GENERAL CARE
    {
      slug: "pet-gentle-shampoo",
      nameAr: "شامبو طبيعي لطيف للحيوانات الأليفة",
      nameEn: "Gentle Natural Pet Shampoo",
      brandId: brand("right-meow-care"),
      categoryId: cat("pet-care"),
      petType: "general",
      description: "شامبو لطيف على البشرة بتركيبة طبيعية مناسبة للقطط والكلاب، ينظف الفراء ويحافظ على نعومته.",
      details: ["تركيبة لطيفة خالية من القسوة", "مناسب للقطط والكلاب", "رائحة منعشة تدوم"],
      price: "42", compareAtPrice: null, stock: 58, weight: "300 مل",
      images: [img("/images/products/pet-shampoo.jpg", "عبوة شامبو الحيوانات الأليفة من Right Meow", "generated")],
      rating: "4.5", reviewCount: 30,
      createdAt: daysAgo(22),
    },
    {
      slug: "pet-dental-care-set",
      nameAr: "طقم فرشاة ومعجون أسنان للحيوانات",
      nameEn: "Pet Toothbrush & Toothpaste Set",
      brandId: brand("right-meow-care"),
      categoryId: cat("pet-care"),
      petType: "general",
      description: "طقم عناية بالأسنان يشمل فرشاة مزدوجة الرأس ومعجون آمن للحيوانات، للحفاظ على صحة فم حيوانك الأليف.",
      details: ["فرشاة مزدوجة الرأس مريحة", "معجون آمن عند البلع", "مناسب للاستخدام الأسبوعي"],
      price: "38", compareAtPrice: null, stock: 44, weight: null,
      images: [img("/images/products/pet-toothbrush-set.jpg", "طقم فرشاة ومعجون أسنان للحيوانات الأليفة", "generated")],
      rating: "4.4", reviewCount: 16, isNew: true,
      createdAt: daysAgo(3),
    },
    {
      slug: "pet-travel-carrier",
      nameAr: "حقيبة نقل الحيوانات الأليفة",
      nameEn: "Soft-Sided Pet Travel Carrier",
      brandId: brand("yarr-outdoors"),
      categoryId: cat("pet-care"),
      petType: "general",
      description: "حقيبة نقل مريحة وجيدة التهوية تناسب القطط والكلاب الصغيرة أثناء السفر وزيارات العيادة.",
      details: ["تهوية ممتازة عبر شبكات جانبية", "حزام كتف قابل للتعديل", "قاعدة مبطنة مريحة"],
      price: "149", compareAtPrice: null, stock: 19, weight: null,
      images: [img("/images/products/pet-carrier.jpg", "حقيبة نقل الحيوانات الأليفة", "generated")],
      rating: "4.6", reviewCount: 23, isBestseller: true, isFeatured: true,
      createdAt: daysAgo(8),
    },

    // SMALL PETS
    {
      slug: "rabbit-dried-veg-food",
      nameAr: "طعام الأرانب بالخضروات المجففة",
      nameEn: "Rabbit Food with Dried Vegetables",
      brandId: brand("right-meow-kitchen"),
      categoryId: cat("small-pet-food"),
      petType: "small-pets",
      description: "خليط متوازن من الحبوب والخضروات المجففة يلبي الاحتياجات الغذائية اليومية للأرانب.",
      details: ["غني بالألياف الطبيعية", "خضروات مجففة متنوعة", "يدعم صحة الجهاز الهضمي"],
      price: "36", compareAtPrice: null, stock: 34, weight: "1 كغ",
      images: [img("https://images.pexels.com/photos/7408291/pexels-photo-7408291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "أرنب يتناول طعامه", "stock")],
      rating: "4.3", reviewCount: 11,
      createdAt: daysAgo(14),
    },
    {
      slug: "rabbit-safe-hutch",
      nameAr: "قفص تنقل الأرانب الآمن",
      nameEn: "Secure Rabbit Hutch",
      brandId: brand("right-meow-comfort"),
      categoryId: cat("small-pet-housing"),
      petType: "small-pets",
      description: "قفص متين وجيد التهوية يوفر مساحة آمنة ومريحة لأرنبك داخل المنزل.",
      details: ["هيكل متين وآمن", "تهوية جيدة من جميع الجوانب", "سهل التنظيف"],
      price: "175", compareAtPrice: null, stock: 12, weight: null,
      images: [img("https://images.pexels.com/photos/36587617/pexels-photo-36587617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "أرنب داخل قفصه الآمن", "stock")],
      rating: "4.5", reviewCount: 8, isNew: true,
      createdAt: daysAgo(2),
    },
    {
      slug: "guinea-pig-vitamin-c-food",
      nameAr: "طعام خنازير غينيا الغني بفيتامين C",
      nameEn: "Guinea Pig Food Rich in Vitamin C",
      brandId: brand("right-meow-kitchen"),
      categoryId: cat("small-pet-food"),
      petType: "small-pets",
      description: "تركيبة غذائية مدعمة بفيتامين C لدعم صحة خنازير غينيا التي تحتاج هذا الفيتامين يوميًا.",
      details: ["مدعم بفيتامين C", "حبيبات مناسبة لفم خنازير غينيا", "يحافظ على الوزن الصحي"],
      price: "33", compareAtPrice: null, stock: 29, weight: "900 جم",
      images: [img("https://images.pexels.com/photos/20768909/pexels-photo-20768909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "خنزير غينيا يتناول طعامه", "stock")],
      rating: "4.2", reviewCount: 6,
      createdAt: daysAgo(28),
    },

    // FISH
    {
      slug: "aquarium-starter-tank-40l",
      nameAr: "حوض أسماك زجاجي متكامل 40 لتر",
      nameEn: "Complete Glass Aquarium Starter Kit 40L",
      brandId: brand("yarr-aqua"),
      categoryId: cat("fish-tanks"),
      petType: "fish",
      description: "حوض زجاجي بسعة 40 لترًا مناسب لأسماك الزينة، بتصميم شفاف يعرض عالمك المائي بوضوح.",
      details: ["زجاج شفاف عالي الجودة", "سعة 40 لتر", "مناسب للمبتدئين"],
      price: "349", compareAtPrice: null, stock: 10, weight: null,
      images: [img("https://images.pexels.com/photos/18435522/pexels-photo-18435522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "حوض أسماك زجاجي بأسماك ملونة", "stock")],
      rating: "4.7", reviewCount: 15, isBestseller: true, isFeatured: true,
      createdAt: daysAgo(35),
    },
    {
      slug: "aquarium-internal-filter",
      nameAr: "فلتر داخلي لحوض الأسماك",
      nameEn: "Internal Aquarium Filter",
      brandId: brand("yarr-aqua"),
      categoryId: cat("fish-equipment"),
      petType: "fish",
      description: "فلتر داخلي فعال يحافظ على نظافة المياه ويوفر بيئة صحية لأسماكك.",
      details: ["تنقية فعالة للمياه", "تشغيل هادئ", "سهل التركيب والصيانة"],
      price: "89", compareAtPrice: null, stock: 22, weight: null,
      images: [img("/images/products/aquarium-filter.jpg", "فلتر داخلي لحوض الأسماك", "generated")],
      rating: "4.4", reviewCount: 10,
      createdAt: daysAgo(17),
    },
    {
      slug: "aquarium-decor-plants",
      nameAr: "ديكور ونباتات صناعية لحوض السمك",
      nameEn: "Aquarium Decoration & Artificial Plants",
      brandId: brand("yarr-aqua"),
      categoryId: cat("fish-decor"),
      petType: "fish",
      description: "مجموعة نباتات وديكورات صناعية آمنة تضفي منظرًا طبيعيًا جذابًا على حوض أسماكك.",
      details: ["آمنة على الأسماك", "ألوان ثابتة لا تبهت", "سهلة التركيب"],
      price: "55", compareAtPrice: "70", stock: 31, weight: null,
      images: [img("https://images.pexels.com/photos/37796017/pexels-photo-37796017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "حوض أسماك مزين بنباتات وديكورات ملونة", "stock")],
      rating: "4.3", reviewCount: 7, isOffer: true,
      createdAt: daysAgo(19),
    },
    {
      slug: "aquarium-led-light",
      nameAr: "إضاءة LED لحوض السمك",
      nameEn: "Aquarium LED Light",
      brandId: brand("yarr-aqua"),
      categoryId: cat("fish-equipment"),
      petType: "fish",
      description: "إضاءة LED موفرة للطاقة تبرز ألوان الأسماك والنباتات داخل الحوض بشكل جذاب.",
      details: ["استهلاك منخفض للطاقة", "إضاءة متوازنة تدعم نمو النباتات المائية", "تركيب سهل أعلى الحوض"],
      price: "119", compareAtPrice: null, stock: 18, weight: null,
      images: [img("https://images.pexels.com/photos/10539286/pexels-photo-10539286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900", "حوض أسماك مضاء بإضاءة LED", "stock")],
      rating: "4.5", reviewCount: 9, isNew: true,
      createdAt: daysAgo(1),
    },
  ]);

  // ---------------- Store Settings ----------------
  await db.insert(storeSettings).values([
    {
      key: "general",
      value: {
        storeNameAr: "Right Meow",
        tagline: "by Yarr",
        descriptionAr: "متجر Right Meow لمستلزمات الحيوانات الأليفة",
        currency: "SAR",
        country: "",
        email: "",
        phone: "",
        address: "",
        instagram: "",
        twitter: "",
        announcementAr: "كل ما يحبه حيوانك الأليف في مكان واحد",
        heroHeadlineAr: "كل ما يحبه صديقك الأليف",
        heroDescriptionAr: "اكتشف مجموعة مختارة من مستلزمات الحيوانات الأليفة، من الطعام والمكافآت إلى الألعاب والإكسسوارات.",
      },
    },
  ]);

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
