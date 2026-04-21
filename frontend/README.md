# Rahima Store - Frontend 🛍️

Cette partie du projet contient l'interface utilisateur de Rahima Store, développée avec **React** et **Vite**.

## 🛠️ Stack Technique
- **Framework** : React 18+
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Gestion d'état** : React Context API
- **Appels API** : Axios

## 📦 Installation
```bash
npm install
```

## 🚀 Lancer en développement
```bash
npm run dev
```

## 🏗️ Structure du Projet
- `src/components` : Composants UI réutilisables.
- `src/context` : Fournisseurs de données globaux (Auth, Cart).
- `src/hooks` : Logique extraite (useAuth, useCart).
- `src/pages` : Composants de page (Home, Boutique, Admin, etc.).
- `src/services` : Services de communication avec le backend.

## 📱 PWA & Offline
Ce projet est configuré comme une **PWA**. Le fichier `public/sw.js` gère le cache et les notifications Push.
Vous pouvez installer l'application sur mobile ou bureau comme une application native.

## 💡 Notes importantes
- L'URL de l'API est configurée via la variable d'environnement `VITE_API_URL` dans le fichier `.env`.
- Pour garder le **HMR (Hot Module Replacement)** fonctionnel, évitez d'exporter des fonctions non-composants (comme des hooks ou des constantes) directement depuis les fichiers `.jsx`. Utilisez le dossier `hooks/` pour cela.
