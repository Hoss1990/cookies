import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { PRODUCTS, bySlug } from '@/lib/data';

export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));
export const generateMetadata = ({ params }) => {
  const p = bySlug(params.slug);
  return { title: p ? `${p.name} | Cookies & Co` : 'Cookies & Co' };
};

export default function Page({ params }) {
  const p = bySlug(params.slug);
  if (!p) notFound();
  return <ProductDetail p={p} others={PRODUCTS.filter((x) => x.slug !== p.slug)} />;
}