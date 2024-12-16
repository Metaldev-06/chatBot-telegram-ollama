import { Context } from "telegraf";
import { chatWithOllamaStream } from "../../services/ollama.service";
import { message } from "telegraf/filters";

/**
 * Comando para interactuar con Ollama en tiempo real
 * @param ctx Contexto de Telegraf
 */
export const ChatCommand = async (ctx: Context) => {
  const message = ctx.message.text;

  if (!message) {
    await ctx.reply("Por favor, envía un mensaje válido.");
    return;
  }

  try {
    // Llamada al servicio de Ollama con streaming
    await chatWithOllamaStream(ctx);
  } catch (error) {
    console.error("Error en el comando de chat:", error);
    await ctx.reply("Hubo un problema al procesar tu mensaje.");
  }
};
