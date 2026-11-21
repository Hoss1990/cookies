'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon, Reveal, Stars } from './ui';
import { useCart } from './Cart';
import { REVIEWS, fmt } from '@/lib/data';

const CORE = [['cookie', 'Chocolat noir 55%', 'Dans nos cookies choco noix et choco addict'], ['restaurant', 'Beurre', 'Pour une pâte fondante et savoureuse'], ['eco', 'Noix & noisettes', 'Dans nos cookies choco noix et choco noisette'], ['spa', 'Vanille', 'Dans tous nos cookies surgelés']];

// Galerie premium : cadre 4/5 constant, photo entière (jamais coupée) sur fond flouté de la même photo,
// swipe mobile, flèches, miniatures, zoom plein écran, collante sur ordinateur.
function Gallery({ p, i, setI, fav, setFav }) {
  const imgs = p.gallery;
  const n = imgs.length;
  const [zoom, setZoom] = useState(false);
  const t = useRef(null);
  const go = (d) => setI((k) => (k + d + n) % n);
  const fade = { WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' };

  useEffect(() => {
    if (!zoom) return;
    const h = (e) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', h);
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [zoom, n]);

  const onStart = (e) => { t.current = e.touches[0].clientX; };
  const onEnd = (e) => {
    if (t.current == null) return;
    const dx = e.changedTouches[0].clientX - t.current;
    t.current = null;
    if (n > 1 && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };
  const arrow = 'grid h-10 w-10 place-items-center rounded-full bg-white/85 text-cacao shadow backdrop-blur transition hover:bg-white active:scale-90';

  return (
    <div className="self-start lg:sticky lg:top-24">
      <div onTouchStart={onStart} onTouchEnd={onEnd} className="group relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-3xl bg-biscuit shadow-warm">
        {/* Fond flouté de la même photo : remplit tout le cadre, aucun vide */}
        <img src={imgs[i]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-2xl" />
        <button type="button" onClick={() => setZoom(true)} aria-label="Agrandir la photo" className="absolute inset-0 cursor-zoom-in">
          <img key={i} src={imgs[i]} alt={`${p.name} – photo ${i + 1}`} style={fade} className="h-full w-full animate-fadeUp object-contain" />
        </button>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
          <span className="rounded-full bg-cacao/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{p.badge}</span>
          {p.cat === 'cuire' && <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold backdrop-blur">Fournées minute (10 min)</span>}
        </div>
        <button onClick={() => setFav(!fav)} aria-label="Favori" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow backdrop-blur transition hover:scale-110 active:scale-90 sm:right-4 sm:top-4"><Icon n="favorite" fill={fav} className={fav ? 'text-pop' : ''} /></button>

        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Photo précédente" className={`${arrow} absolute left-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100`}><Icon n="chevron_left" /></button>
            <button onClick={() => go(1)} aria-label="Photo suivante" className={`${arrow} absolute right-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100`}><Icon n="chevron_right" /></button>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-xs font-semibold sm:inset-x-4 sm:bottom-4">
          <span className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-cacao backdrop-blur"><Icon n="verified" className="!text-[15px] text-terra" /> Artisanal · {p.weight}</span>
          <span className="flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-cacao backdrop-blur"><Icon n="zoom_in" className="!text-[15px]" />{n > 1 ? `${i + 1} / ${n}` : 'Agrandir'}</span>
        </div>
      </div>

      {n > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {imgs.map((g, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Voir la photo ${k + 1}`} className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:h-[72px] sm:w-[72px] ${i === k ? 'ring-terra' : 'opacity-60 ring-transparent hover:opacity-100'}`}>
              <img src={g} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div role="dialog" aria-modal="true" onClick={() => setZoom(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-cacao/95 p-4 backdrop-blur-sm">
          <button aria-label="Fermer" onClick={() => setZoom(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"><Icon n="close" /></button>
          {n > 1 && <button aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"><Icon n="chevron_left" /></button>}
          <img src={imgs[i]} alt={p.name} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-2xl object-contain" />
          {n > 1 && <button aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"><Icon n="chevron_right" /></button>}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail({ p, others }) {
  const { add, setOpen } = useCart();
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(p.variants?.[0].name || '');
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const [fav, setFav] = useState(false);
  const [acc, setAcc] = useState(0);
  const [bar, setBar] = useState(false);
  useEffect(() => {
    const h = () => setBar(window.scrollY > 500);
    h(); window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const cur = p.variants?.find((v) => v.name === variant);
  const price = cur?.price ?? p.price;
  const item = () => ({ variant, qty, price, img: cur?.img });
  const onAdd = () => { add(p, item()); setDone(true); setTimeout(() => setDone(false), 1800); };
  const ACC = [
    ['grain', 'Ingrédients', p.ing],
    ['info', 'Allergènes & Conseils nutritionnels', p.all],
    ['local_shipping', 'Conservation & Livraison Express', `${p.cons} Livraison : expédition express réfrigérée sous 24h à 48h partout en Tunisie. Retrait offert le jour même à la boulangerie Kanoun & Fils.`],
  ];

  return (
    <div className="pb-20 md:pb-0">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <nav className="flex items-center gap-2 py-5 text-xs text-cacao/60">
          <Link href="/" className="hover:text-pop">Accueil</Link>/<Link href="/#creations" className="hover:text-pop">{p.cat === 'cuire' ? 'Prêts-à-cuire' : 'Biscuits prêts'}</Link>/<span className="font-semibold text-cacao">{p.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galerie */}
          <Gallery p={p} i={img} setI={setImg} fav={fav} setFav={setFav} />

          {/* Infos */}
          <div className="space-y-6">
            {p.rating && <div className="flex items-center gap-2 text-sm"><Stars n={p.rating} /><b>{p.rating.toFixed(1)} / 5</b><span className="text-cacao/60">• {p.reviews} avis vérifiés</span></div>}
            <div>
              <h1 className="font-display text-[38px] font-bold leading-tight md:text-5xl">{p.name}</h1>
              <p className="mt-1 font-display text-2xl italic text-terra">{p.subtitle}</p>
            </div>
            <p className="text-cacao/70">{p.desc}</p>
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl font-bold">{fmt(price)}</span>
              {p.old && <><span className="text-sm text-cacao/50 line-through">{fmt(p.old)}</span><span className="rounded-full bg-terrasoft px-3 py-1 text-xs font-bold text-terra">-{Math.round((1 - p.price / p.old) * 100)}% Lancement</span></>}
            </div>

            {p.variants && (
              <div className="rounded-2xl bg-cream p-5">
                <p className="mb-3 font-display text-lg font-semibold">{p.variantTitle || 'Choix du format'}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {p.variants.map((v) => (
                    <button key={v.name} onClick={() => { setVariant(v.name); const k = p.gallery.indexOf(v.img); if (k >= 0) setImg(k); }} className={`rounded-xl border-2 bg-white p-3 text-left transition hover:-translate-y-0.5 ${variant === v.name ? 'border-terra shadow-warm' : 'border-transparent'}`}>
                      <span className="block text-sm font-bold">{v.name}</span><span className="text-xs text-cacao/60">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {p.compo && (
              <div className="rounded-2xl bg-cream p-5">
                <p className="mb-3 font-display text-lg font-semibold">Composition de la box</p>
                <div className="grid grid-cols-3 gap-3">
                  {p.compo.map(([n, t]) => (
                    <div key={t} className="rounded-xl bg-white p-3 text-center transition hover:-translate-y-0.5 hover:shadow-warm"><span className="block font-display text-2xl font-bold text-terra">{n}×</span><span className="text-xs font-semibold">{t}</span></div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex items-center rounded-full bg-biscuit px-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 transition hover:text-terra" aria-label="Moins"><Icon n="remove" /></button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 transition hover:text-terra" aria-label="Plus"><Icon n="add" /></button>
              </div>
              <button onClick={onAdd} className={`btn flex-1 py-4 text-white ${done ? 'bg-[#16a34a]' : 'bg-cacao hover:-translate-y-0.5 hover:shadow-glow'}`}>
                <Icon n={done ? 'check_circle' : 'shopping_bag'} fill /> {done ? 'Délicieusement Ajouté !' : `Ajouter au Panier • ${fmt(price * qty)}`}
              </button>
            </div>
            <button onClick={() => { add(p, item()); setOpen(true); }} className="btn-ghost w-full"><Icon n="chat" /> Commander maintenant via WhatsApp</button>

            {p.cat === 'cuire' && (
              <div className="rounded-2xl border border-terra/20 bg-terrasoft/50 p-5">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-terra text-white"><Icon n="cookie" fill /></span><b className="font-display text-lg">Secret du Chef Kanoun</b><span className="rounded-full bg-terra px-2 py-0.5 text-[10px] font-bold uppercase text-white">À chaud</span></div>
                <p className="mt-2 text-sm text-cacao/75">Préchauffez votre four à <b>180°C</b>. Disposez les portions sur une plaque avec papier sulfurisé et enfournez pendant <b>10 à 12 minutes</b> seulement. Laissez tiédir 3 minutes : le cœur sera parfaitement coulant et fondant.</p>
              </div>
            )}

            <div className="divide-y divide-cacao/10 rounded-2xl bg-cream px-5">
              {ACC.map(([ic, t, body], i) => (
                <div key={t}>
                  <button onClick={() => setAcc(acc === i ? -1 : i)} className="flex w-full items-center gap-3 py-4 text-left font-semibold"><Icon n={ic} className="text-terra" />{t}<Icon n="expand_more" className={`ml-auto transition-transform ${acc === i ? 'rotate-180' : ''}`} /></button>
                  <div className={`grid transition-all duration-300 ${acc === i ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-sm text-cacao/70">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 bg-cream py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-12">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[.25em] text-terra">Excellence Pâtissière</p>
            <h2 className="mt-1 font-display text-[30px] font-semibold md:text-[40px]">Au cœur de nos créations</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CORE.map(([ic, t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-warm transition hover:-translate-y-1.5">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terrasoft text-terra"><Icon n={ic} /></span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3><p className="mt-1 text-xs text-cacao/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-12">
        <Reveal className="flex items-end justify-between">
          <div><p className="text-[11px] font-bold uppercase tracking-[.25em] text-terra">Accompagnements & Douceurs</p><h2 className="mt-1 font-display text-[30px] font-semibold">Vous aimerez aussi</h2></div>
          <Link href="/#creations" className="group hidden items-center gap-1 text-sm font-bold text-terra sm:flex">Voir tout le catalogue <Icon n="arrow_forward" className="!text-[18px] transition group-hover:translate-x-1" /></Link>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((o) => (
            <Reveal key={o.slug}>
              <div className="flex gap-4 rounded-3xl bg-white p-5 shadow-warm transition hover:-translate-y-1 hover:shadow-glow">
                <Link href={`/produit/${o.slug}`} className="relative w-32 shrink-0 overflow-hidden rounded-2xl bg-biscuit sm:w-40"><img src={o.img} alt={o.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${o.badgeCls}`}>{o.badge}</span></Link>
                <div className="flex flex-1 flex-col gap-2">
                  {o.rating && <span className="flex items-center gap-1 text-xs"><Icon n="star" fill className="text-gold !text-[16px]" /><b>{o.rating.toFixed(1)}</b><span className="text-cacao/60">({o.reviews} avis)</span></span>}
                  <h3 className="font-display text-xl font-semibold">{o.name}</h3>
                  <p className="line-clamp-2 text-sm text-cacao/70">{o.desc}</p>
                  <div className="mt-auto flex items-center justify-between"><b>{fmt(o.price)}</b><Link href={`/produit/${o.slug}`} className="btn-dark !px-4 !py-2 text-xs"><Icon n="add" className="!text-[16px]" /> Découvrir</Link></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-vanilla to-cream py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-12">
          <Reveal className="text-center"><p className="text-[11px] font-bold uppercase tracking-[.25em] text-terra">Expérience Client</p><h2 className="mt-1 font-display text-[30px] font-semibold">Sorti du four, unanime</h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.n} delay={i * 100}>
                <figure className="h-full rounded-3xl bg-white p-6 shadow-warm transition hover:-translate-y-1"><Stars /><blockquote className="mt-3 text-sm italic text-cacao/80">« {r.t} »</blockquote><figcaption className="mt-4 text-sm"><b>{r.n}</b><br /><span className="text-cacao/60">{r.w}</span></figcaption></figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Barre mobile sticky */}
      <div className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-cacao/10 bg-white/95 p-3 shadow-2xl backdrop-blur transition-transform duration-300 md:hidden ${bar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="leading-tight"><b className="block">{p.name}</b><span className="text-sm text-cacao/60">{fmt(price * qty)}</span></div>
        <button onClick={() => { add(p, item()); setOpen(true); }} className="btn-dark !py-2.5 text-sm"><Icon n="shopping_bag" fill /> Commander</button>
      </div>
    </div>
  );
}