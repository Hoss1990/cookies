'use client';
import { useEffect, useRef, useState } from 'react';

export const Icon = ({ n, className = '', fill, style }) => (
  <span style={style} className={`material-symbols-outlined ${fill ? 'fill' : ''} ${className}`}>{n}</span>
);

export const Stars = ({ n = 5, size = 16 }) => (
  <span className="inline-flex text-gold">
    {Array.from({ length: Math.round(n) }, (_, i) => <Icon key={i} n="star" fill style={{ fontSize: size }} />)}
  </span>
);

export function Reveal({ children, delay = 0, className = '' }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.12 });
    o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return <div ref={r} style={{ transitionDelay: `${delay}ms` }} className={`rv ${on ? 'in' : ''} ${className}`}>{children}</div>;
}

export function Counter({ to, dec = 0, pre = '', suf = '' }) {
  const r = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    o.observe(r.current);
    return () => o.disconnect();
  }, [to]);
  return <span ref={r}>{pre}{v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suf}</span>;
}
