'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Icon } from './ui';
import { WA, fmt } from '@/lib/data';

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem('cc_cart') || '[]')); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem('cc_cart', JSON.stringify(items)); } catch {} }, [items, ready]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const add = (p, { variant = '', qty = 1, price, img } = {}) => {
    const key = `${p.slug}|${variant}`;
    setItems((a) => a.find((i) => i.key === key)
      ? a.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      : [...a, { key, slug: p.slug, name: p.name, variant, price: price ?? p.price, img: img ?? p.img, qty }]);
    setToast(`${p.name} ajouté au panier`);
  };
  const setQty = (key, q) => setItems((a) => (q < 1 ? a.filter((i) => i.key !== key) : a.map((i) => (i.key === key ? { ...i, qty: q } : i))));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <Ctx.Provider value={{ items, count, total, open, setOpen, add, setQty, clear }}>
      {children}
      {toast && (
        <div key={toast} className="fixed bottom-24 left-1/2 z-[80] flex animate-toast items-center gap-2 rounded-full bg-cacao px-5 py-3 text-sm font-semibold text-vanilla shadow-warm md:bottom-8">
          <Icon n="check_circle" fill className="text-gold" /> {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function CartDrawer() {
  const { items, total, count, open, setOpen, setQty, clear } = useCart();
  const [f, setF] = useState({ name: '', phone: '', address: '', note: '' });
  const [err, setErr] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(false); };

  const send = () => {
    if (!f.name.trim() || !/^[0-9+\s]{8,}$/.test(f.phone.trim())) return setErr(true);
    const lines = items.map((i, n) => `${n + 1}. ${i.name}${i.variant ? ` (${i.variant})` : ''} × ${i.qty} — ${fmt(i.price * i.qty)}`);
    const msg = [
      '🍪 *Nouvelle commande – Cookies & Co*', '', ...lines, '', `💰 *Total : ${fmt(total)}*`, '',
      `👤 ${f.name}`, `📞 ${f.phone}`, f.address ? `📍 ${f.address}` : null, f.note ? `📝 ${f.note}` : null,
    ].filter((x) => x !== null).join('\n');
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const input = 'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-peri focus:ring-4 focus:ring-peri/20';
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[60] bg-cacao/50 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-vanilla shadow-2xl transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex items-center justify-between border-b border-cacao/10 p-5">
          <h2 className="font-display text-2xl font-semibold">Mon panier <span className="text-base text-cacao/50">({count})</span></h2>
          <button onClick={() => setOpen(false)} className="rounded-full p-2 transition hover:rotate-90 hover:bg-biscuit" aria-label="Fermer"><Icon n="close" /></button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {items.length === 0 && (
            <div className="mt-16 text-center">
              <Icon n="cookie" className="animate-wiggle !text-6xl text-coral" />
              <p className="mt-3 font-display text-xl">Votre panier est vide</p>
              <p className="text-sm text-cacao/60">Les cookies vous attendent…</p>
            </div>
          )}
          {items.map((i) => (
            <div key={i.key} className="flex animate-fadeUp gap-3 rounded-2xl border border-cacao/5 bg-white p-3 shadow-warm">
              <img src={i.img} alt={i.name} className="h-20 w-20 rounded-xl bg-biscuit object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="font-bold leading-tight">{i.name}</p>
                  {i.variant && <p className="text-xs text-cacao/60">{i.variant}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full bg-biscuit">
                    <button onClick={() => setQty(i.key, i.qty - 1)} className="p-1.5 transition hover:text-pop" aria-label="Moins"><Icon n="remove" className="!text-[18px]" /></button>
                    <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                    <button onClick={() => setQty(i.key, i.qty + 1)} className="p-1.5 transition hover:text-pop" aria-label="Plus"><Icon n="add" className="!text-[18px]" /></button>
                  </div>
                  <span className="font-bold">{fmt(i.price * i.qty)}</span>
                </div>
              </div>
              <button onClick={() => setQty(i.key, 0)} className="self-start text-cacao/40 transition hover:text-pop" aria-label="Retirer"><Icon n="delete" className="!text-[20px]" /></button>
            </div>
          ))}

          {items.length > 0 && (
            <div className="space-y-2 pt-3">
              <p className="font-display text-lg font-semibold">Vos coordonnées</p>
              <input className={`${input} ${err && !f.name.trim() ? 'border-error' : ''}`} placeholder="Nom complet *" value={f.name} onChange={set('name')} />
              <input className={`${input} ${err && !/^[0-9+\s]{8,}$/.test(f.phone.trim()) ? 'border-error' : ''}`} placeholder="Téléphone *" inputMode="tel" value={f.phone} onChange={set('phone')} />
              <input className={input} placeholder="Adresse de livraison" value={f.address} onChange={set('address')} />
              <textarea className={input} rows={2} placeholder="Note (optionnel)" value={f.note} onChange={set('note')} />
              {err && <p className="animate-fadeUp text-xs font-semibold text-error">Merci d'indiquer votre nom et un numéro de téléphone valide.</p>}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="space-y-3 border-t border-cacao/10 bg-white p-5">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span><span className="font-display text-2xl font-bold">{fmt(total)}</span>
            </div>
            <button onClick={send} className="btn w-full bg-[#25D366] py-3 text-sm text-white sm:py-3.5 sm:text-base hover:-translate-y-0.5 hover:shadow-lg">
              <Icon n="chat" fill /> Commander via WhatsApp
            </button>
            <button onClick={clear} className="w-full text-center text-xs text-cacao/50 underline-offset-4 transition hover:text-pop hover:underline">Vider le panier</button>
          </footer>
        )}
      </aside>
    </>
  );
}

export function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour Cookies & Co 🍪, j’ai une question !')}`} target="_blank" rel="noreferrer"
       className="fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 sm:h-14 sm:w-14 md:bottom-6 md:right-6" aria-label="WhatsApp">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <Icon n="chat" fill className="relative !text-[22px] sm:!text-[28px]" />
    </a>
  );
}
