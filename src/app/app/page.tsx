"use client";

import { useState } from "react";
import Link from "next/link";

interface ChecklistItem {
  item: string;
  status: "pass" | "warning" | "fail";
  note: string;
}

interface TailoredApplication {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  tailored_resume: string;
  cover_letter: string;
  linkedin_about: string;
  checklist: ChecklistItem[];
  interview_questions: string[];
}

const STATUS_STYLES: Record<ChecklistItem["status"], string> = {
  pass: "text-green-700 dark:text-green-400",
  warning: "text-amber-700 dark:text-amber-400",
  fail: "text-red-700 dark:text-red-400",
};

function CopyableBlock({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="flex items-center justify-between no-print">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-sm rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => window.print()}
            className="text-sm rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
      <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed">{text}</pre>
    </div>
  );
}

export default function AppPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TailoredApplication | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between no-print">
          <Link href="/" className="font-semibold">
            TailorCV
          </Link>
          <Link href="/#pricing" className="text-sm underline">
            Buy credits
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 no-print">
          <div>
            <label className="block text-sm font-medium mb-2">Your resume</label>
            <textarea
              required
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={10}
              placeholder="Paste your current resume text here..."
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-4 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job description</label>
            <textarea
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              placeholder="Paste the job posting you're applying to..."
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-4 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email (only needed after your free application — use the email from your Gumroad
              receipt)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-4 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Tailoring your application..." : "Tailor my resume"}
          </button>
        </form>

        {result && (
          <div className="mt-14 space-y-8">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 no-print">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">ATS match score</h3>
                <span className="text-2xl font-bold">{result.match_score}/100</span>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Matched keywords</p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {result.matched_keywords.join(", ") || "None found"}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Missing keywords</p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {result.missing_keywords.join(", ") || "None"}
                  </p>
                </div>
              </div>
            </div>

            <CopyableBlock title="Tailored resume" text={result.tailored_resume} />
            <CopyableBlock title="Cover letter" text={result.cover_letter} />
            <CopyableBlock title="LinkedIn About section" text={result.linkedin_about} />

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 no-print">
              <h3 className="font-semibold">Resume checklist</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {result.checklist.map((c, i) => (
                  <li key={i}>
                    <span className={`font-medium ${STATUS_STYLES[c.status]}`}>
                      {c.status.toUpperCase()}
                    </span>{" "}
                    — <span className="font-medium">{c.item}:</span> {c.note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 no-print">
              <h3 className="font-semibold">Likely interview questions</h3>
              <ol className="mt-4 space-y-2 text-sm list-decimal list-inside">
                {result.interview_questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
