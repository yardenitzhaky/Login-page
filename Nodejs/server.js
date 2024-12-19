import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

// Initialize Express app and OpenAI
const app = express();
const port = process.env.PORT || 8080;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

const DEFAULT_WELCOME = "Welcome to our platform! We're excited to have you join us! 🎉";

// Generate welcome message using OpenAI function
async function generateWelcomeMessage() {
  try {
    if (!openai) {
      console.log('OpenAI not configured, returning default message');
      return DEFAULT_WELCOME;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "Generate a short, welcoming message for a new user (under 15 words)."
      }],
      max_tokens: 50,
      temperature: 0.7
    });

    console.log('Generated message:', completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return DEFAULT_WELCOME;
  }
}

// Routes
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'healthy', openaiConfigured: !!openai });
});

app.get('/api/welcome-message', async (req, res) => {
  console.log('Welcome message requested');
  const message = await generateWelcomeMessage();
  res.json({ message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});