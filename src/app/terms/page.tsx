import Link from "next/link";

export const metadata = { title: "Terms of Service — TailorCV" };

export default function TermsPage() {
  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-6 py-16 prose-neutral">
        <Link href="/" className="text-sm underline">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold mt-6">Terms of Service</h1>

        <p className="mt-6 text-neutral-700 dark:text-neutral-300">
          TailorCV provides AI-generated resume, cover letter, and career preparation content
          based on the information you provide. The output is a drafting aid — you are
          responsible for reviewing all generated content for accuracy before using it in a job
          application.
        </p>

        <h2 className="text-xl font-semibold mt-8">Credits</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Purchased credits do not expire and are not refundable once used. One credit is
          consumed per completed generation.
        </p>

        <h2 className="text-xl font-semibold mt-8">No warranty</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Generated content is provided as-is without warranty of job-search outcomes. TailorCV
          does not guarantee interviews or job offers.
        </p>

        <h2 className="text-xl font-semibold mt-8">Contact</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Questions can be sent to the contact email listed on our Gumroad storefront.
        </p>
      </div>
    </main>
  );
}
