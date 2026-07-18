import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TailorCV — AI Resume Tailoring & ATS Optimization",
  description:
    "Paste your resume and a job posting. Get a tailored resume, cover letter, ATS match score, and interview prep in seconds. No subscription — pay once per job search.",
  openGraph: {
    title: "TailorCV — AI Resume Tailoring & ATS Optimization",
    description:
      "Tailor your resume to any job posting in seconds. ATS match score, cover letter, and interview prep included. No subscription.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
