import type { Context } from "telegraf";

export const HelpCommand = (ctx: Context) => {
  ctx.reply("Help!");
};
