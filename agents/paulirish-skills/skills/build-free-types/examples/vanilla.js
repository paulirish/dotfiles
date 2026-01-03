/**
 * @import { User, Config } from './types.js'
 */

/**
 * Greets a user.
 * @param {User} user - The user to greet.
 * @returns {string} The greeting message.
 */
export function greet(user) {
  return `Hello, ${user.name}!`;
}

/** @type {Config} */
export const defaultConfig = {
  retries: 3,
  debug: false
};
