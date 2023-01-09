autocmd BufNewFile,BufRead *.md setlocal nosmartindent wrap linebreak nolist tw=0 fo=cq wm=0
autocmd BufNewFile,BufRead *.md setlocal spell
autocmd BufNewFile,BufRead *.md setlocal spelllang=de,en spellfile=~/Projects/dotfiles/.vim/spell/de.utf-8.add
