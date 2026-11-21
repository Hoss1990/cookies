import { IMG } from './images';
export { IMG };
export const WA = process.env.NEXT_PUBLIC_WHATSAPP || '21658358580';
export const fmt = (n) => n.toFixed(3).replace('.', ',') + ' DT';

export const PRODUCTS = [
  {
    slug: 'croq-cafe', short: "Sablés en grains de café, au cacao amer et à l'extrait de café.", name: "Croq' Café", subtitle: 'Le Sablé Grain de Café', badge: 'Pépite du matin', badgeCls: 'bg-terra text-white',
    kicker: 'Signature Café Noir', cat: 'pret', price: 14.5, rating: 4.8, reviews: 94, weight: '85g',
    desc: "Petits biscuits sablés façonnés en grains de café. Une texture croquante et fondante, sublimée par du cacao amer et une touche d'extrait de café.",
    tags: ['Cacao amer', 'Extrait de café', 'Beurre'], img: IMG.croqHome, gallery: [IMG.croq1, IMG.croq2],
    ing: 'Farine ps-7, beurre, œufs, sucre glace, amidon, cacao amer, extrait de café.',
    cons: "À conserver à l'abri de l'humidité et de la chaleur.",
  },
  {
    slug: 'taste-me-box', short: "4 cookies surgelés prêts à enfourner, en 3 goûts.", name: 'Taste Me Box', subtitle: 'La Boîte Gourmande', badge: 'Best-seller Prêt-à-cuire', badgeCls: 'bg-grape text-white',
    kicker: 'Surgelé • 4 pièces • 3 goûts', cat: 'cuire', price: 24, old: 28, rating: 4.9, reviews: 128, weight: '4 cookies surgelés',
    desc: "L'expérience pâtissière d'un atelier d'exception chez vous. Quatre cookies surgelés prêts à enfourner, en trois goûts, pour savourer le croustillant absolu à l'extérieur et un cœur divinement coulant.",
    tags: ['Choco Noix', 'Choco Addict', 'Choco Noisette'], img: IMG.boxHome, gallery: [IMG.box1, IMG.box2, IMG.box3],
    compo: [[2, 'Choco Noix'], [1, 'Choco Addict'], [1, 'Choco Noisette']],
    ing: 'Farine ps-7, beurre, œufs, sucre roux, sucre, levure chimique, vanille, cacao amer, chocolat noir 55%, chocolat au lait, noix, noisette.',
  },
  {
    slug: 'choco-chips', short: "Cookie choco chips au cacao, en 50g ou 100g.", name: 'Choco Chips', subtitle: 'Le Bocal Pop Signature', badge: 'Culte', badgeCls: 'bg-cacao text-white',
    kicker: 'Sticker Pop • 2 formats', cat: 'pret', price: 9, rating: 5, reviews: 210, weight: '50g ou 100g',
    desc: 'Notre iconique cookie choco chips, en petit format (50g) ou en grand format (100g), au cacao et au sucre roux.',
    tags: ['Cacao', 'Sucre roux', 'Beurre'], img: IMG.chipsHome, gallery: [IMG.chips50, IMG.chips100, IMG.chips1, IMG.chips2],
    variantTitle: 'Choix du format',
    variants: [
      { name: 'Petit 50g', desc: 'Essghira', price: 9, img: IMG.chips50 },
      { name: 'Grand 100g', desc: 'Lkbira', price: 18, img: IMG.chips100 },
    ],
    ing: 'Farine ps-7, beurre, œufs, sucre roux, sucre, levure chimique, cacao.',
    cons: "À conserver à l'abri de l'humidité et de la chaleur.",
  },
  {
    slug: 'choco-noix', short: "8 cookies surgelés au chocolat noir 55% et aux noix.", name: 'Cookies Choco Noix', subtitle: 'Cookies surgelés – 8 pièces', badge: 'Surgelé', badgeCls: 'bg-peri text-white',
    kicker: 'Surgelé • 8 pièces • 400g', cat: 'cuire', price: 24, weight: '8 pièces • 400g',
    desc: 'Huit cookies surgelés prêts à enfourner, au chocolat noir 55% et aux noix. À cuire quand vous voulez.',
    tags: ['Noix', 'Chocolat noir 55%', 'Vanille'], img: IMG.noixHome, gallery: [IMG.noix1],
    ing: 'Farine ps-7, beurre, œufs, sucre roux, sucre, levure chimique, vanille, noix, chocolat noir 55%.',
  },
  {
    slug: 'choco-addict', short: "8 cookies surgelés au cacao amer, chocolat noir et au lait.", name: 'Cookies Choco Addict', subtitle: 'Cookies surgelés – 8 pièces', badge: 'Surgelé', badgeCls: 'bg-pop text-white',
    kicker: 'Surgelé • 8 pièces • 400g', cat: 'cuire', price: 24, weight: '8 pièces • 400g',
    desc: 'Huit cookies surgelés prêts à enfourner, pour les accros du chocolat : cacao amer, chocolat noir 55% et chocolat au lait.',
    tags: ['Cacao amer', 'Chocolat noir 55%', 'Chocolat au lait'], img: IMG.addictHome, gallery: [IMG.addict1],
    ing: 'Farine ps-7, beurre, œufs, sucre roux, sucre, cacao amer, levure chimique, vanille, chocolat noir 55%, chocolat au lait.',
  },
  {
    slug: 'choco-noisette', short: "8 cookies surgelés au chocolat au lait et aux noisettes.", name: 'Cookies Choco Noisette', subtitle: 'Cookies surgelés – 8 pièces', badge: 'Surgelé', badgeCls: 'bg-coral text-white',
    kicker: 'Surgelé • 8 pièces • 400g', cat: 'cuire', price: 24, weight: '8 pièces • 400g',
    desc: 'Huit cookies surgelés prêts à enfourner, au chocolat au lait et aux noisettes.',
    tags: ['Noisette', 'Chocolat au lait', 'Vanille'], img: IMG.noisetteHome, gallery: [IMG.noisette1],
    ing: 'Farine ps-7, beurre, œufs, sucre roux, sucre, levure chimique, vanille, noisette, chocolat au lait.',
  },
];

