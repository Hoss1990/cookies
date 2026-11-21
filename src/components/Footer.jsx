'use client';
import Link from 'next/link';
import { Icon, InstagramIcon } from './ui';
import { IG, IMG, WA } from '@/lib/data';

const NAV = [['Accueil', '/'], ['Nos Créations', '/#creations'], ['Coffrets Cadeaux', '/produit/taste-me-box'], ['Notre Savoir-faire', '/#histoire'], ['Avis Gourmands', '/#avis']];

export default function Footer() {
  return (
    <footer className="mt-10 bg-biscuit pb-24 pt-12 md:pb-8 md:pt-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-8 px-5 md:grid-cols-[1.5fr_1fr_1.3fr] md:gap-12 md:px-12">
        {/* Marque */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <img src={IMG.logo} alt="Cookies & Co" className="h-11 w-11 rounded-full" />
            <span className="font-display text-xl font-bold">Cookies & Co</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cacao/70">Cookies and Co est né du savoir-faire de Boulangerie Kanoun & Fils
Derrière chaque création, il y a le même amour du fait main, le souci du détail et le goût des bonnes choses.
Parce que chez nous, l'artisanat ne se limite pas au pain… il se décline aussi en cookies, préparés avec passion et savoir-faire.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-lg font-semibold">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-cacao/70">
            {NAV.map(([l, h]) => (
              <li key={l}><Link href={h} className="inline-block transition hover:translate-x-1 hover:text-pop">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm">
          <h4 className="font-display text-lg font-semibold">Contact</h4>
          <p className="flex gap-2"><Icon n="storefront" className="shrink-0 text-pop" /><span><b>Boutique & Fournil</b><br /><span className="text-cacao/70">Produit par boulangerie Kanoun et Fils</span></span></p>
          <a href="tel:+21658358580" className="flex items-center gap-2 font-semibold transition hover:text-pop"><Icon n="call" className="shrink-0 text-pop" />58 358 580</a>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour Cookies & Co 🍪')}`} target="_blank" rel="noreferrer" className="btn mt-1 bg-[#25D366] px-4 py-2 text-xs text-white hover:-translate-y-0.5 hover:shadow-lg sm:text-sm">
            <Icon n="chat" fill className="!text-[18px]" /> Écrire sur WhatsApp
          </a>
          <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram Cookies & Co" className="flex items-center gap-2 font-semibold transition hover:text-pop"><InstagramIcon size={20} className="text-pop" />@cookies__and_co</a>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-3 border-t border-cacao/10 px-5 pt-6 text-xs text-cacao/60 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p>© 2025 Cookies & Co. Tous droits réservés. • Produit par boulangerie Kanoun et Fils</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group inline-flex items-center gap-1 self-start font-semibold text-cacao transition hover:text-pop sm:self-auto">
          Retour en haut <Icon n="arrow_upward" className="!text-[16px] transition group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
}