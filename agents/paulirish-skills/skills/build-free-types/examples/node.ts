import type { IncomingMessage } from 'node:http';

export interface ServerConfig {
  port: number;
  host: string;
}

/**
 * Handles an incoming request.
 * Note: Uses erasable syntax only (no enums, no parameter properties).
 */
export function handleRequest(req: IncomingMessage, config: ServerConfig): void {
  console.log(`Request received on ${config.host}:${config.port}`);
  console.log(`Method: ${req.method}`);
}

// Always use .ts extension in imports for Node.js native TS
// import { other } from './other.ts';
