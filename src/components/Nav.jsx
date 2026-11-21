'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon, InstagramIcon } from './ui';
import { useCart } from './Cart';
import { IG, IMG, PRODUCTS, fmt } from '@/lib/data';

const LINKS = [['Accueil', '/'], ['Nos Créations', '/#creations'], ['Coffrets Gourmands', '/produit/taste-me-box'], ['Avis', '/#avis']];

export default function Nav() {
  const { count, total, setOpen } = useCart();
  const [sc, setSc] = useState(0);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  useEffect(() => {
    const h = () => setSc(window.scrollY);
    h(); window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const res = q.trim() ? PRODUCTS.filter((p) => (p.name + p.desc + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())) : [];
  const prog = typeof document !== 'undefined' ? sc / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) : 0;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${sc > 10 ? 'bg-vanilla/90 shadow-warm backdrop-blur-lg' : 'bg-vanilla'}`}>
      <div className="absolute left-0 top-0 h-[3px] bg-gradient-to-r from-coral via-pop to-peri" style={{ width: `${prog * 100}%` }} />
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-5 sm:py-3 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          <img src={IMG.logo} alt="Cookies & Co" className="h-9 w-9 rounded-full object-cover transition hover:rotate-12 sm:h-10 sm:w-10" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold sm:text-lg">Cookies & Co</span>
      </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {LINKS.map(([l, h]) => (
            <li key={l}><Link href={h} className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pop after:transition-all hover:after:w-full">{l}</Link></li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Icon n="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-cacao/50 !text-[20px]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Trouver une douceur..." className="w-48 rounded-full border border-transparent bg-biscuit py-2 pl-10 pr-4 text-sm outline-none transition-all focus:w-64 focus:border-peri focus:bg-white" />
            {q && (
              <div className="absolute right-0 top-12 w-72 animate-fadeUp overflow-hidden rounded-2xl border border-cacao/5 bg-white p-2 shadow-warm">
                {res.length ? res.map((p) => (
                  <Link key={p.slug} href={`/produit/${p.slug}`} onClick={() => setQ('')} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-biscuit">
                    <img src={p.img} alt="" className="h-12 w-12 rounded-lg bg-biscuit object-cover" />
                    <span className="text-sm"><b>{p.name}</b><br /><span className="text-cacao/60">{fmt(p.price)}</span></span>
                  </Link>
                )) : <p className="p-3 text-sm text-cacao/60">Aucun résultat 🍪</p>}
              </div>
            )}
          </div>
          <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram Cookies & Co" className="hidden h-10 w-10 items-center justify-center rounded-full text-cacao transition hover:bg-biscuit hover:text-pop sm:flex">
            <InstagramIcon />
          </a>
          <button onClick={() => setOpen(true)} className="btn-dark !h-10 !w-10 !p-0 text-sm sm:!h-auto sm:!w-auto sm:!px-4 sm:!py-2.5" aria-label="Panier">
            <span className="relative">
              <Icon n="shopping_bag" fill />
              {count > 0 && <span key={count} className="absolute -right-2 -top-2 flex h-4 min-w-4 animate-pop items-center justify-center rounded-full bg-pop px-1 text-[10px]">{count}</span>}
            </span>
            <span className="hidden text-left leading-tight sm:block"><span className="block text-[10px] opacity-70">Panier</span>{fmt(total)}</span>
          </button>
          <button onClick={() => setMenu(!menu)} className="rounded-full p-1.5 hover:bg-biscuit lg:hidden" aria-label="Menu"><Icon n={menu ? 'close' : 'menu'} /></button>
        </div>
      </nav>
      <div className={`grid transition-all duration-300 lg:hidden ${menu ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <ul className="overflow-hidden bg-vanilla px-5 font-semibold">
          {LINKS.map(([l, h]) => <li key={l}><Link href={h} onClick={() => setMenu(false)} className="block border-b border-cacao/5 py-3">{l}</Link></li>)}
          <li className="sm:hidden"><a href={IG} target="_blank" rel="noreferrer" onClick={() => setMenu(false)} className="flex items-center gap-2 py-3"><InstagramIcon size={20} className="text-pop" /> Instagram</a></li>
        </ul>
      </div>
    </header>
  );
}
