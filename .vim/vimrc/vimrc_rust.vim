autocmd BufNewFile,BufRead *.rs setlocal expandtab preserveindent tabstop=2 shiftwidth=2 softtabstop=2

au FileType rust nmap <leader>rr :RustRun<cr>
au FileType rust nmap <leader>rt :RustTest<cr>
au FileType rust nmap <Leader>rb :Make build<cr>
au FileType rust nmap <Leader>rf :RustFmt<cr>
au FileType rust set list
au FileType rust compiler cargo

" Open file at a position where it was last left.
au BufWinLeave *.rs mkview
au BufWinEnter *.rs silent loadview

