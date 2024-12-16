import { Telegraf } from "telegraf";

import { config } from "./config";

import { registerCommands } from "./commands/registerCommands";

export const main = async () => {
  const bot = new Telegraf(config.TOKEN_API);

  // Registrar comandos
  registerCommands(bot);

  // Iniciar el bot
  console.log("✅ Bot configurado. Lanzando...");
  await bot.launch();
  console.log("✅ Bot está en funcionamiento");

  // Manejar señales para apagar correctamente
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
