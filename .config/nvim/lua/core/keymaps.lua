-- Set leader key to space
vim.g.mapleader = ","

local function map(mode, shortcut, command, desc)
  vim.keymap.set(mode, shortcut, command, { noremap = true, silent = true, desc = desc })
end

local function nmap(shortcut, command, desc)
  map("n", shortcut, command, desc)
end

local function imap(shortcut, command, desc)
  map("i", shortcut, command, desc)
end

local function vmap(shortcut, command, desc)
  map("v", shortcut, command, desc)
end

local function cmd(command)
  return table.concat({ "<Cmd>", command, "<CR>" })
end

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
-- nmap('<leader>gp', '<cmd>lua vim.diagnostic.goto_prev()<CR>')
-- nmap('<leader>gn', '<cmd>lua vim.diagnostic.goto_next()<CR>')
-- nmap('<leader>tr', '<cmd>lua vim.lsp.buf.document_symbol()<CR>')
-- imap('<C-Space>', '<cmd>lua vim.lsp.buf.completion()<CR>')

vim.keymap.set({ "n", "v" }, "<Space>", "<Nop>", { silent = true })

-- Remap for dealing with word wrap
vim.keymap.set("n", "k", "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
vim.keymap.set("n", "j", "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })

-- Git-blame
nmap("<leader>gb", cmd("Git blame"), "Show git blame")

-- Diagnostic keymaps
nmap("[d", vim.diagnostic.goto_prev)
nmap("]d", vim.diagnostic.goto_next)
nmap('<leader>gg', cmd('lua vim.lsp.buf.hover()'), "hover lsp")
nmap('<leader>gl', cmd('lua vim.diagnostic.open_float()'), 'Open diagnostic float')

-- nmap("<leader>rl", cmd("source $MYVIMRC")) -- Reload neovim config (Does not work with LazyVim)

-- quick pairs
imap("<leader>'", "''<ESC>i")
imap('<leader>"', '""<ESC>i')
imap("<leader>`", "``<ESC>i")
imap("<leader>(", "()<ESC>i")
imap("<leader>[", "[]<ESC>i")
imap("<leader>{", "{}<ESC>i")
imap("<leader>{{", "{{}}<ESC><left>i")

-- quick exit or save
nmap("<leader>q", cmd("q"), "Exit current window")
nmap("<leader>e", cmd("quit"), "Exit current window")
-- nmap('<leader>x', cmd('x'), 'Save and exit current window')
nmap("<leader>w", cmd("w!"), "Save current changes")

-- Show Git status in a floating window to commit current changes with using Gitlazy
nmap(
  "<c-g>",
  cmd(
    "FloatermNew --height=0.9 --width=0.9 --wintype=float --position=center --name=lazygit --autoclose=2 lazygit"
  ),
  "Show lazygit in floating window"
)

nmap("<leader>aa", "ggVG", "Select the whole text")

nmap("<leader>h", cmd("set hlsearch!"), "toggle highlight search")

-- Better handling for folding or unfolding with space key
nmap("<space>", "za<CR>", "Fold or unfold current text")

-- Repeatable indentation
vmap("<", "<gv")
vmap(">", ">gv")

-- enable spell check
nmap(";s", cmd("set spell"), "Enable spell check")

-- Improve Tab and Window navigation
nmap("<F2>", "<cmd>vertical wincmd f<CR> <C-W>R", "Open the file under the cursor in a vertical split")
nmap("<F6>", "<C-W>w")
nmap("<F8>", cmd("tabnew"))
nmap("<S-Tab>", cmd("tabnext"))

-- Add space below or over current line, but exit insert mode again
nmap("[<space>", "<S-o><esc>")
nmap("]<space>", "o<esc>")

nmap("<leader>h", cmd("set hlsearch!"), "Toggle highlight search")

-- Run the sync.sh script
nmap("<leader>rs", cmd("!./sync.sh"), "[R]un [s]ync.sh")

-- Custom keys for LSP
nmap("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
nmap("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
vmap("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")

-- Close the quixfix windox
nmap("<leader>xc", cmd("cclose"), "[Q]uickfix [C]lose")

-- ** Customized keys for plugins **

-- Maximizer keys
nmap("<silent>F3", cmd("MaximizerToggle"))

-- Search for current word with ACK plugin
nmap("<leader>vv", cmd("Ack! <cword>"), "Search current word") -- codespell: ignore

-- Mapping for Cutlass to use x for cut operations
nmap("x", "d")
vmap("x", "d")
nmap("xx", "dd")
nmap("<DEL>", "d") -- Deleting something with the Del key should not add do a yank operation

-- Mappings for expand-selection plugin
vmap("v", "<Plug>(expand_region_expand)")

-- Use ToggleBackground from dark to light and back
nmap("<leader>pp", cmd("lua ToggleBackground()"), "Toggle dark or light background")
nmap("<leader>cs", cmd("Telescope colorscheme"), "Show colorschemes in Telescope")
nmap("<leader>cst", cmd('lua require("material.functions").find_style()'))

-- Plugin Trouble
nmap("<leader>xx", cmd("TroubleToggle workspace_diagnostics"), "Toggle workspace diagnostics list")
nmap("<leader>xX", cmd("TroubleToggle document_diagnostics"), "Toggle document diagnostics list")
nmap("<leader>xr", cmd("TroubleRefresh"), "Refresh diagnostics list")
nmap("<leader>xq", cmd("TroubleToggle quickfix"), "Refresh diagnostics list")

-- Keys for hop - see https://github.com/smoka7/hop.nvim
map({ "n", "v" }, "<leader>,w", cmd("HopWord"), "Hop word")
map({ "n", "v" }, "<leader>,b", cmd("HopWordBC"), "Hop word")
map({ "n", "v" }, "<leader>,p", cmd("HopPattern"), "Hop pattern")
map({ "n", "v" }, "<leader>,e", cmd("HopChar1"), "Hop to specific char")

-- Mappings for lspsaga -- see https://github.com/glepnir/lspsaga.nvim
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

-- Other helpful mappings
nmap("gx", cmd("lua require('user.handle-url').open_url()")) -- open URL under cursor

-- Keymaps for floaterm
vim.g.floaterm_keymap_new = "<F10>"
vim.g.floaterm_keymap_toggle = "<F11>"
