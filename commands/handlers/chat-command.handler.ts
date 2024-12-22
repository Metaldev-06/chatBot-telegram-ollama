import { Context } from "telegraf";
import { HfInference } from "@huggingface/inference";
import { config } from "../../config";

const hf = new HfInference(config.HUGGINGFACE_TOKEN);

/**
 * Comando para generar imágenes usando Hugging Face
 * @param ctx Contexto de Telegraf
 */
export const ChatCommand2 = async (ctx: Context) => {
  try {
    const userMessage = ctx.message?.text;

    const model =
      "QuantFactory/DarkIdol-Llama-3.1-8B-Instruct-1.2-Uncensored-GGUF";

    // Llamar al modelo de Hugging Face
    const response = await hf.textGeneration({
      model,
      messages: [{ role: "user", content: userMessage }],
      //   parameters: {
      //     max_new_tokens: 250,
      //   },
    });

    console.log("Respuesta del modelo:", response.generated_text);

    // Enviar la imagen al usuario
    // await ctx.reply(response.generated_text);
  } catch (error) {
    console.error("Error generando el texto:", error);
    await ctx.reply(
      "Ocurrió un error al generar el texto. Por favor, inténtalo más tarde."
    );
  }
};
