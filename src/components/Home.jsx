'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Counter, Icon, Img, Reveal, Stars } from './ui';
import ProductCard from './ProductCard';
import { useCart } from './Cart';
import { IMG, PRODUCTS, REVIEWS, bySlug, fmt } from '@/lib/data';

const PILLARS = [['grain', 'de vrais morceaux de chocolat dans chaque cookie'], ['coffee', 'Mouture Café Torréfié'], ['eco', 'Des ingrédients soigneusement sélectionnés'], ['oil_barrel', 'sans additifs ni améliorants.Sans colorants'], ['done_all', 'Pratiques et prêts à cuire']];
const TABS = [['all', 'Tous'], ['pret', 'Biscuits Prêts'], ['cuire', 'À Cuire à la Maison']];

function Hero() {
  const { add } = useCart();
  const croq = bySlug('croq-cafe');
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-20 top-10 h-72 w-72 animate-blob rounded-full bg-coral/20 blur-3xl" />
      <div className="absolute -right-10 top-40 h-80 w-80 animate-blob rounded-full bg-peri/20 blur-3xl [animation-delay:3s]" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-14 md:px-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex animate-fadeUp items-center gap-2 rounded-full bg-pop/10 px-4 py-1.5 text-xs font-bold text-popdeep"><Icon n="bakery_dining" className="!text-[18px]" /> Façonné à la main • Cookies and Co</span>
          <h1 className="mt-5 animate-fadeUp font-display text-[32px] font-bold leading-[46px] tracking-tight [animation-delay:120ms] md:text-[56px] md:leading-[64px]">
            Un véritable goût{' '}
            <span className="-mx-[0.12em] box-decoration-clone bg-gradient-to-r from-coral to-pop bg-clip-text px-[0.12em] italic text-transparent">de fait maison</span>{' '}
            &amp; authentique
          </h1>
          <p className="mt-5 max-w-lg animate-fadeUp text-[17px] leading-relaxed text-cacao/70 [animation-delay:240ms]">Des produits prêts à savourer, sans prise de tête !</p>
          <div className="mt-7 flex animate-fadeUp flex-wrap gap-3 [animation-delay:360ms]">
            <a href="#creations" className="btn-pop">Découvrir nos créations <Icon n="arrow_forward" /></a>
            <Link href="/produit/taste-me-box" className="btn-ghost"><Icon n="local_fire_department" className="text-coral" /> La Box Prêt-à-Cuire</Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[[100, 0, '', '%', 'Fait main en atelier'], [0, 0, '', '%', 'Arômes ou conservateurs']].map(([to, d, pre, suf, l]) => (
              <div key={l}><p className="font-display text-3xl font-bold text-pop"><Counter to={to} dec={d} pre={pre} suf={suf} /></p><p className="text-xs text-cacao/60">{l}</p></div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md animate-fadeUp [animation-delay:200ms]">
          <div className="animate-float rounded-3xl border border-cacao/5 bg-white p-4 shadow-warm">
            <div className="relative overflow-hidden rounded-2xl bg-biscuit">
              <Img src={croq.img} alt={croq.name} className="aspect-square w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-terra px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Pause café</span>
            </div>
            <div className="flex items-center justify-between px-1 pb-1 pt-4">
              <div><p className="font-display text-xl font-semibold">{croq.name}</p><p className="text-xs text-cacao/60">Infusion grains de café torréfiés & cacao amer</p></div>
              <button onClick={() => add(croq)} className="btn-dark !p-3" aria-label="Ajouter"><Icon n="add" /></button>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 flex animate-wiggle items-center gap-3 rounded-2xl bg-white p-3 shadow-warm sm:-left-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral"><Icon n="cookie" fill /></span>
            <span className="text-xs leading-tight"><b className="block text-sm">Cuisson du Jour</b><span className="text-peri">Cokiees & co</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const row = [...PILLARS, ...PILLARS, ...PILLARS, ...PILLARS];
  return (
    <section className="border-y border-cacao/5 bg-gradient-to-r from-peri/5 via-pop/5 to-coral/10 py-5">
      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[.25em] text-pop">Les Piliers du Goût</p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 [animation-duration:80s] hover:[animation-play-state:paused]">
          {row.map(([ic, l], i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-cacao/5 bg-white px-5 py-2.5 text-sm font-semibold shadow-warm"><Icon n={ic} className="text-coral !text-[20px]" />{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  const [tab, setTab] = useState('all');
  const list = PRODUCTS.filter((p) => tab === 'all' || p.cat === tab);
  return (
    <section id="creations" className="mx-auto max-w-[1280px] px-5 py-20 md:px-12">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.25em] text-pop">Sélection d'Exception</p>
          <h2 className="mt-2 font-display text-[30px] font-semibold md:text-[40px]">Nos Pépites Artisanales</h2>
          <p className="mt-2 max-w-xl text-cacao/70">Un véritable goût de fait maison authentique.</p>
        </div>
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-biscuit p-1">
          {TABS.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${tab === k ? 'bg-pop text-white shadow-glow' : 'hover:bg-white'}`}>{l}</button>
          ))}
        </div>
      </Reveal>
      <div key={tab} className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
      </div>
    </section>
  );
}

function Secret() {
  const { add, setOpen } = useCart();
  const box = bySlug('taste-me-box');
  return (
    <section className="mx-auto max-w-[1280px] px-5 md:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cacao via-[#3a1d15] to-[#5a2a1c] p-8 text-vanilla md:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 animate-blob rounded-full bg-coral/30 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-pop px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white"><Icon n="oven_gen" className="!text-[18px]" /> Le secret des connaisseurs</span>
              <h2 className="mt-5 font-display text-[30px] font-semibold leading-tight md:text-[40px]">L'odeur du cookie chaud qui sort de <span className="italic text-coral">votre propre four</span>.</h2>
              <p className="mt-4 text-vanilla/75">Recevez votre <b>Taste Me Box</b> surgelée. Disposez les 4 cookies prêts à cuire sur une plaque, Enfournez entre 10 et 12 min en fonction de la puissance de votre four. La pâte caramélise, le chocolat fond… Vous servez un biscuit tiède à la texture inégalable.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[['timer', '10 min chrono', 'Chaleur tournante 175°C', 'text-coral'], ['favorite', "croustillant à l'extérieur tendre à l'intérieur", 'Cœur coulant garanti', 'text-pop'], ['ac_unit', 'Surgelé', 'Prêt à enfourner', 'text-peri']].map(([ic, t, s, c]) => (
                  <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:-translate-y-1 hover:bg-white/10"><Icon n={ic} fill className={c} /><p className="mt-1 text-sm font-bold">{t}</p><p className="text-[11px] text-vanilla/60">{s}</p></div>
                ))}
              </div>
              <button onClick={() => { add(box); setOpen(true); }} className="btn-pop mt-7"><Icon n="shopping_basket" /> Commander la Box ({fmt(box.price)})</button>
              <a href="tel:+21658358580" className="mt-4 flex items-center gap-2 text-sm text-vanilla/80 hover:text-white"><Icon n="call" className="!text-[18px]" /> Commande par téléphone : <b>58 358 580</b></a>
            </div>
            <Link href="/produit/taste-me-box" className="mx-auto block w-full max-w-sm rotate-3 rounded-3xl bg-white p-4 text-cacao shadow-2xl transition duration-500 hover:rotate-0 hover:scale-105">
              <img src={box.img} alt={box.name} className="aspect-square w-full rounded-2xl bg-biscuit object-cover" />
              <div className="flex items-center justify-between pt-3"><span className="font-display text-lg font-semibold">Taste Me Box Gourmande</span><span className="rounded-full bg-gold px-3 py-1 text-xs font-extrabold">4 Pièces</span></div>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}



function Reviews() {
  return (
    <section id="avis" className="bg-gradient-to-b from-vanilla to-cream py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[.25em] text-pop">Avis Vérifiés</p>
          <h2 className="mt-2 font-display text-[30px] font-semibold md:text-[40px]">Les Mots de nos Gourmets</h2>
          <p className="mt-2 text-cacao/70">Plus de 1 200 adeptes ont partagé leur coup de foudre sucré.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.n} delay={i * 120}>
              <figure className="h-full rounded-3xl border border-cacao/5 bg-white p-6 shadow-warm transition hover:-translate-y-2 hover:shadow-glow">
                <Stars /><blockquote className="mt-3 text-[15px] italic leading-relaxed text-cacao/80">« {r.t} »</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${r.c}`}>{r.n.split(' ').map((w) => w[0]).join('')}</span>
                  <span className="text-sm"><b className="block">{r.n}</b><span className="text-cacao/60">{r.w}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insta() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-12">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.25em] text-peri">#CookiesAndCo</p>
          <h2 className="mt-1 font-display text-[28px] font-semibold">Instants Gourmands</h2>
          <p className="text-sm text-cacao/70">Partagez vos pauses dégustation avec le hashtag #CookiesAndCo</p>
        </div>
        <a href={`https://wa.me/21658358580`} target="_blank" rel="noreferrer" className="group flex items-center gap-1 text-sm font-bold text-pop">Rejoindre notre communauté <Icon n="arrow_outward" className="!text-[18px] transition group-hover:translate-x-1" /></a>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[IMG.insta1, IMG.insta2, IMG.insta3, IMG.insta4].map((src, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="group relative aspect-square overflow-hidden rounded-2xl">
              <img src={src} alt="Instant gourmand Cookies & Co" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-pop/40 opacity-0 transition group-hover:opacity-100"><Icon n="favorite" fill className="!text-4xl text-white" /></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return <><Hero /><Pillars /><Catalogue /><Secret /><Reviews /></>;
}