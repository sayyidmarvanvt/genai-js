import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createRetriever } from "./5-retriever";
import { formatDocumentsAsString } from "@langchain/classic/util/document";
import { chat, ChatHandler } from "../utils/chat";

async function main() {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "human",
      `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
Question: {question} 
Context: {context} 
Answer:`,
    ],
  ]);

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  });

  const outputParser = new StringOutputParser();

  // ✅ No more top-level await
  const retriever = await createRetriever();

  const retrievalChain = RunnableSequence.from([
    (input: { question: string }) => input.question,
    retriever,
    formatDocumentsAsString,
  ]);

  const generationChain = RunnableSequence.from([
    {
      question: (input: { question: string }) => input.question,
      context: retrievalChain,
    },
    prompt,
    llm,
    outputParser,
  ]);

  const chatHandler: ChatHandler = async (question: string) => {
    return {
      answer: generationChain.stream({
        question,
      }),
    };
  };

  chat(chatHandler);
}

// run app
main().catch(console.error);
