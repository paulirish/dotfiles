autocmd BufNewFile,BufRead *.js set filetype=javascript.jsx
autocmd BufNewFile,BufRead *.jsx set filetype=javascript.jsx

autocmd BufNewFile,BufRead *.js* setlocal expandtab tabstop=2 shiftwidth=2 softtabstop=2

autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS
autocmd FileType javascript.jsx set omnifunc=javascriptcomplete#CompleteJS

autocmd BufNewFile,BufRead .eslintrc set syntax=json
autocmd BufNewFile,BufRead .jshintrc set syntax=json

let jshint2_save = 1
set smarttab
set cindent

set foldmethod=syntax

let g:ale_fixers = { 'javascript': [ 'eslint' ] }

" Open file at a position where it was last left.
au BufWinLeave *.js* mkview
au BufWinEnter *.js* silent loadview
