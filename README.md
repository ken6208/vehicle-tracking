# 🚀 Admin Portal - Vehicle Tracking System (React + TypeScript + Node.js + PostgreSQL)

This repository contains a **full-stack vehicle tracking admin portal**, including:

- **Frontend**: React + TypeScript + Material UI (MUI)  
- **Backend**: Node.js + Express + Sequelize (PostgreSQL)  
- **Real-Time Tracking**: WebSocket server (Python)  
- **Database**: PostgreSQL  

---

## **🚀 Project Setup**
Follow these steps to set up and run the project:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/ken6208/vehicle-tracking.git
cd vehicle-tracking


## Backend Setup
#  Install Dependencies
cd backend
npm install

# Run Backend Server
npm run dev

## Frontend Setup
#  Install Dependencies
cd ../admin-frontend
npm install

#  Run Frontend
npm start

## WebSocket Server Setup
#  Install Python Dependencies
cd ../realtime-car-data
poetry install

#  Run WebSocket Server
poetry run python main.py



