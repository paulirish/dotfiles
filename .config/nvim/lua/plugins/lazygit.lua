-- Plugin for calling lazygit from within neovim.
-- https://github.com/kdheepak/lazygit.nvim
return {
  "kdheepak/lazygit.nvim",
  cmd = {
    "LazyGit",
    "LazyGitConfig",
    "LazyGitCurrentFile",
    "LazyGitFilter",
    "LazyGitFilterCurrentFile",
  },
  -- optional for floating window border decoration
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  -- setting the keybinding for LazyGit with 'keys' is recommended in
  -- order to load the plugin when the command is run for the first time
  keys = {
    { "<c-g>",   "<cmd>LazyGit<cr>",                  desc = "LazyGit" },
    { "<c-s-g>", "<cmd>LazyGitFilterCurrentFile<cr>", desc = "LazyGit" },
  }
}
