set encoding=utf-8

" some special configurations for editing my dotfiles
autocmd! bufwritepost .vimrc source %
au BufWinLeave .vimrc mkview
au BufWinEnter .vimrc silent loadview

set nocompatible
filetype off

" Activate the internal matchit plugin
filetype plugin on
runtime macros/matchit.vim

set shell=zsh

set path+=** " Search down into subfolders
set wildmenu " Display all matching files when tab complete

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

Plugin 'majutsushi/tagbar'                    " displays tags in a window
Plugin 'pangloss/vim-javascript'              " Vastly improved Javascript indentation and syntax support
Plugin 'mxw/vim-jsx'                          " React JSX syntax highlighting and indenting for vim
Plugin 'airblade/vim-gitgutter'               " shows a git diff in the gutter
Plugin 'ap/vim-css-color'                     " Preview colours in source code while editing
Plugin 'hail2u/vim-css3-syntax'               " CSS3 syntax
Plugin 'easymotion/vim-easymotion'            " Vim motions on speed
Plugin 'elzr/vim-json'                        " Improve JSON support: Distinct highlighting of keywords vs values
" Plugin 'exvim/ex-autocomplpop'                " Auto complete text when you are writing code
Plugin 'garbas/vim-snipmate'                  " implements some of TextMate's snippets features in Vim
Plugin 'gorkunov/smartpairs.vim'              " Completion Enchanted visual (selection) mode for Vim
Plugin 'fatih/vim-go'                         " Improving the support for Go in vim
Plugin 'ekalinin/Dockerfile.vim'              " Syntaxhighlighting for Dockerfiles
Plugin 'junegunn/fzf'
Plugin 'junegunn/fzf.vim'                     " Use fzf in VIM
Plugin 'kopischke/vim-fetch'                  " Make Vim handle line and column numbers in file names
Plugin 'liuchengxu/vim-which-key'             " Show the current leader mappings
Plugin 'vim-airline/vim-airline'              " statusline plugin for vim
Plugin 'MarcWeber/vim-addon-mw-utils'         " interpret a file by function and cache file automatically (required by ...)
Plugin 'mattn/emmet-vim'                      " Provides support for Emmet in vim
Plugin 'machakann/vim-highlightedyank'        " Make the yanked region visible
Plugin 'mileszs/ack.vim'                      " Provides support for ack and the SilverlightSearcher in vim
Plugin 'NLKNguyen/papercolor-theme'           " My prefered theme for working in the presentation (light) mode
Plugin 'scrooloose/nerdtree'                  " A tree explorer plugin for vim
Plugin 'Xuyuanp/nerdtree-git-plugin'          " A plugin of NERDTree showing git status
Plugin 'scrooloose/nerdcommenter'             " plugin for intensely commenting
Plugin 'sgur/vim-editorconfig'                " Yet another EditorConfig plugin for vim
Plugin 'svermeulen/vim-yoink'                 " plugin that maintains a yank history to cycle between when pasting
Plugin 'szw/vim-maximizer'                    " Maximizes and restores the current window in Vim.
Plugin 'terryma/vim-multiple-cursors'         " This True Sublime Text style multiple selections for Vim
Plugin 'tomtom/tlib_vim'                      " Some utility functions for VIM - Required from ???
Plugin 'tpope/vim-dispatch'                   " Asynchronous build and test dispatcher
Plugin 'tpope/vim-fugitive'                   " A Git wrapper
Plugin 'tpope/vim-repeat'                     " enable repeating supported plugin maps with \".\"
Plugin 'tpope/vim-surround'                   " surround.vim: quoting/parenthesizing made simple
Plugin 'tpope/vim-unimpaired'                 " Pairs of handy bracket mappings
Plugin 'zxqfl/tabnine-vim'                    " TabCompletion Plugin (Replacement for YouCompleteMe)
Plugin 'w0rp/ale'                             " Asynchronous Lint Enginge
Plugin 'zirrostig/vim-schlepp'                " Moving blocks of text easily
Plugin 'kristijanhusak/vim-hybrid-material'   " This color theme is for the dark mode with transparent background
Plugin 'bkad/CamelCaseMotion'               " Change WordMotion to support camelCase written words

