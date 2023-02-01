-- quick pairs
vim.api.nvim_set_keymap("i", "<leader>'", "''<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>\"", '""<ESC>i', { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>`", "``<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>(", "()<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>[", "[]<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>{", "{}<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>{{", "{{}}<ESC><left>i", { noremap = true, silent = true })

-- reload init.lua
-- nmap("<leader>rr", ":source $MYVIMRC<CR>")

-- quick exit
nmap("<leader>e", ":q<CR>")
nmap("<leader>x", ":x<CR>")

-- select all
nmap("<leader>a", "ggVG")

-- toggle highlight search
nmap("<leader>h", ":set hlsearch!<CR>")

-- enable spell check
nmap(";s", ":set spell<CR>")

-- NERDTree
nmap("<leader>t", ":NERDTreeToggle<CR>")
nmap("<leader>tl", ":NERDTreeFind<CR><C-w_w>")

-- Vim-Schlepp settings
-- let g:Schlepp#allowSquishingLines = 1
-- let g:Schlepp#allowSquishingBlocks = 1
vmap("<C-K>", "<Plug>SchleppUp")
vmap("<C-J>", "<Plug>SchleppDown")
vmap("<C-H>", "<Plug>SchleppLeft")
vmap("<C-L>", "<Plug>SchleppRight")

nmap("<leader>", ":WhichKey<CR>")
nmap("<C-G>", ":terminal tig status<ESC>i")

