export type Product = {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  offerText: string;
  tag: string;
  tagType: string;
  imageUrl: string;
  categories: string[];
};

const CATEGORIES = [
  // Shop by Category icons
  'Latest Arrivals', 'Sofas', 'Sofa Cum Beds', 'Coffee Tables', 'Beds', 
  'Wardrobes', 'TV Units', 'Recliners', 'Dining Sets', 'Lounge Chairs', 
  'Shoe Racks', 'Bookshelves',
  // Navbar specific categories
  'Living', 'Bedroom', 'Mattress', 'Dining', 'Storage', 
  'Study & Office', 'Outdoor', 'Decor & Furnishing', 'Interiors', 'New Arrivals'
];

const IMAGES = [
  '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg',
  '/images/5.jpg', '/images/6.jpg', '/images/8.jpg', '/images/9.jpg',
  '/images/10.jpg', '/images/11.jpg', '/images/12.jpg', '/images/13.jpg',
  '/images/14.jpg'
];

const WARDROBE_IMAGES = Array.from({ length: 13 }, (_, i) => `/images/uploaded/wardrobe-${i + 1}.jpg`);
const KITCHEN_IMAGES = Array.from({ length: 12 }, (_, i) => `/images/uploaded/kitchen-${i + 1}.jpg`);

function getImageForCategory(category: string, id: number): string {
  const cat = category.toLowerCase();
  
  if (cat.includes('storage') || cat.includes('wardrobe') || cat.includes('shoe')) {
    return WARDROBE_IMAGES[id % WARDROBE_IMAGES.length];
  }
  
  if (cat.includes('interior') || cat.includes('decor') || cat.includes('kitchen')) {
    return KITCHEN_IMAGES[id % KITCHEN_IMAGES.length];
  }
  
  if (cat.includes('living') || cat.includes('sofa') || cat.includes('coffee') || cat.includes('lounge') || cat.includes('recliner')) {
    const sofaPool = [
      '/images/sofa_living.jpg', 
      '/images/generated/sofa_1_1787452830467.jpg', 
      '/images/generated/sofa_2_1787452841826.jpg', 
      '/images/generated/sofa_3_1787452854096.jpg', 
      '/images/generated/sofa_living_1787317267428.jpg',
      '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/5.jpg', '/images/6.jpg', '/images/10.jpg', '/images/11.jpg'
    ];
    return sofaPool[id % sofaPool.length];
  }
  
  if (cat.includes('bed') || cat.includes('mattress')) {
    const bedPool = [
      '/images/bedroom.jpg', 
      '/images/mattress.jpg', 
      '/images/generated/bed_1_1787452865972.jpg', 
      '/images/generated/bed_2_1787452880042.jpg', 
      '/images/4.jpg', '/images/12.jpg'
    ];
    return bedPool[id % bedPool.length];
  }
  
  if (cat.includes('dining')) {
    const diningPool = [
      '/images/dining.jpg', 
      '/images/generated/dining_1787317292742.jpg',
      '/images/generated/dining_1_1787452893634.jpg', 
      '/images/8.jpg', '/images/9.jpg'
    ];
    return diningPool[id % diningPool.length];
  }

  if (cat.includes('study') || cat.includes('office') || cat.includes('book')) return '/images/office.jpg';
  if (cat.includes('outdoor')) return '/images/outdoor.jpg';
  if (cat.includes('tv')) return '/images/tv.jpg';
  
  // Fallback for New Arrivals, Latest Arrivals or unknown
  return IMAGES[id % IMAGES.length];
}

function generateProducts(): Product[] {
  const result: Product[] = [];
  let idCounter = 1;

  // Generate 12 products per category to ensure a good amount of data for every section
  CATEGORIES.forEach(category => {
    for (let i = 1; i <= 12; i++) {
      const priceVal = Math.floor(Math.random() * 50000) + 5000;
      const originalPriceVal = Math.floor(priceVal * 1.5);
      const discount = Math.floor(100 - (priceVal / originalPriceVal) * 100);
      
      const tags = ['Best Seller', 'New Arrival', 'Trending', 'Festive Special', ''];
      const tag = tags[Math.floor(Math.random() * tags.length)];
      const tagType = tag === 'New Arrival' ? 'white' : 'brown';
      
      const image = getImageForCategory(category, idCounter);
      
      result.push({
        id: idCounter++,
        title: `Premium ${category} Collection - Model 0${i}`,
        price: priceVal.toLocaleString('en-IN'),
        originalPrice: originalPriceVal.toLocaleString('en-IN'),
        discount: `${discount}%`,
        offerText: 'Prepaid Orders — Get 5% off',
        tag,
        tagType,
        imageUrl: image,
        categories: [category, ...(category !== 'Latest Arrivals' && category !== 'New Arrivals' && Math.random() > 0.8 ? ['Latest Arrivals', 'New Arrivals'] : [])],
      });
    }
  });

  return result;
}

export const products = generateProducts();
