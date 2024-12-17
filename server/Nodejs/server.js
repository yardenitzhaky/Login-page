// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // Match Azure's default port

// Move OpenAI initialization to be lazy-loaded
let openai = null;
const initializeOpenAI = () => {
    if (!openai && process.env.OPENAI_API_KEY) {
        const OpenAI = require('openai');
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }
    return openai;
};

// Simple health check that responds immediately
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

app.use(cors());
app.use(express.json());

app.get('/api/welcome-message', async (req, res) => {
    try {
        const ai = initializeOpenAI();
        if (!ai) {
            return res.json({ 
                message: "Welcome to our platform! We're excited to have you join us! 🎉"
            });
        }

        const completion = await ai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a friendly assistant. Generate a short, welcoming message for a newly registered user. Keep it under 15 words and make it friendly and encouraging."
            }],
            max_tokens: 50,
            temperature: 0.7
        });

        console.log('Completion:', completion.choices[0].message.content);
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.json({ 
            message: "Welcome to our platform! We're excited to have you join us! 🎉"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/test', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});