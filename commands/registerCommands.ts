import { Telegraf } from "telegraf";
const { message } = require("telegraf/filters");

import { HelpCommand } from "./help";
import { StartCommand } from "./start";
import { ChatCommand } from "./handlers/chat.handler";
import { ResetCommand } from "./reset";
import { SetPromptCommand } from "./setPrompt";

export const registerCommands = (bot: Telegraf) => {
  bot.start(StartCommand);
  bot.help(HelpCommand);
  bot.on("text", ChatCommand);
  bot.command("reset", ResetCommand);
  bot.command("setprompt", SetPromptCommand);
};
