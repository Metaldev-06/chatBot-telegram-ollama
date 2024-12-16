import type { Context } from "telegraf";

export const StartCommand = (ctx: Context) => {
  ctx.reply("Welcome");
};
