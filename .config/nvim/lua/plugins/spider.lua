-- Use the w, e, b motions like a spider. Move by subwords and skip insignificant punctuation.
-- https://github.com/chrisgrieser/nvim-spider
return {
  "chrisgrieser/nvim-spider",
  lazy = false,
  enabled = true,
  opts = {
    skipInsignificantPunctuation = false,
  },
  config = function(_, opts)
    require("spider").setup(opts)
    vim.keymap.set(
      { "n", "o", "x" },
      "w",
      "<cmd>lua require('spider').motion('w')<CR>",
      { desc = "Spider-w" }
    )
    vim.keymap.set(
      { "n", "o", "x" },
      "e",
      "<cmd>lua require('spider').motion('e')<CR>",
      { desc = "Spider-e" }
    )
    vim.keymap.set(
      { "n", "o", "x" },
      "b",
      "<cmd>lua require('spider').motion('b')<CR>",
      { desc = "Spider-b" }
    )
  end
}
