autocmd BufNewFile,BufRead *.js* setlocal expandtab tabstop=2 shiftwidth=2 softtabstop=2
autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS

let jshint2_save = 1
set smarttab
set cindent

"Syntastic settings
let g:syntastic_javascript_checkers = ['eslint']
let g:syntastic_javascript_eslint_exec = StrTrim(system('npm-which eslint'))
let g:syntastic_json_checkers=['jsonlint']
let g:syntastic_json_jslint_exec = StrTrim(system('npm-which jslint'))

" Open file at a position where it was last left.
au BufWinLeave *.js* mkview
au BufWinEnter *.js* silent loadview
