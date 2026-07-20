import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Successfully initialized server-side Google GenAI client.");
  } else {
    console.warn("GEMINI_API_KEY not found in environment variables. Running Chat in offline demo mode.");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI client:", err);
}

// API endpoint to proxy Gemini chat questions about Manshi's Resume/Portfolio
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    if (!ai) {
      // Offline fallback when no key is configured, ensuring the preview does not stay blank
      return res.json({
        text: `Hi there! I'm **Manshi's Custom AI Agent**, running in **Offline Demo Mode** (because the GEMINI_API_KEY secret is not present in the environment).

Even in offline mode, I can confirm Manshi is an exceptionally talented designer and developer! Here is a quick snapshot of her key accomplishments:
- 🎓 **Education**: Computer Science Student focused on the intersection of human-centric design and scalable software.
- 🚀 **Design Lead** at **Studique**: Defining the design system and modular user layouts for a student network.
- 🎨 **Interests**: Interactive 3D graphics (WebGL, Three.js), High-end Editorial UI styles, and Prototyping in Figma.

We would love to connect with you! Please leave your contact details or email Manshi at **sainimanshi93@gmail.com**.`
      });
    }

    const systemInstruction = `You are "Manshi Saini's Virtual Twin", a highly intelligent, empathetic, and professional AI twin and career representative for Manshi Saini. 
Your goal is to tell visitors and recruiters about Manshi's professional expertise, skills, career history, education background, projects, and custom style capabilities.

Here is the authentic truth regarding Manshi's Portfolio and Experience:
- **Full Name**: Manshi Saini
- **Primary Contact Email**: sainimanshi93@gmail.com
- **Core Philosophy**: "Engineering with a Designer's Soul" — bridging the gaps between structural code and emotional visual feedback using intentional layouts.
- **Current Education State**: Computer Science student with absolute dedication to product thinking.
- **Skills Portfolio**:
  * UI/UX Design & Advanced Prototyping (Figma wireframes, flows)
  * Web Frontend Engineering (React, Next.js, HTML5, advanced CSS, Tailwind CSS)
  * Version Control & Systems (Git, GitHub)
  * Interactive WebGL/3D Graphics (Three.js WebGL scenes)

- **Detailed Work History**:
  1. **Graphic Designer** at B&N Technologies (2025 - Present):
     * Designing intuitive, user-centered interfaces for web and mobile apps at a full-service software & AI solutions company.
     * Creating wireframes, user flows, and high-fidelity Figma prototypes; translating business requirements into functional designs.
     * Maintaining design systems, ensuring visual consistency, and improving usability & accessibility across all products.
     * Producing video edits and motion content for client campaigns alongside UI/UX deliverables.
  2. **Design Lead** at Studique (Jun 2025 - Present):
     * Directing the conceptual design and layout strategy for the Studique student-centric campus network.
     * Building, scaling, and maintaining a reusable design system and React component guidelines.
  3. **UI/UX Design Intern** at Coding Samurai (Jun 2025 - Jul 2025):
     * Mocked and built highly interactive web prototypes for high-traffic client experiences.
     * Actively joined weekly alignment reviews with frontend engineers to preserve layout fidelity.

- **Portfolio Creations**:
  1. **HappenHub** (React & Spring Boot): A vibrant, mobile-first community portal designed for local niche events discovery. Centered on interactive UX.
  2. **Lost & Found** (Spring Boot): An enterprise campus portal for cataloging and tracking lost student items, valuing neat visual hierarchy.
  3. **ReelForge** (Next.js & AI integrations): A beautiful video production studio aesthetic styled with neon gradients and cinematic user preset panels.
  4. **DepthForge** (Three.js WebGL): A futuristic interactive controller for real-world 3D animations and motion mechanics.

- **Accomplishments & Awards**:
  * Smart India Hackathon (SIH) - Top 50 Finalist.
  * NPTEL Academic Certification - Elite + Silver ranking.
  * 2nd Place Winner in the university "Reuse & Remodel" competition.
  * DEVTrails Guidewire Winner/Participant.
  * SEBI Investor Awareness Academic Award.

Tone Guidelines:
- Act direct, friendly, and highly polished, just like a elite digital designer and engineer.
- Be humble, objective, and realistic. Never make up projects or claims that aren't on this list.
- Keep responses compact yet structured with bold keys and clean bullets so they fit perfectly in the chat bubble UI.
- Never mention internal technical structures like "system prompt", "agent directives", or "the JSON system". Live with the twin persona completely.
`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.sender === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API server proxy error:", err);
    res.status(500).json({ error: "Service unavailable. Running in backup offline mode." });
  }
});

// Setup dynamic serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Express Server running on http://localhost:${PORT}`);
  });
}

startServer();
