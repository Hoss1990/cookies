'use client';
import { useEffect, useState } from 'react';
import { Icon } from './ui';

export default function PWA() {
  const [evt, setEvt] = useState(null);
  const [ios, setIos] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    let dismissed = false;
    try { dismissed = localStorage.getItem('cc_install_off') === '1'; } catch {}
    if (standalone || dismissed) return;

    const onPrompt = (e) => { e.preventDefault(); setEvt(e); setTimeout(() => setShow(true), 4000); };
    const onInstalled = () => { setShow(false); setEvt(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios/i.test(ua)) { setIos(true); setTimeout(() => setShow(true), 4000); }
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);

  const close = () => { setShow(false); try { localStorage.setItem('cc_install_off', '1'); } catch {} };
  const install = async () => {
    if (!evt) return;
    evt.prompt();
    await evt.userChoice;
    setEvt(null); setShow(false);
  };

  if (!show || (!evt && !ios)) return null;
  return (
    <div className="fixed bottom-24 left-4 z-40 flex max-w-[calc(100%-6.5rem)] animate-fadeUp items-center gap-3 rounded-2xl border border-cacao/10 bg-white p-3 shadow-warm sm:max-w-sm md:bottom-6">
      <img src="/icons/icon-192.png" alt="" className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 text-xs leading-tight">
        <b className="block text-sm">Installer Cookies & Co</b>
        {ios ? <span className="text-cacao/70">Touchez <b>Partager</b> puis « Sur l'écran d'accueil ».</span> : <span className="text-cacao/70">Accès rapide depuis votre écran d'accueil.</span>}
      </div>
      {!ios && <button onClick={install} className="btn bg-cacao px-3 py-2 text-xs text-vanilla hover:bg-pop">Installer</button>}
      <button onClick={close} aria-label="Fermer" className="text-cacao/40 transition hover:text-pop"><Icon n="close" className="!text-[18px]" /></button>
    </div>
  );
}
