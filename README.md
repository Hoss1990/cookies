# Cookies & Co — Next.js (JSX) + Tailwind

    npm install
    cp .env.example .env.local   # numéro WhatsApp qui reçoit les commandes
    npm run dev

Structure : `src/app`, `src/components`, `src/lib` (alias `@/` = `src/`).

- Produits, prix, avis : `src/lib/data.js`
- Photos : déposez-les dans `public/images/produits`, `public/images/atelier`, `public/images/galerie`
  et vérifiez les noms/extensions dans `src/lib/images.js`.
- Commande : panier -> formulaire -> ouverture de `wa.me/<numéro>?text=...` avec le récapitulatif
