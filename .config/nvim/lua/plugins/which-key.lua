return {
  "folke/which-key.nvim",
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
      d = { name = "+Debug" },
      l = { name = "+Format/Linting" },
      n = { name = "+Neotest" },
      s = { name = "+Lsp[s]aga" },
      t = { name = "+Telescope" },
      w = { name = "+Workspaces" },
      x = { name = "+Trouble" },
    }, { prefix = "<leader>" })
  end
}
