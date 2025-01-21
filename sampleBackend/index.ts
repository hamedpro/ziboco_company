// Express with TypeScript OTP Login Example
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const PORT = 8000;
const JWT_SECRET = "supersecret"; // Replace with an environment variable in production

app.use(bodyParser.json());
app.use(cors());

// In-memory storage for users and OTPs
const otps: Record<string, { otp: string; issuedAt: number }> = {};
const users: Record<string, { id: string; phoneNumber: string }> = {};

// Helper to generate an OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route: Request OTP
app.post("/request-otp", (req: Request, res: Response) => {
	const { phoneNumber } = req.body;

	if (!phoneNumber) {
		res.status(400).json({ message: "شماره تلفن الزامی است." });
		return;
	}

	const existingOtp = otps[phoneNumber];

	if (existingOtp) {
		const currentTime = Date.now();
		const otpAge = currentTime - existingOtp.issuedAt;

		if (otpAge <= 60000) {
			const remainingTime = Math.ceil((60000 - otpAge) / 1000);
			res.status(400).json({
				message: `شما نمی‌توانید یک رمز دیگر درخواست کنید. لطفاً ${remainingTime} ثانیه صبر کنید.`,
			});
			return;
		}
	}

	const otp = generateOtp();
	const issuedAt = Date.now();

	otps[phoneNumber] = { otp, issuedAt };

	// console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

	res.status(200).json({ issuedAt });
	return;
});

// Route: Check Valid OTP Status
app.get("/otp-status", (req: Request, res: Response) => {
	const { phoneNumber } = req.query;

	if (!phoneNumber || typeof phoneNumber !== "string") {
		res.status(400).json({ message: "شماره تلفن الزامی است." });
		return;
	}

	const existingOtp = otps[phoneNumber];
	let issuedAt: number | undefined;

	if (existingOtp) {
		const currentTime = Date.now();
		const otpAge = currentTime - existingOtp.issuedAt;

		if (otpAge <= 60000) {
			// 1 minute in milliseconds
			issuedAt = existingOtp.issuedAt;
		}
	}

	res.status(200).json({ issuedAt });
	return;
});

// Route: Verify OTP
app.post("/verify-otp", (req: Request, res: Response) => {
	const { phoneNumber, otp } = req.body;

	if (!phoneNumber || !otp) {
		res.status(400).json({ message: "شماره تلفن و رمز یک‌بار مصرف الزامی هستند." });
		return;
	}

	const existingOtp = otps[phoneNumber];

	if (!existingOtp) {
		res.status(404).json({ message: "رمز یک‌بار مصرفی برای این شماره تلفن یافت نشد." });
		return;
	}

	const currentTime = Date.now();
	const otpAge = currentTime - existingOtp.issuedAt;

	if (otpAge > 60000) {
		// 1 minute in milliseconds
		res.status(401).json({ message: "رمز یک‌بار مصرف منقضی شده است." });
		return;
	}

	if (existingOtp.otp !== otp) {
		res.status(401).json({ message: "رمز یک‌بار مصرف نامعتبر است." });
		return;
	}

	// Remove OTP after successful verification
	delete otps[phoneNumber];

	// Create user if not exists
	if (!users[phoneNumber]) {
		users[phoneNumber] = { id: uuidv4(), phoneNumber };
	}

	const token = jwt.sign({ id: users[phoneNumber].id, phoneNumber }, JWT_SECRET, {
		expiresIn: "1h",
	});

	res.status(200).json({ JWT: token });
	return;
});

app.get("/otps", (req: Request, res: Response) => {
	res.json(otps);
});

app.get("/users", (req: Request, res: Response) => {
	res.json(users);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
