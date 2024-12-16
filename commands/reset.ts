import { Context } from "telegraf";
import { conversationHistories } from "../services/ollama.service";

/**
 * Comando para reiniciar el historial de conversación
 * @param ctx Contexto de Telegraf
 */
export const ResetCommand = async (ctx: Context) => {
  try {
    const chatId = ctx.chat?.id || 0;

    console.log(conversationHistories[chatId]);

    // Eliminar el historial de conversación del usuario
    if (conversationHistories[chatId]) {
      delete conversationHistories[chatId];
      await ctx.reply("El historial de conversación ha sido reiniciado.");

      console.log(conversationHistories[chatId]);
    } else {
      await ctx.reply("No hay un historial previo para reiniciar.");
    }
  } catch (error) {
    console.error("Error en el comando /reset:", error);
    await ctx.reply("Hubo un problema al reiniciar el historial.");
  }
};
