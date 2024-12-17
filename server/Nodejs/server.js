import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || process.env.WEBSITES_PORT || 8080;

// Initialize OpenAI with error handling......
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configure CORS to accept requests from your Flask server
app.use(cors);
app.use(express.json());

// Get random welcome message from OpenAI
app.get('/api/welcome-message', async (req, res) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not configured');
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // Using the correct model name
            messages: [
                {
                    role: "system",
                    content: "You are a friendly assistant. Generate a short, welcoming message for a newly registered user. Keep it under 15 words and make it friendly and encouraging."
                }
            ],
            max_tokens: 50,
            temperature: 0.5
        });

        const message = completion.choices[0].message.content;
        console.log('Generated welcome message:', message); // Add logging
        res.status(200).json({ message });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        // Return a fallback message and log the error
        res.status(200).json({ 
            message: "Welcome to our platform! We're excited to have you join us! 🎉",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
    console.log(`OpenAI server running on port ${port}`);
});