-- List of plugins without additional configurations
return {
  { 'zirrostig/vim-schlepp', event = "VeryLazy" },         -- Moving blocks of text easily
  { 'evanleck/vim-svelte', ft = "svelte" },           -- Support for Svelte 3 in vim
  { 'Joorem/vim-haproxy', ft = "haproxy" },            -- Syntaxsupport for HAProxy config files
  { 'mileszs/ack.vim', event = "VeryLazy" },               -- Provides support for ack and the SilverlightSearcher in vim
  { 'szw/vim-maximizer', event = "VeryLazy" },             -- Maximizes and restores the current window in Vim.
  { 'svermeulen/vim-cutlass', event = "VeryLazy" },        -- Plugin that adds a 'cut' operation separate from 'delete'
  { 'terryma/vim-multiple-cursors', event = "VeryLazy" },  -- This True Sublime Text style multiple selections for Vim
  { 'tpope/vim-repeat', event = "VeryLazy" },              -- Enable repeating supported plugin maps with \".\"
  { 'tpope/vim-surround', event = "VeryLazy" },            -- surround.vim: quoting/parenthesizing made simple
  { 'hashivim/vim-terraform', ft = "terraform" },        -- Highlighting for Terraform
  { 'voldikss/vim-floaterm', event = "VeryLazy" },         -- Showing a floating terminal for example TIG
  { 'terryma/vim-expand-region', event = "VeryLazy" },     -- Expand or reduce current selection
  { 'tpope/vim-fugitive', event = "VeryLazy" },
  { 'tpope/vim-rhubarb', event = "VeryLazy" },
  { 'tpope/vim-sleuth', event = "VeryLazy" },
  { 'fatih/vim-go', ft = "go" },
  { 'numToStr/Comment.nvim', event = { "BufReadPre", "BufNewFile" }, config = true },
}
