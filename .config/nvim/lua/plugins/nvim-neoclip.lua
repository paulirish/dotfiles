-- Clipboard manager neovim plugin with telescope integration
-- https://github.com/AckslD/nvim-neoclip.lua
return {
  "AckslD/nvim-neoclip.lua",
  enabled = true,
  dependencies = {
    { "kkharji/sqlite.lua",           module = "sqlite" },
    { "nvim-telescope/telescope.nvim" },
  },
  opts = {
    default_register = '"',
    enable_persistent_history = true,
    db_path = vim.fn.stdpath("data") .. "/databases/neoclip.sqlite3",
    continuous_sync = true,
    keys = {
      telescope = {
        n = {
          paste = "<c-p>",
        },
      },
    },

  },
  config = function(_, opts)
    require("neoclip").setup(opts)
    require("telescope").load_extension("neoclip")
  end,
}
