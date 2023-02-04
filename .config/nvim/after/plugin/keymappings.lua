local function map(mode, shortcut, command)
  vim.api.nvim_set_keymap(mode, shortcut, command, { noremap = true, silent = true })
end

local function nmap(shortcut, command)
  map('n', shortcut, command)
end

local function imap(shortcut, command)
  map('i', shortcut, command)
end

local function vmap(shortcut, command)
  map('v', shortcut, command)
end

-- quick pairs
vim.api.nvim_set_keymap("i", "<leader>'", "''<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>\"", '""<ESC>i', { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>`", "``<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>(", "()<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>[", "[]<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>{", "{}<ESC>i", { noremap = true, silent = true })
vim.api.nvim_set_keymap("i", "<leader>{{", "{{}}<ESC><left>i", { noremap = true, silent = true })

-- quick exit or save
nmap("<leader>q", "<cmd>q<CR>")
nmap("<leader>e", "<cmd>q<CR>")
nmap("<leader>xx", "<cmd>x<CR>")
nmap("<leader>w", "<cmd>w<CR>")

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
-- nmap("<C-G>", ":terminal tig status<ESC>i")

-- Lsp keys
nmap("<leader>gr", "<cmd>lua vim.lsp.buf.rename()<CR>")


