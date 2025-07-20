```md
# 🐦 Twitter Clone – Full-Stack Blog Social App

A full-featured, modern Twitter-inspired social blogging platform built using **Next.js 15 App Router**, **Lucia Auth**, **Prisma**, and **Tailwind CSS**. This platform replicates many core functionalities of Twitter with a beautiful UI, optimized performance, and a highly scalable full-stack architecture.

> 📍 Live App: [twitter-clone-next-15.vercel.app](https://twitter-clone-next-15.vercel.app)  
> 📁 GitHub Repo: [github.com/ratul544388/twitter-clone](https://github.com/ratul544388/twitter-clone)

---

## ✨ Features

- 📝 Create, update, delete, and like posts (Tweets)
- 📌 Bookmark posts for later reading
- 🔔 Real-time notifications system
- 💬 Commenting, replying, and user mentions
- 🌙 Light/Dark theme switch with persistence
- 🧾 Rich text editor (TipTap)
- 📸 Profile customization with image cropping and uploading
- 📈 Infinite scrolling, virtualized feeds, and dynamic loading
- 🧠 Intelligent search with suggestions
- 🔐 Role-based, secure authentication (Lucia + Prisma)
- 🔗 Shareable links for profiles and posts
- 📱 100% Responsive, mobile-first design

---

## 🧠 Tech Stack

### 🖥 Frontend

- **Next.js 15 App Router**
- **Tailwind CSS** + **Radix UI** + **ShadCN UI**
- **React Query (TanStack)** for caching and data sync
- **TipTap Editor** for rich content
- **Lucide Icons**, **CMDK**, and **Headless UI**
- **Sonner Toasts** for clean notifications

### 🔧 Backend

- **Prisma ORM** with **PostgreSQL/MongoDB**
- **Lucia Auth** for modern authentication
- **Zod** for schema validation
- **UploadThing** for media storage
- **WebSocket / Real-time events** (via polling or future WS support)

---

## 🔐 Authentication

- User registration/login with **Lucia** and **Prisma Adapter**
- Optional OAuth strategies (Google, GitHub planned)
- JWT-secured API routes
- Session management with cookies

---

## 📂 Folder Structure

```

/app               # App router entry
/components        # UI and layout components
/hooks             # Custom React hooks
/libs              # Server utilities and services
/actions           # Server actions and API logic
/server            # Auth, DB, middlewares
/styles            # Tailwind and globals
/types             # Shared TypeScript types

````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ratul544388/twitter-clone.git
cd twitter-clone
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root with the following:

```env
DATABASE_URL=your_prisma_db_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_id

# Optional: Stream Chat, Email Services, etc.
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the Development Server

```bash
npm run dev
```

App runs at: `http://localhost:3000`

---

## 🖼️ Screenshots

> *(Add some screenshots or gifs showing post creation, like/bookmark UI, notifications, etc.)*

---

## 🧪 Testing

* Manual testing with various roles and states
* Integration and unit testing support using `Vitest` / `Playwright` (optional)
* ESLint + Prettier + Tailwind Plugin

---

## 🔧 Deployment

* Deployed on **Vercel**
* Prisma database hosted on **PlanetScale / MongoDB Atlas**
* Optional: Add your own domain and analytics

---

## 📌 Roadmap / TODOs

* [x] Bookmarking & Liking Posts
* [x] Real-time Notifications
* [ ] Direct Messaging (DMs)
* [ ] Hashtag / Trends Feed
* [ ] Media Gallery & Preview Support
* [ ] User Verification & Moderation
* [ ] REST & GraphQL API Support

---

## 🤝 Contributing

Contributions are welcome!
If you find a bug or want to request a feature, feel free to open an issue or submit a PR.

---

## 📄 License

This project is licensed under the **MIT License**.
You are free to use, fork, and customize it as per your needs.

---

## 📬 Contact

**Developer**: Ratul Hossain
📧 Email: [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
🌐 Portfolio: [ratuldev.vercel.app](https://ratuldev.vercel.app)
🐙 GitHub: [@ratul544388](https://github.com/ratul544388)

```
