import { z } from "zod";

export const roiReportSchema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().max(120).optional(),
  company: z.string().max(160).optional(),
  tpd: z.number().min(1).max(2000),
  currentTrim: z.number().min(0).max(50),
  targetTrim: z.number().min(0).max(50),
  pricePerTon: z.number().min(1000).max(1000000),
  operatingDays: z.number().min(1).max(366),
  honeypot: z.string().max(0).optional(),
});

export type RoiReportData = z.infer<typeof roiReportSchema>;
