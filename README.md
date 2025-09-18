# Full-Stack Challenge Project

## Overview
This project implements the Full-Stack Practical Coding Challenges (Interview Edition):

1. **Challenge 1** — Data Processing & Rendering (50,000+ records)
2. **Challenge 2** — Tree & Hierarchy Rendering 
3. **Challenge 3** — Real-time Dashboard 

### Stack
- **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL, Swagger, Docker
- **Frontend:** Next.js, TypeScript, React
- **Testing:** Jest (backend), Vitest/Jest (frontend)
- **Realtime:** Socket.IO / WebSocket
- **Tooling:** ESLint, Prettier, .editorconfig

---

## Prerequisites
- Node.js >= 18
- Yarn
- Docker & Docker Compose
- PostgreSQL (if not using Docker)

---

## Setup
Backend + Postgres
docker-compose up -d
cd backend
yarn install
yarn seed       # Seed users, products, orders, nodes, etc.
yarn start:dev  # Start backend on port 3001

Frontend
cd frontend
yarn install
yarn dev       # Start frontend on port 3000
