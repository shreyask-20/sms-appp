require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Twilio Configuration
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Route to send SMS using Twilio
app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: phone,
        });
        res.status(200).json({ success: true, message: "Message sent!", response });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send message", error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
