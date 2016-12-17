" Typescript settings
autocmd BufNewFile,BufRead *.ts setlocal filetype=typescript
let g:typescript_compiler_options = '-sourcemap'
autocmd FileType typescript call s:typescript_filetype_settings()
function! s:typescript_filetype_settings()
  set makeprg=tsc
endfunction

let g:syntastic_javascript_tslint_exec = StrTrim(system('npm-which tslint'))

