set encoding=utf-8
autocmd! bufwritepost .vimrc source %

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

Plugin 'scrooloose/nerdtree'
Plugin 'majutsushi/tagbar'
Plugin 'Lokaltog/vim-powerline'
Plugin 'pangloss/vim-javascript'
Plugin 'ap/vim-css-color'
Plugin 'hail2u/vim-css3-syntax'
Plugin 'groenewege/vim-less'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-surround'
Plugin 'scrooloose/nerdcommenter'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'easymotion/vim-easymotion'
Plugin 'mattn/emmet-vim'
Plugin 'leafgarland/typescript-vim'
Plugin 'msanders/snipmate.vim'
Plugin 'dkprice/vim-easygrep'
Plugin 'sgur/vim-editorconfig'
Plugin 'tpope/vim-dispatch'
Plugin 'terryma/vim-multiple-cursors'
Plugin 'scrooloose/syntastic'
Plugin 'Valloric/YouCompleteMe'
Plugin 'tpope/vim-unimpaired.git'
Plugin 'fatih/vim-go'
Plugin 'kopischke/vim-fetch'
Plugin 'ekalinin/Dockerfile.vim'
Plugin 'tpope/vim-repeat'
Plugin 'svermeulen/vim-easyclip'
Plugin 'zirrostig/vim-schlepp'

call vundle#end()
filetype plugin indent on

syntax on

let loaded_matchparen = 1 " turns the automatic matching for ()[]{} of. Turn it on with DoMatchParen

set cursorline " highlight current line

set list
set listchars=space:·,trail:·,precedes:«,extends:»,eol:↲,tab:▸\
:nmap <leader>l :set invlist<cr>

au BufRead,BufNewFile *.scss set filetype=scss.css

let g:html_indent_inctags = "html,body,head,tbody"
let g:html_indent_script1 = "inc"
let g:html_indent_style1 = "inc"

set grepprg=ack\ --nogroup\ --column\ $*
set grepformat=%f:%l:%c:%m

" No bullshit folding magic
set foldmethod=indent
set foldlevel=99
set foldnestmax=6
nnoremap <silent> <Space> @=(foldlevel('.')?'za':"\<Space>")<CR>
vnoremap <Space> zf

" When opening the file, unfold all. Fold all with zM
"au BufRead * normal zR

" Tagbar
nmap <F9> :TagbarToggle<CR>

" General option
let mapleader = "," " rebind <Leader> key
set wildmode=list:longest " make TAB behave like in a shell
set autoread " reload file when changes happen in other editors
set tags=./tags

