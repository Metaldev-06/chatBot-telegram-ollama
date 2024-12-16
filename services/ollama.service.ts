import ollama from "ollama";
import { Context } from "telegraf";

// Objeto para almacenar el historial de conversaciones por chat
export const conversationHistories: Record<
  number,
  { role: string; content: string }[]
> = {};

// Prompt por defecto
const defaultPrompt = {
  role: "system",
  content: `Eres un asistente de IA que siempre responde en español. Debes recordar el contexto de la conversación previa para responder de manera coherente. Si el usuario hace una pregunta que depende de una respuesta anterior, utiliza esa información para generar tu respuesta.`,
};

/**
 * Interactúa con Ollama usando streaming y conserva el contexto
 * @param ctx Contexto de Telegraf
 */
export const chatWithOllamaStream = async (ctx: Context): Promise<void> => {
  try {
    const chatId = ctx.chat?.id || 0;
    const userMessage = ctx.message?.text || "";

    // Inicializar historial si no existe
    if (!conversationHistories[chatId]) {
      conversationHistories[chatId] = [defaultPrompt];
    }

    // Agregar el mensaje del usuario al historial
    conversationHistories[chatId].push({ role: "user", content: userMessage });

    // Truncar el historial si es necesario
    const maxMessages = 10;
    const truncatedHistory = conversationHistories[chatId].slice(-maxMessages);

    // Preparar la solicitud a Ollama con el historial truncado
    // console.log(
    //   "Historial enviado a Ollama:",
    //   JSON.stringify(truncatedHistory, null, 2)
    // );
    const response = await ollama.chat({
      model: "llama3.2:3b",
      messages: truncatedHistory,
      stream: true,
    });

    let partialResponse = "";
    let lastTypingTime = Date.now();

    for await (const part of response) {
      partialResponse += part.message.content;

      // Enviar "typing..." solo si ha pasado un intervalo
      if (Date.now() - lastTypingTime > 2000) {
        await ctx.telegram.sendChatAction(chatId, "typing");
        lastTypingTime = Date.now();
      }
    }

    // Agregar la respuesta al historial
    if (partialResponse.trim()) {
      conversationHistories[chatId].push({
        role: "assistant",
        content: partialResponse,
      });
      await ctx.reply(partialResponse);
    }
  } catch (error) {
    console.error("Error en el streaming de Ollama:", error);
    await ctx.reply("Hubo un problema al procesar tu solicitud.");
  }
};
