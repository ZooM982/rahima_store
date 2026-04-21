# Rahima Store 🛍️

Rahima Store est une application de commerce électronique moderne (MERN Stack) spécialisée dans les produits de beauté et cosmétiques. Elle propose une expérience utilisateur premium, une interface d'administration complète et des fonctionnalités de notifications Push PWA.

## 🚀 Stack Technique

- **Frontend** : React.js, Vite, Tailwind CSS, Lucide React (Icônes).
- **Backend** : Node.js, Express.js.
- **Base de données** : MongoDB (Mongoose).
- **Notifications** : Web Push Protocol / VAPID.
- **Documentation API** : Swagger / OpenAPI.

---

## 📂 Structure du Projet

```text
rahima_store/
├── backend/            # API REST (Node/Express)
│   ├── config/         # Configuration (DB, Swagger, etc.)
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Authentification, Erreurs
│   ├── models/         # Schémas Mongoose
│   ├── routes/         # Définition des endpoints API
│   └── server.js      # Point d'entrée serveur
└── frontend/           # Application React (Vite)
    ├── src/
    │   ├── components/ # Composants réutilisables (UI, Home, Admin)
    │   ├── context/    # Gestion des contextes (Auth, Cart Providers)
    │   ├── hooks/      # Hooks personnalisés (useAuth, useCart)
    │   ├── pages/      # Pages de l'application
    │   └── services/   # Appels API (Axios)
    └── public/         # Assets statiques et Service Worker
```

---

## ⚙️ Installation & Configuration

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd rahima_store
```

### 2. Configurer le Backend
```bash
cd backend
npm install
cp .env.example .env # Puis éditez le fichier .env
```
Assurez-vous que MongoDB est lancé localement ou utilisez une URI MongoDB Atlas.

### 3. Configurer le Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
```

### 4. Lancer le projet (Développement)
Vous pouvez lancer les deux parties simultanément depuis la racine (si configuré) ou séparément :

**Backend :**
```bash
cd backend
npm run dev
```

**Frontend :**
```bash
cd frontend
npm run dev
```

---

## 🔐 Authentification & Rôles

Le projet gère deux types d'utilisateurs :
1. **Utilisateurs (Clients)** : Peuvent parcourir les produits, gérer leur panier et passer des commandes.
2. **Administrateurs** : Accès au tableau de bord (`/admin`) pour gérer les produits, les commandes et les utilisateurs. Un administrateur par défaut est créé au premier lancement (`seedAdmin`).

---

## 📖 Documentation API (Swagger)

L'API est entièrement documentée avec Swagger. Pour consulter la documentation et tester les endpoints :
1. Lancez le backend.
2. Ouvrez : [https://rahima-store-api.onrender.com/api-docs](https://rahima-store-api.onrender.com/api-docs)

---

## 🔔 Notifications Push & PWA

L'application est une **Progressive Web App (PWA)** installable.
- Le Service Worker (`sw.js`) gère la mise en cache et la réception des notifications en arrière-plan.
- Les administrateurs reçoivent des notifications Push en temps réel lors de nouvelles commandes.
- Les clés VAPID doivent être configurées dans le `.env` du backend.

---

## 👷 Instructions pour les Développeurs

- **Clean Code** : Toujours séparer les composants fonctionnels (`.jsx`) de la logique pure (`Hooks/Services`).
- **Styles** : Utiliser Tailwind CSS pour le design et `index.css` pour les variables globales de thème.
- **Fast Refresh** : Ne pas mélanger exports de composants et exports de fonctions dans le même fichier `.jsx` (cela casse le HMR de Vite). Utiliser le dossier `hooks/` pour les fonctions exportées.

---

## 📝 Licence
Ce projet est développé pour **Rahima Store**. Tous droits réservés.
