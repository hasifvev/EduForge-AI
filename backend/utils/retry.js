/**
 * withRetry — wraps an async agent call with Zod validation and automatic retry.
 * Built by Codex as part of IlmuEducator infrastructure.
 *
 * @param {Function} fn         - Async function that calls the AI agent
 * @param {Object}   options
 * @param {string}   options.agentName  - Name for error messages
 * @param {number}   options.maxRetries - Max retry attempts (default: 2)
 */
export async function withRetry(fn, { agentName = 'Agent', maxRetries = 2 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const result = await fn();
      if (attempt > 1) {
        console.log(`  ✓ ${agentName} succeeded on attempt ${attempt}`);
      }
      return result;
    } catch (err) {
      lastError = err;
      const isLastAttempt = attempt === maxRetries + 1;

      if (err.name === 'ZodError') {
        const issues = err.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
        console.warn(`  ⚠ ${agentName} schema validation failed (attempt ${attempt}/${maxRetries + 1}): ${issues}`);
      } else if (err instanceof SyntaxError) {
        console.warn(`  ⚠ ${agentName} returned invalid JSON (attempt ${attempt}/${maxRetries + 1})`);
      } else {
        console.error(`  ✗ ${agentName} error (attempt ${attempt}/${maxRetries + 1}):`, err.message);
      }

      if (isLastAttempt) break;

      // Brief delay before retry (exponential backoff: 500ms, 1000ms)
      await new Promise(resolve => setTimeout(resolve, 500 * attempt));
    }
  }

  throw new Error(`${agentName} failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
}
