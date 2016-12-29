autocmd BufNewFile,BufRead *.go setlocal noexpandtab preserveindent tabstop=2 shiftwidth=2 softtabstop=2

" Settings for vim-go
au FileType go nmap <leader>gr <Plug>(go-run)
au FileType go nmap <leader>gt <Plug>(go-test)
au FileType go nmap <leader>gtf <Plug>(go-test-func)
au FileType go nmap <Leader>gd <Plug>(go-doc)
au FileType go nmap <Leader>gi <Plug>(go-info)
au FileType go nmap <Leader>gb <Plug>(go-build)
au FileType go set invlist
" Required to get the type information
let g:go_auto_type_info = 1
" Configure syntastic plugin to avoid it builds everytime a file is saved
let g:syntastic_go_checkers = ['golint', 'govet', 'errcheck']
let g:syntastic_mode_map = { 'mode': 'active', 'passive_filetypes': ['go']  }
let g:go_fmt_command = "goimports" " Use goimports instead of gofmt
let g:go_highlight_types = 1
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_methods = 1

" Open file at a position where it was last left.
au BufWinLeave *.go mkview
au BufWinEnter *.go silent loadview

