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

    local nmap = require("user.key-map").nmap
    local cmd = require("user.key-map").cmd

    -- nmap("<leader>sf", cmd('Lspsaga lsp_finder'), 'Lspsaga finder')
    nmap("<leader>sa", cmd("Lspsaga code_action"), "Lspsaga code action")
    nmap("<leader>sr", cmd("Lspsaga rename ++project"), "Lspsaga rename")
    -- nmap("<leader>sgd", cmd("Lspsaga goto_definition"), "Lspsaga goto definition")
    -- nmap("<leader>sgt", cmd("Lspsaga goto_type_definition"), "Lspsaga goto type definition")
    nmap("<leader>spd", cmd("Lspsaga peek_definition"), "Lspsaga peek definition")
    nmap("<leader>spt", cmd("Lspsaga peek_type_definition"), "Lspsaga peek type definition")
    nmap("<leader>sdl", cmd("Lspsaga show_line_diagnostics"), "Lspsaga show line diagnostics")
    nmap("<leader>sdb", cmd("Lspsaga show_buf_diagnostics"), "Lspsaga show buffer diagnostics")
    nmap("<leader>sdw", cmd("Lspsaga show_workspace_diagnostics"), "Lspsaga show workspace diagnostics")
    nmap("<leader>sdc", cmd("Lspsaga show_cursor_diagnostics"), "Lspsaga show cursor diagnostics")
    nmap("<leader>so", cmd("Lspsaga outline"), "Lspsaga toggle outline") -- Press o to jump to the selected symbol
    nmap("<leader>sk", cmd("Lspsaga hover_doc"), "Lspsaga hover doc")
    nmap("<leader>st", cmd("Lspsaga term_toggle"), "Lspsaga term toggle")
    -- nmap('<leader>sci', cmd('Lspsaga incoming_calls'), 'Lspsaga incoming calls')
    -- nmap('<leader>sco', cmd('Lspsaga outgoing_calls'), 'Lspsaga outgoing calls')
  end,
}
