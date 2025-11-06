# Fort Spring UI

A**React + TypeScript + Tailwind CSS** frontend built to showcase user authentication and profile management for the **FortSpring Security API** — a Spring Boot backend providing JWT-based authentication.

This frontend consumes endpoints like:

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/profile`
- `PUT /api/update` *(optional)*

---

## Features

- **JWT-based authentication** (login/register/logout)
- **User profile management** (view + update)
- Built with **Vite + React + TypeScript**
- Styled using **Tailwind CSS**
- Integrated with **Spring Boot backend (FortSpring Security API)**
- Modular folder structure ready for scaling

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [React 18+](https://react.dev/) |
| Build Tool | [Vite 6+](https://vitejs.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| State | React Hooks / Context API |
| Backend | [Spring Boot 3 (Kotlin)](https://spring.io/projects/spring-boot) |
| Auth | JWT tokens stored in localStorage |

---

## Project Setup

### Prerequisites
- Node.js ≥ 18+
- npm or yarn
- Running backend API (`FortSpring Security API`) at:
  ```
  http://localhost:8080/api
  ```

---

### Clone the Repository

```bash
git clone https://github.com/Killercavin/fortspring-ui.git
cd fortspring-ui
```

---

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### Run the Development Server

```bash
npm run dev
```

Vite will start a local server at:

 **http://localhost:5173**

---

## Folder Structure

```
fortspring-ui/
├── src/
│   ├── api/
│   │   └── AxiosClient.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   ├── pages/
│   │   ├── RegisterPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── Home.tsx
│   ├── index.css
│   ├── main.tsx
│   └── App.tsx
├── public/
├── .env
├── tailwind.config.js
├── package.json
├── LICENSE
└── README.md
```

---

## Authentication Flow

1. **Register** → POST `/register` with `{ firstName, lastName, email, password, role? }`
2. **Login** → POST `/login` → receive JWT token
3. **Store token** → `localStorage.setItem("token", jwt)`
4. **Authenticated requests** → attach `Authorization: Bearer <token>` header
5. **Profile** → GET `/profile` to retrieve user info
6. **Logout** → clear token + redirect to login

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Cavin (Killercavin)**  
Backend: Kotlin + Spring Boot  
Frontend: React + TypeScript + Tailwind  

> _“Building secure, elegant, and modular full-stack systems.”_

---

## Next Steps

- [ ] Add toast notifications  
- [ ] Add global AuthContext  
- [ ] Add logout + protected routes  
- [ ] Deploy frontend to Vercel  
- [ ] Connect backend via public API endpoint  

---

**Repository structure:**
- `fortspring-security` → Backend (Spring Boot + Kotlin) - [Backend Repo](https://github.com/Killercavin)
- `fortspring-ui` → Frontend (React + TS + Tailwind)
