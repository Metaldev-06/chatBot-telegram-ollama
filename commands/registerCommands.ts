import { Telegraf } from "telegraf";

import { HelpCommand } from "./help";
import { StartCommand } from "./start";
import { ChatCommand } from "./handlers/chat.handler";
import { ResetCommand } from "./reset";
import { SetPromptCommand } from "./setPrompt";
import { ImageGeneratorCommand } from "./imageGenerator";
import { ChatCommand2 } from "./handlers/chat-command.handler";

export const registerCommands = (bot: Telegraf) => {
  //!Comandos específicos
  bot.start(StartCommand);
  bot.help(HelpCommand);
  bot.command("reset", ResetCommand);
  bot.command("setprompt", SetPromptCommand);
  // bot.on("text", ChatCommand2);

  //!Manejador de mensajes genéricos
  bot.on("text", async (ctx) => {
    const userMessage = ctx.message?.text?.toLowerCase().trim();

    // Verificar si el mensaje contiene palabras clave para imágenes
    const allowedKeywords = /(muéstrame|foto|imagen|genera|muestrame)/i;
    if (allowedKeywords.test(userMessage)) {
      await ImageGeneratorCommand(ctx);
      return;
    }

    // Si no coincide con palabras clave, se trata como un mensaje de chat
    await ChatCommand(ctx);
  });
};
