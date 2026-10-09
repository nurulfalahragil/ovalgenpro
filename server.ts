import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// POST /api/generate-prompts
// Generates both production-ready Text-to-Image prompts and Director Text-to-Video prompts
app.post('/api/generate-prompts', async (req: Request, res: Response) => {
  try {
    const { 
      productImage, 
      characterImage, 
      promptText, 
      config 
    } = req.body;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY tidak dikonfigurasi di server.',
      });
    }

    const {
      background = 'Studio profesional',
      angle = 'Eye-level',
      style = 'UGC (Natural & Autentik)',
      ratio = '9:16',
      duration = '15',
      textOverlay = true,
      voiceOver = true,
      voiceOverType = 'narrator',
      storyboardStyle = 'Lifestyle',
      storyboardParts = '1',
      storyboardGrids = '4 Panel (Grid 2x2)'
    } = config || {};

    const isStoryboard = style === 'Storyboard';
    const durationNum = parseInt(duration, 10) || 15;
    const idealWordCount = Math.round(durationNum * 2.5);

    const parts: any[] = [];

    // System instruction for ad director & prompt engineer
    const systemInstruction = `You are a world-class Commercial Ad Director and Senior Prompt Engineer specializing in high-converting E-Commerce Visuals, Midjourney/Flux prompt crafting, and AI Video Director Prompts for Veo, Sora, Kling, and Runway Gen-3.

Your task is to analyze the uploaded product image (and character image if provided) and produce TWO comprehensive outputs:
1. TEXT-TO-IMAGE PROMPT SUITE:
   - Detailed, photorealistic ad prompt ready for Midjourney v6.1, Flux.1, and Imagen 3.
   - Accurately describe the actual product visual characteristics from the reference (bottle shape, packaging material, label fonts, color scheme, caps, logos, finishes).
   - Style: ${style}. Angle: ${angle}. Environment: ${background}. Aspect Ratio: ${ratio}.
   ${isStoryboard ? `- STORYBOARD: Since style is Storyboard with ${storyboardGrids}, break down each panel sequentially (${storyboardStyle} theme).` : ''}
   - Include ready-to-copy Midjourney command with flags (--ar ${ratio} --style raw --v 6.1) and Flux-optimized natural language prompt.
   - Comprehensive negative prompt to avoid deformed packaging or logos.

2. TEXT-TO-VIDEO DIRECTOR PROMPT:
   - Full Director-level production prompt strictly structured in sections A through L:
     A. VIDEO CONCEPT: Core visual mood and hook
     B. CHARACTER CONSISTENCY: Detailed description of actor/talent (or state N/A if no character provided)
     C. PRODUCT CONSISTENCY: Exact product specifications, packaging, and reflections
     D. SCENE-BY-SCENE BREAKDOWN: Timed accurately to total ${durationNum} seconds (e.g. Scene 1 [0s-3s], Scene 2 [3s-7s], etc.)
     E. CAMERA MOVEMENT: Dynamic cinematography (push-in, orbit, slow tilt, tracking)
     F. CHARACTER MOVEMENT: Natural micro-actions (or N/A if no character)
     G. PRODUCT INTERACTION: Holding, unboxing, applying, pouring, or heroic placement
     H. LIGHTING AND ENVIRONMENT: Studio/ambient key lights, shadows, color temperature
     I. TRANSITIONS: Seamless scene transitions
     J. NEGATIVE INSTRUCTIONS: Artifacts to avoid (morphing, drifting labels, distorted fingers)
     K. TARGET DURATION AND ASPECT RATIO: ${durationNum}s, ${ratio}
     L. SCRIPT & TEXT OVERLAY: 
       - Catchy On-screen Hook & Text Overlays for each scene
       - Persuasive Indonesian Voice Over script specifically tuned for ${durationNum} seconds (approx ${idealWordCount} words).
       ${voiceOver ? `- Voice Over Type: ${voiceOverType === 'lipsync' ? 'Talent speaking directly to camera (Lipsync dialogue)' : 'Off-screen Voice Over Narrator'}.` : '- No Voice Over requested.'}
`;

    // Add User instructions
    let userPromptContent = `Analyze the uploaded product and generate the complete Text-to-Image prompt suite and Text-to-Video Director prompt.
Additional User Request: ${promptText || 'Create a high-converting commercial advertising shoot for this product.'}
Settings: Style=${style}, Angle=${angle}, Background=${background}, Aspect Ratio=${ratio}, Duration=${durationNum}s.
`;

    parts.push({ text: userPromptContent });

    // Append Product Image
    if (productImage && productImage.data) {
      parts.push({
        text: '[REFERENCE PRODUCT IMAGE]: Analyze this specific packaging, colors, brand details, materials, and form factor.'
      });
      parts.push({
        inlineData: {
          mimeType: productImage.mimeType || 'image/jpeg',
          data: productImage.data,
        },
      });
    }

    // Append Character Image if present
    if (characterImage && characterImage.data) {
      parts.push({
        text: '[REFERENCE CHARACTER / MODEL IMAGE]: Match this actor identity, face, hairstyle, and appearance in the prompts.'
      });
      parts.push({
        inlineData: {
          mimeType: characterImage.mimeType || 'image/jpeg',
          data: characterImage.data,
        },
      });
    }

    // Fast and stable Gemini 3 series models (gemini-3.1-flash-lite responds in <1s with zero 503/404 errors)
    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.8-flash'
    ];

    let lastError: any = null;
    let parsedData: any = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`Attempting prompt generation with model: ${modelName}...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: parts,
          },
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                imagePrompt: {
                  type: Type.OBJECT,
                  properties: {
                    summary: { type: Type.STRING },
                    detailedPrompt: { type: Type.STRING },
                    midjourneyPrompt: { type: Type.STRING },
                    fluxPrompt: { type: Type.STRING },
                    negativePrompt: { type: Type.STRING },
                    storyboardPanels: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['summary', 'detailedPrompt', 'midjourneyPrompt', 'fluxPrompt', 'negativePrompt']
                },
                videoPrompt: {
                  type: Type.OBJECT,
                  properties: {
                    directorPromptFull: { type: Type.STRING },
                    concept: { type: Type.STRING },
                    scenes: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          sceneNumber: { type: Type.STRING },
                          timeRange: { type: Type.STRING },
                          action: { type: Type.STRING },
                          camera: { type: Type.STRING },
                          textOverlay: { type: Type.STRING }
                        },
                        required: ['sceneNumber', 'timeRange', 'action']
                      }
                    },
                    voiceOverScript: { type: Type.STRING },
                    hookText: { type: Type.STRING }
                  },
                  required: ['directorPromptFull', 'concept', 'voiceOverScript']
                }
              },
              required: ['imagePrompt', 'videoPrompt']
            }
          },
        });

        const rawText = response.text || '';
        if (rawText) {
          try {
            // Strip any accidental markdown formatting
            let clean = rawText.trim();
            if (clean.startsWith('```json')) clean = clean.slice(7);
            else if (clean.startsWith('```')) clean = clean.slice(3);
            if (clean.endsWith('```')) clean = clean.slice(0, -3);
            clean = clean.trim();
            const start = clean.indexOf('{');
            const end = clean.lastIndexOf('}');
            if (start !== -1 && end !== -1 && end > start) {
              clean = clean.substring(start, end + 1);
            }
            parsedData = JSON.parse(clean);
            console.log(`Successfully generated prompt with model: ${modelName}`);
            break;
          } catch (parseErr) {
            console.warn(`JSON parse error on ${modelName}:`, parseErr);
          }
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed (status: ${err?.status || err?.code || 'unknown'}):`, err?.message || err);
        // Small backoff before next model attempt
        await new Promise(r => setTimeout(r, 600));
      }
    }

    if (parsedData) {
      return res.json(parsedData);
    }

    // If all models failed, return clean friendly error
    let friendlyMessage = 'Server AI sedang mengalami lonjakan trafik tinggi. Silakan coba kembali dalam beberapa detik.';
    if (lastError?.message && typeof lastError.message === 'string') {
      try {
        const parsedErr = JSON.parse(lastError.message);
        if (parsedErr?.error?.message) {
          friendlyMessage = `Server AI sedang sibuk (${parsedErr.error.message}). Silakan klik tombol coba lagi.`;
        }
      } catch {
        if (lastError.message.includes('high demand') || lastError.message.includes('503')) {
          friendlyMessage = 'Model AI sedang mengalami lonjakan permintaan (503). Silakan coba klik tombol generate kembali.';
        }
      }
    }

    return res.status(503).json({ error: friendlyMessage });

  } catch (error: any) {
    console.error('Error generating prompts in server:', error);
    res.status(500).json({ error: 'Terjadi kesalahan sistem saat memproses prompt AI. Silakan coba lagi.' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
