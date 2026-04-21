# Rahima Store - Backend ⚙️

Serveur de l'application Rahima Store, développé avec **Node.js** et **Express**.

## 🛠️ Stack Technique
- **Serveur** : Node.js / Express
- **Base de données** : MongoDB via Mongoose
- **Authentification** : JWT (JSON Web Tokens) & Bcrypt
- **Logger** : Morgan
- **Notifications** : Web-Push
- **Documentation** : Swagger UI

## 📦 Installation
```bash
npm install
```

## 🚀 Lancer en développement
```bash
npm run dev
```

## 📂 Architecture
- `/config` : Paramètres DB, Swagger et Seeding.
- `/controllers` : Contrôleurs gérant la logique des endpoints.
- `/middleware` : Authentification, rôles et gestion centralisée des erreurs.
- `/models` : Schémas MongoDB.
- `/routes` : Définition des routes API.

## 📖 Documentation API
Une fois le serveur lancé, la documentation est disponible sur :
`http://localhost:5000/api-docs`

## 🔐 Variables d'Environnement
Copiez `.env.example` vers `.env` et remplissez les valeurs :
- `MONGODB_URI` : Lien vers votre base de données.
- `JWT_SECRET` : Clé secrète pour les tokens.
- `VAPID_PUBLIC_KEY` & `VAPID_PRIVATE_KEY` : Clés pour les notifications push.
