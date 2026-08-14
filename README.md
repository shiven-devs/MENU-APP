# Plate — QR digital menus

Multi-restaurant app: owners manage a menu in a dashboard; guests scan **one QR per restaurant** and browse (no cart, no payment).

## Stack

Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/ui, MongoDB + Mongoose, Auth.js (credentials), Cloudinary, `qrcode`.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `AUTH_SECRET` — run `npx auth secret`
   - `AUTH_URL` / `APP_URL` — `http://localhost:3000` locally; your real `https://…` URL in production (QR codes use `APP_URL`)
   - Cloudinary `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
3. `npm install` then `npm run dev`

## Routes

| URL | Who |
|---|---|
| `/` | Landing |
| `/signup`, `/login` | Restaurant owners |
| `/dashboard` | Overview, open/closed, **one** downloadable QR |
| `/dashboard/menu` | Categories and items |
| `/dashboard/settings` | Name, slug, photos, contact |
| `/r/[slug]` | Public guest menu (no login) |

`?table=` on the public URL is ignored for now. It is reserved if you later add cart + “this order is for table 4.”

## Deploy (Vercel)

- Import the repo, add the same env vars, set `APP_URL` to the production domain.
- MongoDB Atlas: allow Vercel IPs (or `0.0.0.0/0` on the free tier).
- Cloudinary: no extra setup beyond the three env vars.
