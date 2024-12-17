// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize OpenAI instance immediately
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) : null;

// Simple health check that responds immediately
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        openaiConfigured: !!openai
    });
});

app.use(cors());
app.use(express.json());

app.get('/api/welcome-message', async (req, res) => {
    try {
        if (!openai) {
            console.log('OpenAI not configured, returning default message');
            return res.json({ 
                message: "Welcome to our platform! We're excited to have you join us! 🎉"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a friendly assistant. Generate a short, welcoming message for a newly registered user. Keep it under 15 words and make it friendly and encouraging."
            }],
            max_tokens: 50,
            temperature: 0.7
        });

        console.log('Generated message:', completion.choices[0].message.content);
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.json({ 
            message: "Welcome to our platform! We're excited to have you join us! 🎉"
        });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        openaiConfigured: !!openai
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});