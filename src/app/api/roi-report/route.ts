import { NextRequest, NextResponse } from "next/server";
import { roiReportSchema } from "@/lib/schemas/roi-report";

const FROM = "Papyrus BPApp <onboarding@resend.dev>";

const formatINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};
const formatTons = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K tons` : `${Math.round(n).toLocaleString("en-IN")} tons`;

function compute(input: {
  tpd: number;
  currentTrim: number;
  targetTrim: number;
  pricePerTon: number;
  operatingDays: number;
}) {
  const annualTons = input.tpd * input.operatingDays;
  const wastedNow = annualTons * (input.currentTrim / 100);
  const wastedAfter = annualTons * (input.targetTrim / 100);
  const tonsSaved = wastedNow - wastedAfter;
  const lossNow = wastedNow * input.pricePerTon;
  const lossAfter = wastedAfter * input.pricePerTon;
  const annualSaving = lossNow - lossAfter;
  return {
    annualTons,
    tonsSaved,
    lossNow,
    lossAfter,
    annualSaving,
    monthlySaving: annualSaving / 12,
    fiveYearSaving: annualSaving * 5,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = roiReportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, name, company, honeypot, ...inputs } = parsed.data;
    if (honeypot) return NextResponse.json({ success: true });

    const calc = compute(inputs);
    const apiKey = process.env.RESEND_API_KEY;
    const salesEmail = process.env.CONTACT_TO_EMAIL ?? "info@papyrus360.com";

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      const prospectHtml = renderReport({ email, name, company, inputs, calc });
      const prospectText = renderText({ inputs, calc });

      const prospectRes = await resend.emails.send({
        from: FROM,
        to: email,
        subject: `Your paper-mill ROI report — ${formatINR(calc.annualSaving)}/yr savings`,
        html: prospectHtml,
        text: prospectText,
      });
      if (prospectRes.error) {
        console.error("[roi-report] prospect send error:", prospectRes.error);
        return NextResponse.json(
          { error: "Email send failed", detail: prospectRes.error },
          { status: 500 }
        );
      }

      // sales notification
      const salesRes = await resend.emails.send({
        from: FROM,
        to: salesEmail,
        replyTo: email,
        subject: `ROI Lead: ${company ?? email} — ${formatINR(calc.annualSaving)}/yr`,
        text: [
          `New ROI Calculator lead`,
          `─────────────────────────`,
          `Email     : ${email}`,
          `Name      : ${name ?? "—"}`,
          `Company   : ${company ?? "—"}`,
          ``,
          `Inputs:`,
          `  TPD             : ${inputs.tpd}`,
          `  Current trim    : ${inputs.currentTrim}%`,
          `  Target trim     : ${inputs.targetTrim}%`,
          `  Price / ton     : ₹${inputs.pricePerTon.toLocaleString("en-IN")}`,
          `  Operating days  : ${inputs.operatingDays}`,
          ``,
          `Result:`,
          `  Annual saving   : ${formatINR(calc.annualSaving)}`,
          `  Tons recovered  : ${formatTons(calc.tonsSaved)}`,
          `  5-year saving   : ${formatINR(calc.fiveYearSaving)}`,
        ].join("\n"),
      });
      if (salesRes.error) console.error("[roi-report] sales send error:", salesRes.error);

      console.log("[roi-report] sent:", prospectRes.data?.id, "→", email);
    } else {
      console.log("[roi-report] RESEND_API_KEY not set — logging:", { email, inputs, calc });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[roi-report] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderText({
  inputs,
  calc,
}: {
  inputs: { tpd: number; currentTrim: number; targetTrim: number; pricePerTon: number; operatingDays: number };
  calc: ReturnType<typeof compute>;
}) {
  return [
    `Your Paper Mill ROI Report — Papyrus BPApp`,
    `──────────────────────────────────────────`,
    ``,
    `Your inputs:`,
    `  Daily production    : ${inputs.tpd} TPD`,
    `  Current trim waste  : ${inputs.currentTrim}%`,
    `  Target trim waste   : ${inputs.targetTrim}%`,
    `  Avg paper price     : ₹${inputs.pricePerTon.toLocaleString("en-IN")}/ton`,
    `  Operating days/year : ${inputs.operatingDays}`,
    ``,
    `Result:`,
    `  Annual saving       : ${formatINR(calc.annualSaving)}`,
    `  Tons recovered      : ${formatTons(calc.tonsSaved)}`,
    `  Per month           : ${formatINR(calc.monthlySaving)}`,
    `  Over 5 years        : ${formatINR(calc.fiveYearSaving)}`,
    ``,
    `Trim only — full ERP value (working capital, payroll, maintenance, GST) typically adds 1.5–3× more.`,
    ``,
    `Talk to us: https://bpapperp.papyrus360.com/contact`,
  ].join("\n");
}

