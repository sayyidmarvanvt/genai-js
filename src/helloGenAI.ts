import dotenv from "dotenv";
dotenv.config();

import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY!,
  model: "llama-3.3-70b-versatile",
  maxRetries: 0,
});

const res = await llm.invoke("Translate 'I love programming' to French");
console.log(res.content);
