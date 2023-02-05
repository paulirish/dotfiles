vim.cmd([[
  augroup rustGroup
    autocmd!
    autocmd FileType rust setlocal shiftwidth=2 tabstop=2 softtabstop=2 preserveindent
    autocmd FileType rust compiler cargo
    autocmd FileType rust lua vim.keymap.set('n', '<leader>rr', '<cmd>RustRun<cr>')
    autocmd FileType rust lua vim.keymap.set('n', '<leader>rf', '<cmd>lua vim.lsp.buf.format({ async = true }<cr>'))
    " autocmd FileType rust lua vim.keymap.set('n', '<leader>rb', '<cmd>Make build<cr>')
    " autocmd BufWritePre *.rs lua vim.lsp.buf.format({ async = true })
    autocmd BufWinLeave *.rs mkview
    autocmd BufWinEnter *.rs silen loadview
  augroup END
]])
