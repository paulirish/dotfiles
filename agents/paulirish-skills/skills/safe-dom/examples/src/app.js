import { $, dom, render } from './dom.js';

/** @type {{ name: string; score: number }[]} */
const players = [
  { name: 'Alice', score: 1200 },
  { name: 'Bob', score: 980 },
  // Demonstrates that even a raw XSS payload is safely escaped by dom``:
  { name: '<img src=x onerror="alert(1)">', score: 0 },
];

/**
 * @param {{ name: string; score: number }} player
 * @param {number} rank
 * @returns {SafeHTML}
 */
function playerRow(player, rank) {
  return dom`
    <li class="player" data-rank="${rank}">
      <span class="rank">${rank}</span>
      <span class="name">${player.name}</span>
      <span class="score">${player.score}</span>
    </li>
  `;
}

function renderLeaderboard() {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  render($('#leaderboard'), dom`${sorted.map((p, i) => playerRow(p, i + 1))}`);
}

renderLeaderboard();

$('#add-form').addEventListener('submit', /** @param {SubmitEvent} e */ e => {
  e.preventDefault();
  const form = /** @type {HTMLFormElement} */ (e.currentTarget);
  const nameInput = /** @type {HTMLInputElement} */ ($('input[name="name"]', form));
  const scoreInput = /** @type {HTMLInputElement} */ ($('input[name="score"]', form));

  players.push({ name: nameInput.value, score: Number(scoreInput.value) });
  renderLeaderboard();
  form.reset();
  nameInput.focus();
});
