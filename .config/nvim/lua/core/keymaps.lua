-- Set leader key to space
vim.g.mapleader = ","

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

-- imap("jk", "<ESC>") -- exit insert mode with jk 
-- imap("ii", "<ESC>") -- exit insert mode with ii
-- nmap("<leader>wq", ":wq<CR>") -- save and quit
-- nmap("<leader>qq", ":q!<CR>") -- quit without saving
-- nmap("<leader>ww", ":w<CR>") -- save
-- nmap("gx", ":!open <c-r><c-a><CR>") -- open URL under cursor
--
-- -- Split window management
-- nmap("<leader>sv", "<C-w>v") -- split window vertically
-- nmap("<leader>sh", "<C-w>s") -- split window horizontally
-- nmap("<leader>se", "<C-w>=") -- make split windows equal width
-- nmap("<leader>sx", ":close<CR>") -- close split window
-- nmap("<leader>sj", "<C-w>-") -- make split window height shorter
-- nmap("<leader>sk", "<C-w>+") -- make split windows height taller
-- nmap("<leader>sl", "<C-w>>5") -- make split windows width bigger 
-- nmap("<leader>sh", "<C-w><5") -- make split windows width smaller
--
-- -- Tab management
-- nmap("<leader>to", ":tabnew<CR>") -- open a new tab
-- nmap("<leader>tx", ":tabclose<CR>") -- close a tab
-- nmap("<leader>tn", ":tabn<CR>") -- next tab
-- nmap("<leader>tp", ":tabp<CR>") -- previous tab
--
-- -- Diff keymaps
-- nmap("<leader>cc", ":diffput<CR>") -- put diff from current to other during diff
-- nmap("<leader>cj", ":diffget 1<CR>") -- get diff from left (local) during merge
-- nmap("<leader>ck", ":diffget 3<CR>") -- get diff from right (remote) during merge
-- nmap("<leader>cn", "]c") -- next diff hunk
-- nmap("<leader>cp", "[c") -- previous diff hunk
--
-- -- Quickfix keymaps
-- nmap("<leader>qn", ":cnext<CR>") -- jump to next quickfix list item
-- nmap("<leader>qp", ":cprev<CR>") -- jump to prev quickfix list item
--
-- -- Vim-maximizer
-- nmap("<leader>sm", ":MaximizerToggle<CR>") -- toggle maximize tab
--
-- -- Nvim-tree
-- nmap("<leader>ee", ":NvimTreeToggle<CR>") -- toggle file explorer
-- nmap("<leader>er", ":NvimTreeFocus<CR>") -- toggle focus to file explorer
-- nmap("<leader>ef", ":NvimTreeFindFile<CR>") -- find file in file explorer
--
-- -- Telescope
-- nmap('<leader>ff', require('telescope.builtin').find_files, {})
-- nmap('<leader>fg', require('telescope.builtin').live_grep, {})
-- nmap('<leader>fb', require('telescope.builtin').buffers, {})
-- nmap('<leader>fh', require('telescope.builtin').help_tags, {})
-- nmap('<leader>fs', require('telescope.builtin').current_buffer_fuzzy_find, {})
-- nmap('<leader>fo', require('telescope.builtin').lsp_document_symbols, {})
-- nmap('<leader>fi', require('telescope.builtin').lsp_incoming_calls, {})
-- nmap('<leader>fm', function() require('telescope.builtin').treesitter({default_text=":method:"}) end)
--
-- -- Git-blame
-- nmap("<leader>gb", ":GitBlameToggle<CR>") -- toggle git blame

-- Harpoon
-- nmap("<leader>ha", require("harpoon.mark").add_file)
-- nmap("<leader>hh", require("harpoon.ui").toggle_quick_menu)
-- nmap("<leader>h1", function() require("harpoon.ui").nav_file(1) end)
-- nmap("<leader>h2", function() require("harpoon.ui").nav_file(2) end)
-- nmap("<leader>h3", function() require("harpoon.ui").nav_file(3) end)
-- nmap("<leader>h4", function() require("harpoon.ui").nav_file(4) end)
-- nmap("<leader>h5", function() require("harpoon.ui").nav_file(5) end)
-- nmap("<leader>h6", function() require("harpoon.ui").nav_file(6) end)
-- nmap("<leader>h7", function() require("harpoon.ui").nav_file(7) end)
-- nmap("<leader>h8", function() require("harpoon.ui").nav_file(8) end)
-- nmap("<leader>h9", function() require("harpoon.ui").nav_file(9) end)

-- nmap('<leader>gg', '<cmd>lua vim.lsp.buf.hover()<CR>')
-- nmap('<leader>gd', '<cmd>lua vim.lsp.buf.definition()<CR>')
-- nmap('<leader>gD', '<cmd>lua vim.lsp.buf.declaration()<CR>')
-- nmap('<leader>gi', '<cmd>lua vim.lsp.buf.implementation()<CR>')
-- nmap('<leader>gt', '<cmd>lua vim.lsp.buf.type_definition()<CR>')
-- nmap('<leader>gr', '<cmd>lua vim.lsp.buf.references()<CR>')
-- nmap('<leader>gs', '<cmd>lua vim.lsp.buf.signature_help()<CR>')
-- nmap('<leader>rr', '<cmd>lua vim.lsp.buf.rename()<CR>')
-- nmap('<leader>gf', '<cmd>lua vim.lsp.buf.format({async = true})<CR>')
-- vmap('<leader>gf', '<cmd>lua vim.lsp.buf.format({async = true})<CR>')
-- nmap('<leader>ga', '<cmd>lua vim.lsp.buf.code_action()<CR>')
-- nmap('<leader>gl', '<cmd>lua vim.diagnostic.open_float()<CR>')
-- nmap('<leader>gp', '<cmd>lua vim.diagnostic.goto_prev()<CR>')
-- nmap('<leader>gn', '<cmd>lua vim.diagnostic.goto_next()<CR>')
-- nmap('<leader>tr', '<cmd>lua vim.lsp.buf.document_symbol()<CR>')
-- imap('<C-Space>', '<cmd>lua vim.lsp.buf.completion()<CR>')

