-- Neovim file explorer: edit your filesystem like a buffer
-- https://github.com/stevearc/oil.nvim
return {
  "stevearc/oil.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = {
    columns = { "icon" },
    keymaps = {
      ["<C-h>"] = false,
      ["<M-h>"] = "actions.select_split",
    },
    view_options = {
      show_hidden = true,
    },
  },
  config = function(_, opts)
    require("oil").setup(opts)

    -- Open parent directory in current window
    local nmap = require("user.key-map").nmap
    nmap("-", "<CMD>Oil<CR>", "Open parent directory")

    -- Open parent directory in floating window
    nmap("<leader>-", require("oil").toggle_float, "Show parent directory in a floating window")
  end,
}
