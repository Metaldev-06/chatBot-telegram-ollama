import { z } from "zod";

const env = z.object({
  TOKEN_API: z.string(),
});

export const config = env.parse(process.env);
