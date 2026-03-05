# Travel CRM Full-Stack Application

A comprehensive Travel Booking CRM designed for travel agencies to manage leads, bookings, and traveler details. It features a complete dashboard to track conversions, handle statuses securely, and assign leads to agents. 

Built with **React 18 + Vite** on the frontend, and **Node.js + Express + Prisma (SQLite)** on the backend.

## Tech Stack
**Frontend (travel-crm/frontend):**
- React 18 (TypeScript) with Vite
- Tailwind CSS & shadcn/ui for sleek, modern UI components
- TanStack Query (React Query) & TanStack Table
- React Hook Form + Zod for robust client-side validation
- Axios & Sonner (toast notifications)

**Backend (travel-crm/travel-crm-backend):**
- Node.js & Express (TypeScript)
- Prisma ORM with SQLite database
- JWT Authentication & bcryptjs
- Zod for request body validation

## Setup Instructions

1. **Clone the repository** (if applicable) and navigate to the project root:
   ```bash
   git clone <your-repo-url>
   cd travel-crm
   ```

2. **Install root dependencies** (for concurrently):
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd travel-crm-backend && npm install
   ```

4. **Set up Backend Environment**:
   Inside the `travel-crm-backend` folder, duplicate `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to include a secure `JWT_SECRET` string.*

5. **Initialize the Database**:
   From the project root, run:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

6. **Seed the Database with default users**:
   ```bash
   npm run seed
   ```

7. **Install Frontend dependencies**:
   ```bash
   cd frontend && npm install
   ```

8. **Start the Application**:
   From the project root, start both frontend and backend concurrently:
   ```bash
   npm run dev
   ```

## Default Credentials

Once the database is seeded, you can log in with:
- **Admin**: `admin@travel.com` / `admin123`
- **Agent**: `agent@travel.com` / `agent123`

## API & Services
- **Backend API Base**: `http://localhost:5000/api`
- **Frontend App**: `http://localhost:5173`
- Database: SQLite file generated at `travel-crm-backend/prisma/dev.db`

## Key Integration Features & Fixes
- **Unified Contract Sync**: The Prisma schema exactly matches frontend TypeScript definitions to eliminate runtime mismatches when converting properties or mapping statuses.
- **Auto "Booked" Conversion flow**: When the frontend switches a booking status to `BOOKED` via the dropdown, the backend sets `isConvertedToEDT = true`. The frontend reacts immediately to open the Traveler detail modal.
- **Robust Role Authorization**: The backend securely enforces that Agents can only read, interact, or modify their explicitly assigned bookings. Admin has an unrestricted view.
- **Cross-Origin Security**: Backend CORS is strictly configured to permit `localhost:5173` providing strict cookie handling (if enabled) and origin checks.
