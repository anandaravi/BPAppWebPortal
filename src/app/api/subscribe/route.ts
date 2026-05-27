import { NextRequest, NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/schemas/subscribe";

const FROM = "Papyrus BPApp <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { email, source, honeypot } = parsed.data;
    if (honeypot) return NextResponse.json({ success: true });

    const apiKey = process.env.RESEND_API_KEY;
    const salesEmail = process.env.CONTACT_TO_EMAIL ?? "info@papyrus360.com";
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      if (audienceId) {
        const c = await resend.contacts.create({ email, audienceId, unsubscribed: false });
        if (c.error) console.error("[subscribe] contacts.create error:", c.error);
      }

      const notify = await resend.emails.send({
        from: FROM,
        to: salesEmail,
        replyTo: email,
        subject: `Newsletter subscribe: ${email}`,
        text: `New subscriber: ${email}\nSource: ${source ?? "footer"}\n`,
      });
      if (notify.error) console.error("[subscribe] notify error:", notify.error);
    } else {
      console.log("[subscribe] RESEND_API_KEY not set — would subscribe:", email);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
