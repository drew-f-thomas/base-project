# PRD — Reflective AI Journal (V1 / MVP)

## 0. Fixed Decisions

- **Corpus**: Use broad LLM corpus. No custom text supply.
- **Grounding**: No RAG/embeddings. Prompt-only with in-context examples.
- **Storage**: Local-only (AsyncStorage via Zustand persist).
- **Tone**: Controlled via prompting (supportive, reflective).

---

## 1. Goal

Enable a voice-first journaling flow that returns a high-quality **quote + explanation** response in a premium, animated experience and saves locally for later viewing.

---

## 2. User Stories

1. User can record a short voice entry and receive a **direct quote** with cited source plus an **explanation**.
2. User can type their entry instead of recording and get the same result.
3. User can see an elegant loading/reveal animation while the reflection is generated.
4. User can save the reflection locally and revisit it in a simple list.

---

## 3. Core Flow

Landing → Capture → Transcribe (if audio) → Generate → Reveal → Save

- **Landing**: Large mic button; smaller “Type instead”.
- **Capture**:
  - Audio: mic permission → start/stop → buffer → on-device transcription.
  - Text: inline composer.

- **Generate**: Send text to LLM via Vercel AI SDK; receive structured output.
- **Reveal**: Animate quote → fade in explanation → “Save” CTA.
- **Save**: Persist Reflection locally.

---

## 4. Non-Goals

- Accounts, sync, push notifications, calendar, share/export, advanced theming.

---

## 5. UX & Visual

- Warm, minimalist, soft gradients.
- Typographic hierarchy: quote as centerpiece.
- **Animations**:
  - Mic press: scale spring-in; ripple backdrop.
  - Recording: pulsing ring; timer tick.
  - Loading: gradient shimmer on card placeholder.
  - Reveal: quote card translateY + fade; explanation staggered.

---

## 6. Data Model

```ts
type Reflection = {
  id: string
  createdAt: number
  inputType: 'audio' | 'text'
  originalInput: string
  quote: string
  sourceTitle: string
  sourceAuthor: string
  sourceCitation?: string
  explanation: string
  modelId: string
  latencyMs: number
}
```

Zustand slice:

```ts
type ReflectionsState = {
  reflections: Array<Reflection>
  addReflection: (r: Reflection) => void
  clearAll: () => void
}
```

---

## 7. Prompts

### System Prompt

You are a concise reflective guide.
Input: a short first-person description of someone’s current situation or feelings.
Output: exactly one short, directly relevant quote from widely-known literature or religious/philosophical texts with author and work title, plus a short explanation connecting the quote to the user’s situation.
Rules:

- Prefer works likely in the public domain or widely known.
- Do not fabricate authors or titles.
- Keep the tone supportive, grounded, non-therapeutic.
- Never include disclaimers about being an AI.
- Return valid JSON conforming to schema.

### JSON Schema

```json
{
  "type": "object",
  "properties": {
    "quote": { "type": "string", "minLength": 10, "maxLength": 350 },
    "sourceTitle": { "type": "string", "minLength": 2, "maxLength": 120 },
    "sourceAuthor": { "type": "string", "minLength": 2, "maxLength": 120 },
    "sourceCitation": { "type": "string" },
    "explanation": { "type": "string", "minLength": 60, "maxLength": 900 }
  },
  "required": ["quote", "sourceTitle", "sourceAuthor", "explanation"],
  "additionalProperties": false
}
```

### User Prompt Template

```
The user said:
"""{{USER_TEXT}}"""

Produce a response that follows the System Rules and must validate against the JSON schema.
```

### Example

```
USER:
"I'm overwhelmed—family conflict is draining me and I can’t find time to breathe."

ASSISTANT(JSON):
{
  "quote": "You have power over your mind — not outside events. Realize this, and you will find strength.",
  "sourceTitle": "Meditations",
  "sourceAuthor": "Marcus Aurelius",
  "sourceCitation": "Book 12",
  "explanation": "You’re carrying weight that feels outside your control. This line redirects attention to what remains yours: your thoughts and responses. It doesn’t dismiss the conflict; it narrows the target to where leverage exists. By protecting small boundaries—brief pauses to breathe, labeling thoughts without judging them—you reclaim energy for what matters. That shift won’t fix others, but it can reduce the drain and support steadier choices."
}
```

