// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

// Get random welcome message from OpenAI
app.get('/api/welcome-message', async (req, res) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a friendly assistant. Generate a short, welcoming message for a newly registered user. Keep it under 15 words and make it friendly and encouraging."
          }
        ],
        max_tokens: 50
      });
  
      const message = completion.choices[0].message.content;
      res.json({ message });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Return a fallback message instead of error
      res.json({ 
        message: "Welcome to our platform! We're excited to have you join us! 🎉"
      });
    }
  });

app.listen(port, () => {
  console.log(`OpenAI server running on port ${port}`);
});