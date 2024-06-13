-- That displays a popup with possible keybindings of the command you started typing.
-- https://github.com/folke/which-key.nvim
return {
  "folke/which-key.nvim",
  enabled = true,
  event = "VeryLazy",
  init = function()
    vim.o.timeout = true
    vim.o.timeoutlen = 500
  end,
  opts = {},
  config = function()
    local wk = require("which-key")

    wk.register({
      [","] = { name = "+Hop" },
      c = { name = "+ChatGPT" },
      d = { name = "+Debug" },
      f = { name = "+FzfLua" },
      l = { name = "+Format/Linting" },
      n = { name = "+Neotest" },
      s = { name = "+Lsp[s]aga" },
      t = { name = "+Telescope" },
      w = { name = "+Workspaces" },
      x = { name = "+Trouble" },
    }, { prefix = "<leader>" })
  end
}
