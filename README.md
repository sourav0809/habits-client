# Foodie

A modern, responsive recipe search application that allows users to browse, filter, and search recipes from TheMealDB API. Built with React, TypeScript, and TailwindCSS, featuring voice search capabilities and a beautiful, intuitive user interface.

## Live Link

https://foodie.itssourav.online/

## Github Repo Link

https://github.com/sourav0809/foodie

## Setup Instructions

1. Clone the project
```bash
git clone https://github.com/sourav0809/foodie.git
cd foodie
```

2. Install dependencies
```bash
npm i
```

3. Start development server
```bash
npm run dev
```

Your project will be live at `http://localhost:5173`

## Features

- 🔍 **Recipe Search**: Real-time search with debouncing for instant results
- 🎤 **Voice Search**: Search recipes using voice recognition (Bonus Feature)
- 🏷️ **Category Filtering**: Filter recipes by category (Chicken, Seafood, Dessert, etc.)
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui components
- ⚡ **Fast Performance**: React Query for efficient data fetching and caching
- 📄 **Recipe Details**: Detailed view with ingredients, instructions, and cooking steps
- 👤 **User Profile**: Profile page with favorites, stats, and activity

## Pages

- **Home Page** (`/`): Browse recipes with search, category filters, and voice search
- **Recipe Details** (`/recipe/:id`): View detailed recipe information including ingredients, instructions, and cooking steps
- **Profile Page** (`/profile`): User profile with favorite recipes, statistics, recent activity, and achievements

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS 4
- React Query
- React Router
- shadcn/ui
- Framer Motion
- Axios
