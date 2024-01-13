-- Deactivate all events with `set ei=all`, and back with `set ei=""`,w

local create_augroup = vim.api.nvim_create_augroup
local create_autocmd = vim.api.nvim_create_autocmd

-- Function to handle view operations
-- This brings the feature that Neovim remembers where exactly left the current file
-- Neovim will jump back to this position when the file will be loaded again
local function handle_view_operations(event)
  if vim.fn.expand('%') ~= '' then
    if event == "BufWinLeave" then
      vim.cmd('silent! mkview')
    elseif event == "BufWinEnter" then
      vim.cmd('silent! loadview')
    end
  end
end

-- [[ Highlight on yank ]]
-- See `:help vim.highlight.on_yank()`
local highlight_group = create_augroup("YankHighlight", { clear = true })
create_autocmd("TextYankPost", {
  group = highlight_group,
  pattern = "*",
  callback = function()
    vim.highlight.on_yank()
  end,
})

-- FileType gitcommit
local git_group = create_augroup("git", { clear = true })
create_autocmd("FileType", {
  group = git_group,
  pattern = "gitcommit",
  command = "set tw=100"
})

-- Bash autocmd group
local bash_group = create_augroup("bash", { clear = true })
create_autocmd("BufRead", {
  group = bash_group,
  pattern = { ".functions", ".aliases", ".exports" },
  command = "set filetype=bash"
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = bash_group,
  pattern = { "*.sh", ".aliases", ".functions", ".exports" },
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- Lua autocmd groupG
local lua_group = create_augroup("lua", { clear = true })
create_autocmd("FileType", {
  group = lua_group,
  pattern = "lua",
  callback = function()
    vim.bo.shiftwidth = 2
    vim.bo.tabstop = 2
    vim.bo.softtabstop = 2
  end
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = lua_group,
  pattern = "*.lua",
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- Rust autocmd group
local rust_group = create_augroup("rust", { clear = true })
create_autocmd("FileType", {
  group = rust_group,
  pattern = "rust",
  callback = function()
    vim.bo.shiftwidth = 2
    vim.bo.tabstop = 2
    vim.bo.softtabstop = 2
    vim.api.nvim_command('compiler cargo')
    vim.keymap.set('n', '<leader>rr', '<cmd>RustRunnables<cr>', { buffer = true })
  end
})
create_autocmd("BufWritePre", {
  group = rust_group,
  pattern = "*.rs",
  callback = function()
    vim.lsp.buf.format({ async = false })
  end
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = rust_group,
  pattern = "*.rs",
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- Markdown autocmd group
local markdown_group = create_augroup("markdown", { clear = true })
create_autocmd("FileType", {
  group = markdown_group,
  pattern = "markdown",
  callback = function()
    vim.bo.shiftwidth = 2
    vim.bo.tabstop = 2
    vim.bo.softtabstop = 2
    vim.wo.wrap = true
    vim.wo.foldmethod = "manual"
    vim.wo.spell = true
    vim.bo.spelllang = { "de", "en" }
    vim.bo.spellfile = '~/Projects/dotfiles/.config/nvim/spell/de.utf-8.add'
  end
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = markdown_group,
  pattern = "*.md",
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- YAML autocmd group
local yaml_group = create_augroup("yamlFile", { clear = true })
create_autocmd({ "BufNewFile", "BufRead" }, {
  group = yaml_group,
  pattern = { ".ansiblelint", ".yamlint", ".y*ml.j2" },
  callback = function()
    vim.bo.filetype = "yaml"
  end
})
create_autocmd("FileType", {
  group = yaml_group,
  pattern = "yaml",
  command = "set cursorcolumn"
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = yaml_group,
  pattern = "*.y*ml",
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- Go autocmd group
local go_group = create_augroup("golang", { clear = true })
create_autocmd("FileType", {
  group = go_group,
  pattern = "go",
  callback = function()
    vim.bo.noexpandtab = true -- In Go we need real tabs instead of spaces
    vim.bo.preserveindent = true
    vim.bo.tabstop = 2
    vim.bo.shiftwidth = 2
    vim.bo.softtabstop = 2
    vim.keymap.set('n', '<leader>gr', '<cmd>GoRun<cr>', { buffer = true })
    vim.keymap.set('n', '<leader>gt', '<cmd>GoTest<cr>', { buffer = true })
  end
})
create_autocmd({ "BufWinLeave", "BufWinEnter" }, {
  group = go_group,
  pattern = "*.go",
  callback = function(args)
    handle_view_operations(args.event)
  end
})

-- CmpDebounceAuGroup
local cmp_debounce_group = create_augroup("CmpDebounceAuGroup", { clear = true })
create_autocmd("TextChangedI", {
  group = cmp_debounce_group,
  pattern = "*",
  callback = function()
    require("user.debounce-cmp").debounce(1500)
  end
})
