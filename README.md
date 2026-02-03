# Habits - Your Habits Tracker

A full-stack habits and wellness tracker that helps you log water intake, track food consumption, set goals, and monitor your progress over time. Built with a modern React frontend and Node.js backend, with authentication, dashboards, and insights.

---

## 1. Deployed Links

|              | URL                                       |
| ------------ | ----------------------------------------- |
| **Frontend** | https://habits.itssourav.online |
| **Backend**  | https://api-habit.itssourav.online/api    |

### GitHub Repositories

- **Frontend:** https://github.com/sourav0809/habits-client
- **Backend:** https://github.com/sourav0809/habits-server

---

## 2. Tech Stack

**Frontend:** React, Vite, TypeScript, Tailwind CSS, React Query, shadcn/ui

**Backend:** Express, TypeScript, MongoDB, Mongoose

**Deployment:** Vercel (frontend), AWS EC2 (backend), GitHub CI/CD

---

## 3. Startup Instructions

**Clone the project**

```bash
git clone https://github.com/sourav0809/habits-client.git
cd habits-client
```

**Install dependencies**

```bash
npm install
```

**Configure environment**

Copy env variables from `env_examples` into a `.env` file and set values for your local setup:

- `VITE_API_ROOT` – backend API base URL (e.g. `http://localhost:3000/api`)
- `VITE_GOOGLE_AUTH_CLIENT_ID` – Google OAuth client ID (for Google login)
- `VITE_ENVIRONMENT` – optional: `development` | `staging` | `production`

**Run the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 4. Features

- **Authentication** – Email/password sign up and login, plus Google OAuth
- **Dashboard** – Overview with stats, water and calories charts, goal progress, and quick actions
- **Water tracking** – Log daily water intake and view hydration insights over time
- **Food consumption** – Add, edit, and delete food entries with calories and date range filtering
- **My meals** – Manage your food items with add/edit/delete and charts (kcal, density, etc.)
- **Goals** – Set and update calorie and water goals and track achievement trends
- **Profile** – View and manage your profile and avatar
- **Protected routes** – Auth and guest guards for secure navigation
- **Responsive UI** – Layout and components built with shadcn/ui and Tailwind CSS
