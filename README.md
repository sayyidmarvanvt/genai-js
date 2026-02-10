# Generative AI & LangChain.js Knowledge Base

## Overview

This document summarizes the core concepts and workflow of building **generative AI applications** using JavaScript and LangChain, focusing on **retrieval-augmented generation (RAG)**, vector embeddings, and LLM-based pipelines.

The workflow covers:

1. Prompt creation
2. Context retrieval
3. LLM response generation
4. Handling large context efficiently with embeddings and vector stores

---

## Core Concepts

### 1. Prompt Flow

The normal pipeline for LLM-based question answering:

1. **PromptTemplate**: Formats the user question with any context.
2. **LLM**: Generates the raw response.
3. **Output Parser**: Processes the LLM output into structured results.
4. **RunnableSequence**: Chains these steps in a controlled, composable way.

---

### 2. Retrieval-Augmented Generation (RAG)

RAG allows models to **answer questions with external knowledge**. It has three main parts:

* **Retriever**: Fetches relevant context from a knowledge base or document store.
* **Augmentation**: Injects the retrieved context into the prompt.
* **Generation**: LLM produces the final response using the augmented prompt.

**Key note:** Large context can lead to poor results, high token usage, and higher costs. To manage this, we use **chunking and embeddings**.

---

### 3. Chunking and Vector Embeddings

1. **Splitting documents into chunks**

   * Large documents are divided into smaller pieces (paragraphs, sentences, etc.) to maintain efficiency and relevance.

2. **Vector embeddings**

   * Chunks are converted into **numerical vectors** (high-dimensional representations) via an **embedding LLM**.
   * These vectors are stored in a **vector database** (e.g., Pinecone) for efficient similarity search.

3. **Indexing process**

   ```
   document → split into chunks → generate embeddings → store vectors in index
   ```

   * These vectors capture semantic meaning, allowing similarity searches for relevant content.

---

### 4. Query / Retrieval Process

1. **User question** → sent to **Retriever**

   * The question is also converted into an embedding vector.

2. **Proximity search**

   * Retriever searches the vector store for **closest matching vectors** (relevant chunks).

3. **Context assembly**

   * Retrieved chunks are converted back into **readable text** for the prompt template.

4. **LLM generation**

   * Prompt receives `{ question, context }`.
   * LLM generates an answer.
   * Output parser formats it for display.

```
User question → embedding → vector store search → retrieve context → augment prompt → LLM → output → user
```

**Important:** The **retriever is responsible for converting vectors back into readable context** for the prompt. The vector store itself only stores embeddings, not text formatting.

---

### 5. Key Patterns & Best Practices

* **Never lose structure**: Once you convert an object to a string, you cannot recover named variables (`question`, `context`) later. Always pass objects where prompt variables are required.
* **Separate chains**: Splitting retrieval and generation chains makes pipelines easier to debug, maintain, and reuse.
* **Context management**: Avoid sending large contexts directly to LLMs—use embeddings to filter only relevant chunks.
* **Normalization**: For embeddings smaller than the default (3072), normalize vectors for accurate similarity comparison.
* **RAG safety**: If no relevant context is found, instruct the LLM to respond with “I don’t know” to prevent hallucinations.

---

### 6. Workflow Summary

#### Indexing

```
Document → Split → Embed → Store in Vector DB
```

#### Querying

```
User question → Embed → Retrieve relevant chunks → Prompt template → LLM → Output parser → Answer
```

---

### 7. Mental Model

Think of RAG as **data routing + semantic search + LLM reasoning**:

* **Retriever**: Finds the “needle” (relevant info) in a haystack (vector store).
* **Prompt Augmentation**: Wraps the needle with instructions for the LLM.
* **LLM Generation**: Produces the human-readable answer.

This flow ensures **accuracy, efficiency, and cost control**.



