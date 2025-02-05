"use client";

import React, { useState, useEffect } from "react";

// Define type for each message object
type Message = {
	id: string;
	message: string;
	date: string | null;
};

// Define the type for the API response
type ApiResponse = {
	data: Message[];
	errorCode: number;
	errorMessage: string | null;
	errorDetail: string | null;
};

const page = () => {
	return null;
	// messages state:
	// - undefined => loading
	// - string => error message
	// - Message[] => list of notifications
	// const [messages, setMessages] = useState<Message[] | string | undefined>(
	// 	undefined
	// );

	// useEffect(() => {
	// 	async function fetchMessages() {
	// 		try {
	// 			const res = await fetch("/api/message");
	// 			if (!res.ok) {
	// 				throw new Error("Failed to fetch messages");
	// 			}
	// 			const json: ApiResponse = await res.json();
	// 			if (json.errorCode !== 0) {
	// 				// If there's an error Code, it means an error occurred on the server
	// 				setMessages(json.errorMessage || "Unknown error occurred");
	// 			} else {
	// 				setMessages(json.data);
	// 			}
	// 		} catch (error: any) {
	// 			setMessages(error.message || "An error occurred");
	// 		}
	// 	}
	// 	fetchMessages();
	// }, []);

	// // Render loading state
	// if (messages === undefined) {
	// 	return <div>Loading...</div>;
	// }

	// // Render error state
	// if (typeof messages === "string") {
	// 	return <div>Error: {messages}</div>;
	// }

	// // Render notifications list when messages is an array
	// return (
	// 	<div className="flex flex-col w-full p-6">
	// 		<h1 className="text-2xl font-bold mb-4">Notifications</h1>
	// 		<ul className="space-y-2">
	// 			{messages.map((msg) => (
	// 				<li
	// 					key={msg.id}
	// 					className="border p-2 rounded shadow"
	// 				>
	// 					<p>
	// 						<strong>ID:</strong> {msg.id}
	// 					</p>
	// 					<p>
	// 						<strong>Message:</strong> {msg.message}
	// 					</p>
	// 					<p>
	// 						<strong>Date:</strong>{" "}
	// 						{msg.date
	// 							? new Date(msg.date).toLocaleString()
	// 							: "No date provided"}
	// 					</p>
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );
};

export default page;
