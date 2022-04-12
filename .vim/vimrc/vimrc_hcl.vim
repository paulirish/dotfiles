autocmd BufNewFile,BufRead *.tf set filetype=hcl

autocmd BufNewFile,BufRead *.tf setlocal expandtab tabstop=2 shiftwidth=2 softtabstop=2

set smarttab
set cindent

set foldmethod=syntax

" Open file at a position where it was last left.
au BufWinLeave *.tf mkview
au BufWinEnter *.tf silent loadview