---

## 8. Technical Architecture

### Modules

- Audio: Expo AV → `@react-native-ai/apple` (on-device transcription).
- LLM: Vercel AI SDK.
- State: Zustand with persist.
- UI: Expo + Expo Router; Reanimated.
- Validation: Zod or structured outputs.

### Sequence (Audio)

1. Request mic → start recording.
2. Stop → audio buffer.
3. Transcribe on-device.
4. Call LLM with prompts; expect JSON.
5. Validate JSON → repair if needed.
6. Animate reveal → Save.

### Sequence (Text)

Skip steps 1–3; go straight to 4–6.

---

## 9. Guardrails

- Attribution sanity checks for “Unknown” or invalid names → request correction.
- JSON invalid → repair attempt; fallback explanation only.
- Schema length bounds enforced.
- Supportive language enforced by system prompt.

---

## 10. Screens

### Landing

- Large mic button, secondary “Type instead”.
- Idle, recording, processing states.

### Composer

- Expanding input; send button.

### Result

- Quote card with metadata.
- Explanation paragraph.
- Buttons: Save, Try Again, Copy.

### Library

- List of reflections, reverse chronological.
- Row: quote first line + author/title + date.
- Detail sheet on tap.

---

## 11. API Contracts

### Transcription

```ts
async function transcribeAudio(input: {
  uri: string
}): Promise<{ text: string }>
```

### Generate

```ts
type GenerateParams = {
  text: string
  model: string
  timeoutMs?: number
}

type GenerateResult = {
  quote: string
  sourceTitle: string
  sourceAuthor: string
  sourceCitation?: string
  explanation: string
  modelId: string
  latencyMs: number
}

async function generateReflection(p: GenerateParams): Promise<GenerateResult>
```

---

## 12. Error Handling

- Mic denied → show enable instructions + text fallback.
- Transcription fail → retry + text fallback.
- LLM fail → retry once; fallback explanation with no quote.
- Storage fail → toast, allow screenshot.

---

## 13. Analytics (local only)

- Session start
- Input type
- Audio duration
- Transcription latency
- LLM latency
- Model ID
- JSON repair attempted
- Saved state

---

## 14. Performance Targets

- Transcription < 2s for typical audio.
- LLM response < 4s p50, < 8s p95.
- First interaction ready < 1.5s.

---

## 15. Privacy & Safety

- Entries stored locally only.
- No diagnostic or medical claims.
- If cloud added later, explicit opt-in.

---

## 16. Acceptance Criteria

1. Audio entry ≤60s produces transcript.
2. Text entry ≥10 chars accepted.
3. LLM returns valid JSON ≥95% of attempts with repair path.
4. Smooth animations across all transitions.
5. Saved reflections persist across app restarts.
6. Guardrails catch invalid attributions and repair or fallback.
7. Manual QA across 10 scenarios yields contextually relevant, accurate attributions.

---

## 17. Test Plan

- Unit: schema validation, JSON repair, persistence.
- Integration: audio → transcription → generation → save.
- UI: snapshot and Detox happy path.
- Manual: 10 scenario scripts, offline handling.

---

## 18. Implementation Notes

### State Machine

```
IDLE -> RECORDING -> TRANSCRIBING -> GENERATING -> REVEAL
IDLE -> TYPING -> GENERATING -> REVEAL
Any -> ERROR -> IDLE
```

### Routes

```
/ (Landing)
/compose (Text composer)
/result/[id] (Detail)
/library (List)
```

### Reanimated

- Mic press: spring scale.
- Recording ring: pulsing loop.
- Loading card: gradient shimmer.
- Reveal: translateY + fade with stagger.

---

## 19. Confirmed Items

- Max audio duration: 60s.
- Min text length: 10 chars.
- Initial model: fast LLM via Vercel AI SDK.
- Transcript preview: enabled before send.
