module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        vanilla: '#fff8f1', cacao: '#23120f', biscuit: '#f5ede2', cream: '#fbf2e7',
        pop: '#e64980', popdeep: '#db2777', peri: '#6366f1', grape: '#4f46e5',
        coral: '#f97316', gold: '#f59e0b', terra: '#a13f1d', terrasoft: '#ffdbd0', line: '#d3c3c0',
      },
      fontFamily: {
        display: ['var(--f-display)', 'Georgia', 'serif'],
        sans: ['var(--f-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 10px 28px -4px rgba(35,18,15,.08), 0 4px 10px -2px rgba(35,18,15,.04)',
        glow: '0 16px 40px -8px rgba(230,73,128,.28)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0) rotate(-1deg)' }, '50%': { transform: 'translateY(-14px) rotate(1deg)' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(24px,-18px) scale(1.12)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pop: { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.5)' }, '100%': { transform: 'scale(1)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(22px)' }, to: { opacity: 1, transform: 'none' } },
        toast: { from: { opacity: 0, transform: 'translate(-50%,20px)' }, to: { opacity: 1, transform: 'translate(-50%,0)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-6deg)' }, '50%': { transform: 'rotate(6deg)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite', blob: 'blob 9s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite', pop: 'pop .45s ease', fadeUp: 'fadeUp .6s both',
        toast: 'toast .35s both', wiggle: 'wiggle 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
