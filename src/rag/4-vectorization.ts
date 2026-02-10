import "dotenv/config";
import cliProgress from "cli-progress";
import { loadDocuments } from "./2-loadDocuments";
import { splitDocuments } from "./3-splitDocuments";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const rawDocuments = await loadDocuments();
const chunkedDocuments = await splitDocuments(rawDocuments);

const embeddingLLM = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
});

const pinecone = new Pinecone();
const pineconeIndex = pinecone.index("langchain-chatbot");

console.log("Starting Vecrotization...");
const progressBar = new cliProgress.SingleBar({});
progressBar.start(chunkedDocuments.length, 0);

for (let i = 0; i < chunkedDocuments.length; i = i + 100) {
  const batch = chunkedDocuments.slice(i, i + 100);

  // Google Gemini free tier has rate limit of 100 requests per min for the embedding model
  // Wait 1.5 minute before processing each batch if you are using Google Gemini (except the first one)
  if (i > 0) {
    await new Promise((resolve) => setTimeout(resolve, 90000));
  }

  await PineconeStore.fromDocuments(batch, embeddingLLM, {
    pineconeIndex,
  });

  progressBar.increment(batch.length);
}

progressBar.stop();
console.log("Chunked documents stored in pinecone.");