function renderReport({
  email,
  name,
  company,
  inputs,
  calc,
}: {
  email: string;
  name?: string;
  company?: string;
  inputs: { tpd: number; currentTrim: number; targetTrim: number; pricePerTon: number; operatingDays: number };
  calc: ReturnType<typeof compute>;
}) {
  const greeting = name ? `Hi ${esc(name.split(" ")[0])},` : `Hi,`;
  const companyLine = company ? `<p style="margin:0 0 14px 0;color:#a1a1aa;font-size:13px;">Prepared for <strong style="color:#f59e0b;">${esc(company)}</strong></p>` : "";

  const inputRow = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#71717a;font-size:13px;width:200px;">${esc(label)}</td><td style="padding:8px 0;color:#fafafa;font-size:14px;font-weight:500;font-family:monospace;">${esc(value)}</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Your ROI Report</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080808;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

      <!-- HEADER -->
      <tr><td style="background:linear-gradient(135deg,#1a1a1a,#0f0f0f);border:1px solid #2a2a2a;border-bottom:none;border-radius:12px 12px 0 0;padding:28px 32px;">
        <p style="margin:0;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Your Paper Mill ROI Report</p>
        <h1 style="margin:8px 0 0 0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Trim-waste savings analysis</h1>
      </td></tr>

      <!-- HEADLINE NUMBER -->
      <tr><td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:32px;text-align:center;">
        ${greeting}
        ${companyLine}
        <p style="margin:8px 0 6px 0;color:#a1a1aa;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Estimated annual saving</p>
        <p style="margin:0;color:#f59e0b;font-size:48px;font-weight:900;letter-spacing:-1.5px;line-height:1;">${formatINR(calc.annualSaving)}</p>
        <p style="margin:10px 0 0 0;color:#d4d4d8;font-size:14px;">${formatTons(calc.tonsSaved)} of paper recovered annually</p>
      </td></tr>

      <!-- BREAKDOWN -->
      <tr><td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:8px 32px 24px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" style="padding:12px;background:#111;border:1px solid #2a2a2a;border-radius:8px;">
              <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Per month</p>
              <p style="margin:6px 0 0 0;color:#fafafa;font-size:20px;font-weight:700;">${formatINR(calc.monthlySaving)}</p>
            </td>
            <td width="12"></td>
            <td width="50%" style="padding:12px;background:#111;border:1px solid #2a2a2a;border-radius:8px;">
              <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Over 5 years</p>
              <p style="margin:6px 0 0 0;color:#fafafa;font-size:20px;font-weight:700;">${formatINR(calc.fiveYearSaving)}</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- INPUTS -->
      <tr><td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:8px 32px 24px 32px;">
        <p style="margin:0 0 14px 0;color:#a1a1aa;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Your inputs</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${inputRow("Daily production", `${inputs.tpd} TPD`)}
          ${inputRow("Current trim waste", `${inputs.currentTrim.toFixed(1)}%`)}
          ${inputRow("Target trim waste", `${inputs.targetTrim.toFixed(1)}%`)}
          ${inputRow("Avg paper price", `₹${inputs.pricePerTon.toLocaleString("en-IN")}/ton`)}
          ${inputRow("Operating days / year", `${inputs.operatingDays}`)}
          ${inputRow("Annual production", formatTons(calc.annualTons))}
        </table>
      </td></tr>

      <!-- NOTE -->
      <tr><td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:8px 32px 24px 32px;">
        <div style="background:#0f0f0f;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:6px;color:#d4d4d8;font-size:13px;line-height:1.6;">
          This number covers <strong>trim/deckle only</strong>. Full Papyrus BPApp value (working-capital improvement, payroll automation, predictive maintenance, GST automation, dispatch optimization) typically adds another <strong style="color:#f59e0b;">1.5–3×</strong> on top.
        </div>
      </td></tr>

      <!-- CTA -->
      <tr><td style="background:#0a0a0a;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;border-bottom:1px solid #2a2a2a;padding:8px 32px 28px 32px;text-align:center;">
        <a href="https://bpapperp.papyrus360.com/contact" style="display:inline-block;background:#f59e0b;color:#0a0a0a;font-weight:700;font-size:14px;padding:13px 28px;border-radius:8px;text-decoration:none;">Request a tailored demo →</a>
      </td></tr>

      <!-- FOOTER -->
      <tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:18px 32px;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;border-bottom:1px solid #2a2a2a;text-align:center;">
        <p style="margin:0;color:#52525b;font-size:12px;line-height:1.6;">
          Generated for ${esc(email)}<br>
          <a href="https://bpapperp.papyrus360.com" style="color:#71717a;text-decoration:none;">bpapperp.papyrus360.com</a>
          · ${new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST
        </p>
      </td></tr>

    </table>
  </td></tr>
</table></body></html>`;
}
