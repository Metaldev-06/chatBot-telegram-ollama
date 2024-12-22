import type { Context } from "telegraf";
import { COMMANDS } from "../utils/commandList";

export const HelpCommand = async (ctx: Context) => {
  const helpMessage = COMMANDS.map((command) => {
    return `${command.command}: ${command.description}`;
  }).join("\n");
  await ctx.reply(`Estos son los comandos disponibles:\n\n${helpMessage}`);
};
