import { Context } from "telegraf";
import { HfInference } from "@huggingface/inference";
import { config } from "../config";

const hf = new HfInference(config.HUGGINGFACE_TOKEN);

/**
 * Comando para generar imágenes usando Hugging Face
 * @param ctx Contexto de Telegraf
 */
export const ImageGeneratorCommand = async (ctx: Context) => {
  try {
    const userMessage = ctx.message?.text?.trim();

    if (!userMessage) {
      await ctx.reply(
        "Por favor, proporciona una descripción para generar la imagen."
      );
      return;
    }

    const model = "prashanth970/flux-lora-uncensored";

    await ctx.reply("Generando imagen, por favor espera... ⏳");

    // Llamar al modelo de Hugging Face con timeout manual
    const response = await Promise.race([
      hf.textToImage({
        model,
        inputs: userMessage,
        parameters: {
          width: 512,
          height: 512,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(new Error("Timeout: La generación tomó demasiado tiempo")),
          200000
        )
      ),
    ]);

    // Convertir el Blob en un Buffer
    const arrayBuffer = await (response as Response).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Enviar la imagen al usuario
    await ctx.replyWithPhoto(
      { source: buffer },
      { caption: `Imagen generada para: "${userMessage}"` }
    );
  } catch (error) {
    console.error("Error generando la imagen:", error);
    await ctx.reply(
      "Ocurrió un error al generar la imagen. Por favor, inténtalo más tarde."
    );
  }
};
