---
name: qmd-expert
description: How to effectively use QMD (Quick Markdown Search) to pull in extra relevant context, run multi-query searches, extract high-scoring chunk IDs, and fetch their contents. Use this skill when asked to search across a large markdown knowledge base, run QMD queries, or retrieve deep context using the qmd CLI.
---

# QMD Expert Workflow

This skill outlines the most effective workflow for AI agents to query, extract, and fetch relevant context from a knowledge base using the `qmd` CLI tool.

Because `qmd` chunks documents under the hood, standard search commands often return specific, highly relevant chunks (identified by a `#hash`) rather than entire files. To ensure you don't lose the pointer to the most relevant information, follow this robust workflow.

## 1. Understand QMD Capabilities

If you are ever unsure about the syntax, query types (`lex`, `vec`, `hyde`, `expand`), or available flags, you should start by running:

```bash
qmd skill show
```

This will output the embedded QMD documentation detailing how to write good queries, use intent for disambiguation, and combine search types for the best recall.

## 2. Formulating Queries

Identify a list of diverse queries to cast a wide net over the knowledge base. Consider mixing query types based on the user's need:

*   **`qmd query "exact search terms"`**: Good for general hybrid search (auto-expands).
*   **`qmd search "keywords"`**: Strict BM25 text search (no LLM, good for exact matches).
*   **`qmd vsearch "natural language question"`**: Vector similarity search (good when you don't know the exact vocabulary).

## 3. Bypassing Limits and Extracting Chunk IDs

By default, the `qmd` CLI limits results to 20 when using the `--files` flag. When running multiple queries to gather comprehensive context, you should bypass this limit, set a strict quality threshold, and dump the raw results to a file. 

**DO NOT** parse the text immediately in the shell, as you might throw away useful data (like the `#hash` chunk ID) before verifying it.

**Example Command:**

```bash
# Clean up any old results
rm -f raw-qmd-results.txt

# Define your queries
queries=(
  'query "PerformanceEventTiming"'
  'vsearch "PerformanceEventTiming"'
  'search "Digging into Interaction to Next Paint"'
)

# Run queries with --all (bypasses the 20 limit) and --min-score 0.7
for q in "${queries[@]}"; do
  echo "--- Query: $q ---" >> raw-qmd-results.txt
  # The --files flag returns output in the format: #hash,score,qmd://url
  eval "qmd $q --all --min-score 0.7 --files" 2>/dev/null | grep "^#" >> raw-qmd-results.txt
done
```

## 4. Processing the Raw Results

Once you have the `raw-qmd-results.txt` file, you can parse it to extract the unique chunk IDs. The output from the `--files` flag is comma-separated: `ChunkID,Score,URI`.

If the result set is large, you should sort the results by score descending and take the top N chunks to avoid overwhelming your context window.

```bash
# Extract the first column (the #hash), sort, and remove duplicates
awk -F, '{print $1}' raw-qmd-results.txt | grep "^#" | sort -u > unique-chunks.txt

# Or, extract the top 10 highest-scoring unique chunks:
awk -F, '{print $2 "," $1}' raw-qmd-results.txt | sort -rn | awk -F, '!seen[$2]++ {print $2}' | head -n 10 > top-10-chunks.txt
```

*Note: Extracting the `#hash` ID is critical. If you only extract the URI (`qmd://...`), you lose the pointer to the specific chunk that scored highly, forcing you to sift through potentially massive documents later.*

## 5. Retrieving Chunk Content

With your list of highly relevant chunk IDs, you can now fetch the exact snippets using `qmd get`. 

If you are fetching many chunks, be mindful of your context window. Always fetch the output into a markdown file, and consider limiting the lines returned if you are dealing with a large result set.

```bash
# Create a file to hold the context
> qmd-chunks.md

# Fetch the full content of specific chunks
while read -r chunk_id; do
  echo -e "\n\n--- Chunk: $chunk_id ---" >> qmd-chunks.md
  qmd get "$chunk_id" >> qmd-chunks.md 2>/dev/null
done < top-10-chunks.txt

# Optional: You can control how many lines of context are returned around the chunk
# using the -l flag (e.g. -l 20) to keep the context window lean.
qmd get "#888e5a" -l 20
```

By retrieving the chunk via its hash, you pull exactly the high-value context that matched your query threshold, keeping your context window lean and highly relevant.

## 6. Retrieving Full Documents

Sometimes a chunk does not provide enough surrounding context and you need to read the entire file. The `--files` flag outputs `ChunkID,Score,URI`. You can extract the URI, strip any line number suffixes, and fetch the full document using `qmd get`.

```bash
# Extract URIs, strip line numbers (e.g., :32), and get unique URLs
awk -F, '{print $3}' raw-qmd-results.txt | sed 's/:[0-9]*$//' | sort -u > full-urls.txt

# Fetch the full documents
> full-docs.md
while read -r url; do
  echo -e "\n\n=== Document: $url ===" >> full-docs.md
  qmd get "$url" >> full-docs.md 2>/dev/null
done < full-urls.txt
```
