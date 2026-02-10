import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";

export async function createRetriever(): Promise<VectorStoreRetriever> {
  const embeddingLLM = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
  });

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.index("langchain-chatbot");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeIndex,
  });

  return vectorStore.asRetriever();
}

// const retriever = await createRetriever();

// const context = await retriever.invoke("What is langchain?");

// console.log(context);
