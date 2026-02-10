"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var groq_1 = require("@langchain/groq");
var llm = new groq_1.ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    maxRetries: 0,
});
var res = await llm.invoke("Translate 'I love programming' to French");
console.log(res.content);
