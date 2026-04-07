# 🛡️ SOC Training & Advanced Phishing Simulator

[![Platform: SOC-Sim](https://img.shields.io/badge/Platform-SOC--Sim-00ff88?style=for-the-badge&logo=securityscorecard)](https://github.com/op-h/Phishing_Simulator)
[![Engine: Next.js 16](https://img.shields.io/badge/Engine-Next.js%2016-teal?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

A high-performance, immersive **Security Operations Center (SOC)** training environment designed to simulate realistic social engineering attacks. This platform allows organizations to orchestrate, monitor, and analyze simulated Phishing, Smishing, Vishing, and Whaling missions with zero risk to actual infrastructure.

---

## 📌 The Vision: Why This Exists

In modern cybersecurity, the human element remains the most vulnerable vector. Traditional training is often static and boring. 

**Our mission** was to create a platform that:
- **Feels Real**: Uses high-fidelity templates (Google, Microsoft, Meta) to mirror actual threats.
- **Is Safe**: All "attacks" are 100% simulated. No emails actually leave the system unless explicitly configured.
- **Automates Learning**: Includes built-in "Simulated Bot Interaction" to provide instant feedback and analytics.
- **Localizes Content**: Specifically tuned for regional contexts (e.g., Iraqi phone patterns and identity simulation).

---

## 🚀 Key Features

### 1. Multi-Vector Orchestration
- **📧 Phishing**: High-trust email simulations.
- **📱 Smishing**: Mobile SMS-based social engineering.
- **📞 Vishing**: Voice/Phone-based simulated calls.
- **🐋 Whaling**: Targeted, executive-level "Big Fish" lures.

### 2. Intelligence Dashboard
Real-time tracking of mission success rates.
- **Telemetry**: Capture IP addresses, User Agents, and Timestamps.
- **Resilience Factor**: Automatically calculates your organization's "Security Posture" based on exposure rates.
- **Exportable Insights**: Generate reports for security audits.

### 3. Realistic Payload Templates
- Digital replicas of **Google Login**, **Microsoft 365**, **LinkedIn**, **Meta**, and **Apple ID**.
- Built with **Glassmorphism** and **HTB-inspired** aesthetics for a premium analyst experience.

### 4. Enterprise-Grade Architecture
- **PostgreSQL Persistence**: All mission data is stored securely and persists across cloud restarts.
- **Dockerized**: Ready for instant deployment on **DigitalOcean**, **AWS**, or **Azure**.
- **Prisma v6 Engine**: Optimized database queries for high-speed analytics.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Logic** | TypeScript / Node.js |
| **Database** | PostgreSQL / Prisma ORM |
| **Styling** | Vanilla CSS (Neon/Cyberpunk Aesthetic) |
| **Deployment** | Docker / DigitalOcean App Platform |

---

## ⚙️ How to Deploy

### Local Development
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/op-h/Phishing_Simulator.git
   cd Phishing_Simulator
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Database Setup**:
   Configure your `.env` with a `DATABASE_URL` (Postgres or SQLite).
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
4. **Launch**:
   ```bash
   npm run dev
   ```

### Cloud Deployment (DigitalOcean)
The platform is pre-configured for the **DigitalOcean App Platform**:
1. Connect your GitHub repository.
2. DigitalOcean will detect the `Dockerfile`.
3. Add a **Managed Postgres Database** to your App.
4. Set the `DATABASE_URL` environment variable.
5. Watch the `start.sh` script automatically sync your schema and seed templates!

---

## 🛡️ Security Disclaimer

This application is strictly for **educational and awareness training purposes**. It must only be used within controlled environments or with explicit permission from target participants. The developers are not responsible for any misuse of this software.

---

## 👥 Credits & Team

Created with passion for the cybersecurity community by:

- **Lead Architect & Design**: [oph](https://github.com/op-h) - *Motion effects and core system ডিজাইন*
- **Payload R&D**: Kawther - *Payload concept and lure logic*
- **Intelligence Visualization**: Saif - *Interactive vision and analytics UI*

---

<p align="center">
  <b>SOC Simulation Platform v1.0.8-STABLE</b><br/>
  "Empowering Human Defense through Realistic Simulation"
</p>
