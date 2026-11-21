'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Icon, Stars } from './ui';
import { useCart } from './Cart';
import { fmt } from '@/lib/data';

export default function ProductCard({ p, i = 0 }) {
  const { add } = useCart();
  const [fav, setFav] = useState(false);
  const [done, setDone] = useState(false);
  const onAdd = () => {
    add(p);
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <article style={{ animationDelay: `${i * 90}ms` }} className="group relative flex animate-fadeUp flex-col overflow-hidden rounded-2xl border border-cacao/5 bg-white shadow-warm transition duration-300 hover:-translate-y-2 hover:shadow-glow sm:rounded-3xl">
      <Link href={`/produit/${p.slug}`} className="relative block aspect-square overflow-hidden bg-biscuit">
        <img src={p.img} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {/* Badge : petit et tronqué sur mobile pour ne jamais cacher la photo ni le cœur */}
        <span className={`absolute left-1.5 top-1.5 max-w-[calc(100%-2.5rem)] truncate rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide sm:left-3 sm:top-3 sm:max-w-none sm:px-3 sm:py-1 sm:text-[10px] ${p.badgeCls}`}>{p.badge}</span>
        {/* Poids : sur la photo seulement à partir de sm, sous le prix sur mobile */}
        <span className="absolute bottom-3 right-3 hidden -rotate-6 rounded-full bg-gold px-3 py-1 text-[10px] font-extrabold uppercase text-cacao transition group-hover:rotate-3 sm:block">{p.weight}</span>
      </Link>
      <button onClick={() => setFav(!fav)} aria-label="Favori" className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1 shadow transition hover:scale-110 active:scale-90 sm:right-3 sm:top-3 sm:p-2">
        <Icon n="favorite" fill={fav} className={`!text-[16px] sm:!text-[22px] ${fav ? 'text-pop' : ''}`} />
      </button>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-3 sm:p-5">
        <p className="text-[9px] font-bold uppercase tracking-wider text-peri sm:text-[11px] sm:tracking-widest">{p.kicker}</p>
        {p.reviews && <div className="flex items-center gap-1 text-[11px] sm:text-xs"><Stars n={p.rating} size={12} /><span className="text-cacao/60">({p.reviews})</span></div>}
        <Link href={`/produit/${p.slug}`} className="font-display text-base font-semibold leading-tight transition hover:text-pop sm:text-2xl">{p.name}</Link>
        <p className="line-clamp-2 text-[11px] leading-snug text-cacao/70 sm:text-sm">{p.short || p.desc}</p>
        <div className="hidden flex-wrap gap-1.5 sm:flex">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        <div className="mt-auto flex flex-col gap-1.5 pt-1.5 sm:flex-row sm:items-end sm:justify-between sm:pt-3">
          <div>
            <span className="block text-[10px] text-cacao/50 sm:hidden">{p.weight}</span>
            <span className="text-sm font-extrabold sm:text-xl">{p.variants && <span className="mr-1 text-[10px] font-semibold text-cacao/60 sm:text-xs">dès</span>}{fmt(p.price)}</span>
          </div>
          {p.variants ? (
            <Link href={`/produit/${p.slug}`} className="btn bg-cacao px-3 py-1.5 text-[11px] text-white hover:bg-pop sm:px-5 sm:py-2.5 sm:text-sm"><Icon n="tune" className="!text-[16px] sm:!text-[18px]" /> Choisir</Link>
          ) : (
            <button onClick={onAdd} className={`btn px-3 py-1.5 text-[11px] text-white sm:px-5 sm:py-2.5 sm:text-sm ${done ? 'bg-[#16a34a]' : 'bg-cacao hover:bg-pop'}`}>
              <Icon n={done ? 'check' : 'add_shopping_cart'} className="!text-[16px] sm:!text-[18px]" /> {done ? 'Ajouté !' : 'Ajouter'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
