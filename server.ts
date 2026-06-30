import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini AI Client successfully initialized.');
  } catch (error) {
    console.error('Failed to initialize Gemini AI client:', error);
  }
} else {
  console.log('Using simulated GLO rule engine for assistant chats (Gemini API key not configured).');
}

// 1. API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// 2. Official AI Chatbot Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message field is required.' });
    return;
  }

  // A. IF GEMINI IS ACTIVE, CALL GEMINI API
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: `You are the official Smart AI Assistant for the GLO (Government Lottery Office) Portal.
          You assist users with drawings schedule, prize allocations, security verification, ticket purchase procedures, and winning announcements.
          
          GLO core regulations guidelines:
          - GLO lottery tickets are priced strictly at 80 Baht (฿) face value. Buying from other unverified sources may involve dangerous fraud or scams.
          - Drawings take place twice a month: on the 1st and 16th of each month (unless special holidays shift it).
          - Winning prize structures:
            - 1st Prize: 6,000,000 ฿ (for 6 matching digits).
            - 3-Digit Prefix and Suffix: 4,000 ฿.
            - 2-Digit Suffix: 2,000 ฿.
          - Winners have exactly 2 years to claim prizes from the drawing date.
          - Claiming prizes: Winners can receive direct bank transfers or pick up in-person at GLO headquarters in Bangkok.
          
          Respond in a helpful, friendly, and authoritative tone. Keep responses short and directly formatted for a floating chat card.`
        }
      });

      const replyText = response.text || 'I apologize, I could not generate a response. Please try again.';
      res.json({ reply: replyText });
      return;
    } catch (err) {
      console.error('Error invoking Gemini model:', err);
      // Fallback to rules matcher below if API call failed
    }
  }

  // B. RELIABLE LOCAL KNOWLEDGE BASE FALLBACK (If API Key is missing or failed)
  const q = message.toLowerCase();
  let reply = '';

  if (q.includes('claim') || q.includes('payout') || q.includes('prize') || q.includes('won')) {
    reply = `To claim your winnings:
    1. Digital ticket winners: Winnings are credited directly to your registered bank account or wallet within 24 hours.
    2. Physical ticket winners: You can claim cash or checks at our main GLO branch in Bangkok or participating banks.
    *Note: All lottery prize winnings are subject to a tiny local stamp duty tax of 0.5% to 1% depending on the exact series. Winnings must be claimed within 2 years of the draw date.*`;
  } else if (q.includes('when') || q.includes('schedule') || q.includes('date') || q.includes('next')) {
    reply = `Our official drawings take place twice a month:
    - **1st of the month** (e.g. Draw #104 was on July 1st, 2026)
    - **16th of the month** (e.g. Draw #105 upcoming on July 16th, 2026)
    Draw announcements start live at 14:00 GMT+7 and numbers are verified within minutes.`;
  } else if (q.includes('price') || q.includes('how much') || q.includes('buy') || q.includes('cost')) {
    reply = `Standard digital lottery tickets are priced strictly at **80 Baht (฿)**.
    Our portal provides digital ticket purchases directly through secure payment gateways (PromptPay, Credit Card, or bKash/Nagad mobile wallets). No premiums, no markups, fully compliant with GLO pricing mandates.`;
  } else if (q.includes('scam') || q.includes('safe') || q.includes('fraud') || q.includes('fake')) {
    reply = `GLO takes security extremely seriously:
    - Always purchase tickets through our verified app or official licensed retailers bearing GLO seals.
    - Official winners are notified securely through user dashboard ledgers. GLO will never send direct SMS links asking for fees to unlock prizes. Please report any suspicious activity immediately.`;
  } else {
    reply = `Thank you for contacting GLO Support. We have verified drawings schedules on the 1st & 16th of each month, standard 80 Baht pricing, and secure direct transfers for winners.
    
    Is there anything specific I can help you with regarding tickets, drawing verifications, or prize payments?`;
  }

  res.json({ reply });
});

// 3. Vite development vs static production server middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Mounted Vite development middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving compiled static distribution folder in production mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GLO Full-Stack Portal running on http://localhost:${PORT}`);
  });
}

startServer();
