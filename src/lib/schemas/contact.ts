import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  role: z.enum(["owner", "gm", "finance", "it", "other"], {
    error: "Select your role",
  }),
  companySize: z.enum(["1-50", "51-200", "201-500", "500+", ""]).optional(),
  interests: z.array(z.string()).max(50).optional(),
  message: z.string().max(2000).optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
