# 💸 Expense Tracker

A full-stack Expense Tracker web application to record, analyze, and report personal or organizational spending efficiently. Built with **React**, **Node.js**, **PostgreSQL**, and **Styled Components**.

---

## 🚀 Features

- ✅ Add and viewexpenses and admin has the ability to approve or reject it
- 📊 Visualize spending with charts
- 🧾 Download reports in CSV format
- 🔐 Authentication & role-based access system (Admin/User)
- 🧠 Logging for most of events (login , logout, expense creation, status update)
- 🌐 Hosted on: [Live URL](https://expense-tracker-1-haxz.onrender.com) 

---

## 🧱 Tech Stack

### Frontend
- React (with Hooks & Context)
- Styled Components
- Axios for API calls
- Recharts for charts

### Backend
- Node.js + Express
- PostgreSQL 
- JWT for authentication

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js and npm
- PostgreSQL (with pgAdmin recommended)
- Git

### Clone the Repo

```bash
git clone https://github.com/Nitin-Anil-Narang/Expense_Tracker.git
cd expense-tracker
```

# For Backend
## First make your own .env file and fill it with all the details(the template for .env is given in the code in both the frontend and backend)
 ```bash 
    cd backend
    npm install
    npm start
```

# For Frontend
## First make your own .env file and fill it with all the details(the template for .env is given in the code in both the frontend and backend)
```bash
   cd frontend
   npm install
```

## Then update the API base URL inside config/axiosApi.js
```code
const axiosApi = axios.create({
  baseURL: 'http://localhost:4000', //your backend url with port
});
```

## Then you can run Frontend 
```bash 
npm run dev
```

# 🧪 Testing
## You can use Vitest for frontend unit tests:


```bash
cd frontent
npm run test 
npm run test:ui (For testing with GUI)
```

# 🧠 Architecture Notes
React Context API is used for managing authentication state.

Expense and Log models are separated but related via timestamps and user roles.

Logs are recorded automatically on every login and major event.

CSV generation is triggered manually and handled server-side.

PostgreSQL is set to IST timezone (Asia/Kolkata).

# (Future Features and upgrades)

Filter and seacrhable expenses for user and admin.

Super admin to make various admins and overlooking all admin tasks.

Better structure and visual for UX.

More Unit Test as now there is only one.

Fix Timezones for better global usage.

More to come....


## ⚖️ Trade-Offs

| Decision                        | Pros                                      | Cons                                           |
| ------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| **Context API for auth state**  | Simple and lightweight                    | Not ideal for deep trees or large global state |
| **Styled Components**           | Scoped styles, easy theming               | Slightly increases bundle size                 |
| **CSV generation on backend**   | Handles large data, consistent formatting | Adds backend processing load                   |
| **React + Vite**                | Fast dev build, modern                    | Slightly newer ecosystem than Webpack          |
| **JWT auth**                    | Stateless and scalable                    | Token invalidation requires extra logic        |
| **Separate admin/user logs**    | Better tracking and filtering             | More code and DB space to maintain             |
| **SPA model (React)**           | Smooth user experience                    | Not SEO-friendly without SSR                   |
| **No Redux or Zustand**         | Less boilerplate                          | Harder to scale shared state later             |
| **Hardcoded IST timezone**      | Local consistency                         | Poor for global use cases                      |
| **Manual CSV export**           | Clear and controllable                    | No scheduled reports or automation             |



# ScreenShots 
![alt text](<screenshots/Screenshot 2025-07-22 at 6.00.57 PM.png>)
#
![alt text](<screenshots/Screenshot 2025-07-22 at 6.01.06 PM.png>)
#
![alt text](<screenshots/Screenshot 2025-07-22 at 6.01.50 PM.png>)
#
![alt text](<screenshots/Screenshot 2025-07-22 at 6.01.41 PM.png>)
#
![alt text](<screenshots/Screenshot 2025-07-22 at 6.01.13 PM.png>) 
#
![alt text](<screenshots/Screenshot 2025-07-22 at 6.01.57 PM.png>)
# 
![alt text](<screenshots/Screenshot 2025-07-22 at 6.02.04 PM.png>)