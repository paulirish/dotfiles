vim.g.mapleader = ","

vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "<F1>", "<nop>")
vim.keymap.set("n", "<leader>w", ":w<cr>")
vim.keymap.set("n", "<leader>q", ":q<cr>")
vim.keymap.set("n", "<leader>qa", ":qa<cr>")
vim.keymap.set("n", "<leader>cat", ":tabonly<cr>")
vim.keymap.set("n", "<leader>te", ":vsp<cr> :te<cr>")
vim.keymap.set('i', 'jj', '<Esc>')
vim.keymap.set('i', 'JJ', '<Esc>')
vim.keymap.set('i', 'kk', '<Esc>')
vim.keymap.set('i', 'ii', '<Esc>')
vim.keymap.set({"n", "v"}, "<leader>p", ":set invpaste paste?<CR>")
vim.keymap.set("n", "<leader>so", function()
  vim.cmd("so")
end)

--others
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

-- greatest remap ever
vim.keymap.set("x", "<leader>p", [["_dP]])

-- next greatest remap ever : asbjornHaland
vim.keymap.set({"n", "v"}, "<S-Y>", [["+y]])
vim.keymap.set("n", "<leader>Y", [["+Y]])

vim.keymap.set({"n", "v"}, "<leader>d", [["_d]])

vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "<leader>f", vim.lsp.buf.format)

vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz")
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz")

vim.keymap.set("n", "<leader>s", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })

--telescope
local builtin = require('telescope.builtin')
vim.keymap.set("n", "<C-x>", vim.cmd.Ex)
vim.keymap.set('n', '<C-p>', builtin.git_files, {})
vim.keymap.set('n', '<C-f>', builtin.find_files, {})
vim.keymap.set('n', '<C-s>', builtin.live_grep, {})
vim.keymap.set('n', '<C-b>', builtin.buffers, {})
vim.keymap.set('n', '<C-h>', builtin.help_tags, {})

--fugitive
vim.keymap.set('n', '<leader>gs', ':Git<CR>')
vim.keymap.set('n', '<leader>dg', ':diffget<CR>')
vim.keymap.set('n', '<leader>dp', ':diffput<CR>')
vim.keymap.set('n', '<leader>ga ', ':Git a<CR>')
vim.keymap.set('n', '<leader>qgb', ':Gblame<CR>')
vim.keymap.set('n', '<leader>gb', ':Gbrowse<CR>')
vim.keymap.set('n', '<leader>gc', ':Git commit<CR>')
vim.keymap.set('n', '<leader>gd', ':Gdiff')
vim.keymap.set('n', '<leader>ge', ':Gedit<CR>')
vim.keymap.set('n', '<leader>gl', ':Glog -10<CR>')
vim.keymap.set('n', '<leader>gla', ':Glog -10 --<CR>')
vim.keymap.set('n', '<leader>gr', ':Gread<CR>')
vim.keymap.set('n', '<leader>gw', ':Gwrite<CR>')

vim.keymap.set('n', '<F3>', ':tabnext<cr>')
vim.keymap.set('n', '<F4>', ':tabprevious<cr>')
vim.keymap.set('n', '<F5>', ':tabnew<cr>')
vim.keymap.set('n', '<F2>', vim.cmd.UndotreeToggle)

--ruby
vim.keymap.set('n', '<leader>rs', ':!rspec %<CR>')


