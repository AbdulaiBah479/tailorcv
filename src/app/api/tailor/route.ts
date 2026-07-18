import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tailorApplication } from "@/lib/gemini";
import { tryDecrementCredit } from "@/lib/credits";
import { FREE_TRIAL_COOKIE } from "@/lib/credits";

const MAX_INPUT_LENGTH = 20000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const resumeText = body?.resumeText;
  const jobDescription = body?.jobDescription;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (
    typeof resumeText !== "string" ||
    typeof jobDescription !== "string" ||
    !resumeText.trim() ||
    !jobDescription.trim()
  ) {
    return NextResponse.json(
      { error: "Please provide both your resume and the job description." },
      { status: 400 }
    );
  }

  if (resumeText.length > MAX_INPUT_LENGTH || jobDescription.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: "Resume or job description is too long." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const usedFreeTrial = cookieStore.get(FREE_TRIAL_COOKIE)?.value === "1";

  let usingFreeTrial = false;

  if (!usedFreeTrial) {
    usingFreeTrial = true;
  } else if (email) {
    const hadCredit = await tryDecrementCredit(email);
    if (!hadCredit) {
      return NextResponse.json(
        { error: "No credits remaining for this email. Purchase a credit pack to continue." },
        { status: 402 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Enter the email you used at checkout to use a paid credit." },
      { status: 401 }
    );
  }

  try {
    const result = await tailorApplication(resumeText, jobDescription);
    const response = NextResponse.json(result);

    if (usingFreeTrial) {
      response.cookies.set(FREE_TRIAL_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("tailor generation failed", err);
    return NextResponse.json(
      { error: "Something went wrong generating your application. Please try again." },
      { status: 500 }
    );
  }
}