call vundle#end()

filetype plugin indent on

syntax on

let loaded_matchparen = 1 " turns the automatic matching for ()[]{} of. Turn it on with DoMatchParen

set cursorline " highlight current line

set list
set listchars=space:·,trail:·,precedes:«,extends:»,eol:↲,tab:▸\

" No bullshit folding magic
set foldmethod=indent
set foldlevel=99
set foldnestmax=6

" When opening the file, unfold all. Fold all with zM
"au BufRead * normal zR

" General option
let mapleader = "," " rebind <Leader> key
set wildmode=list:longest " make TAB behave like in a shell
set autoread " reload file when changes happen in other editors
set tags=./tags

set mouse=a
set bs=2 " make backspace behave like normal again

set wildignore+=*.pyc
set wildignore+=*/_build/*
set wildignore+=coverage
set wildignore+=.cache
set wildignore+=node_modules
set wildignore+=deploy
set wildignore+=dist
set wildignore+=.DS_Store
set wildignore+=.git
set wildignore+=.vscode
set wildignore+=.idea
set wildignore+=.next
set wildignore+=obj,tags

" Disable stupid backup and swap files - they trigger too many events for file system watchers
set nobackup
set nowritebackup
set noswapfile

set history=700
set undolevels=700

" Define our defaults for the tabwdith
set tabstop=2
set softtabstop=2
set shiftwidth=2
set shiftround
set expandtab
command! -nargs=* SetNormalIndent set ts=2 sw=2 sts=2

" We want that undo is also possible after we reopened a file that was changed before
set undofile
set undodir=$HOME/.vim/undo " Dont forget to create this directory on your computer

set hlsearch
set incsearch
set ignorecase
set smartcase
set number

set nowrap " don't automatically wrap on load
set tw=100  " width of document (used by gd)
set fo-=t  " don't automatically wrap text when typing
command! -nargs=* Wrap set wrap linebreak nolist
command! -nargs=* NoWrap set nowrap nolinebreak list

" Settings for spellcecking
set spelllang=en_us
set spellfile=~/.vim/spell/en.utf-8.add

" Tell vim where to find the tags file
set tags+=tags

command! -nargs=* Wrap set wrap linebreak nolist
command! -nargs=* Nowrap set nowrap nolinebreak list

autocmd InsertEnter * :set nohlsearch " Turn search highlight of when going into the insert mode
autocmd BufReadPost .functions set syntax=sh
autocmd BufReadPost .aliases set syntax=sh

" Sometimes it's usefull to start immediately with typing when writing a commit message, sometimes not.
" autocmd FileType gitcommit 1 | startinsert
au FileType gitcommit set tw=100 " The default is 72 and for me it's mostly not enough

" Omnicomplete related stuff
set completeopt=longest,menuone
inoremap <c-space> <C-x><C-o>
inoremap <c-@> <C-x><C-o>

" ************* Begin custom functions  ************
" found here: http://stackoverflow.com/a/2170800/70778
function! OmniPopup(action)
    if pumvisible()
        if a:action == 'j'
            return "\<C-N>"
        elseif a:action == 'k'
            return "\<C-P>"
        endif
    endif
    return a:action
endfunction

" Awesome line number magic
function! NumberToggle()
  if(&relativenumber == 1)
    set norelativenumber
    set number
    highlight LineNr ctermfg=yellow
  else
    set relativenumber
    highlight LineNr ctermfg=green
  endif
endfunc

" Function to toggle on/off the quickfixlist
function! ToggleErrors()
  let old_last_winnr = winnr('$')
  lclose
  if old_last_winnr == winnr('$')
    lopen
  endif
endfunction

function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction

" Use tig status direct from vim
function! s:tig_status()
  " Maybe it's necessary to go to the root directory of the current git
  " repository.
  !tig status
endfunction
command! TigStatus call s:tig_status()

function! TogglePresentationMode()
  if(&background == 'dark')
    set background=light
    colorscheme PaperColor
  else
    set background=dark
    colorscheme hybrid_material
  endif
endfunction

" ************* End custom functions  ************

" ************* Begin custom keymappings ************
nmap <leader>l :set invlist<cr>
nnoremap <silent> <Space> @=(foldlevel('.')?'za':"\<Space>")<CR>
vnoremap <Space> zf

inoremap <silent><C-j> <C-R>=OmniPopup('j')<CR>
inoremap <silent><C-k> <C-R>=OmniPopup('k')<CR>

" Quicksave command
noremap <Leader>w :update<CR>
vnoremap <Leader>w <C-C>:update<CR>
inoremap <Leader>w <ESC>:update<CR>

" Quick quit command
noremap <Leader>e :quit<CR>

" Save current session reload with vim -S
noremap <Leader>s :mksession!<CR>

" Bind toggle hlsearch
noremap <Leader>h :set hlsearch!<CR>
noremap <silent> <BS> :set hlsearch!<CR>

" disable formatting when pasting large chunks of code
nmap <leader><F2> :set pastetoggle=<F2><CR>

" Show line number and toggle virtual line on/off
nnoremap <Leader>n :call NumberToggle()<CR>

" center the cursor vertically
":nnoremap <Leader>zz :let &scrolloff=999-&scrolloff<CR>

" Enable spell check
nnoremap ;s :set spell<CR>

" select all
nnoremap <Leader>a ggVG  

" easier formatting of paragraphs
"vmap Q gq
"nmap Q gqap

vnoremap < <gv  " better indentation
vnoremap > >gv  " better indentation

" resize window with leader key
" (it's still possible with ctrl+w +/- or ctrl+w </> )
map <Leader>vi :vertical resize +10<CR>
map <Leader>vd :vertical resize -10<CR>
map <Leader>hi :resize +10<CR>
map <Leader>hd :resize -10<CR>

map <F2> :vertical wincmd f<CR> <C-W>R " Open the file under the cursor in a vertical split
nnoremap <F6> <C-W>w
map <S-Tab> :tabnext<CR>
map <F8> :tabnew<CR>

noremap <Leader>x :cclose<CR> " Close the QuickFix window
noremap <Leader>xa :qa<CR>
noremap <Leader>sw :Switch<CR>

"quick pairs
imap <leader>' ''<ESC>i
imap <leader>" ""<ESC>i
imap <leader>` ``<ESC>i
imap <leader>( ()<ESC>i
imap <leader>[ []<ESC>i
imap <leader>{ {}<ESC>i
imap <leader>{<space> {  }<ESC><left>i

" Fixing the copy & paste madness
"vmap <C-y> y:call system("xclip -i -selection clipboard", getreg("\""))<CR>:call system("xclip -i", getreg("\""))<CR>
"imap <C-v> <Esc><C-v>a

" Reload vimrc
"map <Leader>v :source ~/.vimrc<CR>

" Hotkey for AutoFormat
noremap <F4> :Autoformat<CR>

" Compilesettings
"map <Leader>j :make<CR>
"autocmd QuickFixCmdPost [^l]* nested cwindow
"autocmd QuickFixCmdPost    l* nested lwindow

map <C-G> :TigStatus<CR><CR>

nnoremap <Leader>z :call ToggleErrors()<CR>

nnoremap <Leader>pp :call TogglePresentationMode()<CR>

" Delete surrounding space (deletes the previous and the following space)
" It's not perfect for all cases, but sometimes usefull
nnoremap ds<space> F<space>xf<space>x

" ************* End custom keymappings ************

" ************** Begin plugin settings ************

" Powerline settings
set laststatus=2
set guifont=Inconsolata\ for\ Powerline:h14
set noshowmode " Hide the default mode text (e.g. -- INSERT -- below the statusline)
let g:Powerline_colorscheme = 'solarized256'

" Emmet settings
let g:user_emmet_mode='in'
let g:user_emmet_install_global = 1
imap <Leader>i <C-Y>,

" Settings for vim-markdown
" let g:vim_markdown_folding_disabled=1
let g:vim_markdown_initial_foldlevel=1

" Show NERDTree with a leader key
noremap <Leader>t :NERDTreeToggle<CR>
inoremap <Leader>t :NERDTreeToggle<CR>
vnoremap <Leader>t :NERDTreeToggle<CR>
noremap <C-S-l> :NERDTreeFind<CR><C-w_w>
let NERDTreeShowHidden=1
let NERDTreeRespectWildIgnore=1
let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'

" Netrc  management
nnoremap <leader>xv :Vexplore!<cr> " Open vertical explorer
nnoremap <leader>xx :Ex<cr> " Open explorer in current buffer

" YouCompleteMe settings (also for TabNine)
let g:ycm_auto_trigger=1
let g:ycm_key_list_select_completion=['<Down>'] " This setting is important since snipmate will not work with the default settings

" Vim-Maximizer
nnoremap <silent><F3> :MaximizerToggle<CR>
vnoremap <silent><F3> :MaximizerToggle<CR>gv
inoremap <silent><F3> <C-o>:MaximizerToggle<CR>

" Some Fzf settings
let g:fzf_command_prefix = 'Fzf'
map <C-P> :FzfFiles<CR>
map <C-B> :FzfBuffers<CR>
map <Leader>b :FzfBuffers<CR>
map <Leader>q :FzfWindows<CR>

" Yoink
let g:yoinkSavePersistently=0
let g:yoinkSyncNumberedRegisters=0
let g:yoinkMaxItems=10
let g:yoinkMoveCursorToEndOfPaste=1
let g:yoinkIncludeNamedRegisters=0
let g:yoinkSyncSystemClipboardOnFocus=0
nnoremap <leader>y :Yanks<cr>
nmap ]p <plug>YoinkRotateBack
nmap [p <plug>YoinkRotateForward

" Vim-Schlepp settings
let g:Schlepp#allowSquishingLines = 1
let g:Schlepp#allowSquishingBlocks = 1
vmap <C-K>    <Plug>SchleppUp
vmap <C-J>    <Plug>SchleppDown
vmap <C-H>    <Plug>SchleppLeft
vmap <C-L>    <Plug>SchleppRight

" Tagbar
nmap <F9> :TagbarToggle<CR>

" ACK
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif
cnoreabbrev ag Ack!
cnoreabbrev ack Ack!
nnoremap <Leader>vv :Ack! <cword> <CR>

" Nerdcommenter
let g:NERDSpaceDelims = 1

" Ale
let g:ale_fix_on_save = 0
let g:ale_completion_enabled = 1
let g:ale_lint_on_text_changed = 0
let g:ale_sign_error = '>>'
let g:ale_sign_warning = '--'
let g:ale_open_list = 0

" HighlightedYank
map y <Plug>(highlightedyank)

" vim-smartpairs
let g:smartpairs_start_from_word = 1

" vim-which-key
nnoremap <silent> <leader>      :<c-u>WhichKey ','<CR>

" vim-CamelCaseMotion - Just map w and b
map <silent> w <Plug>CamelCaseMotion_w
map <silent> b <Plug>CamelCaseMotion_b
sunmap w
sunmap b

" ************** End plugin settings ************

" define color scheme
let g:hybrid_transparent_background = 1

if $VIM_BACKGROUND == 'light'
  set background=light
  colorscheme PaperColor
else
  set background=dark
  colorscheme hybrid_material
endif


" Define the highlighting for spell checking
hi SpellBad ctermfg=015 ctermbg=000 cterm=none guifg=#FFFFFF guibg=#000000 gui=none
highlight SpellBad cterm=underline

" Add file type based settings
source ~/.vim/vimrc/vimrc_go.vim
source ~/.vim/vimrc/vimrc_javascript.vim
" source ~/.vim/vimrc/vimrc_typescript.vim
source ~/.vim/vimrc/vimrc_html_css.vim
source ~/.vim/vimrc/vimrc_markdown.vim
"source ~/.vim/vimrc/vimrc_python.vim
