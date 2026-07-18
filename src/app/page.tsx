import Link from "next/link";
import Script from "next/script";

const PRICING = [
  {
    name: "Starter",
    price: "$7",
    credits: "3 tailored applications",
    gumroadUrl: "https://gumroad.com/l/REPLACE_WITH_YOUR_PERMALINK_3",
  },
  {
    name: "Job Search",
    price: "$15",
    credits: "10 tailored applications",
    gumroadUrl: "https://gumroad.com/l/REPLACE_WITH_YOUR_PERMALINK_10",
    featured: true,
  },
];

export default function Home() {
  return (
    <>
      <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Tailor your resume to any job in seconds
          </h1>
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
            Paste your resume and the job posting. Get a rewritten resume, a matching cover
            letter, your ATS match score, and likely interview questions — instantly. No
            subscription. Pay once for your job search, not forever.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/app"
              className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 font-medium hover:opacity-90"
            >
              Try it free — 1 application
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-center">How it works</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">1</div>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Paste your resume and the job description you&apos;re applying to.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold">2</div>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Claude rewrites your resume to match the role and checks your ATS keyword score.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold">3</div>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Copy your tailored resume, cover letter, LinkedIn summary, and interview prep.
              </p>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="max-w-3xl mx-auto px-6 py-16 border-t border-neutral-200 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-semibold text-center">Pricing</h2>
          <p className="mt-2 text-center text-neutral-600 dark:text-neutral-400">
            No subscription. Buy a credit pack, use it across your whole job search.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 text-center ${
                  tier.featured
                    ? "border-neutral-900 dark:border-white"
                    : "border-neutral-200 dark:border-neutral-800"
                }`}
              >
                <h3 className="font-semibold">{tier.name}</h3>
                <div className="mt-2 text-4xl font-bold">{tier.price}</div>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">{tier.credits}</p>
                <a
                  href={tier.gumroadUrl}
                  className="gumroad-button mt-6 inline-block rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2 font-medium hover:opacity-90"
                >
                  Buy now
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-center text-neutral-500">
            After purchase, use the email from your Gumroad receipt to redeem your credits in the
            tool.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-center">FAQ</h2>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-medium">Is my resume data stored?</h3>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                Your resume and job description are sent to Google&apos;s Gemini API to generate
                your tailored materials. See our{" "}
                <Link href="/privacy" className="underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="font-medium">What counts as one credit?</h3>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                One credit tailors your resume to one job posting, including the cover letter,
                ATS score, LinkedIn summary, and interview questions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="max-w-3xl mx-auto px-6 flex justify-between text-sm text-neutral-500">
          <span>TailorCV</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
