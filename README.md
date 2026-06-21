# Marriage Biodata Builder

A full-stack web app to create, preview, and share marriage biodata. Pick a
template, fill your details once, see a live preview, save, and get a public
shareable link like `/profile/shiv-poojan-pal`.

## Tech stack

- **Frontend:** React (Vite), Redux Toolkit, RTK Query, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), Cloudinary

## Architecture

Templates and profile data are completely separated. The user enters their
information once into a single `profileData` object in Redux, and any template
can render it. The backend stores only the data plus a `templateId` — never the
rendering logic.

```
src/
├── templates/          # Biodata template components + registry (render from data)
├── components/
│   ├── forms/          # Reusable per-section form components
│   ├── layout/         # Navbar, Footer, Layout
│   └── ui/             # Buttons, fields, spinner
├── pages/              # Home, Templates, CreateProfile, PreviewProfile, PublicProfile
├── redux/              # store + slices (profile, template)
├── services/           # RTK Query API + save hook
└── App.jsx

server/
├── src/
│   ├── config/         # db + cloudinary
│   ├── controllers/    # template, profile, upload
│   ├── data/           # template metadata
│   ├── middleware/     # multer upload, error handler
│   ├── models/         # Profile (Mongoose)
│   ├── routes/         # template, profile, upload routes
│   ├── utils/          # unique slug generation
│   ├── app.js          # Express app factory
│   └── index.js        # server entry
```

## API

| Method | Endpoint                     | Description                         |
| ------ | ---------------------------- | ----------------------------------- |
| GET    | `/api/templates`             | List available templates            |
| POST   | `/api/profile`               | Create a profile (returns slug)     |
| GET    | `/api/profile/:slug`         | Fetch a public profile by slug      |
| PUT    | `/api/profile/:id`           | Update a profile                    |
| DELETE | `/api/profile/:id`           | Delete a profile                    |
| POST   | `/api/upload/profile-photo`  | Upload profile photo (field: image) |
| POST   | `/api/upload/gallery`        | Upload gallery (field: images)      |

## Getting started

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in MongoDB + Cloudinary credentials
npm run dev            # starts API on http://localhost:5000
```

Required env vars (`server/.env`):

- `MONGODB_URI` — MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — for image uploads
- `CLIENT_URL` — frontend origin for CORS (default `http://localhost:5173`)

### 2. Frontend

```bash
# from the project root
npm install
npm run dev            # starts Vite on http://localhost:5173
```

The dev server proxies `/api` to `http://localhost:5000`, so no extra config is
needed locally. For production, set `VITE_API_URL` (see `.env.example`).

## How it works

1. Browse templates and pick one.
2. Fill the profile sections (Basic, Education, Family, About, Partner, Photos).
3. Watch the live preview update as you type.
4. Save — the server generates a unique slug.
5. Share the public profile URL with anyone.

## Notes

- Image uploads require Cloudinary credentials; without them the upload
  endpoints return `503` and the rest of the app still works.
- Public profile pages render without the app chrome and support Print / Save as PDF.

## Roadmap

PDF download, QR code, premium templates, user dashboard, and an AI bio generator.
