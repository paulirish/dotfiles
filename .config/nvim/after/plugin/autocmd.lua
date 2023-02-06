vim.cmd([[
  augroup rust
    autocmd!
    autocmd FileType rust setlocal shiftwidth=2 tabstop=2 softtabstop=2 preserveindent nowrap
    autocmd FileType rust compiler cargo
    autocmd FileType rust lua vim.keymap.set('n', '<leader>rr', '<cmd>RustRun<cr>')
    autocmd FileType rust lua vim.keymap.set('n', '<leader>rf', '<cmd>lua vim.lsp.buf.format({ async = true }<cr>'))
    " autocmd FileType rust lua vim.keymap.set('n', '<leader>rb', '<cmd>Make build<cr>')
    " autocmd BufWritePre *.rs lua vim.lsp.buf.format({ async = true })
    autocmd BufWinLeave *.rs mkview
    autocmd BufWinEnter *.rs silen loadview
  augroup END
  augroup markDown
    autocmd!
    autocmd FileType markdown setlocal shiftwidth=2 tabstop=2 softtabstop=2 preserveindent wrap 
    autocmd FileType markdown setlocal spell spelllang=de,en spellfile=~/Projects/dotfiles/.config/nvim/spell/de.utf-8.add
    autocmd BufWinLeave *.md mkview
    autocmd BufWinEnter *.md silent loadview
  augroup END
]])
