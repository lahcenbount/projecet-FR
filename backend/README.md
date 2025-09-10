# Backend API - AutoLink Authentication

## 🚀 Démarrage rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'environnement
Créez un fichier `.env` basé sur `env.example`:
```bash
cp env.example .env
```

Modifiez les valeurs dans `.env` selon votre configuration.

### 3. Démarrage du serveur
```bash
# Production
npm start

# Développement (avec auto-restart)
npm run dev
```

## 📋 API Endpoints

### 🔐 Authentification

#### POST /api/auth/register
Inscription d'un nouvel utilisateur

**Body (JSON):**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "motDePasse": "motdepasse123"
}
```

**Réponse de succès (201):**
```json
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "utilisateur": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@example.com",
      "role": "user",
      "dateCreation": "2024-01-15T10:30:00.000Z",
      "estActif": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /api/auth/login
Connexion d'un utilisateur

**Body (JSON):**
```json
{
  "email": "jean.dupont@example.com",
  "motDePasse": "motdepasse123"
}
```

**Réponse de succès (200):**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "utilisateur": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET /api/auth/profile
Obtenir le profil utilisateur (authentifié)

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse de succès (200):**
```json
{
  "success": true,
  "data": {
    "utilisateur": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@example.com",
      "role": "user"
    }
  }
}
```

### 🧪 Test

#### GET /api/auth/test
Test de l'API d'authentification

**Réponse:**
```json
{
  "success": true,
  "message": "API d'authentification fonctionnelle",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "endpoints": {
    "register": "POST /api/auth/register",
    "login": "POST /api/auth/login",
    "profile": "GET /api/auth/profile (authentifié)"
  }
}
```

#### GET /health
Santé du serveur

**Réponse:**
```json
{
  "success": true,
  "message": "Serveur en bonne santé",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "memory": {...},
  "environment": "development"
}
```

## 🔧 Configuration

### Variables d'environnement
- `MONGO_URI`: URL de connexion MongoDB
- `JWT_SECRET`: Clé secrète pour JWT
- `PORT`: Port du serveur (défaut: 5000)
- `NODE_ENV`: Environnement (development/production)
- `FRONTEND_URL`: URL du frontend pour CORS

### Structure du projet
```
backend/
├── config/
│   └── db.js              # Configuration MongoDB
├── controllers/
│   └── authController.js  # Contrôleurs d'authentification
├── middleware/
│   └── authMiddleware.js  # Middleware d'authentification
├── models/
│   └── User.js           # Modèle utilisateur
├── routes/
│   └── authRoutes.js     # Routes d'authentification
├── server.js             # Serveur principal
└── package.json
```

### Base de données
Le modèle User inclut:
- `nom`: Nom de famille (requis)
- `prenom`: Prénom (requis)
- `email`: Email unique (requis)
- `motDePasse`: Mot de passe hashé (requis)
- `role`: Rôle utilisateur (user/admin)
- `dateCreation`: Date de création
- `estActif`: Statut actif

## 🔒 Sécurité
- Mots de passe hashés avec bcrypt (salt: 12)
- Validation des emails
- Tokens JWT pour l'authentification (expiration: 7 jours)
- Validation des données d'entrée
- Middleware d'authentification
- CORS configuré
- Gestion des erreurs sécurisée

## 🧪 Tests avec cURL

```bash
# Test de l'API
curl -X GET http://localhost:5000/api/auth/test

# Test d'inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "test@example.com",
    "motDePasse": "password123"
  }'

# Test de connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "motDePasse": "password123"
  }'

# Test du profil (remplacer <token> par le token reçu)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

## 🚀 Déploiement
Le serveur est prêt pour le déploiement avec:
- Gestion gracieuse des arrêts
- Logs détaillés
- Configuration d'environnement
- Gestion d'erreurs robuste
