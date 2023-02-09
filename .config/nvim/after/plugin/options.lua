vim.opt.tabstop = 2
vim.opt.softtabstop = 2
vim.opt.shiftwidth = 2
vim.opt.expandtab = false
vim.opt.backup = false

vim.opt.hlsearch = false
vim.opt.scrolloff = 8

vim.opt.wrap = false

vim.opt.backup = false
vim.opt.writebackup = false
vim.opt.swapfile = false

vim.o.listchars = 'space:·,trail:·,precedes:«,extends:»,eol:↲,tab:▸▸'
vim.opt.list = true

vim.opt.wildignore = {".git", ".vscode", "node_modules", "target" }

vim.opt.relativenumber = false

vim.g.NERDTreeShowHidden = 1
vim.g.NERDTreeRespectWildIgnore = 1

-- Settings for ACK plugin
vim.g.ackprg = 'rg -S --no-heading --hidden --vimgrep'
vim.cmd('cnoreabbrev ag Ack!')
vim.cmd('cnoreabbrev rg Ack!')
vim.cmd('cnoreabbrev ack Ack!')

-- Vim-schlepp settings
vim.cmd('let g:Schlepp#allowSquishingLines = 1')
vim.cmd('let g:Schlepp#allowSquishingBlock = 1')

require('tabnine').setup({
  disable_auto_comment=true,
  accept_keymap="<Tab>",
  dismiss_keymap = "<C-]>",
  debounce_ms = 200,
  suggestion_color = {gui = "#808080", cterm = 244},
  execlude_filetypes = {"TelescopePrompt"}
})
