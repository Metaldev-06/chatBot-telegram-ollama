import { Context } from "telegraf";
import { conversationHistories } from "../services/ollama.service";

/**
 * Comando para modificar el prompt por defecto
 * @param ctx Contexto de Telegraf
 */
export const SetPromptCommand = async (ctx: Context) => {
  try {
    const chatId = ctx.chat?.id || 0;
    const newPrompt = ctx.message?.text?.replace("/setprompt", "").trim();

    if (!newPrompt) {
      await ctx.reply(
        "Por favor, proporciona un nuevo prompt después del comando."
      );
      return;
    }

    // Actualizar el prompt en el historial
    const updatedPrompt = {
      role: "system",
      content: newPrompt,
    };

    // Reiniciar el historial con el nuevo prompt
    conversationHistories[chatId] = [updatedPrompt];
    await ctx.reply(`Prompt actualizado correctamente: "${newPrompt}"`);
  } catch (error) {
    console.error("Error en el comando /setprompt:", error);
    await ctx.reply("Hubo un problema al actualizar el prompt.");
  }
};
