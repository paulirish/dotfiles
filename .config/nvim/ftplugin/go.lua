-- Go specific settings
vim.bo.noexpandtab = true     -- In Go we need real tabs instead of spaces
vim.bo.preserveindent = true
vim.bo.tabstop = 2
vim.bo.shiftwidth = 2
vim.bo.softtabstop = 2
vim.keymap.set('n', '<leader>gr', '<cmd>GoRun<cr>', { buffer = true })
vim.keymap.set('n', '<leader>gt', '<cmd>GoTest<cr>', { buffer = true })
