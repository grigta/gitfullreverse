/**
 * Parse the LLM response that contains both ===EXPLANATION=== and ===PROMPT=== sections.
 * Falls back gracefully for old cached entries that only have a prompt.
 */
export function parseSections(raw: string): {
  explanation: string;
  prompt: string;
} {
  const explMarker = "===EXPLANATION===";
  const promptMarker = "===PROMPT===";

  const explIdx = raw.indexOf(explMarker);
  const promptIdx = raw.indexOf(promptMarker);

  if (explIdx !== -1 && promptIdx !== -1 && promptIdx > explIdx) {
    const explanation = raw
      .slice(explIdx + explMarker.length, promptIdx)
      .trim();
    const prompt = raw.slice(promptIdx + promptMarker.length).trim();
    return { explanation, prompt };
  }

  // Fallback: old format — entire text is the prompt, no explanation
  return { explanation: "", prompt: raw.trim() };
}
