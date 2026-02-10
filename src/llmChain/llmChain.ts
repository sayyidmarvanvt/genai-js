import dotenv from "dotenv";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

dotenv.config();

export async function personalizedPitch(
  course: string,
  role: string,
  wordLimit: number
) {
  const promptTemplate = new PromptTemplate({
    template:
      "Describe the importance of learning {course} for a {role}. Limit the output to {wordLimit} words.",
    inputVariables: ["course", "role", "wordLimit"],
  });

  const formattedPrompt = await promptTemplate.format({
    course,
    role,
    wordLimit,
  });

  console.log("Prompt :", formattedPrompt);

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    maxOutputTokens:60
  });
  const outputParser = new StringOutputParser();

  const runnableChain = RunnableSequence.from([
    promptTemplate,
    llm,
    outputParser,
  ]);

  const answer = await runnableChain.invoke({ course, role, wordLimit });
  console.log("AI Response :", answer);

  return answer;
}

await personalizedPitch("Python", "MERN Stack fresher", 50);
