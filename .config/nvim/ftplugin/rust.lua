-- Rust specific settings
vim.bo.shiftwidth = 2
vim.bo.tabstop = 2
vim.bo.softtabstop = 2
vim.api.nvim_command('compiler cargo')
vim.keymap.set('n', '<leader>rr', '<cmd>RustRunnables<cr>', { buffer = true })