const allergens = (ing) => {
  const s = ing.toLowerCase(), a = [];
  if (s.includes('farine')) a.push('gluten (blé)');
  if (/beurre|lait/.test(s)) a.push('lait');
  if (/œuf|oeuf/.test(s)) a.push('œufs');
  if (/noix|noisette/.test(s)) a.push('fruits à coque');
  return `Contient, d'après la liste des ingrédients : ${a.join(', ')}. Pour tout doute sur les allergènes, contactez-nous sur WhatsApp avant de commander.`;
};
PRODUCTS.forEach((p) => {
  p.all = allergens(p.ing);
  p.cons = p.cons || 'Produit surgelé : à conserver au congélateur. Cuisson conseillée : 180°C, 10 à 12 minutes.';
});
export const bySlug = (s) => PRODUCTS.find((p) => p.slug === s);

export const REVIEWS = [
  { t: "Le Croq' Café est une révélation avec le café du matin. Cette forme de grain de café et l'amertume du chocolat noir… Absolument parfait, rien à voir avec les biscuits industriels.", n: 'Sonia Mansour', w: 'Cliente fidèle • Tunis', c: 'bg-coral' },
  { t: "La Taste Me Box est devenue le rituel du dimanche pour les enfants. 10 minutes au four et tout l'appartement sent la pâtisserie fine. Le choco-noisette est juste dingue !", n: 'Karim Ben Ali', w: 'Achat vérifié • Sfax', c: 'bg-pop' },
  { t: "J'ai offert le bocal Choco Chips à des amis pour un dîner. Le packaging est sublime et les cookies sont généreusement garnis de pépites. Livraison claire et rapide.", n: 'Meryem Youssef', w: 'Commande en ligne • La Marsa', c: 'bg-peri' },
];