set mouse=a
set bs=2 " make backspace behave like normal again
set wildignore+=*.pyc
set wildignore+=*_build/*
set wildignore+=*/coverage/*

" Disable stupid backup and swap files - they trigger too many events for file system watchers
set nobackup
set nowritebackup
set noswapfile

" Omnicomplete related stuff
set completeopt=longest,menuone
inoremap <c-space> <C-x><C-o>
inoremap <c-@> <C-x><C-o>

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
inoremap <silent><C-j> <C-R>=OmniPopup('j')<CR>
inoremap <silent><C-k> <C-R>=OmniPopup('k')<CR>

" ****** Key-Mappings ****
noremap <C-j> ddp " Move line down
noremap <C-k> ddkP " Move line up"
noremap <Leader>dd yyp " Duplicate the current line

" Quicksave command
noremap <Leader>w :update<CR>
vnoremap <Leader>w <C-C>:update<CR>
inoremap <Leader>w <ESC>:update<CR>

" Quick quit command
noremap <Leader>e :quit<CR>

" Show NERDTree with a leader key
noremap <Leader>t :NERDTreeToggle<CR>
inoremap <Leader>t :NERDTreeToggle<CR>
vnoremap <Leader>t :NERDTreeToggle<CR>
noremap <C-S-l> :NERDTreeFind<CR><C-w_w>

" Save current session reload with vim -S
noremap <Leader>s :mksession!<CR>

" Bind toggle hlsearch
noremap <Leader>h :set hlsearch!<CR>
noremap <silent> <BS> :set hlsearch!<CR>

set history=700
set undolevels=700

" Define our defaults for the tabwdith
set tabstop=2
set softtabstop=2
set shiftwidth=2
set shiftround
set expandtab

" file based definition of tabwidth

" filetype based settings
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType html set omnifunc=htmlcomplete#CompleteTags

" Sometimes it's usefull to start immediately with typing when writing a commit message, sometimes not.
" autocmd FileType gitcommit 1 | startinsert

" disable formatting when pasting large chunks of code
nmap <leader><F2> :set pastetoggle=<F2><CR>

set hlsearch
set incsearch
set ignorecase
set smartcase

set nowrap " don't automatically wrap on load
set tw=100  " width of document (used by gd)
set fo-=t  " don't automatically wrap text when typing

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

" Show line number and toggle virtual line on/off
nnoremap <Leader>n :call NumberToggle()<CR>
set number

" center the cursor vertically
:nnoremap <Leader>zz :let &scrolloff=999-&scrolloff<CR>

" easier formatting of paragraphs
vmap Q gq
nmap Q gqap

" Settings for vim-markdown
" let g:vim_markdown_folding_disabled=1
let g:vim_markdown_initial_foldlevel=1

" Settings for ctrlp
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files && git ls-files -o --exclude-standard']
let g:ctrlp_max_height = 30
let g:ctrlp_compare_lim = 0

" Custom mappings
vnoremap < <gv  " better indentation
vnoremap > >gv  " better indentation
map <Leader>a ggVG  " select all

" resize window with leader key
" (it's still possible with ctrl+w +/- or ctrl+w </> )
map <Leader>vi :vertical resize +10<CR>
map <Leader>vd :vertical resize -10<CR>
map <Leader>hi :resize +10<CR>
map <Leader>hd :resize -10<CR>

nmap ;s  :set invspell spelllang=en<CR>
nnoremap <F6> <C-W>w
map <F7> :tabnext<CR>
map <F8> :tabnew<CR>

map <Leader>x :x<CR>
map <Leader>b :CtrlPBuffer<CR>
map <Leader>xa :qa<CR>
map <Leader>sw :Switch<CR>

" delete surrounding characters
noremap ds{ F{xf}x
noremap cs{ F{xf}xi
noremap ds" F"x,x
noremap cs" F"x,xi
noremap ds' F'x,x
noremap cs' F'x,xi
noremap ds( F(xf)x
noremap cs( F(xf)xi
noremap ds) F(xf)x
noremap cs) F(xf)xi

"quick pairs
imap <leader>' ''<ESC>i
imap <leader>" ""<ESC>i
imap <leader>` ``<ESC>i
imap <leader>( ()<ESC>i
imap <leader>[ []<ESC>i
imap <leader>{ {}<ESC>i

" Fixing the copy & paste madness
vmap <C-y> y:call system("xclip -i -selection clipboard", getreg("\""))<CR>:call system("xclip -i", getreg("\""))<CR>
imap <C-v> <Esc><C-v>a

" Reload vimrc
map <Leader>v :source ~/.vimrc<CR>

" Powerline settings
set laststatus=2
set guifont=Inconsolata\ for\ Powerline:h14
set noshowmode " Hide the default mode text (e.g. -- INSERT -- below the statusline)
let g:Powerline_colorscheme = 'solarized256'

" ***** Some useful functions *****

" Strip trailing whitespace (,ss)
function! StripWhitespace()
    let save_cursor = getpos(".")
    let old_query = getreg('/')
    :%s/\s\+$//e
    call setpos('.', save_cursor)
    call setreg('/', old_query)
endfunction
noremap <leader>ss :call StripWhitespace()<CR>

function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction

" Emmet settings
let g:user_emmet_mode='in'
let g:user_emmet_install_global = 1
imap <Leader>i <C-Y>,

" Compilesettings
map <Leader>j :make<CR>
autocmd QuickFixCmdPost [^l]* nested cwindow
autocmd QuickFixCmdPost    l* nested lwindow

" Easygrep settings
let g:EasyGrepMode=0
let g:EasyGrepCommand=1
let g:EasyGrepFilesToExclude=".svn,.git,node_modules,bower,bower_components,build"
let g:EasyGrepRecursive=1
let g:EasyGrepIgnoreCase=1

"Syntastic settings
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 0
let g:syntastic_check_on_open = 0
let g:syntastic_check_on_wq = 1
let g:syntastic_html_tidy_ignore_errors=["is not recognized", "discarding unexpected", "proprietary attribute \"ng-"]
map <Leader>q :SyntasticCheck<CR>

" Function to toggle on/off the quickfixlist
function! ToggleErrors()
    let old_last_winnr = winnr('$')
    lclose
    if old_last_winnr == winnr('$')
        " Nothing was closed, open syntastic error location panel
        Errors
    endif
endfunction

nnoremap <Leader>z :call ToggleErrors()<CR><C-w>w

" CSS3 fixes
augroup VimCSS3Syntax
  autocmd!
  autocmd FileType css setlocal iskeyword+=-
augroup END

" YouCompletMe settings
let g:ycm_auto_trigger = 1
let g:ycm_key_list_select_completion = ['<Down>'] " This setting is important since snipmate will not work with the default settings

" Use tig status direct from vim
function! s:tig_status()
  " Maybe it's necessary to go to the root directory of the current git
  " repository.
  !tig status
endfunction
map <C-G> :TigStatus<CR><CR>
command! TigStatus call s:tig_status()

" Tell vim where to find the tags file
set tags+=tags

" Hotkey for AutoFormat
noremap <F3> :Autoformat<CR>

let g:syntastic_python_checkers = ['pylint']

" EasyClip
let g:EasyClipShareYanks=1
let g:EasyClipUsePasteToggleDefaults=0
let g:EasyClipUseCutDefaults=0
let g:EasyClipEnableBlackHoleRedirect=1
let g:EasyClipYankHistorySize=10
nnoremap <leader>y :IPaste<cr>
nmap ]p <plug>EasyClipSwapPasteForward
nmap [p <plug>EasyClipSwapPasteBackwards
vmap x <Plug>MoveMotionXPlug
nmap xx <Plug>MoveMotionLinePlug

" Vim-Schlepp settings
let g:Schlepp#allowSquishingLines = 1
let g:Schlepp#allowSquishingBlocks = 1
vmap <C-K>    <Plug>SchleppUp
vmap <C-J>    <Plug>SchleppDown
vmap <C-H>    <Plug>SchleppLeft
vmap <C-L>    <Plug>SchleppRight

" define color scheme
set t_Co=256
set guioptions=egmrt
set background=light
color desert

" Add file type based settings
source ~/.vim/vimrc/vimrc_go.vim
source ~/.vim/vimrc/vimrc_javascript.vim
source ~/.vim/vimrc/vimrc_typescript.vim
source ~/.vim/vimrc/vimrc_python.vim
