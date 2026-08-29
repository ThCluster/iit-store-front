# 🔗 Comment le frontend communique avec le backend

Ce document explique **simplement** comment votre frontend React (iit-store-front) va communiquer avec votre backend Django.

---

## 🧠 Le principe en une phrase

> Le frontend **envoie des requêtes HTTP** (via `fetch`) vers des **URLs** du backend, qui **répond avec des données JSON**.

C'est comme **commander dans un restaurant** :
- Le frontend = le **client** qui commande
- Le backend = le **cuisinier** qui prépare
- Les URLs = le **menu** (les plats disponibles)
- Le JSON = le **plat servi** (les données)

---

## 📡 Les 3 éléments essentiels

### 1. Le frontend fait des requêtes (`fetch`)

Dans votre code, vous utilisez déjà `fetch` :

```ts
// src/features/products/api/getProducts.ts
export async function getProducts() {
  const res = await fetch('/api/products')   // ← requête HTTP
  if (!res.ok) throw new Error('Erreur')
  return res.json()                          // ← réponse JSON
}
```

### 2. Le backend expose des URLs (Django)

Côté Django, vous créez des **endpoints** avec Django REST Framework :

```python
# urls.py (backend Django)
from django.urls import path
from .views import ProductList

urlpatterns = [
    path('api/products/', ProductList.as_view()),  # ← l'URL que le frontend appelle
]
```

### 3. Le proxy relie les deux

Le frontend tourne sur `http://localhost:5173` et le backend sur `http://localhost:8000`. Pour que `/api/products` du frontend atteigne le backend, on configure un **proxy**.

---

## ⚙️ Configuration du proxy (Vite)

Dans `vite.config.ts`, on dit à Vite : *"quand le frontend appelle `/api`, redirige vers le backend"*.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // ← adresse du backend Django
        changeOrigin: true,
      },
    },
  },
})
```

**Résultat** :
- Le frontend appelle `fetch('/api/products')`
- Vite redirige vers `http://localhost:8000/api/products`
- Django répond avec les données JSON

---

## 🔄 Le cycle complet (exemple : afficher les produits)

```
1. Le frontend charge la page Produits
2. Le hook useProducts() appelle getProducts()
3. getProducts() fait fetch('/api/products')
4. Vite redirige vers http://localhost:8000/api/products
5. Django reçoit la requête, interroge la base de données
6. Django renvoie la réponse JSON : [{ "id": 1, "name": "Téléphone", ... }]
7. Le frontend reçoit le JSON et l'affiche
```

---

## 🔐 L'authentification (tokens)

Pour les pages protégées (dashboard, panier), le frontend doit prouver qu'il est connecté. On utilise des **tokens JWT**.

### Comment ça marche

```
1. Le client se connecte : POST /api/auth/login
   → envoie { email, password }

2. Django vérifie et renvoie un TOKEN :
   → { "access": "eyJhbGciOi...", "refresh": "eyJhbGciOi..." }

3. Le frontend stocke le token (localStorage)

4. Pour chaque requête protégée, le frontend envoie le token :
   → Authorization: Bearer eyJhbGciOi...

5. Django vérifie le token et répond
```

### Exemple de code frontend

```ts
// Connexion
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
const { access } = await res.json()
localStorage.setItem('token', access)

// Requête protégée (ex : mes commandes)
const res = await fetch('/api/orders/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
})
```

---

## 📦 Les données de démo → API réelle

Actuellement, votre frontend utilise des **données de démo** (codées en dur). Pour connecter le backend, il faut remplacer ces données par des appels API.

### Exemple : le panier

**Avant (démo)** :
```ts
const demoCartItems = [
  { id: 'p1', name: 'Smartphone', price: 299990, ... }
]
```

**Après (API)** :
```ts
const res = await fetch('/api/cart/')
const items = await res.json()
```

---

## 🗂️ Les endpoints API à créer côté Django

Voici les endpoints que votre frontend attend :

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/products/` | Liste des produits |
| GET | `/api/products/:id/` | Détail d'un produit |
| POST | `/api/auth/register/` | Inscription |
| POST | `/api/auth/login/` | Connexion (renvoie token) |
| GET | `/api/cart/` | Contenu du panier |
| POST | `/api/cart/add/` | Ajouter au panier |
| GET | `/api/orders/` | Mes commandes |
| POST | `/api/orders/create/` | Créer une commande |
| GET | `/api/favorites/` | Mes favoris |
| GET | `/api/reviews/` | Avis produits |
| GET | `/api/countries/` | Pays (django-cities-light) |
| GET | `/api/countries/:code/cities/` | Villes d'un pays |

---

## ✅ Récapitulatif des étapes

1. **Backend Django** : créer les modèles + les endpoints API (Django REST Framework)
2. **Lancer le backend** : `python manage.py runserver` (sur `http://localhost:8000`)
3. **Configurer le proxy** dans `vite.config.ts`
4. **Remplacer les données de démo** par les appels API
5. **Implémenter l'authentification** (tokens JWT)

---

## 🚀 Commandes utiles

| Côté | Commande | Port |
|------|----------|------|
| Frontend | `npm run dev` | `http://localhost:5173` |
| Backend | `python manage.py runserver` | `http://localhost:8000` |

---

🎉 **Bravo !** Vous comprenez maintenant comment le frontend et le backend communiquent. Quand votre backend sera prêt, il suffira de suivre ces étapes pour tout connecter.