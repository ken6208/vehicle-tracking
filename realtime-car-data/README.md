# Admin Portal Technical Test

This project simulates a simplified admin portal for vehicle tracking. You’ll build a **Node.js + TypeScript** application (frontend + backend) with the following features:

---

## 1. Real-Time Car Location

- **Data Source**: A Python WebSocket server (already provided in this repository) that streams the car’s coordinates every 500ms.
- **Task**: Subscribe to the WebSocket (`ws://localhost:8765`) and display the car’s current position on a map.
  - **Map Choice**: Either OpenStreetMap (no API key needed) or Google Maps (API key required).

---

## 2. Trips CRUD API

- **Attributes**: `id`, `startDateTime`, `endDateTime`, `price`, `vehicleId`, `startLocation`, `endLocation`.
- **Operations**: Provide an API to create, read, update, and delete (CRUD) trips.
- **Implementation**:
  - **Node.js + TypeScript** for your HTTP/REST API.
  - **Persistence**: In-memory or database of your choice (SQLite, Postgres, etc.).  

---

## 3. Admin UI

- **List Trips**: Show all trips, with the ability to filter and sort.
- **View Trip Details**: A page to display the full trip info.
- **Edit/Delete Trip**: Allow updates and deletions from the detail page (or wherever you see fit).

---

## 4. (Bonus) Dashboard

- **Optional** but highly appreciated:
  - Display metrics like total trips, total revenue, average trip price, etc.
  - Use charts to visualize data if you prefer.

---

## Project Setup

1. **Python WebSocket**:  
   - Inside this repo, run:
     ```bash
     poetry install
     poetry run python main.py
     ```
   - This starts the WebSocket server at `ws://localhost:8765`.

2. **Your Node.js + TypeScript Project**:
   - Create your own project (in a separate folder or repository).
   - Connect to the Python server’s WebSocket for the real-time map.
   - Implement the Trips API and the Admin UI as described.

---

## Requirements & Guidelines

- **Node.js + TypeScript** for both backend (CRUD API) and frontend (Admin UI), or a framework of your choice.
- **Real-time location** from the provided WebSocket server.
- **Clean Code & Best Practices**:
  - Use TypeScript types/interfaces.
  - Proper error handling and project organization.
- **Submission**:
  - **GitHub Link** to your Node.js + TypeScript project (we only need the link).
  - The Python server is already given in this repo (don’t modify it).

Feel free to reach out if you have questions. Good luck and happy coding!