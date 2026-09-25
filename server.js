import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (request, response) => {
  const message = request.body?.message?.trim();

  if (!message) {
    return response.status(400).json({ error: 'Please enter a question.' });
  }

  if (!openai) {
    return response.status(500).json({
      error: 'The agent is not connected yet. Add OPENAI_API_KEY to your .env file.'
    });
  }

  try {
    const result = await openai.responses.create({
      model: 'gpt-4o-mini',
      instructions: [
        'You are Ethan, a simple and patient AI agent.',
        'Explain answers in plain language for a beginner.',
        'Use short paragraphs and small examples when helpful.',
        'If the question is unclear, ask one useful clarifying question.',
        'Never pretend to know something. Say when you are uncertain.'
      ].join(' '),
      input: message
    });

    response.json({ answer: result.output_text });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Ethan is running at http://localhost:${port}`);
});
