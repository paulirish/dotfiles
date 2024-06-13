-- improve neovim lsp experience
-- https://github.com/nvimdev/lspsaga.nvim
return {
  "nvimdev/lspsaga.nvim",
  enabled = false,
  event = "VeryLazy",
  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    require("lspsaga").setup({})
  end,
}
