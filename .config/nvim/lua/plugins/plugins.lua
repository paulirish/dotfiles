-- List of plugins without additional configurations
return {
  { "evanleck/vim-svelte",       ft = "svelte",      enabled = true },  -- Support for Svelte 3 in vim
  { "Joorem/vim-haproxy",        ft = "haproxy",     enabled = true },  -- Syntaxsupport for HAProxy config files
  { "mileszs/ack.vim",           event = "VeryLazy", enabled = true },  -- Provides support for ack and the SilverlightSearcher in vim
  { "szw/vim-maximizer",         event = "VeryLazy", enabled = true },  -- Maximizes and restores the current window in Vim.
  { "svermeulen/vim-cutlass",    event = "VeryLazy", enabled = true },  -- Plugin that adds a 'cut' operation separate from 'delete'
  { "mg979/vim-visual-multi",    event = "VeryLazy", enabled = true },  -- This True Sublime Text style multiple selections for Vim - https://github.com/mg979/vim-visual-multi
  { "tpope/vim-repeat",          event = "VeryLazy", enabled = true },  -- Enable repeating supported plugin maps with \".\"
  { "tpope/vim-surround",        event = "VeryLazy", enabled = true },  -- surround.vim: quoting/parenthesizing made simple
  { "hashivim/vim-terraform",    ft = "terraform",   enabled = true },  -- Highlighting for Terraform
  { "voldikss/vim-floaterm",     event = "VeryLazy", enabled = true },  -- Showing a floating terminal for example TIG
  { "terryma/vim-expand-region", event = "VeryLazy", enabled = true },  -- Expand or reduce current selection
  { "tpope/vim-fugitive",        event = "VeryLazy", enabled = true },  -- A Git wrapper so awesome, it should be illegal
  { "tpope/vim-rhubarb",         event = "VeryLazy", enabled = false }, -- GitHub extension for fugitive.vim
  { "tpope/vim-sleuth",          event = "VeryLazy", enabled = true },  -- Heuristically set buffer options - https://github.com/tpope/vim-sleuth
  { "fatih/vim-go",              ft = "go",          enabled = true },  -- Go development plugin for Vim - https://github.com/fatih/vim-go
}
