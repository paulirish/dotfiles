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

local function cmd(command)
  return table.concat({ '<Cmd>', command, '<CR>' })
end

nmap("<leader>rl", cmd("source $MYVIMRC")) -- Reload neovim config

-- quick pairs
imap("<leader>'", "''<ESC>i")
imap("<leader>\"", '""<ESC>i')
imap("<leader>`", "``<ESC>i")
imap("<leader>(", "()<ESC>i")
imap("<leader>[", "[]<ESC>i")
imap("<leader>{", "{}<ESC>i")
imap("<leader>{{", "{{}}<ESC><left>i")

-- quick exit or save
nmap("<leader>q", cmd("q"))       -- Exit current window
nmap("<leader>e", cmd("quit"))    -- Exit current window
nmap("<leader>xx", cmd("x"))      -- Save and exit
nmap("<leader>w", cmd("update"))  -- Save current changes

-- select all
nmap("<leader>aa", "ggVG")

-- toggle highlight search
nmap("<leader>h", cmd("set hlsearch!"))

-- Repeatable indentation
vmap('<', '<gv')
vmap('>', '>gv')

-- enable spell check
nmap(";s", cmd("set spell"))

-- Improve Tab and Window navigation
nmap('<F2>', '<cmd>vertical wincmd f<CR> <C-W>R')  -- Open the file under the cursor in a vertical split
nmap('<F6>', '<C-W>w')
nmap('<F8>', cmd('tabnew'))
nmap('<S-Tab>', cmd('tabnext'))

-- Add space below or over current line, but exit insert mode again
nmap('[<space>', '<S-o><esc>')
nmap(']<space>', 'o<esc>')

-- ** Customized keys for plugins **

-- NERDTree
nmap("<leader>t", cmd("NERDTreeToggle"))
nmap("<leader>tl", "<cmd>NERDTreeFind<CR><C-w_w>")

-- Vim-Schlepp settings
-- let g:Schlepp#allowSquishingLines = 1
-- let g:Schlepp#allowSquishingBlocks = 1
vmap("<C-K>", "<Plug>SchleppUp")
vmap("<C-J>", "<Plug>SchleppDown")
vmap("<C-H>", "<Plug>SchleppLeft")
vmap("<C-L>", "<Plug>SchleppRight")

-- nmap("<leader>", cmd("WhichKey"))
-- nmap("<C-G>", ":terminal tig status<ESC>i")

-- Lsp keys
nmap("<leader>gr", cmd("lua vim.lsp.buf.rename()"))

-- Maximizer keys
nmap("<silent>F3", cmd("MaximizerToggle"))

-- Search for current word with ACK plugin
nmap('<leader>vv', cmd('Ack! <cword>'))

-- vim.keymap.set('n', '<leader>nn', function()
--   if vim.opt.relativenumber == false then
--     vim.opt.relativenumber = true
--   else
--     vim.opt.relativenumber = false
--   end
--   print(tostring(vim.opt.relativenumber))
-- end, { desc = "Toogles relativenumber" })
