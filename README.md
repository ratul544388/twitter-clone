````md
# 🐦 Twitter Clone – Full-Stack Blog Social App

A full-featured, modern Twitter-inspired social blogging platform built using **Next.js 15 App Router**, **Lucia Auth**, **Prisma**, and **Tailwind CSS**. This platform replicates many core functionalities of Twitter with a beautiful UI, optimized performance, and a highly scalable full-stack architecture.

🔗 **Live Demo**: [twitter-clone-next-15.vercel.app](https://twitter-clone-next-15.vercel.app)  
📁 **Repository**: [GitHub – ratul544388/twitter-clone](https://github.com/ratul544388/twitter-clone)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: Tailwind CSS, Radix UI, ShadCN UI
- **Editor**: TipTap
- **Icons & UI**: Lucide Icons, CMDK, Headless UI
- **Data Sync**: React Query (TanStack)
- **Toasts**: Sonner

### 🔹 Backend & APIs
- **ORM**: Prisma with PostgreSQL/MongoDB
- **Authentication**: Lucia Auth
- **Validation**: Zod
- **File Uploads**: UploadThing
- **Real-Time**: Polling or future WebSocket support

### 🔹 Dev Tools
- TypeScript
- ESLint + Prettier + Tailwind Plugin
- Vitest / Playwright (optional testing)
- Vercel (deployment)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ratul544388/twitter-clone.git
cd twitter-clone
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file and include the following:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### 4. Prisma setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see it in action.

---

## 🧪 Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run start` – Start production server
* `npm run lint` – Run ESLint

---

## ✨ Features

* 📝 Create, update, delete, and like posts (Tweets)
* 📌 Bookmark posts for later reading
* 🔔 Real-time notifications system
* 💬 Commenting, replying, and user mentions
* 🌙 Light/Dark theme switch with persistence
* 🧾 Rich text editor (TipTap)
* 📸 Profile customization with image cropping and uploading
* 📈 Infinite scrolling, virtualized feeds, and dynamic loading
* 🧠 Intelligent search with suggestions
* 🔐 Role-based, secure authentication (Lucia + Prisma)
* 🔗 Shareable links for profiles and posts
* 📱 100% responsive, mobile-first design

---

## 🛡️ Authentication

* User registration/login with **Lucia Auth**
* Optional OAuth strategies (Google, GitHub – planned)
* Secure session management using cookies and JWT

---

## 💳 Payments

> *(Not applicable for this project)*

---

## 🖼️ Screenshots

> *(Add relevant screenshots or GIFs showing UI, features, etc.)*

---

## 🧪 Testing

* Manual QA across roles and states
* Integration & unit test support with `Vitest` / `Playwright`
* Linting and formatting enforced

---

## 📌 Roadmap

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
Found a bug or have a feature request? Feel free to open an issue or submit a PR.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Ratul Hossain**
📍 Dhaka, Bangladesh
📧 Email: [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
🔗 [Portfolio](https://ratulcodes.vercel.app) • [GitHub](https://github.com/ratul544388)

```
```
