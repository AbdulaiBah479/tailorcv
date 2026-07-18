import Link from "next/link";

export const metadata = { title: "Privacy Policy — TailorCV" };

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-6 py-16 prose-neutral">
        <Link href="/" className="text-sm underline">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold mt-6">Privacy Policy</h1>

        <p className="mt-6 text-neutral-700 dark:text-neutral-300">
          TailorCV processes the resume text and job description you submit in order to generate
          a tailored resume, cover letter, and related materials. This content is sent to
          Google&apos;s Gemini API for processing. Under Google&apos;s free-tier API terms,
          submitted content may be used by Google to improve their products; do not submit
          information you are not comfortable sharing on that basis.
        </p>

        <h2 className="text-xl font-semibold mt-8">What we store</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          We store your email address and remaining credit balance if you purchase a credit
          pack, so that you can use your paid credits across multiple sessions. We do not store
          the content of your resume or job descriptions after your request completes.
        </p>

        <h2 className="text-xl font-semibold mt-8">Payments</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Payments are processed by Gumroad, which acts as the merchant of record. We receive
          your email address and purchase details from Gumroad to grant credits; we do not
          receive or store your payment card details.
        </p>

        <h2 className="text-xl font-semibold mt-8">Contact</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Questions about this policy can be sent to the contact email listed on our Gumroad
          storefront.
        </p>
      </div>
    </main>
  );
}
