import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email"),
  source: z.string().max(80).optional(),
  honeypot: z.string().max(0).optional(),
});

export type SubscribeData = z.infer<typeof subscribeSchema>;
