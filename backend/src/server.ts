import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket from "ws";

import tripRoutes from './routes/tripRoutes'
import sequelize from './config/database';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
	origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void {
		if (origin && allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions));

app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

const ws = new WebSocket(`${process.env.WS_URL}`);
ws.on("message", (data: any) => console.log("Received GPS Data:", data.toString()));

app.use('/',  tripRoutes);

sequelize.sync({ force: false, alter: true })
	.then(async () => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
});

