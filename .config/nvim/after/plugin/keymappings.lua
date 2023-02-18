local function map(mode, shortcut, command, desc)
  vim.keymap.set(mode, shortcut, command, { noremap = true, silent = true, desc = desc })
  -- vim.api.nvim_set_keymap(mode, shortcut, command, { noremap = true, silent = true })
end

local function nmap(shortcut, command, desc)
  map('n', shortcut, command, desc)
end

local function imap(shortcut, command, desc)
  map('i', shortcut, command, desc)
end

local function vmap(shortcut, command, desc)
  map('v', shortcut, command, desc)
end

local function cmd(command)
  return table.concat({ '<Cmd>', command, '<CR>' })
end

nmap('<leader>rl', cmd('source $MYVIMRC')) -- Reload neovim config

-- quick pairs
imap('<leader>\'', "''<ESC>i")
imap('<leader>"', '""<ESC>i')
imap('<leader>`', '``<ESC>i')
imap('<leader>(', '()<ESC>i')
imap('<leader>[', '[]<ESC>i')
imap('<leader>{', '{}<ESC>i')
imap('<leader>{{', '{{}}<ESC><left>i')

-- quick exit or save
nmap('<leader>q', cmd('q'), 'Exit current window')
nmap('<leader>e', cmd('quit'), 'Exit current window')
nmap('<leader>xx', cmd('x'), 'Save and exit current window')
nmap('<leader>w', cmd('update'), 'Save current changes')

-- Show Git status in a floating window to commit current changes with using TIG
nmap(
  '<c-g>',
  cmd('FloatermNew --height=0.9 --width=0.9 --wintype=float --position=center --name=tig-status --autoclose=2 tig status'),
  'Show Tig status in floating window'
)

nmap('<leader>aa', 'ggVG', 'Selec the whole text')

nmap('<leader>h', cmd('set hlsearch!'), 'toggle highlight search')

-- Better handling for folding or unfolding with space key
nmap('<space>', 'za<CR>', 'Fold or unfold current text')

-- Repeatable indentation
vmap('<', '<gv')
vmap('>', '>gv')

-- enable spell check
nmap(';s', cmd('set spell'), 'Enable spell check')

-- Improve Tab and Window navigation
nmap('<F2>', '<cmd>vertical wincmd f<CR> <C-W>R', 'Open the file under the cursor in a vertical split')
nmap('<F6>', '<C-W>w')
nmap('<F8>', cmd('tabnew'))
nmap('<S-Tab>', cmd('tabnext'))

-- Add space below or over current line, but exit insert mode again
nmap('[<space>', '<S-o><esc>')
nmap(']<space>', 'o<esc>')

-- Dont copy anything I want to delete into the unamed register
-- I want to use X for that
nmap('<Del>', '"_x')
vmap('<Del>', '"_x')
nmap('dd', '"_dd')
vmap('d', '"_x')
nmap('xx', '""dd')

nmap('<leader>h', cmd('set hlsearch!'), 'Toggle highlight search')

nmap('<leader>rs', cmd('!./sync.sh'), 'Run sync.sh')

-- ** Customized keys for plugins **

-- NERDTree
nmap('<c-t>', cmd('NERDTreeToggle'), 'Toggle NERDTree')
nmap('<leader>tl', '<cmd>NERDTreeFind<CR><C-w_w>', 'Show current file in NERDTree')

-- Vim-Schlepp settings
vmap('<C-K>', '<Plug>SchleppUp')
vmap('<C-J>', '<Plug>SchleppDown')
vmap('<C-H>', '<Plug>SchleppLeft')
vmap('<C-L>', '<Plug>SchleppRight')

-- Maximizer keys
nmap('<silent>F3', cmd('MaximizerToggle'))

-- Search for current word with ACK plugin
nmap('<leader>vv', cmd('Ack! <cword>'))

-- Show Git diff and commits with using Delta as diff viewer
nmap('<leader>tgc', cmd('lua require ("user.telescope-git").git_commits()'), 'Show Git commits in Telescope')
nmap('<leader>tgs', cmd('lua require ("user.telescope-git").git_status()'), 'Show Git status in Telescope')

-- Use ToggleBackground from dark to light and back
nmap('<leader>pp', cmd('lua ToggleBackground()'), 'Toggle dark or light background')
nmap('<leader>cs', cmd('Telescope colorscheme'), 'Show colorschemes in Telescope')
nmap('<leader>cst', cmd('lua require("material.functions").find_style()'))

-- My Telescope key mappings
nmap('<c-p>', cmd('Telescope find_files'), 'Telescope find files')
nmap('<leader>tp', cmd('Telescope neoclip'), 'Telescope neoclip')
nmap('<leader>tr', cmd('Telescope repo'), 'Telescope repos')
