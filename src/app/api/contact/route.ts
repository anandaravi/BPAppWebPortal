import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, company, email, phone, role, companySize, interests, message, honeypot } = parsed.data;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@papyrusbpapp.com";

    const interestList = interests && interests.length > 0 ? interests : [];
    const interestSummary = interestList.length > 0
      ? interestList.slice(0, 4).join(", ") + (interestList.length > 4 ? `, +${interestList.length - 4} more` : "")
      : "no specific";

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Papyrus BPApp Website <noreply@papyrusbpapp.com>",
        to: toEmail,
        subject: `Demo: ${company} (${interestSummary})`,
        text: [
          `Name: ${name}`,
          `Company: ${company}`,
          `Email: ${email}`,
          `Phone: ${phone ?? "—"}`,
          `Role: ${role}`,
          `Company size: ${companySize ?? "—"}`,
          ``,
          `Interested in (${interestList.length}):`,
          interestList.length > 0 ? interestList.map(i => `  • ${i}`).join("\n") : "  (none selected)",
          ``,
          `Requirements / message:`,
          message ?? "—",
        ].join("\n"),
      });
    } else {
      console.log("[contact] RESEND_API_KEY not set — logging submission:", {
        name, company, email, role, interests: interestList,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
