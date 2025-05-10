---
title: Deploy to Vercel
---

You can easily deploy your site built on [ChaiBuilder.com](http://chaibuilder.com/) to Vercel.

### 🔁 One-Click Deployment

Click the link below to instantly deploy the ChaiBuilder template to Vercel:

> **👉** [**Deploy to Vercel**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaibuilder%2Fchaibuilder-nextjs&env=CHAIBUILDER_API_KEY%2CCHAIBUILDER_WEBHOOK_SECRET&envDescription=CHAIBUILDER_API_KEY%20is%20needed%20to%20access%20the%20builder.%20CHAIBUILDER_WEBHOOK_SECRET%20is%20a%20custom%20key%20you%20can%20set%20for%20your%20site&envLink=https%3A%2F%2Fchaibuilder.com%2Fsites&repository-name=chaibuilder-nextjs)

**Required Environment Variables:**

- `CHAIBUILDER_API_KEY` – Required to access the builder
- `CHAIBUILDER_WEBHOOK_SECRET` – A secret key for your site (can be custom)

Set these in the deployment form or later in your Vercel project settings.

---

### 🛠️ Manual Deployment Steps

If you prefer to deploy manually:

1. **Fork or Clone the Repo**  
   [https://github.com/chaibuilder/chaibuilder-nextjs](https://github.com/chaibuilder/chaibuilder-nextjs)

2. **Push to GitHub**  
   Upload the forked repo to your own GitHub account.

3. **Create a Vercel Project**  
   Go to [https://vercel.com/new](https://vercel.com/new) and import your repository.

4. **Set Environment Variables**  
   In the Vercel dashboard, navigate to your project → Settings → Environment Variables:

   - `CHAIBUILDER_API_KEY`
   - `CHAIBUILDER_WEBHOOK_SECRET`

5. **Deploy**  
   Click **Deploy** and your site will be live shortly.

---

Once your deployment is complete, visit the `/chai` route on your deployed site to access Chai Builder.  
Login with your credentials and [start creating your pages](/docs/editors/creating-new-page).
