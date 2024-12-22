import { z } from "zod";

const env = z.object({
  TOKEN_API: z.string(),
  HUGGINGFACE_API: z.string(),
  HUGGINGFACE_TOKEN: z.string(),
});

export const config = env.parse(process.env);
