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

    const { name, company, email, phone, role, companySize, message, honeypot } = parsed.data;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@papyrusbpapp.com";

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Papyrus BPApp Website <noreply@papyrusbpapp.com>",
        to: toEmail,
        subject: `Demo request from ${name} — ${company}`,
        text: [
          `Name: ${name}`,
          `Company: ${company}`,
          `Email: ${email}`,
          `Phone: ${phone ?? "—"}`,
          `Role: ${role}`,
          `Company size: ${companySize ?? "—"}`,
          `Message: ${message ?? "—"}`,
        ].join("\n"),
      });
    } else {
      console.log("[contact] RESEND_API_KEY not set — logging submission:", {
        name, company, email, role,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
