---
title: Setup locally
---

## Follow these steps to run your ChaiBuilder site locally.

---

## 1. 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Git](https://git-scm.com/)
- pnpm _(optional but preferred)_

---

## 2. 📁 Clone the Repository

```bash
git clone https://github.com/chaibuilder/chaibuilder-nextjs.git
cd chaibuilder-nextjs
```

---

## 3. ⚙️ Install Dependencies

Using pnpm:

```bash
npm install
```

---

## 4. 🔐 Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following:

```env
CHAIBUILDER_API_KEY=your_chaibuilder_api_key
CHAIBUILDER_WEBHOOK_SECRET=your_custom_webhook_secret
```

You can find your API key and manage your site [here](https://chaibuilder.com/sites).

---

## 5. ▶️ Run the Dev Server

```bash
npm run dev
```

---

## 6. Login to your local builder

Open [http://localhost:3000/chai](http://localhost:3000/chai) in your browser and log in using ChaiBuilder credentials.

---

## ✅ You're Ready!

Your ChaiBuilder site should now be running locally. Make changes and see them live instantly. Start building!