vim.keymap.set({ 'n', 'v' }, '<Space>', '<Nop>', { silent = true })

-- Remap for dealing with word wrap
vim.keymap.set('n', 'k', "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
vim.keymap.set('n', 'j', "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })
--
-- Diagnostic keymaps
nmap('[d', vim.diagnostic.goto_prev)
nmap(']d', vim.diagnostic.goto_next)
-- nmap('<leader>e', vim.diagnostic.open_float)
-- nmap('<leader>q', vim.diagnostic.setloclist)

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
-- nmap('<leader>x', cmd('x'), 'Save and exit current window')
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

nmap('<leader>h', cmd('set hlsearch!'), 'Toggle highlight search')

nmap('<leader>rs', cmd('!./sync.sh'), '[R]un [s]ync.sh') -- Run the sync.sh script

-- Custom keys for LSP
nmap('<leader>rn', vim.lsp.buf.rename, '[R]e[n]ame')
nmap('<leader>ca', vim.lsp.buf.code_action, '[C]ode [A]ction')
nmap('<leader>lf', cmd('lua vim.lsp.buf.format{ async = true }'), 'Formatting with LSP')

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

-- Mapping for Cutlass to use x for cut operations
nmap('x', 'd')
vmap('x', 'd')
nmap('xx', 'dd')

-- Mappings for expand-selection plugin
vmap('v', '<Plug>(expand_region_expand)')

-- Show Git diff and commits with using Delta as diff viewer
nmap('<leader>tgc', cmd('lua require ("user.telescope-git").git_commits()'), 'Show Git commits in Telescope')
nmap('<leader>tgs', cmd('lua require ("user.telescope-git").git_status()'), 'Show Git status in Telescope')

-- Use ToggleBackground from dark to light and back
nmap('<leader>pp', cmd('lua ToggleBackground()'), 'Toggle dark or light background')
nmap('<leader>cs', cmd('Telescope colorscheme'), 'Show colorschemes in Telescope')
nmap('<leader>cst', cmd('lua require("material.functions").find_style()'))

-- Plugin Trouble
nmap('<leader>xx', cmd('TroubleToggle workspace_diagnostics'), 'Toggle diagnostics list')
nmap('<leader>xr', cmd('TroubleRefresh'), 'Refresh diagnostics list')
nmap('<leader>xq', cmd('TroubleToggle quickfix'), 'Refresh diagnostics list')

-- Keys for hop - see https://github.com/smoka7/hop.nvim
nmap('<leader>,w', cmd('HopWord'), 'Hop word')
nmap('<leader>,b', cmd('HopWordBC'), 'Hop word')
nmap('<leader>,p', cmd('HopPattern'), 'Hop pattern')
nmap('<leader>,e', cmd('HopChar1'), 'Hop to specific char')

-- Mappings for lspsaga -- see https://github.com/glepnir/lspsaga.nvim
-- nmap("<leader>sf", cmd('Lspsaga lsp_finder'), 'Lspsaga finder')
nmap('<leader>sca', cmd('Lspsaga code_action'), 'Lspsaga code action')
nmap('<leader>sr', cmd('Lspsaga rename ++project'), 'Lspsaga rename')
nmap('<leader>sgd', cmd('Lspsaga goto_definition'), 'Lspsaga goto definition')
nmap('<leader>sgt', cmd('Lspsaga goto_type_definition'), 'Lspsaga goto type definition')
nmap('<leader>spd', cmd('Lspsaga peek_definition'), 'Lspsaga peek definition')
nmap('<leader>spt', cmd('Lspsaga peek_type_definition'), 'Lspsaga peek type definition')
nmap('<leader>sdl', cmd('Lspsaga show_line_diagnostics'), 'Lspsaga show line diagnostics')
nmap('<leader>sdb', cmd('Lspsaga show_buf_diagnostics'), 'Lspsaga show buffer diagnostics')
nmap('<leader>sdw', cmd('Lspsaga show_workspace_diagnostics'), 'Lspsaga show workspace diagnostics')
nmap('<leader>sdc', cmd('Lspsaga show_cursor_diagnostics'), 'Lspsaga show cursor diagnostics')
nmap('<leader>so', cmd('Lspsaga outline'), 'Lspsaga toggle outline') -- Press o to jump to the selected symbol
nmap('<leader>sk', cmd('Lspsaga hover_doc'), 'Lspsaga hover doc')
nmap('<leader>st', cmd('Lspsaga term_toggle'), 'Lspsaga term toggle')
-- nmap('<leader>sci', cmd('Lspsaga incoming_calls'), 'Lspsaga incoming calls')
-- nmap('<leader>sco', cmd('Lspsaga outgoing_calls'), 'Lspsaga outgoing calls')
