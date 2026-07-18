const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

export interface ChecklistItem {
  item: string;
  status: "pass" | "warning" | "fail";
  note: string;
}

export interface TailoredApplication {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  tailored_resume: string;
  cover_letter: string;
  linkedin_about: string;
  checklist: ChecklistItem[];
  interview_questions: string[];
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    match_score: {
      type: "integer",
      description: "ATS keyword match score from 0-100 for this resume against this job description.",
    },
    matched_keywords: {
      type: "array",
      items: { type: "string" },
      description: "Important keywords/skills from the job description already present in the resume.",
    },
    missing_keywords: {
      type: "array",
      items: { type: "string" },
      description: "Important keywords/skills from the job description missing from the resume.",
    },
    tailored_resume: {
      type: "string",
      description:
        "The full rewritten resume as plain text, ready to copy/paste or print. Preserve the candidate's real experience and facts — rewrite phrasing, ordering, and emphasis to match the job description. Use blank lines between sections and '- ' for bullets.",
    },
    cover_letter: {
      type: "string",
      description: "A complete, ready-to-send cover letter tailored to this job description, plain text.",
    },
    linkedin_about: {
      type: "string",
      description: "A rewritten LinkedIn 'About' section (short paragraph form) matching the target role.",
    },
    checklist: {
      type: "array",
      description: "A resume-quality checklist: quantified achievements, weak verbs, length, contact info, formatting.",
      items: {
        type: "object",
        properties: {
          item: { type: "string" },
          status: { type: "string", enum: ["pass", "warning", "fail"] },
          note: { type: "string" },
        },
        required: ["item", "status", "note"],
      },
    },
    interview_questions: {
      type: "array",
      items: { type: "string" },
      description: "5 likely interview questions for this specific role and resume.",
    },
  },
  required: [
    "match_score",
    "matched_keywords",
    "missing_keywords",
    "tailored_resume",
    "cover_letter",
    "linkedin_about",
    "checklist",
    "interview_questions",
  ],
};

const SYSTEM_PROMPT = `You are an expert resume writer, ATS optimization specialist, and career coach. Given a candidate's resume and a target job description, you tailor the resume and produce supporting application materials. Never invent experience, employers, titles, or credentials the candidate doesn't have — only rephrase, reorder, and re-emphasize what's true in their original resume to better match the job description. Respond with JSON only, matching the required schema.`;

export async function tailorApplication(
  resumeText: string,
  jobDescription: string
): Promise<TailoredApplication> {
  const res = await fetch(`${GEMINI_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Model did not return a tailored application.");
  }

  return JSON.parse(text) as TailoredApplication;
}
