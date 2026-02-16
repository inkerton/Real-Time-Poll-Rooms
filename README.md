# 🗳️ Real-Time Poll Rooms

A high-performance, full-stack polling application built with **Next.js 15**, **Prisma 7**, and **Pusher**. This project allows users to create polls, share them via unique links, and watch results update in real-time without refreshing.

## 📖 Project Overview

This project was developed as a technical assessment for a Full-Stack Internship. The objective was to build a web application that enables users to create polls and collect votes with results updating in real-time for all viewers.

### 📋 Assignment Requirements (Success Criteria)

* **Poll Creation:** Users can create a poll with a question and multiple options, generating a shareable link.
* **Join by Link:** Anyone with the link can view and vote (single-choice).
* **Real-time Results:** Results update instantly across all clients without page refreshes.
* **Fairness / Anti-Abuse:** Implementation of at least two mechanisms to reduce repeat/abusive voting.
* **Persistence:** All polls and votes are stored in a database to ensure data is not lost on refresh.
* **Deployment:** Publicly accessible URL.

---

## 🚀 Live Demo & Repository

* **Live URL:** [Insert your Vercel Link here]
* **GitHub:** [Insert your Repo Link here]

---

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Database:** PostgreSQL (via Supabase/Neon)
* **ORM:** Prisma 7 (using the new Rust-free Driver Adapters)
* **Real-time:** Pusher Channels
* **UI Components:** Shadcn UI + Tailwind CSS
* **Deployment:** Vercel

## 🛡️ Fairness & Anti-Abuse Mechanisms

To satisfy the project requirements for preventing repeat/abusive voting, I implemented two distinct layers of control:

1. **Client-Side Fingerprinting (Voter Token):**
* **How it works:** Upon the first visit, a unique UUID is generated and stored in the user's `localStorage` or `cookie`.
* **What it prevents:** Prevents "casual" repeat voting where a user simply refreshes the page to vote again.


2. **Server-Side IP Mapping:**
* **How it works:** The database stores the hashed IP address of each vote.
* **What it prevents:** Prevents automated bot scripts from a single source from spamming the API.
* **Limitation:** This allows multiple people on the same network (e.g., a school or office) to vote while still blocking a single bad actor.



## ⚙️ Key Technical Challenges Handled

### Prisma 7 Edge Compatibility

I transitioned the project to **Prisma 7**, utilizing the new `prisma.config.ts` and **Driver Adapters**. This ensures the application is compatible with **Edge Runtimes** and avoids the common "IPv6-only" connection issues found on serverless platforms like Vercel by utilizing a **Transaction Pooler**.

### Real-Time Synchronization

Instead of polling the database every few seconds, I implemented a **WebSocket-based event bus** via Pusher.

1. User votes  API updates DB.
2. API triggers a `new-vote` event.
3. All connected clients receive the event and re-fetch only the necessary data.

## 🛠️ Installation & Setup

1. **Clone the repo:** `git clone <your-repo-url>`
2. **Install dependencies:** `npm install`
3. **Setup Environment Variables:**
Create a `.env` file with your `DATABASE_URL` (Pooler version), `PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_KEY`, and `PUSHER_SECRET`.
4. **Sync Database:** `npx prisma migrate dev`
5. **Run Dev Server:** `npm run dev`

## 🔮 Future Improvements

* **Optimistic Updates:** Implement React `useOptimistic` to show vote changes instantly before server confirmation.
* **Data Visualization:** Integrate `Recharts` for more advanced graphical representations of poll data.

---

### Final Submission Checklist

Before you hit "Submit" on that Google Form:

1. **Check the URL:** Open your deployed Vercel link in an Incognito window to make sure it loads.
2. **Test a Vote:** Cast a vote and make sure the progress bar moves.
3. **Repo Public:** Ensure your GitHub repository is set to **Public** so the recruiters can see it!

**Good luck with the internship application! Is there anything else you need before you submit?**
